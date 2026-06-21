// https://github.com/vuejs/vitepress/blob/ee028266a8fee777a8ee247b1c4490432c0a830e/src/node/utils/getGitTimestamp.ts

import { Transform, TransformCallback } from "node:stream";
import fs from "node:fs";
import path from "node:path";
import { sync, spawn } from "cross-spawn";

const cacheCreateAt = new Map<string, number>();
const cacheUpdateAt = new Map<string, number>();

const NUL = 0x00;
const LF = 0x0a;
const RS = 0x1e;

interface GitLogRecord {
  ts: number;
  files: string[];
}

type State = "READ_TS" | "READ_FILE";

class GitLogParser extends Transform {
  #state: State = "READ_TS";
  #tsBytes: number[] = [];
  #fileBytes: number[] = [];
  #files: string[] = [];

  constructor() {
    super({ readableObjectMode: true });
  }

  override _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void {
    try {
      for (let i = 0; i < chunk.length; i++) {
        const b = chunk[i] === LF ? NUL : chunk[i];

        switch (this.#state) {
          case "READ_TS": {
            if (b === RS) {
            } else if (b === NUL) {
              this.#state = "READ_FILE";
            } else {
              this.#tsBytes.push(b);
            }
            break;
          }
          case "READ_FILE": {
            if (b === RS) {
              this.#emitRecord();
            } else if (b === NUL) {
              if (this.#fileBytes.length > 0) {
                this.#files.push(Buffer.from(this.#fileBytes).toString("utf8"));
                this.#fileBytes.length = 0;
              }
            } else {
              this.#fileBytes.push(b);
            }
            break;
          }
        }
      }
      callback();
    } catch (err) {
      callback(err as Error);
    }
  }

  #emitRecord(): void {
    const ts = Buffer.from(this.#tsBytes).toString("utf8");
    const rec: GitLogRecord = {
      ts: Number.parseInt(ts, 10) * 1000,
      files: this.#files.slice(),
    };
    if (rec.ts > 0 && rec.files.length > 0) this.push(rec);

    this.#tsBytes.length = 0;
    this.#fileBytes.length = 0;
    this.#files.length = 0;
    this.#state = "READ_TS";
  }
}

export async function cacheAllGitTimestamps(root: string, pathspec: string[]) {
  const cp = sync("git", ["rev-parse", "--show-toplevel"], { cwd: root });
  if (cp.error) throw cp.error;

  const gitRoot = cp.stdout.toString("utf8").trim();

  const collect = (cache: Map<string, number>, args: string[]) =>
    new Promise((resolve, reject) => {
      cache.clear();

      const child = spawn("git", args, { cwd: root });
      child.stdout
        ?.pipe(new GitLogParser())
        .on("data", (rec: GitLogRecord) => {
          for (const file of rec.files) {
            const absolute = path.resolve(gitRoot, file);
            if (!cache.has(absolute)) cache.set(absolute, rec.ts);
          }
        })
        .on("error", reject)
        .on("end", resolve);
      child.on("error", reject);
    });

  return Promise.all([
    collect(cacheCreateAt, [
      "log",
      "--diff-filter=A",
      "--pretty=format:%x1e%at%x00",
      "--name-only",
      "-z",
      "--",
      ...pathspec,
    ]),
    collect(cacheUpdateAt, [
      "log",
      "--pretty=format:%x1e%at%x00",
      "--name-only",
      "-z",
      "--",
      ...pathspec,
    ]),
  ]);
}

export async function getGitTimestamp(file: string): Promise<[number, number]> {
  const createdAt = cacheCreateAt.get(file);
  const updatedAt = cacheUpdateAt.get(file);
  if (createdAt && updatedAt) return [createdAt, updatedAt];

  if (!fs.existsSync(file)) return [0, 0];

  const get = (cache: Map<string, number>, args: string[]) =>
    new Promise<number>((resolve, reject) => {
      const child = spawn("git", args, { cwd: path.dirname(file) });

      let output = "";
      child.stdout?.on("data", (d) => (output += String(d)));

      child
        .on("close", () => {
          const ts = Number.parseInt(output.trim(), 10) * 1000;
          if (!(ts > 0)) return resolve(0);

          cache.set(file, ts);
          resolve(ts);
        })
        .on("error", reject);
    });

  const promise = [];

  if (createdAt) {
    promise.push(createdAt);
  } else {
    promise.push(
      get(cacheCreateAt, ["log", "--diff-filter=A", "--pretty=%at", "--", path.basename(file)]),
    );
  }

  if (updatedAt) {
    promise.push(updatedAt);
  } else {
    promise.push(get(cacheUpdateAt, ["log", "-1", "--pretty=%at", "--", path.basename(file)]));
  }

  return Promise.all(promise) as Promise<[number, number]>;
}

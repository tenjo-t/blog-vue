import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const md = `---
title: H1
tag: 日記
---

## H2
`;

function getJSTDateString() {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  return parts
    .filter((p) => p.type !== "literal")
    .map((p) => p.value)
    .join("");
}

const date = getJSTDateString();
const name = Math.random().toString(36).slice(-6) + Math.random().toString(36).slice(-6);
const path = join("posts", date, `${name}.md`);

await mkdir(dirname(path), { recursive: true });
await writeFile(path, md);

console.log(`create new post "${path}"`);

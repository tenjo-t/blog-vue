import { defineLoader } from "@tenjot/fumi";
import { getGitTimestamp, cacheAllGitTimestamps } from "./git";

export interface Data {
  url: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

declare const data: Data[];

export { data };

const watch = ["posts/**/*.md"];

export default defineLoader<Data[]>({
  watch,
  async load(watchFiles, loadMarkdown) {
    await cacheAllGitTimestamps(process.cwd(), watch);

    return (
      await Promise.all(
        watchFiles.map(async (file) => {
          const { path, title } = await loadMarkdown(file);
          const [createdAt, updatedAt] = await getGitTimestamp(file);
          return {
            url: path,
            title: title as string,
            createdAt,
            updatedAt,
          };
        }),
      )
    ).sort((a, b) => b.createdAt - a.createdAt);
  },
});

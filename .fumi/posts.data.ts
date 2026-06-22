import { defineLoader } from "@tenjot/fumi";
import { getGitTimestamp, cacheAllGitTimestamps } from "./git";

export interface Post {
  path: string;
  title: string;
  tag: string | undefined;
  createdAt: number;
  updatedAt: number;
}

interface Data {
  posts: Post[];
  tags: Array<string>;
}

declare const data: Data;

export { data };

const watch = ["posts/**/*.md"];

export default defineLoader<Data>({
  watch,
  async load(watchFiles, loadMarkdown) {
    await cacheAllGitTimestamps(process.cwd(), watch);

    const tags = new Set<string>();
    const posts = (
      await Promise.all(
        watchFiles.map(async (file) => {
          const { path, title, frontmatter } = await loadMarkdown(file);

          const tag = frontmatter?.tag as string | undefined;
          if (tag) {
            tags.add(tag);
          }

          const [createdAt, updatedAt] = await getGitTimestamp(file);

          return {
            path,
            title: title as string,
            tag,
            createdAt,
            updatedAt,
          };
        }),
      )
    ).sort((a, b) => b.createdAt - a.createdAt);

    return {
      posts,
      tags: Array.from(tags),
    };
  },
});

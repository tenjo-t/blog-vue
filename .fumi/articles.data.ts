import { defineLoader } from "@tenjot/fumi";

export interface Data {
  url: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

declare const data: Data[];

export { data };

export default defineLoader<Data[]>({
  watch: ["articles/**/*.md"],
  async load(watchFiles, loadMarkdown) {
    return (await Promise.all(watchFiles.map(loadMarkdown)))
      .map(({ path, title, frontmatter }) => {
        return {
          url: path,
          title: title as string,
          createdAt: frontmatter?.createdAt as string,
          updatedAt: frontmatter?.updatedAt as string,
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
});

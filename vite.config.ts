import { defineConfig } from "@tenjot/fumi";
import remarkGfm from "remark-gfm";
import remarkTreeSitterHighlight from "@tenjot/remark-shiki-highlight";

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkGfm, [remarkTreeSitterHighlight, { theme: "github-light" }]],
  },
});

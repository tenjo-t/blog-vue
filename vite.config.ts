import { defineConfig } from "@tenjot/fumi";
import remarkGfm from "remark-gfm";
import remarkTreeSitterHighlight from "@tenjot/remark-shiki-highlight";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  title: "Blog",
  titleTemplate: ":title / tenjo",

  markdown: {
    remarkPlugins: [remarkGfm, [remarkTreeSitterHighlight, { theme: "github-dark" }]],
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      outDir: ".fumi/dist",
    },
  },
});

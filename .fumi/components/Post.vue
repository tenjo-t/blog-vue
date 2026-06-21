<script setup lang="ts">
import { computed } from "vue";
import { useData, Content } from "@tenjot/fumi/client";
import PostHeader from "./PostHeader.vue";
import { data } from "../posts.data";

interface Frontmatter {
  title: string;
}

const { page } = useData();
const post = computed(() => data.findIndex((a) => a.url === page.value.path));
const frontmatter = computed(() => page.value.frontmatter as unknown as Frontmatter);
</script>

<template>
  <PostHeader />
  <main class="mx-auto p-4 max-w-xl">
    <article class="mb-16">
      <h1 class="mb-16 text-xl text-mist-100">{{ frontmatter.title }}</h1>
      <div class="mb-8 text-sm text-mist-400">
        <template v-if="data[post].createdAt === data[post].updatedAt">
          {{ new Date(data[post].createdAt).toLocaleDateString("ja-jp") }}に公開
        </template>
        <template v-else>
          {{ new Date(data[post].updatedAt).toLocaleDateString("ja-jp") }}に更新
        </template>
      </div>
      <Content />
    </article>
    <aside>
      <nav class="grid grid-cols-2 border border-mist-700 rounded-lg overflow-hidden">
        <template v-if="post !== data.length - 1">
          <a
            :href="data[post + 1].url"
            class="flex gap-2 p-4 hover:bg-mist-900 focus:bg-mist-900 active:bg-mist-950 first:border-r border-mist-700 truncate transition-colors"
          >
            <span class="text-mist-400 select-none"><</span>
            <span class="truncate">{{ data[post + 1].title }}</span>
          </a>
        </template>
        <template v-if="post !== 0">
          <a
            :href="data[post - 1].url"
            class="col-start-2 flex gap-2 justify-end p-4 hover:bg-mist-900 focus:bg-mist-900 active:bg-mist-950 first:border-l border-mist-700 transition-colors"
          >
            <span class="truncate">{{ data[post - 1].title }}</span>
            <span class="text-mist-400 select-none">></span>
          </a>
        </template>
      </nav>
    </aside>
  </main>
</template>

<style>
@reference "tailwindcss";

.fumi-markdown-content {
  p,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  pre,
  blockquote,
  hr {
    @apply mb-4;
  }

  h2 {
    @apply mt-12 text-xl border-b border-mist-700;
  }

  h3 {
    @apply mt-8 text-lg;
  }

  h4,
  h5,
  h6 {
    @apply mt-8;
  }

  p {
    @apply leading-loose;
  }

  ul {
    @apply pl-6 list-disc;

    p {
      @apply mb-0;
    }
  }

  ol {
    @apply pl-6 list-decimal;

    p {
      @apply mb-0;
    }
  }

  pre {
    @apply p-4 rounded-lg border border-mist-700 overflow-x-auto text-sm;
  }

  blockquote {
    @apply ml-4 pl-4  border-l border-mist-700;
  }

  hr {
    @apply border-t border-mist-700;
  }
  p code {
    @apply mx-1 px-1 py-0.5 bg-mist-700 rounded text-sm;
  }

  p a {
    @apply underline hover:no-underline focus:no-underline active:text-mist-400;
  }

  table {
    @apply mx-auto text-sm overflow-x-auto;
  }

  th {
    @apply px-2 py-1 border-b border-mist-700 font-normal text-mist-100 text-left;
  }

  td {
    @apply px-2 py-1;
  }
}
</style>

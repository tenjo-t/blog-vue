<script setup lang="ts">
import { computed } from "vue";
import { useData } from "@tenjot/fumi/client";
import HomeHeader from "./HomeHeader.vue";
import github from "../assets/github.svg";
import zenn from "../assets/zenn.svg";
import x from "../assets/x.svg";
import { data } from "../posts.data";

interface Frontmatter {
  layout: "home";
  html: string;
  link: string;
}

const links = [
  ["GitHub", "https://github.com/tenjo-t", github],
  ["Zenn", "https://zenn.dev/tenjo", zenn],
  // ["X", "", x],
];

const { page } = useData();
const frontmatter = computed(() => page.value.frontmatter as unknown as Frontmatter);
</script>

<template>
  <HomeHeader />
  <main class="mx-auto mb-16 p-4 max-w-xl">
    <p class="my-16 text-mist-100 italic text-center break-keep">
      <a :href="frontmatter.link" v-html="frontmatter.html"></a>
    </p>
    <ul class="mb-24">
      <template v-for="post of data.posts" :key="post.path">
        <li>
          <a
            :href="post.path"
            class="group block hover:text-mist-400 focus:text-mist-400 active:text-mist-500 transition-colors"
          >
            <article class="flex justify-between gap-4 py-2">
              <div class="truncate">
                {{ post.title }}
                <template v-if="post.tag">
                  <span
                    class="tag inline-block ml-4 px-1 py-0.5 border rounded text-sm leading-none transition-colors"
                    :data-tag="data.tags.indexOf(post.tag)"
                  >
                    {{ post.tag }}
                  </span>
                </template>
              </div>

              <div class="text-right">
                <span class="text-mist-400 hover:text-mist-500">
                  {{ new Date(post.createdAt).toLocaleDateString("ja-jp") }}
                </span>
              </div>
            </article>
          </a>
        </li>
      </template>
    </ul>
    <h2 class="mb-8 text-lg text-mist-100 text-center">Link</h2>
    <ul class="flex justify-center gap-8">
      <template v-for="link in links">
        <li>
          <a
            class="block p-1 w-8 rounded hover:bg-mist-900 focus:bg-mist-900 active:bg-mist-950 transition-colors"
            :href="link[1]"
          >
            <img :src="link[2]" :alt="link[0]" />
          </a>
        </li>
      </template>
    </ul>
  </main>
</template>

<style scoped>
@reference "../style.css";

.tag[data-tag="0"] {
  @apply border-lime-400 text-lime-400 group-hover:border-lime-600 group-hover:text-lime-600 group-focus:border-lime-600 group-focus:text-lime-600 group-active:border-lime-700 group-active:text-lime-700;
}

.tag[data-tag="1"] {
  @apply border-rose-400 text-rose-400 group-hover:border-rose-600 group-hover:text-rose-600 group-focus:border-rose-600 group-focus:text-rose-600 group-active:border-rose-700 group-active:text-rose-700;
}

.tag[data-tag="2"] {
  @apply border-amber-400 text-amber-400 group-hover:border-amber-600 group-hover:text-amber-600 group-focus:border-amber-600 group-focus:text-amber-600 group-active:border-amber-700 group-active:text-amber-700;
}
</style>

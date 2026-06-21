<script setup lang="ts">
import { computed } from "vue";
import { useData } from "@tenjot/fumi/client";
import HomeHeader from "./HomeHeader.vue";
import github from "../assets/github.svg";
import zenn from "../assets/zenn.svg";
import x from "../assets/x.svg";
import { data as posts } from "../posts.data";

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
      <template v-for="post of posts" :key="post.url">
        <li>
          <a
            :href="post.url"
            class="block hover:text-mist-400 focus:text-mist-400 active:text-mist-500 transition-colors"
          >
            <article class="flex justify-between gap-4 py-2">
              <div class="truncate">{{ post.title }}</div>
              <div class="text-mist-400 text-right">
                {{ new Date(post.createdAt).toLocaleDateString("ja-jp") }}
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

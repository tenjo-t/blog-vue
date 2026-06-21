<script setup lang="ts">
import PostHeader from "./PostHeader.vue";
</script>

<template>
  <PostHeader />
  <main class="flex flex-col items-center mx-auto my-36 p-4 max-w-xl">
    <h1 class="mb-16">ページが見つかりませんでした</h1>
    <a
      class="px-4 py-2 border border-mist-700 rounded-full hover:bg-mist-900 focus:bg-mist-900 active:bg-mist-950"
      href="/"
    >
      ホームに戻る
    </a>
  </main>
</template>

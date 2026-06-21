<script setup lang="ts">
const back = () => navigation.back();
</script>

<template>
  <header class="mx-auto p-4 max-w-xl">
    <div>
      <a
        href="/"
        class="inline-block p-1 rounded hover:bg-mist-900 focus:bg-mist-900 active:bg-mist-950 leading-none select-none transition-colors"
        aria-label="戻る"
        @click="back"
      >
        ↩︎
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useData } from "@tenjot/fumi/client";
import NotFound from "./components/NotFound.vue";
import Home from "./components/Home.vue";
import Post from "./components/Post.vue";
import Footer from "./components/Footer.vue";

const { page } = useData();
</script>

<template>
  <template v-if="page.isNotFound">
    <NotFound />
  </template>
  <template v-else-if="page.frontmatter?.layout === 'home'">
    <Home />
  </template>
  <template v-else>
    <Post />
  </template>
  <Footer />
</template>

<script lang="ts" setup>
import { useData } from "@tenjot/fumi/client";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Home from "./components/Home.vue";
import Page from "./components/Page.vue";
import "@acab/reset.css";
import "./styles/base.css";
import "./styles/color.css";
import "./styles/typography.css";

const { page } = useData();
</script>

<template>
  <div class="container">
    <Header />

    <div class="content">
      <template v-if="page.isNotFound">
        <p>404 | Not found</p>
      </template>
      <template v-else-if="page.frontmatter?.layout === 'home'">
        <Home />
      </template>
      <template v-else>
        <Page />
      </template>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 700px;
}
</style>

<script setup>
import { data as articles } from "../articles.data.ts";
</script>

<template>
  <main>
    <h2 class="heading">Article</h2>
    <ul>
      <template v-for="article of articles">
        <li class="card">
          <div class="card-date">{{ article.updatedAt }}</div>
          <a class="card-link" :href="article.url">{{ article.title }}</a>
        </li>
      </template>
    </ul>
    <h2 class="heading">Link</h2>
    <ul class="link-list">
      <li class="link-list-item">
        <a class="link" href="https://github.com/tenjo-t">
          <img src="../../assets/github.svg" alt="GitHub" />
        </a>
      </li>
      <li class="link-list-item">
        <a class="link" href="https://zenn.dev/tenjo">
          <img src="../../assets/zenn.svg" alt="Zenn" />
        </a>
      </li>
      <li class="link-list-item">
        <a class="link" href="">
          <img src="../../assets/x.svg" alt="X (Twitter)" />
        </a>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.heading {
  color: var(--heading);
  font-size: var(--heading-l);
  font-weight: bolder;
  line-height: var(--heading-line-height);
  margin: var(--heading-margin);
}

.card + .card {
  margin-top: 16px;
}

.card {
  display: grid;
  grid-template-columns: 96px 1fr;
}

.card-date {
  padding: 8px 0;
}

.card-link {
  background-color: var(--bg-200);
  border: solid 1px var(--bg-200);
  border-radius: 4px;
  display: block;
  padding: 8px;
  transition: border-color 0.2s;
}

.card-link:hover,
.card-link:focus {
  border-color: var(--border-field-200);
}

.card-link:active {
  border-color: var(--border-field-300);
}

.link-list {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}

.link-list-item {
  flex-basis: 80px;
  height: 80px;
}

.link {
  background-color: var(--bg-50);
  border: 1px solid var(--bg-50);
  border-radius: 16px;
  display: block;
  padding: 16px;
  transition: border-color 0.2s;
}

.link:hover,
.link:focus {
  border-color: var(--border-field-200);
}

.link:active {
  border-color: var(--border-field-300);
}

@media screen and (max-width: 450px) {
  .card {
    display: block;
  }

  .card-date {
    padding: 0;
  }
}
</style>

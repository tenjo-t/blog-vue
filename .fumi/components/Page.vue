<script setup>
import { useData, Content } from "@tenjot/fumi/client";

const { page } = useData();
</script>

<template>
  <article class="article">
    <h1>{{ page.frontmatter.title }}</h1>
    <div class="date">
      <template v-if="page.frontmatter.createdAt === page.frontmatter.updatedAt">
        <div>{{ page.frontmatter.createdAt }}に公開</div>
      </template>
      <template v-else>
        <div>{{ page.frontmatter.updatedAt }}に更新</div>
      </template>
    </div>

    <Content />
  </article>
</template>

<style scoped>
.article {
  padding: 16px;
}

.date {
  padding-bottom: 16px;
}

.article
  :deep(
    :where(nav, p, ul, ol, blockquote, hr, table, pre, div, details)
      + :where(nav, p, ul, ol, blockquote, hr, table, pre, div, details)
  ) {
  margin-top: var(--body-margin-div);
}

/* Link */
.article :deep(a[href]) {
  color: var(--text-blue-100);
  text-decoration: none;
}

.article :deep(a[href]:hover),
.article :deep(a[href]:focus) {
  text-decoration: underline;
}

.article :deep(a[href]:active) {
  color: var(--text-blue-200);
}

/* Inline code */
.article :deep(:not(pre) > code) {
  background-color: var(--bg-200);
  border-radius: 4px;
  display: inline-block;
  line-height: 1;
  padding: 2px 6px;
}

/* Heading */
.article :deep(:where(h1, h2, h3, h4, h5, h6)) {
  color: var(--heading);
  font-weight: bolder;
  line-height: var(--heading-line-height);
  margin: var(--heading-margin-top) 0 var(--heading-margin-bottom);
}

.article :deep(h1) {
  font-size: var(--heading-xl);
}

.article :deep(h2) {
  font-size: var(--heading-l);
}

.article :deep(h3) {
  font-size: var(--heading-m);
}

.article :deep(h4) {
  font-size: var(--heading-s);
}

/* List */
.article :deep(:where(ul, ol)) {
  list-style-type: revert;
  padding-inline-start: 1.5em;
}

/* Blockquote */
.article :deep(blockquote) {
  background-color: var(--bg-50);
  border: 2px solid var(--border-decorative-100);
  border-radius: 8px;
  padding: 12px 12px 12px 24px;
  position: relative;
}

.article :deep(blockquote::before) {
  color: var(--disabled);
  content: "“";
  font-size: var(--heading-xl);
  left: 4px;
  position: absolute;
  top: -10px;
}

.article :deep(blockquote blockquote) {
  margin-top: 12px;
  padding: 12px 12px 12px 24px;
}

/* Bar */
.article :deep(hr) {
  border-block-start: 2px solid var(--border-content-100);
}

/* Table */
.article :deep(table) {
  border-spacing: 0;
  --border: 1px solid var(--border-content-100);
  --radius: 4px;
}

.article :deep(th) {
  font-weight: bolder;
  padding: 5px 16px;
  text-align: left;
}

.article :deep(td) {
  background-color: var(--bg-50);
  border-bottom: var(--border);
  padding: 10px 16px;
}

.article :deep(tr:first-child > td) {
  border-top: var(--border);
}

.article :deep(td:first-child) {
  border-left: var(--border);
}

.article :deep(td:last-child) {
  border-right: var(--border);
}

.article :deep(tr:first-child > td:first-child) {
  border-top-left-radius: var(--radius);
}

.article :deep(tr:first-child > td:last-child) {
  border-top-right-radius: var(--radius);
}

.article :deep(tr:last-child > td:first-child) {
  border-bottom-left-radius: var(--radius);
}

.article :deep(tr:last-child > td:last-child) {
  border-bottom-right-radius: var(--radius);
}

/* Code block */
.article :deep(pre) {
  background-color: var(--gray-800);
  border-radius: 8px;
  overflow-x: auto;
  padding: 16px;
}

.article :deep(pre > code) {
  font-family: var(--monospace);
  line-height: var(--line-height-100);
}

.article :deep(div[class*="language-"]) {
  position: relative;
}

.article :deep(div[class*="language-"] .lang) {
  color: var(--gray-500);
  line-height: 1;
  position: absolute;
  right: 8px;
  top: 8px;
}
</style>

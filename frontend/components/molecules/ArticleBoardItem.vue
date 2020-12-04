<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="article-board-item">
    <h1>{{ title }}</h1>
  </div>
</template>

<style>
.article-board-item {
  width: calc(8 * var(--un));
  height: calc(8 * var(--un));
  background-color: #B5FBD9;
  border-radius: 50%;
  overflow: hidden;
}

.article-board-item > h1 {
  width: calc(10 * var(--un));
  color: #fff;
  opacity: 0.8;
}
</style>
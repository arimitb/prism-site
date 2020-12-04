<script>
import articlesQuery from '~/apollo/queries/article/articles'
import sourcesQuery from '~/apollo/queries/source/sources'

export default {
  apollo: {
    articles: {
      prefetch: true,
      query: articlesQuery
    },
    sources: {
      prefetch: true,
      query: sourcesQuery
    }
  },
  data () {
    return {
      articles: [],
      sources: []
    }
  }
}
</script>

<template>
  <div class="index-page">
    <AppHeader />
    <ArticleBoard :articles="articles" />
  </div>
</template>

<style>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(2 * var(--un));
  z-index: 100;
}

.article-board {
  position: absolute;
  top: calc(2 * var(--un));
  left: 0;
  width: calc(100% + 20px);
  height: calc(100% - (2 * var(--un)) + 20px);
}
</style>
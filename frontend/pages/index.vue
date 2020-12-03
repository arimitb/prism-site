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
    <BlobBoard />
  </div>
</template>

<style>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
</style>
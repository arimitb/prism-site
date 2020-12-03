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
  <div>
  </div>
</template>
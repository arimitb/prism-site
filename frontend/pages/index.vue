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
      sources: [],
      readerActive: false,
      curArticle: null,
      curSource: {
        title: ''
      },
      menuActive: false,
      printActive: false
    }
  },
  created () {
    this.assignArticleColors()
  },
  methods: {
    articleClickHandler (e) {
      this.curArticle = this.articles.find(article => article.id == e)
      this.readerActive = true
    },
    articleHoverHandler (sourceId) {
      this.curSource = this.sources.find(source => source.id == sourceId)
    },
    assignArticleColors () {
      for (let i = 0; i < this.articles.length; i++) {
        this.articles[i].color = `hsl(${Math.floor(Math.random() * 358)}, 100%, 70%)`
      }
    },
    closeReaderHandler () {
      this.readerActive = false
    },
    connectionClickHandler (e) {
      this.curArticle = this.articles.find(article => article.id == e)
    },
    toggleMenu () {
      this.menuActive = !this.menuActive
    },
    menuSelectionHandler (e) {
      this.menuActive = false

      switch (e) {
        case 'print':
          window.open('/print/index.html')
          break;
      }
    }
  }
}
</script>

<template>
  <div class="index-page">
    <AppMenu
      :class="{ 'active': menuActive }"
      @selection="menuSelectionHandler"
    />
    <div
      class="app-menu-overlay"
      :class="{ 'active': menuActive }"
      @click="toggleMenu"
    ></div>
    <AppHeader
      :source-title="this.curSource.title"
      @menu-click="toggleMenu"
    />
    <ArticleReader
      v-if="readerActive"
      :article="curArticle"
      @close-reader="closeReaderHandler"
      @connection-click="connectionClickHandler"
    />
    <ArticleBoard
      :articles="articles"
      @article-click="articleClickHandler"
      @article-hover="articleHoverHandler"
    />
    <ArticleReaderPrint
      v-if="printActive"
      :articles="articles"
    />
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

.article-board, .article-reader {
  position: absolute;
  top: calc(2 * var(--un));
  left: 0;
  width: 100%;
  height: calc(100% - (2 * var(--un)));
}

.article-reader {
  z-index: 10;
}

.article-reader-print {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.app-menu {
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  width: 20vw;
  height: 100%;
  z-index: 200;
  transition: transform 0.2s;
}

.app-menu.active {
  transform: translateX(0);
}

.app-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: var(--bg-col);
  z-index: 190;
  pointer-events: none;
  transition: opacity 0.2s;
}

.app-menu-overlay.active {
  pointer-events: all;
  opacity: 0.8;
}
</style>
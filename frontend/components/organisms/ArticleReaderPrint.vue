<script>
import { Previewer } from 'pagedjs'

export default {
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  mounted () {
    const paged = new Previewer()
    // const flow = paged.preview(this.$el, null, document.body)
    //   .then(flow => {
    //     console.log(`Rendered ${flow.total} pages.`)
    //   })
    const ctx = this.$refs.canvas.getContext('2d')

    this.resizeCanvas()

    window.addEventListener('beforeprint', e => {
      this.resizeCanvas()
      ctx.fillStyle = 'cyan'
      ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
      ctx.fillStyle = 'red'
      ctx.fillRect(0, 0, 100, 100)
    })
  },
  methods: {
    resizeCanvas () {
      const rect = this.$refs.canvas.getBoundingClientRect()
      this.$refs.canvas.width = rect.width
      this.$refs.canvas.height = rect.height
    }
  }
}
</script>

<template>
  <div class="article-reader-print">
    <div ref="pagedTarget"></div>
    <article
      v-for="article in articles"
      :key="article.id"
    >
      <h1>{{ article.title }}</h1>
      <div v-html="$md.render(article.content)"></div>
    </article>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style>
.article-reader-print {
  background-color: var(--bg-col);
}

.article-reader-print canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
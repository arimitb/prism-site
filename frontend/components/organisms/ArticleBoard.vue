<script>
export default {
  ctx: null,
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  mounted () {
    this.scrollToCenter()

    this.$options.ctx = this.$refs.connectionCanvas.getContext('2d')

    window.addEventListener('resize', this.resizeCanvas)

    this.$nextTick(() => {
      this.resizeCanvas()
    })
  },
  methods: {
    articlePositionStyle (posX, posY) {
      return `transform: translate(${(posX * 100) - 50}%, ${(posY * 100) - 50}%); background-color: hsl(${Math.random() * 358}, 100%, 70%);`
    },
    scrollToCenter () {
      this.$el.scrollTop = (this.$el.scrollHeight / 2) - (this.$el.clientHeight / 2)
      this.$el.scrollLeft = (this.$el.scrollWidth / 2) - (this.$el.clientWidth / 2)
    },
    resizeCanvas () {
      const boundingClientRect = this.$refs.articleBoardScrollable.getBoundingClientRect()
      this.$refs.connectionCanvas.width = parseInt(boundingClientRect.width, 10)
      this.$refs.connectionCanvas.height = parseInt(boundingClientRect.height, 10)

      this.drawConnections()
    },
    drawConnections () {
      const containerRect = this.$refs.articleBoardScrollable.getBoundingClientRect()
      const containerTop = Math.abs(containerRect.top)
      const containerLeft = Math.abs(containerRect.left)

      const ctx = this.$options.ctx

      ctx.clearRect(0, 0, this.$refs.connectionCanvas.width, this.$refs.connectionCanvas.height)

      ctx.strokeStyle = '#111'
      ctx.strokeWidth = 1

      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].children.length > 0) {
          let selfIndex = null
          let childIndex = []

          let childId = []

          for (let j = 0; j < this.articles[i].children.length; j++) {
            childId.push(this.articles[i].children[j].id)
          }

          for (let j = 0; j < this.$refs.articleBoardItem.length; j++) {
            const curId = parseInt(this.$refs.articleBoardItem[j].$vnode.key, 10)

            if (curId == this.articles[i].id) {
              selfIndex = j
            } else if (childId.find(e => e == curId)) {
              childIndex.push(j)
            }
          }

          const selfRect = this.$refs.articleBoardItem[selfIndex].$el.getBoundingClientRect()
          const selfPos = {
            x: containerLeft + selfRect.left + (selfRect.width / 2),
            y: containerTop + selfRect.top + (selfRect.height / 2)
          }

          for (let j = 0; j < childIndex.length; j++) {
            const curRect = this.$refs.articleBoardItem[childIndex[j]].$el.getBoundingClientRect()

            const curPos = {
              x: containerLeft + curRect.left + (curRect.width / 2),
              y: containerTop + curRect.top + (curRect.height / 2)
            }

            ctx.beginPath()
            ctx.moveTo(selfPos.x, selfPos.y);
            ctx.lineTo(curPos.x, curPos.y);
            ctx.stroke()
          }
        }
      }
    }
  }
}
</script>

<template>
  <div class="article-board">
    <div
      class="article-board-scrollable"
      ref="articleBoardScrollable"
    >
      <ArticleBoardItem
        v-for="article in articles"
        :title="article.title"
        :key="article.id"
        :style="articlePositionStyle(article.position_x, article.position_y)"
        :data-id="article.id"
        ref="articleBoardItem"
      />
      <canvas ref="connectionCanvas"></canvas>
    </div>
  </div>
</template>

<style>
.article-board {
  background: var(--bg-col);
  overflow: scroll;
}

.article-board-scrollable {
  position: relative;
  width: 500vw;
  height: 500vw;
}

.article-board-item {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
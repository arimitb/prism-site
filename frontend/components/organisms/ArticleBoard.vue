<script>
export default {
  density: '8 * var(--un)',
  ctx: null,
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      grabStartPos: null
    }
  },
  mounted () {
    this.scrollToCenter()
    this.attachGrabEventListeners()

    this.$options.ctx = this.$refs.connectionCanvas.getContext('2d')

    window.addEventListener('resize', this.resizeCanvas)

    this.$nextTick(() => {
      this.resizeCanvas()
    })
  },
  methods: {
    articlePositionStyle (posX, posY, color) {
      let parsedColor = color ? color : 'rgb(127, 127, 127)'
      return `left: calc(50% + (${posX} * ${this.$options.density})); top: calc(50% + (${posY} * ${this.$options.density})); fill: ${parsedColor};`
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
      const stringBend = 200

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

            let cp1x, cp1y, cp2x, cp2y

            if (curPos.x > selfPos.x) {
              cp1x = selfPos.x + (Math.abs(curPos.x - selfPos.x) / 3) + (stringBend * Math.random())
              cp2x = selfPos.x + (2 * Math.abs(curPos.x - selfPos.x) / 3) + (stringBend * Math.random())
            } else {
              cp1x = selfPos.x - (Math.abs(curPos.x - selfPos.x) / 3) + (stringBend * Math.random())
              cp2x = selfPos.x - (2 * Math.abs(curPos.x - selfPos.x) / 3) + (stringBend * Math.random())
            }

            if (curPos.y > selfPos.y) {
              cp1y = selfPos.y + (Math.abs(curPos.y - selfPos.y) / 3) + (stringBend * Math.random())
              cp2y = selfPos.y + (2 * Math.abs(curPos.y - selfPos.y) / 3) + (stringBend * Math.random())
            } else {
              cp1y = selfPos.y - (Math.abs(curPos.y - selfPos.y) / 3) + (stringBend * Math.random())
              cp2y = selfPos.y - (2 * Math.abs(curPos.y - selfPos.y) / 3) + (stringBend * Math.random())
            }

            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, curPos.x, curPos.y)
            ctx.stroke()
            ctx.closePath()
          }
        }
      }
    },
    articleClickHandler (e) {
      this.$emit('article-click', e.id)
    },
    articleMouseEnterHandler (e) {
      const rootArticleId = this.getDataId(e.target)

      const rootArticle = this.articles.find(article => article.id == rootArticleId)
      const sourceId = this.getParentSource(rootArticle).id

      this.$emit('article-hover', sourceId)
    },
    getDataId (el) {
      return parseInt(el.getAttribute('data-id'), 10)
    },
    getParentSource (article) {
      if (article.source != null) {
        return article.source
      }

      for (let i = 0; i < article.parents.length; i++) {
        const parentArticle = this.articles.find(e => e.id == article.parents[i].id)

        const parentSource = this.getParentSource(parentArticle)

        if (parentSource != null) {
          return parentSource
        }
      }

      return null
    },
    attachGrabEventListeners () {
      this.$el.addEventListener('mousedown', this.mouseDownHandler)
      this.$el.addEventListener('mouseup', this.mouseUpHandler)
    },
    mouseDownHandler (e) {
      this.grabStartPos = {
        cursor: {
          x: e.clientX,
          y: e.clientY
        },
        scroll: {
          x: this.$el.scrollLeft,
          y: this.$el.scrollTop
        }
      }

      this.$el.addEventListener('mousemove', this.mouseMoveHandler)
    },
    mouseMoveHandler (e) {
      const curPos = {
        x: e.clientX,
        y: e.clientY
      }

      this.$el.scrollLeft = this.grabStartPos.scroll.x + (this.grabStartPos.cursor.x - curPos.x)
      this.$el.scrollTop = this.grabStartPos.scroll.y + (this.grabStartPos.cursor.y - curPos.y)
    },
    mouseUpHandler () {
      this.$el.removeEventListener('mousemove', this.mouseMoveHandler)
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
        :style="articlePositionStyle(article.position_x, article.position_y, article.color)"
        :data-id="article.id"
        :id="article.id"
        ref="articleBoardItem"
        @click="articleClickHandler"
        @mouseenter.native="articleMouseEnterHandler"
      />
      <canvas ref="connectionCanvas"></canvas>
    </div>
  </div>
</template>

<style>
.article-board {
  background: var(--bg-col);
  overflow: scroll;
  cursor: grab;
}

.article-board:active {
  cursor: grabbing;
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
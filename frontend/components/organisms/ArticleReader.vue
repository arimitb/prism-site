<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      apiUrl: process.env.strapiBaseUri
    }
  },
  computed: {
    backgroundColorStyle () {
      return `background-color: ${this.article.color};`
    }
  },
  watch: {
    article () {
      this.$nextTick(() => {
        this.positionConnections()
      })
    }
  },
  mounted () {
    this.positionConnections()
  },
  methods: {
    positionConnections () {
      if (this.$refs.childConnection) {
        for (let i = 0; i < this.$refs.childConnection.length; i++) {
          this.$refs.childConnection[i].style = `top: calc((${Math.random()} * 50vh) - 10vh);`

          let x1 = Math.random() * 25
          let x2 = 50 - (Math.random() * 25)
          let y1 = 25 + ((Math.random() - 0.5) * 50)
          let y2 = 25 + ((Math.random() - 0.5) * 50)
          let path = `M 0 25 C ${x1} ${y1}, ${x2} ${y2}, 50 25`

          this.$refs.childConnection[i].children[0].setAttribute('d', path)
        }
      }

      if (this.$refs.parentConnection) {
        for (let i = 0; i < this.$refs.parentConnection.length; i++) {
          this.$refs.parentConnection[i].style = `top: calc((${Math.random()} * 50vh) - 10vh);`

          let x1 = Math.random() * 25
          let x2 = 50 - (Math.random() * 25)
          let y1 = 25 + ((Math.random() - 0.5) * 50)
          let y2 = 25 + ((Math.random() - 0.5) * 50)
          let path = `M 0 25 C ${x1} ${y1}, ${x2} ${y2}, 50 25`

          this.$refs.parentConnection[i].children[0].setAttribute('d', path)
        }
      }
    },
    backgroundClickHandler (e) {
      if (e.target == this.$el) {
        this.$emit('close-reader')
      }
    },
    pathClickHandler (e) {
      const id = e.target.parentNode.getAttribute('data-id')

      this.$emit('connection-click', id)
    }
  }
}
</script>

<template>
  <section
    class="article-reader"
    :style="backgroundColorStyle"
    @click="backgroundClickHandler"
  >
    <div class="article-reader-scrollable-container">
      <div class="article-reader-side article-reader-side-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 56 1024"
          class="article-reader-wave"
        >
          <path d="M14.5,1024C14.5,964.5,2,963.5,2,899.43S21,782.5,21,691.5s-18-96-18-154,21-90,21-194-24-90-24-174S14.5,64.5,14.5,0H56V1024Z"/>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 56 1024"
          class="article-reader-wave"
        >
          <path d="M14.5,1024C14.5,964.5,2,963.5,2,899.43S21,782.5,21,691.5s-18-96-18-154,21-90,21-194-24-90-24-174S14.5,64.5,14.5,0H56V1024Z"/>
        </svg>
      </div>
      <div class="article-reader-side article-reader-side-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 56 1024"
          class="article-reader-wave"
        >
          <path d="M14.5,1024C14.5,964.5,2,963.5,2,899.43S21,782.5,21,691.5s-18-96-18-154,21-90,21-194-24-90-24-174S14.5,64.5,14.5,0H56V1024Z"/>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 56 1024"
          class="article-reader-wave"
        >
          <path d="M14.5,1024C14.5,964.5,2,963.5,2,899.43S21,782.5,21,691.5s-18-96-18-154,21-90,21-194-24-90-24-174S14.5,64.5,14.5,0H56V1024Z"/>
        </svg>
      </div>
      <div class="article-reader-scrollable">
        <article
          v-if="article.content"
        >
          <h1>{{ article.title }}</h1>
          <div class="article-info base-font">
            <img src="https://source.unsplash.com/collection/4389261/128x128">
            <div>
              <div class="author">{{ article.author }}</div>
              <div class="date">Published on {{ article.date }}</div>
            </div>
          </div>
          <div
            class="article-reader-content"
            v-html="$md.render(article.content)"
          >
          </div>
        </article>
      </div>
    </div>
    <svg
      class="article-reader-connection child"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      v-for="child in article.children"
      :key="child.id"
      :data-id="child.id"
      ref="childConnection"
    >
      <path
        d="M 0 25 C 20 20, 40 20, 45 25" stroke="var(--bg-col)"
        fill="transparent" 
        vector-effect="non-scaling-stroke"
        @click="pathClickHandler"
      />
    </svg>
    <svg
      class="article-reader-connection parent"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      v-for="parent in article.parents"
      :key="parent.id"
      :data-id="parent.id"
      ref="parentConnection"
    >
      <path
        d="M 0 25 C 20 20, 40 20, 45 25" stroke="var(--bg-col)"
        fill="transparent" 
        vector-effect="non-scaling-stroke"
        @click="pathClickHandler"
      />
    </svg>
  </section>
</template>

<style>
.article-reader {
  background-color: var(--bg-col);
  cursor: zoom-out;
}

.article-reader-scrollable-container {
  position: relative;
  width: calc(28 * var(--un));
  max-width: calc(100% - (2 * var(--un)));
  height: 100%;
  margin: auto;
  background-color: var(--bg-col);
  cursor: auto;
  z-index: 10;
}

.article-reader-scrollable {
  width: calc(100% + 30px);
  height: 100%;
  padding: 0 calc(4 * var(--un));
  padding-top: var(--un);
  padding-bottom: calc(2 * var(--un));
  box-sizing: border-box;
  overflow-y: scroll;
}

.article-reader-side {
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  top: 0;
  right: 2px;
  transform: translateX(100%);
  pointer-events: none;
}

.article-reader-side.article-reader-side-left {
  right: auto;
  left: 2px;
  transform: translateX(-100%);
}

.article-reader-side svg > path {
  fill: var(--bg-col);
  pointer-events: all;
}

.article-reader-wave {
  height: 200vh;
  animation: wave-anim-1 10s linear infinite;
}

.article-reader-side.article-reader-side-left .article-reader-wave {
  animation: wave-anim-2 10s linear infinite;
}

@keyframes wave-anim-1 {
  from {
    transform: translateY(0) scaleX(-1);
  }

  to {
    transform: translateY(-100%) scaleX(-1);
  }
}

@keyframes wave-anim-2 {
  from {
    transform: translateY(-50%);
  }

  to {
    transform: translateY(-150%);
  }
}

.article-reader article {
  font: var(--base-font);
}

.article-reader article img {
  width: 100%;
}

.article-info {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.article-reader article > .article-info > img {
  width: calc(1.5 * var(--un));
  height: calc(1.5 * var(--un));
  margin-right: calc(0.5 * var(--un));
  object-fit: cover;
  border-radius: 50%;
}

.article-info .author {
  line-height: var(--un);
}

.article-info .date {
  font-size: calc(var(--un) / 2.25);
  line-height: calc(var(--un) / 2.25);
  font-style: italic;
  opacity: 0.5;
}

.article-reader-connection {
  position: absolute;
  width: 40vw;
  stroke-width: calc(4 * var(--ln));
  pointer-events: none;
}

.article-reader-connection.parent {
  left: calc(-1 * var(--un));
}

.article-reader-connection.child {
  right: calc(-1 * var(--un));
}

.article-reader-connection > path {
  transition: stroke-width 0.2s;
  pointer-events: auto;
  cursor: pointer;
}

.article-reader-connection > path:hover {
  stroke-width: calc(8 * var(--ln));
}
</style>
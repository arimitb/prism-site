<script>
export default {
  blobPaths: [
    'M57,-52.7C68.3,-45.7,68.1,-22.9,65,-3C62,16.8,56.1,33.5,44.8,50C33.5,66.5,16.8,82.6,1.6,81.1C-13.6,79.5,-27.2,60.2,-39.4,43.7C-51.6,27.2,-62.4,13.6,-60.8,1.6C-59.3,-10.5,-45.3,-20.9,-33.1,-28C-20.9,-35,-10.5,-38.5,6.2,-44.7C22.9,-50.9,45.7,-59.7,57,-52.7Z',
    'M27.6,-25.7C40.3,-14.9,58.2,-7.5,65.3,7.1C72.4,21.6,68.6,43.3,56,49C43.3,54.7,21.6,44.5,7.8,36.7C-6,28.9,-12,23.4,-17.1,17.7C-22.2,12,-26.4,6,-30.5,-4.1C-34.7,-14.3,-38.8,-28.6,-33.7,-39.4C-28.6,-50.1,-14.3,-57.4,-3.4,-53.9C7.5,-50.5,14.9,-36.4,27.6,-25.7Z',
    'M23.8,-31.9C31.4,-16.2,38.4,-8.1,41.9,3.5C45.5,15.2,45.5,30.4,37.9,43.7C30.4,57,15.2,68.4,-1.7,70.2C-18.6,71.9,-37.3,63.9,-44.4,50.6C-51.5,37.3,-47.1,18.6,-43,4.1C-38.9,-10.4,-35.1,-20.9,-28,-36.6C-20.9,-52.3,-10.4,-73.2,-1.2,-72.1C8.1,-70.9,16.2,-47.6,23.8,-31.9Z',
    'M35.4,-39.5C43.9,-27,47.4,-13.5,45.1,-2.3C42.8,8.9,34.8,17.9,26.3,28.8C17.9,39.7,8.9,52.6,-1,53.6C-10.9,54.6,-21.8,43.7,-30,32.8C-38.2,21.8,-43.7,10.9,-47.9,-4.2C-52.1,-19.3,-55.1,-38.7,-46.9,-51.3C-38.7,-63.8,-19.3,-69.6,-2.9,-66.6C13.5,-63.7,27,-52.1,35.4,-39.5Z',
    'M30.3,-23.4C42.7,-17.8,58.7,-8.9,65.7,7C72.6,22.8,70.6,45.7,58.1,58.3C45.7,70.9,22.8,73.4,0.9,72.4C-21,71.5,-42,67.3,-46.4,54.6C-50.9,42,-38.7,21,-38.8,-0.1C-38.9,-21.1,-51.1,-42.2,-46.7,-47.8C-42.2,-53.4,-21.1,-43.5,-6.1,-37.4C8.9,-31.3,17.8,-29,30.3,-23.4Z',
    'M27.5,-24.1C40.2,-14.7,58.5,-7.3,61.8,3.3C65.1,14,53.5,28,40.8,33.2C28,38.3,14,34.7,-2.6,37.3C-19.1,39.8,-38.2,48.6,-51.2,43.4C-64.2,38.2,-71,19.1,-68,3C-65,-13,-52.1,-26.1,-39.1,-35.5C-26.1,-44.9,-13,-50.6,-2.9,-47.8C7.3,-44.9,14.7,-33.5,27.5,-24.1Z',
    'M40.9,-38.5C54.4,-27.5,67.5,-13.8,67.6,0.2C67.8,14.1,55,28.2,41.6,37.9C28.2,47.7,14.1,53.1,1.3,51.8C-11.5,50.5,-23,42.5,-30.5,32.8C-38,23,-41.5,11.5,-45.5,-4C-49.5,-19.5,-54,-39,-46.5,-50C-39,-61.1,-19.5,-63.7,-2.9,-60.8C13.8,-57.9,27.5,-49.6,40.9,-38.5Z',
    'M19,-30.9C23.2,-14.8,24.3,-7.4,27.8,3.5C31.2,14.3,37.1,28.6,32.8,41.6C28.6,54.6,14.3,66.3,4.1,62.2C-6.1,58.1,-12.1,38.1,-20.2,25.1C-28.3,12.1,-38.5,6.1,-42.9,-4.4C-47.3,-14.9,-46,-29.8,-37.9,-46C-29.8,-62.2,-14.9,-79.6,-3.8,-75.9C7.4,-72.1,14.8,-47.1,19,-30.9Z',
    'M51.1,-55.3C62.9,-39.3,66.8,-19.6,67.2,0.4C67.5,20.4,64.4,40.8,52.6,55.8C40.8,70.8,20.4,80.4,1.5,78.9C-17.4,77.4,-34.8,64.8,-49.2,49.8C-63.6,34.8,-75,17.4,-77.1,-2.1C-79.3,-21.7,-72.1,-43.3,-57.7,-59.3C-43.3,-75.3,-21.7,-85.6,-1,-84.6C19.6,-83.6,39.3,-71.3,51.1,-55.3Z',
    'M52.9,-54.4C65.5,-40.2,70.8,-20.1,66,-4.8C61.2,10.5,46.3,20.9,33.6,29.1C20.9,37.3,10.5,43.2,-6,49.2C-22.5,55.2,-45,61.3,-53.8,53.1C-62.7,45,-58,22.5,-50,8C-42,-6.5,-30.8,-13.1,-21.9,-27.3C-13.1,-41.5,-6.5,-63.4,6.8,-70.2C20.1,-76.9,40.2,-68.6,52.9,-54.4Z'
  ],
  svg: null,
  path: null,
  text: null,
  curPathIndex: 0,
  props: {
    id: {
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$options.svg = Snap(this.$refs.blobSvg)
    this.$options.path = this.$options.svg.path(this.$options.blobPaths[0])
    this.$options.clipPath = this.$options.svg.path(this.$options.blobPaths[0])
    this.$options.text = this.$options.svg.text({
      text: this.getMultilineText(this.title, 10)
    })

    this.$options.path.node.addEventListener('click', () => {
      this.$emit('click', {
        el: this.$el,
        id: this.id
      })
    })

    this.$options.text
      .attr({
        class: 'article-board-item-title',
        clipPath: this.$options.clipPath
      })
      .selectAll('tspan').forEach((tspan, i) => {
        tspan.attr({ x: 70, y: 50 + (50 * (i + 1))})
      })

    this.$options.path.transform('translate(200 200) scale(2)')
    this.$options.clipPath.transform('translate(200, 200) scale(2)')

    this.$options.curPathIndex = Math.floor(Math.random() * this.$options.blobPaths.length)

    setTimeout(() => {
      this.animateBlob()
    }, Math.random() * 2500)
  },
  methods: {
    animateBlob () {
      this.$options.path.animate({
        d: this.$options.blobPaths[this.$options.curPathIndex]
      }, 5000, mina.easeinout, () => {
        let newIndex = Math.floor(Math.random() * this.$options.blobPaths.length)

        if (this.$options.curPathIndex == newIndex) {
          this.$options.curPathIndex = newIndex > 0 ? --newIndex : 1
        } else {
          this.$options.curPathIndex = newIndex
        }
        this.animateBlob()
      })

      this.$options.clipPath.animate({
        d: this.$options.blobPaths[this.$options.curPathIndex]
      }, 5000, mina.easeinout)
    },
    getMultilineText (text, lineLength) {
      let arr = []
      let lastIndex = 0
      for (let i = 0; i < text.length; i++) {
        if (i > lineLength * (arr.length + 1) && text[i] == ' ') {
          arr.push(text.substring(lastIndex, i))
          lastIndex = i + 1
        } else if (i >= text.length - 1) {
          arr.push(text.substring(lastIndex, i + 1))
        }
      }

      return arr
    }
  }
}
</script>

<template>
  <svg
    class="article-board-item"
    ref="blobSvg"
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
  >
  </svg>
</template>

<style>
.article-board-item {
  width: calc(12 * var(--un));
  height: calc(12 * var(--un));
  fill: #B5FBD9;
  overflow: hidden;
  transition: transform 2s 0.5s ease-in-out;
}

.article-board-item-title {
  font: var(--base-font);
  font-size: calc(1.8 * var(--un));
  line-height: calc(1.2 * 1.2 * var(--un));
  font-weight: 700;
  fill: rgba(255, 255, 255, 0.5);
  transition: opacity 0.5s;
}

.article-board-item * {
  pointer-events: none;
  user-select: none;
}

.article-board-item > path {
  pointer-events: all;
  cursor: zoom-in;
}
</style>
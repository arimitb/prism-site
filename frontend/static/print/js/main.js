let articles = null

const converter = new showdown.Converter()

const xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    articles = JSON.parse(this.responseText)

    for (article of articles) {
      article.color = `hsl(${Math.floor(Math.random() * 358)}, 100%, 70%)`
    }

    appendArticles()
    window.PagedPolyfill.preview()
  }
}
xhttp.open('GET', 'http://localhost:1337/articles', true)
xhttp.send()

function appendArticles () {
  let html = ''

  for (article of articles) {
    let source = null

    if (article.source) {
      source = article.source.title
    }

    html = html.concat(`
      <article data-article-id="${article.id}">
        <h1>${article.title}</h1>
        <div class="article-info">
          <img src="https://source.unsplash.com/collection/4389261/128x128">
          <div>
            <div>${article.author}</div>
            <div>Published on ${article.date}</div>
          </div>
        </div>
        <div class="article-content">
          ${converter.makeHtml(article.content)}
          ${source ? `<span class="source">Source: “${source}”</span>` : ``}
        </div>
      </article>
    `)
  }

  html = html.replaceAll('/uploads', 'http://localhost:1337/uploads')

  document.body.insertAdjacentHTML('beforeend', html)
}

class CustomHandler extends Paged.Handler {
  constructor (chunker, polisher, caller) {
    super(chunker, polisher, caller)
  }

  afterRendered (pages) {
    getFirstAndLastPages(pages)
    drawBackgrounds(pages)
  }
}

Paged.registerHandlers(CustomHandler)

function getFirstAndLastPages (pages) {
  let lastId = -1
  for (let i = 0; i < pages.length; i++) {
    const articleId = pages[i].wrapper.children[0].getAttribute('data-article-id')

    if (articleId != lastId) {
      const newArticle = articles.find(article => article.id == articleId)
      newArticle.firstPage = i
      
      if (lastId > -1) {
        const oldArticle = articles.find(article => article.id == lastId)
        oldArticle.lastPage = i - 1
        pages[i - 1].element.classList.add('article-last-page')
      }

      pages[i].element.classList.add('article-first-page')
    } else if (i == pages.length - 1) {
      const curArticle = articles.find(article => article.id == articleId)
      curArticle.lastPage = i
      pages[i].element.classList.add('article-last-page')
    }

    lastId = articleId
  }
}

function drawBackgrounds (pages) {
  let strings = []

  /*
  {
    startArticleIndex: int,
    endArticleIndex: int,
    completed: bool,
    positions: [float]
  }
  */

  for (let curPageIndex = 0; curPageIndex < pages.length; curPageIndex++) {
    const page = pages[curPageIndex]

    const articleId = page.wrapper.children[0].getAttribute('data-article-id')
    const article = articles.find(a => a.id == articleId)

    page.pagebox.insertAdjacentHTML('beforeend', `
      <canvas id="c-${page.id}" class="bg-canvas"></canvas>
    `)

    const canvas = document.querySelector(`#c-${page.id}`)
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width
    canvas.height = rect.height

    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'

    ctx.lineWidth = 10
    ctx.lineCap = 'round'

    // Draw blobs

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = article.color

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(rect.width, 0)
    ctx.lineTo(rect.width, rect.height * Math.random() * 0.3)
    ctx.bezierCurveTo(
      (0.5 * rect.width) + (rect.width * Math.random() * 0.25) , // cp1x
      rect.height * Math.random() * 0.3, // cp1y
      rect.width * Math.random() * 0.25, // cp2x
      rect.height * Math.random() * 0.3, // cp2y
      0, // x
      rect.height * Math.random() * 0.3 // y
    )
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(0, rect.height)
    ctx.lineTo(rect.width, rect.height)
    ctx.lineTo(rect.width, (0.7 * rect.height) + (rect.height * Math.random() * 0.3))
    ctx.bezierCurveTo(
      (0.5 * rect.width) + (rect.width * Math.random() * 0.25) , // cp1x
      (rect.height * 0.7) + (rect.height * Math.random() * 0.3), // cp1y
      rect.width * Math.random() * 0.25, // cp2x
      (rect.height * 0.7) + (rect.height * Math.random() * 0.3), // cp2y
      0, // x
      (rect.height * 0.7) + (rect.height * Math.random() * 0.3) // y
    )
    ctx.fill()

    // Draw connecting strings
    
    ctx.globalCompositeOperation = 'source-atop'
    ctx.strokeStyle = '#fff'
    if (curPageIndex == article.firstPage) {
      for (string of strings) {
        if (string.endArticleIndex == article.id) {
          // end string
          
          const topX = string.positions[string.positions.length - 1][0]
          const topHandleXOffset = string.positions[string.positions.length - 1][1]
          const topHandleYOffset = string.positions[string.positions.length - 1][2]
          
          const bottomPos = Math.floor(Math.random() * rect.width)

          string.completed = true

          ctx.beginPath()
          ctx.moveTo(topX, 0)
          ctx.bezierCurveTo(
            topX - topHandleXOffset,
            topHandleYOffset,
            bottomPos,
            0.5 * rect.height,
            bottomPos,
            rect.height * 0.5
          )
          ctx.stroke()
        }
      }
    }

    if (curPageIndex == article.lastPage) {
      let connections = []
      
      for (parent of article.parents) {
        connections.push(parent.id)
      }

      for (child of article.children) {
        connections.push(child.id)
      }

      for (connection of connections) {
        let connectionCompleted = false
        for (string of strings) {
          if (string.completed) {
            if (string.startArticleIndex == connection && string.endArticleIndex == articleId) {
              connectionCompleted = true
              break;
            }
          }
        }

        if (!connectionCompleted) {
          // start string

          const topPos = Math.floor(Math.random() * rect.width)
          const bottomX = Math.floor(Math.random() * rect.width)
          const bottomHandleXOffset = Math.floor(((Math.random() - 0.5) * 2) * rect.width * 0.25)
          const bottomHandleYOffset = Math.floor(0.4 * rect.height)

          strings.push({
            startArticleIndex: article.id,
            endArticleIndex: connection,
            completed: false,
            positions: [
              [bottomX, bottomHandleXOffset, bottomHandleYOffset]
            ]
          })

          ctx.beginPath()
          ctx.moveTo(topPos, rect.height * 0.5)
          ctx.bezierCurveTo(
            topPos,
            rect.height * 0.5,
            bottomX + bottomHandleXOffset,
            rect.height - bottomHandleYOffset,
            bottomX,
            rect.height
          )
          ctx.stroke()
        }
      }
    }

    // Draw passing strings

    for (string of strings) {
      if (!string.completed && string.startArticleIndex != article.id) {
        // draw normally

        ctx.globalCompositeOperation = 'source-atop'
        ctx.strokeStyle = '#fff'

        const topX = string.positions[string.positions.length - 1][0]
        const topHandleXOffset = string.positions[string.positions.length - 1][1]
        const topHandleYOffset = string.positions[string.positions.length - 1][2]
        const bottomX = Math.floor(Math.random() * rect.width)
        const bottomHandleXOffset = Math.floor(((Math.random() - 0.5) * 2) * rect.width * 0.25)
        const bottomHandleYOffset = Math.floor(0.4 * rect.height)
        string.positions.push([bottomX, bottomHandleXOffset, bottomHandleYOffset])

        ctx.beginPath()
        ctx.moveTo(topX, 0)
        ctx.bezierCurveTo(
          topX - topHandleXOffset,
          topHandleYOffset,
          bottomX + bottomHandleXOffset,
          rect.height - bottomHandleYOffset,
          bottomX,
          rect.height
        )
        ctx.stroke()

        // Draw same string twice, once like connecting, next for inversed area

        ctx.globalCompositeOperation = 'destination-over'
        ctx.strokeStyle = article.color

        ctx.beginPath()
        ctx.moveTo(topX, 0)
        ctx.bezierCurveTo(
          topX - topHandleXOffset,
          topHandleYOffset,
          bottomX + bottomHandleXOffset,
          rect.height - bottomHandleYOffset,
          bottomX,
          rect.height
        )
        ctx.stroke()
      }
    }

    page.pagebox.insertAdjacentHTML('beforeend', `
      <canvas id="c-${page.id}" class="bg-canvas"></canvas>
    `)
  }
}
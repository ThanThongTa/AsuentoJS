/* global requestAnimationFrame */
let co, ctx, loader, title

const animate = () => {
  ctx.clearRect(0, 0, co.width, co.height)
  ctx.fillStyle = 'rgb(51, 51, 51)'
  ctx.fillRect(0, 0, co.width, co.height)
  requestAnimationFrame(animate)
}

const setupLoadingAnimation = () => {
  co.style.display = 'none'
  title = document.querySelector('h1')
  title.style.display = 'none'

  const loadString = 'loading...'
  loader = document.querySelector('.loader')
  for (let i = 0; i < loadString.length; i++) {
    const span = document.createElement('span')
    span.innerText = loadString.charAt(i)
    span.setAttribute('style', '--i:' + (i + 1))
    loader.append(span)
  }

  setTimeout(() => {
    loader.classList.add('vanish')
    co.style.display = 'block'
    title.style.display = 'block'
    document.querySelector('body').classList.remove('loading')
  }, 4250)
}

function Effect () {
  this.a = 1
  this.show = () => {
    console.log('show')
  }
  this.update = () => { }
}

export const init = () => {
  co = document.querySelector('#canvas')
  ctx = co.getContext('2d')
  co.width = window.innerWidth - 20
  co.height = window.innerHeight - 20
  ctx.fillStyle = 'rgb(51, 51, 51)'
  ctx.fillRect(0, 0, co.width, co.height)

  setupLoadingAnimation()
  const eff = new Effect()
  eff.show()
}

export const sum = (a, b) => a + b

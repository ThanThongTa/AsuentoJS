/* global requestAnimationFrame */
let co, ctx, loader, title

// r(beta) = 1.2 * 0.6 * sin(0.5 * pi + 6 * beta)
// theta(beta) = 4 * beta
// phi(beta) = 0.2 * pi * sin(6 * beta)

// x = 10 (cos(t) + cos(3 t)) + cos(2 t) + cos(4 t)
// y = 6 sin(t) + 10 sin(3 t)
// z = 4 sin(3 t) sin(5 t / 2) + 4 sin(4 t) - 2 sin(6 t)
// 0 < t < 2 pi

// x = cos(u) [ 2 - cos(2 u/(2 k + 1)) ]
// y = sin(u) [ 2 - cos(2 u/(2 k + 1)) ]
// z = -sin(2 u/(2 k + 1))
// where 0 < u < (4 k + 2) pi

// x = 41 cos(u) - 18 sin(u) - 83 cos(2 u) - 83 sin(2 u) - 11 cos(3 u) + 27 sin(3 u)
// y = 36 cos(u) + 27 sin(u) - 113 cos(2 u) + 30 sin(2 u) + 11 cos(3 u) - 27 sin(3 u)
// z = 45 sin(u) - 30 cos(2 u) + 113 sin(2 u) - 11 cos(3 u) + 27 sin(3 u)
// where 0 < u < 2 pi

// x = -22 cos(u) - 128 sin(u) - 44 cos(3 u) - 78 sin(3 u)
// y = -10 cos(2 u) - 27 sin(2 u) + 38 cos(4 u) + 46 sin(4 u)
// z = 70 cos(3 u) - 40 sin(3 u)
// where 0 < u < 2 pi

const animate = () => {
  ctx.clearRect(0, 0, co.width, co.height)
  // ctx.fillStyle = 'rgb(51, 51, 51)'
  // ctx.fillRect(0, 0, co.width, co.height)
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

class Effect {
  constructor () {
    this.a = 1
    this.show = () => {
      console.log('show')
    }
    this.update = () => { }
  }
}

export const init = () => {
  co = document.querySelector('#canvas')
  ctx = co.getContext('2d')
  co.width = window.innerWidth - 20
  co.height = window.innerHeight - 20
  // ctx.fillStyle = 'rgb(51, 51, 51)'
  // ctx.fillRect(0, 0, co.width, co.height)

  setupLoadingAnimation()
  const eff = new Effect()
  eff.show()
}

export const main = () => {
  init()
  animate()
}

export const sum = (a, b) => a + b

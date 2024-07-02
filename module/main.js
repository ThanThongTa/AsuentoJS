/* global p5 */
let co, loader, title

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

export const init = () => {
  co = document.querySelector('#canvas')
  co.width = window.innerWidth - 20
  co.height = window.innerHeight - 20
  setupLoadingAnimation()
}

export const main = () => {
  init()
}

let alpha = 0

new p5(function (p5) { // eslint-disable-line new-cap, no-new
  p5.setup = function () {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL)
    p5.background(51, 5)
  }
  p5.draw = function () {
    p5.fill(0, 0, 0, alpha)
    p5.rect(-p5.width / 4, -p5.height / 4, p5.width / 2, p5.height / 2)
    if (alpha !== 1) alpha += 0.005
  }
})

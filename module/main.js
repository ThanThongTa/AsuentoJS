// 3D Knot
// Than Thong Ta
// inspired by The Coding Train / Daniel Shiffman
// https://www.youtube.com/watch?v=r6YMKr1X0VA&list=TLPQMDEwNzIwMjQ2yV5F1BzwMQ&index=2
// and Paul Bourke
// https://paulbourke.net/geometry/knots/

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

const sketch = function (p5) {
  p5.display = false

  p5.angle = 0
  p5.beta = 0
  p5.vectors = []
  p5.maxVectors = 3600

  p5.setup = function () {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL)
  }
  p5.draw = function () {
    if (!p5.display) return
    p5.background(51, 5)
    p5.orbitControl()
    p5.ambientLight(51, 0.1)

    p5.angle += 0.01

    p5.scale(0.5)
    const radius = 100

    for (let i = 0; i < 10; i++) {
      let r = 0.8 + 1.6 * p5.sin(6 * p5.beta)
      const theta = 2 * p5.beta
      const phi = 0.6 * p5.PI * p5.sin(12 * p5.beta)

      r = radius * r
      const x = r * p5.cos(phi) * p5.cos(theta)
      const y = r * p5.cos(phi) * p5.sin(theta)
      const z = r * p5.sin(phi)

      p5.vectors.push(p5.createVector(x, y, z))

      if (p5.vectors.length > p5.maxVectors) p5.vectors.shift()

      p5.beta += p5.PI / p5.maxVectors

      if (p5.beta >= p5.PI) {
        p5.beta = 0
      }
    }

    p5.noStroke()
    p5.beginShape(p5.TRIANGLE_STRIP)
    for (const v of p5.vectors) {
      p5.push()
      p5.translate(v.x, v.y, v.z)
      p5.emissiveMaterial(v.x, v.y, v.z, 0.5)
      p5.sphere(2.5)
      p5.pop()
    }
    p5.endShape()
  }
}

const myp5 = new p5(sketch) // eslint-disable-line new-cap, no-new

function displaySketch () {
  myp5.display = true
}

setTimeout(displaySketch, 4500)

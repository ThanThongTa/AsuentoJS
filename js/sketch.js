// 3D Knot
// Than Thong Ta
// inspired by The Coding Train / Daniel Shiffman
// https://www.youtube.com/watch?v=r6YMKr1X0VA&list=TLPQMDEwNzIwMjQ2yV5F1BzwMQ&index=2
// and Paul Bourke
// https://paulbourke.net/geometry/knots/

/* global createCanvas, WEBGL, background, sin, cos, PI, createVector, scale, stroke, strokeWeight, beginShape, vertex, endShape, rotateY, noFill */

let angle = 0
let beta = 0
const vectors = []
const maxVectors = 3600

function setup () {
  createCanvas(600, 400, WEBGL)
}

function draw () {
  background(0)
  rotateY(angle)
  scale(0.5)
  angle += 0.1

  const radius = 100

  for (let i = 0; i < 100; i++) {
    let r = 0.8 + 1.6 * sin(6 * beta)
    const theta = 2 * beta
    const phi = 0.6 * PI * sin(12 * beta)

    r = radius * r
    const x = r * cos(phi) * cos(theta)
    const y = r * cos(phi) * sin(theta)
    const z = r * sin(phi)

    vectors.push(createVector(x, y, z))

    if (vectors.length > maxVectors) vectors.shift()

    beta += PI / maxVectors

    if (beta >= PI) {
      beta = 0
    }
  }

  noFill()
  strokeWeight(4)
  beginShape()
  for (const v of vectors) {
    const d = v.mag()
    stroke(d, d, 255)
    vertex(v.x, v.y, v.z)
  }
  endShape()
}

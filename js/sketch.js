// 3D Knot
// Than Thong Ta
// inspired by The Coding Train / Daniel Shiffman
// https://www.youtube.com/watch?v=r6YMKr1X0VA&list=TLPQMDEwNzIwMjQ2yV5F1BzwMQ&index=2
// and Paul Bourke
// https://paulbourke.net/geometry/knots/

/* global createCanvas, WEBGL, background, sin, cos, PI, createVector, scale, stroke, strokeWeight, beginShape, vertex, endShape, rotateX, rotateY, rotateZ, noFill */

let angle = 0
let beta = 0
const vectors = []
const maxVectors = 3600

function setup () {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL)
}

function draw () {
  background(255, 5)
  orbitControl()
  ambientLight(51, 0.1)

  angle += 0.01

  scale(0.5)
  const radius = 100

  for (let i = 0; i < 10; i++) {
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

  noStroke()
  beginShape(TRIANGLE_STRIP)
  for (const v of vectors) {
    // stroke(v.x, v.y, v.z)
    // fill(v.x, v.y, v.z)
    // ambientMaterial(v.x, v.y, v.z)
    push()
    translate(v.x, v.y, v.z)
    emissiveMaterial(v.x, v.y, v.z, 0.5)
    sphere(2.5)
    pop()
    // vertex(v.x, v.y, v.z)
    // vertex(v.x - 2, v.y - 2, v.z)
    // vertex(v.x, v.y + 2, v.z - 2)
    // vertex(v.x + 2, v.y, v.z + 2)
  }
  endShape()

  // ambientMaterial(255)
  // noStroke()
  // torus(200, 60)
}

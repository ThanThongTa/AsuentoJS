// 3D Knot
// Than Thong Ta
// inspired by The Coding Train / Daniel Shiffman
// https://www.youtube.com/watch?v=r6YMKr1X0VA&list=TLPQMDEwNzIwMjQ2yV5F1BzwMQ&index=2
// and Paul Bourke
// https://paulbourke.net/geometry/knots/

/* global p5 */

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

const sketch = function (p5) {
  // Variablen, die über Funktionen von außen geändert werden können
  p5.display = false

  const TORUS = 1
  const EIGHT = 2
  const TREFOIL = 3
  const GRANNY = 4
  const BRAID = 5

  // Variablen, die über Slider und Buttons geändert werden können
  const vectors = []
  const maxVectors = 10000
  const sphereRadius = 2.5
  const materialAlpha = 0.5
  const drawSpeed = 300 // Anzahl der Kugeln, die gleichzeitig gezeichnet werden
  const knotType = 0
  const radius = 50
  const ambientLight = 128 // Werte von 0 bis 255. 0 ist schwarz, 255 ist weiss
  const trefoilK = 1

  let bias = 0.8
  let rFactor1 = 1
  let rFactor2 = 1.6
  let rPiFactor = 0
  let rBetaFactor = 6
  let thetaFactor = 2
  let phiPiFactor = 0.6
  let phiBetaFactor = 12

  // Knot 5:
  if (knotType === 5) {
    bias = 0
    rFactor1 = 1.2
    rFactor2 = 0.6
    rPiFactor = 0.5
    rBetaFactor = 6
    thetaFactor = 4
    phiPiFactor = 0.2
    phiBetaFactor = 6
  }

  // Variablen, die innerhalb der Anwendung geöändert werden
  // let angle = 0
  let beta = 0

  // berechnet einen einzelnen Punkt des Knotens
  const calcVector = (type) => {
    let x, y, z

    let r = 1
    let theta = 2 * beta
    let phi = 2 * p5.PI * p5.sin(6 * beta)

    if (type === TORUS) {
      r = bias * rFactor1 + rFactor2 * (rPiFactor * p5.PI + p5.sin(rBetaFactor * beta))
      theta = thetaFactor * beta
      phi = phiPiFactor * p5.PI * p5.sin(phiBetaFactor * beta)
    }

    r = radius * r
    switch (type) {
      case TORUS:
        x = r * p5.cos(phi) * p5.cos(theta)
        y = r * p5.cos(phi) * p5.sin(theta)
        z = r * p5.sin(phi)
        break
      case EIGHT:
        x = 10 * p5.cos(beta) + 10 * p5.cos(3 * beta) + p5.cos(2 * beta) + p5.cos(4 * beta)
        y = 6 * p5.sin(beta) + 10 * p5.sin(3 * beta)
        z = 4 * p5.sin(3 * beta) * p5.sin(5 * beta / 2) + 4 * p5.sin(4 * beta) - 2 * p5.sin(6 * beta)
        break
      case BRAID:
        x = 41 * p5.cos(1 * beta) - 18 * p5.sin(1 * beta) - 83 * p5.cos(2 * beta) - 83 * p5.sin(2 * beta) - 11 * p5.cos(3 * beta) + 27 * p5.sin(3 * beta)
        y = 36 * p5.cos(1 * beta) + 27 * p5.sin(1 * beta) - 113 * p5.cos(2 * beta) + 30 * p5.sin(2 * beta) + 11 * p5.cos(3 * beta) + 27 - p5.sin(3 * beta)
        z = 0 * p5.cos(1 * beta) + 45 * p5.sin(1 * beta) - 30 * p5.cos(2 * beta) + 113 * p5.sin(2 * beta) - 11 * p5.cos(3 * beta) + 27 * p5.sin(3 * beta)
        break
      case TREFOIL:
        x = p5.cos(beta) * (2 - p5.cos(2 * beta / (2 * trefoilK + 1)))
        y = p5.sin(beta) * (2 - p5.cos(2 * beta / (2 * trefoilK + 1)))
        z = -1 * p5.sin(2 * beta / (2 * trefoilK + 1))
        break
      case GRANNY:
        x = -22 * p5.cos(1 * beta) - 128 * p5.sin(1 * beta) - 44 * p5.cos(3 * beta) - 78 * p5.sin(3 * beta)
        y = -10 * p5.sin(2 * beta) - 27 * p5.cos(2 * beta) + 38 * p5.sin(4 * beta) + 46 * p5.cos(4 * beta)
        z = 70 * p5.sin(3 * beta) - 40 * p5.cos(3 * beta)
        break
      default:
        x = radius * p5.cos(beta)
        y = radius * p5.sin(beta)
        z = 0
    }
    return p5.createVector(x, y, z)
  }

  // berechnet alle Punkte eines Knotens
  const calcVectors = (type) => {
    vectors.push(calcVector(type))

    let maxBeta = 2 * p5.PI
    if (type === TREFOIL) maxBeta = (4 * trefoilK + 2) * p5.PI

    // nur eine bestimmte Anzahl an Kugeln zeichnen. Die ältesten werden gelöscht
    if (vectors.length > maxVectors) vectors.shift()

    // Beta ist der Winkel, der gerade gezeichnet wird.
    // Beta weitersetzen, für die Animation
    // 2 * PI = 360 Grad
    beta += maxBeta / maxVectors

    // Beta wieder auf 0 setzen, um die Animation wieder von vorne zu starten
    if (beta >= maxBeta) {
      beta = 0
    }
  }

  // p5 Funktion, die vor dem Zeichnen aufgerufen wird
  p5.setup = function () {
    p5.createCanvas(400, 400, p5.WEBGL)
  }

  // Loop-Funktion, die immer wieder aufgerufen wird
  p5.draw = function () {
    // nur zeichnen, wenn display true ist
    if (!p5.display) return
    p5.background(255, 25)
    // Orbit Controls sind die Mauskontrollen
    p5.orbitControl()
    // Licht von überall
    p5.ambientLight(ambientLight)

    // Kugeln berechnen
    for (let i = 0; i < drawSpeed; i++) {
      calcVectors(knotType)
    }

    // Kugeln zeichnen
    // Keine Umrisse für die Kugeln
    p5.noStroke()
    for (const v of vectors) {
      // Push bedeutet, dass wir den aktuellen Zustand bestimmter Werte speichern
      p5.push()
      // in WebGL 3D müssen wir über translate zu dem Punkt, an dem wir die Kugel zeichnen wollen
      p5.translate(v.x, v.y, v.z)
      // Die Kugel braucht ein Material. Emissive bedeutet, dass es Licht ausstrahlt
      p5.emissiveMaterial(v.x, v.y, v.z, materialAlpha)
      // normales Material wird nicht von Licht beeinflusst
      // p5.normalMaterial()
      p5.sphere(sphereRadius)
      // Mit Pop holen wir den gespeicherten Zustand bestimmter Werte zurück
      p5.pop()
    }
  }
}

// Aufruf des p5 Moduls
const myp5 = new p5(sketch) // eslint-disable-line new-cap, no-new

// normalerweise würde der p5 den Sketch direkt nach dem Aufruf der Seite laden
// Hiermit können wir kontrollieren, ob und wwann wir zeichnen wollen
export const displaySketch = () => {
  myp5.display = true
}

// Service Worker für die Offline Installation
export function serviceWorkerAktiv () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../service-worker.js', { scope: './' })
  }
}

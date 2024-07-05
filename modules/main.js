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

  // Variablen, die über Slider und Buttons geändert werden können
  const vectors = []
  const maxVectors = 10000
  const sphereRadius = 2.5
  const materialAlpha = 0.5
  const drawSpeed = 300 // Anzahl der Kugeln, die gleichzeitig gezeichnet werden
  const knotType = 0
  const radius = 50
  const ambientLight = 128 // Werte von 0 bis 255. 0 ist schwarz, 255 ist weiss

  // Variablen, die innerhalb der Anwendung geöändert werden
  // let angle = 0
  let beta = 0

  // berechnet einen einzelnen Punkt des Knotens
  const calcVector = (type) => {
    let x, y, z

    let r = 0.8 + 1.6 * p5.sin(6 * beta)
    const theta = 2 * beta
    const phi = 0.6 * p5.PI * p5.sin(12 * beta)

    r = radius * r
    switch (type) {
      case 1:
        x = r * p5.cos(phi) * p5.cos(theta)
        y = r * p5.cos(phi) * p5.sin(theta)
        z = r * p5.sin(phi)
        break
      default:
        x = radius * p5.sin(beta)
        y = radius * p5.cos(beta)
        z = 0
    }
    return p5.createVector(x, y, z)
  }

  // berechnet alle Punkte eines Knotens
  const calcVectors = (type) => {
    vectors.push(calcVector(type))

    // nur eine bestimmte Anzahl an Kugeln zeichnen. Die ältesten werden gelöscht
    if (vectors.length > maxVectors) vectors.shift()

    // Beta ist der Winkel, der gerade gezeichnet wird.
    // Beta weitersetzen, für die Animation
    // 2 * PI = 360 Grad
    beta += 2 * p5.PI / maxVectors

    // Beta wieder auf 0 setzen, um die Animation wieder von vorne zu starten
    if (beta >= 2 * p5.PI) {
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

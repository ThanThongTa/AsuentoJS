// 3D Knot
// Than Thong Ta
// inspired by The Coding Train / Daniel Shiffman
// https://www.youtube.com/watch?v=r6YMKr1X0VA&list=TLPQMDEwNzIwMjQ2yV5F1BzwMQ&index=2
// and Paul Bourke
// https://paulbourke.net/geometry/knots/

/* global p5 */
import { KnotFactory } from './knot.js'
import { UserInterface } from './ui.js'

export const globals = {
  knotType: 'torus',
  animate: false
}

const sketch = function (p5) {
  // Variablen, die über Funktionen von außen geändert werden können
  p5.display = false

  // Variablen, die innerhalb der Anwendung geöändert werden
  const ambientLight = 120 // Werte von 0 bis 255. 0 ist schwarz, 255 ist weiss
  let vectors = []
  let sphereRadius
  let drawSpeed // Anzahl der Kugeln, die gleichzeitig gezeichnet werden
  let knot
  let UI

  // p5 Funktion, die vor dem Zeichnen aufgerufen wird
  p5.setup = function () {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL)
    canvas.style('z-index', '1')
    knot = KnotFactory.createTorusKnot(p5, 10000, 200, 0, 0, 0, 1, 1, 1, 1, 0, 0)
    globals.animate = false
    UI = new UserInterface(p5)
    UI.prev = UI.getCurrentValues()
  }

  // Loop-Funktion, die immer wieder aufgerufen wird
  p5.draw = function () {
    // nur zeichnen, wenn display true ist
    if (!p5.display) return
    knot = UI.updateKnot(knot)
    drawSpeed = UI.drawSpeed
    sphereRadius = UI.sphereRadius

    if (vectors.length >= UI.current.maxVectors) {
      globals.animate = false
    }

    p5.background(255, 0.5)
    // Orbit Controls sind die Mauskontrollen
    p5.orbitControl()
    // Licht von überall
    p5.ambientLight(ambientLight, ambientLight, ambientLight)

    // Kugeln berechnen
    for (let i = 0; i < drawSpeed; i++) {
      vectors = knot.getVectors()
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
      p5.emissiveMaterial(v.x, v.y, v.z)
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

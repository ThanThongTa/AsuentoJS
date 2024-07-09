// 3D Knot
// Than Thong Ta
// inspired by The Coding Train / Daniel Shiffman
// https://www.youtube.com/watch?v=r6YMKr1X0VA&list=TLPQMDEwNzIwMjQ2yV5F1BzwMQ&index=2
// and Paul Bourke
// https://paulbourke.net/geometry/knots/

/* global p5 */
import { KnotFactory, KnotTypes } from './knot.js'

const sketch = function (p5) {
  // Variablen, die über Funktionen von außen geändert werden können
  p5.display = false

  // Variablen, die über Slider und Buttons geändert werden können
  let vectors = []
  const maxVectors = 10000
  const sphereRadius = 2.5
  const materialAlpha = 0.5
  const drawSpeed = 300 // Anzahl der Kugeln, die gleichzeitig gezeichnet werden
  const knotType = KnotTypes.UNKNOT
  const radius = 50
  const ambientLight = 128 // Werte von 0 bis 255. 0 ist schwarz, 255 ist weiss

  // Variablen, die innerhalb der Anwendung geöändert werden
  // let angle = 0
  let knot

  // p5 Funktion, die vor dem Zeichnen aufgerufen wird
  p5.setup = function () {
    p5.createCanvas(400, 400, p5.WEBGL)
    knot = KnotFactory.createKnot(p5, maxVectors, radius, knotType)
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

export const initButtons = () => {
  const marker = document.querySelector('#marker')
  const items = document.querySelectorAll('ul li a')

  function Indicator (e) {
    marker.style.left = e.offsetLeft + 'px'
    marker.style.width = e.offsetWidth + 'px'
  }

  items.forEach(link => {
    link.addEventListener('mousemove', (e) => Indicator(e.target))
  })
}

// Service Worker für die Offline Installation
export function serviceWorkerAktiv () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../service-worker.js', { scope: './' })
  }
}

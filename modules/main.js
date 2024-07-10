// 3D Knot
// Than Thong Ta
// inspired by The Coding Train / Daniel Shiffman
// https://www.youtube.com/watch?v=r6YMKr1X0VA&list=TLPQMDEwNzIwMjQ2yV5F1BzwMQ&index=2
// and Paul Bourke
// https://paulbourke.net/geometry/knots/

/* global p5 */
import { KnotFactory, KnotTypes } from './knot.js'
import { loadKnots } from './db_read.js'
import { saveKnot } from './db_save.js'
import { el } from './lib.js'

const sketch = function (p5) {
  // Variablen, die über Funktionen von außen geändert werden können
  p5.display = false

  // Variablen, die über Slider und Buttons geändert werden können
  let vectors = []
  let sphereRadius = 2.5
  let drawSpeed = 300 // Anzahl der Kugeln, die gleichzeitig gezeichnet werden
  // const knotType = KnotTypes.UNKNOT
  const ambientLight = 120 // Werte von 0 bis 255. 0 ist schwarz, 255 ist weiss

  // Variablen, die innerhalb der Anwendung geöändert werden
  // let angle = 0
  let knot
  let animate
  let prev = {}
  let current = {}

  function getCurrentValues () {
    const vals = {
      name: el('#name').value,
      maxVectors: parseInt(el('#maxVectors').value),
      radius: parseInt(el('#radius').value),
      r: 0,
      p: parseInt(el('#p').value),
      px: 0,
      q: parseInt(el('#q').value),
      nx: 1,
      ny: 1,
      m: parseInt(el('#m').value),
      phi: 0,
      k: parseInt(el('#trefoilK').value)
    }
    return vals
  }

  function areKnotsEqual (knot1, knot2) {
    return (
      knot1.maxVectors === knot2.maxVectors &&
      knot1.radius === knot2.radius &&
      knot1.r0 === knot2.r0 &&
      knot1.r === knot2.r &&
      knot1.p === knot2.p &&
      knot1.px === knot2.px &&
      knot1.q === knot2.q &&
      knot1.nx === knot2.nx &&
      knot1.ny === knot2.ny &&
      knot1.m === knot2.m &&
      knot1.phi === knot2.phi &&
      knot1.k === knot2.k
    )
  }

  function updateKnot () {
    current = getCurrentValues()
    let newKnot = knot
    if (!areKnotsEqual(current, prev) && animate === false) {
      console.log(prev, current)
      animate = true
      newKnot = KnotFactory.createTorusKnot(
        p5,
        current.maxVectors,
        current.radius,
        current.r,
        current.p,
        current.px,
        current.q,
        current.m,
        current.nx,
        current.ny,
        current.phi,
        current.k
      )
      prev = current
      console.log(newKnot)
    }
    return newKnot
  }

  // p5 Funktion, die vor dem Zeichnen aufgerufen wird
  p5.setup = function () {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL)
    canvas.style('z-index', '1')
    knot = KnotFactory.createKnot(p5, 10000, 200, KnotTypes.UNKNOT)
    animate = false
    prev = getCurrentValues()
  }

  // Loop-Funktion, die immer wieder aufgerufen wird
  p5.draw = function () {
    // nur zeichnen, wenn display true ist
    if (!p5.display) return
    knot = updateKnot()
    drawSpeed = parseInt(el('#drawSpeed').value)
    sphereRadius = parseInt(el('#sradius').value)

    if (vectors.length >= current.maxVectors) {
      animate = false
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
      // p5.normalMaterial()
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

  // start the marker on the torus item
  marker.style.left = '0px'
  marker.style.width = '79px'

  function Indicator (e) {
    marker.style.left = e.offsetLeft + 'px'
    marker.style.width = e.offsetWidth + 'px'
  }

  items.forEach(link => {
    link.addEventListener('mousemove', e => Indicator(e.target))
  })

  el('.save-button').addEventListener('click', saveKnot)
}

export const initSliders = () => {
  el('#torus').style.display = 'grid'
  el('#lissajous').style.display = 'none'
  el('#cosstack').style.display = 'none'

  el('#maxVectors').addEventListener('input', () => {
    el('#maxVectorsValue').innerText = el('#maxVectors').value
  })
  el('#radius').addEventListener('input', () => {
    el('#radiusValue').innerText = el('#radius').value
  })
  el('#sradius').addEventListener('input', () => {
    el('#sradiusValue').innerText = el('#sradius').value
  })
  el('#drawSpeed').addEventListener('input', () => {
    el('#drawSpeedValue').innerText = el('#drawSpeed').value
  })
  el('#p').addEventListener('input', () => {
    el('#pValue').innerText = el('#p').value
  })
  el('#q').addEventListener('input', () => {
    el('#qValue').innerText = el('#q').value
  })
  el('#m').addEventListener('input', () => {
    el('#mValue').innerText = el('#m').value
  })
  el('#trefoilK').addEventListener('input', () => {
    el('#kValue').innerText = el('#trefoilK').value
  })
}

export const initKnotList = () => { loadKnots() }

// Service Worker für die Offline Installation
export function serviceWorkerAktiv () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../service-worker.js', { scope: './' })
  }
}

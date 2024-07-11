// 3D Knot
// Than Thong Ta
// inspired by The Coding Train / Daniel Shiffman
// https://www.youtube.com/watch?v=r6YMKr1X0VA&list=TLPQMDEwNzIwMjQ2yV5F1BzwMQ&index=2
// and Paul Bourke
// https://paulbourke.net/geometry/knots/

/* global p5 */
import { KnotFactory } from './knot.js'
import { loadKnots } from './db_read.js'
import { saveKnot } from './db_save.js'
import { el } from './lib.js'

export const globals = {
  knotType: 'torus'
}

const sketch = function (p5) {
  // Variablen, die über Funktionen von außen geändert werden können
  p5.display = false

  // Variablen, die über Slider und Buttons geändert werden können
  let vectors = []
  let sphereRadius = 2.5
  let drawSpeed = 300 // Anzahl der Kugeln, die gleichzeitig gezeichnet werden
  const ambientLight = 120 // Werte von 0 bis 255. 0 ist schwarz, 255 ist weiss

  // Variablen, die innerhalb der Anwendung geöändert werden
  let knot
  let animate
  let prev = {}
  let current = {}

  // ermittelt die aktuellen Werte
  function getCurrentValues () {
    let vals
    switch (globals.knotType) { // knotType
      case 'torus':
        vals = getCurrentTorusValues()
        break
      case 'lissajous':
        vals = getCurrentLissajousValues()
        break
      case 'cosstack':
        vals = getCurrentCosstackValues()
        break
      default:
        vals = { }
    }
    return vals
  }

  // ermittelt die Werte für das Torus
  function getCurrentTorusValues () {
    return {
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
  }

  // ermittelt die Werte für das Lissajous
  function getCurrentLissajousValues () {
    return {
      name: el('#name').value,
      maxVectors: parseInt(el('#maxVectors').value),
      radius: parseInt(el('#radius').value),
      nx: parseInt(el('#nx').value),
      ny: parseInt(el('#ny').value),
      nz: parseInt(el('#nz').value),
      bx: parseInt(el('#bx').value),
      by: parseInt(el('#by').value),
      bz: parseInt(el('#bz').value),
      nx2: parseInt(el('#nz2').value)
    }
  }

  // ermittelt die Werte für das Cosstack
  function getCurrentCosstackValues () {
    return {
      name: el('#name').value,
      maxVectors: parseInt(el('#maxVectors').value),
      radius: parseInt(el('#radius').value),
      xc1: parseInt(el('#xc1').value),
      xc2: parseInt(el('#xc2').value),
      xc3: parseInt(el('#xc3').value),
      xc4: parseInt(el('#xc4').value),
      yc1: parseInt(el('#yc1').value),
      yc2: parseInt(el('#yc2').value),
      yc3: parseInt(el('#yc3').value),
      yc4: parseInt(el('#yc4').value),
      zc1: parseInt(el('#zc1').value),
      zc2: parseInt(el('#zc2').value),
      zc3: parseInt(el('#zc3').value),
      zc4: parseInt(el('#zc4').value),
      xs1: parseInt(el('#xs1').value),
      xs2: parseInt(el('#xs2').value),
      xs3: parseInt(el('#xs3').value),
      xs4: parseInt(el('#xs4').value),
      ys1: parseInt(el('#ys1').value),
      ys2: parseInt(el('#ys2').value),
      ys3: parseInt(el('#ys3').value),
      ys4: parseInt(el('#ys4').value),
      zs1: parseInt(el('#zs1').value),
      zs2: parseInt(el('#zs2').value),
      zs3: parseInt(el('#zs3').value),
      zs4: parseInt(el('#zs4').value)
    }
  }

  // vergleicht die aktuellen Wete mit den vorherigen
  function areKnotsEqual (knot1, knot2) {
    switch (globals.knotType) { // knotType
      case 'torus':
        return compareTorusKnots(knot1, knot2)
      case 'lissajous':
        return compareLissajousKnots(knot1, knot2)
      case 'cosstack':
        return compareCosstackKnots(knot1, knot2)
      default:
        return false
    }
  }

  // vergleicht die Werte für Torus Knoten
  function compareTorusKnots (knot1, knot2) {
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

  // vergleicht die Werte für Lissajous Knoten
  function compareLissajousKnots (knot1, knot2) {
    return (
      knot1.maxVectors === knot2.maxVectors &&
      knot1.radius === knot2.radius &&
      knot1.nx === knot2.nx &&
      knot1.ny === knot2.ny &&
      knot1.nz === knot2.nz &&
      knot1.bx === knot2.bx &&
      knot1.by === knot2.by &&
      knot1.bz === knot2.bz &&
      knot1.nx2 === knot2.nx2
    )
  }

  // vergleicht die Werte für Cosstack Knoten
  function compareCosstackKnots (knot1, knot2) {
    return (
      knot1.maxVectors === knot2.maxVectors &&
      knot1.radius === knot2.radius &&
      knot1.xc1 === knot2.xc1 &&
      knot1.xc2 === knot2.xc2 &&
      knot1.xc3 === knot2.xc3 &&
      knot1.xc4 === knot2.xc4 &&
      knot1.yc1 === knot2.yc1 &&
      knot1.yc2 === knot2.yc2 &&
      knot1.yc3 === knot2.yc3 &&
      knot1.yc4 === knot2.yc4 &&
      knot1.zc1 === knot2.zc1 &&
      knot1.zc2 === knot2.zc2 &&
      knot1.zc3 === knot2.zc3 &&
      knot1.zc4 === knot2.zc4 &&
      knot1.xs1 === knot2.xs1 &&
      knot1.xs2 === knot2.xs2 &&
      knot1.xs3 === knot2.xs3 &&
      knot1.xs4 === knot2.xs4 &&
      knot1.ys1 === knot2.ys1 &&
      knot1.ys2 === knot2.ys2 &&
      knot1.ys3 === knot2.ys3 &&
      knot1.ys4 === knot2.ys4 &&
      knot1.zs1 === knot2.zs1 &&
      knot1.zs2 === knot2.zs2 &&
      knot1.zs3 === knot2.zs3 &&
      knot1.zs4 === knot2.zs4
    )
  }

  // aktualisiert einen Torus Knoten mit den angegebenen Werten
  function updateTorusKnot (p5, current) {
    return KnotFactory.createTorusKnot(
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
  }

  // aktualisiert einen Lissajous Knoten mit den angegebenen Werten
  function updateLissajousKnot (p5, current) {
    return KnotFactory.createLissajousKnot(
      p5,
      current.maxVectors,
      current.radius,
      current.nx,
      current.ny,
      current.nz,
      current.bx,
      current.by,
      current.bz,
      current.nx2
    )
  }

  // aktualisiert einen Cosstack Knoten mit den angegebenen Werten
  function updateCosstackKnot (p5, current) {
    return KnotFactory.createCosstackKnot(
      p5,
      current.maxVectors,
      current.radius,
      {
        xc1: current.xc1,
        xc2: current.xc2,
        xc3: current.xc3,
        xc4: current.xc4,
        yc1: current.yc1,
        yc2: current.yc2,
        yc3: current.yc3,
        yc4: current.yc4,
        zc1: current.zc1,
        zc2: current.zc2,
        zc3: current.zc3,
        zc4: current.zc4,
        xs1: current.xs1,
        xs2: current.xs2,
        xs3: current.xs3,
        xs4: current.xs4,
        ys1: current.ys1,
        ys2: current.ys2,
        ys3: current.ys3,
        ys4: current.ys4,
        zs1: current.zs1,
        zs2: current.zs2,
        zs3: current.zs3,
        zs4: current.zs4
      }
    )
  }

  // aktuualisiert den gerade angezeigten Knoten mit den neuen Werten
  function updateKnot () {
    current = getCurrentValues()
    let newKnot = knot
    if (!areKnotsEqual(current, prev) && animate === false) {
      animate = true
      switch (globals.knotType) {
        case 'torus':
          newKnot = updateTorusKnot(p5, current)
          break
        case 'lissajous':
          newKnot = updateLissajousKnot(p5, current)
          break
        case 'cosstack':
          newKnot = updateCosstackKnot(p5, current)
          break
      }
      prev = current
    }
    return newKnot
  }

  // p5 Funktion, die vor dem Zeichnen aufgerufen wird
  p5.setup = function () {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL)
    canvas.style('z-index', '1')
    knot = KnotFactory.createTorusKnot(p5, 10000, 200, 0, 0, 0, 1, 1, 1, 1, 0, 0)
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

// bewegt den Marker wieder zurück nach dem die Maus sich weg bewegt hat
const unselectIndicator = (e) => {
  const marker = document.querySelector('#marker')
  switch (globals.knotType) {
    case 'lissajous':
      marker.style.left = '79px'
      marker.style.width = '107px'
      break
    case 'cosstack':
      marker.style.left = '186px'
      marker.style.width = '90px'
      break
    case 'torus':
    default:
      marker.style.left = '0px'
      marker.style.width = '79px'
      break
  }
}

// initiert die Buttons für den Knotentypen und den Speichern-Button
export const initButtons = () => {
  // für den Marker des Knotentypens
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
    link.addEventListener('mouseout', e => unselectIndicator(e))
  })

  // speichert den aktuellen Knoten und lädt dann die Liste neu
  el('.save-button').addEventListener('click', () => {
    saveKnot()
    loadKnots()
  })

  // anzeigen des jeweiligen Knoten-Typens
  el('#torusItem').addEventListener('click', (e) => {
    globals.knotType = 'torus'
    el('#torus').classList.add('show')
    el('#lissajous').classList.remove('show')
    el('#cosstack').classList.remove('show')
    Indicator(e)
  })
  el('#lissajousItem').addEventListener('click', (e) => {
    globals.knotType = 'lissajous'
    el('#torus').classList.remove('show')
    el('#lissajous').classList.add('show')
    el('#cosstack').classList.remove('show')
    Indicator(e)
  })
  el('#cosstackItem').addEventListener('click', (e) => {
    globals.knotType = 'cosstack'
    el('#torus').classList.remove('show')
    el('#lissajous').classList.remove('show')
    el('#cosstack').classList.add('show')
    Indicator(e)
  })
}

// Fügt den Slidern ein Event hinzu, damit der neue Wert auch angezeigt wird
export const initSliders = () => {
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
  el('#nx').addEventListener('input', () => {
    el('#nxValue').innerText = el('#nx').value
  })
  el('#ny').addEventListener('input', () => {
    el('#nyValue').innerText = el('#ny').value
  })
  el('#nz').addEventListener('input', () => {
    el('#nzValue').innerText = el('#nz').value
  })
  el('#bx').addEventListener('input', () => {
    el('#bxValue').innerText = el('#bx').value
  })
  el('#by').addEventListener('input', () => {
    el('#byValue').innerText = el('#by').value
  })
  el('#bz').addEventListener('input', () => {
    el('#bzValue').innerText = el('#bz').value
  })
  el('#nz2').addEventListener('input', () => {
    el('#nz2Value').innerText = el('#nz2').value
  })
  el('#xc1').addEventListener('input', () => {
    el('#xc1Value').innerText = el('#xc1').value
  })
  el('#xc2').addEventListener('input', () => {
    el('#xc2Value').innerText = el('#xc2').value
  })
  el('#xc3').addEventListener('input', () => {
    el('#xc3Value').innerText = el('#xc3').value
  })
  el('#xc4').addEventListener('input', () => {
    el('#xc4Value').innerText = el('#xc4').value
  })
  el('#yc1').addEventListener('input', () => {
    el('#yc1Value').innerText = el('#yc1').value
  })
  el('#yc2').addEventListener('input', () => {
    el('#yc2Value').innerText = el('#yc2').value
  })
  el('#yc3').addEventListener('input', () => {
    el('#yc3Value').innerText = el('#yc3').value
  })
  el('#yc4').addEventListener('input', () => {
    el('#yc4Value').innerText = el('#yc4').value
  })
  el('#zc1').addEventListener('input', () => {
    el('#zc1Value').innerText = el('#zc1').value
  })
  el('#zc2').addEventListener('input', () => {
    el('#zc2Value').innerText = el('#zc2').value
  })
  el('#zc3').addEventListener('input', () => {
    el('#zc3Value').innerText = el('#zc3').value
  })
  el('#zc4').addEventListener('input', () => {
    el('#zc4Value').innerText = el('#zc4').value
  })
  el('#xs1').addEventListener('input', () => {
    el('#xs1Value').innerText = el('#xs1').value
  })
  el('#xs2').addEventListener('input', () => {
    el('#xs2Value').innerText = el('#xs2').value
  })
  el('#xs3').addEventListener('input', () => {
    el('#xs3Value').innerText = el('#xs3').value
  })
  el('#xs4').addEventListener('input', () => {
    el('#xs4Value').innerText = el('#xs4').value
  })
  el('#ys1').addEventListener('input', () => {
    el('#ys1Value').innerText = el('#ys1').value
  })
  el('#ys2').addEventListener('input', () => {
    el('#ys2Value').innerText = el('#ys2').value
  })
  el('#ys3').addEventListener('input', () => {
    el('#ys3Value').innerText = el('#ys3').value
  })
  el('#ys4').addEventListener('input', () => {
    el('#ys4Value').innerText = el('#ys4').value
  })
  el('#zs1').addEventListener('input', () => {
    el('#zs1Value').innerText = el('#zs1').value
  })
  el('#zs2').addEventListener('input', () => {
    el('#zs2Value').innerText = el('#zs2').value
  })
  el('#zs3').addEventListener('input', () => {
    el('#zs3Value').innerText = el('#zs3').value
  })
  el('#zs4').addEventListener('input', () => {
    el('#zs4Value').innerText = el('#zs4').value
  })
}

// lädt die Liste der Knoten aus der Datenbank
export const initKnotList = () => { loadKnots() }

// Service Worker für die Offline Installation
export function serviceWorkerAktiv () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../service-worker.js', { scope: './' })
  }
}

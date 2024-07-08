// 3D Knot
// Than Thong Ta
// inspired by The Coding Train / Daniel Shiffman
// https://www.youtube.com/watch?v=r6YMKr1X0VA&list=TLPQMDEwNzIwMjQ2yV5F1BzwMQ&index=2
// and Paul Bourke
// https://paulbourke.net/geometry/knots/

/* global p5 */

const sketch = function (p5) {
  // Variablen, die über Funktionen von außen geändert werden können
  p5.display = false

  const UNKNOT = 0
  const TORUS = 1
  const EIGHT = 2
  const TREFOIL = 3
  const GRANNY = 4
  const CINQUEFOIL = 5
  const CLOVER = 6
  const TREFOIL2 = 7
  const EIGHTS = 9
  const THREETWIST = 10
  const STEVEDORE = 11
  const GRANNY2 = 12
  const CARRICK = 13
  const LISSAJOUS5 = 14
  const SEPTAFOIL = 15
  const TREFOIL3 = 16
  const EIGHT3 = 17
  const CINQUEFOIL2 = 18
  const TREFOIL4 = 19
  const TORUS3 = 20
  const KNOT5 = 21

  // Variablen, die über Slider und Buttons geändert werden können
  const vectors = []
  const maxVectors = 10000
  const sphereRadius = 2.5
  const materialAlpha = 0.5
  const drawSpeed = 300 // Anzahl der Kugeln, die gleichzeitig gezeichnet werden
  const knotType = UNKNOT
  const radius = 50
  const ambientLight = 128 // Werte von 0 bis 255. 0 ist schwarz, 255 ist weiss
  const trefoilK = 1

  let r0 = 1
  let p = 2 // longintude
  let q = 3 // meridian
  let m = 1
  let r = 1

  // Variablen, die innerhalb der Anwendung geöändert werden
  // let angle = 0
  let beta = 0

  // berechnet einen einzelnen Punkt des Knotens
  const calcVector = (type) => {
    let x, y, z
    let nx, ny, nz, bx, by, bz, nz2, phi, px

    switch (type) {
      case TORUS:
        r0 = 0.8
        r = 1.6
        m = 1
        p = 6
        q = 2
        px = 0
        nx = 1
        ny = 1
        phi = 0.6 * p5.PI * p5.sin(2 * p * beta)
        break
      case KNOT5:
        r0 = 0
        r = 0.72
        m = 1
        p = 6
        q = 4
        px = 0
        nx = 1
        ny = 1
        phi = 0.2 * p5.PI * p5.sin(p * beta)
        break
      case TREFOIL:
        r0 = 0
        m = 3
        r = 1
        p = 1
        q = 2
        px = 0
        nx = 2
        ny = 2
        phi = p * m * beta
        break
      case TREFOIL2:
        r0 = 2
        m = 1
        r = 1
        p = 3
        q = 1
        px = 0
        nx = 1
        ny = 1
        phi = p * m * beta
        break
      case TREFOIL4:
        r0 = 3
        m = 1
        r = 1
        p = 3
        q = 2
        px = 0
        nx = 1
        ny = 1
        phi = p * m * beta
        break
      case TORUS3:
        r0 = 3
        m = 1
        r = 1
        p = 4
        q = 3
        px = 0
        nx = 1
        ny = 1
        phi = p * m * beta
        break
      case CINQUEFOIL2:
        r0 = 3
        m = 1
        r = 1
        p = 5
        q = 2
        px = 0
        nx = 1
        ny = 1
        phi = p * m * beta
        break
      case EIGHT:
        r0 = 2
        m = 2
        r = 1
        p = 2
        q = 3
        px = 0
        nx = 1
        ny = 1
        phi = p * m * beta
        break
      case UNKNOT:
      default:
        r0 = radius
        r = 0
        p = 0
        q = 1
        m = 0
        px = 0
        nx = 1
        ny = 1
        phi = 0
        break
    }

    switch (type) {
      case TREFOIL3:
        nx = 2
        ny = 2
        nz = 4
        bx = 0.8
        by = 0.15
        bz = 1
        nz2 = 5
        break
      case EIGHT3:
        nx = 2
        ny = 2
        nz = 6
        bx = 6
        by = 0.15
        bz = 1
        nz2 = 5
        break
      case THREETWIST:
        nx = 3
        ny = 2
        nz = 7
        bx = 0.7 // 1.0
        by = 0.2 // 0.4
        bz = 0
        nz2 = 0
        break
      case STEVEDORE:
        nx = 3
        ny = 2
        nz = 5
        bx = 1.5
        by = 0.2
        bz = 0
        nz2 = 0
        break
      case GRANNY:
        nx = 3
        ny = 5
        nz = 7
        bx = 0.7
        by = 1.0
        bz = 0
        nz2 = 0
        break
      case CARRICK:
        nx = 3
        ny = 4
        nz = 7
        bx = 0.1
        by = 0.7
        bz = 0
        nz2 = 0
        break
      case LISSAJOUS5:
        nx = 2
        ny = 3
        nz = 7
        bx = 0.22
        by = 1.10
        bz = 0
        nz2 = 0
        break
      default:
        nx = 1
        ny = 1
        nz = 1
        bx = 0
        by = 0
        bz = 0
        nz2 = 0
        break
    }

    switch (type) {
      case TORUS:
      case KNOT5:
      case UNKNOT:
      case TREFOIL:
      case TREFOIL2:
      case TREFOIL4:
      case TORUS3:
      case CINQUEFOIL2:
      case EIGHT:
        x = (r0 + r * p5.cos(px + p * beta)) * p5.cos(q * beta) * nx
        y = (r0 + r * p5.cos(p * beta)) * p5.sin(q * beta) * ny
        z = r * p5.sin(phi)
        break
      case TREFOIL3: // 3 / 2
      case EIGHT3: // 3 / 2
      case THREETWIST: // 5 / 2
      case STEVEDORE: // 6 / 1
      case GRANNY2: // 3/1 # 3/1
      case CARRICK: // 8/21 // Carrock set
      case LISSAJOUS5:
        x = p5.cos(nx * beta + bx)
        y = p5.cos(ny * beta + by)
        z = p5.cos(nz * beta + bz) + p5.cos(nz2 * beta)
        break
      case EIGHTS:
        x = 10 * p5.cos(beta) + p5.cos(2 * beta) + 10 * p5.cos(3 * beta) + p5.cos(4 * beta)
        y = 6 * p5.sin(beta) + 0 * p5.sin(2 * beta) + 10 * p5.sin(3 * beta)
        z = 4 * p5.sin(3 * beta) + p5.sin(2.5 * beta) + 4 * p5.sin(4 * beta) - 2 * p5.sin(6 * beta)
        break
      case CLOVER:
        x = 4 / 3 * p5.cos(beta) + 2 * p5.cos(3 * beta)
        y = 4 / 3 * p5.sin(beta) + 2 * p5.sin(3 * beta)
        z = 0.5 * p5.sin(2 * beta) + p5.sin(4 * beta)
        break
      case SEPTAFOIL:
        x = 41 * p5.cos(1 * beta) - 18 * p5.sin(1 * beta) - 83 * p5.cos(2 * beta) - 83 * p5.sin(2 * beta) - 11 * p5.cos(3 * beta) + 27 * p5.sin(3 * beta)
        y = 36 * p5.cos(1 * beta) + 27 * p5.sin(1 * beta) - 113 * p5.cos(2 * beta) + 30 * p5.sin(2 * beta) + 11 * p5.cos(3 * beta) + 27 - p5.sin(3 * beta)
        z = 0 * p5.cos(1 * beta) + 45 * p5.sin(1 * beta) - 30 * p5.cos(2 * beta) + 113 * p5.sin(2 * beta) - 11 * p5.cos(3 * beta) + 27 * p5.sin(3 * beta)
        break
      case CINQUEFOIL:
        x = p5.cos(beta) * (2 - p5.cos(2 * beta / (2 * trefoilK + 1)))
        y = p5.sin(beta) * (2 - p5.cos(2 * beta / (2 * trefoilK + 1)))
        z = -1 * p5.sin(2 * beta / (2 * trefoilK + 1))
        break
      case GRANNY: // COMPOSITE
        x = -22 * p5.cos(1 * beta) - 128 * p5.sin(1 * beta) - 44 * p5.cos(3 * beta) - 78 * p5.sin(3 * beta)
        y = -10 * p5.sin(2 * beta) - 27 * p5.cos(2 * beta) + 38 * p5.sin(4 * beta) + 46 * p5.cos(4 * beta)
        z = 70 * p5.sin(3 * beta) - 40 * p5.cos(3 * beta)
        break
    }
    return p5.createVector(x, y, z)
  }

  // berechnet alle Punkte eines Knotens
  const calcVectors = (type) => {
    vectors.push(calcVector(type))

    let maxBeta = 2 * p5.PI
    if (type === CINQUEFOIL) maxBeta = (4 * trefoilK + 2) * p5.PI

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

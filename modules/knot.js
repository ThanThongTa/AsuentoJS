// Oberklasse für alle Knoten
export class Knot {
  constructor (p5, maxVectors, radius) {
    this.radius = radius
    this.vectors = [] // Vektoren werden nachher gezeichnet
    this.maxVectors = maxVectors
    this.beta = 0 // Beta wird weitergesetzt, um eine Animation zu erzeugen
    this.p5 = p5 // wird benötigt, um die Vektoren zu erstellen
  }
}

// die einzelnen Knoten Typen unterscheiden sich in der Art, wie ein Vektor berechnet wird
// TorusKnots berechnen Vektoren mit Hilfe von zwei Parametern p und q, die auch als
// Longitude und Meridian bezeichnet werden.
export class TorusKnot extends Knot {
  constructor (p5, maxVectors, radius, r, p, px, q, nx, ny, m, phi, trefoilK) {
    super(p5, maxVectors, radius)
    this.r0 = this.radius
    this.r = r || 0
    this.p = p || 0
    this.q = q || 1
    this.m = m || 0
    this.px = px || 0
    this.nx = nx || 1
    this.ny = ny || 1
    this.phi = phi || 0
    this.trefoilK = trefoilK || 0
    if (this.trefoilK !== 0) this.p = 2 / (2 * trefoilK + 1)
  }

  // erstellt die Vektoren und gibt diese als Array zurückgeben
  getVectors () {
    this.vectors.push(this.calcVector())
    const maxBeta = (4 * this.trefoilK + 2) * this.p5.PI * this.q

    // nur eine bestimmte Anzahl an Kugeln zeichnen. Die ältesten werden gelöscht
    if (this.vectors.length > this.maxVectors) this.vectors.shift()

    // Beta ist der Winkel, der gerade gezeichnet wird.
    // Beta weitersetzen, für die Animation
    // 2 * PI = 360 Grad
    this.beta += maxBeta / this.maxVectors

    // Beta wieder auf 0 setzen, um die Animation wieder von vorne zu starten
    if (this.beta >= maxBeta) {
      this.beta = 0
    }

    return this.vectors
  }

  // Berechnet einen einzelnen Vektor
  calcVector () {
    // const mu = this.beta * this.q
    // const x = this.radius * this.p5.cos(mu) * (1 + this.p5.cos(this.p * mu) / this.q) / 2.0
    // const y = this.radius * this.p5.sin(mu) * (1 + this.p5.cos(this.p * mu) / this.q) / 2.0
    // const z = this.radius * this.p5.sin(this.p * mu / this.q) / 2.0
    const x = this.radius / 2 * (2 + this.p5.cos(this.p * this.beta)) * this.p5.cos(this.q * this.beta)
    const y = this.radius / 2 * (2 + this.p5.cos(this.p * this.beta)) * this.p5.sin(this.q * this.beta)
    const z = this.radius / 2 * this.p5.sin(this.m * this.beta)
    return this.p5.createVector(x, y, z)
  }
}

// LissaKnots berechnen Vektoren mit Hilfe von Tangenten und Geraden. Daher verwenden die Formeln eine Forn wie x = mx + b
export class LissaKnot extends Knot {
  constructor (p5, maxVectors, radius, nx, ny, nz, bx, by, bz, nz2) {
    super(p5, maxVectors, radius)
    this.nx = nx || 1
    this.ny = ny || 1
    this.nz = nz || 1
    this.bx = bx || 0
    this.by = by || 0
    this.bz = bz || 0
    this.nz2 = nz2 || 0
  }

  // erstellt die Vektoren und gibt diese als Array zurückgeben
  getVectors () {
    this.vectors.push(this.calcVector())
    const maxBeta = 2 * this.p5.PI

    // nur eine bestimmte Anzahl an Kugeln zeichnen. Die ältesten werden gelöscht
    if (this.vectors.length > this.maxVectors) this.vectors.shift()

    // Beta ist der Winkel, der gerade gezeichnet wird.
    // Beta weitersetzen, für die Animation
    // 2 * PI = 360 Grad
    this.beta += maxBeta / this.maxVectors

    // Beta wieder auf 0 setzen, um die Animation wieder von vorne zu starten
    if (this.beta >= maxBeta) {
      this.beta = 0
    }

    return this.vectors
  }

  // berechnet einen einzelnen Vektor
  calcVector () {
    const x = this.radius * this.p5.cos(this.nx * this.beta + this.bx)
    const y = this.radius * this.p5.cos(this.ny * this.beta + this.by)
    const z = this.radius * (this.p5.cos(this.nz * this.beta + this.bz) + this.p5.cos(this.nz2 * this.beta))
    return this.p5.createVector(x, y, z)
  }
}

// CosStackKnots berechnen Vektoren mit Hilfe von Cosinus und Sinus Formeln, die gestackt werden
// Da das zu recht vielen Parametern führen kann, werden die Parameter in einem Objekt an den Constructor
// weitergegeben.
// In unserer Klasse wird nur bis 4 Cosinus und Sinus Werte gestackt.
export class CosStackKnot extends Knot {
  constructor (p5, maxVectors, radius, options) {
    super(p5, maxVectors, radius)
    this.options = options
  }

  // erstellt die Vektoren und gibt diese als Array zurückgeben
  getVectors () {
    this.vectors.push(this.calcVector())
    const maxBeta = 2 * this.p5.PI

    // nur eine bestimmte Anzahl an Kugeln zeichnen. Die ältesten werden gelöscht
    if (this.vectors.length > this.maxVectors) this.vectors.shift()

    // Beta ist der Winkel, der gerade gezeichnet wird.
    // Beta weitersetzen, für die Animation
    // 2 * PI = 360 Grad
    this.beta += maxBeta / this.maxVectors

    // Beta wieder auf 0 setzen, um die Animation wieder von vorne zu starten
    if (this.beta >= maxBeta) {
      this.beta = 0
    }

    return this.vectors
  }

  // berechnet einen einzelnen Vektor
  calcVector () {
    let zoffset = 0
    if (this.options.zoffset === 1) zoffset = this.p5.sin(2.5 * this.beta) - 2 * this.p5.sin(6 * this.beta)
    const x = this.options.xc1 * this.p5.cos(1 * this.beta) + this.options.xs1 * this.p5.sin(1 * this.beta) +
    this.options.xc2 * this.p5.cos(2 * this.beta) + this.options.xs2 * this.p5.sin(2 * this.beta) +
    this.options.xc3 * this.p5.cos(3 * this.beta) + this.options.xs3 * this.p5.sin(3 * this.beta) +
    this.options.xc4 * this.p5.cos(4 * this.beta) + this.options.xs4 * this.p5.sin(4 * this.beta)
    const y = this.options.yc1 * this.p5.cos(1 * this.beta) + this.options.ys1 * this.p5.sin(1 * this.beta) +
    this.options.yc2 * this.p5.cos(2 * this.beta) + this.options.ys2 * this.p5.sin(2 * this.beta) +
    this.options.yc3 * this.p5.cos(3 * this.beta) + this.options.ys3 * this.p5.sin(3 * this.beta) +
    this.options.yc4 * this.p5.cos(4 * this.beta) + this.options.ys4 * this.p5.sin(4 * this.beta)
    const z = this.options.zc1 * this.p5.cos(1 * this.beta) + this.options.zs1 * this.p5.sin(1 * this.beta) +
    this.options.zc2 * this.p5.cos(2 * this.beta) + this.options.zs2 * this.p5.sin(2 * this.beta) +
    this.options.zc3 * this.p5.cos(3 * this.beta) + this.options.zs3 * this.p5.sin(3 * this.beta) +
    this.options.zc4 * this.p5.cos(4 * this.beta) + this.options.zs4 * this.p5.sin(4 * this.beta) + zoffset
    return this.p5.createVector(x, y, z)
  }
}

// Die Parameter für die CosStackKnots werden in diesem Objekt gespeichert
export class KnotParameters {
  constructor () {
    this.xc1 = 0
    this.xs1 = 0
    this.xc2 = 0
    this.xs2 = 0
    this.xc3 = 0
    this.xs3 = 0
    this.xc4 = 0
    this.xs4 = 0
    this.yc1 = 0
    this.ys1 = 0
    this.yc2 = 0
    this.ys2 = 0
    this.yc3 = 0
    this.ys3 = 0
    this.yc4 = 0
    this.ys4 = 0
    this.zc1 = 0
    this.zs1 = 0
    this.zc2 = 0
    this.zs2 = 0
    this.zc3 = 0
    this.zs3 = 0
    this.zc4 = 0
    this.zs4 = 0
    this.xoffset = 0
    this.yoffset = 0
    this.zoffset = 0
  }
}

// Eine Art Enum, um die Typen der Knoten zu verwalten
export class KnotTypes {
  static UNKNOT = 0
  static TORUS = 1
  static EIGHT = 2
  static TREFOIL = 3
  static GRANNY = 4
  static CINQUEFOIL = 5
  static CLOVER = 6
  static TREFOIL2 = 7
  static EIGHTS = 9
  static THREETWIST = 10
  static STEVEDORE = 11
  static GRANNY2 = 12
  static CARRICK = 13
  static LISSAJOUS5 = 14
  static SEPTAFOIL = 15
  static TREFOIL3 = 16
  static EIGHT3 = 17
  static CINQUEFOIL2 = 18
  static TREFOIL4 = 19
  static TORUS3 = 20
  static KNOT5 = 21
  static THREETWIST2 = 22
}

// Die Factory Klasse zum Erstellen der Knoten.
export class KnotFactory {
  static createTorusKnot (p5, maxVectors, radius, r, p, px, q, m, nx, ny, phi, k) {
    return new TorusKnot(p5, maxVectors, radius, r, p, px, q, nx, ny, m, phi, k)
  }

  static createLissajousKnot (p5, maxVectors, radius, nx, ny, nz, bx, by, bz, nx2) {
    return new LissaKnot(p5, maxVectors, radius, nx, ny, nz, bx, by, bz, nx2)
  }

  static createCosstackKnot (p5, maxVectors, radius, options) {
    return new CosStackKnot(p5, maxVectors, radius, options)
  }

  // Eine statische Methode, damit nicht jedes Mal eine KnotFactory Instanz erstellt werden muss
  // die noch nicht mal eigene Daten halten muss.
  static createKnot (p5, maxVectors, radius, knotType) {
    const options = new KnotParameters()
    let knot

    switch (knotType) {
      case KnotTypes.TORUS:
        knot = new TorusKnot(p5, maxVectors, 0.8 * radius, 1.6, 6, 0, 2, 1, 1, 1, 1, 0)
        break
      case KnotTypes.KNOT5:
        knot = new TorusKnot(p5, maxVectors, 0, 0.72, 6, 0, 4, 1, 1, 1, 2, 0)
        break
      case KnotTypes.TREFOIL:
        knot = new TorusKnot(p5, maxVectors, 0, 1, 1, 0, 2, 2, 2, 3, 0, 0)
        break
      case KnotTypes.TREFOIL2:
        knot = new TorusKnot(p5, maxVectors, 2, 1, 3, 0, 1, 1, 1, 1, 0, 0)
        break
      case KnotTypes.TREFOIL4:
        knot = new TorusKnot(p5, maxVectors, 3, 1, 3, 0, 2, 1, 1, 1, 0, 0)
        break
      case KnotTypes.TORUS3:
        knot = new TorusKnot(p5, maxVectors, 3, 1, 4, 0, 3, 1, 1, 1, 0, 0)
        break
      case KnotTypes.CINQUEFOIL:
        knot = new TorusKnot(p5, maxVectors, 2, -1, 2, 0, 1, 0, 0, 1, 0, 1)
        break
      case KnotTypes.CINQUEFOIL2:
        knot = new TorusKnot(p5, maxVectors, 3, 1, 5, 0, 2, 1, 1, 1, 0, 0)
        break
      case KnotTypes.EIGHT:
        knot = new TorusKnot(p5, maxVectors, 2, 1, 2, 0, 3, 1, 1, 2, 0, 0)
        break
      case KnotTypes.TREFOIL3:
        knot = new LissaKnot(p5, maxVectors, radius, 2, 2, 4, 0.8, 0.15, 1, 5)
        break
      case KnotTypes.EIGHT3:
        knot = new LissaKnot(p5, maxVectors, radius, 2, 2, 6, 6, 0.15, 1, 5)
        break
      case KnotTypes.THREETWIST:
        knot = new LissaKnot(p5, maxVectors, radius, 3, 2, 7, 0.7, 0.2, 0, 0)
        break
      case KnotTypes.THREETWIST2:
        knot = new LissaKnot(p5, maxVectors, radius, 3, 2, 7, 1.0, 0.4, 0, 0)
        break
      case KnotTypes.STEVEDORE:
        knot = new LissaKnot(p5, maxVectors, radius, 3, 2, 5, 1.5, 0.2, 0, 0)
        break
      case KnotTypes.GRANNY2:
        knot = new LissaKnot(p5, maxVectors, radius, 3, 5, 7, 0.7, 1.0, 0, 0)
        break
      case KnotTypes.CARRICK:
        knot = new LissaKnot(p5, maxVectors, radius, 3, 4, 7, 0.1, 0.7, 0, 0)
        break
      case KnotTypes.LISSAJOUS5:
        knot = new LissaKnot(p5, maxVectors, radius, 2, 3, 7, 0.22, 1.10, 0, 0)
        break
      case KnotTypes.GRANNY: // COMPOSITE
        options.xc1 = -22
        options.xs1 = -128
        options.xc3 = -44
        options.xs3 = -78
        options.yc2 = -10
        options.ys2 = -27
        options.ys4 = 38
        options.yc4 = 46
        options.zs3 = 70
        options.zc3 = -40
        knot = new CosStackKnot(p5, maxVectors, radius, options)
        break
      case KnotTypes.SEPTAFOIL:
        options.xc1 = 41
        options.xs1 = -18
        options.xc2 = -83
        options.xs2 = -83
        options.xc3 = -11
        options.xs3 = 27
        options.yc1 = 36
        options.ys1 = 27
        options.yc2 = -113
        options.ys2 = 30
        options.yc3 = 11
        options.ys3 = 27
        options.zs1 = 45
        options.zc2 = -30
        options.zs2 = 113
        options.zc3 = -11
        options.zs3 = 27
        knot = new CosStackKnot(p5, maxVectors, radius, options)
        break
      case KnotTypes.UNKNOT:
      default:
        knot = new TorusKnot(p5, maxVectors, radius, 0, 0, 0, 1, 1, 1, 1, 0, 0)
        break
    }
    return knot
  }
}

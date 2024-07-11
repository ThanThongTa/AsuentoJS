import { db } from './db.js'
import { KnotParameters } from './knot.js'
import { el } from './lib.js'
import { globals } from './main.js'

export const saveKnot = () => {
  if (el('#name').value === '') {
    console.log('no name')
    return
  }

  switch (globals.knotType) {
    case 'torus':
      saveTorus()
      break
    case 'lissajous':
      saveLissajous()
      break
    case 'cosstack':
      saveCosstack()
      break
  }
}

const saveTorus = () => {
  const knot = {
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'torus',
    name: el('#name').value,
    maxVectors: parseInt(el('#maxVectors').value),
    radius: parseInt(el('#radius').value),
    p: parseInt(el('#p').value),
    q: parseInt(el('#q').value),
    m: parseInt(el('#m').value),
    k: parseInt(el('#trefoilK').value)
  }
  db.update(knot)
}

const saveLissajous = () => {
  const knot = {
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'lissajous',
    name: el('#name').value,
    maxVectors: parseInt(el('#maxVectors').value),
    radius: parseInt(el('#radius').value),
    nx: parseInt(el('#nx').value),
    ny: parseInt(el('#ny').value),
    nz: parseInt(el('#nz').value),
    bx: parseFloat(el('#bx').value),
    by: parseFloat(el('#by').value),
    bz: parseFloat(el('#bz').value),
    nz2: parseInt(el('#nz2').value)
  }
  db.update(knot)
}

const saveCosstack = () => {
  const knot = {
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'cosstack',
    name: el('#name').value,
    maxVectors: parseInt(el('#maxVectors').value),
    radius: parseInt(el('#radius').value),
    options: {
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
      zs4: parseInt(el('#zs4').value),
      xoffset: 0,
      yoffset: 0,
      zoffset: 0
    }
  }
  db.update(knot)
}

export const initDB = () => {
  const list = []
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'torus',
    name: 'Unknot Torus',
    maxVectors: 10000,
    radius: 200,
    r: 0,
    p: 0,
    px: 0,
    q: 1,
    nx: 1,
    ny: 1,
    m: 1,
    phi: 0,
    k: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'torus',
    name: 'Torus',
    maxVectors: 10000,
    radius: 0.8 * 200,
    r: 1.6,
    p: 6,
    px: 0,
    q: 2,
    nx: 1,
    ny: 1,
    m: 1,
    phi: 1,
    k: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'torus',
    name: 'Knot5',
    maxVectors: 10000,
    radius: 0 * 200,
    r: 0.72,
    p: 6,
    px: 0,
    q: 4,
    nx: 1,
    ny: 1,
    m: 1,
    phi: 2,
    k: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'torus',
    name: 'Trefoil',
    maxVectors: 10000,
    radius: 0 * 200,
    r: 1,
    p: 1,
    px: 0,
    q: 2,
    nx: 2,
    ny: 2,
    m: 3,
    phi: 0,
    k: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'torus',
    name: 'Trefoil2',
    maxVectors: 10000,
    radius: 2 * 200,
    r: 1,
    p: 3,
    px: 0,
    q: 1,
    nx: 1,
    ny: 1,
    m: 1,
    phi: 0,
    k: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'torus',
    name: 'Trefoil4',
    maxVectors: 10000,
    radius: 3 * 200,
    r: 1,
    p: 3,
    px: 0,
    q: 2,
    nx: 1,
    ny: 1,
    m: 1,
    phi: 0,
    k: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'torus',
    name: 'Torus3',
    maxVectors: 10000,
    radius: 3 * 200,
    r: 1,
    p: 4,
    px: 0,
    q: 3,
    nx: 1,
    ny: 1,
    m: 1,
    phi: 0,
    k: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'torus',
    name: 'Cinquefoil1',
    maxVectors: 10000,
    radius: 2 * 200,
    r: -1,
    p: 2,
    px: 0,
    q: 1,
    nx: 0,
    ny: 0,
    m: 1,
    phi: 0,
    k: 1
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'torus',
    name: 'Cinquefoil2',
    maxVectors: 10000,
    radius: 3 * 200,
    r: 1,
    p: 5,
    px: 0,
    q: 2,
    nx: 1,
    ny: 1,
    m: 1,
    phi: 0,
    k: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'torus',
    name: 'Eight',
    maxVectors: 10000,
    radius: 2 * 200,
    r: 1,
    p: 2,
    px: 0,
    q: 3,
    nx: 1,
    ny: 1,
    m: 2,
    phi: 0,
    k: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'lissajous',
    name: 'Trefoil3',
    maxVectors: 10000,
    radius: 200,
    nx: 2,
    ny: 2,
    nz: 4,
    bx: 0.8,
    by: 0.15,
    bz: 1,
    nz2: 5
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'lissajous',
    name: 'Eight3',
    maxVectors: 10000,
    radius: 200,
    nx: 2,
    ny: 2,
    nz: 6,
    bx: 6,
    by: 0.15,
    bz: 1,
    nz2: 5
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'lissajous',
    name: 'ThreeTwist',
    maxVectors: 10000,
    radius: 200,
    nx: 3,
    ny: 2,
    nz: 7,
    bx: 0.7,
    by: 0.2,
    bz: 0,
    nz2: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'lissajous',
    name: 'ThreeTwist2',
    maxVectors: 10000,
    radius: 200,
    nx: 3,
    ny: 2,
    nz: 7,
    bx: 1,
    by: 0.4,
    bz: 0,
    nz2: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'lissajous',
    name: 'Stevedore',
    maxVectors: 10000,
    radius: 200,
    nx: 3,
    ny: 2,
    nz: 5,
    bx: 1.5,
    by: 0.2,
    bz: 0,
    nz2: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'lissajous',
    name: 'Granny2',
    maxVectors: 10000,
    radius: 200,
    nx: 3,
    ny: 5,
    nz: 7,
    bx: 0.7,
    by: 1.0,
    bz: 0,
    nz2: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'lissajous',
    name: 'Carrick',
    maxVectors: 10000,
    radius: 200,
    nx: 3,
    ny: 4,
    nz: 7,
    bx: 0.1,
    by: 0.7,
    bz: 0,
    nz2: 0
  })
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'lissajous',
    name: 'Lissajous5',
    maxVectors: 10000,
    radius: 200,
    nx: 2,
    ny: 3,
    nz: 7,
    bx: 0.22,
    by: 1.10,
    bz: 0,
    nz2: 0
  })
  let options = new KnotParameters()
  options.xc1 = 10
  options.xc2 = 1
  options.xc3 = 10
  options.xc4 = 1
  options.ys1 = 6
  options.ys3 = 10
  options.zs3 = 4
  options.zs4 = 4
  options.zoffset = 1
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'cosstack',
    name: 'Eight5',
    maxVectors: 10000,
    radius: 200,
    options
  })
  options = new KnotParameters()
  options.xc1 = 4 / 3
  options.xc3 = 2
  options.yc1 = 4 / 3
  options.yc3 = 2
  options.zs2 = 0.5
  options.zs4 = 1
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'cosstack',
    name: 'Clover',
    maxVectors: 10000,
    radius: 200,
    options
  })
  options = new KnotParameters()
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
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'cosstack',
    name: 'Granny',
    maxVectors: 10000,
    radius: 200,
    options
  })
  options = new KnotParameters()
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
  list.push({
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'cosstack',
    name: 'Septafoil',
    maxVectors: 10000,
    radius: 200,
    options
  })

  list.forEach(knot => db.update(knot))
}

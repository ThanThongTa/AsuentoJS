import { db } from './db.js'
import { el } from './lib.js'
import { globals } from './main.js'
import { loadKnots } from './db_read.js'

// speichert den aktuellen Knoten in die Datenbank
export const saveKnot = () => {
  if (el('#name').value === '') {
    const dialog = el('#alert')
    const confirmBtn = el('#confirmbtn')
    const nameInput = el('#name')
    const knotnameInput = el('#knotname')
    dialog.showModal()
    dialog.addEventListener('close', () => {
      nameInput.value = dialog.returnValue
      if (dialog.returnValue === '') return
      saveKnotToDB()
      loadKnots()
    })
    confirmBtn.addEventListener('click', (event) => {
      event.preventDefault()
      dialog.close(knotnameInput.value)
    })
    return
  }

  saveKnotToDB()
  loadKnots()
}

const saveKnotToDB = () => {
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

// speichert den aktuellen Knoten als Torus in die Datenbank
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

// speichert den aktuellen Knoten als Lissajous in die Datenbank
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

// speichert den aktuellen Knoten als Cosstack in die Datenbank
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

// fügt einige Knoten in die Datenbank hinzu
export const initDB = () => {
  // erstellt erst mal eine Liste von Standard Knoten
  const list = [{
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'cosstack',
    name: 'Granny',
    maxVectors: 10000,
    radius: 200,
    options: {
      xc1: -22,
      xs1: -128,
      xc2: 0,
      xs2: 0,
      xc3: -44,
      xs3: -78,
      xc4: 0,
      xs4: 0,
      yc1: 0,
      ys1: 0,
      yc2: -10,
      ys2: -27,
      yc3: 0,
      ys3: 0,
      ys4: 38,
      yc4: 46,
      zc1: 0,
      zs1: 0,
      zc2: 0,
      zs2: 0,
      zc3: -40,
      zs3: 70,
      zc4: 0,
      zs4: 0
    }
  }, {
    id: Math.floor(Math.random() * 1000000) + 1000000,
    type: 'cosstack',
    name: 'Septafoil',
    maxVectors: 10000,
    radius: 200,
    options: {
      xc1: 41,
      xs1: -18,
      xc2: -83,
      xs2: -83,
      xc3: -11,
      xs3: 27,
      xc4: 0,
      xs4: 0,
      yc1: 36,
      ys1: 27,
      yc2: -113,
      ys2: 30,
      yc3: 11,
      ys3: 27,
      yc4: 0,
      ys4: 0,
      zc1: 0,
      zs1: 45,
      zc2: -30,
      zs2: 113,
      zc3: -11,
      zs3: 27,
      zc4: 0,
      zs4: 0
    }
  }]

  // geht die Liste durch und fügt den Knoten der Datenbank hinzu
  list.forEach(knot => db.update(knot))
}

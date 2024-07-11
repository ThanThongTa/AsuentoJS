import { db } from './db.js'
import { create, el } from './lib.js'
import { initDB } from './db_save.js'
import { globals } from './main.js'

export const loadKnots = async () => {
  const listArea = document.querySelector('#knotlist')
  listArea.innerHTML = ''
  const dbData = await db.readAll()
  if (!dbData || !dbData.length) {
    initDB()
  }
  listArea.append(renderKnotList(dbData))
}

function renderKnotList (dbData) {
  const wrapper = create('div')
  dbData.forEach(element => {
    const row = create('div')
    row.className = 'knot'
    wrapper.append(row)

    const knotName = create('span')
    knotName.className = 'knotname'
    knotName.innerText = element.name
    row.append(knotName)

    const knotLoad = create('div')
    knotLoad.className = 'smlbtn loader'
    knotLoad.innerText = 'Load'
    knotLoad.addEventListener('click', () => {
      loadKnot(element)
    })
    row.append(knotLoad)

    const knotDelete = create('div')
    knotDelete.className = 'smlbtn delete'
    knotDelete.innerText = 'X'
    knotDelete.addEventListener('click', () => {
      deleteKnot(element)
    })
    row.append(knotDelete)
  })
  return wrapper
}

function loadKnot (knot) {
  console.log(knot)
  el('#name').value = knot.name
  el('#maxVectors').value = knot.maxVectors
  el('#radius').value = knot.radius
  globals.knotType = knot.type
  const marker = document.querySelector('#marker')

  switch (globals.knotType) {
    case 'torus':
      el('#p').value = knot.p
      el('#q').value = knot.q
      el('#m').value = knot.m
      el('#trefoilK').value = knot.k
      marker.style.left = '0px'
      marker.style.width = '79px'
      el('#torus').classList.add('show')
      el('#lissajous').classList.remove('show')
      el('#cosstack').classList.remove('show')
      break
    case 'lissajous':
      el('#nx').value = knot.nx
      el('#ny').value = knot.ny
      el('#nz').value = knot.nz
      el('#bx').value = knot.bx
      el('#by').value = knot.by
      el('#bz').value = knot.bz
      el('#nz2').value = knot.nz2
      marker.style.left = '79px'
      marker.style.width = '107px'
      el('#torus').classList.remove('show')
      el('#lissajous').classList.add('show')
      el('#cosstack').classList.remove('show')
      break
    case 'cosstack':
      console.log(knot)
      el('#xc1').value = knot.options.xc1
      el('#xc3').value = knot.options.xc3
      el('#xc2').value = knot.options.xc2
      el('#xc4').value = knot.options.xc4
      el('#yc1').value = knot.options.yc1
      el('#yc2').value = knot.options.yc2
      el('#yc3').value = knot.options.yc3
      el('#yc4').value = knot.options.yc4
      el('#zc1').value = knot.options.zc1
      el('#zc2').value = knot.options.zc2
      el('#zc3').value = knot.options.zc3
      el('#zc4').value = knot.options.zc4
      el('#xs1').value = knot.options.xs1
      el('#xs2').value = knot.options.xs2
      el('#xs3').value = knot.options.xs3
      el('#xs4').value = knot.options.xs4
      el('#ys1').value = knot.options.ys1
      el('#ys2').value = knot.options.ys2
      el('#ys3').value = knot.options.ys3
      el('#ys4').value = knot.options.ys4
      el('#zs1').value = knot.options.zs1
      el('#zs2').value = knot.options.zs2
      el('#zs3').value = knot.options.zs3
      el('#zs4').value = knot.options.zs4
      marker.style.left = '186px'
      marker.style.width = '90px'
      el('#torus').classList.remove('show')
      el('#lissajous').classList.remove('show')
      el('#cosstack').classList.add('show')
      break
  }
}

function deleteKnot (knot) {
  db.deleteItem(knot.id)
  loadKnots()
}

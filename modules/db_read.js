import { db } from './db.js'
import { create, el } from './lib.js'
import { initDB } from './db_save.js'

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

    const knotLoad = create('button')
    knotLoad.className = 'loader'
    knotLoad.innerText = 'Load'
    knotLoad.addEventListener('click', () => {
      loadKnot(element)
    })
    row.append(knotLoad)

    const knotDelete = create('button')
    knotDelete.className = 'delete'
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
  const knotData = db.readItem(knot.id)
  el('#name').value = knotData.name
  el('#maxVectors').value = knotData.maxVectors
  el('#radius').value = knotData.radius
}

function deleteKnot (knot) {
  db.deleteItem(knot.id)
  loadKnots()
}

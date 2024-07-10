import { db } from './db.js'
import { create } from './lib.js'

export const loadKnots = async () => {
  const listArea = document.querySelector('#knotlist')
  listArea.innerHTML = ''
  const dbData = await db.readAll()
  if (!dbData || !dbData.length) return
  listArea.append(renderKnotList(dbData))
}

function renderKnotList (dbData) {
  const wrapper = create('div')

  return wrapper
}
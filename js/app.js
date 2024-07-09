// import { displaySketch, serviceWorkerAktiv } from '../modules/main.js'
import { displaySketch, initButtons } from '../modules/main.js'
// import { addButton } from '../modules/install.js'

initButtons()
displaySketch()
// serviceWorkerAktiv()
// addButton()

document.querySelector('#torus').style.display = 'block'
document.querySelector('#lissajous').style.display = 'none'
document.querySelector('#cosstack').style.display = 'none'

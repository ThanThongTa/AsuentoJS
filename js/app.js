// import { displaySketch, serviceWorkerAktiv } from '../modules/main.js'
import { initButtons, initKnotList, initSliders } from '../modules/ui.js'
import { displaySketch, serviceWorkerAktiv } from '../modules/main.js'
import { addButton } from '../modules/install.js'

displaySketch()
initButtons()
initSliders()
initKnotList()
serviceWorkerAktiv()
addButton()

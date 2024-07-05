// Dieser Code startet einen NodeJS Server mit HTTPS, weil ich dachte, dass
// ein Apache Server nur für einen Service Worker einfach Overkill ist,
// und ein NodeJS Server einfacher und leichter ist.
// Allerdings habe ich bemerkt, dass noch nicht mal der zumindest auf einem Mac
// nötig ist. Dieser Code wird also gar nicht ausgeführt Ich lasse ihn aber aus
// Demonstrations-Zwecken einfach trotzdem drin.

// https://www.npmjs.com/package/express
// Fast, unopinionated, minimalist web framework for Node.js.
import express from 'express'
// https://nodejs.org/docs/latest/api/https.html
// Teil von NodeJS. Wird benötigt, um HTTPS zu verwenden
import https from 'https'
// https://nodejs.org/docs/latest/api/fs.html#promises-api
// ebenfalls Teil von NodeJS. Wird benötigt, um auf das FileSystem zuzugreifen
import { readFile } from 'fs/promises'
// https://www.npmjs.com/package/cowsay
// Eine Kuh für die Command Line
import { say } from 'cowsay'

// Normalerweise wäre dieser Pfad in einer Umgebungsvariablen, und nicht hart kodiert
const atCimdata = true
let certPath = '/Users/Student/VS Code/Javascript/AsuentoJS/certs'

// auslesen der beiden Zertifikats-Dateien
const { key, cert } = await (async () => {
  if (atCimdata) certPath = '/Users/Student/VS Code/Javascript/AsuentoJS/certs'
  return {
    key: await readFile(`${certPath}/localhost.key`),
    cert: await readFile(`${certPath}/localhost.crt`)
  }
})()

// Starten des Servers
const app = express()
const port = 4300
// app.use(express.static('public'))
https.createServer({ key, cert }, app).listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`)
})

// Ausgabe der Kuh
console.log(say({
  text: 'Server is started! Good morning!',
  e: 'oO',
  T: 'U',
  f: 'small'
}))

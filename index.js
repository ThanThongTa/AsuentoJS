// server code
import express from 'express'
import https from 'https'
import { readFile } from 'fs/promises'
import { say } from 'cowsay'

// Prereq:
// import the crt to the keychain access and 
// set trust to "always trust"

const {key, cert} = await (async () => {
  return {
    key: await readFile(`certs/localhost.key`),
    cert: await readFile(`certs/localhost.crt`)
  }
})();

console.log(say({
  text: 'Hello, World!',
  e: 'oO',
  T: 'U',
  f: 'small'
}))

const app = express()
const port = 4300
// app.use(express.static('public'))
https.createServer({key, cert}, app).listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`)
}); 
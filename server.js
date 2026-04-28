// server.js
import { createServer } from 'https'
import { readFileSync } from 'fs'
import next from 'next'

const app = next({ dev: false })
const handle = app.getRequestHandler()

const httpsOptions = {
  key: readFileSync('./certificates/localhost-key.pem'),
  cert: readFileSync('./certificates/localhost.pem'),
}

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    handle(req, res)
  }).listen(3001, () => {
    console.log('> Ready on https://localhost:3001')
  })
})

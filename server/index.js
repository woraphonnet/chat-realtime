const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const path = require('path')
const app = express()
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './assets/imgs')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage })

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

app.post("/upload",upload.single('file'),(req,res)=>{
  res.json({file:req.file})
})

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

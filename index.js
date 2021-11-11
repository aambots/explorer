#!/usr/bin/env node

const express = require('express')
const app = express()
const port = 5566 || process.env.port
const cors = require('cors')
const bodyParser = require('body-parser')
const execSync = require('child_process').execSync
const mime = require('mime-types')

app.use(cors())

// TODO
// check length of string
// deal with extensions
// make safe

function parsePath(path) {
  let ret = path.substring(1)
  ret = ret.split('.')[0]
  ret = ret.split(' ')[0]
  return ret
}

app.get('*', (req, res) => {

  const path = req.path
  const contentType = mime.lookup(path) || 'application/json'
  console.log(contentType)

  let tx = parsePath(path)
  console.log(tx)


  let cmd = './bin/gettx.sh ' + tx

  console.log('cmd', cmd)

  let json = execSync(cmd)
  console.log('json', json.toString())

  try {
    var j = JSON.parse(json.toString())
    res.setHeader('Content-Type', contentType)
    if (contentType === 'application/json') {
      res.send(j)
    } else if (contentType === 'text/html') {
      res.send(`<pre>${JSON.stringify(j, null, 2)}</pre>`)
    }
  } catch (e) {
    res.setHeader('Content-Type', 'text/html')
    res.send('no tx found')
  }

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

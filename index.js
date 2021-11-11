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

app.use('/css', express.static('css'))
app.use('/js', express.static('js'))

app.get('*', (req, res) => {

  const path = req.path
  const contentType = mime.lookup(path) || 'text/html'
  console.log(contentType)

  let tx = parsePath(path)
  console.log(tx)


  let gettxcmd = './bin/gettx.sh ' + tx
  console.log('gettxcmd', gettxcmd)
  let txjson = execSync(gettxcmd)
  console.log('txjson', txjson.toString())

  let nexttxcmd = './bin/nexttx.sh ' + tx
  console.log('nexttxcmd', nexttxcmd)
  var nexttxjson = execSync(nexttxcmd)
  console.log('nexttxjson', nexttxjson.toString())

  try {
    nexttxjson = JSON.parse(nexttxjson)
  } catch {
    nexttxjson = null
  }

  try {
    var j = JSON.parse(txjson.toString())
    res.setHeader('Content-Type', contentType)
    if (contentType === 'application/json') {
      res.send(j)
    } else if (contentType === 'text/html') {
      var body = `
      <html>
      <head>
        <link rel="stylesheet" href="./css/spux.css" />
        <script type="application/json" id="data">
        ${JSON.stringify(j, null, 2)}
        </script>
        <script type="module" src="./js/app.js"></script>
      </head>
      <body>`

      body += `</body></html>`

      res.send(body)
    }
  } catch (e) {
    res.setHeader('Content-Type', 'text/html')
    res.send('no tx found')
  }

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

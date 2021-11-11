#!/usr/bin/env node

const express = require('express')
const app = express()
const port = 5566 || process.env.port;
const cors = require('cors');
const bodyParser = require('body-parser');
const execSync = require('child_process').execSync

app.use(cors())

app.all('*', (req, res) => {
  var tx = req.path.substring(1).split(' ')[0]
  console.log(tx)
  var cmd = './bin/gettx.sh ' + tx
  console.log('cmd', cmd)
  var json = execSync(cmd);

  res.setHeader('Content-Type', 'application/json');
  res.send(json)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

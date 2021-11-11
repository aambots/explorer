import { Component, h, html, render } from './spux.js'
import './dior.js'

console.log(99)

console.log(di.data)

render(
  html`
    <h1>Hello Spux!</h1>
  `,
  document.body
)

render(html`
<h1>Tx ${di.data.txid}</h1>
<pre>${JSON.stringify(di.data, null, 2)}</pre>

<a href="${di.data.vin[0].txid}">prev</a><br/>
<a href="${di.data.txid}.json">json</a><br/>
`, document.body)


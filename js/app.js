import { Component, h, html, render } from './spux.js'
import './dior.js'

console.log(99)

console.log(di.data)

// di.data.txid = `<a href="${di.data.txid}">${di.data.txid}</a>`

render(html`
<h1>Tx ${di.data.txid}</h1>
<pre>${JSON.stringify(di.data, null, 2)}</pre>



<a href="${di.data.vin[0].txid}">prev</a><br/>
<a href="${di.data.txid}.json">json</a><br/>
`, document.body)

var d = di.data

render(html`
<h1>Tx ${di.data.txid}</h1>

Outputs
${d.vout.map(i => html`<pre>Address: ${i.scriptPubKey?.addresses[0]} 
${'\n'}
Amount: ${i.value}
${'\n'}
Pub Key: ${i.scriptPubKey?.hex}
</pre>`)}

Inputs
${d.vin.map(i => html`<pre>Txn: <a href=${i.txid}>${i.txid}:${i.vout}</a> 
${'\n'}
Hex: ${i.scriptSig?.hex}
</pre>`)}

Raw Data

<pre> ${JSON.stringify(d.vin, null, 2)}</pre>

<pre>${JSON.stringify(d.vout, null, 2)}</pre>



<a href="${di.data.vin[0].txid}">prev</a><br/>
<a href="${di.data.txid}.json">json</a><br/>
`, document.body)


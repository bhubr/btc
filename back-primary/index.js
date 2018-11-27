// JavaScript
const ccxt = require ('ccxt')
const { promisify } = require('util')
const writeFile = promisify(require('fs').writeFile)

let exchange = new ccxt.bigone() // default id
exchange.loadMarkets()
  .then(markets => {
    const { symbols, currencies } = exchange
    const dataJSON = JSON.stringify({ markets, symbols, currencies })
    console.log(Object.keys({ markets, symbols, currencies }))
//    return writeFile('data.json', dataJSON)
  })
  .catch(err => console.error(err))

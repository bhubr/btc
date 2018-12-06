const exchangesCcxtGet = require('./exchangesCcxtGet');
const exchangesDbUpdate = require('./exchangesDbUpdate');
const exchangesCcxt = exchangesCcxtGet();
exchangesDbUpdate(exchangesCcxt)
  .then(console.log)
  .then(() => process.exit());
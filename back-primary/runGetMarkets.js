const marketsCcxtGet = require('./marketsCcxtGet');
const marketsDbUpdate = require('./marketsDbUpdate');

marketsCcxtGet()
  .then(marketsDbUpdate)
  .then(console.log)
  .then(() => process.exit());
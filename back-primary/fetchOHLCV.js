const query = require('./query');
const store = require('./store');
const benchPromise = require('./benchPromise');

const getMarkets = () => query(`SELECT m.*, e.ccxt_id as ccxtId
  FROM market m INNER JOIN exchange e
  ON m.exchange_id = e.id
`);

const fetchMarketOHLCV = ({ ccxtId, symbol }) => {
  const exchange = store.get(ccxtId);
  if(exchange.has.fetchOHLCV) {
    return benchPromise(`fetchOHLCV ${ccxtId}/${symbol}`, exchange.fetchOHLCV(symbol, '1m', Date.now() - 120000))
      .then(result => ({ ccxtId, symbol, result }))
      .catch(error => ({ ccxtId, symbol, error: error.message }));
  }
  else {
    return Promise.resolve({ ccxtId, symbol, error: `No fetchOHLCV for ${ccxtId}/${symbol}` });
  }
}

const fetchMarketsOHLCV = markets => benchPromise('fetchOHLCV', Promise.all(markets.map(fetchMarketOHLCV)));

const fetchAllOHLCV = () => getMarkets()
  .then(fetchMarketsOHLCV)
  .then(console.log)

// fetchAllOHLCV();

module.exports = {
  fetchMarketOHLCV,
  fetchMarketsOHLCV
};
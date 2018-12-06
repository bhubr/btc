const ccxt = require('ccxt');
const Promise = require('bluebird');
const util = require('util');

const { crypto, fiat } = require('./currencies.json');
const allCurrencies = [...crypto, ...fiat];

const keepSupportedCurrenciesFilter = market => market.split('/')
  .every(currSymbol => allCurrencies.includes(currSymbol));

const mapExchangeMarkets = ({ ccxtExchangeId, markets }) => Object.keys(markets)
  .filter(keepSupportedCurrenciesFilter)
  .map(symbol => {
    const { base, quote } = markets[symbol];
    return { ccxtExchangeId, symbol, base, quote };
  })

const getMarketsForExchange = ccxtExchangeId => {
  exchangeClass = ccxt[ccxtExchangeId];
  const exchange = new exchangeClass();
  return exchange.loadMarkets()
    .then(markets => ({ ccxtExchangeId, markets }))
    .then(mapExchangeMarkets)
    .catch(error => ({ ccxtExchangeId, error: error.message }));
}

const flattenResults = marketsPerExchange => marketsPerExchange.reduce(
  (carry, exchangeResults) => Array.isArray(exchangeResults)
    ? [...carry, ...exchangeResults] : carry, []
);

const getMarkets = () => Promise.map(
  ccxt.exchanges, exchangeId => getMarketsForExchange(exchangeId)
)
  .then(flattenResults);

module.exports = getMarkets;
  // .then(res => console.log(util.inspect(res, false, null, true)));
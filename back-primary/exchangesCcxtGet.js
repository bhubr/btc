const ccxt = require('ccxt');

const getExchange = exchangeId => {
  exchangeClass = ccxt[exchangeId];
  const exchange = new exchangeClass();
  const {
    id,
    name,
    countries,
    urls: { www }
  } = exchange;
  return {
    ccxt_id: id,
    name,
    country: typeof countries === 'string' ? countries : countries.join(),
    website: typeof www === 'string' ? www : www[0]
  };
}

module.exports = () => ccxt.exchanges.map(getExchange);

const ccxt = require('ccxt');

const store = {};

const get = exchangeId => {
  if(!store[exchangeId]) {
    store[exchangeId] = new ccxt[exchangeId]();
  }
  return store[exchangeId];
};

module.exports = { get };
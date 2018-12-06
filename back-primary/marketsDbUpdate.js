// const exchangesCcxtGet = require('./exchangesCcxtGet');
const query = require('./query');

const mapFields = ({ symbol, base, quote, exchangeId: exchange_id }) => ({ symbol, base, quote, exchange_id })

const getInsertPromises = (marketsCcxt, marketsDb) => marketsCcxt
  .filter(marketCcxt => !marketsDb.find(
    marketDb => marketDb.exchange_id === marketCcxt.exchangeId
      && marketDb.symbol === marketCcxt.symbol
  ))
  .map(marketCcxt => query('INSERT INTO market SET ?', mapFields(marketCcxt)));

// const getDeletePromises = (exchangesCcxtIds, exchangesDbCcxtIds) => exchangesDbCcxtIds
//   .filter(exchangeCcxtId => !exchangesCcxtIds.includes(exchangeCcxtId))
//   .map(exchangeCcxtId => query('DELETE FROM exchange WHERE ccxt_id = ?', [exchangeCcxtId]));


const performDbUpdate = (marketsCcxt, marketsDb) => {
//   // const exchangesCcxtIds = exchangesCcxt.map(e => e.ccxt_id);
//   // const exchangesDbCcxtIds = exchangesDb.map(e => e.ccxt_id);
  const insertPromises = getInsertPromises(
    marketsCcxt, marketsDb
  );
  console.log(`num to insert: ${insertPromises.length}`);
//   const deletePromises = getDeletePromises(
//     exchangesCcxtIds, exchangesDbCcxtIds
//   );
//   console.log(`num to insert: ${insertPromises.length}, num to delete: ${deletePromises.length},`);
//   const promises = [...insertPromises, ...deletePromises];
  const promises = [...insertPromises];
  return Promise.all(promises)
  .then(() => ({
    inserts: insertPromises.length,
    // deletes: deletePromises.length
  }));
}

const bindMarketsExchanges = (markets, exchangeIdMap) => markets.map(
  market => ({ ...market, exchangeId: exchangeIdMap[market.ccxtExchangeId] })
)

const getExchangeIdMap = exchangeRecords => exchangeRecords.reduce(
  (carry, { id, ccxtExchangeId }) => ({ ...carry, [ccxtExchangeId]: id }), {}
);

const formatMarkets = marketsCcxt =>
  query('SELECT id, ccxt_id as ccxtExchangeId from exchange')
    .then(getExchangeIdMap)
    .then(exchangeIdMap => bindMarketsExchanges(marketsCcxt, exchangeIdMap))

const marketsDbUpdate = marketsCcxt => Promise.all([
  formatMarkets(marketsCcxt),
  query('SELECT * from market')
])
  .then(([marketsCcxtFmt, marketsDb]) => performDbUpdate(marketsCcxtFmt, marketsDb));

module.exports = marketsDbUpdate;

// const exchangesCcxtGet = require('./exchangesCcxtGet');
const query = require('./query');

const getInsertPromises = (exchangesCcxt, exchangesDbCcxtIds) => exchangesCcxt
  .filter(exchangeCcxt => !exchangesDbCcxtIds.includes(exchangeCcxt.ccxt_id))
  .map(exchangeCcxt => query('INSERT INTO exchange SET ?', exchangeCcxt));

const getDeletePromises = (exchangesCcxtIds, exchangesDbCcxtIds) => exchangesDbCcxtIds
  .filter(exchangeCcxtId => !exchangesCcxtIds.includes(exchangeCcxtId))
  .map(exchangeCcxtId => query('DELETE FROM exchange WHERE ccxt_id = ?', [exchangeCcxtId]));


const performDbUpdate = (exchangesCcxt, exchangesDb) => {
  const exchangesCcxtIds = exchangesCcxt.map(e => e.ccxt_id);
  const exchangesDbCcxtIds = exchangesDb.map(e => e.ccxt_id);
  const insertPromises = getInsertPromises(
    exchangesCcxt, exchangesDbCcxtIds
  );
  const deletePromises = getDeletePromises(
    exchangesCcxtIds, exchangesDbCcxtIds
  );
  console.log(`num to insert: ${insertPromises.length}, num to delete: ${deletePromises.length},`);
  const promises = [...insertPromises, ...deletePromises];
  return Promise.all(promises)
  .then(() => ({
    inserts: insertPromises.length,
    deletes: deletePromises.length
  }));
}

const exchangesDbUpdate = exchangesCcxt => query('SELECT * from exchange')
  .then(exchangesDb => performDbUpdate(exchangesCcxt, exchangesDb));

module.exports = exchangesDbUpdate;
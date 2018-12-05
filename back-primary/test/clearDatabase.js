const query = require('../query');
const assert = require('assert');
const Promise = require('bluebird');

const { database } = require('../credentials').test;
const keyInResultSet = `Tables_in_${database}`;

const extractTable = table => table[keyInResultSet];
const extractTables = tables => tables.map(extractTable);
const truncateTable = table => query(`TRUNCATE TABLE ${table}`);
const truncateTables = tables => Promise.map(
  tables, table => truncateTable(table)
);

const assertIsTest = () => process.env.NODE_ENV === 'test'
  ? Promise.resolve(true)
  : Promise.reject(new Error('Set NODE_ENV to `test`'));

const clearDatabase = () => assertIsTest()
  .then(() => query('SHOW TABLES'))
  .then(extractTables)
  .then(truncateTables);

module.exports = clearDatabase;

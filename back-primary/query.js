const mysql = require('mysql');
const { promisify } = require('util');
const env = process.env.NODE_ENV || 'dev';
const credentials = require('./credentials')[env];
const connection = mysql.createConnection(credentials);
const query = promisify(connection.query.bind(connection));
module.exports = query;

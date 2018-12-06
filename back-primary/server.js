const express = require('express');
const query = require('./query');

const app = express();

app.get('/ohlcv', (req, res) => query('select * from history_ohlcv')
  .then(records => res.json(records))
);

app.listen(7000);


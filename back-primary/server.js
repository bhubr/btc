const express = require('express');
const cors = require('cors');
const query = require('./query');

const app = express();
app.use(cors());

setInterval(() => query('SELECT 1'), 60000);

app.get('/ohlcv', (req, res) => query('select * from history_ohlcv')
  .then(records => res.json(records))
);

app.listen(7000);


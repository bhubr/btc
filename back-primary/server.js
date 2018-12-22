const express = require('express');
const cors = require('cors');
const query = require('./query');

const app = express();
app.use(cors());

setInterval(() => query('SELECT 1'), 60000);

const fetchOHLCV = queryParams => {
  const whereKeys = queryParams.from
    ? ` WHERE timestamp >= ?` : '';
  const whereValues = queryParams.from
    ? [queryParams.from] : [];
  return query(`select * from history_ohlcv${whereKeys}`, whereValues);
};

app.get('/ohlcv', (req, res) => fetchOHLCV(req.query)
  .then(records => res.json(records))
);

app.listen(7000);


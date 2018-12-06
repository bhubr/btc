const fs = require('fs');
const { promisify } = require('util');
const query = require('./query');
const writeFileAsync = promisify(fs.writeFile);
const writeJSON = (file, data) => writeFileAsync(file, JSON.stringify(data));

const {
  fetchMarketOHLCV
} = require('./fetchOHLCV');

class Results {
  constructor(ccxtId, symbol) {
    this.ccxtId = ccxtId;
    this.symbol = symbol;
    this.results = [];
  }
  add([ts, open, high, low, close, volume]) {
    const hasTs = this.results.find(r => r.ts === ts);
    if(hasTs) {
      return;
    }
    console.log('add', this.ccxtId, ts, open, high, low, close);
    this.results.push({ ts, open, high, low, close, volume });
    const [base, quote] = this.symbol.split('/');
    const obj = {
      symbol: this.symbol,
      timestamp: ts / 1000,
      exchange_ccxt_id: this.ccxtId,
      open,
      high,
      low,
      close,
      volume,
      base, quote
    };
    query('INSERT INTO history_ohlcv SET ?', obj);
      // .then(() => writeJSON(`${this.ccxtId}.json`, this.results));
  }
}

const r = new Results('huobipro', 'BTC/USDT');

const fetch = () => fetchMarketOHLCV({ ccxtId: 'huobipro', symbol: 'BTC/USDT' })
  .then(({ result }) => result.forEach(bit => r.add(bit)));

setInterval(fetch, 60000);
fetch();
  // .then(res => console.log(util.inspect(res, false, null, true)));
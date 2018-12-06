const util = require('util');

const {
  fetchMarketOHLCV
} = require('./fetchOHLCV');

class Results {
  constructor(ccxtId) {
    this.ccxtId = ccxtId;
    this.results = [];
  }
  add([ts, open, high, low, close, volume]) {
    const hasTs = this.results.find(r => r.ts === ts);
    if(!hasTs) {
      this.results.push({ ts, open, high, low, close, volume });
    }
    console.log('add', this.ccxtId, ts, open, high, low, close);
  }
}

const r = new Results('huobipro');

const fetch = () => fetchMarketOHLCV({ ccxtId: 'huobipro', symbol: 'BTC/USDT' })
  .then(({ result }) => result.forEach(bit => r.add(bit)));

setInterval(fetch, 60000);
fetch();
  // .then(res => console.log(util.inspect(res, false, null, true)));
const proxyquire  = require('proxyquire');
const assert      =  require('chai').assert;
const { tmpdir }  = require('os');
const ccxtInstall = require('../lib/ccxtInstall');

const exchangesDbUpdate = require('../exchangesDbUpdate');
const query = require('../query');
const clearDatabase = require('./clearDatabase');
const getCcxtStub = version => require(`${tmpdir()}/ccxt${version}/node_modules/ccxt`);

beforeAll(() => Promise.all([
  ccxtInstall('1.17.99'),
  ccxtInstall('1.17.586', true)
]), 90000);

const getExchangesCcxtGet = version => {
  const ccxt = getCcxtStub(version);
  return proxyquire('../exchangesCcxtGet', { ccxt });
}; 

describe('test exchangesDbUpdate', () => {
  beforeEach(clearDatabase);
  it('populates db on first run', () => {
    // getExchangeDbUpdate('1.17.99')()
    // .then(console.log)
    const exchangesCcxtOld = getExchangesCcxtGet('1.17.99')();
    const exchangesCcxtNew = getExchangesCcxtGet('1.17.586')();
    return exchangesDbUpdate(exchangesCcxtOld).then(
      res1 => exchangesDbUpdate(exchangesCcxtNew)
        .then(res2 => console.log(res1, res2))
    );
    // console.log(exchangesCcxtGetProxied());
    // console.log(process.env.NODE_ENV);
    
  });
});

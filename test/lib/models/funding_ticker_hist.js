/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { RESTv2 } = require('bfx-api-node-rest')
const { FundingTickerHist } = require('../../../lib')

const DATA = [
  'fUSD',
  null,
  0.00009526,
  null,
  30,
  0.00009042,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  1544097835000
]

describe('FundingTicker history model', () => {
  it('initializes correctly', () => {
    const ticker = new FundingTickerHist(DATA)
    assert.equal(ticker.symbol, 'fUSD')
    assert.equal(ticker.bid, 0.00009526)
    assert.equal(ticker.bidPeriod, 30)
    assert.equal(ticker.ask, 0.00009042)
    assert.equal(ticker.mtsUpdate, 1544097835000)
  })

  it('serializes correctly', () => {
    const ticker = new FundingTickerHist(DATA)
    const arr = ticker.serialize()
    assert.strictEqual(JSON.stringify(arr), JSON.stringify(DATA))
  })

  it('unserializes correctly', () => {
    const obj = FundingTickerHist.unserialize(DATA)
    assert.equal(obj.symbol, 'fUSD')
    assert.equal(obj.bid, 0.00009526)
    assert.equal(obj.bidPeriod, 30)
    assert.equal(obj.ask, 0.00009042)
    assert.equal(obj.mtsUpdate, 1544097835000)
  })

  it('unserializes live data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.ticker('fUSD')
    const obj = FundingTickerHist.unserialize(arr)

    assert.equal(obj.symbol, arr[0])
    assert.equal(obj.bid, arr[2])
    assert.equal(obj.bidPeriod, arr[4])
    assert.equal(obj.ask, arr[5])
    assert.equal(obj.mtsUpdate, arr[15])
  })
})

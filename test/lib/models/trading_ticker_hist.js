/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { RESTv2 } = require('bfx-api-node-rest')
const { TradingTickerHist } = require('../../../lib')

const DATA = [
  'tBTCUSD',
  228.56,
  null,
  228.58,
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

describe('TradingTickerHistory model', () => {
  it('initializes correctly', () => {
    const ticker = new TradingTickerHist(DATA)

    assert.equal(ticker.symbol, 'tBTCUSD')
    assert.equal(ticker.bid, 228.56)
    assert.equal(ticker.ask, 228.58)
    assert.equal(ticker.mtsUpdate, 1544097835000)
  })

  it('serializes correctly', () => {
    const ticker = new TradingTickerHist(DATA)
    const arr = ticker.serialize()

    assert.strictEqual(JSON.stringify(arr), JSON.stringify(DATA))
  })

  it('unserializes correctly', () => {
    const obj = TradingTickerHist.unserialize(DATA)

    assert.equal(obj.symbol, 'tBTCUSD')
    assert.equal(obj.bid, 228.56)
    assert.equal(obj.ask, 228.58)
    assert.equal(obj.mtsUpdate, 1544097835000)
  })

  it('unserializes live data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.ticker('tBTCUSD')
    const obj = TradingTickerHist.unserialize(arr)

    assert.equal(obj.symbol, arr[0])
    assert.equal(obj.bid, arr[1])
    assert.equal(obj.ask, arr[3])
    assert.equal(obj.mtsUpdate, arr[12])
  })
})

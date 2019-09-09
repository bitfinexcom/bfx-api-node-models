/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { RESTv2 } = require('bfx-api-node-rest')
const { TradingTicker } = require('../../../lib')

const DATA = [
  'tBTCUSD',
  228.56,
  430.1902224,
  228.58,
  496.39268958,
  -55.08222913,
  -0.1942,
  228.56777087,
  881908.12214509,
  284.62,
  211.19
]

describe('TradingTicker model', () => {
  it('initializes correctly', () => {
    const ticker = new TradingTicker(DATA)

    assert.strictEqual(ticker.symbol, 'tBTCUSD')
    assert.strictEqual(ticker.bid, 228.56)
    assert.strictEqual(ticker.bidSize, 430.1902224)
    assert.strictEqual(ticker.ask, 228.58)
    assert.strictEqual(ticker.askSize, 496.39268958)
    assert.strictEqual(ticker.dailyChange, -55.08222913)
    assert.strictEqual(ticker.dailyChangePerc, -0.1942)
    assert.strictEqual(ticker.lastPrice, 228.56777087)
    assert.strictEqual(ticker.volume, 881908.12214509)
    assert.strictEqual(ticker.high, 284.62)
    assert.strictEqual(ticker.low, 211.19)
  })

  it('serializes correctly', () => {
    const ticker = new TradingTicker(DATA)
    const arr = ticker.serialize()

    assert.deepStrictEqual(arr, DATA)
  })

  it('unserializes correctly', () => {
    const obj = TradingTicker.unserialize(DATA)

    assert.strictEqual(obj.symbol, 'tBTCUSD')
    assert.strictEqual(obj.bid, 228.56)
    assert.strictEqual(obj.bidSize, 430.1902224)
    assert.strictEqual(obj.ask, 228.58)
    assert.strictEqual(obj.askSize, 496.39268958)
    assert.strictEqual(obj.dailyChange, -55.08222913)
    assert.strictEqual(obj.dailyChangePerc, -0.1942)
    assert.strictEqual(obj.lastPrice, 228.56777087)
    assert.strictEqual(obj.volume, 881908.12214509)
    assert.strictEqual(obj.high, 284.62)
    assert.strictEqual(obj.low, 211.19)
  })

  it('unserializes live data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.ticker('tBTCUSD')
    const obj = TradingTicker.unserialize(arr)

    assert.strictEqual(obj.symbol, arr[0])
    assert.strictEqual(obj.bid, arr[1])
    assert.strictEqual(obj.bidSize, arr[2])
    assert.strictEqual(obj.ask, arr[3])
    assert.strictEqual(obj.askSize, arr[4])
    assert.strictEqual(obj.dailyChange, arr[5])
    assert.strictEqual(obj.dailyChangePerc, arr[6])
    assert.strictEqual(obj.lastPrice, arr[7])
    assert.strictEqual(obj.volume, arr[8])
    assert.strictEqual(obj.high, arr[9])
    assert.strictEqual(obj.low, arr[10])
  })
})

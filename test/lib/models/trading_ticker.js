/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { RESTv2 } = require('bfx-api-node-rest')
const { TradingTicker } = require('../../../lib')

const DATA = [
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

    assert.equal(ticker.bid, 228.56)
    assert.equal(ticker.bidSize, 430.1902224)
    assert.equal(ticker.ask, 228.58)
    assert.equal(ticker.askSize, 496.39268958)
    assert.equal(ticker.dailyChange, -55.08222913)
    assert.equal(ticker.dailyChangePerc, -0.1942)
    assert.equal(ticker.lastPrice, 228.56777087)
    assert.equal(ticker.volume, 881908.12214509)
    assert.equal(ticker.high, 284.62)
    assert.equal(ticker.low, 211.19)
  })

  it('serializes correctly', () => {
    const ticker = new TradingTicker(DATA)
    const arr = ticker.serialize()

    assert.deepStrictEqual(arr, DATA)
  })

  it('unserializes correctly', () => {
    const obj = TradingTicker.unserialize(DATA)

    assert.equal(obj.bid, 228.56)
    assert.equal(obj.bidSize, 430.1902224)
    assert.equal(obj.ask, 228.58)
    assert.equal(obj.askSize, 496.39268958)
    assert.equal(obj.dailyChange, -55.08222913)
    assert.equal(obj.dailyChangePerc, -0.1942)
    assert.equal(obj.lastPrice, 228.56777087)
    assert.equal(obj.volume, 881908.12214509)
    assert.equal(obj.high, 284.62)
    assert.equal(obj.low, 211.19)
  })

  it('unserializes live data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.ticker('tBTCUSD')
    const obj = TradingTicker.unserialize(arr)

    assert.equal(obj.bid, arr[0])
    assert.equal(obj.bidSize, arr[1])
    assert.equal(obj.ask, arr[2])
    assert.equal(obj.askSize, arr[3])
    assert.equal(obj.dailyChange, arr[4])
    assert.equal(obj.dailyChangePerc, arr[5])
    assert.equal(obj.lastPrice, arr[6])
    assert.equal(obj.volume, arr[7])
    assert.equal(obj.high, arr[8])
    assert.equal(obj.low, arr[9])
  })
})

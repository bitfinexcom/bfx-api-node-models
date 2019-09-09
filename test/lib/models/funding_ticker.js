/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { RESTv2 } = require('bfx-api-node-rest')
const { FundingTicker } = require('../../../lib')

const DATA = [
  'fUSD',
  0.00009351,
  0.00009526,
  1365265.8039803,
  30,
  0.00009042,
  1920909.19369824,
  2,
  -0.00001159,
  -0.1136,
  0.00009041,
  255643282.81674618,
  0.000163,
  2.7e-7
]

describe('FundingTicker model', () => {
  it('initializes correctly', () => {
    const ticker = new FundingTicker(DATA)
    assert.strictEqual(ticker.symbol, 'fUSD')
    assert.strictEqual(ticker.frr, 0.00009351)
    assert.strictEqual(ticker.bid, 0.00009526)
    assert.strictEqual(ticker.bidPeriod, 30)
    assert.strictEqual(ticker.bidSize, 1365265.8039803)
    assert.strictEqual(ticker.ask, 0.00009042)
    assert.strictEqual(ticker.askPeriod, 2)
    assert.strictEqual(ticker.askSize, 1920909.19369824)
    assert.strictEqual(ticker.dailyChange, -0.00001159)
    assert.strictEqual(ticker.dailyChangePerc, -0.1136)
    assert.strictEqual(ticker.lastPrice, 0.00009041)
    assert.strictEqual(ticker.volume, 255643282.81674618)
    assert.strictEqual(ticker.high, 0.000163)
    assert.strictEqual(ticker.low, 2.7e-7)
  })

  it('serializes correctly', () => {
    const ticker = new FundingTicker(DATA)
    const arr = ticker.serialize()

    assert.deepStrictEqual(arr, DATA)
  })

  it('unserializes correctly', () => {
    const obj = FundingTicker.unserialize(DATA)
    assert.strictEqual(obj.symbol, 'fUSD')
    assert.strictEqual(obj.frr, 0.00009351)
    assert.strictEqual(obj.bid, 0.00009526)
    assert.strictEqual(obj.bidPeriod, 30)
    assert.strictEqual(obj.bidSize, 1365265.8039803)
    assert.strictEqual(obj.ask, 0.00009042)
    assert.strictEqual(obj.askPeriod, 2)
    assert.strictEqual(obj.askSize, 1920909.19369824)
    assert.strictEqual(obj.dailyChange, -0.00001159)
    assert.strictEqual(obj.dailyChangePerc, -0.1136)
    assert.strictEqual(obj.lastPrice, 0.00009041)
    assert.strictEqual(obj.volume, 255643282.81674618)
    assert.strictEqual(obj.high, 0.000163)
    assert.strictEqual(obj.low, 2.7e-7)
  })

  it('unserializes live data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.ticker('fUSD')
    const obj = FundingTicker.unserialize(arr)

    assert.strictEqual(obj.symbol, arr[0])
    assert.strictEqual(obj.frr, arr[1])
    assert.strictEqual(obj.bid, arr[2])
    assert.strictEqual(obj.bidSize, arr[3])
    assert.strictEqual(obj.bidPeriod, arr[4])
    assert.strictEqual(obj.ask, arr[5])
    assert.strictEqual(obj.askSize, arr[6])
    assert.strictEqual(obj.askPeriod, arr[7])
    assert.strictEqual(obj.dailyChange, arr[8])
    assert.strictEqual(obj.dailyChangePerc, arr[9])
    assert.strictEqual(obj.lastPrice, arr[10])
    assert.strictEqual(obj.volume, arr[11])
    assert.strictEqual(obj.high, arr[12])
    assert.strictEqual(obj.low, arr[13])
  })
})

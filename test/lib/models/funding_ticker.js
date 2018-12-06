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
    assert.equal(ticker.symbol, 'fUSD')
    assert.equal(ticker.frr, 0.00009351)
    assert.equal(ticker.bid, 0.00009526)
    assert.equal(ticker.bidPeriod, 30)
    assert.equal(ticker.bidSize, 1365265.8039803)
    assert.equal(ticker.ask, 0.00009042)
    assert.equal(ticker.askPeriod, 2)
    assert.equal(ticker.askSize, 1920909.19369824)
    assert.equal(ticker.dailyChange, -0.00001159)
    assert.equal(ticker.dailyChangePerc, -0.1136)
    assert.equal(ticker.lastPrice, 0.00009041)
    assert.equal(ticker.volume, 255643282.81674618)
    assert.equal(ticker.high, 0.000163)
    assert.equal(ticker.low, 2.7e-7)
  })

  it('serializes correctly', () => {
    const ticker = new FundingTicker(DATA)
    const arr = ticker.serialize()

    assert.deepStrictEqual(arr, DATA)
  })

  it('unserializes correctly', () => {
    const obj = FundingTicker.unserialize(DATA)
    assert.equal(obj.symbol, 'fUSD')
    assert.equal(obj.frr, 0.00009351)
    assert.equal(obj.bid, 0.00009526)
    assert.equal(obj.bidPeriod, 30)
    assert.equal(obj.bidSize, 1365265.8039803)
    assert.equal(obj.ask, 0.00009042)
    assert.equal(obj.askPeriod, 2)
    assert.equal(obj.askSize, 1920909.19369824)
    assert.equal(obj.dailyChange, -0.00001159)
    assert.equal(obj.dailyChangePerc, -0.1136)
    assert.equal(obj.lastPrice, 0.00009041)
    assert.equal(obj.volume, 255643282.81674618)
    assert.equal(obj.high, 0.000163)
    assert.equal(obj.low, 2.7e-7)
  })

  it('unserializes live data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.ticker('fUSD')
    const obj = FundingTicker.unserialize(arr)

    assert.equal(obj.symbol, arr[0])
    assert.equal(obj.frr, arr[1])
    assert.equal(obj.bid, arr[2])
    assert.equal(obj.bidSize, arr[3])
    assert.equal(obj.bidPeriod, arr[4])
    assert.equal(obj.ask, arr[5])
    assert.equal(obj.askSize, arr[6])
    assert.equal(obj.askPeriod, arr[7])
    assert.equal(obj.dailyChange, arr[8])
    assert.equal(obj.dailyChangePerc, arr[9])
    assert.equal(obj.lastPrice, arr[10])
    assert.equal(obj.volume, arr[11])
    assert.equal(obj.high, arr[12])
    assert.equal(obj.low, arr[13])
  })
})

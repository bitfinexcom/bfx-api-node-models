/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { SYMBOLS } = require('bfx-hf-util')
const { RESTv2 } = require('bfx-api-node-rest')
const { FundingTickerHist } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)
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
  testModel({
    model: FundingTickerHist,
    orderedFields: [
      'symbol', null, 'bid', null, 'bidPeriod', 'ask', null, null, null, null,
      null, null, null, null, null, 'mtsUpdate'
    ]
  })

  testModelValidation({
    model: FundingTickerHist,
    validData: {
      symbol: VALID_SYMBOLS,
      bid: new Array(...(new Array(5))).map(() => Math.random()),
      bidPeriod: new Array(...(new Array(5))).map(() => Math.random()),
      ask: new Array(...(new Array(5))).map(() => Math.random()),
      mtsUpdate: new Array(...(new Array(5))).map(() => Math.random())
    }
  })

  it('initializes correctly', () => {
    const ticker = new FundingTickerHist(DATA)
    assert.strictEqual(ticker.symbol, 'fUSD')
    assert.strictEqual(ticker.bid, 0.00009526)
    assert.strictEqual(ticker.bidPeriod, 30)
    assert.strictEqual(ticker.ask, 0.00009042)
    assert.strictEqual(ticker.mtsUpdate, 1544097835000)
  })

  it('serializes correctly', () => {
    const ticker = new FundingTickerHist(DATA)
    const arr = ticker.serialize()
    assert.strictEqual(JSON.stringify(arr), JSON.stringify(DATA))
  })

  it('unserializes correctly', () => {
    const obj = FundingTickerHist.unserialize(DATA)
    assert.strictEqual(obj.symbol, 'fUSD')
    assert.strictEqual(obj.bid, 0.00009526)
    assert.strictEqual(obj.bidPeriod, 30)
    assert.strictEqual(obj.ask, 0.00009042)
    assert.strictEqual(obj.mtsUpdate, 1544097835000)
  })

  it('unserializes live data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.ticker('fUSD')
    const obj = FundingTickerHist.unserialize(arr)

    assert.strictEqual(obj.symbol, arr[0])
    assert.strictEqual(obj.bid, arr[2])
    assert.strictEqual(obj.bidPeriod, arr[4])
    assert.strictEqual(obj.ask, arr[5])
    assert.strictEqual(obj.mtsUpdate, arr[15])
  }).timeout(60000)

  describe('quote', () => {
    it('returns quote currency', () => {
      const t = new FundingTickerHist({ symbol: 'tBTCUSD' })
      assert.strictEqual(t.quote(), 'USD')
    })
  })

  describe('base', () => {
    it('returns base currency', () => {
      const t = new FundingTickerHist({ symbol: 'tBTCUSD' })
      assert.strictEqual(t.base(), 'BTC')
    })
  })
})

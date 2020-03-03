/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { RESTv2 } = require('bfx-api-node-rest')
const { SYMBOLS } = require('bfx-hf-util')
const { TradingTickerHist } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)
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
  testModel({
    model: TradingTickerHist,
    orderedFields: [
      'symbol', 'bid', null, 'ask', null, null, null, null, null, null, null,
      null, 'mtsUpdate'
    ]
  })

  testModelValidation({
    model: TradingTickerHist,
    validData: {
      symbol: VALID_SYMBOLS,
      bid: new Array(...(new Array(5))).map(() => Math.random()),
      ask: new Array(...(new Array(5))).map(() => Math.random()),
      mtsUpdated: new Array(...(new Array(5))).map(() => Math.random())
    }
  })

  it('initializes correctly', () => {
    const ticker = new TradingTickerHist(DATA)

    assert.strictEqual(ticker.symbol, 'tBTCUSD')
    assert.strictEqual(ticker.bid, 228.56)
    assert.strictEqual(ticker.ask, 228.58)
    assert.strictEqual(ticker.mtsUpdate, 1544097835000)
  })

  it('serializes correctly', () => {
    const ticker = new TradingTickerHist(DATA)
    const arr = ticker.serialize()

    assert.strictEqual(JSON.stringify(arr), JSON.stringify(DATA))
  })

  it('unserializes correctly', () => {
    const obj = TradingTickerHist.unserialize(DATA)

    assert.strictEqual(obj.symbol, 'tBTCUSD')
    assert.strictEqual(obj.bid, 228.56)
    assert.strictEqual(obj.ask, 228.58)
    assert.strictEqual(obj.mtsUpdate, 1544097835000)
  })

  it('unserializes live data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.ticker('tBTCUSD')
    const obj = TradingTickerHist.unserialize(arr)

    assert.strictEqual(obj.symbol, arr[0])
    assert.strictEqual(obj.bid, arr[1])
    assert.strictEqual(obj.ask, arr[3])
    assert.strictEqual(obj.mtsUpdate, arr[12])
  })

  describe('base', () => {
    it('returns the base currency for the ticker', () => {
      const t = new TradingTickerHist({ symbol: 'tBTCUSD' })
      assert.strictEqual(t.base(), 'BTC')
    })
  })

  describe('quote', () => {
    it('returns the quote currency for the ticker', () => {
      const t = new TradingTickerHist({ symbol: 'tBTCUSD' })
      assert.strictEqual(t.quote(), 'USD')
    })
  })
})

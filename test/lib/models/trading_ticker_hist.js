'use strict'

const test = require('brittle')
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

test('TradingTickerHistory model', async (t) => {
  testModel(t, {
    model: TradingTickerHist,
    orderedFields: [
      'symbol', 'bid', null, 'ask', null, null, null, null, null, null, null,
      null, 'mtsUpdate'
    ]
  })

  testModelValidation(t, {
    model: TradingTickerHist,
    validData: {
      symbol: VALID_SYMBOLS,
      bid: [...(new Array(5))].map(() => Math.random()),
      ask: [...(new Array(5))].map(() => Math.random()),
      mtsUpdated: [...(new Array(5))].map(() => Math.random())
    }
  })

  await t.test('initializes correctly', (t) => {
    const ticker = new TradingTickerHist(DATA)

    t.is(ticker.symbol, 'tBTCUSD')
    t.is(ticker.bid, 228.56)
    t.is(ticker.ask, 228.58)
    t.is(ticker.mtsUpdate, 1544097835000)
  })

  await t.test('serializes correctly', (t) => {
    const ticker = new TradingTickerHist(DATA)
    const arr = ticker.serialize()

    t.is(JSON.stringify(arr), JSON.stringify(DATA))
  })

  await t.test('unserializes correctly', (t) => {
    const obj = TradingTickerHist.unserialize(DATA)

    t.is(obj.symbol, 'tBTCUSD')
    t.is(obj.bid, 228.56)
    t.is(obj.ask, 228.58)
    t.is(obj.mtsUpdate, 1544097835000)
  })

  await t.test('unserializes live data correctly', async (t) => {
    const rest = new RESTv2()
    const arr = await rest.ticker({ symbol: 'tBTCUSD' })
    const obj = TradingTickerHist.unserialize(arr)

    t.is(obj.symbol, arr[0])
    t.is(obj.bid, arr[1])
    t.is(obj.ask, arr[3])
    t.is(obj.mtsUpdate, arr[12])
  })

  await t.test('base', (t) => {
    t.test('returns the base currency for the ticker', (t) => {
      const ticker = new TradingTickerHist({ symbol: 'tBTCUSD' })
      t.is(ticker.base(), 'BTC')
    })
  })

  await t.test('quote', (t) => {
    t.test('returns the quote currency for the ticker', (t) => {
      const ticker = new TradingTickerHist({ symbol: 'tBTCUSD' })
      t.is(ticker.quote(), 'USD')
    })
  })
})

'use strict'

const test = require('brittle')
const { SYMBOLS } = require('bfx-hf-util')
const { RESTv2 } = require('bfx-api-node-rest')
const { TradingTicker } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)
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

test('TradingTicker model', async (t) => {
  testModel(t, {
    model: TradingTicker,
    orderedFields: [
      'symbol', 'bid', 'bidSize', 'ask', 'askSize', 'dailyChange',
      'dailyChangePerc', 'lastPrice', 'volume', 'high', 'low'
    ]
  })

  testModelValidation(t, {
    model: TradingTicker,
    validData: {
      symbol: VALID_SYMBOLS,
      bid: [...(new Array(5))].map(() => Math.random()),
      bidSize: [...(new Array(5))].map(() => Math.random()),
      ask: [...(new Array(5))].map(() => Math.random()),
      askSize: [...(new Array(5))].map(() => Math.random()),
      dailyChange: [...(new Array(5))].map(() => Math.random()),
      dailyChangePerc: [...(new Array(5))].map(() => Math.random()),
      lastPrice: [...(new Array(5))].map(() => Math.random()),
      volume: [...(new Array(5))].map(() => Math.random()),
      high: [...(new Array(5))].map(() => Math.random()),
      low: [...(new Array(5))].map(() => Math.random())
    }
  })

  await t.test('initializes correctly', (t) => {
    const ticker = new TradingTicker(DATA)

    t.is(ticker.symbol, 'tBTCUSD')
    t.is(ticker.bid, 228.56)
    t.is(ticker.bidSize, 430.1902224)
    t.is(ticker.ask, 228.58)
    t.is(ticker.askSize, 496.39268958)
    t.is(ticker.dailyChange, -55.08222913)
    t.is(ticker.dailyChangePerc, -0.1942)
    t.is(ticker.lastPrice, 228.56777087)
    t.is(ticker.volume, 881908.12214509)
    t.is(ticker.high, 284.62)
    t.is(ticker.low, 211.19)
  })

  await t.test('serializes correctly', (t) => {
    const ticker = new TradingTicker(DATA)
    const arr = ticker.serialize()

    t.alike(arr, DATA)
  })

  await t.test('unserializes correctly', (t) => {
    const obj = TradingTicker.unserialize(DATA)

    t.is(obj.symbol, 'tBTCUSD')
    t.is(obj.bid, 228.56)
    t.is(obj.bidSize, 430.1902224)
    t.is(obj.ask, 228.58)
    t.is(obj.askSize, 496.39268958)
    t.is(obj.dailyChange, -55.08222913)
    t.is(obj.dailyChangePerc, -0.1942)
    t.is(obj.lastPrice, 228.56777087)
    t.is(obj.volume, 881908.12214509)
    t.is(obj.high, 284.62)
    t.is(obj.low, 211.19)
  })

  await t.test('unserializes live data correctly', async (t) => {
    const rest = new RESTv2()
    const arr = await rest.ticker({ symbol: 'tBTCUSD' })
    const obj = TradingTicker.unserialize(arr)

    t.is(obj.symbol, arr[0])
    t.is(obj.bid, arr[1])
    t.is(obj.bidSize, arr[2])
    t.is(obj.ask, arr[3])
    t.is(obj.askSize, arr[4])
    t.is(obj.dailyChange, arr[5])
    t.is(obj.dailyChangePerc, arr[6])
    t.is(obj.lastPrice, arr[7])
    t.is(obj.volume, arr[8])
    t.is(obj.high, arr[9])
    t.is(obj.low, arr[10])
  })

  await t.test('base', (t) => {
    t.test('returns the base currency for the ticker', (t) => {
      const ticker = new TradingTicker({ symbol: 'tBTCUSD' })
      t.is(ticker.base(), 'BTC')
    })
  })

  await t.test('quote', (t) => {
    t.test('returns the quote currency for the ticker', (t) => {
      const ticker = new TradingTicker({ symbol: 'tBTCUSD' })
      t.is(ticker.quote(), 'USD')
    })
  })
})

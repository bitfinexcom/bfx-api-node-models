'use strict'

const test = require('brittle')
const { SYMBOLS } = require('@bitfinex/bfx-hf-util')
const { RESTv2 } = require('bfx-api-node-rest')
const { FundingTicker } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)
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

test('FundingTicker model', async (t) => {
  testModel(t, {
    model: FundingTicker,
    orderedFields: [
      'symbol', 'frr', 'bid', 'bidSize', 'bidPeriod', 'ask', 'askSize',
      'askPeriod', 'dailyChange', 'dailyChangePerc', 'lastPrice', 'volume',
      'high', 'low'
    ]
  })

  testModelValidation(t, {
    model: FundingTicker,
    validData: {
      symbol: VALID_SYMBOLS,
      bid: [...(new Array(5))].map(() => Math.random()),
      bidSize: [...(new Array(5))].map(() => Math.random()),
      bidPeriod: [...(new Array(5))].map(() => Math.random()),
      ask: [...(new Array(5))].map(() => Math.random()),
      askSize: [...(new Array(5))].map(() => Math.random()),
      askPeriod: [...(new Array(5))].map(() => Math.random()),
      dailyChange: [...(new Array(5))].map(() => Math.random()),
      dailyChangePerc: [...(new Array(5))].map(() => Math.random()),
      lastPrice: [...(new Array(5))].map(() => Math.random()),
      volume: [...(new Array(5))].map(() => Math.random()),
      high: [...(new Array(5))].map(() => Math.random()),
      low: [...(new Array(5))].map(() => Math.random()),
      frr: [...(new Array(5))].map(() => Math.random() > 0.5)
    }
  })

  await t.test('initializes correctly', (t) => {
    const ticker = new FundingTicker(DATA)
    t.is(ticker.symbol, 'fUSD')
    t.is(ticker.frr, 0.00009351)
    t.is(ticker.bid, 0.00009526)
    t.is(ticker.bidPeriod, 30)
    t.is(ticker.bidSize, 1365265.8039803)
    t.is(ticker.ask, 0.00009042)
    t.is(ticker.askPeriod, 2)
    t.is(ticker.askSize, 1920909.19369824)
    t.is(ticker.dailyChange, -0.00001159)
    t.is(ticker.dailyChangePerc, -0.1136)
    t.is(ticker.lastPrice, 0.00009041)
    t.is(ticker.volume, 255643282.81674618)
    t.is(ticker.high, 0.000163)
    t.is(ticker.low, 2.7e-7)
  })

  await t.test('serializes correctly', (t) => {
    const ticker = new FundingTicker(DATA)
    const arr = ticker.serialize()

    t.alike(arr, DATA)
  })

  await t.test('unserializes correctly', (t) => {
    const obj = FundingTicker.unserialize(DATA)
    t.is(obj.symbol, 'fUSD')
    t.is(obj.frr, 0.00009351)
    t.is(obj.bid, 0.00009526)
    t.is(obj.bidPeriod, 30)
    t.is(obj.bidSize, 1365265.8039803)
    t.is(obj.ask, 0.00009042)
    t.is(obj.askPeriod, 2)
    t.is(obj.askSize, 1920909.19369824)
    t.is(obj.dailyChange, -0.00001159)
    t.is(obj.dailyChangePerc, -0.1136)
    t.is(obj.lastPrice, 0.00009041)
    t.is(obj.volume, 255643282.81674618)
    t.is(obj.high, 0.000163)
    t.is(obj.low, 2.7e-7)
  })

  await t.test('unserializes live data correctly', { timeout: 60000 }, async (t) => {
    const rest = new RESTv2()
    const arr = await rest.ticker({ symbol: 'fUSD' })
    const obj = FundingTicker.unserialize(arr)

    t.is(obj.symbol, arr[0])
    t.is(obj.frr, arr[1])
    t.is(obj.bid, arr[2])
    t.is(obj.bidSize, arr[3])
    t.is(obj.bidPeriod, arr[4])
    t.is(obj.ask, arr[5])
    t.is(obj.askSize, arr[6])
    t.is(obj.askPeriod, arr[7])
    t.is(obj.dailyChange, arr[8])
    t.is(obj.dailyChangePerc, arr[9])
    t.is(obj.lastPrice, arr[10])
    t.is(obj.volume, arr[11])
    t.is(obj.high, arr[12])
    t.is(obj.low, arr[13])
  })

  await t.test('quote', (t) => {
    t.test('returns quote currency', (t) => {
      const ticker = new FundingTicker({ symbol: 'tBTCUSD' })
      t.is(ticker.quote(), 'USD')
    })
  })

  await t.test('base', (t) => {
    t.test('returns base currency', (t) => {
      const ticker = new FundingTicker({ symbol: 'tBTCUSD' })
      t.is(ticker.base(), 'BTC')
    })
  })
})

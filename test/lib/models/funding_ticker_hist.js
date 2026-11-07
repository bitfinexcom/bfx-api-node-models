'use strict'

const test = require('brittle')
const { SYMBOLS } = require('@bitfinex/bfx-hf-util')
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

test('FundingTicker history model', async (t) => {
  testModel(t, {
    model: FundingTickerHist,
    orderedFields: [
      'symbol', null, 'bid', null, 'bidPeriod', 'ask', null, null, null, null,
      null, null, null, null, null, 'mtsUpdate'
    ]
  })

  testModelValidation(t, {
    model: FundingTickerHist,
    validData: {
      symbol: VALID_SYMBOLS,
      bid: [...(new Array(5))].map(() => Math.random()),
      bidPeriod: [...(new Array(5))].map(() => Math.random()),
      ask: [...(new Array(5))].map(() => Math.random()),
      mtsUpdate: [...(new Array(5))].map(() => Math.random())
    }
  })

  await t.test('initializes correctly', (t) => {
    const ticker = new FundingTickerHist(DATA)
    t.is(ticker.symbol, 'fUSD')
    t.is(ticker.bid, 0.00009526)
    t.is(ticker.bidPeriod, 30)
    t.is(ticker.ask, 0.00009042)
    t.is(ticker.mtsUpdate, 1544097835000)
  })

  await t.test('serializes correctly', (t) => {
    const ticker = new FundingTickerHist(DATA)
    const arr = ticker.serialize()
    t.is(JSON.stringify(arr), JSON.stringify(DATA))
  })

  await t.test('unserializes correctly', (t) => {
    const obj = FundingTickerHist.unserialize(DATA)
    t.is(obj.symbol, 'fUSD')
    t.is(obj.bid, 0.00009526)
    t.is(obj.bidPeriod, 30)
    t.is(obj.ask, 0.00009042)
    t.is(obj.mtsUpdate, 1544097835000)
  })

  await t.test('unserializes live data correctly', { timeout: 60000 }, async (t) => {
    const rest = new RESTv2()
    const arr = await rest.ticker({ symbol: 'fUSD' })
    const obj = FundingTickerHist.unserialize(arr)

    t.is(obj.symbol, arr[0])
    t.is(obj.bid, arr[2])
    t.is(obj.bidPeriod, arr[4])
    t.is(obj.ask, arr[5])
    t.is(obj.mtsUpdate, arr[15])
  })

  await t.test('quote', (t) => {
    t.test('returns quote currency', (t) => {
      const ticker = new FundingTickerHist({ symbol: 'tBTCUSD' })
      t.is(ticker.quote(), 'USD')
    })
  })

  await t.test('base', (t) => {
    t.test('returns base currency', (t) => {
      const ticker = new FundingTickerHist({ symbol: 'tBTCUSD' })
      t.is(ticker.base(), 'BTC')
    })
  })
})

'use strict'

const test = require('brittle')
const { RESTv2 } = require('bfx-api-node-rest')
const { Candle } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

test('Candle model', async (t) => {
  testModel(t, {
    model: Candle,
    orderedFields: ['mts', 'open', 'close', 'high', 'low', 'volume']
  })

  testModelValidation(t, {
    model: Candle,
    validData: {
      mts: [...(new Array(5))].map(() => Math.random()),
      open: [...(new Array(5))].map(() => Math.random()),
      high: [...(new Array(5))].map(() => Math.random()),
      low: [...(new Array(5))].map(() => Math.random()),
      close: [...(new Array(5))].map(() => Math.random()),
      volume: [...(new Array(5))].map(() => Math.random())
    }
  })

  await t.test('unserializes live data correctly', { timeout: 4000 }, async (t) => {
    const rest = new RESTv2()

    const arr = await rest.candles({
      timeframe: '1D',
      symbol: 'tBTCUSD',
      section: 'hist'
    })

    arr.forEach(candle => {
      const obj = Candle.unserialize(candle)

      t.is(obj.mts, candle[0])
      t.is(obj.open, candle[1])
      t.is(obj.close, candle[2])
      t.is(obj.high, candle[3])
      t.is(obj.low, candle[4])
      t.is(obj.volume, candle[5])
    })
  })
})

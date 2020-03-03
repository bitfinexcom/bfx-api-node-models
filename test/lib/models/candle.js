/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { RESTv2 } = require('bfx-api-node-rest')
const { Candle } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('Candle model', () => {
  testModel({
    model: Candle,
    orderedFields: ['mts', 'open', 'close', 'high', 'low', 'volume']
  })

  testModelValidation({
    model: Candle,
    validData: {
      mts: new Array(...(new Array(5))).map(() => Math.random()),
      open: new Array(...(new Array(5))).map(() => Math.random()),
      high: new Array(...(new Array(5))).map(() => Math.random()),
      low: new Array(...(new Array(5))).map(() => Math.random()),
      close: new Array(...(new Array(5))).map(() => Math.random()),
      volume: new Array(...(new Array(5))).map(() => Math.random())
    }
  })

  it('unserializes live data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.candles('tBTCUSD')

    arr.forEach(candle => {
      const obj = Candle.unserialize(candle)

      assert.strictEqual(obj.mts, candle[0])
      assert.strictEqual(obj.open, candle[1])
      assert.strictEqual(obj.close, candle[2])
      assert.strictEqual(obj.high, candle[3])
      assert.strictEqual(obj.low, candle[4])
      assert.strictEqual(obj.volume, candle[5])
    })
  }).timeout(4000)
})

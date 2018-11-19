/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { RESTv2 } = require('bfx-api-node-rest')
const { Candle } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Candle model', () => {
  testModel({
    model: Candle,
    orderedFields: ['mts', 'open', 'close', 'high', 'low', 'volume']
  })

  it('unserializes live data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.candles('tBTCUSD')

    arr.forEach(candle => {
      const obj = Candle.unserialize(candle)

      assert.equal(obj.mts, candle[0])
      assert.equal(obj.open, candle[1])
      assert.equal(obj.close, candle[2])
      assert.equal(obj.high, candle[3])
      assert.equal(obj.low, candle[4])
      assert.equal(obj.volume, candle[5])
    })
  })
})

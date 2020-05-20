/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _includes = require('lodash/includes')
const { TradingAvgPrice } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('Trading Average Price model', () => {
  testModel({
    model: TradingAvgPrice,
    orderedFields: [
      'priceAvg',
      'amount'
    ]
  })

  testModelValidation({
    model: TradingAvgPrice,
    validData: {
      priceAvg: new Array(...(new Array(5))).map(() => Math.random()),
      amount: new Array(...(new Array(5))).map(() => Math.random())
    }
  })

  it('initializes correctly', () => {
    const tap = new TradingAvgPrice([
      123.123,
      100
    ])

    assert.strictEqual(tap.priceAvg, 123.123)
    assert.strictEqual(tap.amount, 100)
  })

  it('serializes correctly', () => {
    const tap = new TradingAvgPrice([
      123.123,
      100
    ])

    assert.deepStrictEqual(tap.serialize(), [
      123.123,
      100
    ])
  })

  it('unserializes correctly', () => {
    const obj = TradingAvgPrice.unserialize([
      123.123,
      100
    ])

    assert.strictEqual(obj.priceAvg, 123.123)
    assert.strictEqual(obj.amount, 100)
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const tap = new TradingAvgPrice({
        priceAvg: 123.123,
        amount: 100
      })

      const str = tap.toString()
      assert.ok(_includes(str, '100 @ 123.123'), 'missing mandatory fields')
    })
  })
})

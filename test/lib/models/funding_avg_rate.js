/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _includes = require('lodash/includes')
const { FundingAvgRate } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('Funding Average Rate model', () => {
  testModel({
    model: FundingAvgRate,
    orderedFields: [
      'rateAvg',
      'amount'
    ]
  })

  testModelValidation({
    model: FundingAvgRate,
    validData: {
      rateAvg: new Array(...(new Array(5))).map(() => Math.random()),
      amount: new Array(...(new Array(5))).map(() => Math.random())
    }
  })

  it('initializes correctly', () => {
    const tap = new FundingAvgRate([
      0.0002303,
      100
    ])

    assert.strictEqual(tap.rateAvg, 0.0002303)
    assert.strictEqual(tap.amount, 100)
  })

  it('serializes correctly', () => {
    const tap = new FundingAvgRate([
      0.0002303,
      100
    ])

    assert.deepStrictEqual(tap.serialize(), [
      0.0002303,
      100
    ])
  })

  it('unserializes correctly', () => {
    const obj = FundingAvgRate.unserialize([
      0.0002303,
      100
    ])

    assert.strictEqual(obj.rateAvg, 0.0002303)
    assert.strictEqual(obj.amount, 100)
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const tap = new FundingAvgRate({
        rateAvg: 0.0002303,
        amount: 100
      })

      const str = tap.toString()
      assert.ok(_includes(str, '100 @ 0.0002303'), 'missing mandatory fields')
    })
  })
})

/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { AccountSummary } = require('../../../lib')
const testModelValidation = require('../../helpers/test_model_validation')

const DATA = [
  null,
  null,
  null,
  null,
  [
    [0.001, 0.001, 0.001, null, null, -0.0002],
    [0.002, 0.0021, 0.0022, null, null, 0.00075]
  ],
  null,
  null,
  null,
  null,
  { leo_lev: 0, leo_amount_avg: 0.002 }
]

describe('Symbol Details model', () => {
  testModelValidation({
    model: AccountSummary,
    validData: {
      makerFee: new Array(...(new Array(5))).map(() => Math.random()),
      derivMakerRebate: new Array(...(new Array(5))).map(() => Math.random()),
      takerFeeToCrypto: new Array(...(new Array(5))).map(() => Math.random()),
      takerFeeToStable: new Array(...(new Array(5))).map(() => Math.random()),
      takerFeeToFiat: new Array(...(new Array(5))).map(() => Math.random()),
      derivTakerFee: new Array(...(new Array(5))).map(() => Math.random()),
      leoLev: new Array(...(new Array(5))).map(() => Math.random()),
      leoAmountAvg: new Array(...(new Array(5))).map(() => Math.random())
    }
  })

  it('initializes correctly', () => {
    const summary = new AccountSummary(DATA)
    assert.strictEqual(summary.makerFee, 0.001)
    assert.strictEqual(summary.derivMakerRebate, -0.0002)
    assert.strictEqual(summary.takerFeeToCrypto, 0.002)
    assert.strictEqual(summary.takerFeeToStable, 0.0021)
    assert.strictEqual(summary.takerFeeToFiat, 0.0022)
    assert.strictEqual(summary.derivTakerFee, 0.00075)
    assert.strictEqual(summary.leoLev, 0)
    assert.strictEqual(summary.leoAmountAvg, 0.002)
  })

  it('serializes correctly', () => {
    const summary = new AccountSummary(DATA)
    const arr = summary.serialize()

    assert.deepStrictEqual(arr, DATA)
  })

  it('unserializes correctly', () => {
    const summary = AccountSummary.unserialize(DATA)
    assert.strictEqual(summary.makerFee, 0.001)
    assert.strictEqual(summary.derivMakerRebate, -0.0002)
    assert.strictEqual(summary.takerFeeToCrypto, 0.002)
    assert.strictEqual(summary.takerFeeToStable, 0.0021)
    assert.strictEqual(summary.takerFeeToFiat, 0.0022)
    assert.strictEqual(summary.derivTakerFee, 0.00075)
    assert.strictEqual(summary.leoLev, 0)
    assert.strictEqual(summary.leoAmountAvg, 0.002)
  })
})

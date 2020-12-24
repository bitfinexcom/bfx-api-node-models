/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { SYMBOLS } = require('bfx-hf-util')
const { TransactionFee } = require('../../../lib')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)
const DATA = ['BTC', [0, 0.0004]]

describe('Transaction Fee model', () => {
  testModelValidation({
    model: TransactionFee,
    validData: {
      symbol: VALID_SYMBOLS,
      fee: new Array(...(new Array(5))).map(() => Math.random())
    }
  })

  it('initializes correctly', () => {
    const txFee = new TransactionFee(DATA)
    assert.strictEqual(txFee.symbol, 'BTC')
    assert.strictEqual(txFee.fee, 0.0004)
  })

  it('serializes correctly', () => {
    const txFee = new TransactionFee(DATA)
    const arr = txFee.serialize()

    assert.deepStrictEqual(arr, DATA)
  })

  it('unserializes correctly', () => {
    const txFee = TransactionFee.unserialize(DATA)
    assert.strictEqual(txFee.symbol, 'BTC')
    assert.strictEqual(txFee.fee, 0.0004)
  })
})

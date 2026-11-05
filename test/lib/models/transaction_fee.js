'use strict'

const test = require('brittle')
const { SYMBOLS } = require('bfx-hf-util')
const { TransactionFee } = require('../../../lib')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)
const DATA = ['BTC', [0, 0.0004]]

test('Transaction Fee model', (t) => {
  testModelValidation(t, {
    model: TransactionFee,
    validData: {
      symbol: VALID_SYMBOLS,
      fee: [...(new Array(5))].map(() => Math.random())
    }
  })

  t.test('initializes correctly', (t) => {
    const txFee = new TransactionFee(DATA)
    t.is(txFee.symbol, 'BTC')
    t.is(txFee.fee, 0.0004)
  })

  t.test('serializes correctly', (t) => {
    const txFee = new TransactionFee(DATA)
    const arr = txFee.serialize()

    t.alike(arr, DATA)
  })

  t.test('unserializes correctly', (t) => {
    const txFee = TransactionFee.unserialize(DATA)
    t.is(txFee.symbol, 'BTC')
    t.is(txFee.fee, 0.0004)
  })
})

/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { SYMBOLS } = require('bfx-hf-util')
const { SymbolDetails } = require('../../../lib')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)
const DATA = ['BTCEUR', [null, null, null, '0.0002', '2000.0', null, null, null, 0.2, 0.1]]

describe('Symbol Details model', () => {
  testModelValidation({
    model: SymbolDetails,
    validData: {
      pair: VALID_SYMBOLS,
      initialMargin: new Array(...(new Array(5))).map(() => Math.random()),
      minimumMargin: new Array(...(new Array(5))).map(() => Math.random()),
      maximumOrderSize: new Array(...(new Array(5))).map(() => Math.random().toString()),
      minimumOrderSize: new Array(...(new Array(5))).map(() => Math.random().toString()),
      margin: [true, false]
    }
  })

  it('initializes correctly', () => {
    const details = new SymbolDetails(DATA)
    assert.strictEqual(details.pair, 'BTCEUR')
    assert.strictEqual(details.initialMargin, 0.2)
    assert.strictEqual(details.minimumMargin, 0.1)
    assert.strictEqual(details.maximumOrderSize, '2000.0')
    assert.strictEqual(details.minimumOrderSize, '0.0002')
    assert.strictEqual(details.margin, true)
  })

  it('serializes correctly', () => {
    const details = new SymbolDetails(DATA)
    const arr = details.serialize()

    assert.deepStrictEqual(arr, DATA)
  })

  it('unserializes correctly', () => {
    const details = SymbolDetails.unserialize(DATA)
    assert.strictEqual(details.pair, 'BTCEUR')
    assert.strictEqual(details.initialMargin, 0.2)
    assert.strictEqual(details.minimumMargin, 0.1)
    assert.strictEqual(details.maximumOrderSize, '2000.0')
    assert.strictEqual(details.minimumOrderSize, '0.0002')
    assert.strictEqual(details.margin, true)
  })
})

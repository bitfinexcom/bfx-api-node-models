'use strict'

const test = require('brittle')
const { SYMBOLS } = require('@bitfinex/bfx-hf-util')
const { SymbolDetails } = require('../../../lib')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)
const DATA = ['BTCEUR', [null, null, null, '0.0002', '2000.0', null, null, null, 0.2, 0.1]]

test('Symbol Details model', (t) => {
  testModelValidation(t, {
    model: SymbolDetails,
    validData: {
      pair: VALID_SYMBOLS,
      initialMargin: [...(new Array(5))].map(() => Math.random()),
      minimumMargin: [...(new Array(5))].map(() => Math.random()),
      maximumOrderSize: [...(new Array(5))].map(() => Math.random().toString()),
      minimumOrderSize: [...(new Array(5))].map(() => Math.random().toString()),
      margin: [true, false]
    }
  })

  t.test('initializes correctly', (t) => {
    const details = new SymbolDetails(DATA)
    t.is(details.pair, 'BTCEUR')
    t.is(details.initialMargin, 0.2)
    t.is(details.minimumMargin, 0.1)
    t.is(details.maximumOrderSize, '2000.0')
    t.is(details.minimumOrderSize, '0.0002')
    t.is(details.margin, true)
  })

  t.test('serializes correctly', (t) => {
    const details = new SymbolDetails(DATA)
    const arr = details.serialize()

    t.alike(arr, DATA)
  })

  t.test('unserializes correctly', (t) => {
    const details = SymbolDetails.unserialize(DATA)
    t.is(details.pair, 'BTCEUR')
    t.is(details.initialMargin, 0.2)
    t.is(details.minimumMargin, 0.1)
    t.is(details.maximumOrderSize, '2000.0')
    t.is(details.minimumOrderSize, '0.0002')
    t.is(details.margin, true)
  })
})

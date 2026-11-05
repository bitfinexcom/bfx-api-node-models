'use strict'

const test = require('brittle')
const { WALLET_TYPES, CURRENCIES } = require('bfx-hf-util')
const { Currency } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

// get data from somewhere
const VALID_STRINGS = Object.values(WALLET_TYPES)

test('Currency model', (t) => {
  testModel(t, {
    model: Currency,
    orderedFields: ['id', 'name', 'pool', 'explorer', 'symbol', 'walletFx']
  })

  testModelValidation(t, {
    model: Currency,
    validData: {
      currency: Object.values(CURRENCIES),
      id: [...(new Array(5))].map(() => Math.random()),
      name: VALID_STRINGS,
      pool: VALID_STRINGS,
      explorer: new Array(5).fill([]),
      walletFx: new Array(5).fill([])
    }
  })
})

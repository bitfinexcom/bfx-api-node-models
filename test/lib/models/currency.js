/* eslint-env mocha */
'use strict'

const { WALLET_TYPES, CURRENCIES } = require('bfx-hf-util')
const { Currency } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

// get data from somewhere
const VALID_STRINGS = Object.values(WALLET_TYPES)

describe('Currency model', () => {
  testModel({
    model: Currency,
    orderedFields: ['id', 'name', 'pool', 'explorer', 'symbol', 'walletFx']
  })

  testModelValidation({
    model: Currency,
    validData: {
      currency: Object.values(CURRENCIES),
      id: new Array(...(new Array(5))).map(() => Math.random()),
      name: VALID_STRINGS,
      pool: VALID_STRINGS,
      explorer: new Array(5).fill([]),
      walletFx: new Array(5).fill([])
    }
  })
})

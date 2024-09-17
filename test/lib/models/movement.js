/* eslint-env mocha */
'use strict'

const { CURRENCIES } = require('bfx-hf-util')
const { Movement } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_CURRENCIES = Object.values(CURRENCIES)

describe('Movement model', () => {
  testModel({
    model: Movement,
    orderedFields: [
      'id', 'currency', 'currencyName', null, null, 'mtsStarted', 'mtsUpdated',
      null, null, 'status', null, null, 'amount', 'fees', null, null,
      'destinationAddress', null, null, null, 'transactionId', 'note'
    ]
  })

  testModelValidation({
    model: Movement,
    validData: {
      currency: VALID_CURRENCIES,
      currencyName: VALID_CURRENCIES, // pull data from somewhere
      destinationAddress: VALID_CURRENCIES, // pull data from somewhere
      transactionId: VALID_CURRENCIES, // pull data from somewhere
      status: VALID_CURRENCIES, // pull data from somewhere
      id: [...(new Array(5))].map(() => Math.random()),
      mtsStarted: [...(new Array(5))].map(() => Math.random()),
      mtsUpdated: [...(new Array(5))].map(() => Math.random()),
      amount: [...(new Array(5))].map(() => Math.random()),
      fees: [...(new Array(5))].map(() => Math.random()),
      note: VALID_CURRENCIES // pull data from somewhere
    }
  })
})

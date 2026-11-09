'use strict'

const test = require('brittle')
const { SYMBOLS } = require('@bitfinex/bfx-hf-util')
const { Alert } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

test('Alert model', (t) => {
  testModel(t, {
    model: Alert,
    orderedFields: ['key', 'type', 'symbol', 'price']
  })

  testModelValidation(t, {
    model: Alert,
    validData: {
      symbol: Object.values(SYMBOLS),
      price: [...(new Array(5))].map(() => Math.random())
    }
  })
})

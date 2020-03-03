/* eslint-env mocha */
'use strict'

const { SYMBOLS } = require('bfx-hf-util')
const { Alert } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('Alert model', () => {
  testModel({
    model: Alert,
    orderedFields: ['key', 'type', 'symbol', 'price']
  })

  testModelValidation({
    model: Alert,
    validData: {
      symbol: Object.values(SYMBOLS),
      price: new Array(...(new Array(5))).map(() => Math.random())
    }
  })
})

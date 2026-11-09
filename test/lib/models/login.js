'use strict'

const test = require('brittle')
const { SYMBOLS } = require('@bitfinex/bfx-hf-util')
const { Login } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)

test('Login entry model', (t) => {
  testModel(t, {
    model: Login,
    orderedFields: [
      'id', null, 'time', null, 'ip', null, null, 'extraData'
    ]
  })

  testModelValidation(t, {
    model: Login,
    validData: {
      id: [...(new Array(5))].map(() => Math.random()),
      time: [...(new Array(5))].map(() => Math.random()),
      ip: VALID_SYMBOLS // grab data from somewhere
    }
  })
})

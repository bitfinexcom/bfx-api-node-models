/* eslint-env mocha */
'use strict'

const { SYMBOLS } = require('bfx-hf-util')
const { Login } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)

describe('Login entry model', () => {
  testModel({
    model: Login,
    orderedFields: [
      'id', null, 'time', null, 'ip', null, null, 'extraData'
    ]
  })

  testModelValidation({
    model: Login,
    validData: {
      id: new Array(...(new Array(5))).map(() => Math.random()),
      time: new Array(...(new Array(5))).map(() => Math.random()),
      ip: VALID_SYMBOLS // grab data from somewhere
    }
  })
})

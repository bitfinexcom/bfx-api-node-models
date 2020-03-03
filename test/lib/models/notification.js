/* eslint-env mocha */
'use strict'

const { SYMBOLS } = require('bfx-hf-util')
const { Notification } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_STRINGS = Object.values(SYMBOLS)

describe('Notification model', () => {
  testModel({
    model: Notification,
    orderedFields: [
      'mts', 'type', 'messageID', null, 'notifyInfo', 'code', 'status', 'text'
    ]
  })

  testModelValidation({
    model: Notification,
    validData: {
      status: VALID_STRINGS, // pull data from somewhere
      text: VALID_STRINGS, // pull data from somewhere
      type: ['success', 'error', 'info'],
      mts: new Array(...(new Array(5))).map(() => Math.random()),
      messageID: new Array(...(new Array(5))).map(() => Math.random()),
      code: new Array(...(new Array(5))).map(() => Math.random())
    }
  })
})

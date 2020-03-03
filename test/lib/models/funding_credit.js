/* eslint-env mocha */
'use strict'

const { SYMBOLS } = require('bfx-hf-util')
const { FundingCredit } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)

describe('FundingCredit model', () => {
  testModel({
    model: FundingCredit,
    boolFields: ['notify', 'hidden', 'renew', 'noClose'],
    orderedFields: [
      'id', 'symbol', 'side', 'mtsCreate', 'mtsUpdate', 'amount', 'flags',
      'status', null, null, null, 'rate', 'period', 'mtsOpening',
      'mtsLastPayout', 'notify', 'hidden', null, 'renew', 'rateReal', 'noClose',
      'positionPair'
    ]
  })

  testModelValidation({
    model: FundingCredit,
    validData: {
      symbol: VALID_SYMBOLS,
      status: VALID_SYMBOLS, // need data from somewhere
      id: new Array(...(new Array(5))).map(() => Math.random()),
      mtsCreate: new Array(...(new Array(5))).map(() => Math.random()),
      mtsUpdate: new Array(...(new Array(5))).map(() => Math.random()),
      mtsOpening: new Array(...(new Array(5))).map(() => Math.random()),
      mtsLastPayout: new Array(...(new Array(5))).map(() => Math.random()),
      amount: new Array(...(new Array(5))).map(() => Math.random()),
      flags: new Array(...(new Array(5))).map(() => Math.random()),
      rate: new Array(...(new Array(5))).map(() => Math.random()),
      period: new Array(...(new Array(5))).map(() => Math.random()),
      rateReal: new Array(...(new Array(5))).map(() => Math.random()),
      notify: new Array(...(new Array(5))).map(() => Math.random() > 0.5),
      hidden: new Array(...(new Array(5))).map(() => Math.random() > 0.5),
      renew: new Array(...(new Array(5))).map(() => Math.random() > 0.5),
      noClose: new Array(...(new Array(5))).map(() => Math.random() > 0.5)
    }
  })
})

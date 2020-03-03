/* eslint-env mocha */
'use strict'

const { CURRENCIES, WALLET_TYPES } = require('bfx-hf-util')
const { WalletHist } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('Historical wallet model', () => {
  testModel({
    model: WalletHist,
    orderedFields: [
      'type', 'currency', 'balance', 'unsettledInterest', 'balanceAvailable', null, 'mtsUpdate'
    ]
  })

  testModelValidation({
    model: WalletHist,
    validData: {
      type: Object.values(WALLET_TYPES),
      currency: Object.values(CURRENCIES),
      balance: new Array(...(new Array(5))).map(() => Math.random()),
      balanceAvailable: new Array(...(new Array(5))).map(() => Math.random()),
      unsettledInterest: new Array(...(new Array(5))).map(() => Math.random()),
      mtsUpdate: new Array(...(new Array(5))).map(() => Math.random())
    }
  })
})

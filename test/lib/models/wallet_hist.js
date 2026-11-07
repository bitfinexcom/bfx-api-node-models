'use strict'

const test = require('brittle')
const { CURRENCIES, WALLET_TYPES } = require('@bitfinex/bfx-hf-util')
const { WalletHist } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

test('Historical wallet model', (t) => {
  testModel(t, {
    model: WalletHist,
    orderedFields: [
      'type', 'currency', 'balance', 'unsettledInterest', 'balanceAvailable', null, 'mtsUpdate'
    ]
  })

  testModelValidation(t, {
    model: WalletHist,
    validData: {
      type: Object.values(WALLET_TYPES),
      currency: Object.values(CURRENCIES),
      balance: [...(new Array(5))].map(() => Math.random()),
      balanceAvailable: [...(new Array(5))].map(() => Math.random()),
      unsettledInterest: [...(new Array(5))].map(() => Math.random()),
      mtsUpdate: [...(new Array(5))].map(() => Math.random())
    }
  })
})

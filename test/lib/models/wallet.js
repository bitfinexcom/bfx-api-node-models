'use strict'

const test = require('brittle')
const { CURRENCIES, WALLET_TYPES } = require('@bitfinex/bfx-hf-util')
const { Wallet } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

test('Wallet', (t) => {
  testModel(t, {
    model: Wallet,
    orderedFields: [
      'type', 'currency', 'balance', 'unsettledInterest', 'balanceAvailable'
    ]
  })

  testModelValidation(t, {
    model: Wallet,
    validData: {
      type: Object.values(WALLET_TYPES),
      currency: Object.values(CURRENCIES),
      description: [null, ...Object.values(CURRENCIES)],
      meta: [null, ...Object.values(CURRENCIES).map(reason => ({ reason: 'TRADE' }))], // need a data source
      balance: [...(new Array(5))].map(() => Math.random()),
      balanceAvailable: [...(new Array(5))].map(() => Math.random()),
      unsettledInterest: [...(new Array(5))].map(() => Math.random())
    }
  })
})

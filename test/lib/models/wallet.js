/* eslint-env mocha */
'use strict'

const { CURRENCIES, WALLET_TYPES } = require('bfx-hf-util')
const { Wallet } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('Wallet', () => {
  testModel({
    model: Wallet,
    orderedFields: [
      'type', 'currency', 'balance', 'unsettledInterest', 'balanceAvailable'
    ]
  })

  testModelValidation({
    model: Wallet,
    validData: {
      type: Object.values(WALLET_TYPES),
      currency: Object.values(CURRENCIES),
      description: [null, ...Object.values(CURRENCIES)],
      meta: [null, ...Object.values(CURRENCIES).map(reason => ({ reason: 'TRADE' }))], // need a data source
      balance: new Array(...(new Array(5))).map(() => Math.random()),
      balanceAvailable: new Array(...(new Array(5))).map(() => Math.random()),
      unsettledInterest: new Array(...(new Array(5))).map(() => Math.random())
    }
  })
})

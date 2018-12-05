/* eslint-env mocha */
'use strict'

const { WalletHist } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Historical wallet model', () => {
  testModel({
    model: WalletHist,
    orderedFields: [
      'type', 'currency', 'balance', 'unsettledInterest', 'balanceAvailable', 'placeHolder', 'mtsUpdate'
    ]
  })
})

/* eslint-env mocha */
'use strict'

const { FundingLoan } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('FundingLoan model', () => {
  testModel({
    model: FundingLoan,
    boolFields: ['notify', 'hidden', 'renew', 'noClose'],
    orderedFields: [
      'id', 'symbol', 'side', 'mtsCreate', 'mtsUpdate', 'amount', 'flags',
      'status', null, null, null, 'rate', 'period', 'mtsOpening',
      'mtsLastPayout', 'notify', 'hidden', null, 'renew', 'rateReal', 'noClose'
    ]
  })
})

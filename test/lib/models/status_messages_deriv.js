/* eslint-env mocha */
'use strict'

const { StatusMessagesDeriv } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Derivatives Status Message model', () => {
  testModel({
    model: StatusMessagesDeriv,
    orderedFields: [
      'key', 'timestamp', null, 'price', 'priceSpot', null, 'fundBal', null,
      null, 'fundingAccrued', 'fundingStep'
    ]
  })
})

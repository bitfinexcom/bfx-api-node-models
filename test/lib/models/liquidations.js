/* eslint-env mocha */
'use strict'

const { Liquidations } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Liquidations entry model', () => {
  testModel({
    model: Liquidations,
    orderedFields: [
      null, 'posId', 'mtsUpdated', null, 'symbol', 'amount', 'basePrice', null, 'isMatch', 'isMarketSold'
    ]
  })
})

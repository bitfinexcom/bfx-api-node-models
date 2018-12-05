/* eslint-env mocha */
'use strict'

const { PositionHist } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Position History model', () => {
  testModel({
    model: PositionHist,
    orderedFields: [
      'symbol', 'status', 'amount', 'basePrice', 'marginFunding',
      'marginFundingType', 'pl', 'plPerc', 'liquidationPrice', 'leverage',
      'placeholder', 'id', 'mtsCreate', 'mtsUpdate'
    ]
  })
})

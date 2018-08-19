/* eslint-env mocha */
'use strict'

const { MarginInfo } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('MarginInfo model', () => {
  testModel({
    model: MarginInfo,
    orderedFields: [
      'userPL', 'userSwaps', 'symbol', 'tradeableBalance', 'marginBalance',
      'marginNet'
    ]
  })
})

/* eslint-env mocha */
'use strict'

const { BalanceInfo } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('BalanceInfo model', () => {
  testModel({
    model: BalanceInfo,
    orderedFields: ['amount', 'amountNet']
  })
})

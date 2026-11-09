'use strict'

const test = require('brittle')
const { BalanceInfo } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

test('BalanceInfo model', (t) => {
  testModel(t, {
    model: BalanceInfo,
    orderedFields: ['amount', 'amountNet']
  })

  testModelValidation(t, {
    model: BalanceInfo,
    validData: {
      amount: [...(new Array(5))].map(() => Math.random()),
      amountNet: [...(new Array(5))].map(() => Math.random())
    }
  })
})

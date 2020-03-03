/* eslint-env mocha */
'use strict'

const { BalanceInfo } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('BalanceInfo model', () => {
  testModel({
    model: BalanceInfo,
    orderedFields: ['amount', 'amountNet']
  })

  testModelValidation({
    model: BalanceInfo,
    validData: {
      amount: new Array(...(new Array(5))).map(() => Math.random()),
      amountNet: new Array(...(new Array(5))).map(() => Math.random())
    }
  })
})

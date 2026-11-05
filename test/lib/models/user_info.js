'use strict'

const test = require('brittle')
const { UserInfo } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

test('User info model', (t) => {
  testModel(t, {
    model: UserInfo,
    orderedFields: [
      'id', 'email', 'username', null, null, null, null, 'timezone',
      null, null, null, null, null, null, null, null, null, null, null,
      null, null, 'isPaperTradeEnabled', 'isUserMerchant'
    ]
  })

  testModelValidation(t, {
    model: UserInfo,
    validData: {
      id: [...(new Array(5))].map(() => Math.random()),
      email: ['test@test.com', 'what@testing.com', 'really@nope.com'],
      username: ['not', 'today', 'man', 'but', 'maybe', 'tomorrow'],
      timezone: ['all', 'over', 'the', 'world', 'vim', 'and', 'all'],
      isPaperTradeEnabled: [true, false],
      isUserMerchant: [true, false]
    }
  })
})

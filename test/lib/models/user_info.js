/* eslint-env mocha */
'use strict'

const { UserInfo } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('User info model', () => {
  testModel({
    model: UserInfo,
    orderedFields: [
      'id', 'email', 'username', null, null, null, null, 'timezone'
    ]
  })

  testModelValidation({
    model: UserInfo,
    validData: {
      id: new Array(...(new Array(5))).map(() => Math.random()),
      email: ['test@test.com', 'what@testing.com', 'really@nope.com'],
      username: ['not', 'today', 'man', 'but', 'maybe', 'tomorrow'],
      timezone: ['all', 'over', 'the', 'world', 'vim', 'and', 'all']
    }
  })
})

/* eslint-env mocha */
'use strict'

const { UserInfo } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('User info model', () => {
  testModel({
    model: UserInfo,
    orderedFields: [
      'id', 'email', 'username', null, null, null, null, 'timezone'
    ]
  })
})

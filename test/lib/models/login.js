/* eslint-env mocha */
'use strict'

const { Login } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Login entry model', () => {
  testModel({
    model: Login,
    orderedFields: [
      'id', null, 'time', null, 'ip', null, null, 'extraData'
    ]
  })
})

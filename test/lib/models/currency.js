/* eslint-env mocha */
'use strict'

const { Currency } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Currency model', () => {
  testModel({
    model: Currency,
    orderedFields: ['id', 'name', 'pool', 'explorer', 'symbol']
  })
})

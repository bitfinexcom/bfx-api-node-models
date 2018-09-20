/* eslint-env mocha */
'use strict'

const { Notification } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Notification model', () => {
  testModel({
    model: Notification,
    orderedFields: [
      'mts', 'type', 'messageID', null, 'notifyInfo', 'code', 'status', 'text'
    ]
  })
})

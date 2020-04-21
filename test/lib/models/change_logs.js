/* eslint-env mocha */
'use strict'

const assert = require('assert')

const { ChangeLog } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('ChangeLog model', () => {
  testModel({
    model: ChangeLog,
    orderedFields: [
      'mtsCreate', null, 'log', null, null, 'ip', 'userAgent'
    ]
  })

  testModelValidation({
    model: ChangeLog,
    validData: {
      mtsCreate: new Array(...(new Array(5))).map(() => Math.random()),
      log: ['not', 'today', 'man', 'but', 'maybe', 'tomorrow'],
      ip: ['not', 'today', 'man', 'but', 'maybe', 'tomorrow'],
      userAgent: ['not', 'today', 'man', 'but', 'maybe', 'tomorrow']
    }
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const t = new ChangeLog({
        mtsCreate: 123456789,
        log: 'someLog',
        ip: '1.2.3.4',
        userAgent: 'firefox'
      })

      assert.strictEqual(t.mtsCreate, 123456789, 'mts create missing')
      assert.strictEqual(t.log, 'someLog', 'log missing')
      assert.strictEqual(t.ip, '1.2.3.4', 'ip missing')
      assert.strictEqual(t.userAgent, 'firefox', 'user agent missing')
    })
  })
})

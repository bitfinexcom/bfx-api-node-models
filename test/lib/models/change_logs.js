'use strict'

const test = require('brittle')

const { ChangeLog } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

test('ChangeLog model', (t) => {
  testModel(t, {
    model: ChangeLog,
    orderedFields: [
      'mtsCreate', null, 'log', null, null, 'ip', 'userAgent'
    ]
  })

  testModelValidation(t, {
    model: ChangeLog,
    validData: {
      mtsCreate: [...(new Array(5))].map(() => Math.random()),
      log: ['not', 'today', 'man', 'but', 'maybe', 'tomorrow'],
      ip: ['not', 'today', 'man', 'but', 'maybe', 'tomorrow'],
      userAgent: ['not', 'today', 'man', 'but', 'maybe', 'tomorrow']
    }
  })

  t.test('toString', (t) => {
    t.test('includes pertinent information', (t) => {
      const log = new ChangeLog({
        mtsCreate: 123456789,
        log: 'someLog',
        ip: '1.2.3.4',
        userAgent: 'firefox'
      })

      t.is(log.mtsCreate, 123456789, 'mts create missing')
      t.is(log.log, 'someLog', 'log missing')
      t.is(log.ip, '1.2.3.4', 'ip missing')
      t.is(log.userAgent, 'firefox', 'user agent missing')
    })
  })
})

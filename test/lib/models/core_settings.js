'use strict'

const test = require('brittle')
const { CoreSettings } = require('../../../lib')

const DATA = [
  'te_limit_order_*',
  [
    ['te_limit_order_cnt', '3000'],
    ['te_limit_order_symbol_cnt', '300']
  ]
]

test('Core Settings model', (t) => {
  t.test('initializes correctly', (t) => {
    const coreSettings = new CoreSettings(DATA)
    t.is(coreSettings.key, 'te_limit_order_*')
    t.is(coreSettings.value, DATA[1])
  })

  t.test('serializes correctly', (t) => {
    const details = new CoreSettings(DATA)
    const arr = details.serialize()

    t.alike(arr, DATA)
  })

  t.test('unserializes correctly', (t) => {
    const coreSettings = CoreSettings.unserialize(DATA)
    t.is(coreSettings.key, 'te_limit_order_*')
    t.is(coreSettings.value, DATA[1])
  })
})

/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { CoreSettings } = require('../../../lib')

const DATA = [
  'te_limit_order_*',
  [
    ['te_limit_order_cnt', '3000'],
    ['te_limit_order_symbol_cnt', '300']
  ]
]

describe('Core Settings model', () => {
  it('initializes correctly', () => {
    const coreSettings = new CoreSettings(DATA)
    assert.strictEqual(coreSettings.key, 'te_limit_order_*')
    assert.strictEqual(coreSettings.value, DATA[1])
  })

  it('serializes correctly', () => {
    const details = new CoreSettings(DATA)
    const arr = details.serialize()

    assert.deepStrictEqual(arr, DATA)
  })

  it('unserializes correctly', () => {
    const coreSettings = CoreSettings.unserialize(DATA)
    assert.strictEqual(coreSettings.key, 'te_limit_order_*')
    assert.strictEqual(coreSettings.value, DATA[1])
  })
})

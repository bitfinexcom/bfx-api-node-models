/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { AuthPermission } = require('../../../lib')
const testModelValidation = require('../../helpers/test_model_validation')

const DATA = ['orders', 1, 0]

describe('Auth Permission model', () => {
  testModelValidation({
    model: AuthPermission,
    validData: {
      key: ['account', 'orders', 'funding', 'settings', 'wallets', 'withdraw'],
      read: [true, false],
      write: [true, false]
    }
  })

  it('initializes correctly', () => {
    const perm = new AuthPermission(DATA)
    assert.strictEqual(perm.key, 'orders')
    assert.strictEqual(perm.read, true)
    assert.strictEqual(perm.write, false)
  })

  it('serializes correctly', () => {
    const details = new AuthPermission(DATA)
    const arr = details.serialize()

    assert.deepStrictEqual(arr, DATA)
  })

  it('unserializes correctly', () => {
    const perm = AuthPermission.unserialize(DATA)
    assert.strictEqual(perm.key, 'orders')
    assert.strictEqual(perm.read, true)
    assert.strictEqual(perm.write, false)
  })
})

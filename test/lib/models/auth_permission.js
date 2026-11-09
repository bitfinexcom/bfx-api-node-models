'use strict'

const test = require('brittle')
const { AuthPermission } = require('../../../lib')
const testModelValidation = require('../../helpers/test_model_validation')

const DATA = ['orders', 1, 0]

test('Auth Permission model', (t) => {
  testModelValidation(t, {
    model: AuthPermission,
    validData: {
      key: ['account', 'orders', 'funding', 'settings', 'wallets', 'withdraw'],
      read: [true, false],
      write: [true, false]
    }
  })

  t.test('initializes correctly', (t) => {
    const perm = new AuthPermission(DATA)
    t.is(perm.key, 'orders')
    t.is(perm.read, true)
    t.is(perm.write, false)
  })

  t.test('serializes correctly', (t) => {
    const details = new AuthPermission(DATA)
    const arr = details.serialize()

    t.alike(arr, DATA)
  })

  t.test('unserializes correctly', (t) => {
    const perm = AuthPermission.unserialize(DATA)
    t.is(perm.key, 'orders')
    t.is(perm.read, true)
    t.is(perm.write, false)
  })
})

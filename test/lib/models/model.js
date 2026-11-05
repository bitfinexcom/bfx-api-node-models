'use strict'

const test = require('brittle')
const _isError = require('lodash/isError')
const _isFinite = require('lodash/isFinite')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const Model = require('../../../lib/model')

test('base model class', (t) => {
  t.test('toJS', (t) => {
    t.test('returns a pojo version of the model', (t) => {
      const fields = { a: 0 }

      class SomeModel extends Model {
        constructor (data) {
          super({ data, fields })
        }

        static unserialize (data) {
          return super.unserialize({ data, fields })
        }
      }

      const m = new SomeModel({ a: 42 })
      const js = m.toJS()

      t.alike(js, { a: 42 })
    })
  })

  t.test('validate', (t) => {
    const fields = { num: 0, str: 1 }
    const validators = {
      num: v => _isFinite(v) ? null : 'must be a number',
      str: v => (_isString(v) && !_isEmpty(v)) ? null : 'must be a non-empty string'
    }

    const validateArgs = { fields, validators }
    const validInstance = { num: 42, str: 'some_data' }
    const invalidInstance = { num: null, str: null }

    t.test('returns null if an item passes the provided validators', (t) => {
      t.ok(Model.validate({
        data: validInstance,
        ...validateArgs
      }) === null)
    })

    t.test('returns error if an item fails the provided validators', (t) => {
      t.ok(_isError(Model.validate({
        data: invalidInstance,
        ...validateArgs
      })))
    })

    t.test('returns error if a single item in a collection fails the validators', (t) => {
      t.ok(_isError(Model.validate({
        data: [validInstance, validInstance, invalidInstance, validInstance],
        ...validateArgs
      })))
    })

    t.test('returns null if all items in a collection pass the validators', (t) => {
      t.ok(Model.validate({
        data: [validInstance, validInstance, validInstance, validInstance],
        ...validateArgs
      }) === null)
    })
  })
})

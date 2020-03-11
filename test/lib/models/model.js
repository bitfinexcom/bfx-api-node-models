'use strict'
/* eslint-env mocha */

const assert = require('assert')
const _isError = require('lodash/isError')
const _isFinite = require('lodash/isFinite')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const Model = require('../../../lib/model')

describe('base model class', () => {
  describe('toJS', () => {
    it('returns a pojo version of the model', function () {
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

      assert.deepStrictEqual(js, { a: 42 })
    })
  })

  describe('validate', () => {
    const fields = { num: 0, str: 1 }
    const validators = {
      num: v => _isFinite(v) ? null : 'must be a number',
      str: v => (_isString(v) && !_isEmpty(v)) ? null : 'must be a non-empty string'
    }

    const validateArgs = { fields, validators }
    const validInstance = { num: 42, str: 'some_data' }
    const invalidInstance = { num: null, str: null }

    it('returns null if an item passes the provided validators', () => {
      assert(Model.validate({
        data: validInstance,
        ...validateArgs
      }) === null)
    })

    it('returns error if an item fails the provided validators', () => {
      assert(_isError(Model.validate({
        data: invalidInstance,
        ...validateArgs
      })))
    })

    it('returns error if a single item in a collection fails the validators', () => {
      assert(_isError(Model.validate({
        data: [validInstance, validInstance, invalidInstance, validInstance],
        ...validateArgs
      })))
    })

    it('returns null if all items in a collection pass the validators', () => {
      assert(Model.validate({
        data: [validInstance, validInstance, validInstance, validInstance],
        ...validateArgs
      }) === null)
    })
  })
})

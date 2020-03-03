/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isArray = require('lodash/isArray')
const _isFunction = require('lodash/isFunction')
const _flattenDeep = require('lodash/flattenDeep')

/**
 * Runs basic checks on a model's validate method
 *
 * @param {Object} args
 * @param {Object} args.model - class
 * @param {Object[]|Object} args.valid - single or multiple valid instances
 * @param {Object[]|Object} args.invalid - single or multiple invalid instances
 */
module.exports = ({ model, valid, invalid }) => {
  it('validate: is provided', () => {
    _isFunction(model.validate)
  })

  if (invalid) {
    it('validate: false for invalid instance(s)', () => {
      if (_isArray(invalid)) {
        assert(model.validate(invalid) instanceof Error) // test all

        invalid.forEach(i => { // test single & array of one
          assert(model.validate(i) instanceof Error)
          assert(model.validate([i]) instanceof Error)
        })
      } else { // test single & array of one
        assert(model.validate(invalid) instanceof Error)
        assert(model.validate([invalid]) instanceof Error)
      }
    })
  }

  if (valid) {
    it('validate: true for valid instance(s)', () => {
      if (_isArray(valid)) {
        assert.strictEqual(model.validate(valid), null) // test all

        valid.forEach(i => { // test single & array of one
          assert.strictEqual(model.validate(i), null)
          assert.strictEqual(model.validate([i]), null)
        })
      } else { // test single & array of one
        assert.strictEqual(model.validate(valid), null)
        assert.strictEqual(model.validate([valid]), null)
      }
    })
  }

  if (valid && invalid) {
    it('validate: false if one instance out of a set is invalid', () => {
      assert(model.validate(_flattenDeep([valid, invalid])) instanceof Error)
    })
  }
}

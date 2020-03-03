/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _min = require('lodash/min')
const _sample = require('lodash/sample')
const _isArray = require('lodash/isArray')
const _isFunction = require('lodash/isFunction')
const _flattenDeep = require('lodash/flattenDeep')

/**
 * Runs basic checks on a model's validate method
 *
 * @param {Object} args
 * @param {Object} args.model - class
 * @param {Object} args.validData - map of arrays for each key containing valid values
 */
module.exports = ({ model, validData }) => {
  it('validate: is provided', () => {
    _isFunction(model.validate)
  })

  // Generate valid/invalid param sets for fuzzing
  const valid = []
  const invalid = []
  const minDatasetLength = _min(Object.values(validData).map(arr => arr.length))

  for (let i = 0; i < minDatasetLength; i += 1) {
    const validParamSet = {}
    const invalidParamSet = {}

    Object.keys(validData).forEach((key) => {
      const v = _sample(validData[key])

      validParamSet[key] = v
      invalidParamSet[key] = `__not_valid_${v}`
    })

    valid.push(validParamSet)
    invalid.push(invalidParamSet)
  }

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

  it('validate: false if one instance out of a set is invalid', () => {
    assert(model.validate(_flattenDeep([valid, invalid])) instanceof Error)
  })
}

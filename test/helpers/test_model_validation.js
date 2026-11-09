'use strict'

const _min = require('lodash/min')
const _sample = require('lodash/sample')
const _isArray = require('lodash/isArray')
const _isError = require('lodash/isError')
const _isFunction = require('lodash/isFunction')
const _flattenDeep = require('lodash/flattenDeep')

/**
 * Runs basic checks on a model's validate method
 *
 * @param {any} t - brittle test to add the subtests
 * @param {object} args - arguments
 * @param {object} args.model - class
 * @param {object} args.validData - map of arrays for each key containing valid values
 */
module.exports = (t, { model, validData }) => {
  t.test('validate: is provided', (t) => {
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

  t.test('validate: false for invalid instance(s)', (t) => {
    if (_isArray(invalid)) {
      t.ok(_isError(model.validate(invalid))) // test all

      invalid.forEach(i => { // test single & array of one
        t.ok(_isError(model.validate(i)))
        t.ok(_isError(model.validate([i])))
      })
    } else { // test single & array of one
      t.ok(_isError(model.validate(invalid)))
      t.ok(_isError(model.validate([invalid])))
    }
  })

  t.test('validate: true for valid instance(s)', (t) => {
    if (_isArray(valid)) {
      t.is(model.validate(valid), null) // test all

      valid.forEach(i => { // test single & array of one
        t.is(model.validate(i), null)
        t.is(model.validate([i]), null)
      })
    } else { // test single & array of one
      t.is(model.validate(valid), null)
      t.is(model.validate([valid]), null)
    }
  })

  t.test('validate: false if one instance out of a set is invalid', (t) => {
    t.ok(_isError(model.validate(_flattenDeep([valid, invalid]))))
  })
}

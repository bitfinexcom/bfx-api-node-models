/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isEmpty = require('lodash/isEmpty')
const validator = require('../../../lib/validators/number')

describe('number validator', () => {
  it('returns no error if given a number', () => {
    assert.strictEqual(validator(42), null, 'failed validation for a number')
  })

  it('returns an error for any other value', () => {
    assert.ok(!_isEmpty(validator('42')), 'passed validation for number')
    assert.ok(!_isEmpty(validator({})), 'passed validation for object')
    assert.ok(!_isEmpty(validator([])), 'passed validation for array')
    assert.ok(!_isEmpty(validator(true)), 'passed validation for bool')
    assert.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

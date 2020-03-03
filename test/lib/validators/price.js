/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isEmpty = require('lodash/isEmpty')
const validator = require('../../../lib/validators/price')

describe('price validator', () => {
  it('returns no error if given a number gte zero', () => {
    assert.strictEqual(validator(0), null, 'failed validation for a number gte zero')
    assert.strictEqual(validator(1), null, 'failed validation for a number gte zero')
  })

  it('returns an error for any other value', () => {
    assert.ok(!_isEmpty(validator(-1)), 'passed validation for negative number')
    assert.ok(!_isEmpty(validator('42')), 'passed validation for number')
    assert.ok(!_isEmpty(validator({})), 'passed validation for object')
    assert.ok(!_isEmpty(validator([])), 'passed validation for array')
    assert.ok(!_isEmpty(validator(true)), 'passed validation for bool')
    assert.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

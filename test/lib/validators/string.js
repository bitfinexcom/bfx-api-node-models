/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isEmpty = require('lodash/isEmpty')
const validator = require('../../../lib/validators/string')

describe('string validator', () => {
  it('returns no error if given a string', () => {
    assert.strictEqual(validator(''), null, 'failed validation for a string')
  })

  it('returns an error if given a filter list and a value not in the list', () => {
    assert.ok(!_isEmpty(validator('not-test', ['test'])), 'passed validation for an unknown string')
  })

  it('returns no error if given a filter list and a value in the list', () => {
    assert.strictEqual(validator('test', ['test']), null, 'failed validation for a known string')
  })

  it('returns an error for any other value', () => {
    assert.ok(!_isEmpty(validator(42)), 'passed validation for number')
    assert.ok(!_isEmpty(validator({})), 'passed validation for object')
    assert.ok(!_isEmpty(validator([])), 'passed validation for array')
    assert.ok(!_isEmpty(validator(true)), 'passed validation for bool')
    assert.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

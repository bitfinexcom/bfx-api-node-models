/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isEmpty = require('lodash/isEmpty')
const validator = require('../../../lib/validators/bool')

describe('bool validator', () => {
  it('returns no error if given a bool', () => {
    assert.strictEqual(validator(true), null, 'failed validation for true')
    assert.strictEqual(validator(false), null, 'failed validation for false')
  })

  it('returns an error for any other value', () => {
    assert.ok(!_isEmpty(validator(3)), 'passed validation for number')
    assert.ok(!_isEmpty(validator('42')), 'passed validation for number')
    assert.ok(!_isEmpty(validator({})), 'passed validation for object')
    assert.ok(!_isEmpty(validator([])), 'passed validation for array')
    assert.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

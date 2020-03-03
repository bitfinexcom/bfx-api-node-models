/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isEmpty = require('lodash/isEmpty')
const { CURRENCIES } = require('bfx-hf-util')
const validator = require('../../../lib/validators/currency')

const VALID_CURRENCIES = Object.values(CURRENCIES)

describe('currency validator', () => {
  it('returns no error for known currencies', () => {
    VALID_CURRENCIES.forEach((ccy) => {
      assert.strictEqual(validator(ccy), null, 'failed validation for known currency')
    })
  })

  it('returns an error for any other value', () => {
    VALID_CURRENCIES.forEach((ccy) => {
      assert.ok(!_isEmpty(validator(`__${ccy}`)), 'passed validation for unknown currency')
    })

    assert.ok(!_isEmpty(validator(42)), 'passed validation for number')
    assert.ok(!_isEmpty(validator({})), 'passed validation for object')
    assert.ok(!_isEmpty(validator([])), 'passed validation for array')
    assert.ok(!_isEmpty(validator(true)), 'passed validation for bool')
    assert.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

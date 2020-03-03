/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isEmpty = require('lodash/isEmpty')
const { SYMBOLS } = require('bfx-hf-util')
const validator = require('../../../lib/validators/symbol')

const VALID_SYMBOLS = Object.values(SYMBOLS)

describe('symbol validator', () => {
  it('returns no error for known symbols', () => {
    VALID_SYMBOLS.forEach((sym) => {
      assert.strictEqual(validator(sym), null, 'failed validation for known symbol')
    })
  })

  it('returns an error for any other value', () => {
    VALID_SYMBOLS.forEach((sym) => {
      assert.ok(!_isEmpty(validator(`__${sym}`)), 'passed validation for unknown symbol')
    })

    assert.ok(!_isEmpty(validator(42)), 'passed validation for number')
    assert.ok(!_isEmpty(validator({})), 'passed validation for object')
    assert.ok(!_isEmpty(validator([])), 'passed validation for array')
    assert.ok(!_isEmpty(validator(true)), 'passed validation for bool')
    assert.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

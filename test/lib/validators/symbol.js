'use strict'

const test = require('brittle')
const _isEmpty = require('lodash/isEmpty')
const { SYMBOLS } = require('@bitfinex/bfx-hf-util')
const validator = require('../../../lib/validators/symbol')

const VALID_SYMBOLS = Object.values(SYMBOLS)

test('symbol validator', (t) => {
  t.test('returns no error for known symbols', (t) => {
    VALID_SYMBOLS.forEach((sym) => {
      t.is(validator(sym), null, 'failed validation for known symbol')
    })
  })

  t.test('returns an error for any other value', (t) => {
    VALID_SYMBOLS.forEach((sym) => {
      t.ok(!_isEmpty(validator(`__${sym}`)), 'passed validation for unknown symbol')
    })

    t.ok(!_isEmpty(validator(42)), 'passed validation for number')
    t.ok(!_isEmpty(validator({})), 'passed validation for object')
    t.ok(!_isEmpty(validator([])), 'passed validation for array')
    t.ok(!_isEmpty(validator(true)), 'passed validation for bool')
    t.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

'use strict'

const test = require('brittle')
const _isEmpty = require('lodash/isEmpty')
const { CURRENCIES } = require('bfx-hf-util')
const validator = require('../../../lib/validators/currency')

const VALID_CURRENCIES = Object.values(CURRENCIES)

test('currency validator', (t) => {
  t.test('returns no error for known currencies', (t) => {
    VALID_CURRENCIES.forEach((ccy) => {
      t.is(validator(ccy), null, 'failed validation for known currency')
    })
  })

  t.test('returns an error for any other value', (t) => {
    VALID_CURRENCIES.forEach((ccy) => {
      t.ok(!_isEmpty(validator(`__${ccy}`)), 'passed validation for unknown currency')
    })

    t.ok(!_isEmpty(validator(42)), 'passed validation for number')
    t.ok(!_isEmpty(validator({})), 'passed validation for object')
    t.ok(!_isEmpty(validator([])), 'passed validation for array')
    t.ok(!_isEmpty(validator(true)), 'passed validation for bool')
    t.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

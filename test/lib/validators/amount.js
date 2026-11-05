'use strict'

const test = require('brittle')
const _isEmpty = require('lodash/isEmpty')
const validator = require('../../../lib/validators/amount')

test('amount validator', (t) => {
  t.test('returns no error if given a number', (t) => {
    t.is(validator(42), null, 'failed validation for a number')
  })

  t.test('returns an error for any other value', (t) => {
    t.ok(!_isEmpty(validator('42')), 'passed validation for number')
    t.ok(!_isEmpty(validator({})), 'passed validation for object')
    t.ok(!_isEmpty(validator([])), 'passed validation for array')
    t.ok(!_isEmpty(validator(true)), 'passed validation for bool')
    t.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

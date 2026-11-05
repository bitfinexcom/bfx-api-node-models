'use strict'

const test = require('brittle')
const _isEmpty = require('lodash/isEmpty')
const validator = require('../../../lib/validators/date')

test('date validator', (t) => {
  t.test('returns no error if given a number gte zero', (t) => {
    t.is(validator(0), null, 'failed validation for a number gte zero')
    t.is(validator(1), null, 'failed validation for a number gte zero')
  })

  t.test('returns no error if given a date', (t) => {
    t.is(validator(new Date()), null, 'failed validation for a number gte zero')
  })

  t.test('returns an error for any other value', (t) => {
    t.ok(!_isEmpty(validator(-1)), 'passed validation for negative number')
    t.ok(!_isEmpty(validator('test')), 'passed validation for object')
    t.ok(!_isEmpty(validator({ test: 42 })), 'passed validation for object')
    t.ok(!_isEmpty(validator(['test'])), 'passed validation for array')
    t.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

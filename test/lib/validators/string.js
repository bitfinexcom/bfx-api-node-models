'use strict'

const test = require('brittle')
const _isEmpty = require('lodash/isEmpty')
const validator = require('../../../lib/validators/string')

test('string validator', (t) => {
  t.test('returns no error if given a string', (t) => {
    t.is(validator(''), null, 'failed validation for a string')
  })

  t.test('returns an error if given a filter list and a value not in the list', (t) => {
    t.ok(!_isEmpty(validator('not-test', ['test'])), 'passed validation for an unknown string')
  })

  t.test('returns no error if given a filter list and a value in the list', (t) => {
    t.is(validator('test', ['test']), null, 'failed validation for a known string')
  })

  t.test('returns an error for any other value', (t) => {
    t.ok(!_isEmpty(validator(42)), 'passed validation for number')
    t.ok(!_isEmpty(validator({})), 'passed validation for object')
    t.ok(!_isEmpty(validator([])), 'passed validation for array')
    t.ok(!_isEmpty(validator(true)), 'passed validation for bool')
    t.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

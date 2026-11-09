'use strict'

const test = require('brittle')
const _isEmpty = require('lodash/isEmpty')
const validator = require('../../../lib/validators/bool')

test('bool validator', (t) => {
  t.test('returns no error if given a bool', (t) => {
    t.is(validator(true), null, 'failed validation for true')
    t.is(validator(false), null, 'failed validation for false')
  })

  t.test('returns an error for any other value', (t) => {
    t.ok(!_isEmpty(validator(3)), 'passed validation for number')
    t.ok(!_isEmpty(validator('42')), 'passed validation for number')
    t.ok(!_isEmpty(validator({})), 'passed validation for object')
    t.ok(!_isEmpty(validator([])), 'passed validation for array')
    t.ok(!_isEmpty(validator(() => {})), 'passed validation for func')
  })
})

'use strict'

const test = require('brittle')
const isCollection = require('../../../lib/util/is_collection')

test('isCollection', (t) => {
  t.test('false for a single array', (t) => t.ok(!isCollection([])))
  t.test('false for a single object', (t) => t.ok(!isCollection({})))
  t.test('true for an array of arrays', (t) => t.ok(isCollection([[], []])))
  t.test('true for an array of objects', (t) => t.ok(isCollection([{}, {}])))
  t.test('true for an array of mixed arrays and objects', (t) => t.ok(isCollection([[], {}])))
})

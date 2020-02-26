'use strict'
/* eslint-env mocha */

const assert = require('assert')
const isCollection = require('../../../lib/util/is_collection')

describe('isCollection', () => {
  it('false for a single array', () => assert(!isCollection([])))
  it('false for a single object', () => assert(!isCollection({})))
  it('true for an array of arrays', () => assert(isCollection([[], []])))
  it('true for an array of objects', () => assert(isCollection([{}, {}])))
  it('true for an array of mixed arrays and objects', () => assert(isCollection([[], {}])))
})

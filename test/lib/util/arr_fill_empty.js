'use strict'
/* eslint-env mocha */

const assert = require('assert')
const arrFillEmpty = require('../../../lib/util/arr_fill_empty')

describe('arrFillEmpty', () => {
  it('it should fill empty spots with null', () => {
    const arr = new Array(5)
    arr[3] = new Array(3)
    arr[3][1] = true
    arr[1] = 'test'

    arrFillEmpty(arr)
    const expected = [null, 'test', null, [null, true, null], null]

    assert.deepStrictEqual(arr, expected)
  })

  it('it should fill empty spots with value when specified', () => {
    const arr = new Array(5)
    arr[3] = new Array(3)
    arr[3][1] = true
    arr[1] = 'test'

    arrFillEmpty(arr, false)
    const expected = [false, 'test', false, [false, true, false], false]

    assert.deepStrictEqual(arr, expected)
  })
})

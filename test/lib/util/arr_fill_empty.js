'use strict'

const test = require('brittle')
const arrFillEmpty = require('../../../lib/util/arr_fill_empty')

test('arrFillEmpty', (t) => {
  t.test('it should fill empty spots with null', (t) => {
    const arr = new Array(5)
    arr[3] = new Array(3)
    arr[3][1] = true
    arr[1] = 'test'

    arrFillEmpty(arr)
    const expected = [null, 'test', null, [null, true, null], null]

    t.alike(arr, expected)
  })

  t.test('it should fill empty spots with value when specified', (t) => {
    const arr = new Array(5)
    arr[3] = new Array(3)
    arr[3][1] = true
    arr[1] = 'test'

    arrFillEmpty(arr, false)
    const expected = [false, 'test', false, [false, true, false], false]

    t.alike(arr, expected)
  })
})

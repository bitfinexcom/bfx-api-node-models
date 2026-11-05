'use strict'

const test = require('brittle')
const { MarginInfo } = require('../../../lib')

test('MarginInfo model', (t) => {
  // TODO: test validation

  t.test('initializes correctly w/ sym', (t) => {
    const miSym = new MarginInfo([
      'sym',
      'tEOSUSD',
      [
        26912,
        51443,
        23397,
        26912
      ]
    ])

    t.is(miSym.type, 'sym')
    t.is(miSym.symbol, 'tEOSUSD')
    t.is(miSym.tradableBalance, 26912)
    t.is(miSym.grossBalance, 51443)
    t.is(miSym.buy, 23397)
    t.is(miSym.sell, 26912)
  })

  t.test('initializes correctly for base', (t) => {
    const miBase = new MarginInfo([
      'base',
      [
        -4784,
        -251,
        16392,
        11355
      ]
    ])

    t.is(miBase.type, 'base')
    t.is(miBase.userPL, -4784)
    t.is(miBase.userSwaps, -251)
    t.is(miBase.marginBalance, 16392)
    t.is(miBase.marginNet, 11355)
  })

  t.test('serializes correctly w/ sym', (t) => {
    const miSym = new MarginInfo([
      'sym',
      'tEOSUSD',
      [
        26912,
        51443,
        23397,
        26912
      ]
    ])

    const arr = miSym.serialize()

    t.alike(arr, [
      'sym',
      'tEOSUSD',
      [
        26912,
        51443,
        23397,
        26912
      ]
    ])
  })

  t.test('serializes correctly for base', (t) => {
    const miBase = new MarginInfo([
      'base',
      [
        -4784,
        -251,
        16392,
        11355
      ]
    ])

    const arr = miBase.serialize()
    t.alike(arr, [
      'base',
      [
        -4784,
        -251,
        16392,
        11355
      ]
    ])
  })

  t.test('unserializes correctly w/ sym', (t) => {
    const obj = MarginInfo.unserialize([
      'sym',
      'tEOSUSD',
      [
        26912,
        51443,
        23397,
        26912
      ]
    ])

    t.is(obj.type, 'sym')
    t.is(obj.symbol, 'tEOSUSD')
    t.is(obj.tradableBalance, 26912)
    t.is(obj.grossBalance, 51443)
    t.is(obj.buy, 23397)
    t.is(obj.sell, 26912)
  })

  t.test('unserializes correctly for base', (t) => {
    const obj = MarginInfo.unserialize([
      'base',
      [
        -4784,
        -251,
        16392,
        11355
      ]
    ])

    t.is(obj.type, 'base')
    t.is(obj.userPL, -4784)
    t.is(obj.userSwaps, -251)
    t.is(obj.marginBalance, 16392)
    t.is(obj.marginNet, 11355)
  })
})

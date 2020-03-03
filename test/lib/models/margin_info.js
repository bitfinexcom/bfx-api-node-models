/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { MarginInfo } = require('../../../lib')

describe('MarginInfo model', () => {
  // TODO: test validation

  it('initializes correctly w/ sym', () => {
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

    assert.strictEqual(miSym.type, 'sym')
    assert.strictEqual(miSym.symbol, 'tEOSUSD')
    assert.strictEqual(miSym.tradableBalance, 26912)
    assert.strictEqual(miSym.grossBalance, 51443)
    assert.strictEqual(miSym.buy, 23397)
    assert.strictEqual(miSym.sell, 26912)
  })

  it('initializes correctly for base', () => {
    const miBase = new MarginInfo([
      'base',
      [
        -4784,
        -251,
        16392,
        11355
      ]
    ])

    assert.strictEqual(miBase.type, 'base')
    assert.strictEqual(miBase.userPL, -4784)
    assert.strictEqual(miBase.userSwaps, -251)
    assert.strictEqual(miBase.marginBalance, 16392)
    assert.strictEqual(miBase.marginNet, 11355)
  })

  it('serializes correctly w/ sym', () => {
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

    assert.deepStrictEqual(arr, [
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

  it('serializes correctly for base', () => {
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
    assert.deepStrictEqual(arr, [
      'base',
      [
        -4784,
        -251,
        16392,
        11355
      ]
    ])
  })

  it('unserializes correctly w/ sym', () => {
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

    assert.strictEqual(obj.type, 'sym')
    assert.strictEqual(obj.symbol, 'tEOSUSD')
    assert.strictEqual(obj.tradableBalance, 26912)
    assert.strictEqual(obj.grossBalance, 51443)
    assert.strictEqual(obj.buy, 23397)
    assert.strictEqual(obj.sell, 26912)
  })

  it('unserializes correctly for base', () => {
    const obj = MarginInfo.unserialize([
      'base',
      [
        -4784,
        -251,
        16392,
        11355
      ]
    ])

    assert.strictEqual(obj.type, 'base')
    assert.strictEqual(obj.userPL, -4784)
    assert.strictEqual(obj.userSwaps, -251)
    assert.strictEqual(obj.marginBalance, 16392)
    assert.strictEqual(obj.marginNet, 11355)
  })
})

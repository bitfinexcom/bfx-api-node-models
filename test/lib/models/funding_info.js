/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { FundingInfo } = require('../../../lib')

describe('FundingInfo model', () => {
  // TODO: test validation

  it('initializes correctly', () => {
    const fi = new FundingInfo([
      'sym',
      'ftEOSUSD',
      [
        12,
        24,
        48,
        96
      ]
    ])

    assert.strictEqual(fi.symbol, 'ftEOSUSD')
    assert.strictEqual(fi.yieldLoan, 12)
    assert.strictEqual(fi.yieldLend, 24)
    assert.strictEqual(fi.durationLoan, 48)
    assert.strictEqual(fi.durationLend, 96)
  })

  it('serializes correctly', () => {
    const fi = new FundingInfo([
      'sym',
      'ftEOSUSD',
      [
        12,
        24,
        48,
        96
      ]
    ])

    const arr = fi.serialize()
    assert.deepStrictEqual(arr, [
      'sym',
      'ftEOSUSD',
      [
        12,
        24,
        48,
        96
      ]
    ])
  })

  it('unserializes correctly', () => {
    const obj = FundingInfo.unserialize([
      'sym',
      'ftEOSUSD',
      [
        12,
        24,
        48,
        96
      ]
    ])

    assert.strictEqual(obj.symbol, 'ftEOSUSD')
    assert.strictEqual(obj.yieldLoan, 12)
    assert.strictEqual(obj.yieldLend, 24)
    assert.strictEqual(obj.durationLoan, 48)
    assert.strictEqual(obj.durationLend, 96)
  })
})

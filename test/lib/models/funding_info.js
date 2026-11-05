'use strict'

const test = require('brittle')
const { FundingInfo } = require('../../../lib')

test('FundingInfo model', (t) => {
  // TODO: test validation

  t.test('initializes correctly', (t) => {
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

    t.is(fi.symbol, 'ftEOSUSD')
    t.is(fi.yieldLoan, 12)
    t.is(fi.yieldLend, 24)
    t.is(fi.durationLoan, 48)
    t.is(fi.durationLend, 96)
  })

  t.test('serializes correctly', (t) => {
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
    t.alike(arr, [
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

  t.test('unserializes correctly', (t) => {
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

    t.is(obj.symbol, 'ftEOSUSD')
    t.is(obj.yieldLoan, 12)
    t.is(obj.yieldLend, 24)
    t.is(obj.durationLoan, 48)
    t.is(obj.durationLend, 96)
  })
})

/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { Liquidations } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Liquidations entry model', () => {
  testModel({
    model: Liquidations,
    orderedFields: [
      null, 'posId', 'mtsUpdated', null, 'symbol', 'amount', 'basePrice', null, 'isMatch', 'isMarketSold'
    ]
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const l = new Liquidations({
        symbol: 'tBTCUSD',
        amount: 42,
        basePrice: 0.1
      })

      const str = l.toString()
      assert.ok(/BTCUSD/.test(str), 'symbol missing')
      assert.ok(str.indexOf('42') !== -1, 'amount missing')
      assert.ok(str.indexOf('0.1') !== -1, 'rate missing')
    })
  })
})

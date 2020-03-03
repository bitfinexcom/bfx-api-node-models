/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { FundingTrade } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('FundingTrade model', () => {
  testModel({
    model: FundingTrade,
    orderedFields: [
      'id', 'symbol', 'mtsCreate', 'offerID', 'amount', 'rate', 'period',
      'maker'
    ]
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const ft = new FundingTrade({
        symbol: 'tBTCUSD',
        amount: 42,
        rate: 0.1,
        period: 30
      })

      const str = ft.toString()
      assert.ok(/BTCUSD/.test(str), 'symbol missing')
      assert.ok(str.indexOf('42') !== -1, 'amount missing')
      assert.ok(str.indexOf('0.1') !== -1, 'rate missing')
      assert.ok(str.indexOf('30') !== -1, 'period missing')
    })
  })
})

/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { Trade } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Trade model', () => {
  testModel({
    model: Trade,
    boolFields: ['maker'],
    orderedFields: [
      'id', 'symbol', 'mtsCreate', 'orderID', 'execAmount', 'execPrice',
      'orderType', 'orderPrice', 'maker', 'fee', 'feeCurrency'
    ]
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const t = new Trade({
        symbol: 'tBTCUSD',
        id: 1,
        execAmount: 24,
        execPrice: 32,
        maker: true,
        fee: 7,
        feeCurrency: 'ETH'
      })

      const str = t.toString()
      assert.ok(/tBTCUSD/.test(str), 'symbol missing')
      assert.ok(str.indexOf('1') !== -1, 'id missing')
      assert.ok(str.indexOf('32') !== -1, 'exec price missing')
      assert.ok(str.indexOf('24') !== -1, 'exec amount missing')
      assert.ok(/maker/.test(str), 'maker flag missing')
      assert.ok(str.indexOf('7') !== -1, 'fee missing')
      assert.ok(/ETH/.test(str), 'fee currency missing')
    })
  })
})

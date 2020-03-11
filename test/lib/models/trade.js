/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _includes = require('lodash/includes')
const { SYMBOLS, CURRENCIES } = require('bfx-hf-util')
const { Trade, Order } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_CURRENCIES = Object.values(CURRENCIES)
const VALID_SYMBOLS = Object.values(SYMBOLS)

describe('Trade model', () => {
  testModel({
    model: Trade,
    boolFields: ['maker'],
    orderedFields: [
      'id', 'symbol', 'mtsCreate', 'orderID', 'execAmount', 'execPrice',
      'orderType', 'orderPrice', 'maker', 'fee', 'feeCurrency'
    ]
  })

  testModelValidation({
    model: Trade,
    validData: {
      symbol: VALID_SYMBOLS,
      orderID: VALID_SYMBOLS, // get some data
      orderType: Object.values(Order.type),
      id: new Array(...(new Array(5))).map(() => Math.random()),
      mtsCreate: new Array(...(new Array(5))).map(() => Math.random()),
      execAmount: new Array(...(new Array(5))).map(() => Math.random()),
      execPrice: new Array(...(new Array(5))).map(() => Math.random()),
      orderPrice: new Array(...(new Array(5))).map(() => Math.random()),
      maker: new Array(...(new Array(5))).map(() => Math.random() > 0.5),
      fee: new Array(...(new Array(5))).map(() => Math.random()),
      feeCurrency: VALID_CURRENCIES
    }
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
      assert.ok(_includes(str, '1'), 'id missing')
      assert.ok(_includes(str, '32'), 'exec price missing')
      assert.ok(_includes(str, '24'), 'exec amount missing')
      assert.ok(/maker/.test(str), 'maker flag missing')
      assert.ok(_includes(str, '7'), 'fee missing')
      assert.ok(/ETH/.test(str), 'fee currency missing')
    })
  })
})

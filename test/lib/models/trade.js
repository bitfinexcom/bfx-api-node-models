'use strict'

const test = require('brittle')
const _includes = require('lodash/includes')
const { SYMBOLS, CURRENCIES } = require('@bitfinex/bfx-hf-util')
const { Trade, Order } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_CURRENCIES = Object.values(CURRENCIES)
const VALID_SYMBOLS = Object.values(SYMBOLS)

test('Trade model', (t) => {
  testModel(t, {
    model: Trade,
    boolFields: ['maker'],
    orderedFields: [
      'id', 'symbol', 'mtsCreate', 'orderID', 'execAmount', 'execPrice',
      'orderType', 'orderPrice', 'maker', 'fee', 'feeCurrency'
    ]
  })

  testModelValidation(t, {
    model: Trade,
    validData: {
      symbol: VALID_SYMBOLS,
      orderID: VALID_SYMBOLS, // get some data
      orderType: Object.values(Order.type),
      id: [...(new Array(5))].map(() => Math.random()),
      mtsCreate: [...(new Array(5))].map(() => Math.random()),
      execAmount: [...(new Array(5))].map(() => Math.random()),
      execPrice: [...(new Array(5))].map(() => Math.random()),
      orderPrice: [...(new Array(5))].map(() => Math.random()),
      maker: [...(new Array(5))].map(() => Math.random() > 0.5),
      fee: [...(new Array(5))].map(() => Math.random()),
      feeCurrency: VALID_CURRENCIES
    }
  })

  t.test('toString', (t) => {
    t.test('includes pertinent information', (t) => {
      const trade = new Trade({
        symbol: 'tBTCUSD',
        id: 1,
        execAmount: 24,
        execPrice: 32,
        maker: true,
        fee: 7,
        feeCurrency: 'ETH'
      })

      const str = trade.toString()
      t.ok(/tBTCUSD/.test(str), 'symbol missing')
      t.ok(_includes(str, '1'), 'id missing')
      t.ok(_includes(str, '32'), 'exec price missing')
      t.ok(_includes(str, '24'), 'exec amount missing')
      t.ok(/maker/.test(str), 'maker flag missing')
      t.ok(_includes(str, '7'), 'fee missing')
      t.ok(/ETH/.test(str), 'fee currency missing')
    })
  })
})

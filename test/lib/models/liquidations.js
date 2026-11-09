'use strict'

const test = require('brittle')
const _includes = require('lodash/includes')
const { SYMBOLS } = require('@bitfinex/bfx-hf-util')
const { Liquidations } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)

test('Liquidations entry model', (t) => {
  testModel(t, {
    model: Liquidations,
    orderedFields: [
      null, 'posId', 'mtsUpdated', null, 'symbol', 'amount', 'basePrice', null, 'isMatch', 'isMarketSold'
    ]
  })

  testModelValidation(t, {
    model: Liquidations,
    validData: {
      symbol: VALID_SYMBOLS,
      posId: [...(new Array(5))].map(() => Math.random()),
      mtsUpdated: [...(new Array(5))].map(() => Math.random()),
      amount: [...(new Array(5))].map(() => Math.random()),
      basePrice: [...(new Array(5))].map(() => Math.random()),
      isMatch: [...(new Array(5))].map(() => Math.random() > 0.5),
      isMarketSold: [...(new Array(5))].map(() => Math.random() > 0.5)
    }
  })

  t.test('toString', (t) => {
    t.test('includes pertinent information', (t) => {
      const l = new Liquidations({
        symbol: 'tBTCUSD',
        amount: 42,
        basePrice: 0.1
      })

      const str = l.toString()
      t.ok(/BTCUSD/.test(str), 'symbol missing')
      t.ok(_includes(str, '42'), 'amount missing')
      t.ok(_includes(str, '0.1'), 'rate missing')
    })
  })
})

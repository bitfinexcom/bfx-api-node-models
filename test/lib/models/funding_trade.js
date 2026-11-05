'use strict'

const test = require('brittle')
const _includes = require('lodash/includes')
const { SYMBOLS } = require('bfx-hf-util')
const { FundingTrade } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)

test('FundingTrade model', (t) => {
  testModel(t, {
    model: FundingTrade,
    orderedFields: [
      'id', 'symbol', 'mtsCreate', 'offerID', 'amount', 'rate', 'period',
      'maker'
    ]
  })

  testModelValidation(t, {
    model: FundingTrade,
    validData: {
      symbol: VALID_SYMBOLS,
      id: [...(new Array(5))].map(() => Math.random()),
      mtsCreate: [...(new Array(5))].map(() => Math.random()),
      offerID: [...(new Array(5))].map(() => Math.random()),
      amount: [...(new Array(5))].map(() => Math.random()),
      rate: [...(new Array(5))].map(() => Math.random()),
      period: [...(new Array(5))].map(() => Math.random()),
      maker: [...(new Array(5))].map(() => Math.random() > 0.5)
    }
  })

  t.test('toString', (t) => {
    t.test('includes pertinent information', (t) => {
      const ft = new FundingTrade({
        symbol: 'tBTCUSD',
        amount: 42,
        rate: 0.1,
        period: 30
      })

      const str = ft.toString()
      t.ok(/BTCUSD/.test(str), 'symbol missing')
      t.ok(_includes(str, '42'), 'amount missing')
      t.ok(_includes(str, '0.1'), 'rate missing')
      t.ok(_includes(str, '30'), 'period missing')
    })
  })
})

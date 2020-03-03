/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { SYMBOLS } = require('bfx-hf-util')
const { FundingTrade } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)

describe('FundingTrade model', () => {
  testModel({
    model: FundingTrade,
    orderedFields: [
      'id', 'symbol', 'mtsCreate', 'offerID', 'amount', 'rate', 'period',
      'maker'
    ]
  })

  testModelValidation({
    model: FundingTrade,
    validData: {
      symbol: VALID_SYMBOLS,
      id: new Array(...(new Array(5))).map(() => Math.random()),
      mtsCreate: new Array(...(new Array(5))).map(() => Math.random()),
      offerID: new Array(...(new Array(5))).map(() => Math.random()),
      amount: new Array(...(new Array(5))).map(() => Math.random()),
      rate: new Array(...(new Array(5))).map(() => Math.random()),
      period: new Array(...(new Array(5))).map(() => Math.random()),
      maker: new Array(...(new Array(5))).map(() => Math.random() > 0.5)
    }
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

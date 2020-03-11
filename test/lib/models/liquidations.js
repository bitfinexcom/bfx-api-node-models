/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _includes = require('lodash/includes')
const { SYMBOLS } = require('bfx-hf-util')
const { Liquidations } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)

describe('Liquidations entry model', () => {
  testModel({
    model: Liquidations,
    orderedFields: [
      null, 'posId', 'mtsUpdated', null, 'symbol', 'amount', 'basePrice', null, 'isMatch', 'isMarketSold'
    ]
  })

  testModelValidation({
    model: Liquidations,
    validData: {
      symbol: VALID_SYMBOLS,
      posId: new Array(...(new Array(5))).map(() => Math.random()),
      mtsUpdated: new Array(...(new Array(5))).map(() => Math.random()),
      amount: new Array(...(new Array(5))).map(() => Math.random()),
      basePrice: new Array(...(new Array(5))).map(() => Math.random()),
      isMatch: new Array(...(new Array(5))).map(() => Math.random() > 0.5),
      isMarketSold: new Array(...(new Array(5))).map(() => Math.random() > 0.5)
    }
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
      assert.ok(_includes(str, '42'), 'amount missing')
      assert.ok(_includes(str, '0.1'), 'rate missing')
    })
  })
})

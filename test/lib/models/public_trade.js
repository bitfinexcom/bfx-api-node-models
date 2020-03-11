/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _includes = require('lodash/includes')
const { RESTv2 } = require('bfx-api-node-rest')
const { PublicTrade } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('Public Trade model', () => {
  testModel({
    model: PublicTrade,
    orderedFields: ['id', 'mts', 'amount', 'price']
  })

  // TODO: Fix this
  /*
  testModelValidation({ // funding
    model: PublicTrade,
    validData: {
      id: new Array(...(new Array(5))).map(() => Math.random()),
      mts: new Array(...(new Array(5))).map(() => Math.random()),
      amount: new Array(...(new Array(5))).map(() => Math.random()),
      rate: new Array(...(new Array(5))).map(() => Math.random()),
      period: new Array(...(new Array(5))).map(() => Math.random())
    }
  })
    */

  testModelValidation({ // trading
    model: PublicTrade,
    validData: {
      id: new Array(...(new Array(5))).map(() => Math.random()),
      mts: new Array(...(new Array(5))).map(() => Math.random()),
      amount: new Array(...(new Array(5))).map(() => Math.random()),
      price: new Array(...(new Array(5))).map(() => Math.random())
    }
  })

  it('unserializes live trading data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.trades('tBTCUSD')

    arr.forEach(trade => {
      const obj = PublicTrade.unserialize(trade)

      Object.keys(PublicTrade.TRADING_FIELDS).forEach(field => {
        assert.strictEqual(obj[field], trade[PublicTrade.TRADING_FIELDS[field]])
      })
    })
  }).timeout(60000)

  it('unserializes live funding data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.trades('fUSD')

    arr.forEach(trade => {
      const obj = PublicTrade.unserialize(trade)

      Object.keys(PublicTrade.FUNDING_FIELDS).forEach(field => {
        assert.strictEqual(obj[field], trade[PublicTrade.FUNDING_FIELDS[field]])
      })
    })
  }).timeout(60000)

  describe('toString', () => {
    it('includes pertinent information', () => {
      const t = new PublicTrade({
        id: 42,
        amount: 3,
        price: 7
      })

      const str = t.toString()
      assert.ok(_includes(str, '42'), 'id missing')
      assert.ok(_includes(str, '3'), 'amount missing')
      assert.ok(_includes(str, '7'), 'price missing')
    })
  })
})

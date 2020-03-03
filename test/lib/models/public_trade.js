/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { RESTv2 } = require('bfx-api-node-rest')
const { PublicTrade } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Public Trade model', () => {
  testModel({
    model: PublicTrade,
    orderedFields: ['id', 'mts', 'amount', 'price']
  })

  // TODO: test validation (varies funding/trading)

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
      assert.ok(str.indexOf('42') !== -1, 'id missing')
      assert.ok(str.indexOf('3') !== -1, 'amount missing')
      assert.ok(str.indexOf('7') !== -1, 'price missing')
    })
  })
})

/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { RESTv2 } = require('bfx-api-node-rest')
const { PublicTrade } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Public Trade model', () => {
  testModel({
    model: PublicTrade,
    orderedFields: [
      'id', 'mts', 'amount', 'price'
    ]
  })

  it('unserializes live trading data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.trades('tBTCUSD')

    arr.forEach(trade => {
      const obj = PublicTrade.unserialize(trade)

      Object.keys(PublicTrade.TRADING_FIELDS).forEach(field => {
        assert.equal(obj[field], trade[PublicTrade.TRADING_FIELDS[field]])
      })
    })
  })

  it('unserializes live funding data correctly', async () => {
    const rest = new RESTv2()
    const arr = await rest.trades('fUSD')

    arr.forEach(trade => {
      const obj = PublicTrade.unserialize(trade)

      Object.keys(PublicTrade.FUNDING_FIELDS).forEach(field => {
        assert.equal(obj[field], trade[PublicTrade.FUNDING_FIELDS[field]])
      })
    })
  })
})

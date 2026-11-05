'use strict'

const test = require('brittle')
const _includes = require('lodash/includes')
const { RESTv2 } = require('bfx-api-node-rest')
const { PublicTrade } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const snapshot = [
  [267951933, 1645117845846, -5862.1, 0.002, 2],
  [267947377, 1645115432454, -83763.1, 0.003, 3]
]

test('Public Trade model', async (t) => {
  testModel(t, {
    model: PublicTrade,
    orderedFields: ['id', 'mts', 'amount', 'price']
  })

  // TODO: Fix this
  /*
  testModelValidation(t, { // funding
    model: PublicTrade,
    validData: {
      id: [...(new Array(5))].map(() => Math.random()),
      mts: [...(new Array(5))].map(() => Math.random()),
      amount: [...(new Array(5))].map(() => Math.random()),
      rate: [...(new Array(5))].map(() => Math.random()),
      period: [...(new Array(5))].map(() => Math.random())
    }
  })
    */

  testModelValidation(t, { // trading
    model: PublicTrade,
    validData: {
      id: [...(new Array(5))].map(() => Math.random()),
      mts: [...(new Array(5))].map(() => Math.random()),
      amount: [...(new Array(5))].map(() => Math.random()),
      price: [...(new Array(5))].map(() => Math.random())
    }
  })

  await t.test('unserializes live trading data correctly', { timeout: 60000 }, async (t) => {
    const rest = new RESTv2()
    const arr = await rest.trades({ symbol: 'tBTCUSD' })

    arr.forEach(trade => {
      const obj = PublicTrade.unserialize(trade)

      Object.keys(PublicTrade.TRADING_FIELDS).forEach(field => {
        t.is(obj[field], trade[PublicTrade.TRADING_FIELDS[field]])
      })
    })
  })

  await t.test('unserializes live funding data correctly', { timeout: 60000 }, async (t) => {
    const rest = new RESTv2()
    const arr = await rest.trades({ symbol: 'fUSD' })

    arr.forEach(trade => {
      const obj = PublicTrade.unserialize(trade)

      Object.keys(PublicTrade.FUNDING_FIELDS).forEach(field => {
        t.is(obj[field], trade[PublicTrade.FUNDING_FIELDS[field]])
      })
    })
  })

  await t.test('unserializes snapshot', { timeout: 60000 }, async (t) => {
    const serialized = PublicTrade.unserialize(snapshot)

    serialized.forEach((item, i) => {
      Object.keys(PublicTrade.FUNDING_FIELDS).forEach(field => {
        t.is(item[field], snapshot[i][PublicTrade.FUNDING_FIELDS[field]])
      })
    })
  })

  await t.test('creates instance from unserialized snapshot ', { timeout: 60000 }, async (t) => {
    const trades = new PublicTrade(PublicTrade.unserialize(snapshot))

    for (let i = 0; i < trades.length; i++) {
      const item = trades[i]

      Object.keys(PublicTrade.FUNDING_FIELDS).forEach(field => {
        t.is(item[field], snapshot[i][PublicTrade.FUNDING_FIELDS[field]])
      })
    }
  })

  await t.test('creates instance from snapshot', { timeout: 60000 }, async (t) => {
    const trades = new PublicTrade(snapshot)

    for (let i = 0; i < trades.length; i++) {
      const item = trades[i]

      Object.keys(PublicTrade.FUNDING_FIELDS).forEach(field => {
        t.is(item[field], snapshot[i][PublicTrade.FUNDING_FIELDS[field]])
      })
    }
  })

  await t.test('toString', (t) => {
    t.test('includes pertinent information', (t) => {
      const trade = new PublicTrade({
        id: 42,
        amount: 3,
        price: 7
      })

      const str = trade.toString()
      t.ok(_includes(str, '42'), 'id missing')
      t.ok(_includes(str, '3'), 'amount missing')
      t.ok(_includes(str, '7'), 'price missing')
    })
  })
})

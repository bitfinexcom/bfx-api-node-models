'use strict'

const test = require('brittle')
const _includes = require('lodash/includes')
const { SYMBOLS } = require('bfx-hf-util')
const { Position, Order } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)

const getTestPosition = (opts = {}) => new Position({
  symbol: 'tLEOUDS',
  amount: 100,
  price: 2,
  ...opts
})

test('Position model', async (t) => {
  testModel(t, {
    model: Position,
    orderedFields: [
      'symbol', 'status', 'amount', 'basePrice', 'marginFunding',
      'marginFundingType', 'pl', 'plPerc', 'liquidationPrice', 'leverage',
      null, 'id', 'mtsCreate', 'mtsUpdate', null, 'type', null,
      'collateral', 'collateralMin', 'meta'
    ]
  })

  testModelValidation(t, {
    model: Position,
    validData: {
      symbol: VALID_SYMBOLS,
      status: VALID_SYMBOLS, // grab data from somewhere
      amount: [...(new Array(5))].map(() => Math.random()),
      basePrice: [...(new Array(5))].map(() => Math.random()),
      marginFunding: [...(new Array(5))].map(() => Math.random()),
      marginFundingType: VALID_SYMBOLS, // grab data from somewhere
      pl: [...(new Array(5))].map(() => Math.random()),
      plPerc: [...(new Array(5))].map(() => Math.random()),
      liquidationPrice: [...(new Array(5))].map(() => Math.random()),
      leverage: [...(new Array(5))].map(() => Math.random()),
      id: [...(new Array(5))].map(() => Math.random()),
      mtsCreate: [...(new Array(5))].map(() => Math.random()),
      mtsUpdate: [...(new Array(5))].map(() => Math.random()),
      type: VALID_SYMBOLS, // grab data from somewhere
      collateral: [...(new Array(5))].map(() => Math.random()),
      collateralMin: [...(new Array(5))].map(() => Math.random())
    }
  })

  await t.test('orderToClose', (t) => {
    t.test('generates a MARKET order', (t) => {
      const p = getTestPosition()
      const o = p.orderToClose()

      t.is(o.type, Order.type.MARKET, 'position close order is not a market order')
    })

    t.test('generates an order that would close the position', (t) => {
      const p = getTestPosition({ amount: 20 })
      const o = p.orderToClose()

      t.is(+o.amount, -20, 'position close order would not close the position')
    })

    t.test('sets the reduce-only and pos-close flags', (t) => {
      const p = getTestPosition({ amount: 20 })
      const o = p.orderToClose()

      t.ok(o.flags & Order.flags.REDUCE_ONLY, 'position close order does not have reduce-only flag set')
      t.ok(o.flags & Order.flags.REDUCE_ONLY, 'position close order does not have pos-close flag set')
    })
  })

  await t.test('claim', async (t) => {
    await t.test('throws an error if no interface provided', async (t) => {
      const p = new Position()
      await t.exception.all(p.claim())
    })

    await t.test('calls claimPosition on the interface', (t) => {
      t.plan(1)
      const p = new Position({ id: 42 })
      p.claim({
        claimPosition: async ({ id }) => {
          t.is(id, 42)
          return []
        }
      })
    })

    await t.test('saves received data on itself', async (t) => {
      const p = new Position({ symbol: 'tBTCUSD' })
      const remoteP = new Position({ symbol: 'just-testing' })

      await p.claim({
        claimPosition: async () => remoteP.serialize()
      })

      t.is(p.symbol, 'just-testing')
    })
  })

  await t.test('close', async (t) => {
    await t.test('throws an error if no interface provided', async (t) => {
      const p = new Position()
      await t.exception.all(p.close())
    })

    await t.test('calls closePosition on the interface', (t) => {
      t.plan(1)
      const p = new Position({ id: 42 })
      p.close({
        closePosition: async ({ position_id }) => { // eslint-disable-line
          t.is(position_id, 42)
        }
      })
    })
  })

  await t.test('toString', (t) => {
    t.test('includes pertinent information', (t) => {
      const p = new Position({
        symbol: 'tBTCUSD',
        amount: 42,
        price: 1,
        type: 'STOP',
        hidden: true,
        postonly: true,
        reduceonly: true,
        pl: 9001,
        liquidationPrice: 33
      })

      const str = p.toString()
      t.ok(/BTC\/USD/.test(str), 'symbol missing')
      t.ok(_includes(str, '1'), 'price missing')
      t.ok(_includes(str, '42'), 'amount missing')
      t.ok(_includes(str, '9001'), 'pl missing')
      t.ok(_includes(str, '33'), 'liq price missing')
    })
  })
})

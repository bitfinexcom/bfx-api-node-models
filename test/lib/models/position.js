/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { Position, Order } = require('../../../lib')
const testModel = require('../../helpers/test_model')

const getTestPosition = (opts = {}) => new Position({
  symbol: 'tLEOUDS',
  amount: 100,
  price: 2,
  ...opts
})

describe('Position model', () => {
  testModel({
    model: Position,
    orderedFields: [
      'symbol', 'status', 'amount', 'basePrice', 'marginFunding',
      'marginFundingType', 'pl', 'plPerc', 'liquidationPrice', 'leverage',
      null, 'id', 'mtsCreate', 'mtsUpdate', null, 'type', null,
      'collateral', 'collateralMin', 'meta'
    ]
  })

  describe('orderToClose', () => {
    it('generates a MARKET order', () => {
      const p = getTestPosition()
      const o = p.orderToClose()

      assert.strictEqual(o.type, Order.type.MARKET, 'position close order is not a market order')
    })

    it('generates an order that would close the position', () => {
      const p = getTestPosition({ amount: 20 })
      const o = p.orderToClose()

      assert.strictEqual(+o.amount, -20, 'position close order would not close the position')
    })

    it('sets the reduce-only and pos-close flags', () => {
      const p = getTestPosition({ amount: 20 })
      const o = p.orderToClose()

      assert.ok(o.flags & Order.flags.REDUCE_ONLY, 'position close order does not have reduce-only flag set')
      assert.ok(o.flags & Order.flags.REDUCE_ONLY, 'position close order does not have pos-close flag set')
    })
  })

  describe('claim', () => {
    it('throws an error if no interface provided', (done) => {
      const p = new Position()
      p.claim().catch(() => done())
    })

    it('calls claimPosition on the interface', (done) => {
      const p = new Position({ id: 42 })
      p.claim({
        claimPosition: async (id) => {
          assert.strictEqual(id, 42)
          done()
          return []
        }
      })
    })

    it('saves received data on itself', async () => {
      const p = new Position({ symbol: 'tBTCUSD' })
      const remoteP = new Position({ symbol: 'just-testing' })

      await p.claim({
        claimPosition: async () => remoteP.serialize()
      })

      assert.strictEqual(p.symbol, 'just-testing')
    })
  })

  describe('close', () => {
    it('throws an error if no interface provided', (done) => {
      const p = new Position()
      p.close().catch(() => done())
    })

    it('calls closePosition on the interface', (done) => {
      const p = new Position({ id: 42 })
      p.close({
        closePosition: async ({ position_id }) => { // eslint-disable-line
          assert.strictEqual(position_id, 42) // eslint-disable-line
          done()
        }
      })
    })
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
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
      assert.ok(/BTC\/USD/.test(str), 'symbol missing')
      assert.ok(str.indexOf('1') !== -1, 'price missing')
      assert.ok(str.indexOf('42') !== -1, 'amount missing')
      assert.ok(str.indexOf('9001') !== -1, 'pl missing')
      assert.ok(str.indexOf('33') !== -1, 'liq price missing')
    })
  })
})

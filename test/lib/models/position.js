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
})

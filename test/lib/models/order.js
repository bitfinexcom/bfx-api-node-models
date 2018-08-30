/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { Order } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('Order model', () => {
  testModel({
    model: Order,
    boolFields: ['notify'],
    orderedFields: [
      'id', 'gid', 'cid', 'symbol', 'mtsCreate', 'mtsUpdate', 'amount',
      'amountOrig', 'type', 'typePrev', null, null, 'flags', 'status', null,
      null, 'price', 'priceAvg', 'priceTrailing', 'priceAuxLimit', null, null,
      null, 'notify', null, 'placedId'
    ]
  })

  it('toNewOrderPacket: uses correct values', () => {
    const o = new Order({
      id: 1,
      gid: 2,
      cid: 3,
      symbol: 'tBTCUSD',
      type: 'EXCHANGE LIMIT',
      priceTrailing: 0.1,
      priceAuxLimit: 0.2,
      price: 0.3,
      amount: 0.4
    })

    let p = o.toNewOrderPacket()

    assert.equal(p.constructor.name, 'Object')
    assert(!p.id)
    assert.equal(p.gid, 2)
    assert.equal(p.cid, 3)
    assert.equal(p.symbol, 'tBTCUSD')
    assert.equal(p.type, 'EXCHANGE LIMIT')
    assert.equal(p.price_trailing, '0.1')
    assert.equal(p.price_aux_limit, '0.2')
    assert.equal(p.price, '0.3')
    assert.equal(p.amount, '0.4')
    assert(!(p.flags & Order.flags.OCO))
    assert(!(p.flags & Order.flags.HIDDEN))
    assert(!(p.flags & Order.flags.POSTONLY))

    o.setHidden(true)
    p = o.toNewOrderPacket()
    assert(p.flags & Order.flags.HIDDEN)
    assert(!(p.flags & Order.flags.OCO))
    assert(!(p.flags & Order.flags.POSTONLY))
    o.setHidden(false)

    o.setPostOnly(true)
    p = o.toNewOrderPacket()
    assert(p.flags & Order.flags.POSTONLY)
    assert(!(p.flags & Order.flags.OCO))
    assert(!(p.flags & Order.flags.HIDDEN))
    o.setPostOnly(false)

    o.setOCO(true)
    p = o.toNewOrderPacket()
    assert(p.flags & Order.flags.OCO)
    assert(!(p.flags & Order.flags.HIDDEN))
    assert(!(p.flags & Order.flags.POSTONLY))
    o.setOCO(false)

    // Just to make sure...
    o.setOCO(true)
    o.setHidden(true)
    o.setPostOnly(true)
    p = o.toNewOrderPacket()

    assert(p.flags & Order.flags.OCO)
    assert(p.flags & Order.flags.HIDDEN)
    assert(p.flags & Order.flags.POSTONLY)
  })

  it('constructor: sets flags based on bool flag keys', () => {
    const oHidden = new Order({ hidden: true })
    const oPostOnly = new Order({ postonly: true })
    const oOCO = new Order({ oco: true, priceAuxLimit: 42 })

    assert(oHidden.isHidden())
    assert(!oHidden.isPostOnly())
    assert(!oHidden.isOCO())
    assert(oHidden.flags & Order.flags.HIDDEN)
    assert(!(oHidden.flags & Order.flags.POSTONLY))
    assert(!(oHidden.flags & Order.flags.OCO))

    assert(oPostOnly.isPostOnly())
    assert(!oPostOnly.isHidden())
    assert(!oPostOnly.isOCO())
    assert(oPostOnly.flags & Order.flags.POSTONLY)
    assert(!(oPostOnly.flags & Order.flags.HIDDEN))
    assert(!(oPostOnly.flags & Order.flags.OCO))

    assert(oOCO.isOCO())
    assert(!oOCO.isHidden())
    assert(!oOCO.isPostOnly())
    assert(oOCO.flags & Order.flags.OCO)
    assert(!(oOCO.flags & Order.flags.HIDDEN))
    assert(!(oOCO.flags & Order.flags.POSTONLY))
    assert.equal(oOCO.priceAuxLimit, 42)
  })

  it('isOCO, setOCO: updates/reads OCO flag & price', () => {
    const o = new Order()

    assert(!o.isOCO())
    o.setOCO(true, 42)
    assert(o.isOCO())
    assert.equal(o.priceAuxLimit, 42)

    o.setOCO(false)
    assert(!o.isOCO())

    o.setOCO(true)
    assert(o.isOCO())
  })

  it('isHidden, setHidden: updates/reads hidden flag', () => {
    const o = new Order()
    assert(!o.isHidden())
    o.setHidden(true)
    assert(o.isHidden())

    o.setHidden(false)
    assert(!o.isHidden())

    o.setHidden(true)
    assert(o.isHidden())
  })

  it('isPostOnly, setPostOnly: updates/reads postonly flag', () => {
    const o = new Order()
    assert(!o.isPostOnly())
    o.setPostOnly(true)
    assert(o.isPostOnly())

    o.setPostOnly(false)
    assert(!o.isPostOnly())

    o.setPostOnly(true)
    assert(o.isPostOnly())
  })

  it('includesVariableRates, setVariableRates: updates/reads NO_VR flag', () => {
    const o = new Order()
    assert(o.includesVariableRates())
    o.setNoVariableRates(true)
    assert(!o.includesVariableRates())

    o.setNoVariableRates(false)
    assert(o.includesVariableRates())

    o.setNoVariableRates(true)
    assert(!o.includesVariableRates())
  })

  it('isPositionClose, setPositionClose: updates/reads posclose flag', () => {
    const o = new Order()
    assert(!o.isPositionClose())
    o.setPositionClose(true)
    assert(o.isPositionClose())

    o.setPositionClose(false)
    assert(!o.isPositionClose())

    o.setPositionClose(true)
    assert(o.isPositionClose())
  })

  it('isReduceOnly, setReduceOnly: updates/reads reduceOnly flag', () => {
    const o = new Order()
    assert(!o.isReduceOnly())
    o.setReduceOnly(true)
    assert(o.isReduceOnly())

    o.setReduceOnly(false)
    assert(!o.isReduceOnly())

    o.setReduceOnly(true)
    assert(o.isReduceOnly())
  })

  it('update: applies changeset to order model', (done) => {
    const o = new Order({ price: 42, amount: 1 }, { updateOrder: () => Promise.resolve() })
    assert.equal(o.price, 42)
    assert.equal(o.amount, 1)

    o.update({ delta: 1, price: 43 }).catch(done)

    assert.equal(o.price, 43)
    assert.equal(o.amount, 2)

    assert(typeof o.priceAuxLimit === 'undefined')
    o.update({ price_aux_limit: 42 }).catch(done)
    assert(typeof o.price_aux_limit === 'undefined')
    assert.equal(o.priceAuxLimit, 42)

    assert(typeof o.priceTrailing === 'undefined')
    o.update({ price_trailing: 42 }).catch(done)
    assert(typeof o.price_trailing === 'undefined')
    assert.equal(o.priceTrailing, 42)

    assert(o.gid !== 42)
    o.update({ gid: 42 }).catch(done)
    assert.equal(o.gid, 42)

    done()
  })

  it('update: prepares price & amount', (done) => {
    const o = new Order({
      price: 42,
      amount: 1
    }, {
      updateOrder: (changes) => {
        assert.strictEqual(changes.price, '43.000')
        assert.strictEqual(changes.amount, '3.00000000')
        done()
      }
    })

    o.update({ price: 43, amount: 3 })
  })

  it('update: prepares delta', (done) => {
    const o = new Order({
      price: 42,
      amount: 1
    }, {
      updateOrder: (changes) => {
        assert.strictEqual(changes.delta, '3.00000000')
        done()
      }
    })

    o.update({ delta: 3 })
  })

  it('update: prepares aux limit price', (done) => {
    const o = new Order({
      price: 42,
      amount: 1
    }, {
      updateOrder: (changes) => {
        assert.strictEqual(changes.price_aux_limit, '3.0000')
        done()
      }
    })

    o.update({ price_aux_limit: 3 })
  })

  it('update: prepares trailing price', (done) => {
    const o = new Order({
      price: 42,
      amount: 1
    }, {
      updateOrder: (changes) => {
        assert.strictEqual(changes.price_trailing, '43.000')
        done()
      }
    })

    o.update({ price_trailing: 43 })
  })

  it('update: rejects with error if applying delta to missing amount', (done) => {
    const o = new Order()

    o.update({ delta: 1 }).catch(() => {
      done() // no error
    })
  })

  it('update: forwards update to ws2', (done) => {
    const o = new Order({}, { // dirty ws2 mock
      updateOrder: (o) => {
        assert(o)
        assert.equal(o.test, 42)
        done()
      }
    })

    o.update({ test: 42 }).catch(done)
  })

  it('isPartiallyFilled: returns true if the order is partially filled', () => {
    assert(new Order({ amount: 5, amountOrig: 25 }).isPartiallyFilled())
    assert(!new Order({ amount: 0, amountOrig: 25 }).isPartiallyFilled())
    assert(!new Order({ amount: 25, amountOrig: 25 }).isPartiallyFilled())
  })
})

/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isUndefined = require('lodash/isUndefined')
const _includes = require('lodash/includes')
const _isFunction = require('lodash/isFunction')
const { SYMBOLS } = require('bfx-hf-util')
const { Order } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)

describe('Order model', () => {
  testModel({
    model: Order,
    boolFields: ['notify', 'hidden'],
    orderedFields: [
      'id', 'gid', 'cid', 'symbol', 'mtsCreate', 'mtsUpdate', 'amount',
      'amountOrig', 'type', 'typePrev', 'mtsTIF', null, 'flags', 'status', null,
      null, 'price', 'priceAvg', 'priceTrailing', 'priceAuxLimit', null, null,
      null, 'notify', 'hidden', 'placedId', null, null, 'routing', null, null, 'meta'
    ]
  })

  testModelValidation({
    model: Order,
    validData: {
      symbol: VALID_SYMBOLS,
      id: new Array(...(new Array(5))).map(() => Math.random()),
      gid: new Array(...(new Array(5))).map(() => Math.random()),
      cid: new Array(...(new Array(5))).map(() => Math.random()),
      mtsCreate: new Array(...(new Array(5))).map(() => Math.random()),
      mtsUpdate: new Array(...(new Array(5))).map(() => Math.random()),
      amount: new Array(...(new Array(5))).map(() => Math.random()),
      amountOrig: new Array(...(new Array(5))).map(() => Math.random()),
      type: Object.values(Order.type),
      typePrev: Object.values(Order.type),
      status: Object.values(Order.type), // get some data
      mtsTIF: new Array(...(new Array(5))).map(() => Math.random()),
      flags: new Array(...(new Array(5))).map(() => Math.random()),
      price: new Array(...(new Array(5))).map(() => Math.random()),
      priceAvg: new Array(...(new Array(5))).map(() => Math.random()),
      priceTrailing: new Array(...(new Array(5))).map(() => Math.random()),
      priceAuxLimit: new Array(...(new Array(5))).map(() => Math.random()),
      notify: new Array(...(new Array(5))).map(() => Math.random() > 0.5),
      hidden: new Array(...(new Array(5))).map(() => Math.random() > 0.5),
      placedId: new Array(...(new Array(5))).map(() => Math.random())
    }
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
      amount: 0.4,
      affiliateCode: 'insert some unique/thoughtful comment here'
    })

    let p = o.toNewOrderPacket()

    assert.strictEqual(p.constructor.name, 'Object')
    assert(!p.id)
    assert.strictEqual(p.gid, 2)
    assert.strictEqual(p.cid, 3)
    assert.strictEqual(p.symbol, 'tBTCUSD')
    assert.strictEqual(p.type, 'EXCHANGE LIMIT')
    assert.strictEqual(p.price_trailing, '0.10000')
    assert.strictEqual(p.price_aux_limit, '0.20000')
    assert.strictEqual(p.price, '0.30000')
    assert.strictEqual(p.amount, '0.40000000')
    assert(!(p.flags & Order.flags.OCO))
    assert(!(p.flags & Order.flags.HIDDEN))
    assert(!(p.flags & Order.flags.POSTONLY))
    assert.strictEqual(p.meta.aff_code, 'insert some unique/thoughtful comment here')

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
    assert.strictEqual(oOCO.priceAuxLimit, 42)
  })

  it('isOCO, setOCO: updates/reads OCO flag & price', () => {
    const o = new Order()

    assert(!o.isOCO())
    o.setOCO(true, 42)
    assert(o.isOCO())
    assert.strictEqual(o.priceAuxLimit, 42)

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
    assert.strictEqual(o.price, 42)
    assert.strictEqual(o.amount, 1)

    o.update({ delta: 1, price: 43 }).catch(done)

    assert.strictEqual(o.price, 43)
    assert.strictEqual(o.amount, 2)

    assert(_isUndefined(o.priceAuxLimit))
    o.update({ price_aux_limit: 42 }).catch(done)
    assert(_isUndefined(o.price_aux_limit))
    assert.strictEqual(o.priceAuxLimit, 42)

    assert(_isUndefined(o.priceTrailing))
    o.update({ price_trailing: 42 }).catch(done)
    assert(_isUndefined(o.price_trailing))
    assert.strictEqual(o.priceTrailing, 42)

    assert(o.gid !== 42)
    o.update({ gid: 42 }).catch(done)
    assert.strictEqual(o.gid, 42)

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
        assert.strictEqual(o.test, 42)
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

  it('lev: field is passed into newOrderPacket', () => {
    const o = new Order({
      price: 42,
      amount: 1,
      lev: 100
    })
    assert(o.toNewOrderPacket().lev, 100)
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const o = new Order({
        symbol: 'tBTCUSD',
        amount: 42,
        price: 1,
        type: 'STOP',
        hidden: true,
        postonly: true,
        reduceonly: true
      })

      o.amount = 41
      o.status = 'awesome'

      const str = o.toString()
      assert.ok(/BTC\/USD/.test(str), 'symbol missing')
      assert.ok(/STOP/.test(str), 'type missing')
      assert.ok(/hidden/.test(str), 'hidden flag missing')
      assert.ok(/post-only/.test(str), 'post-only flag missing')
      assert.ok(/reduce-only/.test(str), 'reduce-only flag missing')
      assert.ok(/awesome/.test(str), 'status missing')
      assert.ok(_includes(str, '1'), 'price missing')
      assert.ok(_includes(str, '41'), 'amount missing')
      assert.ok(_includes(str, '42'), 'original amount missing')
    })
  })

  describe('toPreview', () => {
    it('returns a valid preview object for the HF', () => {
      const data = {
        gid: 1,
        cid: 2,
        symbol: 'tBTCUSD',
        amount: 42,
        type: 'LIMIT',
        price: 41,
        notify: false,
        flags: 0
      }

      const o = new Order(data)
      assert.deepStrictEqual(o.toPreview(), data)
    })
  })

  describe('registerListeners', () => {
    it('does nothing if no interface available', () => {
      const o = new Order()

      o.registerListeners({
        onOrderNew: () => assert(false),
        onOrderUpdate: () => assert(false),
        onOrderClose: () => assert(false)
      })
    })

    it('sets up listeners with correct channel filters', () => {
      const o = new Order({
        symbol: 'tBTCUSD',
        id: '1',
        gid: '2',
        cid: '3'
      })

      o.cbGID = () => -1

      const testListener = (chanData, cb) => {
        assert.ok(_isFunction(cb), 'listener was not given cb')
        assert.deepStrictEqual(chanData, {
          symbol: 'tBTCUSD',
          cbGID: -1,
          id: 1,
          gid: 2,
          cid: 3
        }, 'listener was given invalid channel filters')
      }

      o.registerListeners({
        onOrderNew: testListener,
        onOrderUpdate: testListener,
        onOrderClose: testListener
      })
    })
  })

  describe('removeListeners', () => {
    it('calls removeListeners on the interface if provided', (done) => {
      const o = new Order()
      o.cbGID = () => -1
      o.removeListeners({
        removeListeners: (cbGID) => {
          assert.strictEqual(cbGID, -1)
          done()
        }
      })
    })
  })

  describe('cbGID', () => {
    it('includes cid', () => {
      const o = new Order({ cid: 'test' })
      assert.ok(/test/.test(o.cbGID()), 'cid not on callback group ID')
    })

    it('includes gid', () => {
      const o = new Order({ gid: 'test' })
      assert.ok(/test/.test(o.cbGID()), 'gid not on callback group ID')
    })
  })

  describe('submit', () => {
    it('throws an error if no interface provided', (done) => {
      const o = new Order()
      o.submit().catch(() => done())
    })

    it('calls submitOrder on the interface', (done) => {
      const o = new Order()
      o.submit({
        submitOrder: async () => {
          done()
          return []
        }
      })
    })

    it('saves received data on itself', async () => {
      const o = new Order({ symbol: 'tBTCUSD' })
      const remoteO = new Order({ symbol: 'just-testing' })

      await o.submit({
        submitOrder: async () => remoteO.serialize()
      })

      assert.strictEqual(o.symbol, 'just-testing')
    })
  })

  describe('cancel', () => {
    it('throws an error if no interface provided', (done) => {
      const o = new Order({ id: 42 })
      o.cancel().catch(() => done())
    })

    it('throws an error if the order lacks an ID', (done) => {
      const o = new Order()
      o.cancel({
        cancelOrder: async () => {}
      }).catch(() => done())
    })

    it('calls cancelOrder on the interface', (done) => {
      const o = new Order({ id: 42 })
      o.cancel({
        cancelOrder: async (id) => {
          assert.strictEqual(id, 42)
          done()
          return []
        }
      })
    })
  })

  describe('recreate', () => {
    it('throws an error if no interface provided', (done) => {
      const o = new Order({ id: 42 })
      o.recreate().catch(() => done())
    })

    it('throws an error if the order lacks an ID', (done) => {
      const o = new Order()
      o.recreate({
        cancelOrder: async () => {}
      }).catch(() => done())
    })

    it('cancels itself', (done) => {
      const o = new Order({ id: 42 })

      o.cancel = async () => { done() }
      o.submit = async () => {}
      o.recreate({})
    })

    it('clears its ID', async () => {
      const o = new Order({ id: 42 })

      o.cancel = async () => {}
      o.submit = async () => {}

      await o.recreate({})
      assert.ok(!o.id, 'ID not cleared')
    })

    it('submits itself after ID clear', (done) => {
      const o = new Order({ id: 42 })

      o.cancel = async () => {}
      o.submit = async () => {
        assert.ok(!o.id, 'ID not cleared')
        done()
      }

      o.recreate({})
    })
  })

  describe('updateFrom', () => {
    it('throws an error if order IDs and CIDs, or GIDs, do not match', () => {
      const o = new Order({ id: 1, gid: 2, cid: 3 })

      assert.throws(() => o.updateFrom({}))
      assert.throws(() => o.updateFrom({ id: 1 }))
      assert.throws(() => o.updateFrom({ id: 1, cid: 4 }))
      assert.throws(() => o.updateFrom({ gid: 3 }))
    })

    it('does not throw error if IDs and CIDs, or GIDs match', () => {
      const oByCID = new Order({ id: 1, cid: 3 })
      const oByGID = new Order({ gid: 42 })

      oByCID.updateFrom({ id: 1, cid: 3 })
      oByGID.updateFrom({ gid: 42 })
    })

    it('updates properties from the provided order', () => {
      const o = new Order({
        id: 1,
        gid: -1,
        amount: 42,
        status: 'TESTING',
        mtsUpdate: 0,
        priceAvg: 41
      })

      o.updateFrom({
        id: 999,
        gid: -1,
        amount: 41,
        status: 'TESTED',
        mtsUpdate: -1,
        priceAvg: 42
      })

      assert.strictEqual(o.id, 999)
      assert.strictEqual(o.amount, 41)
      assert.strictEqual(o.status, 'TESTED')
      assert.strictEqual(o.mtsUpdate, -1)
      assert.strictEqual(o.priceAvg, 42)
    })
  })

  describe('getLastFillAmount', () => {
    it('returns difference in amount since last update', () => {
      const o = new Order({ gid: 42, amount: 40 })
      o.updateFrom({ gid: 42, amount: 10 })
      assert.strictEqual(o.getLastFillAmount(), 30)
    })
  })

  describe('resetFilledAmount', () => {
    it('clears last fill amount', () => {
      const o = new Order({ gid: 42, amount: 40 })
      o.updateFrom({ gid: 42, amount: 10 })
      o.resetFilledAmount()
      assert.strictEqual(o.getLastFillAmount(), 0)
    })
  })

  describe('getBaseCurrent', () => {
    it('returns the base currency for the order', () => {
      const o = new Order({ symbol: 'tBTCUSD' })
      assert.strictEqual(o.getBaseCurrency(), 'BTC')
    })
  })

  describe('getQuoteCurrency', () => {
    it('returns the base currency for the order', () => {
      const o = new Order({ symbol: 'tBTCUSD' })
      assert.strictEqual(o.getQuoteCurrency(), 'USD')
    })
  })

  describe('getNotionalValue', () => {
    it('returns the nv for the order', () => {
      const o = new Order({ price: 2, amount: 10 })
      assert.strictEqual(o.getNotionalValue(), 20)
    })
  })

  describe('_onWSOrderUpdate', () => {
    it('updates from the provided packet', () => {
      const o = new Order({ symbol: 'tBTCUSD' })
      o._onWSOrderUpdate(new Order({ symbol: 'fUSD' }))
      assert.strictEqual(o.symbol, 'fUSD')
    })

    it('emits an update event', (done) => {
      const o = new Order({ symbol: 'tBTCUSD' })
      o.once('update', () => done())
      o._onWSOrderUpdate(new Order({ symbol: 'fUSD' }))
    })
  })

  describe('_onWSOderClose', () => {
    it('updates from the provided packet', () => {
      const o = new Order({ symbol: 'tBTCUSD' })
      o._onWSOrderClose(new Order({ symbol: 'fUSD' }))
      assert.strictEqual(o.symbol, 'fUSD')
    })

    it('emits an update event', (done) => {
      const o = new Order({ symbol: 'tBTCUSD' })
      o.once('update', () => done())
      o._onWSOrderClose(new Order({ symbol: 'fUSD' }))
    })

    it('emits a close event', (done) => {
      const o = new Order({ symbol: 'tBTCUSD' })
      o.once('close', () => done())
      o._onWSOrderClose(new Order({ symbol: 'fUSD' }))
    })
  })

  describe('static getBaseCurrency', () => {
    it('returns the base currency for an array-format order', () => {
      assert.strictEqual(Order.getBaseCurrency([null, null, null, 'tBTCUSD']), 'BTC')
    })
  })

  describe('static getQuoteCurrency', () => {
    it('returns the quote currency for an array-format order', () => {
      assert.strictEqual(Order.getQuoteCurrency([null, null, null, 'tBTCUSD']), 'USD')
    })
  })
})

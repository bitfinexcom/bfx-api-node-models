'use strict'

const test = require('brittle')
const _isUndefined = require('lodash/isUndefined')
const _includes = require('lodash/includes')
const _isFunction = require('lodash/isFunction')
const { SYMBOLS } = require('bfx-hf-util')
const { Order } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)

test('Order model', async (t) => {
  testModel(t, {
    model: Order,
    boolFields: ['notify', 'hidden'],
    orderedFields: [
      'id', 'gid', 'cid', 'symbol', 'mtsCreate', 'mtsUpdate', 'amount',
      'amountOrig', 'type', 'typePrev', 'mtsTIF', null, 'flags', 'status', null,
      null, 'price', 'priceAvg', 'priceTrailing', 'priceAuxLimit', null, null,
      null, 'notify', 'hidden', 'placedId', null, null, 'routing', null, null, 'meta'
    ]
  })

  testModelValidation(t, {
    model: Order,
    validData: {
      symbol: VALID_SYMBOLS,
      id: [...(new Array(5))].map(() => Math.random()),
      gid: [...(new Array(5))].map(() => Math.random()),
      cid: [...(new Array(5))].map(() => Math.random()),
      mtsCreate: [...(new Array(5))].map(() => Math.random()),
      mtsUpdate: [...(new Array(5))].map(() => Math.random()),
      amount: [...(new Array(5))].map(() => Math.random()),
      amountOrig: [...(new Array(5))].map(() => Math.random()),
      type: Object.values(Order.type),
      typePrev: Object.values(Order.type),
      status: Object.values(Order.type), // get some data
      mtsTIF: [...(new Array(5))].map(() => Math.random()),
      flags: [...(new Array(5))].map(() => Math.random()),
      price: [...(new Array(5))].map(() => Math.random()),
      priceAvg: [...(new Array(5))].map(() => Math.random()),
      priceTrailing: [...(new Array(5))].map(() => Math.random()),
      priceAuxLimit: [...(new Array(5))].map(() => Math.random()),
      notify: [...(new Array(5))].map(() => Math.random() > 0.5),
      hidden: [...(new Array(5))].map(() => Math.random() > 0.5),
      placedId: [...(new Array(5))].map(() => Math.random())
    }
  })

  await t.test('toNewOrderPacket: uses correct values', (t) => {
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

    t.is(p.constructor.name, 'Object')
    t.ok(!p.id)
    t.is(p.gid, 2)
    t.is(p.cid, 3)
    t.is(p.symbol, 'tBTCUSD')
    t.is(p.type, 'EXCHANGE LIMIT')
    t.is(p.price_trailing, '0.10000')
    t.is(p.price_aux_limit, '0.20000')
    t.is(p.price, '0.30000')
    t.is(p.amount, '0.40000000')
    t.ok(!(p.flags & Order.flags.OCO))
    t.ok(!(p.flags & Order.flags.HIDDEN))
    t.ok(!(p.flags & Order.flags.POSTONLY))
    t.is(p.meta.aff_code, 'insert some unique/thoughtful comment here')

    o.setHidden(true)
    p = o.toNewOrderPacket()
    t.ok(p.flags & Order.flags.HIDDEN)
    t.ok(!(p.flags & Order.flags.OCO))
    t.ok(!(p.flags & Order.flags.POSTONLY))
    o.setHidden(false)

    o.setPostOnly(true)
    p = o.toNewOrderPacket()
    t.ok(p.flags & Order.flags.POSTONLY)
    t.ok(!(p.flags & Order.flags.OCO))
    t.ok(!(p.flags & Order.flags.HIDDEN))
    o.setPostOnly(false)

    o.setOCO(true)
    p = o.toNewOrderPacket()
    t.ok(p.flags & Order.flags.OCO)
    t.ok(!(p.flags & Order.flags.HIDDEN))
    t.ok(!(p.flags & Order.flags.POSTONLY))
    o.setOCO(false)

    // Just to make sure...
    o.setOCO(true)
    o.setHidden(true)
    o.setPostOnly(true)
    p = o.toNewOrderPacket()

    t.ok(p.flags & Order.flags.OCO)
    t.ok(p.flags & Order.flags.HIDDEN)
    t.ok(p.flags & Order.flags.POSTONLY)
  })

  await t.test('constructor: sets flags based on bool flag keys', (t) => {
    const oHidden = new Order({ hidden: true })
    const oPostOnly = new Order({ postonly: true })
    const oOCO = new Order({ oco: true, priceAuxLimit: 42 })

    t.ok(oHidden.isHidden())
    t.ok(!oHidden.isPostOnly())
    t.ok(!oHidden.isOCO())
    t.ok(oHidden.flags & Order.flags.HIDDEN)
    t.ok(!(oHidden.flags & Order.flags.POSTONLY))
    t.ok(!(oHidden.flags & Order.flags.OCO))

    t.ok(oPostOnly.isPostOnly())
    t.ok(!oPostOnly.isHidden())
    t.ok(!oPostOnly.isOCO())
    t.ok(oPostOnly.flags & Order.flags.POSTONLY)
    t.ok(!(oPostOnly.flags & Order.flags.HIDDEN))
    t.ok(!(oPostOnly.flags & Order.flags.OCO))

    t.ok(oOCO.isOCO())
    t.ok(!oOCO.isHidden())
    t.ok(!oOCO.isPostOnly())
    t.ok(oOCO.flags & Order.flags.OCO)
    t.ok(!(oOCO.flags & Order.flags.HIDDEN))
    t.ok(!(oOCO.flags & Order.flags.POSTONLY))
    t.is(oOCO.priceAuxLimit, 42)
  })

  await t.test('isOCO, setOCO: updates/reads OCO flag & price', (t) => {
    const o = new Order()

    t.ok(!o.isOCO())
    o.setOCO(true, 42)
    t.ok(o.isOCO())
    t.is(o.priceAuxLimit, 42)

    o.setOCO(false)
    t.ok(!o.isOCO())

    o.setOCO(true)
    t.ok(o.isOCO())
  })

  await t.test('isHidden, setHidden: updates/reads hidden flag', (t) => {
    const o = new Order()
    t.ok(!o.isHidden())
    o.setHidden(true)
    t.ok(o.isHidden())

    o.setHidden(false)
    t.ok(!o.isHidden())

    o.setHidden(true)
    t.ok(o.isHidden())
  })

  await t.test('isVisibleOnHit, setVisibleOnHit: updates/reads if the hidden orders are visible on hit or not', (t) => {
    const o = new Order()
    t.ok(!o.isHidden())
    t.ok(!o.isVisibleOnHit())

    o.setVisibleOnHit(true)
    t.ok(!o.isVisibleOnHit())

    o.setHidden(true)
    o.setVisibleOnHit(true)
    t.ok(o.isVisibleOnHit())

    o.setHidden(false)
    t.ok(!o.isHidden())
    t.ok(!o.isVisibleOnHit())
  })

  await t.test('isPostOnly, setPostOnly: updates/reads postonly flag', (t) => {
    const o = new Order()
    t.ok(!o.isPostOnly())
    o.setPostOnly(true)
    t.ok(o.isPostOnly())

    o.setPostOnly(false)
    t.ok(!o.isPostOnly())

    o.setPostOnly(true)
    t.ok(o.isPostOnly())
  })

  await t.test('includesVariableRates, setVariableRates: updates/reads NO_VR flag', (t) => {
    const o = new Order()
    t.ok(o.includesVariableRates())
    o.setNoVariableRates(true)
    t.ok(!o.includesVariableRates())

    o.setNoVariableRates(false)
    t.ok(o.includesVariableRates())

    o.setNoVariableRates(true)
    t.ok(!o.includesVariableRates())
  })

  await t.test('isPositionClose, setPositionClose: updates/reads posclose flag', (t) => {
    const o = new Order()
    t.ok(!o.isPositionClose())
    o.setPositionClose(true)
    t.ok(o.isPositionClose())

    o.setPositionClose(false)
    t.ok(!o.isPositionClose())

    o.setPositionClose(true)
    t.ok(o.isPositionClose())
  })

  await t.test('isReduceOnly, setReduceOnly: updates/reads reduceOnly flag', (t) => {
    const o = new Order()
    t.ok(!o.isReduceOnly())
    o.setReduceOnly(true)
    t.ok(o.isReduceOnly())

    o.setReduceOnly(false)
    t.ok(!o.isReduceOnly())

    o.setReduceOnly(true)
    t.ok(o.isReduceOnly())
  })

  await t.test('update: applies changeset to order model', (t) => {
    const o = new Order({ price: 42, amount: 1 }, { updateOrder: () => Promise.resolve() })
    t.is(o.price, 42)
    t.is(o.amount, 1)

    o.update({ delta: 1, price: 43 }).catch((err) => t.fail(String(err)))

    t.is(o.price, 43)
    t.is(o.amount, 2)

    t.ok(_isUndefined(o.priceAuxLimit))
    o.update({ price_aux_limit: 42 }).catch((err) => t.fail(String(err)))
    t.ok(_isUndefined(o.price_aux_limit))
    t.is(o.priceAuxLimit, 42)

    t.ok(_isUndefined(o.priceTrailing))
    o.update({ price_trailing: 42 }).catch((err) => t.fail(String(err)))
    t.ok(_isUndefined(o.price_trailing))
    t.is(o.priceTrailing, 42)

    t.ok(o.gid !== 42)
    o.update({ gid: 42 }).catch((err) => t.fail(String(err)))
    t.is(o.gid, 42)
  })

  await t.test('update: prepares price & amount', (t) => {
    t.plan(2)
    const o = new Order({
      price: 42,
      amount: 1
    }, {
      updateOrder: (changes) => {
        t.is(changes.price, '43.000')
        t.is(changes.amount, '3.00000000')
      }
    })

    o.update({ price: 43, amount: 3 })
  })

  await t.test('update: prepares delta', (t) => {
    t.plan(1)
    const o = new Order({
      price: 42,
      amount: 1
    }, {
      updateOrder: (changes) => {
        t.is(changes.delta, '3.00000000')
      }
    })

    o.update({ delta: 3 })
  })

  await t.test('update: prepares aux limit price', (t) => {
    t.plan(1)
    const o = new Order({
      price: 42,
      amount: 1
    }, {
      updateOrder: (changes) => {
        t.is(changes.price_aux_limit, '3.0000')
      }
    })

    o.update({ price_aux_limit: 3 })
  })

  await t.test('update: prepares trailing price', (t) => {
    t.plan(1)
    const o = new Order({
      price: 42,
      amount: 1
    }, {
      updateOrder: (changes) => {
        t.is(changes.price_trailing, '43.000')
      }
    })

    o.update({ price_trailing: 43 })
  })

  await t.test('update: rejects with error if applying delta to missing amount', async (t) => {
    const o = new Order()

    await t.exception.all(o.update({ delta: 1 }))
  })

  await t.test('update: forwards update to ws2', (t) => {
    t.plan(2)
    const o = new Order({}, { // dirty ws2 mock
      updateOrder: (o) => {
        t.ok(o)
        t.is(o.test, 42)
      }
    })

    o.update({ test: 42 }).catch((err) => t.fail(String(err)))
  })

  await t.test('isPartiallyFilled: returns true if the order is partially filled', (t) => {
    t.ok(new Order({ amount: 5, amountOrig: 25 }).isPartiallyFilled())
    t.ok(!new Order({ amount: 0, amountOrig: 25 }).isPartiallyFilled())
    t.ok(!new Order({ amount: 25, amountOrig: 25 }).isPartiallyFilled())
  })

  await t.test('lev: field is passed into newOrderPacket', (t) => {
    const o = new Order({
      price: 42,
      amount: 1,
      lev: 100
    })
    t.ok(o.toNewOrderPacket().lev, 100)
  })

  await t.test('toString', (t) => {
    t.test('includes pertinent information', (t) => {
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
      t.ok(/BTC\/USD/.test(str), 'symbol missing')
      t.ok(/STOP/.test(str), 'type missing')
      t.ok(/hidden/.test(str), 'hidden flag missing')
      t.ok(/post-only/.test(str), 'post-only flag missing')
      t.ok(/reduce-only/.test(str), 'reduce-only flag missing')
      t.ok(/awesome/.test(str), 'status missing')
      t.ok(_includes(str, '1'), 'price missing')
      t.ok(_includes(str, '41'), 'amount missing')
      t.ok(_includes(str, '42'), 'original amount missing')
    })
  })

  await t.test('toPreview', (t) => {
    t.test('returns a valid preview object for the HF', (t) => {
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
      t.alike(o.toPreview(), data)
    })
  })

  await t.test('registerListeners', (t) => {
    t.test('does nothing if no interface available', (t) => {
      const o = new Order()

      o.registerListeners({
        onOrderNew: () => t.ok(false),
        onOrderUpdate: () => t.ok(false),
        onOrderClose: () => t.ok(false)
      })
    })

    t.test('sets up listeners with correct channel filters', (t) => {
      const o = new Order({
        symbol: 'tBTCUSD',
        id: '1',
        gid: '2',
        cid: '3'
      })

      o.cbGID = () => -1

      const testListener = (chanData, cb) => {
        t.ok(_isFunction(cb), 'listener was not given cb')
        t.alike(chanData, {
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

  await t.test('removeListeners', async (t) => {
    await t.test('calls removeListeners on the interface if provided', (t) => {
      t.plan(1)
      const o = new Order()
      o.cbGID = () => -1
      o.removeListeners({
        removeListeners: (cbGID) => {
          t.is(cbGID, -1)
        }
      })
    })
  })

  await t.test('cbGID', (t) => {
    t.test('includes cid', (t) => {
      const o = new Order({ cid: 'test' })
      t.ok(/test/.test(o.cbGID()), 'cid not on callback group ID')
    })

    t.test('includes gid', (t) => {
      const o = new Order({ gid: 'test' })
      t.ok(/test/.test(o.cbGID()), 'gid not on callback group ID')
    })
  })

  await t.test('submit', async (t) => {
    await t.test('throws an error if no interface provided', async (t) => {
      const o = new Order()
      await t.exception.all(o.submit())
    })

    await t.test('calls submitOrder on the interface', (t) => {
      t.plan(1)
      const o = new Order()
      o.submit({
        submitOrder: async () => {
          t.pass()
          return []
        }
      })
    })

    await t.test('saves received data on itself', async (t) => {
      const o = new Order({ symbol: 'tBTCUSD' })
      const remoteO = new Order({ symbol: 'just-testing' })

      await o.submit({
        submitOrder: async () => remoteO.serialize()
      })

      t.is(o.symbol, 'just-testing')
    })
  })

  await t.test('cancel', async (t) => {
    await t.test('throws an error if no interface provided', async (t) => {
      const o = new Order({ id: 42 })
      await t.exception.all(o.cancel())
    })

    await t.test('throws an error if the order lacks an ID', async (t) => {
      const o = new Order()
      await t.exception.all(o.cancel({
        cancelOrder: async () => {}
      }))
    })

    await t.test('calls cancelOrder on the interface', (t) => {
      t.plan(1)
      const o = new Order({ id: 42 })
      o.cancel({
        cancelOrder: async ({ id }) => {
          t.is(id, 42)
          return []
        }
      })
    })
  })

  await t.test('recreate', async (t) => {
    await t.test('throws an error if no interface provided', async (t) => {
      const o = new Order({ id: 42 })
      await t.exception.all(o.recreate())
    })

    await t.test('throws an error if the order lacks an ID', async (t) => {
      const o = new Order()
      await t.exception.all(o.recreate({
        cancelOrder: async () => {}
      }))
    })

    await t.test('cancels itself', (t) => {
      t.plan(1)
      const o = new Order({ id: 42 })

      o.cancel = async () => { t.pass() }
      o.submit = async () => {}
      o.recreate({})
    })

    await t.test('clears its ID', async (t) => {
      const o = new Order({ id: 42 })

      o.cancel = async () => {}
      o.submit = async () => {}

      await o.recreate({})
      t.ok(!o.id, 'ID not cleared')
    })

    await t.test('submits itself after ID clear', (t) => {
      t.plan(1)
      const o = new Order({ id: 42 })

      o.cancel = async () => {}
      o.submit = async () => {
        t.ok(!o.id, 'ID not cleared')
      }

      o.recreate({})
    })
  })

  await t.test('updateFrom', (t) => {
    t.test('throws an error if order IDs and CIDs, or GIDs, do not match', (t) => {
      const o = new Order({ id: 1, gid: 2, cid: 3 })

      t.exception.all(() => o.updateFrom({}))
      t.exception.all(() => o.updateFrom({ id: 1 }))
      t.exception.all(() => o.updateFrom({ id: 1, cid: 4 }))
      t.exception.all(() => o.updateFrom({ gid: 3 }))
    })

    t.test('does not throw error if IDs and CIDs, or GIDs match', (t) => {
      const oByCID = new Order({ id: 1, cid: 3 })
      const oByGID = new Order({ gid: 42 })

      oByCID.updateFrom({ id: 1, cid: 3 })
      oByGID.updateFrom({ gid: 42 })
    })

    t.test('updates properties from the provided order', (t) => {
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

      t.is(o.id, 999)
      t.is(o.amount, 41)
      t.is(o.status, 'TESTED')
      t.is(o.mtsUpdate, -1)
      t.is(o.priceAvg, 42)
    })
  })

  await t.test('getLastFillAmount', (t) => {
    t.test('returns difference in amount since last update', (t) => {
      const o = new Order({ gid: 42, amount: 40 })
      o.updateFrom({ gid: 42, amount: 10 })
      t.is(o.getLastFillAmount(), 30)
    })
  })

  await t.test('resetFilledAmount', (t) => {
    t.test('clears last fill amount', (t) => {
      const o = new Order({ gid: 42, amount: 40 })
      o.updateFrom({ gid: 42, amount: 10 })
      o.resetFilledAmount()
      t.is(o.getLastFillAmount(), 0)
    })
  })

  await t.test('getBaseCurrent', (t) => {
    t.test('returns the base currency for the order', (t) => {
      const o = new Order({ symbol: 'tBTCUSD' })
      t.is(o.getBaseCurrency(), 'BTC')
    })
  })

  await t.test('getQuoteCurrency', (t) => {
    t.test('returns the base currency for the order', (t) => {
      const o = new Order({ symbol: 'tBTCUSD' })
      t.is(o.getQuoteCurrency(), 'USD')
    })
  })

  await t.test('getNotionalValue', (t) => {
    t.test('returns the nv for the order', (t) => {
      const o = new Order({ price: 2, amount: 10 })
      t.is(o.getNotionalValue(), 20)
    })
  })

  await t.test('_onWSOrderUpdate', async (t) => {
    await t.test('updates from the provided packet', (t) => {
      const o = new Order({ symbol: 'tBTCUSD' })
      o._onWSOrderUpdate(new Order({ symbol: 'fUSD' }))
      t.is(o.symbol, 'fUSD')
    })

    await t.test('emits an update event', (t) => {
      t.plan(1)
      const o = new Order({ symbol: 'tBTCUSD' })
      o.once('update', () => t.pass())
      o._onWSOrderUpdate(new Order({ symbol: 'fUSD' }))
    })
  })

  await t.test('_onWSOderClose', async (t) => {
    await t.test('updates from the provided packet', (t) => {
      const o = new Order({ symbol: 'tBTCUSD' })
      o._onWSOrderClose(new Order({ symbol: 'fUSD' }))
      t.is(o.symbol, 'fUSD')
    })

    await t.test('emits an update event', (t) => {
      t.plan(1)
      const o = new Order({ symbol: 'tBTCUSD' })
      o.once('update', () => t.pass())
      o._onWSOrderClose(new Order({ symbol: 'fUSD' }))
    })

    await t.test('emits a close event', (t) => {
      t.plan(1)
      const o = new Order({ symbol: 'tBTCUSD' })
      o.once('close', () => t.pass())
      o._onWSOrderClose(new Order({ symbol: 'fUSD' }))
    })
  })

  await t.test('static getBaseCurrency', (t) => {
    t.test('returns the base currency for an array-format order', (t) => {
      t.is(Order.getBaseCurrency([null, null, null, 'tBTCUSD']), 'BTC')
    })
  })

  await t.test('static getQuoteCurrency', (t) => {
    t.test('returns the quote currency for an array-format order', (t) => {
      t.is(Order.getQuoteCurrency([null, null, null, 'tBTCUSD']), 'USD')
    })
  })
})

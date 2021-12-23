'use strict'

const Promise = require('bluebird')
const _keys = require('lodash/keys')
const _isFinite = require('lodash/isFinite')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const _compact = require('lodash/compact')
const _flatten = require('lodash/flatten')
const _includes = require('lodash/includes')
const _isBoolean = require('lodash/isBoolean')
const _isUndefined = require('lodash/isUndefined')
const { prepareAmount, preparePrice } = require('bfx-api-node-util')

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const stringValidator = require('./validators/string')
const boolValidator = require('./validators/bool')
const priceValidator = require('./validators/price')
const symbolValidator = require('./validators/symbol')
const Model = require('./model')

const statuses = ['ACTIVE', 'EXECUTED', 'PARTIALLY FILLED', 'CANCELED']
const types = [
  'MARKET', 'EXCHANGE MARKET', 'LIMIT', 'EXCHANGE LIMIT', 'STOP',
  'EXCHANGE STOP', 'TRAILING STOP', 'EXCHANGE TRAILING STOP', 'FOK',
  'EXCHANGE FOK', 'STOP LIMIT', 'EXCHANGE STOP LIMIT'
]

const boolFields = ['notify']
const fields = {
  id: 0,
  gid: 1,
  cid: 2,
  symbol: 3,
  mtsCreate: 4,
  mtsUpdate: 5,
  amount: 6,
  amountOrig: 7,
  type: 8,
  typePrev: 9,
  mtsTIF: 10,
  // placeholder
  // placeholder
  flags: 12,
  status: 13,
  // placeholder
  // placeholder
  price: 16,
  priceAvg: 17,
  priceTrailing: 18,
  priceAuxLimit: 19,
  // placeholder
  // placeholder
  // placeholder
  notify: 23,
  hidden: 24,
  placedId: 25,
  // placeholder
  // placeholder
  routing: 28,
  // placeholder
  // placeholder
  meta: 31
}

let lastCID = Date.now()

/**
 * High level order model; provides methods for execution & can stay updated via
 * a WSv2 connection or used to execute as a rest payload
 */
class Order extends Model {
  /**
   * @param {object|Array} data - order data
   * @param {number} data.id - ID
   * @param {number} data.gid - group ID
   * @param {number} data.cid - client ID
   * @param {string} data.symbol - symbol
   * @param {number} data.mtsCreate - creation timestamp
   * @param {number} data.mtsUpdate - last update timestamp
   * @param {string} data.amount - remaining order amount
   * @param {string} data.amountOrig - original/initial order amount
   * @param {string} data.type - order type (i.e. 'EXCHANGE LIMIT')
   * @param {string} data.typePrev - previous order type, if any
   * @param {number} [data.mtsTIF] - TIF timestamp, if set
   * @param {number} data.flags - order flags
   * @param {string} data.status - current order status
   * @param {string} data.price - order price
   * @param {string} data.priceAvg - average execution price
   * @param {string} [data.priceTrailing] - trailing distance for TRAILING STOP orders
   * @param {string} [data.priceAuxLimit] - stop price for STOP LIMIT and OCO orders
   * @param {number|boolean} [data.notify] - notify flag
   * @param {number} [data.placedId] - placed ID
   * @param {string} [data.affiliateCode] - affiliate code
   * @param {number} [data.lev] - leverage
   * @param {object} [apiInterface] - saved for a later call to registerListeners()
   */
  constructor (data = {}, apiInterface) {
    super({ data, fields, boolFields })

    if (!this.flags) this.flags = 0
    if (!_isUndefined(data.hidden)) this.setHidden(data.hidden)
    if (!_isUndefined(data.visibleOnHit)) this.setVisibleOnHit(data.visibleOnHit)
    if (!_isUndefined(data.postonly)) this.setPostOnly(data.postonly)
    if (!_isUndefined(data.reduceonly)) this.setReduceOnly(data.reduceonly)
    if (!_isUndefined(data.oco)) {
      this.setOCO(data.oco, data.priceAuxLimit, data.cidOCO)
    }

    this.lev = data.lev
    this.affiliateCode = data.affiliateCode
    this._apiInterface = apiInterface

    this._onWSOrderNew = this._onWSOrderNew.bind(this)
    this._onWSOrderUpdate = this._onWSOrderUpdate.bind(this)
    this._onWSOrderClose = this._onWSOrderClose.bind(this)

    if (isNaN(this.amountOrig) && !isNaN(this.amount)) {
      this.amountOrig = this.amount
    }

    this._lastAmount = this.amount
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields, boolFields })
  }

  /**
   * Returns a string representation of the order
   *
   * TODO: add verbose option to log all order information (TIF, etc)
   *
   * @returns {string} str
   */
  toString () {
    const {
      type = '', symbol = '', amount, price, affiliateCode, priceAuxLimit,
      amountOrig, status, id, cid
    } = this

    const market = `${symbol.substring(1, 4)}/${symbol.substring(4)}`

    return _compact(_flatten([
      id && `(id: ${id})`,
      cid && `(cid: ${cid})`,
      type.toUpperCase(),
      'order on',
      market,
      !_isEmpty(status) && `(${status})`,
      'for',
      prepareAmount(amount),
      (amountOrig !== amount) && `(${prepareAmount(amountOrig)})`,
      '@',
      /market/.test(type.toLowerCase()) ? 'MARKET' : preparePrice(price),

      this.isHidden() && 'hidden',
      this.isVisibleOnHit() && 'visible-on-hit',
      this.isPostOnly() && 'post-only',
      this.isReduceOnly() && 'reduce-only',
      this.isPositionClose() && 'pos-close',
      this.isOCO() && ['OCO', `(stop: ${priceAuxLimit})`],
      !this.includesVariableRates() && 'No VRR',
      affiliateCode && `[aff-code: ${affiliateCode}]`
    ])).join(' ')
  }

  /**
   * @returns {boolean} oco
   */
  isOCO () {
    return !!(this.flags & Order.flags.OCO)
  }

  /**
   * @returns {boolean} hidden
   */
  isHidden () {
    return !!(this.flags & Order.flags.HIDDEN)
  }

  /**
   * @returns {boolean} visibleOnHit
   */
  isVisibleOnHit () {
    return !!(this.isHidden() && this.meta && this.meta.make_visible)
  }

  /**
   * @returns {boolean} postonly
   */
  isPostOnly () {
    return !!(this.flags & Order.flags.POSTONLY)
  }

  /**
   * @returns {boolean} includesVR
   */
  includesVariableRates () {
    return !(this.flags & Order.flags.NO_VR)
  }

  /**
   * @returns {boolean} posclose
   */
  isPositionClose () {
    return !!(this.flags & Order.flags.POS_CLOSE)
  }

  /**
   * @returns {boolean} reduceonly
   */
  isReduceOnly () {
    return !!(this.flags & Order.flags.REDUCE_ONLY)
  }

  /**
   * Set the OCO flag and optionally update the stop price and OCO client ID.
   *
   * @param {boolean} v - flag value
   * @param {number} [stopPrice] - optional, defaults to current value
   * @param {number} [cidOCO] - optional, defaults to current value
   * @returns {number} finalFlags
   */
  setOCO (v, stopPrice = this.priceAuxLimit, cidOCO = this.cidOCO) {
    if (v) {
      this.priceAuxLimit = stopPrice
      this.cidOCO = cidOCO
    }

    return this.modifyFlag(Order.flags.OCO, v)
  }

  /**
   * Update the hidden flag value. If hidden and the order is inserted into
   * the order book, it will not be shown to other users or available via the
   * API.
   *
   * @param {boolean} v - flag value
   * @returns {number} finalFlags
   */
  setHidden (v) {
    if (!v && this.meta) {
      delete this.meta.make_visible
    }
    return this.modifyFlag(Order.flags.HIDDEN, v)
  }

  /**
   * Update the meta object. The rest part of the hidden order will be visible
   * after first hit(partial execution).
   *
   * @param {boolean} v - visibleOnHit value
   * @returns {number} meta
   */
  setVisibleOnHit (v) {
    if (!this.isHidden() || !_isBoolean(v)) {
      return
    }

    this.meta = {
      ...(this.meta || {}),
      make_visible: +v
    }

    return this.meta
  }

  /**
   * Update the post-only flag value. If post-only and the order would
   * immediately fill, the order is automatically cancelled.
   *
   * @param {boolean} v - flag value
   * @returns {number} finalFlags
   */
  setPostOnly (v) {
    return this.modifyFlag(Order.flags.POSTONLY, v)
  }

  /**
   * Update the no-variable-rates flag value. Limits orders on margin from
   * taking funding with variable rates.
   *
   * @param {boolean} v - flag value
   * @returns {number} finalFlags
   */
  setNoVariableRates (v) {
    return this.modifyFlag(Order.flags.NO_VR, v)
  }

  /**
   * Update the position-close flag value. If set, the order is cancelled if it
   * would not close an open position.
   *
   * @param {boolean} v - flag value
   * @returns {number} finalFlags
   */
  setPositionClose (v) {
    return this.modifyFlag(Order.flags.POS_CLOSE, v)
  }

  /**
   * Update the reduce-only flag. If set and the order would open a new
   * position, or increase the size of an existing position, it is
   * automatically cancelled.
   *
   * @param {boolean} v - flag value
   * @returns {number} finalFlags
   */
  setReduceOnly (v) {
    return this.modifyFlag(Order.flags.REDUCE_ONLY, v)
  }

  /**
   * Updates a specific flag
   *
   * @param {number} flag - flag value
   * @param {boolean} active - active status
   * @returns {number} finalFlags
   */
  modifyFlag (flag, active) {
    if (!!(this.flags & flag) === active) {
      return
    }

    this.flags += active ? flag : -flag

    return this.flags
  }

  /**
   * Send an order update packet to the WS server, and update local state. This
   * updates the order atomically without changing its position in the queue for
   * its price level.
   *
   * Rejects with an error if an attempt is made to apply a delta to a missing
   * amount.
   *
   * @param {object} changes - changeset to apply to this order
   * @param {WSv2|RESTv2} [apiInterface] - optional ws or rest, defaults to internal instance
   * @returns {Promise} p - resolves on ws2 confirmation or rest response
   * @example
   * const ws = new WSv2({ ... })
   *
   * await ws.open()
   * await ws.auth()
   *
   * const o = new Order({ ... }, ws)
   *
   * await o.submit()
   * await o.update({ price: '2.0' }) // update price
   * await o.update({ delta: '18.0' }) // update amount with delta
   *
   * console.log(o.toString()))  // inspect order
   */
  async update (changes = {}, apiInterface = this._apiInterface) {
    if (!apiInterface) {
      throw new Error('no ws client available')
    }

    const keys = Object.keys(changes)

    // Apply change locally
    keys.forEach(k => {
      if (k === 'id') return

      if (_includes(_keys(this._fields), k)) {
        this[k] = changes[k]
      } else if (k === 'price_trailing') {
        this.priceTrailing = Number(changes[k])
      } else if (k === 'price_oco_stop' || k === 'price_aux_limit') {
        this.priceAuxLimit = Number(changes[k])
      } else if (k === 'delta' && !Number.isNaN(+changes[k])) {
        if (!Number.isNaN(+this.amount)) {
          this.amount += Number(changes[k])
          this._lastAmount = this.amount // update last amount for fill calcs
        } else {
          return Promise.reject(new Error('can\'t apply delta to missing amount'))
        }
      }
    })

    changes.id = this.id // tag with ID

    if (changes.price) changes.price = preparePrice(changes.price)
    if (changes.amount) changes.amount = prepareAmount(changes.amount)
    if (changes.delta) changes.delta = prepareAmount(changes.delta)
    if (changes.price_aux_limit) {
      changes.price_aux_limit = preparePrice(changes.price_aux_limit)
    }

    if (changes.price_trailing) {
      changes.price_trailing = preparePrice(changes.price_trailing)
    }

    return apiInterface.updateOrder(changes)
  }

  /**
   * Returns a POJO that can be used as a preview order in Honey Framework
   * algorithmic orders.
   *
   * @returns {object} preview
   */
  toPreview () {
    const prev = {
      gid: this.gid,
      cid: this.cid,
      symbol: this.symbol,
      amount: this.amount,
      type: this.type,
      price: this.price,
      notify: this.notify,
      flags: this.flags
    }
    if (!Number.isNaN(+this.lev)) {
      prev.lev = +this.lev
    }
    return prev
  }

  /**
   * Registers for updates/persistence on the specified ws2 instance.
   *
   * @param {object} apiInterface - optional, defaults to internal ws
   */
  registerListeners (apiInterface = this._apiInterface) {
    if (!apiInterface || apiInterface.constructor.name !== 'WSv2') return

    const chanData = {
      symbol: this.symbol,
      cbGID: this.cbGID()
    }

    if (_isFinite(+this.id)) chanData.id = +this.id
    if (_isFinite(+this.gid)) chanData.gid = +this.gid
    if (_isFinite(+this.cid)) chanData.cid = +this.cid

    apiInterface.onOrderNew(chanData, this._onWSOrderNew)
    apiInterface.onOrderUpdate(chanData, this._onWSOrderUpdate)
    apiInterface.onOrderClose(chanData, this._onWSOrderClose)

    this._apiInterface = apiInterface
  }

  /**
   * Removes update listeners from the specified ws2 instance.
   * Will fail if rest interface is provided.
   *
   * @param {WSv2|RESTv2} apiInterface - optional ws defaults to internal ws
   */
  removeListeners (apiInterface = this._apiInterface) {
    if (apiInterface) {
      apiInterface.removeListeners(this.cbGID())
    }
  }

  /**
   * Return the callback group ID for the order, used to bind listeners on
   * an API interface.
   *
   * @returns {string} cbGID
   */
  cbGID () {
    return `${this.gid}.${this.cid}`
  }

  /**
   * Submit the order
   *
   * @param {WSv2|Rest2} apiInterface - optional ws or rest, defaults to internal ws
   * @returns {Promise} p
   */
  async submit (apiInterface = this._apiInterface) {
    if (!apiInterface) {
      throw new Error('no API interface provided')
    }

    const orderArr = await apiInterface.submitOrder(this)
    Object.assign(this, Order.unserialize(orderArr))
    return this
  }

  /**
   * Cancel the order if open
   *
   * @param {WSv2|Rest2} apiInterface - optional ws or rest, defaults to internal ws
   * @returns {Promise} p
   */
  async cancel (apiInterface = this._apiInterface) {
    if (!apiInterface) throw new Error('no API interface provided')
    if (!this.id) throw new Error('order has no ID')

    return apiInterface.cancelOrder(this.id)
  }

  /**
   * Equivalent to calling cancel() followed by submit()
   *
   * @param {WSv2|RESTv2} apiInterface - optional ws or rest, defaults to internal ws
   * @returns {Promise} p
   */
  async recreate (apiInterface = this._apiInterface) {
    if (!apiInterface) throw new Error('no API interface provided')
    if (!this.id) throw new Error('order has no ID')

    await this.cancel(apiInterface)

    this.id = null

    return this.submit(apiInterface)
  }

  /**
   * Updates order information from the provided order.
   *
   * @param {Order} order - order to update from
   * @throws Error if the order ID/CID/GID do not match
   */
  updateFrom (order = {}) {
    const { id, gid, cid } = order

    if (
      (
        (this.id && (+id !== +this.id)) && (this.cid && (+cid !== +this.cid))
      ) ||
      (this.gid && (+gid !== +this.gid))
    ) {
      throw new Error('order IDs do not match, cannot update from order')
    }

    this.id = order.id
    this.amount = order.amount
    this.status = order.status
    this.mtsUpdate = order.mtsUpdate
    this.priceAvg = order.priceAvg
  }

  /**
   * Query the amount that was filled on the last order update
   *
   * @returns {number} amount
   */
  getLastFillAmount () {
    return this._lastAmount - this.amount
  }

  /**
   * Resets the last amount, so getLastFillAmount() returns 0
   *
   * @see Order~getLastFillAmount
   * @see Order~isPartiallyFilled
   */
  resetFilledAmount () {
    this._lastAmount = this.amount
  }

  /**
   * Returns the base currency of the order.
   *
   * @returns {string} currency
   */
  getBaseCurrency () {
    return this.symbol.substring(1, 4)
  }

  /**
   * Returns the quote currency of the order.
   *
   * @returns {string} currency
   */
  getQuoteCurrency () {
    return this.symbol.substring(4)
  }

  /**
   * Returns the notional value of the order
   *
   * @returns {number} value
   */
  getNotionalValue () {
    return Math.abs(this.amount * this.price)
  }

  /**
   * Indicates if the order is partially filled, based on the original and
   * current amounts.
   *
   * @see Order~resetFilledAmount
   *
   * @returns {boolean} isPartiallyFilled
   */
  isPartiallyFilled () {
    const a = Math.abs(this.amount)
    return a > 0 && a < Math.abs(this.amountOrig)
  }

  /**
   * @param {Array} order - incoming order
   * @private
   */
  _onWSOrderUpdate (order) {
    Object.assign(this, Order.unserialize(order))

    this.emit('update', order, this)
  }

  /**
   * @param {Array} order - incoming order
   * @private
   */
  _onWSOrderClose (order) {
    Object.assign(this, Order.unserialize(order))

    this.emit('update', order, this)
    this.emit('close', order, this)
  }

  /**
   * @param {Array} order - incoming order
   * @private
   */
  _onWSOrderNew (order) {
    Object.assign(this, Order.unserialize(order))

    this.emit('update', order, this)
    this.emit('new', order, this)
  }

  /**
   * Creates an order map that can be passed to the `on` command.
   *
   * @returns {object} o
   * @example
   * const ws = new WSv2({ apiKey: '...', apiSecret: '...' })
   * await ws.open()
   * await ws.auth()
   *
   * const o = new Order({
   *   type: 'MARKET'
   *   symbol: 'tLEOUSD',
   *   amount: -6,
   * })
   *
   * ws.send([0, 'on', null, o.toNewOrderPacket()])
   */
  toNewOrderPacket () {
    const meta = { ...(this.meta || {}) }

    if (_isString(this.affiliateCode) && !_isEmpty(this.affiliateCode)) {
      meta.aff_code = this.affiliateCode // eslint-disable-line
    }

    const data = {
      gid: this.gid,
      cid: _isFinite(+this.cid) ? +this.cid : lastCID++,
      symbol: this.symbol,
      type: this.type,
      amount: prepareAmount(+this.amount),
      flags: this.flags || 0,
      meta,

      // optional, populated only for new orders; it is mtsTIF for existing orders
      tif: this.tif
    }

    if (!Number.isNaN(+this.price)) {
      data.price = preparePrice(+this.price)
    }

    if (!Number.isNaN(+this.lev)) {
      data.lev = +this.lev
    }

    if (this.priceTrailing !== null && !Number.isNaN(+this.priceTrailing)) {
      data.price_trailing = preparePrice(+this.priceTrailing)
    }

    if (this.priceAuxLimit !== null && !Number.isNaN(+this.priceAuxLimit)) {
      if (this.flags & Order.flags.OCO) {
        data.price_oco_stop = preparePrice(+this.priceAuxLimit)
        data.cid_oco = this.cidOCO
      } else {
        data.price_aux_limit = preparePrice(+this.priceAuxLimit)
      }
    }

    return data
  }

  /**
   * Get the base currency for an order in WSv2 array format.
   *
   * @param {Array} arr - order in ws2 array format
   * @returns {string} currency - base currency from symbol
   */
  static getBaseCurrency (arr = []) {
    return (arr[3] || '').substring(1, 4).toUpperCase()
  }

  /**
   * Get the quote currency for an order in WSv2 array format.
   *
   * @param {Array} arr - order in ws2 array format
   * @returns {string} currency - quote currency from symbol
   */
  static getQuoteCurrency (arr = []) {
    return (arr[3] || '').substring(4).toUpperCase()
  }

  /**
   * Validates a given order instance
   *
   * @param {object[]|object|Order[]|Order|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        symbol: symbolValidator,
        id: numberValidator,
        gid: numberValidator,
        cid: dateValidator,
        mtsCreate: dateValidator,
        mtsUpdate: dateValidator,
        amount: amountValidator,
        amountOrig: amountValidator,
        type: v => stringValidator(v, Object.values(Order.type)),
        typePrev: v => stringValidator(v, Object.values(Order.type)),
        mtsTIF: dateValidator,
        flags: numberValidator,
        status: stringValidator,
        price: priceValidator,
        priceAvg: priceValidator,
        priceTrailing: priceValidator,
        priceAuxLimit: priceValidator,
        notify: boolValidator,
        hidden: boolValidator,
        placedId: numberValidator
      }
    })
  }
}

Order.type = {}
Order.status = {}

statuses.forEach((s) => {
  Order.status[s] = s
  Order.status[s.split(' ').join('_')] = s
})

types.forEach((t) => {
  Order.type[t] = t
  Order.type[t.split(' ').join('_')] = t
})

Order.flags = {
  OCO: 2 ** 14, // 16384
  POSTONLY: 2 ** 12, // 4096
  HIDDEN: 2 ** 6, // 64
  NO_VR: 2 ** 19, // 524288
  POS_CLOSE: 2 ** 9, // 512
  REDUCE_ONLY: 2 ** 10 // 1024
}

module.exports = Order

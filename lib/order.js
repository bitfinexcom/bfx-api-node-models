'use strict'

const Promise = require('bluebird')
const _isFinite = require('lodash/isFinite')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const _filter = require('lodash/filter')
const _flatten = require('lodash/flatten')
const { prepareAmount, preparePrice } = require('bfx-api-node-util')

const Model = require('./model')

const BOOL_FIELDS = ['notify']
const FIELDS = {
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

const FIELD_KEYS = Object.keys(FIELDS)

let lastCID = Date.now()

/**
 * High level order model; provides methods for execution & can stay updated via
 * a WSv2 connection or used to execute as a rest payload
 */
class Order extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {number} data.gid
   * @param {number} data.cid
   * @param {string} data.symbol
   * @param {number} data.mtsCreate
   * @param {number} data.mtsUpdate
   * @param {string} data.amount
   * @param {string} data.amountOrig
   * @param {string} data.type
   * @param {string} data.typePrev
   * @param {number} data.mtsTIF
   * @param {number} data.flags
   * @param {string} data.status
   * @param {string} data.price
   * @param {string} data.priceAvg
   * @param {string} data.priceTrailing
   * @param {string} data.priceAuxLimit
   * @param {number|boolean} data.notify
   * @param {number} data.placedId
   * @param {string?} data.affiliateCode
   * @param {Object?} apiInterface - saved for a later call to registerListeners()
   */
  constructor (data = {}, apiInterface) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)

    if (!this.flags) this.flags = 0
    if (typeof data.hidden !== 'undefined') this.setHidden(data.hidden)
    if (typeof data.postonly !== 'undefined') this.setPostOnly(data.postonly)
    if (typeof data.reduceonly !== 'undefined') this.setReduceOnly(data.reduceonly)
    if (typeof data.oco !== 'undefined') {
      this.setOCO(data.oco, data.priceAuxLimit, data.cidOCO)
    }

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
   * @param {Object|Array} arr
   * @return {Object} pojo
   */
  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  /**
   * Returns a string representation of the order
   * TODO: add verbose option to log all order information (TIF, etc)
   *
   * @return {string} desc
   */
  toString () {
    const {
      type = '', symbol = '', amount, price, affiliateCode, priceAuxLimit,
      amountOrig, status, id, cid
    } = this

    const market = `${symbol.substring(1, 4)}/${symbol.substring(4)}`

    return _filter(_flatten([
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
      this.isPostOnly() && 'post-only',
      this.isReduceOnly() && 'reduce-only',
      this.isPositionClose() && 'pos-close',
      this.isOCO() && ['OCO', `(stop: ${priceAuxLimit})`],
      !this.includesVariableRates() && 'No VRR',
      affiliateCode && `[aff-code: ${affiliateCode}]`
    ]), v => !!v).join(' ')
  }

  /**
   * @return {boolean} oco
   */
  isOCO () {
    return !!(this.flags & Order.flags.OCO)
  }

  /**
   * @return {boolean} hidden
   */
  isHidden () {
    return !!(this.flags & Order.flags.HIDDEN)
  }

  /**
   * @return {boolean} postonly
   */
  isPostOnly () {
    return !!(this.flags & Order.flags.POSTONLY)
  }

  /**
   * @return {boolean} includesVR
   */
  includesVariableRates () {
    return !(this.flags & Order.flags.NO_VR)
  }

  /**
   * @return {boolean} posclose
   */
  isPositionClose () {
    return !!(this.flags & Order.flags.POS_CLOSE)
  }

  /**
   * @return {boolean} reduceonly
   */
  isReduceOnly () {
    return !!(this.flags & Order.flags.REDUCE_ONLY)
  }

  /**
   * @param {boolean} v
   * @param {number?} stopPrice - optional, defaults to current value
   */
  setOCO (v, stopPrice = this.priceAuxLimit, cidOCO = this.cidOCO) {
    if (v) {
      this.priceAuxLimit = stopPrice
      this.cidOCO = cidOCO
    }

    this._modifyFlag(Order.flags.OCO, v)
  }

  /**
   * @param {boolean} v
   */
  setHidden (v) {
    this._modifyFlag(Order.flags.HIDDEN, v)
  }

  /**
   * @param {boolean} v
   */
  setPostOnly (v) {
    this._modifyFlag(Order.flags.POSTONLY, v)
  }

  /**
   * @param {boolean} v
   */
  setNoVariableRates (v) {
    this._modifyFlag(Order.flags.NO_VR, v)
  }

  /**
   * @param {boolean} v
   */
  setPositionClose (v) {
    this._modifyFlag(Order.flags.POS_CLOSE, v)
  }

  /**
   * @param {boolean} v
   */
  setReduceOnly (v) {
    this._modifyFlag(Order.flags.REDUCE_ONLY, v)
  }

  _modifyFlag (flag, active) {
    if (!!(this.flags & flag) === active) return

    this.flags += active ? flag : -flag
  }

  /**
   * Send an order update packet to the WS server, and update local state. This
   * updates the order atomically without changing its position in the queue for
   * its price level.
   *
   * Rejects with an error if an attempt is made to apply a delta to a missing
   * amount.
   *
   * @param {Object} changes
   * @param {WSv2|Rest2} apiInterface - optional ws or rest, defaults to internal instance
   * @return {Promise} p - resolves on ws2 confirmation or rest response
   */
  update (changes = {}, apiInterface = this._apiInterface) {
    const keys = Object.keys(changes)

    // Apply change locally
    keys.forEach(k => {
      if (k === 'id') return

      if (FIELD_KEYS.indexOf(k) !== -1) {
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

    return apiInterface
      ? apiInterface.updateOrder(changes)
      : Promise.reject(new Error('no ws client available'))
  }

  /**
   * @return {Object} preview
   */
  toPreview () {
    return {
      gid: this.gid,
      cid: this.cid,
      symbol: this.symbol,
      amount: this.amount,
      type: this.type,
      price: this.price,
      notify: this.notify,
      flags: this.flags
    }
  }

  /**
   * Registers for updates/persistence on the specified ws2 instance
   *
   * @param {Object} apiInterface - optional, defaults to internal ws
   */
  registerListeners (apiInterface = this._apiInterface) {
    if (!apiInterface) return

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
   * @param {WSv2|Rest2} apiInterface - optional ws defaults to internal ws
   */
  removeListeners (apiInterface = this._apiInterface) {
    if (apiInterface) apiInterface.removeListeners(this.cbGID())
  }

  /**
   * @return {string} cbGID
   */
  cbGID () {
    return `${this.gid}.${this.cid}`
  }

  /**
   * @param {WSv2|Rest2} apiInterface - optional ws or rest, defaults to internal ws
   * @return {Promise} p
   */
  submit (apiInterface = this._apiInterface) {
    if (!apiInterface) return Promise.reject(new Error('no API interface provided'))

    return apiInterface.submitOrder(this).then((orderArr) => {
      Object.assign(this, Order.unserialize(orderArr))
      return this
    })
  }

  /**
   * @param {WSv2|Rest2} apiInterface - optional ws or rest, defaults to internal ws
   * @return {Promise} p
   */
  cancel (apiInterface = this._apiInterface) {
    if (!apiInterface) return Promise.reject(new Error('no API interface provided'))
    if (!this.id) return Promise.reject(new Error('order has no ID'))

    return apiInterface.cancelOrder(this.id)
  }

  /**
   * Equivalent to calling cancel() followed by submit()
   *
   * @param {WSv2|Rest2} apiInterface - optional ws or rest, defaults to internal ws
   * @return {Promise} p
   */
  recreate (apiInterface = this._apiInterface) {
    if (!apiInterface) return Promise.reject(new Error('no API interface provided'))
    if (!this.id) return Promise.reject(new Error('order has no ID'))

    return this.cancel(apiInterface).then(() => {
      this.id = null

      return this.submit(apiInterface)
    })
  }

  /**
   * Updates order information from the provided order. Throws an error if the
   * order ID/CID/GID do not match
   *
   * @param {Order} order
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
   * @return {number} amount
   */
  getLastFillAmount () {
    return this._lastAmount - this.amount
  }

  /**
   * Resets the last amount, so getLastFillAmount() returns 0
   */
  resetFilledAmount () {
    this._lastAmount = this.amount
  }

  /**
   * @return {string} currency
   */
  getBaseCurrency () {
    return this.symbol.substring(1, 4)
  }

  /**
   * @return {string} currency
   */
  getQuoteCurrency () {
    return this.symbol.substring(4)
  }

  /**
   * @return {number} value
   */
  getNotionalValue () {
    return Math.abs(this.amount * this.price)
  }

  /**
   * @return {boolean} isPartiallyFilled
   */
  isPartiallyFilled () {
    const a = Math.abs(this.amount)
    return a > 0 && a < Math.abs(this.amountOrig)
  }

  /**
   * @param {Array} order
   * @private
   */
  _onWSOrderUpdate (order) {
    Object.assign(this, Order.unserialize(order))

    this.emit('update', order, this)
  }

  /**
   * @param {Array} order
   * @private
   */
  _onWSOrderClose (order) {
    Object.assign(this, Order.unserialize(order))

    this.emit('update', order, this)
    this.emit('close', order, this)
  }

  /**
   * @param {Array} order
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
   * @return {Object} o
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
   * @param {Array} arr - order in ws2 array format
   * @return {string} currency - base currency from symbol
   */
  static getBaseCurrency (arr = []) {
    return (arr[3] || '').substring(1, 4).toUpperCase()
  }

  /**
   * @param {Array} arr - order in ws2 array format
   * @return {string} currency - quote currency from symbol
   */
  static getQuoteCurrency (arr = []) {
    return (arr[3] || '').substring(4).toUpperCase()
  }
}

Order.type = {}
Order.status = {}

const statuses = ['ACTIVE', 'EXECUTED', 'PARTIALLY FILLED', 'CANCELED']
const types = [
  'MARKET', 'EXCHANGE MARKET', 'LIMIT', 'EXCHANGE LIMIT', 'STOP',
  'EXCHANGE STOP', 'TRAILING STOP', 'EXCHANGE TRAILING STOP', 'FOK',
  'EXCHANGE FOK', 'STOP LIMIT', 'EXCHANGE STOP LIMIT'
]

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

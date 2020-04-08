'use strict'

const _flatten = require('lodash/flatten')
const _isEmpty = require('lodash/isEmpty')
const _compact = require('lodash/compact')
const { prepareAmount, preparePrice } = require('bfx-api-node-util')

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const boolValidator = require('./validators/bool')
const stringValidator = require('./validators/string')
const symbolValidator = require('./validators/symbol')
const Model = require('./model')

/** @typedef { import("./types/jsdoc/rest2").RESTv2 } RESTv2 */

/**
 * Plain funding offer object used to instantiate model
 *
 * @typedef {object} FundingOfferData
 * @property {number} id - id
 * @property {string} symbol - symbol
 * @property {number} mtsCreate - creation timestamp
 * @property {number} mtsUpdate - last update timestamp
 * @property {string} amount - remaining amount
 * @property {string} amountOrig - original amount
 * @property {string} type - funding offer type
 * @property {number} flags - flags
 * @property {string} status - current status
 * @property {number} rate - rate
 * @property {number} rateReal - rate real
 * @property {number} period - period for the offer
 * @property {number|boolean} notify - notify flag
 * @property {number|boolean} hidden - hidden flag
 * @property {number|boolean} renew - renew flag
 */

/**
 * Funding Offer model
 *
 * @extends Model
 */
class FundingOffer extends Model {
  static type = {
    LEND: 'lend',
    LOAN: 'loan'
  }

  static statuses = ['ACTIVE', 'EXECUTED', 'PARTIALLY FILLED', 'CANCELED'];
  static BOOL_FIELDS = ['notify', 'hidden', 'renew'];
  static FIELD_INDEX_MAPPING = {
    id: 0,
    symbol: 1,
    mtsCreate: 2,
    mtsUpdate: 3,
    amount: 4,
    amountOrig: 5,
    type: 6,
    flags: 9,
    status: 10,
    rate: 14,
    period: 15,
    notify: 16,
    hidden: 17,
    renew: 19,
    rateReal: 20
  }

  /** @type {number} */
  id;

  /** @type {string} */
  symbol;

  /** @type {number} */
  mtsCreate;

  /** @type {number} */
  mtsUpdate;

  /** @type {number} */
  amount;

  /** @type {number} */
  amountOrig;

  /** @type {string} */
  type;

  /** @type {number} */
  flags;

  /** @type {string} */
  status;

  /** @type {number} */
  rate;

  /** @type {number} */
  period;

  /** @type {number|boolean} */
  notify;

  /** @type {number|boolean} */
  hidden;

  /** @type {number|boolean} */
  renew;

  /** @type {number} */
  rateReal;

  /**
   * @param {FundingOfferData|FundingOfferData[]|Array|Array[]} data - funding
   *   offer data, one or multiple in object or array format
   * @param {RESTv2} [apiInterface] - rest or websocket object capable of
   *   submitting funding offers
   */
  constructor (data, apiInterface) {
    const parsedData = {}

    super({
      fields: FundingOffer.FIELD_INDEX_MAPPING,
      boolFields: FundingOffer.BOOL_FIELDS,
      parsedData,
      data
    })

    Model.setParsedProperties(this, parsedData)

    this._apiInterface = apiInterface
  }

  /**
   * @param {Array|Array[]} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: FundingOffer.FIELD_INDEX_MAPPING,
      boolFields: FundingOffer.BOOL_FIELDS,
      data
    })
  }

  /**
   * Creates an order map that can be used in either the websocket `on`
   * command or a rest request body
   *
   * @returns {object} on
   */
  toNewOfferPacket () {
    return {
      type: this.type,
      symbol: this.symbol,
      amount: prepareAmount(+this.amount),
      rate: prepareAmount(+this.rate),
      period: this.period,
      flags: this.flags
    }
  }

  /**
   * Submit the funding offer
   *
   * @param {RESTv2} apiInterface  - optional rest instance
   * @returns {Promise} p
   */
  async submit (apiInterface = this._apiInterface) {
    if (!apiInterface) {
      throw new Error('no API interface provided')
    }

    return apiInterface.submitFundingOffer(this).then((offerArray) => {
      Object.assign(this, FundingOffer.unserialize(offerArray))
      return this
    })
  }

  /**
   * Cancel the funding offer
   *
   * @param {RESTv2} apiInterface  - optional rest instance
   * @returns {Promise} p
   */
  async cancel (apiInterface = this._apiInterface) {
    if (!apiInterface) {
      throw new Error('no API interface provided')
    }

    return apiInterface.cancelFundingOffer(this.id).then((offerArray) => {
      Object.assign(this, FundingOffer.unserialize(offerArray))
      return this
    })
  }

  /**
   * Close the funding offer
   *
   * @param {RESTv2} apiInterface  - optional rest instance
   * @returns {Promise} p
   */
  async close (apiInterface = this._apiInterface) {
    if (!apiInterface) {
      throw new Error('no API interface provided')
    }

    return apiInterface.closeFunding({
      id: this.id,
      type: this.type
    }).then((offerArray) => {
      Object.assign(this, FundingOffer.unserialize(offerArray))
      return this
    })
  }

  /**
   * Returns a string representation of the position
   *
   * @returns {string} desc
   */
  toString () {
    const {
      id, symbol, status, amount, amountOrig, rate, period, renew
    } = this

    return _compact(_flatten([
      id && `(id: ${id})`,
      'funding offer for',
      symbol.substring(1),
      !_isEmpty(status) && `(${status})`,
      'for',
      prepareAmount(amount),
      (!!amountOrig && amountOrig !== amount) && `(${prepareAmount(amountOrig)})`,
      '@',
      preparePrice(rate),
      `(period ${period})`,
      `[renew ${renew ? 'Y' : 'N'}]`
    ])).join(' ')
  }

  /**
   * Validates a given funding offer instance
   *
   * @param {object[]|object|FundingOffer[]|FundingOffer|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      boolFields: FundingOffer.BOOL_FIELDS,
      fields: FundingOffer.FIELD_INDEX_MAPPING,
      validators: {
        mtsCreate: dateValidator,
        mtsUpdate: dateValidator,
        mtsOpening: dateValidator,
        mtsLastPayout: dateValidator,
        amountOrig: amountValidator,
        amount: amountValidator,
        flags: numberValidator,
        rate: numberValidator,
        period: numberValidator,
        rateReal: numberValidator,
        notify: boolValidator,
        hidden: boolValidator,
        renew: boolValidator,
        noClose: boolValidator,
        status: stringValidator,
        symbol: symbolValidator,
        type: stringValidator,
        id: numberValidator
      }
    })
  }
}

FundingOffer.status = {}
FundingOffer.statuses.forEach(s => (
  FundingOffer.status[s.split(' ').join('_')] = s
))

module.exports = FundingOffer

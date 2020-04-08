'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const symbolValidator = require('./validators/symbol')
const priceValidator = require('./validators/price')
const amountValidator = require('./validators/amount')
const boolValidator = require('./validators/bool')
const _isUndefined = require('lodash/isUndefined')
const _flatten = require('lodash/flatten')
const _compact = require('lodash/compact')
const Model = require('./model')

/**
 * Plain funding trade object used to instantiate model
 *
 * @typedef {object} FundingTradeData
 * @property {number} id - id
 * @property {string} symbol - symbol
 * @property {number} mtsCreate - creation timestamp
 * @property {number} offerID - taken offer ID
 * @property {number} amount - amount
 * @property {number} rate - rate
 * @property {number} period - period
 * @property {number|boolean} maker - maker flag
 */

/**
 * Funding Trade model
 *
 * @extends Model
 */
class FundingTrade extends Model {
  static FIELD_INDEX_MAPPING = {
    id: 0,
    symbol: 1,
    mtsCreate: 2,
    offerID: 3,
    amount: 4,
    rate: 5,
    period: 6,
    maker: 7
  };

  /** @type {number} */
  id;

  /** @type {string} */
  symbol;

  /** @type {number} */
  mtsCreate;

  /** @type {number} */
  offerID;

  /** @type {number} */
  amount;

  /** @type {number} */
  rate;

  /** @type {number} */
  period;

  /** @type {number} */
  maker;

  /**
   * @param {FundingTradeData[]|FundingTradeData|Array[]|Array} data - funding
   *   trade data, one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}

    super({
      fields: FundingTrade.FIELD_INDEX_MAPPING,
      parsedData,
      data
    })

    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: FundingTrade.FIELD_INDEX_MAPPING,
      data
    })
  }

  /**
   * Returns a string representation of the model, containing pertinent
   * information.
   *
   * @returns {string} str
   */
  toString () {
    const {
      id, symbol, mtsCreate, amount, rate, period, maker
    } = this

    const tokens = [
      `(${id})`,
      symbol,
      new Date(mtsCreate).toLocaleString(),
      [amount, '@', rate],
      ['period', period],
      !_isUndefined(maker) && maker ? 'maker' : 'taker'
    ]

    return _compact(_flatten(tokens)).join(' ')
  }

  /**
   * Validates a given funding trade instance
   *
   * @param {object[]|object|FundingTrade[]|FundingTrade|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields: FundingTrade.FIELD_INDEX_MAPPING,
      validators: {
        id: numberValidator,
        symbol: symbolValidator,
        mtsCreate: dateValidator,
        offerID: numberValidator,
        amount: amountValidator,
        rate: priceValidator,
        period: numberValidator,
        maker: boolValidator
      }
    })
  }
}

module.exports = FundingTrade

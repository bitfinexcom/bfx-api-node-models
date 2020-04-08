'use strict'

const _flatten = require('lodash/flatten')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const _isFinite = require('lodash/isFinite')

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const priceValidator = require('./validators/price')
const Model = require('./model')

/**
 * Plain public trade object used to instantiate model, may be for either a
 * funding or tracking symbol.
 *
 * @typedef {object} PublicTradeData
 * @property {number} id - unique id
 * @property {number} mts - timestamp
 * @property {number} amount - amount
 * @property {number} price - for trading symbols
 * @property {number} rate - for funding symbols
 * @property {number} period - for funding symbols
 */

/**
 * Public Trade model, supporting both funding & ordinary trades
 *
 * @extends Model
 */
class PublicTrade extends Model {
  static TRADING_FIELDS = {
    id: 0,
    mts: 1,
    amount: 2,
    price: 3
  };

  static FUNDING_FIELDS = {
    id: 0,
    mts: 1,
    amount: 2,
    rate: 3,
    period: 4
  };

  /** @type {number} */
  id;

  /** @type {number} */
  mts;

  /** @type {number} */
  amount;

  /** @type {number} */
  price;

  /** @type {number} */
  rate;

  /** @type {number} */
  period;

  /**
   * @param {PublicTradeData[]|PublicTradeData|Array[]|Array} data - public
   *   trade data, one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}

    if (_isArray(data)) {
      if (data.length === 5) {
        super({
          fields: PublicTrade.FUNDING_FIELDS,
          parsedData,
          data
        })
      } else {
        super({
          fields: PublicTrade.TRADING_FIELDS,
          parsedData,
          data
        })
      }
    } else if (_isObject(data)) {
      const singleModelData = /** @type {PublicTradeData} */ (data)

      if (singleModelData.rate) {
        super({
          fields: PublicTrade.FUNDING_FIELDS,
          data: singleModelData,
          parsedData
        })
      } else {
        super({
          fields: PublicTrade.TRADING_FIELDS,
          data: singleModelData,
          parsedData
        })
      }
    } else {
      throw new Error('unknown data type')
    }

    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    if ((_isArray(data[0]) && data[0].length === 5) || (data.length === 5)) {
      return super.unserializeWithDataDefinition({
        fields: PublicTrade.FUNDING_FIELDS,
        data
      })
    } else {
      return super.unserializeWithDataDefinition({
        fields: PublicTrade.TRADING_FIELDS,
        data
      })
    }
  }

  /**
   * @returns {string} str
   */
  toString () {
    const { id, mts, amount, price } = this

    return _flatten([
      `(${id})`,
      new Date(mts).toLocaleString(),
      [amount, '@', price]
    ]).join(' ')
  }

  /**
   * Validates a given public trade instance
   *
   * @param {object[]|object|PublicTrade[]|PublicTrade|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    const { rate } = data

    return super.validateWithDataDefinition({
      data,
      fields: _isFinite(rate)
        ? PublicTrade.FUNDING_FIELDS
        : PublicTrade.TRADING_FIELDS,

      validators: _isFinite(rate) ? {
        id: numberValidator,
        mts: dateValidator,
        amount: amountValidator,
        rate: priceValidator,
        period: numberValidator
      } : {
        id: numberValidator,
        mts: dateValidator,
        amount: amountValidator,
        price: priceValidator
      }
    })
  }
}

module.exports = PublicTrade

'use strict'

const _isUndefined = require('lodash/isUndefined')
const _isFinite = require('lodash/isFinite')
const _flatten = require('lodash/flatten')
const _compact = require('lodash/compact')

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const currencyValidator = require('./validators/currency')
const stringValidator = require('./validators/string')
const priceValidator = require('./validators/price')
const boolValidator = require('./validators/bool')
const symbolValidator = require('./validators/symbol')
const Order = require('./order')
const Model = require('./model')

/**
 * Plain account trade object used to instantiate model
 *
 * @typedef {object} TradeData
 * @property {number} id - id
 * @property {string} symbol - symbol
 * @property {number} mtsCreate - creation timestamp
 * @property {number} orderID - order ID
 * @property {string} execAmount - executed amount
 * @property {string} execPrice - execution price
 * @property {string} orderType - order type
 * @property {string} orderPrice - order price
 * @property {number|boolean} maker - maker flag
 * @property {string} fee - fee amount
 * @property {string} feeCurrency - fee currency
 */

/**
 * Private Trade model
 *
 * @extends Model
 */
class Trade extends Model {
  static BOOL_FIELDS = ['maker']
  static FIELD_INDEX_MAPPING = {
    id: 0,
    symbol: 1,
    mtsCreate: 2,
    orderID: 3,
    execAmount: 4,
    execPrice: 5,
    orderType: 6,
    orderPrice: 7,
    maker: 8,
    fee: 9,
    feeCurrency: 10
  };

  /** @type {number} */
  id;

  /** @type {string} */
  symbol;

  /** @type {number} */
  mtsCreate;

  /** @type {number} */
  orderID;

  /** @type {string} */
  execAmount;

  /** @type {string} */
  execPrice;

  /** @type {string} */
  orderType;

  /** @type {string} */
  orderPrice;

  /** @type {number|boolean} */
  maker;

  /** @type {string} */
  fee;

  /** @type {string} */
  feeCurrency;

  /**
   * @param {TradeData[]|TradeData|Array[]|Array} data - trade data, one or
   *   multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}

    super({
      fields: Trade.FIELD_INDEX_MAPPING,
      boolFields: Trade.BOOL_FIELDS,
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
      fields: Trade.FIELD_INDEX_MAPPING,
      boolFields: Trade.BOOL_FIELDS,
      data
    })
  }

  /**
   * @returns {string} str
   */
  toString () {
    const {
      id, symbol, mtsCreate, execAmount, execPrice, maker, fee, feeCurrency
    } = this

    return _compact(_flatten([
      `(${id})`,
      symbol,
      new Date(mtsCreate).toLocaleString(),
      [execAmount, '@', execPrice],
      (!_isUndefined(maker)) && maker ? 'maker' : 'taker',
      _isFinite(fee) && [fee, feeCurrency]
    ])).join(' ')
  }

  /**
   * Validates a given trade instance
   *
   * @param {object[]|object|Trade[]|Trade|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      boolFields: Trade.BOOL_FIELDS,
      fields: Trade.FIELD_INDEX_MAPPING,
      validators: {
        id: numberValidator,
        symbol: symbolValidator,
        mtsCreate: dateValidator,
        orderID: stringValidator,
        execAmount: amountValidator,
        execPrice: priceValidator,
        orderType: v => stringValidator(v, Object.values(Order.type)),
        orderPrice: priceValidator,
        maker: boolValidator,
        fee: numberValidator,
        feeCurrency: currencyValidator
      }
    })
  }
}

module.exports = Trade

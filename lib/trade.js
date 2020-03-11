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

const boolFields = ['maker']
const fields = {
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
}

/**
 * Private Trade model
 */
class Trade extends Model {
  /**
   * @param {object|Array} data - trade data
   * @param {number} data.id - id
   * @param {string} data.symbol - symbol
   * @param {number} data.mtsCreate - creation timestamp
   * @param {number} data.orderID - order ID
   * @param {string} data.execAmount - executed amount
   * @param {string} data.execPrice - execution price
   * @param {string} data.orderType - order type
   * @param {string} data.orderPrice - order price
   * @param {number|boolean} data.maker - maker flag
   * @param {string} data.fee - fee amount
   * @param {string} data.feeCurrency - fee currency
   */
  constructor (data = {}) {
    super({ data, fields, boolFields })
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields, boolFields })
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
   * @param {object[]|object|PublicTrade[]|PublicTrade|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
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

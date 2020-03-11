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

const TRADING_FIELDS = {
  id: 0,
  mts: 1,
  amount: 2,
  price: 3
}

const FUNDING_FIELDS = {
  id: 0,
  mts: 1,
  amount: 2,
  rate: 3,
  period: 4
}

/**
 * Public Trade model, supporting both funding & ordinary trades
 */
class PublicTrade extends Model {
  /**
   * @param {object|Array} data - public trade data
   */
  constructor (data = {}) {
    if (_isArray(data)) {
      if (data.length === 5) {
        super({ data, fields: FUNDING_FIELDS })
      } else {
        super({ data, fields: TRADING_FIELDS })
      }
    } else if (_isObject(data)) {
      if (data.rate) {
        super({ data, fields: FUNDING_FIELDS })
      } else {
        super({ data, fields: TRADING_FIELDS })
      }
    } else {
      throw new Error('unknown data type')
    }
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    if ((_isArray(data[0]) && data[0].length === 5) || (data.length === 5)) {
      return super.unserialize({ data, fields: FUNDING_FIELDS })
    } else {
      return super.unserialize({ data, fields: TRADING_FIELDS })
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
   * @param {object[]|object|PublicTrade[]|PublicTrade|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    const { rate } = data

    return super.validate({
      data,
      fields: _isFinite(rate) ? FUNDING_FIELDS : TRADING_FIELDS,
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
module.exports.TRADING_FIELDS = TRADING_FIELDS
module.exports.FUNDING_FIELDS = FUNDING_FIELDS

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
const fields = {
  id: 0,
  symbol: 1,
  mtsCreate: 2,
  offerID: 3,
  amount: 4,
  rate: 5,
  period: 6,
  maker: 7
}

/**
 * Funding Trade model
 */
class FundingTrade extends Model {
  /**
   * @param {object|Array} data - funding trade data
   * @param {number} data.id - id
   * @param {string} data.symbol - symbol
   * @param {number} data.mtsCreate - creation timestamp
   * @param {number} data.offerID - taken offer ID
   * @param {number} data.amount - amount
   * @param {number} data.rate - rate
   * @param {number} data.period - period
   * @param {number|boolean} data.maker - maker flag
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
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

    return _compact(_flatten([
      `(${id})`,
      symbol,
      new Date(mtsCreate).toLocaleString(),
      [amount, '@', rate],
      ['period', period],
      !_isUndefined(maker) && maker ? 'maker' : 'taker'
    ])).join(' ')
  }

  /**
   * Validates a given funding trade instance
   *
   * @param {object[]|object|FundingTrade[]|FundingTrade|Array} data - instance to validate
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

'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const symbolValidator = require('./validators/symbol')
const priceValidator = require('./validators/price')
const boolValidator = require('./validators/bool')
const _flatten = require('lodash/flatten')
const _compact = require('lodash/compact')
const Model = require('./model')
const fields = {
  posId: 1,
  mtsUpdated: 2,
  symbol: 4,
  amount: 5,
  basePrice: 6,
  isMatch: 8,
  isMarketSold: 9
}

/**
 * Liquidation Info model
 */
class Liquidations extends Model {
  /**
   * @param {object|Array} data - liquidation data
   * @param {number} data.posId - position ID
   * @param {number} data.mtsUpdated - timestamp
   * @param {string} data.symbol - symbol
   * @param {number} data.amount - amount
   * @param {number} data.basePrice - base price
   * @param {number|boolean} data.isMatch - matched flag
   * @param {number|boolean} data.isMarketSold - sold flag
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
   * @returns {string} str
   */
  toString () {
    const {
      mtsUpdated, symbol, amount, basePrice, isMatch, isMarketSold
    } = this

    return _compact(_flatten([
      new Date(mtsUpdated).toLocaleString(),
      symbol,
      [amount, '@', basePrice],
      isMatch && 'matched',
      isMarketSold && 'sold'
    ])).join(' ')
  }

  /**
   * Validates a given liquidation instance
   *
   * @param {object[]|object|Liquidations[]|Liquidations|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        posId: numberValidator,
        mtsUpdated: dateValidator,
        symbol: symbolValidator,
        amount: amountValidator,
        basePrice: priceValidator,
        isMatch: boolValidator,
        isMarketSold: boolValidator
      }
    })
  }
}

module.exports = Liquidations

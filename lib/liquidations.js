'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const symbolValidator = require('./validators/symbol')
const priceValidator = require('./validators/price')
const boolValidator = require('./validators/bool')
const _flatten = require('lodash/flatten')
const _filter = require('lodash/filter')
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
   * @param {Object|Array} data
   * @param {number} data.posId
   * @param {number} data.mtsUpdated
   * @param {string} data.symbol
   * @param {number} data.amount
   * @param {number} data.basePrice
   * @param {number|boolean} data.isMatch
   * @param {number|boolean} data.isMarketSold
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {Object[]|Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * return {string}
   */
  toString () {
    const {
      mtsUpdated, symbol, amount, basePrice, isMatch, isMarketSold
    } = this

    return _filter(_flatten([
      new Date(mtsUpdated).toLocaleString(),
      symbol,
      [amount, '@', basePrice],
      isMatch && 'matched',
      isMarketSold && 'sold'
    ]), v => !!v).join(' ')
  }

  /**
   * Validates a given liquidation instance
   *
   * @param {Object[]|Object|Liquidations[]|Liquidations|Array} data - instance to validate
   * @return {string} error - null if instance is valid
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

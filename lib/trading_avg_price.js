'use strict'

const numberValidator = require('./validators/number')
const Model = require('./model')

const fields = {
  priceAvg: 0,
  amount: 1
}

/**
 * Trading Average Price model
 */
class TradingAvgPrice extends Model {
  /**
   * @param {object|Array} data    - trading average price data
   * @param {number} data.priceAvg - pulse User ID
   * @param {number} data.amount   - creation timestamp
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
    const { priceAvg, amount } = this

    return [
      amount,
      '@',
      priceAvg
    ].join(' ')
  }

  /**
   * Validates a given trading average price instance
   *
   * @param {object[]|object|TradingAvgPrice[]|TradingAvgPrice|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        priceAvg: numberValidator,
        amount: numberValidator
      }
    })
  }
}

module.exports = TradingAvgPrice

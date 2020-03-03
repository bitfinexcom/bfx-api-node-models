'use strict'

const symbolValidator = require('./validators/symbol')
const priceValidator = require('./validators/price')
const dateValidator = require('./validators/date')
const Model = require('./model')
const fields = {
  symbol: 0,
  bid: 1,
  ask: 3,
  mtsUpdate: 12
}

/**
 * Historical Trading Ticker model
 */
class TradingTickerHist extends Model {
  /**
   * @param {Object|Array} data
   * @param {string} data.symbol
   * @param {string} data.bid
   * @param {string} data.ask
   * @param {number} data.mtsUpdate
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {Object[]Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * @return {string} quoteCurrency
   */
  quote () {
    return (this.symbol || '').substring(4)
  }

  /**
   * @return {string} baseCurrency
   */
  base () {
    return (this.symbol || '').substring(1, 4)
  }

  /**
   * Validates a given historical trading ticker instance
   *
   * @param {Object[]|Object|TradingTickerHist[]|TradingTickerHist|Array} data - instance to validate
   * @return {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        symbol: symbolValidator,
        bid: priceValidator,
        ask: priceValidator,
        mtsUpdated: dateValidator
      }
    })
  }
}

module.exports = TradingTickerHist

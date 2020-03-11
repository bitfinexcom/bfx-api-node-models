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
   * @param {object|Array} data - historical trading ticker data
   * @param {string} data.symbol - symbol
   * @param {string} data.bid - best bid
   * @param {string} data.ask - best ask
   * @param {number} data.mtsUpdate - timestamp
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
   * Quote currency for the ticker
   *
   * @returns {string} quoteCurrency
   */
  quote () {
    return (this.symbol || '').substring(4)
  }

  /**
   * Base currency for the ticker.
   *
   * @returns {string} baseCurrency
   */
  base () {
    return (this.symbol || '').substring(1, 4)
  }

  /**
   * Validates a given historical trading ticker instance
   *
   * @param {object[]|object|TradingTickerHist[]|TradingTickerHist|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
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

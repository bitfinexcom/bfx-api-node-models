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

require('./types/trading_ticker_hist/data')

/**
 * Historical Trading Ticker model
 *
 * @class
 * @augments Model
 */
class TradingTickerHist extends Model {
  /**
   * @param {TradingTickerHist~Data|TradingTickerHist~Data[]} data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {TradingTickerHist~Data|TradingTickerHist~Data[]} data - data to
   *   convert to POJO
   * @returns {TradingTickerHist~ObjectData} pojo
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
   * @param {TradingTickerHist~Data|TradingTickerHist~Data[]} data - models to
   *   validate
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

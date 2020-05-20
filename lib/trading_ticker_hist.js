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
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class TradingTickerHist extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.TradingTickerHist~Data|
   *   module:bfx-api-node-models.TradingTickerHist~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.TradingTickerHist~Data|
   *   module:bfx-api-node-models.TradingTickerHist~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.TradingTickerHist~ObjectData} pojo
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
   * @param {
   *   module:bfx-api-node-models.TradingTickerHist~Data|
   *   module:bfx-api-node-models.TradingTickerHist~Data[]
   * } data - instance(s) to validate
   *
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

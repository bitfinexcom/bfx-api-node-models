'use strict'

const numberValidator = require('./validators/number')
const amountValidator = require('./validators/amount')
const priceValidator = require('./validators/price')
const symbolValidator = require('./validators/symbol')
const Model = require('./model')
const fields = {
  symbol: 0,
  bid: 1,
  bidSize: 2,
  ask: 3,
  askSize: 4,
  dailyChange: 5,
  dailyChangePerc: 6,
  lastPrice: 7,
  volume: 8,
  high: 9,
  low: 10
}

require('./types/trading_ticker/data')

/**
 * Trading Ticker model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class TradingTicker extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.TradingTicker~Data|
   *   module:bfx-api-node-models.TradingTicker~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.TradingTicker~Data|
   *   module:bfx-api-node-models.TradingTicker~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.TradingTicker~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Quote currency of the ticker
   *
   * @returns {string} quoteCurrency
   */
  quote () {
    return (this.symbol || '').substring(4)
  }

  /**
   * Base currency of the ticker
   *
   * @returns {string} baseCurrency
   */
  base () {
    return (this.symbol || '').substring(1, 4)
  }

  /**
   * Validates a given trading ticker instance
   *
   * @param {
   *   module:bfx-api-node-models.TradingTicker~Data|
   *   module:bfx-api-node-models.TradingTicker~Data[]
   * } data - instance to validate
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
        bidSize: amountValidator,
        ask: priceValidator,
        askSize: amountValidator,
        dailyChange: numberValidator,
        dailyChangePerc: numberValidator,
        lastPrice: priceValidator,
        volume: numberValidator,
        high: priceValidator,
        low: priceValidator
      }
    })
  }
}

module.exports = TradingTicker

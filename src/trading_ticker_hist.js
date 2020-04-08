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
 * Plain historical trading ticker object used to instantiate model
 *
 * @typedef {object} TradingTickerHistData
 * @property {string} symbol - symbol
 * @property {string} bid - best bid
 * @property {string} ask - best ask
 * @property {number} mtsUpdate - timestamp
 */

/**
 * Historical Trading Ticker model
 *
 * @extends Model
 */
class TradingTickerHist extends Model {
  /**
   * @param {TradingTickerHistData[]|TradingTickerHistData|Array[]|Array} data -
   *   historical trading ticker data, one or multiple in object or array
   *   format
   */
  constructor (data) {
    super({ data, fields })
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({ data, fields })
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
   * @param {object[]|object|TradingTickerHist[]|TradingTickerHist|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
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

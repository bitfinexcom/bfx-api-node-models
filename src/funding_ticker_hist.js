'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const symbolValidator = require('./validators/symbol')
const priceValidator = require('./validators/price')
const Model = require('./model')
const fields = {
  symbol: 0,
  bid: 2,
  bidPeriod: 4,
  ask: 5,
  mtsUpdate: 15
}

/**
 * Plain historical funcing ticker object used to instantiate model
 *
 * @typedef {object} FundingTickerHistData
 * @property {string} symbol - symbol
 * @property {number} bid - bid
 * @property {number} bidPeriod - bid period
 * @property {number} ask - ask
 * @property {number} mtsUpdate - timestamp
 */

/**
 * Historical Funding Ticker model
 *
 * @extends Model
 */
class FundingTickerHist extends Model {
  /**
   * @param {FundingTickerHistData[]|FundingTickerHistData|Array|Array[]} data
   *  - historical funding ticker data, one or multiple in object or array
   *    format
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
   * Get the quote currency for the historical ticker.
   *
   * @returns {string} quoteCurrency
   */
  quote () {
    return this.symbol.substring(4)
  }

  /**
   * Get the base currency for the historical ticker.
   *
   * @returns {string} baseCurrency
   */
  base () {
    return this.symbol.substring(1, 4)
  }

  /**
   * Validates a given historical funding ticker instance.
   *
   * @param {object[]|object|FundingTickerHist[]|FundingTickerHist|Array[]|Array} data -
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
        bidPeriod: numberValidator,
        ask: priceValidator,
        mtsUpdate: dateValidator
      }
    })
  }
}

module.exports = FundingTickerHist

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
 * Historical Funding Ticker model
 */
class FundingTickerHist extends Model {
  /**
   * @param {object|Array} data - historical funding ticker data
   * @param {string} data.symbol - symbol
   * @param {number} data.bid - bid
   * @param {number} data.bidPeriod - bid period
   * @param {number} data.ask - ask
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
   * @param {object[]|object|FundingTickerHist[]|FundingTickerHist|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
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

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
   * @param {Object|Array} data
   * @param {string} data.symbol
   * @param {number} data.bid
   * @param {number} data.bidPeriod
   * @param {number} data.ask
   * @param {number} data.mtsUpdate
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
   * @return {string} quoteCurrency
   */
  quote () {
    return this.symbol.substring(4)
  }

  /**
   * @return {string} baseCurrency
   */
  base () {
    return this.symbol.substring(1, 4)
  }

  /**
   * Validates a given historical funding ticker instance
   *
   * @param {Object[]|Object|FundingTickerHist[]|FundingTickerHist|Array} data - instance to validate
   * @return {string} error - null if instance is valid
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

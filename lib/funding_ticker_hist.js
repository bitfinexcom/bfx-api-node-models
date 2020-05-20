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

require('./types/funding_ticker_hist/data')

/**
 * Historical Funding Ticker model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class FundingTickerHist extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.FundingTickerHist~Data|
   *   module:bfx-api-node-models.FundingTickerHist~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.FundingTickerHist~Data|
   *   module:bfx-api-node-models.FundingTickerHist~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.FundingTickerHist~ObjectData} pojo
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
   * @param {(
   *  module:bfx-api-node-models.FundingTickerHist~Data|
   *  module:bfx-api-node-models.FundingTickerHist~Data[]
   * )} data - instance to validate
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
        bidPeriod: numberValidator,
        ask: priceValidator,
        mtsUpdate: dateValidator
      }
    })
  }
}

module.exports = FundingTickerHist

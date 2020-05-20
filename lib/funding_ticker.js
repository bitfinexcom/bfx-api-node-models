'use strict'

const numberValidator = require('./validators/number')
const amountValidator = require('./validators/amount')
const symbolValidator = require('./validators/symbol')
const priceValidator = require('./validators/price')
const boolValidator = require('./validators/bool')
const Model = require('./model')
const fields = {
  symbol: 0,
  frr: 1,
  bid: 2,
  bidSize: 3,
  bidPeriod: 4,
  ask: 5,
  askSize: 6,
  askPeriod: 7,
  dailyChange: 8,
  dailyChangePerc: 9,
  lastPrice: 10,
  volume: 11,
  high: 12,
  low: 13
}

require('./types/funding_ticker/data')

/**
 * Funding Ticker model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class FundingTicker extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.FundingTicker~Data|
   *   module:bfx-api-node-models.FundingTicker~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.FundingTicker~Data|
   *   module:bfx-api-node-models.FundingTicker~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.FundingTicker~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Get the quote currency for the ticker.
   *
   * @returns {string} quoteCurrency
   */
  quote () {
    return this.symbol.substring(4)
  }

  /**
   * Get the base currency for the ticker.
   *
   * @returns {string} baseCurrency
   */
  base () {
    return this.symbol.substring(1, 4)
  }

  /**
   * Validates a given funding ticker instance
   *
   * @param {(
   *  module:bfx-api-node-models.FundingTicker~Data|
   *  module:bfx-api-node-models.FundingTicker~Data[]
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
        frr: boolValidator,
        bid: priceValidator,
        bidSize: amountValidator,
        bidPeriod: numberValidator,
        ask: priceValidator,
        askSize: amountValidator,
        askPeriod: numberValidator,
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

module.exports = FundingTicker

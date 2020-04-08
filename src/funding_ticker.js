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

/**
 * Plain funding ticker object used to instantiate model
 *
 * @typedef {object} FundingTickerData
 * @property {string} symbol - symbol
 * @property {number|boolean} frr - current FRR
 * @property {number} bid - best bid
 * @property {number} bidSize - total bid amount
 * @property {number} bidPeriod - bid period
 * @property {number} ask - best ask
 * @property {number} askSize - total ask amount
 * @property {number} askPeriod - ask period
 * @property {number} dailyChange - net 24h period change
 * @property {number} dailyChangePerc - net 24h period change as percent
 * @property {number} lastPrice - last price
 * @property {number} volume - total volume in last 24h period
 * @property {number} high - highest rate in last 24h period
 * @property {number} low - lowest rate in last 24h period
 */

/**
 * Funding Ticker model
 */
class FundingTicker extends Model {
  /**
   * @param {FundingTickerData[]|FundingTickerData|Array[]|Array} data - funding
   *   ticker data, one or multiple in object or array format
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
   * @param {object[]|object|FundingTicker[]|FundingTicker|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
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

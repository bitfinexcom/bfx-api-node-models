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
 * Funding Ticker model
 */
class FundingTicker extends Model {
  /**
   * @param {object|Array} data - funding ticker data
   * @param {string} data.symbol - symbol
   * @param {number|boolean} data.frr - current FRR
   * @param {number} data.bid - best bid
   * @param {number} data.bidSize - total bid amount
   * @param {number} data.bidPeriod - bid period
   * @param {number} data.ask - best ask
   * @param {number} data.askSize - total ask amount
   * @param {number} data.askPeriod - ask period
   * @param {number} data.dailyChange - net 24h period change
   * @param {number} data.dailyChangePerc - net 24h period change as percent
   * @param {number} data.lastPrice - last price
   * @param {number} data.volume - total volume in last 24h period
   * @param {number} data.high - highest rate in last 24h period
   * @param {number} data.low - lowest rate in last 24h period
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
   * @param {object[]|object|FundingTicker[]|FundingTicker|Array} data - instance to validate
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

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
   * @param {Object|Array} data
   * @param {string} data.symbol
   * @param {number|boolean} data.frr
   * @param {number} data.bid
   * @param {number} data.bidSize
   * @param {number} data.bidPeriod
   * @param {number} data.ask
   * @param {number} data.askSize
   * @param {number} data.askPeriod
   * @param {number} data.dailyChange
   * @param {number} data.dailyChangePerc
   * @param {number} data.lastPrice
   * @param {number} data.volume
   * @param {number} data.high
   * @param {number} data.low
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
   * Validates a given funding ticker instance
   *
   * @param {Object[]|Object|FundingTicker[]|FundingTicker|Array} data - instance to validate
   * @return {string} error - null if instance is valid
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

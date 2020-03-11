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

/**
 * Trading Ticker model
 */
class TradingTicker extends Model {
  /**
   * @param {object|Array} data - trading ticker data
   * @param {string} data.symbol - symbol
   * @param {number} data.bid - best bid
   * @param {number} data.bidSize - total bid size
   * @param {number} data.ask - best ask
   * @param {number} data.askSize - total ask size
   * @param {number} data.dailyChange - change in last 24h period
   * @param {number} data.dailyChangePerc - change in last 24h period as percent
   * @param {number} data.lastPrice - last price
   * @param {number} data.volume - volume in last 24h period
   * @param {number} data.high - highest price in last 24h period
   * @param {number} data.low - lowest price in last 24h period
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
   * @param {object[]|object|PublicTrade[]|PublicTrade|Array} data - instance to validate
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

'use strict'

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
   * @param {Object|Array} data
   * @param {string} data.symbol
   * @param {number} data.bid
   * @param {number} data.bidSize
   * @param {number} data.ask
   * @param {number} data.askSize
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
   * @param {Object[]Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * @return {string} quoteCurrency
   */
  quote () {
    return (this.symbol || '').substring(4)
  }

  /**
   * @return {string} baseCurrency
   */
  base () {
    return (this.symbol || '').substring(1, 4)
  }
}

module.exports = TradingTicker

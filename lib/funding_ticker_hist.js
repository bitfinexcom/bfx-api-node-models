'use strict'

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
}

module.exports = FundingTickerHist

'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  symbol: 0,
  bid: 2,
  bidPeriod: 4,
  ask: 5,
  mtsUpdate: 15
}

const FIELD_KEYS = Object.keys(FIELDS)

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
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  /**
   * @param {Object|Array} arr
   * @return {Object} pojo
   */
  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
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

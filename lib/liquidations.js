'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  posId: 1,
  mtsUpdated: 2,
  symbol: 4,
  amount: 5,
  basePrice: 6,
  isMatch: 8,
  isMarketSold: 9
}

const FIELD_KEYS = Object.keys(FIELDS)

/**
 * Liquidation Info model
 */
class Liquidations extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.posId
   * @param {number} data.mtsUpdated
   * @param {string} data.symbol
   * @param {number} data.amount
   * @param {number} data.basePrice
   * @param {number|boolean} data.isMatch
   * @param {number|boolean} data.isMarketSold
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
}

module.exports = Liquidations

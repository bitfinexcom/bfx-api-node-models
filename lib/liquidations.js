'use strict'

const Model = require('./model')
const fields = {
  posId: 1,
  mtsUpdated: 2,
  symbol: 4,
  amount: 5,
  basePrice: 6,
  isMatch: 8,
  isMarketSold: 9
}

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
    super({ data, fields })
  }

  /**
   * @param {Object[]|Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }
}

module.exports = Liquidations

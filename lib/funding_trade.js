'use strict'

const Model = require('./model')
const fields = {
  id: 0,
  symbol: 1,
  mtsCreate: 2,
  offerID: 3,
  amount: 4,
  rate: 5,
  period: 6,
  maker: 7
}

/**
 * Funding Trade model
 */
class FundingTrade extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {string} data.symbol
   * @param {number} data.mtsCreate
   * @param {number} data.offerID
   * @param {number} data.amount
   * @param {number} data.rate
   * @param {number} data.period
   * @param {number|boolean} data.maker
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

module.exports = FundingTrade

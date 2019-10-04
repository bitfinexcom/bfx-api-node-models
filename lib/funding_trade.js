'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  id: 0,
  symbol: 1,
  mtsCreate: 2,
  offerID: 3,
  amount: 4,
  rate: 5,
  period: 6,
  maker: 7
}

const FIELD_KEYS = Object.keys(FIELDS)

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

module.exports = FundingTrade

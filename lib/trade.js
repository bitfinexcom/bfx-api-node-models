'use strict'

const Model = require('./model')
const BOOL_FIELDS = ['maker']
const FIELDS = {
  id: 0,
  symbol: 1,
  mtsCreate: 2,
  orderID: 3,
  execAmount: 4,
  execPrice: 5,
  orderType: 6,
  orderPrice: 7,
  maker: 8,
  fee: 9,
  feeCurrency: 10
}

const FIELD_KEYS = Object.keys(FIELDS)

/**
 * Private Trade model
 */
class Trade extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {string} data.symbol
   * @param {number} data.mtsCreate
   * @param {number} data.orderID
   * @param {string} data.execAmount
   * @param {string} data.execPrice
   * @param {string} data.orderType
   * @param {string} data.orderPrice
   * @param {number|boolean} data.maker
   * @param {string} data.fee
   * @param {string} data.feeCurrency
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

module.exports = Trade

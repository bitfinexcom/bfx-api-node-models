'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  id: 0,
  currency: 1,
  currencyName: 2,
  mtsStarted: 5,
  mtsUpdated: 6,
  status: 9,
  amount: 12,
  fees: 13,
  destinationAddress: 16,
  transactionId: 20
}

const FIELD_KEYS = Object.keys(FIELDS)

/**
 * Currency Movement model
 */
class Movement extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {string} data.currency
   * @param {string} data.currencyName
   * @param {number} data.mtsStarted
   * @param {number} data.mtsUpdated
   * @param {string} data.status
   * @param {number} data.amount
   * @param {number} data.fees
   * @param {string} data.destinationAddress
   * @param {number} data.transactionId
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

module.exports = Movement

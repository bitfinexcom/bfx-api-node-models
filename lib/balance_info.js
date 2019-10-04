'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  amount: 0,
  amountNet: 1
}

const FIELD_KEYS = Object.keys(FIELDS)

/**
 * Wallet balance information model
 */
class BalanceInfo extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.amount
   * @param {number} data.amountNet
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

module.exports = BalanceInfo

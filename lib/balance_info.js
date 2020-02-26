'use strict'

const Model = require('./model')
const fields = {
  amount: 0,
  amountNet: 1
}

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

module.exports = BalanceInfo

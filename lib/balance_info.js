'use strict'

const amountValidator = require('./validators/amount')
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

  /**
   * Validates a given balance info instance
   *
   * @param {Object[]|Object|BalanceInfo[]|BalanceInfo|Array} data - instance to validate
   * @return {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        amount: amountValidator,
        amountNet: amountValidator
      }
    })
  }
}

module.exports = BalanceInfo

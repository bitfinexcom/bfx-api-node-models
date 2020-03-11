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
   * @param {object|Array} data - balance info data
   * @param {number} data.amount - total balance
   * @param {number} data.amountNet - available balance
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given balance info instance
   *
   * @param {object[]|object|BalanceInfo[]|BalanceInfo|Array} data - instance
   *   to validate
   * @returns {string} error - null if instance is valid
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

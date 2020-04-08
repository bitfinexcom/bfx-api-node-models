'use strict'

const amountValidator = require('./validators/amount')
const Model = require('./model')
const fields = {
  amount: 0,
  amountNet: 1
}

/**
 * Plain balance info object used to instantiate model
 *
 * @typedef {object} BalanceInfoData
 * @property {number} amount - total balance
 * @property {number} amountNet - available balance
 */

/**
 * Wallet balance information model
 *
 * @extends Model
 */
class BalanceInfo extends Model {
  /**
   * @param {BalanceInfoData|BalanceInfoData[]|Array|Array[]} data - balance
   *   info data, one or multiple in object or array format
   */
  constructor (data) {
    super({ data, fields })
  }

  /**
   * @param {Array|Array[]} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({ data, fields })
  }

  /**
   * Validates a given balance info instance
   *
   * @param {object[]|object|BalanceInfo[]|BalanceInfo|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
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

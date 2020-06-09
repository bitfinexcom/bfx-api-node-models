'use strict'

const amountValidator = require('./validators/amount')
const Model = require('./model')
const fields = {
  amount: 0,
  amountNet: 1
}

/**
 * Balance information model
 *
 * @class
 * @augments Model
 */
class BalanceInfo extends Model {
  /**
   * @param {BalanceInfo~Data|BalanceInfo~Data[]} data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {BalanceInfo~Data|BalanceInfo~Data[]} data - data to convert to
   *   POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given balance info instance
   *
   * @param {BalanceInfo~Data|BalanceInfo~Data[]} data - instance(s) to
   *   validate
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

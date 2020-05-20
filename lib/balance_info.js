'use strict'

const amountValidator = require('./validators/amount')
const Model = require('./model')
const fields = {
  amount: 0,
  amountNet: 1
}

require('./types/balance_info/data')

/**
 * Balance information model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class BalanceInfo extends Model {
  /**
   * @param {module:bfx-api-node-models.BalanceInfo~Data} data - balance info
   *   data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.BalanceInfo~Data|
   *   module:bfx-api-node-models.BalanceInfo~Data[]
   * } data - data to convert to POJO
   *
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given balance info instance
   *
   * @param {(
   *  module:bfx-api-node-models.BalanceInfo~Data|
   *  module:bfx-api-node-models.BalanceInfo~Data[]
   * )} data - instance to validate
   *
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

'use strict'

const amountValidator = require('./validators/amount')
const Model = require('./model')

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
  static FIELD_INDEX_MAPPING = {
    amount: 0,
    amountNet: 1
  };

  /** @type {number} */
  amount;

  /** @type {number} */
  amountNet;

  /**
   * @param {BalanceInfoData|BalanceInfoData[]|Array|Array[]} data - balance
   *   info data, one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}

    super({
      fields: BalanceInfo.FIELD_INDEX_MAPPING,
      parsedData,
      data
    })

    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array|Array[]} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: BalanceInfo.FIELD_INDEX_MAPPING,
      data
    })
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
      fields: BalanceInfo.FIELD_INDEX_MAPPING,
      validators: {
        amount: amountValidator,
        amountNet: amountValidator
      }
    })
  }
}

module.exports = BalanceInfo

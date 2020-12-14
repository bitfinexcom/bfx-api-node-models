'use strict'

const numberValidator = require('./validators/number')
const stringValidator = require('./validators/string')
const Model = require('./model')
const fields = {
  symbol: 0,
  fee: [1, 1]
}

/**
 * Transaction Fee model
 */
class TransactionFee extends Model {
  /**
   * @param {object|Array} data - transaction fee data
   * @param {string} data.symbol - currency symbol
   * @param {number} data.fee - withdrawal fee
   */
  constructor (data = {}) {
    super({ data, fields })

    this.emptyFill = 0
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given transaction fee instance
   *
   * @param {object[]|object|TransactionFee[]|TransactionFee|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        symbol: stringValidator,
        fee: numberValidator
      }
    })
  }
}

module.exports = TransactionFee

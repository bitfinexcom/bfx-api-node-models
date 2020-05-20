'use strict'

const numberValidator = require('./validators/number')
const Model = require('./model')

const fields = {
  rateAvg: 0,
  amount: 1
}

/**
 * Funding Average Rate model
 */
class FundingAvgRate extends Model {
  /**
   * @param {object|Array} data   - funding average rate data
   * @param {number} data.rateAvg - pulse User ID
   * @param {number} data.amount  - creation timestamp
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
   * @returns {string} str
   */
  toString () {
    const { rateAvg, amount } = this

    return [
      amount,
      '@',
      rateAvg
    ].join(' ')
  }

  /**
   * Validates a given funding average rate instance
   *
   * @param {object[]|object|FundingAvgRate[]|FundingAvgRate|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        rateAvg: numberValidator,
        amount: numberValidator
      }
    })
  }
}

module.exports = FundingAvgRate

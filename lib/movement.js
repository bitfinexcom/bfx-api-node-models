'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const currencyValidator = require('./validators/currency')
const stringValidator = require('./validators/string')
const Model = require('./model')
const fields = {
  id: 0,
  currency: 1,
  currencyName: 2,
  mtsStarted: 5,
  mtsUpdated: 6,
  status: 9,
  amount: 12,
  fees: 13,
  destinationAddress: 16,
  transactionId: 20
}

/**
 * Currency Movement model
 */
class Movement extends Model {
  /**
   * @param {object|Array} data - movement data
   * @param {number} data.id - id
   * @param {string} data.currency - currency
   * @param {string} data.currencyName - currency name
   * @param {number} data.mtsStarted - movement start timestamp
   * @param {number} data.mtsUpdated - last update timestamp
   * @param {string} data.status - status
   * @param {number} data.amount - moved amount
   * @param {number} data.fees - paid fees
   * @param {string} data.destinationAddress - destination address
   * @param {number} data.transactionId - transaction ID
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
   * Validates a given movement instance
   *
   * @param {object[]|object|Movement[]|Movement|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        id: numberValidator,
        currency: currencyValidator,
        currencyName: stringValidator,
        mtsStarted: dateValidator,
        mtsUpdated: dateValidator,
        status: stringValidator,
        amount: amountValidator,
        fees: numberValidator,
        destinationAddress: stringValidator,
        transactionId: stringValidator
      }
    })
  }
}

module.exports = Movement

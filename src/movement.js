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
 * Plain movement object used to instantiate model
 *
 * @typedef {object} MovementData
 * @property {number} id - id
 * @property {string} currency - currency
 * @property {string} currencyName - currency name
 * @property {number} mtsStarted - movement start timestamp
 * @property {number} mtsUpdated - last update timestamp
 * @property {string} status - status
 * @property {number} amount - moved amount
 * @property {number} fees - paid fees
 * @property {string} destinationAddress - destination address
 * @property {number} transactionId - transaction ID
 */

/**
 * Currency Movement model
 *
 * @extends Model
 */
class Movement extends Model {
  /**
   * @param {MovementData[]|MovementData|Array[]|Array} data - movement data,
   *   one or multiple in object or array format
   */
  constructor (data) {
    super({ data, fields })
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({ data, fields })
  }

  /**
   * Validates a given movement instance
   *
   * @param {object[]|object|Movement[]|Movement|Array[]|Array} data - instance
   *   to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
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

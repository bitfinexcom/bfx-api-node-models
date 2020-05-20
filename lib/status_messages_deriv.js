'use strict'

const stringValidator = require('./validators/string')
const priceValidator = require('./validators/price')
const Model = require('./model')

const fields = {
  key: 0,
  timestamp: 1,
  price: 3,
  priceSpot: 4,
  fundBal: 6,
  fundingAccrued: 9,
  fundingStep: 10
}

require('./types/status_messages_deriv/data')

/**
 * Derivatives Status Message model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class StatusMessagesDeriv extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.StatusMessagesDeriv~Data|
   *   module:bfx-api-node-models.StatusMessagesDeriv~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.StatusMessagesDeriv~Data|
   *   module:bfx-api-node-models.StatusMessagesDeriv~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.StatusMessagesDeriv~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given public trade instance
   *
   * @param {
   *   module:bfx-api-node-models.StatusMessagesDeriv~Data|
   *   module:bfx-api-node-models.StatusMessagesDeriv~Data[]
   * } data - instance(s) to validate
   *
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        key: stringValidator,
        timestamp: stringValidator,
        price: priceValidator,
        priceSpot: priceValidator,
        fundBal: priceValidator,
        fundingAccrued: priceValidator,
        fundingStep: priceValidator
      }
    })
  }
}

module.exports = StatusMessagesDeriv

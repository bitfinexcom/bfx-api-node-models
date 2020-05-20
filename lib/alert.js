'use strict'

const priceValidator = require('./validators/price')
const symbolValidator = require('./validators/symbol')
const Model = require('./model')
const fields = {
  key: 0,
  type: 1,
  symbol: 2,
  price: 3
}

require('./types/alert/data')

/**
 * Price alert model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class Alert extends Model {
  /**
   * @param {module:bfx-api-node-models.Alert~Data} data - alert data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.Alert~Data|
   *   module:bfx-api-node-models.Alert~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.Alert~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given alert instance
   *
   * TODO: validate type (get a list)
   *
   * @param {(
   *  module:bfx-api-node-models.Alert~Data|
   *  module:bfx-api-node-models.Alert~Data[]
   * )} data - instance to validate
   *
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        price: priceValidator,
        symbol: symbolValidator
      }
    })
  }
}

module.exports = Alert

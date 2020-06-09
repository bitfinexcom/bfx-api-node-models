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

/**
 * Price alert model
 *
 * @class
 * @augments Model
 */
class Alert extends Model {
  /**
   * @param {Alert~Data|Alert~Data[]} data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {Alert~Data|Alert~Data[]} data - data to convert to POJO
   * @returns {Alert~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given alert instance
   *
   * @todo validate type (get a list)
   *
   * @param {Alert~Data|Alert~Data[]} data - instance(s) to validate
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

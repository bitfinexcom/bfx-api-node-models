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
 */
class Alert extends Model {
  /**
   * @param {object|Array} data - alert data
   * @param {string} data.key - alert key
   * @param {string} data.type - alert type
   * @param {string} data.symbol - configured symbol
   * @param {string} data.price - configured price
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
   * Validates a given alert instance
   *
   * TODO: validate type (get a list)
   *
   * @param {object[]|object|Alert[]|Alert|Array} data - instance to validate
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

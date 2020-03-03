'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const stringValidator = require('./validators/string')
const Model = require('./model')
const fields = {
  id: 0,
  time: 2,
  ip: 4,
  extraData: 7
}

/**
 * OHLCV Candle model
 */
class Login extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {number} data.time
   * @param {string} data.ip
   * @param {object} data.extraData
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {Object[]|Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given login instance
   *
   * @param {Object[]|Object|Login[]|Login|Array} data - instance to validate
   * @return {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        id: numberValidator,
        time: dateValidator,
        ip: stringValidator
      }
    })
  }
}

module.exports = Login

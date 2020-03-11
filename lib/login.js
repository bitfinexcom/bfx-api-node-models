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
 * Login event model
 */
class Login extends Model {
  /**
   * @param {object|Array} data - login event data
   * @param {number} data.id - id
   * @param {number} data.time - timestamp
   * @param {string} data.ip - client IP address
   * @param {object} data.extraData - metadata
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
   * Validates a given login instance
   *
   * @param {object[]|object|Login[]|Login|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
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

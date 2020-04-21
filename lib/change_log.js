'use strict'

const stringValidator = require('./validators/string')
const dateValidator = require('./validators/date')
const Model = require('./model')

const fields = {
  mtsCreate: 0,
  log: 2,
  ip: 5,
  userAgent: 6
}

/**
 * ChangeLog model
 */
class ChangeLog extends Model {
  /**
   * @param {object|Array} data - log data
   * @param {number} data.mtsCreate - timestamp
   * @param {string} data.log - log data
   * @param {string} data.ip - ip
   * @param {string} data.userAgent - user agent
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
   * Validates a given wallet instance
   *
   * @param {object[]|object|ChangeLog[]|ChangeLog|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,

      validators: {
        mtsCreate: dateValidator,
        log: stringValidator,
        ip: stringValidator,
        userAgent: stringValidator
      }
    })
  }
}

module.exports = ChangeLog

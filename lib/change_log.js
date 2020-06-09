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
 * Change log model
 *
 * @class
 * @augments Model
 */
class ChangeLog extends Model {
  /**
   * @param {ChangeLog~Data|ChangeLog~Data[]} data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {ChangeLog~Data|ChangeLog~Data[]} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given wallet instance
   *
   * @param {ChangeLog~Data|ChangeLog~Data[]} data - instance(s) to validate
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

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

require('./types/change_log/data')

/**
 * Change log model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class ChangeLog extends Model {
  /**
   * @param {module:bfx-api-node-models.ChangeLog~Data} data - log data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.ChangeLog~Data|
   *   module:bfx-api-node-models.ChangeLog~Data[]
   * } data - data to convert to POJO
   *
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given wallet instance
   *
   * @param {(
   *  module:bfx-api-node-models.ChangeLog~Data|
   *  module:bfx-api-node-models.ChangeLog~Data[]
   * )} data - instance to validate
   *
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

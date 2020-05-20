'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const stringValidator = require('./validators/string')
const Model = require('./model')
const fields = {
  mts: 0,
  type: 1,
  messageID: 2,
  notifyInfo: 4,
  code: 5,
  status: 6,
  text: 7
}

require('./types/notification/data')

/**
 * Notification model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class Notification extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.Notification~Data|
   *   module:bfx-api-node-models.Notification~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.Notification~Data|
   *   module:bfx-api-node-models.Notification~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.Notification~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given notification instance
   *
   * @param {
   *   module:bfx-api-node-models.Notification~Data|
   *   module:bfx-api-node-models.Notification~Data[]
   * } data - instance(s) to validate
   *
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        mts: dateValidator,
        type: stringValidator,
        messageID: numberValidator,
        code: numberValidator,
        status: stringValidator,
        text: stringValidator
      }
    })
  }
}

module.exports = Notification

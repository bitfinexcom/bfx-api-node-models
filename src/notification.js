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

/**
 * Plain notification object used to instantiate model
 *
 * @typedef {object} NotificationData
 * @property {number} mts - timestamp
 * @property {string} type - type (i.e. 'ucm-*' for broadcasts)
 * @property {number} messageID - message ID
 * @property {object} notifyInfo - metadata, set by client for broadcasts
 * @property {number} code - code
 * @property {string} status - status (i.e. 'error')
 * @property {string} text - notification text to display to user
 */

/**
 * Notification model
 *
 * @extends Model
 */
class Notification extends Model {
  /**
   * @param {NotificationData[]|NotificationData|Array[]|Array} data -
   *   notification data, one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}
    super({ data, fields, parsedData })
    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({ data, fields })
  }

  /**
   * Validates a given notification instance
   *
   * @param {object[]|object|Notification[]|Notification|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
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

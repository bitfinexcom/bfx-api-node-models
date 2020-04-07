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
 * Notification model
 */
class Notification extends Model {
  /**
   * @param {object|Array} data - notification data
   * @param {number} data.mts - timestamp
   * @param {string} data.type - type (i.e. 'ucm-*' for broadcasts)
   * @param {number} data.messageID - message ID
   * @param {object} data.notifyInfo - metadata, set by client for broadcasts
   * @param {number} data.code - code
   * @param {string} data.status - status (i.e. 'error')
   * @param {string} data.text - notification text to display to user
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
   * Validates a given notification instance
   *
   * @param {object[]|object|Notification[]|Notification|Array} data - instance to validate
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

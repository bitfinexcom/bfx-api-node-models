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
 * Notification model. Broadcast notification body schema may be found at
 * {@link Notification~BroadcastPayload}.
 *
 * @class
 * @augments Model
 */
class Notification extends Model {
  /**
   * @param {Notification~Data|Notification~Data[]} data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {Notification~Data|Notification~Data[]} data - data to convert to POJO
   * @returns {Notification~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given notification instance
   *
   * @param {Notification~Data|Notification~Data[]} data - instance(s) to
   *   validate
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

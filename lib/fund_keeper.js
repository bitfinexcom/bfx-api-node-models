'use strict'

const stringValidator = require('./validators/string')
const dateValidator = require('./validators/date')
const Model = require('./model')

const fields = {
  mts: 0,
  type: 1,
  // PLACEHOLDER,
  // PLACEHOLDER,
  // PLACEHOLDER,
  // PLACEHOLDER,
  status: 6,
  text: 7
}

/**
 * Fund Keeper model
 */
class FundKeeper extends Model {
  /**
   * @param {object|Array} data  - fund keeper data
   * @param {number} data.mts    - Millisecond Time Stamp of the update
   * @param {string} data.type   - Purpose of notification ('fk-req' (funding keep request))
   * @param {string} data.status - Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...)
   * @param {string} data.text   - Text of the notification
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
   * @returns {string} str
   */
  toString () {
    const { mts, type, status, text } = this

    return [
      new Date(mts).toLocaleString(),
      `type:${type}`,
      `status:${status}`,
      `msg:${text}`
    ].join(' ')
  }

  /**
   * Validates a given fund keeper instance
   *
   * @param {object[]|object|FundKeeper[]|FundKeeper|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        mts: dateValidator,
        type: stringValidator,
        status: stringValidator,
        text: stringValidator
      }
    })
  }
}

module.exports = FundKeeper

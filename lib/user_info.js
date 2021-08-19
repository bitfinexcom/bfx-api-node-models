'use strict'

const boolValidator = require('./validators/bool')
const numberValidator = require('./validators/number')
const stringValidator = require('./validators/string')
const Model = require('./model')
const fields = {
  id: 0,
  email: 1,
  username: 2,
  timezone: 7,
  isPaperTradeEnabled: 21
}
const boolFields = ['isPaperTradeEnabled']

/**
 * User Info model
 */
class UserInfo extends Model {
  /**
   * @param {object|Array} data - user info data
   * @param {number} data.id - id
   * @param {string} data.email - email
   * @param {string} data.username - username
   * @param {number} data.timezone - timezone as UTC offset
   * @param {number} data.isPaperTradeEnabled - flag indicating paper trading account
   */
  constructor (data = {}) {
    super({ data, fields, boolFields })
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given historical trading ticker instance
   *
   * @param {object[]|object|UserInfo[]|UserInfo|Array} data - instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        id: numberValidator,
        email: stringValidator,
        username: stringValidator,
        timezone: stringValidator,
        isPaperTradeEnabled: boolValidator
      }
    })
  }
}

module.exports = UserInfo

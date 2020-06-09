'use strict'

const numberValidator = require('./validators/number')
const stringValidator = require('./validators/string')
const Model = require('./model')
const fields = {
  id: 0,
  email: 1,
  username: 2,
  timezone: 7
}

/**
 * User Info model
 *
 * @class
 * @augments Model
 */
class UserInfo extends Model {
  /**
   * @param {UserInfo~Data|UserInfo~Data[]} data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {UserInfo~Data|UserInfo~Data[]} data - data to convert to POJO
   * @returns {UserInfo~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given historical trading ticker instance
   *
   * @param {UserInfo~Data|UserInfo~Data[]} data - instance(s) to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        id: numberValidator,
        email: stringValidator,
        username: stringValidator,
        timezone: stringValidator
      }
    })
  }
}

module.exports = UserInfo

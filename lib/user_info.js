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

require('./types/user_info/data')

/**
 * User Info model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class UserInfo extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.UserInfo~Data|
   *   module:bfx-api-node-models.UserInfo~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.UserInfo~Data|
   *   module:bfx-api-node-models.UserInfo~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.UserInfo~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given historical trading ticker instance
   *
   * @param {
   *   module:bfx-api-node-models.UserInfo~Data|
   *   module:bfx-api-node-models.UserInfo~Data[]
   * } data - instance(s) to validate
   *
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

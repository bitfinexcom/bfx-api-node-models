'use strict'

const numberValidator = require('./validators/number')
const stringValidator = require('./validators/string')
const Model = require('./model')

/**
 * Plain user info object used to instantiate model
 *
 * @typedef {object} UserInfoData
 * @property {number} id - id
 * @property {string} email - email
 * @property {string} username - username
 * @property {number} timezone - timezone as UTC offset
 */

/**
 * User Info model
 *
 * @extends Model
 */
class UserInfo extends Model {
  static FIELD_INDEX_MAPPING = {
    id: 0,
    email: 1,
    username: 2,
    timezone: 7
  };

  /** @type {number} */
  id;

  /** @type {string} */
  email;

  /** @type {string} */
  username;

  /** @type {number} */
  timezone;

  /**
   * @param {UserInfoData[]|UserInfoData|Array[]|Array} data - user info data,
   *   one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}

    super({
      fields: UserInfo.FIELD_INDEX_MAPPING,
      parsedData,
      data
    })

    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: UserInfo.FIELD_INDEX_MAPPING,
      data
    })
  }

  /**
   * Validates a given historical trading ticker instance
   *
   * @param {object[]|object|UserInfo[]|UserInfo|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields: UserInfo.FIELD_INDEX_MAPPING,
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

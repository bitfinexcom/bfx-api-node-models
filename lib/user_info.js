'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  id: 0,
  email: 1,
  username: 2,
  timezone: 7
}

const FIELD_KEYS = Object.keys(FIELDS)

/**
 * User Info model
 */
class UserInfo extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {string} data.email
   * @param {string} data.username
   * @param {number} data.timezone
   */
  constructor (data = {}) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  /**
   * @param {Object|Array} arr
   * @return {Object} pojo
   */
  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }
}

module.exports = UserInfo

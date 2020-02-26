'use strict'

const Model = require('./model')
const fields = {
  id: 0,
  email: 1,
  username: 2,
  timezone: 7
}

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
    super({ data, fields })
  }

  /**
   * @param {Object[]Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }
}

module.exports = UserInfo

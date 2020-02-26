'use strict'

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
   * @param {Object|Array} data
   * @param {number} data.mts
   * @param {string} data.type
   * @param {number} data.messageID
   * @param {Object} data.notifyInfo
   * @param {number} data.code
   * @param {string} data.status
   * @param {string} data.text
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

module.exports = Notification

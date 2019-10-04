'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  mts: 0,
  type: 1,
  messageID: 2,
  notifyInfo: 4,
  code: 5,
  status: 6,
  text: 7
}

const FIELD_KEYS = Object.keys(FIELDS)

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

module.exports = Notification

'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  id: 0,
  time: 2,
  ip: 4,
  extraData: 7
}

const FIELD_KEYS = Object.keys(FIELDS)

/**
 * OHLCV Candle model
 */
class Login extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {number} data.time
   * @param {string} data.ip
   * @param {object} data.extraData
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

module.exports = Login

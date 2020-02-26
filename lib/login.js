'use strict'

const Model = require('./model')
const fields = {
  id: 0,
  time: 2,
  ip: 4,
  extraData: 7
}

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
    super({ data, fields })
  }

  /**
   * @param {Object[]|Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }
}

module.exports = Login

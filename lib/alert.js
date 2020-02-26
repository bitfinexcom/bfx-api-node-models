'use strict'

const Model = require('./model')
const fields = {
  key: 0,
  type: 1,
  symbol: 2,
  price: 3
}

/**
 * Price alert model
 */
class Alert extends Model {
  /**
   * @param {Object|Array} data
   * @param {string} data.key
   * @param {string} data.type
   * @param {string} data.symbol
   * @param {string} data.price
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

module.exports = Alert

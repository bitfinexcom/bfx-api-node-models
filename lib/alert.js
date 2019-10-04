'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  key: 0,
  type: 1,
  symbol: 2,
  price: 3
}

const FIELD_KEYS = Object.keys(FIELDS)

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

module.exports = Alert

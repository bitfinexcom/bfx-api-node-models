'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  id: 0,
  name: 1,
  pool: 2,
  explorer: 3,
  symbol: 4
}

const FIELD_KEYS = Object.keys(FIELDS)

/**
 * Currency model
 */
class Currency extends Model {
  /**
   * @param {Object|Array} data
   * @param {string} data.id
   * @param {string} data.name
   * @param {string} data.pool
   * @param {string} data.exporer
   * @param {string} data.symbol
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

module.exports = Currency

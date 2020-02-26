'use strict'

const Model = require('./model')
const fields = {
  id: 0,
  name: 1,
  pool: 2,
  explorer: 3,
  symbol: 4
}

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

module.exports = Currency

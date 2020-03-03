'use strict'

const _flatten = require('lodash/flatten')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const Model = require('./model')

const TRADING_FIELDS = {
  id: 0,
  mts: 1,
  amount: 2,
  price: 3
}

const FUNDING_FIELDS = {
  id: 0,
  mts: 1,
  amount: 2,
  rate: 3,
  period: 4
}

/**
 * Public Trade model, supporting both funding & ordinary trades
 */
class PublicTrade extends Model {
  /**
   * @param {Object|Array} data
   */
  constructor (data = {}) {
    if (_isArray(data)) {
      if (data.length === 5) {
        super({ data, fields: FUNDING_FIELDS })
      } else {
        super({ data, fields: TRADING_FIELDS })
      }
    } else if (_isObject(data)) {
      if (data.rate) {
        super({ data, fields: FUNDING_FIELDS })
      } else {
        super({ data, fields: TRADING_FIELDS })
      }
    } else {
      throw new Error('unknown data type')
    }
  }

  /**
   * @param {Object[]Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    if ((_isArray(data[0]) && data[0].length === 5) || (data.length === 5)) {
      return super.unserialize({ data, fields: FUNDING_FIELDS })
    } else {
      return super.unserialize({ data, fields: TRADING_FIELDS })
    }
  }

  /**
    * @return {string}
    */
  toString () {
    const { id, mts, amount, price } = this

    return _flatten([
      `(${id})`,
      new Date(mts).toLocaleString(),
      [amount, '@', price]
    ]).join(' ')
  }
}

module.exports = PublicTrade
module.exports.TRADING_FIELDS = TRADING_FIELDS
module.exports.FUNDING_FIELDS = FUNDING_FIELDS

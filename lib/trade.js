'use strict'

const _isFinite = require('lodash/isFinite')
const _flatten = require('lodash/flatten')
const _filter = require('lodash/filter')
const Model = require('./model')

const boolFields = ['maker']
const fields = {
  id: 0,
  symbol: 1,
  mtsCreate: 2,
  orderID: 3,
  execAmount: 4,
  execPrice: 5,
  orderType: 6,
  orderPrice: 7,
  maker: 8,
  fee: 9,
  feeCurrency: 10
}

/**
 * Private Trade model
 */
class Trade extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {string} data.symbol
   * @param {number} data.mtsCreate
   * @param {number} data.orderID
   * @param {string} data.execAmount
   * @param {string} data.execPrice
   * @param {string} data.orderType
   * @param {string} data.orderPrice
   * @param {number|boolean} data.maker
   * @param {string} data.fee
   * @param {string} data.feeCurrency
   */
  constructor (data = {}) {
    super({ data, fields, boolFields })
  }

  /**
   * @param {Object[]Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields, boolFields })
  }

  /**
    * @return {string}
    */
  toString () {
    const {
      id, symbol, mtsCreate, execAmount, execPrice, maker, fee, feeCurrency
    } = this

    return _filter(_flatten([
      `(${id})`,
      symbol,
      new Date(mtsCreate).toLocaleString(),
      [execAmount, '@', execPrice],
      (typeof maker !== 'undefined') && maker ? 'maker' : 'taker',
      _isFinite(fee) && [fee, feeCurrency]
    ]), v => !!v).join(' ')
  }
}

module.exports = Trade

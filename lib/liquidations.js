'use strict'

const _flatten = require('lodash/flatten')
const _filter = require('lodash/filter')
const Model = require('./model')
const fields = {
  posId: 1,
  mtsUpdated: 2,
  symbol: 4,
  amount: 5,
  basePrice: 6,
  isMatch: 8,
  isMarketSold: 9
}

/**
 * Liquidation Info model
 */
class Liquidations extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.posId
   * @param {number} data.mtsUpdated
   * @param {string} data.symbol
   * @param {number} data.amount
   * @param {number} data.basePrice
   * @param {number|boolean} data.isMatch
   * @param {number|boolean} data.isMarketSold
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

  /**
   * return {string}
   */
  toString () {
    const {
      mtsUpdated, symbol, amount, basePrice, isMatch, isMarketSold
    } = this

    return _filter(_flatten([
      new Date(mtsUpdated).toLocaleString(),
      symbol,
      [amount, '@', basePrice],
      isMatch && 'matched',
      isMarketSold && 'sold'
    ]), v => !!v).join(' ')
  }
}

module.exports = Liquidations

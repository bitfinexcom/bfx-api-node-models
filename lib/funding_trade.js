'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const symbolValidator = require('./validators/symbol')
const priceValidator = require('./validators/price')
const amountValidator = require('./validators/amount')
const boolValidator = require('./validators/bool')
const _flatten = require('lodash/flatten')
const _filter = require('lodash/filter')
const Model = require('./model')
const fields = {
  id: 0,
  symbol: 1,
  mtsCreate: 2,
  offerID: 3,
  amount: 4,
  rate: 5,
  period: 6,
  maker: 7
}

/**
 * Funding Trade model
 */
class FundingTrade extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {string} data.symbol
   * @param {number} data.mtsCreate
   * @param {number} data.offerID
   * @param {number} data.amount
   * @param {number} data.rate
   * @param {number} data.period
   * @param {number|boolean} data.maker
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
    * @return {string}
    */
  toString () {
    const {
      id, symbol, mtsCreate, amount, rate, period, maker
    } = this

    return _filter(_flatten([
      `(${id})`,
      symbol,
      new Date(mtsCreate).toLocaleString(),
      [amount, '@', rate],
      ['period', period],
      (typeof maker !== 'undefined') && maker ? 'maker' : 'taker'
    ]), v => !!v).join(' ')
  }

  /**
   * Validates a given funding trade instance
   *
   * @param {Object[]|Object|FundingTrade[]|FundingTrade|Array} data - instance to validate
   * @return {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        id: numberValidator,
        symbol: symbolValidator,
        mtsCreate: dateValidator,
        offerID: numberValidator,
        amount: amountValidator,
        rate: priceValidator,
        period: numberValidator,
        maker: boolValidator
      }
    })
  }
}

module.exports = FundingTrade

'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const symbolValidator = require('./validators/symbol')
const priceValidator = require('./validators/price')
const amountValidator = require('./validators/amount')
const boolValidator = require('./validators/bool')
const _isUndefined = require('lodash/isUndefined')
const _flatten = require('lodash/flatten')
const _compact = require('lodash/compact')
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

require('./types/funding_trade/data')

/**
 * Funding Trade model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class FundingTrade extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.FundingTrade~Data|
   *   module:bfx-api-node-models.FundingTrade~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.FundingTrade~Data|
   *   module:bfx-api-node-models.FundingTrade~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.FundingTrade~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Returns a string representation of the model, containing pertinent
   * information.
   *
   * @returns {string} str
   */
  toString () {
    const {
      id, symbol, mtsCreate, amount, rate, period, maker
    } = this

    return _compact(_flatten([
      `(${id})`,
      symbol,
      new Date(mtsCreate).toLocaleString(),
      [amount, '@', rate],
      ['period', period],
      !_isUndefined(maker) && maker ? 'maker' : 'taker'
    ])).join(' ')
  }

  /**
   * Validates a given funding trade instance
   *
   * @param {
   *   module:bfx-api-node-models.FundingTrade~Data|
   *   module:bfx-api-node-models.FundingTrade~Data[]
   * } data - instance(s) to validate
   *
   * @returns {string} error - null if instance is valid
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

'use strict'

const _isArray = require('lodash/isArray')

const numberValidator = require('./validators/number')
const amountValidator = require('./validators/amount')
const symbolValidator = require('./validators/symbol')
const isCollection = require('./util/is_collection')
const Model = require('./model')

/**
 * Account Funding Info model
 */
class FundingInfo extends Model {
  /**
   * Create a new instance from a data payload
   *
   * @param {Object[]|Object|Array[]|Array} data
   */
  constructor (data) {
    super({ data })
  }

  /**
   * Return an array representation of this model
   *
   * @return {Array} arr
   */
  serialize () {
    const { symbol, yieldLoan, yieldLend, durationLoan, durationLend } = this

    return [
      'sym',
      symbol,
      [
        yieldLoan,
        yieldLend,
        durationLoan,
        durationLend
      ]
    ]
  }

  /**
   * TODO: Figure out a better object key for 'payload', as we need to support
   *       both arrays and POJOs
   *
   * @param {Object[]Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    if (isCollection(data)) {
      return data.map(FundingInfo.unserialize)
    }

    const symbol = _isArray(data) ? data[1] : data.symbol
    const payload = (_isArray(data) ? data[2] : data.payload) || []
    const [yieldLoan, yieldLend, durationLoan, durationLend] = payload

    return {
      symbol,
      yieldLoan,
      yieldLend,
      durationLoan,
      durationLend
    }
  }

  /**
   * Validates a given funding info instance
   *
   * @param {Object[]|Object|FundingInfo[]|FundingInfo|Array} data - instance to validate
   * @return {string} error - null if instance is valid
   */
  static validate (data) {
    const { symbol, yieldLoan, yieldLend, durationLoan, durationLend } = this

    return (
      symbolValidator(symbol) ||
      amountValidator(yieldLoan) ||
      amountValidator(yieldLend) ||
      numberValidator(durationLoan) ||
      numberValidator(durationLend)
    )
  }
}

module.exports = FundingInfo

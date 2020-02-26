'use strict'

const Model = require('./model')
const isCollection = require('./util/is_collection')
const _isArray = require('lodash/isArray')

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
}

module.exports = FundingInfo

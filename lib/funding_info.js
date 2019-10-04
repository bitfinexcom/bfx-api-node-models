'use strict'

const Model = require('./model')

/**
 * Account Funding Info model
 */
class FundingInfo extends Model {
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
   * @param {Object|Array} arr
   * @return {Object} pojo
   */
  static unserialize (arr) {
    const [, symbol, data = []] = arr
    const [yieldLoan, yieldLend, durationLoan, durationLend] = data

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

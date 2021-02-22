'use strict'

const numberValidator = require('./validators/number')
const arrayValidator = require('./validators/array')
const objectValidator = require('./validators/object')

const Model = require('./model')
const fields = {
  trade_vol_30d: [5, 0],
  fees_trading_30d: [5, 1],
  fees_trading_total_30d: [5, 2],
  fees_funding_30d: [6, 1],
  fees_funding_total_30d: [6, 2],
  makerFee: [4, 0, 0],
  derivMakerRebate: [4, 0, 5],
  takerFeeToCrypto: [4, 1, 0],
  takerFeeToStable: [4, 1, 1],
  takerFeeToFiat: [4, 1, 2],
  derivTakerFee: [4, 1, 5],
  leoLev: [9, 'leo_lev'],
  leoAmountAvg: [9, 'leo_amount_avg']
}

/**
 * Account Summary model
 */
class AccountSummary extends Model {
  /**
   * @param {object|Array} data - account summary data
   * @param {Array} data.trade_vol_30d - traded volume over the past 30 days detailed by currency
   * @param {object} data.fees_trading_30d - trading fees charged over the past 30 days detailed by currency
   * @param {number} data.fees_trading_total_30d - USD equivalent of the trading fees charged over the past 30 days
   * @param {object} data.fees_funding_30d - funding returns over the past 30 days detailed by currency
   * @param {number} data.fees_funding_total_30d - USD equivalent of the funding returns over the past 30 days
   * @param {number} data.makerFee - maker fee rate for the account
   * @param {number} data.derivMakerRebate - maker rebate for derivative trades on the account
   * @param {number} data.takerFeeToCrypto - taker fee rate for crypto to crypto trades on the account
   * @param {number} data.takerFeeToStable - taker fee rate for crypto to stable coin trades on the account
   * @param {number} data.takerFeeToFiat - taker fee rate for crypto to stable coin trades on the account
   * @param {number} data.derivTakerFee - taker fee rate for derivative trades on the account
   * @param {number} data.leoLev - current LEO discount level of the account
   * @param {number} data.leoAmountAvg - average amount of LEO held in the account over the past 30 days.
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  serialize () {
    const arr = super.serialize()

    arr[4][0][1] = this.makerFee
    arr[4][0][2] = this.makerFee

    return arr
  }

  /**
   * Validates a given account summary instance
   *
   * @param {object[]|object|AccountSummary[]|AccountSummary|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        trade_vol_30d: arrayValidator,
        fees_trading_30d: objectValidator,
        fees_trading_total_30d: numberValidator,
        fees_funding_30d: objectValidator,
        fees_funding_total_30d: numberValidator,
        makerFee: numberValidator,
        derivMakerRebate: numberValidator,
        takerFeeToCrypto: numberValidator,
        takerFeeToStable: numberValidator,
        takerFeeToFiat: numberValidator,
        derivTakerFee: numberValidator,
        leoLev: numberValidator,
        leoAmountAvg: numberValidator
      }
    })
  }
}

module.exports = AccountSummary

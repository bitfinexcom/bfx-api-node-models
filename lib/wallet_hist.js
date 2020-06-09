'use strict'

const amountValidator = require('./validators/amount')
const currencyValidator = require('./validators/currency')
const stringValidator = require('./validators/string')
const dateValidator = require('./validators/date')
const { WALLET_TYPES } = require('bfx-hf-util')
const Model = require('./model')

const types = Object.values(WALLET_TYPES)
const fields = {
  type: 0,
  currency: 1,
  balance: 2,
  unsettledInterest: 3,
  balanceAvailable: 4,
  mtsUpdate: 6
}

/**
 * Historical Wallet Update model
 *
 * @class
 * @augments Model
 */
class WalletHist extends Model {
  /**
   * @param {WalletHist~Data|WalletHist~Data[]} data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {WalletHist~Data|WalletHist~Data[]} data - data to convert to POJO
   * @returns {WalletHist~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given historical wallet instance
   *
   * @param {WalletHist~Data|WalletHist~Data[]} data - instance(s) to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,

      validators: {
        type: v => stringValidator(v, types),
        currency: currencyValidator,
        balance: amountValidator,
        unsettledInterest: amountValidator,
        balanceAvailable: amountValidator,
        mtsUpdate: dateValidator
      }
    })
  }
}

WalletHist.type = {}

types.forEach(t => (WalletHist.type[t.toUpperCase()] = t))

module.exports = WalletHist

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

require('./types/wallet_hist/data')

/**
 * Historical Wallet Update model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class WalletHist extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.WalletHist~Data|
   *   module:bfx-api-node-models.WalletHist~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.WalletHist~Data|
   *   module:bfx-api-node-models.WalletHist~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.WalletHist~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given historical wallet instance
   *
   * @param {
   *   module:bfx-api-node-models.WalletHist~Data|
   *   module:bfx-api-node-models.WalletHist~Data[]
   * } data - instance to validate
   *
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

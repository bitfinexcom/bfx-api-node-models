'use strict'

const amountValidator = require('./validators/amount')
const currencyValidator = require('./validators/currency')
const stringValidator = require('./validators/string')
const dateValidator = require('./validators/date')
const { WALLET_TYPES } = require('bfx-hf-util')
const Model = require('./model')

const types = Object.values(WALLET_TYPES)

/**
 * Plain historical wallet object used to instantiate model
 *
 * @typedef {object} WalletHistData
 * @property {string} type - type (i.e. deposit)
 * @property {string} currency - currency
 * @property {number} balance - balance
 * @property {number} unsettledInterest - unsettled interest
 * @property {number} balanceAvailable - available balance
 * @property {number} mtsUpdate - timestamp
 */

/**
 * Historical Wallet Update model
 *
 * @extends Model
 */
class WalletHist extends Model {
  static FIELD_INDEX_MAPPING = {
    type: 0,
    currency: 1,
    balance: 2,
    unsettledInterest: 3,
    balanceAvailable: 4,
    mtsUpdate: 6
  };

  /** @type {string} */
  type;

  /** @type {string} */
  currency;

  /** @type {number} */
  balance;

  /** @type {number} */
  unsettledInterest;

  /** @type {number} */
  balanceAvailable;

  /** @type {number} */
  mtsUpdate;

  /**
   * @param {WalletHistData[]|WalletHistData|Array[]|Array} data - historical
   *   wallet update data, one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}

    super({
      fields: WalletHist.FIELD_INDEX_MAPPING,
      parsedData,
      data
    })

    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: WalletHist.FIELD_INDEX_MAPPING,
      data
    })
  }

  /**
   * Validates a given historical wallet instance
   *
   * @param {object[]|object|WalletHist[]|WalletHist|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields: WalletHist.FIELD_INDEX_MAPPING,
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

'use strict'

const amountValidator = require('./validators/amount')
const currencyValidator = require('./validators/currency')
const stringValidator = require('./validators/string')
const { WALLET_TYPES } = require('bfx-hf-util')
const Model = require('./model')

const VALID_TYPES = Object.values(WALLET_TYPES)
const fields = {
  type: 0,
  currency: 1,
  balance: 2,
  unsettledInterest: 3,
  balanceAvailable: 4,
  description: 5,
  meta: 6
}

/**
 * Plain wallet object used to instantiate model
 *
 * @typedef {object} WalletData
 * @property {string} type - wallet type (i.e. deposit)
 * @property {string} currency - wallet currency
 * @property {number} balance - total balance
 * @property {number} unsettledInterest - unsettled interest
 * @property {number} balanceAvailable - available balance
 */

/**
 * Wallet model
 *
 * @extends Model
 */
class Wallet extends Model {
  /**
   * @param {WalletData[]|WalletData|Array[]|Array} data - wallet data, one
   *   or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}
    super({ data, fields, parsedData })
    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({ data, fields })
  }

  /**
   * Validates a given wallet instance
   *
   * @param {object[]|object|Wallet[]|Wallet|Array[]|Array} data - instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields,

      validators: {
        type: v => stringValidator(v, VALID_TYPES),
        currency: currencyValidator,
        balance: amountValidator,
        unsettledInterest: amountValidator,
        balanceAvailable: amountValidator,
        description: stringValidator
      }
    })
  }
}

module.exports = Wallet

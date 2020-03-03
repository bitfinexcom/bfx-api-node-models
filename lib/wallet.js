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
 * Wallet model
 */
class Wallet extends Model {
  /**
   * @param {Object|Array} data
   * @param {string} data.type
   * @param {string} data.currency
   * @param {number} data.balance
   * @param {number} data.unsettledInterest
   * @param {number} data.balanceAvailable
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {Object[]Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given wallet instance
   *
   * @param {Object[]|Object|Wallet[]|Wallet|Array} data - instance to validate
   * @return {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
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

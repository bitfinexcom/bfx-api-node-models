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

require('./types/wallet/data')

/**
 * Wallet model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class Wallet extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.Wallet~Data|
   *   module:bfx-api-node-models.Wallet~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.Wallet~Data|
   *   module:bfx-api-node-models.Wallet~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.Wallet~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given wallet instance
   *
   * @param {
   *   module:bfx-api-node-models.Wallet~Data|
   *   module:bfx-api-node-models.Wallet~Data[]
   * } data - instance(s) to validate
   *
   * @returns {string} error - null if instance is valid
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

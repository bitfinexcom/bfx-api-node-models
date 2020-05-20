'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const currencyValidator = require('./validators/currency')
const stringValidator = require('./validators/string')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')

const Model = require('./model')
const fields = {
  id: 0,
  currency: 1,
  mts: 3,
  amount: 5,
  balance: 6,
  description: 8,
  wallet: null
}

require('./types/ledger_entry/data')

/**
 * Ledger Entry model; wallet field is automatically populated if a description
 * is provided.
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class LedgerEntry extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.LedgerEntry~Data|
   *   module:bfx-api-node-models.LedgerEntry~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })

    this.wallet = null

    if (_isString(this.description) && !_isEmpty(this.description)) {
      const spl = this.description.split('wallet')
      this.wallet = (spl && spl.length > 1) ? spl[spl.length - 1].trim() : null
    }
  }

  /**
   * @param {
   *   module:bfx-api-node-models.LedgerEntry~Data|
   *   module:bfx-api-node-models.LedgerEntry~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.LedgerEntry~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given ledger entry instance
   *
   * @param {
   *   module:bfx-api-node-models.LedgerEntry~Data|
   *   module:bfx-api-node-models.LedgerEntry~Data[]
   * } data - instance to validate
   *
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        id: numberValidator,
        currency: currencyValidator,
        mts: dateValidator,
        amount: amountValidator,
        balance: amountValidator,
        description: stringValidator
      }
    })
  }
}

module.exports = LedgerEntry

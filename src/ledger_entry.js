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

/**
 * Ledger Entry model; wallet field is automatically populated if a description
 * is provided.
 */
class LedgerEntry extends Model {
  /**
   * @param {object|Array} data - ledger entry data
   * @param {number} data.id - id
   * @param {string} data.currency - currency
   * @param {number} data.mts - transaction timestamp
   * @param {number} data.amount - transaction amount
   * @param {number} data.balance - balance at time of transaction
   * @param {string} data.description - transaction description
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
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given ledger entry instance
   *
   * @param {object[]|object|LedgerEntry[]|LedgerEntry|Array} data - instance to validate
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

'use strict'

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
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {string} data.currency
   * @param {number} data.mts
   * @param {number} data.amount
   * @param {number} data.balance
   * @param {string} data.description
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
   * @param {Object[]|Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }
}

module.exports = LedgerEntry

'use strict'

const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _isFinite = require('lodash/isFinite')
const _isEmpty = require('lodash/isEmpty')
const _includes = require('lodash/includes')
const { CURRENCIES: CURRENCY_MAP } = require('bfx-hf-util')
const Model = require('./model')

const VALID_TYPES = ['exchange', 'margin', 'funding']
const VALID_CURRENCIES = Object.values(CURRENCY_MAP)
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
   * @return {boolean} valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,

      validators: {
        type: v => (
          !_includes(VALID_TYPES, v)
            ? `must be one of ${VALID_TYPES.join(', ')}`
            : null
        ),

        currency: v => (
          !_includes(VALID_CURRENCIES, v)
            ? 'must be a currency currently tradable on Bitfinex'
            : null
        ),

        balance: v => (!_isFinite(v) ? 'must be a number' : null),
        unsettledInterest: v => (!_isFinite(v) ? 'must be a number' : null),
        balanceAvailable: v => (!_isFinite(v) ? 'must be a number' : null),

        description: v => (
          (v !== null && (!_isString(v) || _isEmpty(v)))
            ? 'can be null or a non-empty string'
            : null
        ),

        meta: v => (
          (v !== null && (!_isObject(v) || _isEmpty(v)))
            ? 'can be null or a non-empty object'
            : null
        )
      }
    })
  }
}

Wallet.type = {}
VALID_TYPES.forEach(t => (Wallet.type[t.toUpperCase()] = t))

module.exports = Wallet

'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  type: 0,
  currency: 1,
  balance: 2,
  unsettledInterest: 3,
  balanceAvailable: 4,
  mtsUpdate: 6
}

const FIELD_KEYS = Object.keys(FIELDS)

/**
 * Historical Wallet Update model
 */
class WalletHist extends Model {
  /**
   * @param {Object|Array} data
   * @param {string} data.type
   * @param {string} data.currency
   * @param {number} data.balance
   * @param {number} data.unsettledInterest
   * @param {number} data.balanceAvailable
   * @param {number} data.mtsUpdate
   */
  constructor (data = {}) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  /**
   * @param {Object|Array} arr
   * @return {Object} pojo
   */
  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }
}

WalletHist.type = {}
const types = ['exchange', 'margin', 'funding']

types.forEach((t) => {
  WalletHist.type[t.toUpperCase()] = t
})

module.exports = WalletHist

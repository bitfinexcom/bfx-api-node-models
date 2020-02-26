'use strict'

const Model = require('./model')

const types = ['exchange', 'margin', 'funding']
const fields = {
  type: 0,
  currency: 1,
  balance: 2,
  unsettledInterest: 3,
  balanceAvailable: 4,
  mtsUpdate: 6
}

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
    super({ data, fields })
  }

  /**
   * @param {Object[]Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }
}

WalletHist.type = {}

types.forEach(t => (WalletHist.type[t.toUpperCase()] = t))

module.exports = WalletHist

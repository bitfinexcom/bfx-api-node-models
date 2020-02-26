'use strict'

const Model = require('./model')

const fields = {
  key: 0,
  timestamp: 1,
  price: 3,
  priceSpot: 4,
  fundBal: 6,
  fundingAccrued: 9,
  fundingStep: 10
}

/**
 * Derivatives Status Message model
 */
class StatusMessagesDeriv extends Model {
  /**
   * @param {Object|Array} data
   * @param {string} data.key
   * @param {number} data.timestamp
   * @param {string} data.price
   * @param {string} data.priceSpot
   * @param {string} data.fundBal
   * @param {string} data.fundingAccrued
   * @param {string} data.fundingStep
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

module.exports = StatusMessagesDeriv

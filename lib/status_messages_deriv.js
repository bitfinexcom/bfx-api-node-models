'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  key: 0,
  timestamp: 1,
  price: 3,
  priceSpot: 4,
  fundBal: 6,
  fundingAccrued: 9,
  fundingStep: 10
}

const FIELD_KEYS = Object.keys(FIELDS)

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

module.exports = StatusMessagesDeriv

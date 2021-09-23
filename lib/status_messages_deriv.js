'use strict'

const stringValidator = require('./validators/string')
const priceValidator = require('./validators/price')
const Model = require('./model')

const fields = {
  timestamp: 0,
  price: 2,
  priceSpot: 3,
  fundBal: 5,
  fundingEventTimestamp: 7,
  fundingAccrued: 8,
  fundingStep: 9,
  currentFunding: 11,
  markprice: 14,
  openInterest: 17,
  clampMin: 21,
  clampMax: 22
}

/**
 * Derivatives Status Message model
 */
class StatusMessagesDeriv extends Model {
  /**
   * @param {object|Array} data - derivatives status message data
   * @param {string} data.key - key
   * @param {number} data.timestamp - timestamp
   * @param {string} data.price - price
   * @param {string} data.priceSpot - spot price
   * @param {string} data.fundBal - funding balance
   * @param {number} data.fundingEventTimestamp - timestamp
   * @param {string} data.fundingAccrued - accrued funding
   * @param {string} data.fundingStep - funding step
   * @param {number} data.currentFunding - funding applied in the current 8h period,
   * @param {number} data.markprice - markprice,
   * @param {number} data.openInterest - total number of outstanding derivative contracts,
   * @param {number} data.clampMin - min clamp
   * @param {number} data.clampMax - max clamp
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given public trade instance
   *
   * @param {object[]|object|PublicTrade[]|PublicTrade|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        key: stringValidator,
        timestamp: stringValidator,
        price: priceValidator,
        priceSpot: priceValidator,
        fundBal: priceValidator,
        fundingEventTimestamp: stringValidator,
        fundingAccrued: priceValidator,
        fundingStep: priceValidator,
        currentFunding: priceValidator,
        markprice: priceValidator,
        openInterest: priceValidator,
        clampMin: priceValidator,
        clampMax: priceValidator
      }
    })
  }
}

module.exports = StatusMessagesDeriv

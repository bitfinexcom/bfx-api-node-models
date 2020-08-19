'use strict'

const stringValidator = require('./validators/string')
const priceValidator = require('./validators/price')
const Model = require('./model')

const fields = {
  key: 0,
  timestamp: 1,
  price: 3,
  priceSpot: 4,
  fundBal: 6,
  fundingAccrued: 9,
  fundingStep: 10,
  clampMin: 22,
  clampMax: 23
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
   * @param {string} data.fundingAccrued - accrued funding
   * @param {string} data.fundingStep - funding step
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
        fundingAccrued: priceValidator,
        fundingStep: priceValidator,
        clampMin: priceValidator,
        clampMax: priceValidator
      }
    })
  }
}

module.exports = StatusMessagesDeriv

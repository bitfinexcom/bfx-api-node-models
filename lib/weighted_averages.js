'use strict'

const numberValidator = require('./validators/number')
const Model = require('./model')
const fields = {
  tradeCount: 0,
  sumBuyingSpent: 1,
  sumBuyingAmount: 2,
  sumSellingSpent: 4,
  sumSellingAmount: 5,
  buyingWeightedPrice: 7,
  sellingWeightedPrice: 8,
  firstTradeMts: 10,
  lastTradeMts: 11
}

/**
 * Weighted Averages model
 */
class WeightedAverages extends Model {
  /**
   * @param {object|Array} data - weighted averages data
   * @param {number} data.tradeCount - trade count
   * @param {number} data.sumBuyingSpent - sum buying spent
   * @param {number} data.sumBuyingAmount - sum buying amount
   * @param {number} data.sumSellingSpent - sum selling spent
   * @param {number} data.sumSellingAmount - sum selling amount
   * @param {number} data.buyingWeightedPrice - buying weighted price
   * @param {number} data.sellingWeightedPrice - selling weighted price
   * @param {number} data.firstTradeMts - first trade ms timestamp
   * @param {number} data.lastTradeMts - last trade ms timestamp
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
   * Validates a given WeightedAverages instance
   *
   * @param {object[]|object|WeightedAverages[]|WeightedAverages|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        tradeCount: numberValidator,
        sumBuyingSpent: numberValidator,
        sumBuyingAmount: numberValidator,
        sumSellingSpent: numberValidator,
        sumSellingAmount: numberValidator,
        buyingWeightedPrice: numberValidator,
        sellingWeightedPrice: numberValidator,
        firstTradeMts: numberValidator,
        lastTradeMts: numberValidator
      }
    })
  }
}

module.exports = WeightedAverages

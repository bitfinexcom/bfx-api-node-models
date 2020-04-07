'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const Model = require('./model')
const fields = {
  mts: 0,
  open: 1,
  close: 2,
  high: 3,
  low: 4,
  volume: 5
}

/**
 * OHLCV Candle model
 */
class Candle extends Model {
  /**
   * @param {object|Array} data - source payloud
   * @param {number} data.mts - timestamp
   * @param {number} data.open - open price
   * @param {number} data.close - close price
   * @param {number} data.high - highest price in the period
   * @param {number} data.low - lowest price in the period
   * @param {number} data.volume - total volume for the period
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
   * Validates a given Candle instance
   *
   * @param {object[]|object|Candle[]|Candle|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        mts: dateValidator,
        open: numberValidator,
        high: numberValidator,
        low: numberValidator,
        close: numberValidator,
        volume: numberValidator
      }
    })
  }
}

module.exports = Candle

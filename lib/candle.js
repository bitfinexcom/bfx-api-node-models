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
   * @param {Object|Array} data
   * @param {number} data.mts
   * @param {number} data.open
   * @param {number} data.close
   * @param {number} data.high
   * @param {number} data.low
   * @param {number} data.volume
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {Object[]|Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given Candle instance
   *
   * @param {Object[]|Object|Candle[]|Candle|Array} data - instance to validate
   * @return {string} error - null if instance is valid
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

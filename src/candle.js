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
 * Plain candle object used to instantiate model
 *
 * @typedef {object} CandleData
 * @property {number} mts - timestamp
 * @property {number} open - open price
 * @property {number} close - close price
 * @property {number} high - highest price in the period
 * @property {number} low - lowest price in the period
 * @property {number} volume - total volume for the period
 */

/**
 * OHLCV Candle model
 *
 * @extends Model
 */
class Candle extends Model {
  /**
   * @param {CandleData|CandleData[]|Array|Array[]} data - candle ata, one or
   *   multiple in object or array format
   */
  constructor (data) {
    super({ data, fields })
  }

  /**
   * @param {Array|Array[]} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({ data, fields })
  }

  /**
   * Validates a given Candle instance
   *
   * @param {object[]|object|Candle[]|Candle|Array[]|Array} data - instance to
   *   validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
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

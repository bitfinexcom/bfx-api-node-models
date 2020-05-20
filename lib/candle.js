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

require('./types/candle/data')

/**
 * OHLCV Candle model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class Candle extends Model {
  /**
   * @param {module:bfx-api-node-models.Candle~Data} data - candle data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.Candle~Data|
   *   module:bfx-api-node-models.Candle~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.Candle~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given Candle instance
   *
   * @param {(
   *  module:bfx-api-node-models.Candle~Data|
   *  module:bfx-api-node-models.Candle~Data[]
   * )} data - instance(s) to validate
   *
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

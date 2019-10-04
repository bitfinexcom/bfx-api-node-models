'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  mts: 0,
  open: 1,
  close: 2,
  high: 3,
  low: 4,
  volume: 5
}

const FIELD_KEYS = Object.keys(FIELDS)

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

module.exports = Candle

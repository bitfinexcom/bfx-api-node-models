'use strict'

const priceValidator = require('./validators/price')
const symbolValidator = require('./validators/symbol')
const Model = require('./model')

/**
 * Plain alert object used to instantiate model
 *
 * @typedef {object} AlertData
 * @property {string} key - alert key
 * @property {string} type - alert type
 * @property {string} symbol - configured symbol
 * @property {string} price - configured price
 */

/**
 * Price alert model
 *
 * @extends Model
 */
class Alert extends Model {
  static FIELD_INDEX_MAPPING = {
    key: 0,
    type: 1,
    symbol: 2,
    price: 3
  };

  /** @type {string} */
  key;

  /** @type {string} */
  type;

  /** @type {string} */
  symbol;

  /** @type {string} */
  price;

  constructor (data) {
    const parsedData = {}
    super({ data, parsedData })
    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array|Array[]} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: Alert.FIELD_INDEX_MAPPING,
      data
    })
  }

  /**
   * Validates a given alert instance
   *
   * TODO: validate type (get a list)
   *
   * @param {object[]|object|Alert[]|Alert|Array[]|Array} data - instance to
   *   validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields: Alert.FIELD_INDEX_MAPPING,
      validators: {
        price: priceValidator,
        symbol: symbolValidator
      }
    })
  }
}

module.exports = Alert

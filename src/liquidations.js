'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const symbolValidator = require('./validators/symbol')
const priceValidator = require('./validators/price')
const boolValidator = require('./validators/bool')
const _flatten = require('lodash/flatten')
const _compact = require('lodash/compact')
const Model = require('./model')

/**
 * Plain liquidation object used to instantiate model
 *
 * @typedef {object} LiquidationData
 * @property {number} posId - position ID
 * @property {number} mtsUpdated - timestamp
 * @property {string} symbol - symbol
 * @property {number} amount - amount
 * @property {number} basePrice - base price
 * @property {number|boolean} isMatch - matched flag
 * @property {number|boolean} isMarketSold - sold flag
 */

/**
 * Liquidation Info model
 *
 * @extends Model
 */
class Liquidations extends Model {
  static FIELD_INDEX_MAPPING = {
    posId: 1,
    mtsUpdated: 2,
    symbol: 4,
    amount: 5,
    basePrice: 6,
    isMatch: 8,
    isMarketSold: 9
  };

  /** @type {number} */
  posId;

  /** @type {number} */
  mtsUpdated;

  /** @type {string} */
  symbol;

  /** @type {number} */
  amount;

  /** @type {number} */
  basePrice;

  /** @type {number} */
  isMatch;

  /** @type {number} */
  isMarketSold;

  /**
   * @param {LiquidationData[]|LiquidationData|Array[]|Array} data - liquidation
   *   data, one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}

    super({
      fields: Liquidations.FIELD_INDEX_MAPPING,
      parsedData,
      data
    })

    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: Liquidations.FIELD_INDEX_MAPPING,
      data
    })
  }

  /**
   * @returns {string} str
   */
  toString () {
    const {
      mtsUpdated, symbol, amount, basePrice, isMatch, isMarketSold
    } = this

    const tokens = [
      new Date(mtsUpdated).toLocaleString(),
      symbol,
      [amount, '@', basePrice],
      isMatch && 'matched',
      isMarketSold && 'sold'
    ]

    return _compact(_flatten(tokens)).join(' ')
  }

  /**
   * Validates a given liquidation instance
   *
   * @param {object[]|object|Liquidations[]|Liquidations|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields: Liquidations.FIELD_INDEX_MAPPING,
      validators: {
        posId: numberValidator,
        mtsUpdated: dateValidator,
        symbol: symbolValidator,
        amount: amountValidator,
        basePrice: priceValidator,
        isMatch: boolValidator,
        isMarketSold: boolValidator
      }
    })
  }
}

module.exports = Liquidations

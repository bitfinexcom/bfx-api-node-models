'use strict'

const _isEmpty = require('lodash/isEmpty')
const _isArray = require('lodash/isArray')

const numberValidator = require('./validators/number')
const amountValidator = require('./validators/amount')
const symbolValidator = require('./validators/symbol')
const isCollection = require('./util/is_collection')
const Model = require('./model')

/**
 * Funding info data
 *
 * @typedef {object} FundingInfoData
 * @property {string} [symbol] - symbol
 * @property {number} yieldLoan - yield loan
 * @property {number} yieldLend - yield lend
 * @property {number} durationLoan - duration loan
 * @property {number} durationLend - duration lend
 */

/**
 * Data packet containing funding info data for a symbol
 *
 * @typedef {object} FundingInfoEventPacket
 * @property {string} symbol - symbol
 * @property {Array<number>} payload - packet data
 */

/**
 * Account Funding Info model
 *
 * @extends Model
 */
class FundingInfo extends Model {
  /** @type {string} */
  symbol;

  /** @type {number} */
  yieldLoan;

  /** @type {number} */
  yieldLend;

  /** @type {number} */
  durationLoan;

  /** @type {number} */
  durationLend;

  /**
   * Create a new instance from a data payload
   *
   * @param {object[]|object|Array[]|Array} data - funding info data
   */
  constructor (data) {
    const parsedData = {}
    super({ data, parsedData })
    Model.setParsedProperties(this, parsedData)
  }

  /**
   * Return an array representation of this model
   *
   * @returns {Array} arr
   */
  serialize () {
    const { symbol, yieldLoan, yieldLend, durationLoan, durationLend } = this

    return [
      'sym',
      symbol,
      [
        yieldLoan,
        yieldLend,
        durationLoan,
        durationLend
      ]
    ]
  }

  /**
   * TODO: Figure out a better object key for 'payload', as we need to support
   *       both arrays and POJOs
   *
   * @param {FundingInfoEventPacket[]|FundingInfoEventPacket} data - data
   * @returns {FundingInfoData|FundingInfoData[]} pojo
   */
  static unserialize (data) {
    if (isCollection(data)) {
      const collection = /** @type {FundingInfoEventPacket[]} */ (data)

      return (/** @type {FundingInfoData[]} */ (
        collection.map(FundingInfo.unserialize)
      ))
    }

    let symbol
    let payload = []

    if (_isArray(data)) {
      const serializedPacket = /** @type {Array} */ (data)
      symbol = serializedPacket[1]
      payload = /** @type {Array<number>} */ (serializedPacket[2])
    } else {
      symbol = data.symbol
      payload = data.payload
    }

    const [yieldLoan, yieldLend, durationLoan, durationLend] = payload

    return {
      symbol,
      yieldLoan,
      yieldLend,
      durationLoan,
      durationLend
    }
  }

  /**
   * Validates a given funding info instance
   *
   * @param {object[]|object|FundingInfo[]|FundingInfo|Array} data - instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    const { symbol, yieldLoan, yieldLend, durationLoan, durationLend } = data
    const errorMessage = (
      symbolValidator(symbol) ||
      amountValidator(yieldLoan) ||
      amountValidator(yieldLend) ||
      numberValidator(durationLoan) ||
      numberValidator(durationLend)
    )

    return !_isEmpty(errorMessage)
      ? new Error(errorMessage)
      : null
  }
}

module.exports = FundingInfo

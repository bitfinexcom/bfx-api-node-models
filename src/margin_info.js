'use strict'

const _isEmpty = require('lodash/isEmpty')
const _isArray = require('lodash/isArray')

const numberValidator = require('./validators/number')
const amountValidator = require('./validators/amount')
const symbolValidator = require('./validators/symbol')
const stringValidator = require('./validators/string')
const isCollection = require('./util/is_collection')
const Model = require('./model')

/**
 * Margin info data
 *
 * @typedef {object} MarginInfoData
 * @property {string} [type] - type
 * @property {string} [symbol] - symbol
 * @property {number} [userPL] - profit/loss
 * @property {number} [userSwaps] - swaps
 * @property {number} [marginBalance] - total margin balance
 * @property {number} [marginNet] - balance after profit/loss
 * @property {number} [tradableBalance] - usable balance accounting for
 *   leverage
 * @property {number} [grossBalance] - gross balance
 * @property {number} [buy] - buy
 * @property {number} [sell] - sell
 */

/**
 * Data packet containing margin info data for a symbol
 *
 * @typedef {object} MarginInfoEventPacket
 * @property {string} type - type
 * @property {string} symbol - symbol
 * @property {Array<number>} payload - packet data
 */

/**
 * Margin Info model
 *
 * @extends Model
 */
class MarginInfo extends Model {
  /** @type {string} */
  symbol;

  /** @type {string} */
  type;

  /** @type {number} */
  userPL;

  /** @type {number} */
  userSwaps;

  /** @type {number} */
  marginBalance;

  /** @type {number} */
  marginNet;

  /** @type {number} */
  tradableBalance;

  /** @type {number} */
  grossBalance;

  /** @type {number} */
  buy;

  /** @type {number} */
  sell;

  /**
   * Create a new instance from a data payload
   *
   * @param {object[]|object|Array[]|Array} data - margin info data
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
    const { type } = this

    if (type === 'base') {
      const { userPL, userSwaps, marginBalance, marginNet } = this

      return [
        type,
        [
          userPL,
          userSwaps,
          marginBalance,
          marginNet
        ]
      ]
    }

    const { symbol, tradableBalance, grossBalance, buy, sell } = this

    return [
      type,
      symbol,
      [
        tradableBalance,
        grossBalance,
        buy,
        sell
      ]
    ]
  }

  /**
   * TODO: Figure out a better object key for 'payload', as we need to support
   *       both arrays and POJOs
   *
   * @param {MarginInfoEventPacket[]|MarginInfoEventPacket} data - data
   * @returns {MarginInfoData|MarginInfoData[]} pojo
   */
  static unserialize (data) {
    if (isCollection(data)) {
      const collection = /** @type {MarginInfoEventPacket[]} */ (data)

      return (/** @type {MarginInfoData[]} */ (
        collection.map(MarginInfo.unserialize)
      ))
    }

    const type = _isArray(data)
      ? (/** @type {string} */ ((/** @type {Array} */ (data))[0]))
      : (/** @type {MarginInfoEventPacket} */ (data)).type

    if (type === 'base') {
      const payload = (_isArray(data)
        ? (/** @type {Array} */ (data))[1]
        : (/** @type {MarginInfoEventPacket} */ (data)).payload
      ) || []

      const [userPL, userSwaps, marginBalance, marginNet] = payload

      return {
        type,
        userPL,
        userSwaps,
        marginBalance,
        marginNet
      }
    }

    let symbol
    let payload

    if (_isArray(data)) {
      const arrayData = /** @type {Array} */ (data)
      symbol = /** @type {string} */ (arrayData[1])
      payload = /** @type {Array<number>} */ (arrayData[2])
    } else {
      const objectData = /** @type {MarginInfoEventPacket} */ (data)
      symbol = objectData.symbol
      payload = objectData.payload
    }

    const [tradableBalance, grossBalance, buy, sell] = payload

    return {
      type,
      symbol,
      tradableBalance,
      grossBalance,
      buy,
      sell
    }
  }

  /**
   * Validates a given margin info instance
   *
   * @param {object[]|object|MarginInfo[]|MarginInfo|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    const { type, symbol, tradableBalance, grossBalance, buy, sell } = data

    const errorMessage = (
      stringValidator(type) ||
      symbolValidator(symbol) ||
      amountValidator(tradableBalance) ||
      amountValidator(grossBalance) ||
      numberValidator(buy) ||
      numberValidator(sell)
    )

    return !_isEmpty(errorMessage)
      ? new Error(errorMessage)
      : null
  }
}

module.exports = MarginInfo

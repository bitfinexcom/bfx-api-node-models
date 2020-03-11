'use strict'

const _isArray = require('lodash/isArray')

const numberValidator = require('./validators/number')
const amountValidator = require('./validators/amount')
const symbolValidator = require('./validators/symbol')
const stringValidator = require('./validators/string')
const isCollection = require('./util/is_collection')
const Model = require('./model')

/**
 * Margin Info model
 */
class MarginInfo extends Model {
  /**
   * Create a new instance from a data payload
   *
   * @param {object[]|object|Array[]|Array} data - margin info data
   */
  constructor (data) {
    super({ data })
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
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    if (isCollection(data)) {
      return data.map(MarginInfo.unserialize)
    }

    const type = _isArray(data) ? data[0] : data.type

    if (type === 'base') {
      const payload = (_isArray(data) ? data[1] : data.payload) || []
      const [userPL, userSwaps, marginBalance, marginNet] = payload

      return {
        type,
        userPL,
        userSwaps,
        marginBalance,
        marginNet
      }
    }

    const symbol = _isArray(data) ? data[1] : data.symbol
    const payload = (_isArray(data) ? data[2] : data.payload) || []
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
   * @param {object[]|object|MarginInfo[]|MarginInfo|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    const { type, symbol, tradableBalance, grossBalance, buy, sell } = this

    return (
      stringValidator(type) ||
      symbolValidator(symbol) ||
      amountValidator(tradableBalance) ||
      amountValidator(grossBalance) ||
      numberValidator(buy) ||
      numberValidator(sell)
    )
  }
}

module.exports = MarginInfo

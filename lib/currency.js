'use strict'

const numberValidator = require('./validators/number')
const stringValidator = require('./validators/string')
const arrayValidator = require('./validators/array')
const currencyValidator = require('./validators/currency')
const Model = require('./model')

const fields = {
  id: 0,
  name: 1,
  pool: 2,
  explorer: 3,
  symbol: 4,
  walletFx: 5
}

/**
 * Currency model
 */
class Currency extends Model {
  /**
   * @param {object|Array} data - currency data
   * @param {string} data.id - id
   * @param {string} data.name - currency name ('Ethereum')
   * @param {string} data.pool - pool
   * @param {string} data.exporer - explorer URL
   * @param {string} data.symbol - symbol ('ETH')
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
   * Validates a given currency instance
   *
   * @param {object[]|object|Currency[]|Currency|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,

      validators: {
        id: numberValidator,
        name: stringValidator,
        pool: stringValidator,
        explorer: arrayValidator,
        currency: currencyValidator,
        walletFx: arrayValidator
      }
    })
  }
}

module.exports = Currency

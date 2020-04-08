'use strict'

const numberValidator = require('./validators/number')
const stringValidator = require('./validators/string')
const currencyValidator = require('./validators/currency')
const Model = require('./model')

const fields = {
  id: 0,
  name: 1,
  pool: 2,
  explorer: 3,
  symbol: 4
}

/**
 * Plain currency object used to instantiate model
 *
 * @typedef {object} CurrencyData
 * @property {string} id - id
 * @property {string} name - currency name ('Ethereum')
 * @property {string} pool - pool
 * @property {string} exporer - explorer URL
 * @property {string} symbol - symbol ('ETH')
 */

/**
 * Currency model
 *
 * @extends Model
 */
class Currency extends Model {
  /**
   * @param {CurrencyData|CurrencyData[]|Array|Array[]} data - currency data,
   *   one or multiple in object or array format
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
   * Validates a given currency instance
   *
   * @param {object[]|object|Currency[]|Currency|Array[]|Array} data - instance
   *   to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields,

      validators: {
        id: numberValidator,
        name: stringValidator,
        pool: stringValidator,
        explorer: stringValidator,
        currency: currencyValidator
      }
    })
  }
}

module.exports = Currency

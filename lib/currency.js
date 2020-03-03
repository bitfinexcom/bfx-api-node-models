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
 * Currency model
 */
class Currency extends Model {
  /**
   * @param {Object|Array} data
   * @param {string} data.id
   * @param {string} data.name
   * @param {string} data.pool
   * @param {string} data.exporer
   * @param {string} data.symbol
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {Object[]|Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given currency instance
   *
   * @param {Object[]|Object|Currency[]|Currency|Array} data - instance to validate
   * @return {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
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

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
 *
 * @class
 * @augments Model
 */
class Currency extends Model {
  /**
   * @param {Currency~Data|Currency~Data[]} data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {Currency~Data|Currency~Data[]} data - data to convert to POJO
   * @returns {Currency~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given currency instance
   *
   * @param {Currency~Data|Currency~Data[]} data - instance(s) to validate
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
        explorer: stringValidator,
        currency: currencyValidator
      }
    })
  }
}

module.exports = Currency

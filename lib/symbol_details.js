'use strict'

const isNil = require('lodash/isNil')
const numberValidator = require('./validators/number')
const stringValidator = require('./validators/string')
const Model = require('./model')
const fields = {
  pair: 0,
  initialMargin: [1, 8],
  minimumMargin: [1, 9],
  maximumOrderSize: [1, 4],
  minimumOrderSize: [1, 3]
}

/**
 * Symbol Details model
 */
class SymbolDetails extends Model {
  /**
   * @param {object|Array} data - symbol details data
   * @param {string} data.pair - pairs
   * @param {number} data.initialMargin - inital margin
   * @param {number} data.minimumMargin - minimum margin
   * @param {string} data.maximumOrderSize - maximum order size
   * @param {string} data.minimumOrderSize - minimum order size
   * @param {boolean} data.margin - flag specifying if margin trading supported for pair
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    const obj = super.unserialize({ data, fields })
    obj.margin = !isNil(obj.initialMargin) && !isNil(obj.minimumMargin)

    return obj
  }

  /**
   * Validates a given symbol details instance
   *
   * @param {object[]|object|SymbolDetails[]|SymbolDetails|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        pair: stringValidator,
        initialMargin: numberValidator,
        minimumMargin: numberValidator,
        maximumOrderSize: stringValidator,
        minimumOrderSize: stringValidator
      }
    })
  }
}

module.exports = SymbolDetails

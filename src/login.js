'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const stringValidator = require('./validators/string')
const Model = require('./model')
const fields = {
  id: 0,
  time: 2,
  ip: 4,
  extraData: 7
}

/**
 * Plain login event object used to instantiate model
 *
 * @typedef {object} LoginEventData
 * @property {number} id - id
 * @property {number} time - timestamp
 * @property {string} ip - client IP address
 * @property {object} extraData - metadata
 */

/**
 * Login event model
 *
 * @extends Model
 */
class Login extends Model {
  /**
   * @param {LoginEventData[]|LoginEventData|Array[]|Array} data - login event
   *   data, one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}
    super({ data, fields, parsedData })
    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({ data, fields })
  }

  /**
   * Validates a given login instance
   *
   * @param {object[]|object|Login[]|Login|Array[]|Array} data - instance to
   *   validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields,
      validators: {
        id: numberValidator,
        time: dateValidator,
        ip: stringValidator
      }
    })
  }
}

module.exports = Login

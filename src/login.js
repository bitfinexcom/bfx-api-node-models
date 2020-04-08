'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const stringValidator = require('./validators/string')
const Model = require('./model')

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
  static FIELD_INDEX_MAPPING = {
    id: 0,
    time: 2,
    ip: 4,
    extraData: 7
  };

  /** @type {number} */
  id;

  /** @type {number} */
  time;

  /** @type {string} */
  ip;

  /** @type {object} */
  extraData;

  /**
   * @param {LoginEventData[]|LoginEventData|Array[]|Array} data - login event
   *   data, one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}

    super({
      fields: Login.FIELD_INDEX_MAPPING,
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
      fields: Login.FIELD_INDEX_MAPPING,
      data
    })
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
      fields: Login.FIELD_INDEX_MAPPING,
      validators: {
        id: numberValidator,
        time: dateValidator,
        ip: stringValidator
      }
    })
  }
}

module.exports = Login

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

require('./types/login/data')

/**
 * Login event model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class Login extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.Login~Data|
   *   module:bfx-api-node-models.Login~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.Login~Data|
   *   module:bfx-api-node-models.Login~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.Login~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given login instance
   *
   * @param {
   *   module:bfx-api-node-models.Login~Data|
   *   module:bfx-api-node-models.Login~Data[]
   * } data - instance(s) to validate
   *
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
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

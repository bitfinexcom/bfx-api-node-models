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
 * Login event model
 *
 * @class
 * @augments Model
 */
class Login extends Model {
  /**
   * @param {Login~Data|Login~Data[]} data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {Login~Data|Login~Data[]} data - data to convert to POJO
   * @returns {Login~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given login instance
   *
   * @param {Login~Data|Login~Data[]} data - instance(s) to validate
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

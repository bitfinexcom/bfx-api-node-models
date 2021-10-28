'use strict'

const Model = require('./model')
const stringValidator = require('./validators/string')

const fields = {
  key: 0,
  value: 1
}

/**
 * Core Settings model
 */

class CoreSettings extends Model {
  /**
   * @param {object|Array} data - core settings data
   * @param {string} data.key - settings key
   * @param {string | Array} [data.value] - settings value
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
   * Validates a given core settings instance
   *
   * @param {object[]|object|CoreSettings[]|CoreSettings|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        key: stringValidator
      }
    })
  }
}

module.exports = CoreSettings

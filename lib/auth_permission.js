'use strict'

const boolValidator = require('./validators/bool')
const stringValidator = require('./validators/string')
const Model = require('./model')
const fields = {
  key: 0,
  read: 1,
  write: 2
}
const boolFields = ['read', 'write']

/**
 * Auth permission model
 */
class AuthPermission extends Model {
  /**
   * @param {object|Array} data - auth permission data
   * @param {string} data.key - operation key
   * @param {boolean} data.read - read permission
   * @param {boolean} data.write - write permission
   */
  constructor (data = {}) {
    super({ data, fields, boolFields })
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields, boolFields })
  }

  /**
   * Validates a given auth permission setting instance
   *
   * @param {object[]|object|AuthPermission[]|AuthPermission|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        key: stringValidator,
        read: boolValidator,
        write: boolValidator
      }
    })
  }
}

module.exports = AuthPermission

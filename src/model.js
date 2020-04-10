'use strict'

const { EventEmitter } = require('events')
const _isFunction = require('lodash/isFunction')
const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _includes = require('lodash/includes')
const _isArray = require('lodash/isArray')
const _isError = require('lodash/isError')
const _keys = require('lodash/keys')

const isCollection = require('./util/is_collection')
const assignFromCollectionOrInstance = require('./util/assign_from_collection_or_instance')

/**
 * @typedef {object} AbstractModelInstance
 * @property {Function} unserialize - must return POJO version of model or
 *   array of POJOs if model is a collection
 */

/**
 * Base model class, providing format-conversion methods
 *
 * @extends EventEmitter
 */
class Model extends EventEmitter {
  /**
   * @param {object} params - model parameters
   * @param {object[]|object|Array} [params.data] - model data
   * @param {object} [params.parsedData] - object to receive initialized model
   *   data; needs to be merged onto child class instance
   * @param {object} [params.fields] - field definitions, { [index]: key }
   * @param {string[]} [params.boolFields] - array of boolean field keys, default empty
   */
  constructor ({
    data = {},
    parsedData = {},
    fields = {},
    boolFields = []
  } = {}) {
    super()

    this._fields = fields
    this._boolFields = boolFields

    if (_isObject(data) || _isArray(data)) {
      assignFromCollectionOrInstance({
        data,
        fields,
        boolFields,
        instance: this,
        target: parsedData
      })
    }
  }

  /**
   * Converts this model to array-format and returns the result
   *
   * @returns {Array} arr
   */
  serialize () {
    const fieldKeys = Object.keys(this._fields)
    const arr = []
    let i, key

    for (let j = 0; j < fieldKeys.length; j += 1) {
      key = fieldKeys[j]
      i = this._fields[key]
      arr[i] = this[key]

      if (_includes(this._boolFields, key)) {
        arr[i] = arr[i] ? 1 : 0
      }
    }

    return arr
  }

  /**
   * Converts this model to object-format and returns the result
   *
   * @returns {object} pojo
   */
  toJS () {
    const { constructor } = this
    const m = /** @type {AbstractModelInstance} */ (
      /** @type {unknown} */ (constructor)
    )

    return m.unserialize(this.serialize())
  }

  /**
   * Generic method for converting either an array, object, or model instance to
   * a POJO.
   *
   * @param {object} args - arguments
   * @param {object[]|object|Array} args.data - can also be a model instance
   * @param {object} args.fields - field definitions, { [index]: key }
   * @param {string[]} [args.boolFields] - array of boolean field keys, default empty
   * @returns {object} pojo
   */
  static unserializeWithDataDefinition ({ data, fields, boolFields = [] }) {
    if (isCollection(data)) {
      return data.map(m => Model.unserializeWithDataDefinition({
        data: m,
        boolFields,
        fields
      }))
    }

    const fieldKeys = Object.keys(fields)
    const obj = {}

    fieldKeys.forEach((key) => {
      if ((fields[key] + '').length === 0) return

      if (_isArray(data)) {
        obj[key] = data[fields[key]]
      } else {
        obj[key] = data[key]
      }

      if (_includes(boolFields, key)) {
        obj[key] = obj[key] === 1
      }
    })

    return obj
  }

  /**
   * Validates either a single model instance or a collection of model instances
   * against a set of validation functions defined per-key.
   *
   * Returns the first error found.
   *
   * @param {object} args - arguments
   * @param {object[]|object|Array} args.data - model or collection to validate
   * @param {object} args.fields - map of fields to array indexes
   * @param {object} args.validators - map of field names to validation funcs
   * @param {string[]} [args.boolFields] - array of boolean field keys, default empty
   * @returns {Error|null} error - null if instance is valid
   */
  static validateWithDataDefinition ({
    data, fields, boolFields = [], validators
  }) {
    if (isCollection(data)) {
      return data.map(i => Model.validateWithDataDefinition({
        data: i,
        fields,
        boolFields,
        validators
      })).find(_isError) || null // return first error
    }

    const keys = Object.keys(validators)

    let key
    let instanceValue

    for (let i = 0; i < keys.length; i += 1) {
      key = keys[i]
      instanceValue = _isArray(data)
        ? data[fields[key]]
        : data[key]

      if (_isFunction(validators[key])) {
        const errMessage = validators[key](instanceValue)

        if (_isString(errMessage)) {
          return new Error(`${key}: ${errMessage}`)
        }
      }
    }

    return null
  }

  /**
   * Helper to apply parsed data from {@link Model#constructor} to class
   * instance
   *
   * @param {object} model - model instance
   * @param {object} parsedData - parsed data
   */
  static setParsedProperties (model, parsedData) {
    _keys(parsedData).forEach(k => { model[k] = parsedData[k] })

    // Typescript does not allow symbols as keys, due to no issue w/ index
    // signature, hence cast symbol -> unknown -> string
    if (parsedData._iterator) {
      const key = (/** @type {string} */ (/** @type {unknown} */ (
        Symbol.iterator
      )))

      model[key] = parsedData._iterator
    }
  }
}

module.exports = Model

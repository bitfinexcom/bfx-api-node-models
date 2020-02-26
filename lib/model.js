'use strict'

const { EventEmitter } = require('events')
const isCollection = require('./util/is_collection')
const assignFromCollectionOrInstance = require('./util/assign_from_collection_or_instance')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _isFunction = require('lodash/isFunction')

/**
 * Base model class, providing format-conversion methods
 */
class Model extends EventEmitter {
  /**
   * @param {Object} params
   * @param {Object[]|Object|Array?} params.data - model data
   * @param {Object?} params.fields - field definitions, { [index]: key }
   * @param {string[]?} params.boolFields - array of boolean field keys, default empty
   */
  constructor ({ data, fields = {}, boolFields = [] } = {}) {
    super()

    this._fields = fields
    this._boolFields = boolFields

    if (_isObject(data) || _isArray(data)) {
      assignFromCollectionOrInstance({
        data,
        fields,
        boolFields,
        target: this
      })
    }
  }

  /**
   * Converts this model to array-format and returns the result
   *
   * @return {Array} arr
   */
  serialize () {
    const fieldKeys = Object.keys(this._fields)
    const arr = []
    let i, key

    for (let j = 0; j < fieldKeys.length; j += 1) {
      key = fieldKeys[j]
      i = this._fields[key]
      arr[i] = this[key]

      if (this._boolFields.indexOf(key) !== -1) {
        arr[i] = arr[i] ? 1 : 0
      }
    }

    return arr
  }

  /**
   * Converts this model to object-format and returns the result
   *
   * @return {Object} pojo
   */
  toJS () {
    return this.constructor.unserialize({
      data: this.serialize(),
      boolFields: this._boolFields,
      fields: this._fields
    })
  }

  /**
   * Generic method for converting either an array, object, or model instance to
   * a POJO.
   *
   * @param {Object} args
   * @param {Object[]|Object|Array} args.data - can also be a model instance
   * @param {Object} args.fields - field definitions, { [index]: key }
   * @param {string[]?} args.boolFields - array of boolean field keys, default empty
   * @return {Object} pojo
   */
  static unserialize ({ data, fields, boolFields = [] }) {
    if (isCollection(data)) {
      return data.map(m => Model.unserialize({
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

      if (boolFields.indexOf(key) !== -1) {
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
   * @param {Object} args
   * @param {Object[]|Object|Array} args.data - model or collection to validate
   * @param {Object} args.fields - map of fields to array indexes
   * @param {Object} args.validators - map of field names to validation funcs
   * @param {string[]?} args.boolFields - array of boolean field keys, default empty
   * @return {Error|null} error - null if instance is valid
   */
  static validate ({ data, fields, boolFields = [], validators }) {
    if (isCollection(data)) {
      return data.map(i => Model.validate({
        data: i,
        fields,
        boolFields,
        validators
      })).find(result => result instanceof Error) || null // return first error
    }

    const fieldKeys = Object.keys(fields)
    const keys = Object.keys(validators)

    let key
    let instanceValue

    for (let i = 0; i < keys.length; i += 1) {
      key = keys[i]
      instanceValue = _isArray(data)
        ? data[fieldKeys[key]]
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
}

module.exports = Model

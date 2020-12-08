'use strict'

const { EventEmitter } = require('events')
const isCollection = require('./util/is_collection')
const assignFromCollectionOrInstance = require('./util/assign_from_collection_or_instance')
const arrFillEmpty = require('./util/arr_fill_empty')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _includes = require('lodash/includes')
const _isError = require('lodash/isError')
const _isFunction = require('lodash/isFunction')
const _get = require('lodash/get')
const _set = require('lodash/set')

/**
 * Base model class, providing format-conversion methods
 */
class Model extends EventEmitter {
  /**
   * @param {object} params - model parameters
   * @param {object[]|object|Array} [params.data] - model data
   * @param {object} [params.fields] - field definitions, { [index]: key }
   * @param {string[]} [params.boolFields] - array of boolean field keys, default empty
   */
  constructor ({ data, fields = {}, boolFields = [] } = {}) {
    super()
    this.emptyFill = null

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
   * @returns {Array} arr
   */
  serialize () {
    const fieldKeys = Object.keys(this._fields)
    const arr = []
    let i, key

    for (let j = 0; j < fieldKeys.length; j += 1) {
      key = fieldKeys[j]
      i = this._fields[key]

      if (_isArray(i)) {
        let value = this[key]
        if (_includes(this._boolFields, key)) {
          value = value ? 1 : 0
        }

        _set(arr, i, value)
        continue
      }

      arr[i] = this[key]

      if (_includes(this._boolFields, key)) {
        arr[i] = arr[i] ? 1 : 0
      }
    }

    // multidimensional array serializations might include empty items,
    // fill them with null
    arrFillEmpty(arr, this.emptyFill)
    return arr
  }

  /**
   * Converts this model to object-format and returns the result
   *
   * @returns {object} pojo
   */
  toJS () {
    return this.constructor.unserialize(this.serialize())
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
      if (_isArray(fields[key])) {
        obj[key] = _get(data, fields[key])

        if (_includes(boolFields, key)) {
          obj[key] = obj[key] === 1
        }
        return
      }

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
  static validate ({ data, fields, boolFields = [], validators }) {
    if (isCollection(data)) {
      return data.map(i => Model.validate({
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
}

module.exports = Model

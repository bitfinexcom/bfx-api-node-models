'use strict'

const { EventEmitter } = require('events')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')

/**
 * Base model class, providing format-conversion methods
 */
class Model extends EventEmitter {
  /**
   * @param {Object?} data - model data
   * @param {Object?} fields - field definitions, { [index]: key }
   * @param {Array?} boolFields - array of boolean field keys
   * @param {Array?} fieldKeys - array of all field keys
   */
  constructor (data = {}, fields = {}, boolFields = [], fieldKeys = []) {
    super()

    this._fields = fields
    this._boolFields = boolFields
    this._fieldKeys = fieldKeys

    // Use/assign passed in data
    if (!_isArray(data) && _isObject(data)) {
      Object.assign(this, data)
    } else if (_isArray(data) && data.length > 0) {
      // Initialize iterator/setup array-like access if passed an array of model
      // data.
      if (_isArray(data[0]) || _isObject(data[0])) {
        const collection = this.constructor.unserialize(data)
        this._collection = collection

        Object.assign(this, collection) // needed for [] access
        this.length = collection.length

        this[Symbol.iterator] = function () {
          return {
            _i: -1,
            next: function () {
              this._i++

              return this._i === collection.length
                ? { done: true }
                : { value: collection[this._i], done: false }
            }
          }
        }
      } else {
        Object.assign(this, this.constructor.unserialize(data))
      }
    }
  }

  /**
   * Converts this model to array-format and returns the result
   *
   * @return {Array} arr
   */
  serialize () {
    const arr = []
    let i, key

    for (let j = 0; j < this._fieldKeys.length; j += 1) {
      key = this._fieldKeys[j]
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
    const arr = this.serialize()

    return this.constructor.unserialize(
      arr, this._fields, this._boolFields, this._fieldKeys
    )
  }

  /**
   * Generic method for converting either an array, object, or model instance to
   * a POJO.
   *
   * @param {Object|Array} data - can also be a model instance
   * @param {Object} fields - field definitions, { [index]: key }
   * @param {Array} boolFields - array of boolean field keys
   * @param {Array} fieldKeys - array of all field keys
   * @return {Object} pojo
   */
  static unserialize (data, fields, boolFields, fieldKeys) {
    if (_isArray(data) && (_isArray(data[0]) || _isObject(data[0]))) {
      return data.map(m => {
        return Model.unserialize(m, fields, boolFields, fieldKeys)
      })
    }

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
}

module.exports = Model

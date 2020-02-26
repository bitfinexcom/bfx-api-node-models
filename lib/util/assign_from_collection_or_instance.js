'use strict'

const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')

/**
 * Merges provided data onto the target model class, supporting both normal
 * object/array format packets and arrays of them. If given an array of
 * packets, the destination model will become iterable.
 *
 * @param {Object} args
 * @param {Object[]|Object|Array[]|Array} args.data
 * @param {Object?} args.fields - index map in the form { [fieldName]: index }
 * @param {Array?} args.boolFields - array of boolean field names
 * @param {ModelClass} args.target
 */
const assignFromCollectionOrInstance = ({ data, fields, boolFields, target }) => {
  // Use/assign passed in data
  if (!_isArray(data) && _isObject(data)) {
    Object.assign(target, data)
  } else if (_isArray(data) && data.length > 0) {
    // Initialize iterator/setup array-like access if passed an array of model
    // data.
    if (_isArray(data[0]) || _isObject(data[0])) {
      const collection = target.constructor.unserialize(data)
      target._collection = collection

      Object.assign(target, collection) // needed for [] access
      target.length = collection.length

      target[Symbol.iterator] = function () {
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
      Object.assign(target, target.constructor.unserialize(data))
    }
  }
}

module.exports = assignFromCollectionOrInstance

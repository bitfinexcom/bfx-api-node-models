'use strict'

const { EventEmitter } = require('events')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')

class Model extends EventEmitter {
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
   * @return {Object} pojo
   */
  toJS () {
    const arr = this.serialize()

    return this.constructor.unserialize(
      arr, this._fields, this._boolFields, this._fieldKeys
    )
  }

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

      // TODO: Convert boolFields to Object to speed lookup
      if (boolFields.indexOf('key') !== -1) {
        obj[key] = obj[key] === 1
      }
    })

    return obj
  }
}

module.exports = Model

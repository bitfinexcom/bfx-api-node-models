'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  key: 0,
  type: 1,
  symbol: 2,
  price: 3
}

const FIELD_KEYS = Object.keys(FIELDS)

class Alert extends Model {
  constructor (data = {}) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }
}

module.exports = Alert

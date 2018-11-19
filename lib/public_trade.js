'use strict'

const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const Model = require('./model')
const BOOL_FIELDS = []
const TRADING_FIELDS = {
  id: 0,
  mts: 1,
  amount: 2,
  price: 3
}

const FUNDING_FIELDS = {
  id: 0,
  mts: 1,
  amount: 2,
  rate: 3,
  period: 4
}

const TRADING_FIELD_KEYS = Object.keys(TRADING_FIELDS)
const FUNDING_FIELD_KEYS = Object.keys(FUNDING_FIELDS)

class PublicTrade extends Model {
  constructor (data = {}) {
    if (_isArray(data)) {
      if (data.length === 5) {
        super(data, FUNDING_FIELDS, BOOL_FIELDS, FUNDING_FIELD_KEYS)
      } else {
        super(data, TRADING_FIELDS, BOOL_FIELDS, TRADING_FIELD_KEYS)
      }
    } else if (_isObject(data)) {
      if (data.rate) {
        super(data, FUNDING_FIELDS, BOOL_FIELDS, FUNDING_FIELD_KEYS)
      } else {
        super(data, TRADING_FIELDS, BOOL_FIELDS, TRADING_FIELD_KEYS)
      }
    } else {
      throw new Error('unknown data type')
    }
  }

  static unserialize (arr) {
    if ((_isArray(arr[0]) && arr[0].length === 5) || (arr.length === 5)) {
      return super.unserialize(arr, FUNDING_FIELDS, BOOL_FIELDS, FUNDING_FIELD_KEYS)
    } else {
      return super.unserialize(arr, TRADING_FIELDS, BOOL_FIELDS, TRADING_FIELD_KEYS)
    }
  }
}

module.exports = PublicTrade
module.exports.TRADING_FIELDS = TRADING_FIELDS
module.exports.FUNDING_FIELDS = FUNDING_FIELDS

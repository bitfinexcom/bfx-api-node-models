'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  key: 0,
  timestamp: 1,
  price: 3,
  priceSpot: 4,
  fundBal: 6,
  fundingAccrued: 9,
  fundingStep: 10
}

const FIELD_KEYS = Object.keys(FIELDS)

class StatusMessagesDeriv extends Model {
  constructor (data = {}) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }
}

module.exports = StatusMessagesDeriv

'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  key: 0,
  price: 1,
  priceSpot: 2,
  basis: 4,
  correctionRebateMaker: 6,
  correctionFeeTaker: 7,
  correctionRebateInsurance: 8,
  fundBal: 10
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

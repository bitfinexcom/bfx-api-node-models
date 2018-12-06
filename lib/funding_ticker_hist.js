'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  symbol: 0,
  bid: 2,
  bidPeriod: 4,
  ask: 5,
  mtsUpdate: 15
}

const FIELD_KEYS = Object.keys(FIELDS)

class FundingTickerHist extends Model {
  constructor (data = {}) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  quote () {
    return this.symbol.substring(4)
  }

  base () {
    return this.symbol.substring(1, 4)
  }
}

module.exports = FundingTickerHist

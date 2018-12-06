'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  symbol: 0,
  status: 1,
  amount: 2,
  basePrice: 3,
  marginFunding: 4,
  marginFundingType: 5,
  pl: 6,
  plPerc: 7,
  liquidationPrice: 8,
  leverage: 9,
  placeholder: 10,
  id: 11,
  mtsCreate: 12,
  mtsUpdate: 13
}

const FIELD_KEYS = Object.keys(FIELDS)

class PositionHist extends Model {
  constructor (data = {}) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }
}

PositionHist.status = {}
const statuses = ['ACTIVE', 'CLOSED']
statuses.forEach((s) => {
  PositionHist.status[s] = s
})

module.exports = PositionHist

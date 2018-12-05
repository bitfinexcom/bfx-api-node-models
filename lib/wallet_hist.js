'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  type: 0,
  currency: 1,
  balance: 2,
  unsettledInterest: 3,
  balanceAvailable: 4,
  placeHolder: 5,
  mtsUpdate: 6
}

const FIELD_KEYS = Object.keys(FIELDS)

class WalletHist extends Model {
  constructor (data = {}) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }
}

WalletHist.type = {}
const types = ['exchange', 'margin', 'funding']

types.forEach((t) => {
  WalletHist.type[t.toUpperCase()] = t
})

module.exports = WalletHist

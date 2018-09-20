'use strict'

const Model = require('./model')
const BOOL_FIELDS = []
const FIELDS = {
  mts: 0,
  type: 1,
  messageID: 2,
  // null: 3,
  notifyInfo: 4,
  code: 5,
  status: 6,
  text: 7
}

const FIELD_KEYS = Object.keys(FIELDS)

class Notification extends Model {
  constructor (data = {}) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }
}

module.exports = Notification

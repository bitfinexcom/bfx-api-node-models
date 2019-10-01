'use strict'

const Model = require('./model')
const BOOL_FIELDS = ['notify', 'hidden', 'renew']
const { prepareAmount, preparePrice } = require('bfx-api-node-util')
const FIELDS = {
  id: 0,
  symbol: 1,
  mtsCreate: 2,
  mtsUpdate: 3,
  amount: 4,
  amountOrig: 5,
  type: 6,
  flags: 9,
  status: 10,
  rate: 14,
  period: 15,
  notify: 16,
  hidden: 17,
  renew: 19,
  rateReal: 20
}

const FIELD_KEYS = Object.keys(FIELDS)

class FundingOffer extends Model {
  /**
  * @param {Object|Array} data - either a map of order fields or a raw array
  * @param {Object} handler - optional, rest or websocket object capable of submitting funding offers
  */
  constructor (data = {}, handler) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
    this._handler = handler
  }

  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  /**
  * Creates an order map that can be passed to the `on` command.
  *
  * @return {Object} o
  */
  toNewOfferPacket () {
    return {
      type: this.type,
      symbol: this.symbol,
      amount: prepareAmount(+this.amount),
      rate: prepareAmount(+this.rate),
      period: this.period,
      flags: this.flags
    }
  }

  /**
   * @param {handler} handler - optional ws or rest, defaults to internal ws
   * @return {Promise} p
   */
  submit (handler = this._handler) {
    if (!handler) return Promise.reject(new Error('no submit handler'))

    return handler.submitFundingOffer(this).then((offerArray) => {
      Object.assign(this, FundingOffer.unserialize(offerArray))
      return this
    })
  }

  cancel (handler = this._handler) {
    if (!handler) return Promise.reject(new Error('no submit handler'))

    return handler.cancelFundingOffer(this.id).then((offerArray) => {
      Object.assign(this, FundingOffer.unserialize(offerArray))
      return this
    })
  }

  close (handler = this._handler) {
    if (!handler) return Promise.reject(new Error('no submit handler'))

    return handler.closeFunding({ id: this.id, type: this.type }).then((offerArray) => {
      Object.assign(this, FundingOffer.unserialize(offerArray))
      return this
    })
  }
}

FundingOffer.status = {}
FundingOffer.type = {
  LEND: 'lend',
  LOAN: 'loan'
}

const statuses = ['ACTIVE', 'EXECUTED', 'PARTIALLY FILLED', 'CANCELED']
statuses.forEach((s) => {
  FundingOffer.status[s.split(' ').join('_')] = s
})

module.exports = FundingOffer

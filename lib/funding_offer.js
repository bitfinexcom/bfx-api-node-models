'use strict'

const _filter = require('lodash/filter')
const _flatten = require('lodash/flatten')
const _isEmpty = require('lodash/isEmpty')
const { RESTv2 } = require('bfx-api-node-rest')
const { prepareAmount, preparePrice } = require('bfx-api-node-util')

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const boolValidator = require('./validators/bool')
const stringValidator = require('./validators/string')
const symbolValidator = require('./validators/symbol')
const Model = require('./model')

const statuses = ['ACTIVE', 'EXECUTED', 'PARTIALLY FILLED', 'CANCELED']
const boolFields = ['notify', 'hidden', 'renew']
const fields = {
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

/**
 * Funding Offer model
 */
class FundingOffer extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {string} data.symbol
   * @param {number} data.mtsCreate
   * @param {number} data.mtsUpdate
   * @param {string} data.amount
   * @param {string} data.amountOrig
   * @param {string} data.type
   * @param {number} data.flags
   * @param {string} data.status
   * @param {number} data.rate
   * @param {number} data.rateReal
   * @param {number} data.period
   * @param {number|boolean} data.notify
   * @param {number|boolean} data.hidden
   * @param {number|boolean} data.renew
   * @param {Object?} apiInterface - rest or websocket object capable of submitting funding offers
   */
  constructor (data = {}, apiInterface) {
    super({ data, fields, boolFields })
    this._apiInterface = apiInterface
  }

  /**
   * @param {Object[]|Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields, boolFields })
  }

  /**
  * Creates an order map that can be used in either the websocket `on`
  * command or a rest request body
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
   * Submit the funding offer
   *
   * @param {RESTv2} apiInterface  - optional rest instance
   * @return {Promise} p
   */
  async submit (apiInterface = this._apiInterface) {
    if (!(apiInterface instanceof RESTv2)) {
      throw new Error('no API interface provided')
    }

    return apiInterface.submitFundingOffer(this).then((offerArray) => {
      Object.assign(this, FundingOffer.unserialize(offerArray))
      return this
    })
  }

  /**
   * Cancel the funding offer
   *
   * @param {RESTv2} apiInterface  - optional rest instance
   * @return {Promise} p
   */
  async cancel (apiInterface = this._apiInterface) {
    if (!(apiInterface instanceof RESTv2)) {
      throw new Error('no API interface provided')
    }

    return apiInterface.cancelFundingOffer(this.id).then((offerArray) => {
      Object.assign(this, FundingOffer.unserialize(offerArray))
      return this
    })
  }

  /**
   * Close the funding offer
   *
   * @param {RESTv2} apiInterface  - optional rest instance
   * @return {Promise} p
   */
  async close (apiInterface = this._apiInterface) {
    if (!(apiInterface instanceof RESTv2)) {
      throw new Error('no API interface provided')
    }

    return apiInterface.closeFunding({
      id: this.id,
      type: this.type
    }).then((offerArray) => {
      Object.assign(this, FundingOffer.unserialize(offerArray))
      return this
    })
  }

  /**
   * Returns a string representation of the position
   *
   * @return {string} desc
   */
  toString () {
    const {
      id, symbol, status, amount, amountOrig, rate, period, renew
    } = this

    return _filter(_flatten([
      id && `(id: ${id})`,
      'funding offer for',
      symbol.substring(1),
      !_isEmpty(status) && `(${status})`,
      'for',
      prepareAmount(amount),
      (!!amountOrig && amountOrig !== amount) && `(${prepareAmount(amountOrig)})`,
      '@',
      preparePrice(rate),
      `(period ${period})`,
      `[renew ${renew ? 'Y' : 'N'}]`
    ]), v => !!v).join(' ')
  }

  /**
   * Validates a given funding offer instance
   *
   * @param {Object[]|Object|FundingOffer[]|FundingOffer|Array} data - instance to validate
   * @return {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        mtsCreate: dateValidator,
        mtsUpdate: dateValidator,
        mtsOpening: dateValidator,
        mtsLastPayout: dateValidator,
        amountOrig: amountValidator,
        amount: amountValidator,
        flags: numberValidator,
        rate: numberValidator,
        period: numberValidator,
        rateReal: numberValidator,
        notify: boolValidator,
        hidden: boolValidator,
        renew: boolValidator,
        noClose: boolValidator,
        status: stringValidator,
        symbol: symbolValidator,
        type: stringValidator,
        id: numberValidator
      }
    })
  }
}

FundingOffer.status = {}
FundingOffer.type = {
  LEND: 'lend',
  LOAN: 'loan'
}

statuses.forEach(s => (FundingOffer.status[s.split(' ').join('_')] = s))

module.exports = FundingOffer

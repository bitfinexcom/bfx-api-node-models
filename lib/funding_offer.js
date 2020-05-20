'use strict'

const _flatten = require('lodash/flatten')
const _isEmpty = require('lodash/isEmpty')
const _compact = require('lodash/compact')
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

require('./types/funding_offer/data')
require('./types/funding_offer/submit_payload')

/**
 * Funding Offer model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class FundingOffer extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.FundingOffer~Data|
   *   module:bfx-api-node-models.FundingOffer~Data[]
   * } data - data
   *
   * @param {object} [apiInterface] - rest or websocket object capable of
   *   submitting funding offers
   */
  constructor (data = {}, apiInterface) {
    super({ data, fields, boolFields })
    this._apiInterface = apiInterface
  }

  /**
   * @param {
   *   module:bfx-api-node-models.FundingOffer~Data|
   *   module:bfx-api-node-models.FundingOffer~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.FundingOffer~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields, boolFields })
  }

  /**
   * Creates an order map that can be used in either the websocket `on`
   * command or a rest request body
   *
   * @returns {module:bfx-api-node-models.FundingOffer~SubmitPayload} on
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
   * @param {module:bfx-api-node-rest.RESTv2} [apiInterface] - rest instance
   * @returns {Promise} p
   */
  async submit (apiInterface = this._apiInterface) {
    if (!apiInterface) {
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
   * @param {module:bfx-api-node-rest.RESTv2} [apiInterface] - rest instance
   * @returns {Promise} p
   */
  async cancel (apiInterface = this._apiInterface) {
    if (!apiInterface) {
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
   * @param {module:bfx-api-node-rest.RESTv2} [apiInterface] - rest instance
   * @returns {Promise} p
   */
  async close (apiInterface = this._apiInterface) {
    if (!apiInterface) {
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
   * @returns {string} desc
   */
  toString () {
    const {
      id, symbol, status, amount, amountOrig, rate, period, renew
    } = this

    return _compact(_flatten([
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
    ])).join(' ')
  }

  /**
   * Validates a given funding offer instance
   *
   * @param {(
   *  module:bfx-api-node-models.FundingOffer~Data|
   *  module:bfx-api-node-models.FundingOffer~Data[]
   * )} data - instance to validate
   *
   * @returns {string} error - null if instance is valid
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

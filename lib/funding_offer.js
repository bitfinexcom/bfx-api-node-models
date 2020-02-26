'use strict'

const Model = require('./model')
const { prepareAmount } = require('bfx-api-node-util')

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
   * @param {WSv2|RESTv2?} apiInterface  - optional ws or rest, defaults to internal ws
   * @return {Promise} p
   */
  async submit (apiInterface = this._apiInterface) {
    if (!apiInterface) {
      throw new Error('no API interface provided')
    }

    const offerArray = apiInterface.submitFundingOffer(this)

    Object.assign(this, FundingOffer.unserialize(offerArray))

    return this
  }

  /**
   * @param {WSv2|RESTv2?} apiInterface  - optional ws or rest, defaults to internal ws
   * @return {Promise} p
   */
  async cancel (apiInterface = this._apiInterface) {
    if (!apiInterface) {
      throw new Error('no API interface provided')
    }

    const offerArray = await apiInterface.cancelFundingOffer(this.id)

    Object.assign(this, FundingOffer.unserialize(offerArray))

    return this
  }

  /**
   * @param {WSv2|RESTv2?} apiInterface  - optional ws or rest, defaults to internal ws
   * @return {Promise} p
   */
  async close (apiInterface = this._apiInterface) {
    if (!apiInterface) {
      throw new Error('no API interface provided')
    }

    const { id, type } = this
    const offerArray = await apiInterface.closeFunding({ id, type })

    Object.assign(this, FundingOffer.unserialize(offerArray))

    return this
  }
}

FundingOffer.status = {}
FundingOffer.type = {
  LEND: 'lend',
  LOAN: 'loan'
}

statuses.forEach(s => (FundingOffer.status[s.split(' ').join('_')] = s))

module.exports = FundingOffer

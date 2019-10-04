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
  id: 11,
  mtsCreate: 12,
  mtsUpdate: 13,
  type: 15,
  collateral: 17,
  collateralMin: 18,
  meta: 19
}

const FIELD_KEYS = Object.keys(FIELDS)

/**
 * Position model
 */
class Position extends Model {
  /**
   * @param {Object|Array} data
   * @param {number} data.id
   * @param {number} data.mtsCreate
   * @param {number} data.mtsUpdate
   * @param {number} data.id
   * @param {string} data.symbol
   * @param {string} data.status
   * @param {string} data.type
   * @param {string} data.amount
   * @param {string} data.basePrice
   * @param {string} data.marginFunding
   * @param {string} data.marginFundingType
   * @param {string} data.pl
   * @param {string} data.plPerc
   * @param {string} data.liquidationPrice
   * @param {number} data.leverage
   * @param {number} data.collateral
   * @param {number} data.collateralMin
   * @param {Object} data.meta
   * @param {WSv2|Rest2} apiInterface - optional, rest or websocket object thats capable of submitting position changes
  */
  constructor (data = {}, apiInterface) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
    this._apiInterface = apiInterface
  }

  /**
   * @param {Object|Array} arr
   * @return {Object} pojo
   */
  static unserialize (arr) {
    return super.unserialize(arr, FIELDS, BOOL_FIELDS, FIELD_KEYS)
  }

  /**
   * @param {WSv2|Rest2} apiInterface - optional ws or rest, defaults to internal ws
   * @return {Promise} p
   */
  claim (apiInterface = this._apiInterface) {
    if (!apiInterface) return Promise.reject(new Error('no claim handler'))

    apiInterface.claimPosition(this.id)
      .then((positionArray) => {
        Object.assign(this, Position.unserialize(positionArray))
        return this
      })
  }
}

Position.status = {}
const statuses = ['ACTIVE', 'CLOSED']
statuses.forEach((s) => {
  Position.status[s] = s
})

module.exports = Position

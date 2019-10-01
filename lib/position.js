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
  mtsUpdate: 13,
  type: 15,
  collateral: 17,
  collateralMin: 18,
  meta: 19
}

const FIELD_KEYS = Object.keys(FIELDS)

class Position extends Model {
  /**
  * @param {Object} data - either a map of order fields or a raw array
  * @param {WSv2|Rest2} apiInterface - optional, rest or websocket object thats capable of submitting position changes
  */
  constructor (data = {}, apiInterface) {
    super(data, FIELDS, BOOL_FIELDS, FIELD_KEYS)
    this._apiInterface = apiInterface
  }

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

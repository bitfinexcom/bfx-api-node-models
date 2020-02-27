'use strict'

const Model = require('./model')
const Order = require('./order')

const statuses = ['ACTIVE', 'CLOSED']
const fields = {
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
    super({ data, fields })
    this._apiInterface = apiInterface
  }

  /**
   * @param {Object[]Object|Array[]|Array} data
   * @return {Object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * @param {WSv2|Rest2} apiInterface - optional ws or rest, defaults to internal ws
   * @return {Promise} p
   */
  async claim (apiInterface = this._apiInterface) {
    if (!apiInterface) throw new Error('no claim handler')

    const positionArray = await apiInterface.claimPosition(this.id)
    Object.assign(this, Position.unserialize(positionArray))
    return this
  }

  /**
   * Generate an order that can be used to close the position
   *
   * @param {WSv2|Rest2} apiInterface - optional ws or rest
   * @return {Promise} p
   */
  orderToClose (apiInterface) {
    const { symbol, amount } = this

    return new Order({
      symbol,
      type: Order.type.MARKET,
      amount: +amount * -1,
      flags: Order.flags.REDUCE_ONLY | Order.flags.POS_CLOSE
    }, this._apiInterface)
  }
}

Position.status = {}
statuses.forEach(s => (Position.status[s] = s))

module.exports = Position

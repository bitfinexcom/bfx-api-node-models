'use strict'

const _compact = require('lodash/compact')
const _flatten = require('lodash/flatten')
const _isEmpty = require('lodash/isEmpty')
const { prepareAmount, preparePrice } = require('bfx-api-node-util')

const numberValidator = require('./validators/number')
const symbolValidator = require('./validators/symbol')
const stringValidator = require('./validators/string')
const amountValidator = require('./validators/amount')
const priceValidator = require('./validators/price')
const dateValidator = require('./validators/date')
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

require('./types/position/data')

/**
 * Position model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class Position extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.Position~Data|
   *   module:bfx-api-node-models.Position~Data[]
   * } data - data
   *
   * @param {(
   *   module:bitfinex-api-node.WSv2|
   *   module:bfx-api-node-rest.RESTv2
   * )} [apiInterface] - rest or websocket object that's capable of submitting
   *   position changes
   */
  constructor (data = {}, apiInterface) {
    super({ data, fields })
    this._apiInterface = apiInterface
  }

  /**
   * @param {
   *   module:bfx-api-node-models.Position~Data|
   *   module:bfx-api-node-models.Position~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.Position~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Claim the position
   *
   * @param {module:bfx-api-node-rest.RESTv2} [apiInterface] - api
   * @returns {Promise} p
   */
  async claim (apiInterface = this._apiInterface) {
    if (!apiInterface.claimPosition) {
      throw new Error('claim position only supported on RESTv2')
    }

    return apiInterface.claimPosition(this.id).then((positionArray) => {
      Object.assign(this, Position.unserialize(positionArray))
      return this
    })
  }

  /**
   * Close the position
   *
   * @param {module:bfx-api-node-rest.RESTv2} [apiInterface] - api
   * @returns {Promise} p
   */
  async close (apiInterface = this._apiInterface) {
    if (!apiInterface.closePosition) {
      throw new Error('close position only supported on RESTv2')
    }

    return apiInterface.closePosition({
      position_id: this.id // eslint-disable-line
    })
  }

  /**
   * Generate an order that can be used to close the position.
   *
   * @param {(
   *   module:bitfinex-api-node.WSv2|
   *   module:bfx-api-node-rest.RESTv2
   * )} [apiInterface] - provided to returned `Order` instance
   *
   * @returns {Promise} p
   */
  orderToClose (apiInterface = this._apiInterface) {
    const { symbol, amount } = this

    return new Order({
      symbol,
      type: Order.type.MARKET,
      amount: +amount * -1,
      flags: Order.flags.REDUCE_ONLY | Order.flags.POS_CLOSE
    }, apiInterface)
  }

  /**
   * Returns a string representation of the position.
   *
   * @returns {string} str
   */
  toString () {
    const {
      symbol = '', amount, price, status, id, basePrice, marginFunding, pl,
      liquidationPrice
    } = this

    const market = `${symbol.substring(1, 4)}/${symbol.substring(4)}`

    return _compact(_flatten([
      id && `(id: ${id})`,
      'position on',
      market,
      !_isEmpty(status) && `(${status})`,
      'for',
      prepareAmount(amount),
      '@',
      preparePrice(price),
      `(base price ${preparePrice(basePrice)})`,
      'pl',
      prepareAmount(pl),
      'liq',
      preparePrice(liquidationPrice),
      `[funding ${prepareAmount(marginFunding)}]`
    ])).join(' ')
  }

  /**
   * Validates a given position instance
   *
   * @param {(
   *  module:bfx-api-node-models.Position~Data|
   *  module:bfx-api-node-models.Position~Data[]
   * )} data - instance(s) to validate
   *
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        symbol: symbolValidator,
        status: stringValidator,
        amount: amountValidator,
        basePrice: priceValidator,
        marginFunding: numberValidator,
        marginFundingType: stringValidator,
        pl: numberValidator,
        plPerc: numberValidator,
        liquidationPrice: numberValidator,
        leverage: numberValidator,
        id: numberValidator,
        mtsCreate: dateValidator,
        mtsUpdate: dateValidator,
        type: stringValidator,
        collateral: numberValidator,
        collateralMin: numberValidator
      }
    })
  }
}

Position.status = {}
statuses.forEach(s => (Position.status[s] = s))

module.exports = Position

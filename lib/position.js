'use strict'

const _filter = require('lodash/filter')
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
   * Claim the position
   *
   * @param {RESTv2} apiInterface - optional rest, defaults to internal interface
   * @return {Promise} p
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
   * @param {RESTv2} apiInterface - optional rest, defaults to internal interface
   * @return {Promise} p
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

  /**
   * Returns a string representation of the position
   *
   * @return {string} desc
   */
  toString () {
    const {
      symbol = '', amount, price, status, id, basePrice, marginFunding, pl,
      liquidationPrice
    } = this

    const market = `${symbol.substring(1, 4)}/${symbol.substring(4)}`

    return _filter(_flatten([
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
    ]), v => !!v).join(' ')
  }

  /**
   * Validates a given position instance
   *
   * @param {Object[]|Object|Position[]|Position|Array} data - instance to validate
   * @return {string} error - null if instance is valid
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

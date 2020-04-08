'use strict'

const _keys = require('lodash/keys')
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

/** @typedef { import("./types/jsdoc/rest2").RESTv2 } RESTv2 */
/** @typedef { import("./types/jsdoc/ws2").WSv2 } WSv2 */

/**
 * Plain position object used to instantiate model
 *
 * @typedef {object} PositionData
 * @property {number} id - id
 * @property {number} mtsCreate - creation timestamp
 * @property {number} mtsUpdate - last update timestamp
 * @property {string} symbol - symbol
 * @property {string} status - status
 * @property {string} type - type
 * @property {string} amount - amount
 * @property {string} basePrice - base price
 * @property {string} marginFunding - margin funding
 * @property {string} marginFundingType - margin funding type
 * @property {string} pl - profit/loss
 * @property {string} plPerc - profit/loss as percentage
 * @property {string} liquidationPrice - liquidation price
 * @property {number} leverage - leverage
 * @property {number} collateral - collateral
 * @property {number} collateralMin - minimum collateral to maintain position
 * @property {object} meta - metadata
 */

/**
 * Position model
 *
 * @extends Model
 */
class Position extends Model {
  static status = {
    CLOSED: 0,
    ACTIVE: 1
  };

  static statuses = _keys(Position.status);

  static FIELD_INDEX_MAPPING = {
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
  };

  /** @type {string} */
  symbol;

  /** @type {string} */
  status;

  /** @type {number} */
  amount;

  /** @type {number} */
  basePrice;

  /** @type {number} */
  marginFunding;

  /** @type {string} */
  marginFundingType;

  /** @type {number|null} */
  pl;

  /** @type {number|null} */
  plPerc;

  /** @type {number} */
  liquidationPrice;

  /** @type {number|null} */
  leverage;

  /** @type {number} */
  id;

  /** @type {number} */
  mtsCreate;

  /** @type {number} */
  mtsUpdate;

  /** @type {string} */
  type;

  /** @type {number} */
  collateral;

  /** @type {number} */
  collateralMin;

  /** @type {object} */
  meta;

  /**
   * @param {PositionData[]|PositionData|Array[]|Array} data - position data,
   *   one or multiple in object or array format
   * @param {WSv2|RESTv2} [apiInterface] - rest or websocket object thats
   *   capable of submitting position changes
   */
  constructor (data, apiInterface) {
    const parsedData = {}

    super({
      fields: Position.FIELD_INDEX_MAPPING,
      parsedData,
      data
    })

    Model.setParsedProperties(this, parsedData)

    this._apiInterface = apiInterface
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: Position.FIELD_INDEX_MAPPING,
      data
    })
  }

  /**
   * Claim the position
   *
   * @param {RESTv2} [apiInterface] - defaults to internal interface
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
   * @param {RESTv2} [apiInterface] - defaults to internal interface
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
   * @param {WSv2|RESTv2} [apiInterface] - defaults to internal interface
   * @returns {Order} order
   */
  orderToClose (apiInterface = this._apiInterface) {
    const { symbol, amount } = this

    return new Order({
      symbol,
      type: Order.type.MARKET,
      amount: `${+amount * -1}`,
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
      symbol = '', amount, status, id, basePrice, marginFunding, pl,
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
   * @param {object[]|object|Position[]|Position|Array[]|Array} data - instance
   *   to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields: Position.FIELD_INDEX_MAPPING,
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

module.exports = Position

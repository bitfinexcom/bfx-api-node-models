'use strict'

const numberValidator = require('./validators/number')
const amountValidator = require('./validators/amount')
const symbolValidator = require('./validators/symbol')
const stringValidator = require('./validators/string')
const dateValidator = require('./validators/date')
const boolValidator = require('./validators/bool')
const Model = require('./model')

/**
 * Plain funding credit object used to instantiate model
 *
 * @typedef {object} FundingCreditData
 * @property {number} id - id
 * @property {string} symbol - symbol
 * @property {number} side - side
 * @property {number} mtsCreate - creation timestamp
 * @property {number} mtsUpdate - last update timestamp
 * @property {number} mtsOpening - open timestamp
 * @property {number} mtsLastPayout - last payout timestamp
 * @property {number} amount - remaining amount
 * @property {number} flags - flags
 * @property {string} status - current status
 * @property {number} rate - rate
 * @property {number} rateReal - rate
 * @property {number} period - period
 * @property {string} positionPair - position pair
 * @property {number|boolean} notify - notify flag
 * @property {number|boolean} hidden - hidden flag
 * @property {number|boolean} renew - renew flag
 * @property {number|boolean} noClose - no-close flag
 */

/**
 * Funding Credit model
 *
 * @extends Model
 */
class FundingCredit extends Model {
  static statuses = ['ACTIVE', 'EXECUTED', 'PARTIALLY FILLED', 'CANCELED'];
  static BOOL_FIELDS = ['notify', 'hidden', 'renew', 'noClose'];
  static FIELD_INDEX_MAPPING = {
    id: 0,
    symbol: 1,
    side: 2,
    mtsCreate: 3,
    mtsUpdate: 4,
    amount: 5,
    flags: 6,
    status: 7,
    type: 8,
    rate: 11,
    period: 12,
    mtsOpening: 13,
    mtsLastPayout: 14,
    notify: 15,
    hidden: 16,
    renew: 18,
    rateReal: 19,
    noClose: 20,
    positionPair: 21
  };

  /** @type {number} */
  id;

  /** @type {string} */
  symbol;

  /** @type {number} */
  side;

  /** @type {number} */
  mtsCreate;

  /** @type {number} */
  mtsUpdate;

  /** @type {number} */
  amount;

  /** @type {number} */
  flags;

  /** @type {string} */
  status;

  /** @type {number} */
  type;

  /** @type {number} */
  rate;

  /** @type {number} */
  period;

  /** @type {number} */
  mtsOpening;

  /** @type {number} */
  mtsLastPayout;

  /** @type {number} */
  notify;

  /** @type {number} */
  hidden;

  /** @type {number} */
  renew;

  /** @type {number} */
  rateReal;

  /** @type {number} */
  noClose;

  /** @type {string} */
  positionPair;

  /**
   * @param {FundingCreditData|FundingCreditData[]|Array|Array[]} data - funding
   *   credit data, one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}

    super({
      fields: FundingCredit.FIELD_INDEX_MAPPING,
      boolFields: FundingCredit.BOOL_FIELDS,
      parsedData,
      data
    })

    Model.setParsedProperties(this, parsedData)
  }

  /**
   * @param {Array|Array[]} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: FundingCredit.FIELD_INDEX_MAPPING,
      boolFields: FundingCredit.BOOL_FIELDS,
      data
    })
  }

  /**
   * Validates a given fuding credit instance
   *
   * @param {object[]|object|FundingCredit[]|FundingCredit|Array[]|Array} data
   *   - instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      boolFields: FundingCredit.BOOL_FIELDS,
      fields: FundingCredit.FIELD_INDEX_MAPPING,
      validators: {
        mtsCreate: dateValidator,
        mtsUpdate: dateValidator,
        mtsOpening: dateValidator,
        mtsLastPayout: dateValidator,
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
        id: numberValidator
      }
    })
  }
}

FundingCredit.status = {}
FundingCredit.statuses.forEach(s => (
  FundingCredit.status[s.split(' ').join('_')] = s
))

module.exports = FundingCredit

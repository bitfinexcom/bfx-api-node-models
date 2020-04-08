'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const currencyValidator = require('./validators/currency')
const stringValidator = require('./validators/string')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const Model = require('./model')

/**
 * Plain ledger entry object used to instantiate model
 *
 * @typedef {object} LedgerEntryData
 * @property {number} id - id
 * @property {string} currency - currency
 * @property {number} mts - transaction timestamp
 * @property {number} amount - transaction amount
 * @property {number} balance - balance at time of transaction
 * @property {string} description - transaction description
 */

/**
 * Ledger Entry model; wallet field is automatically populated if a description
 * is provided.
 *
 * @extends Model
 */
class LedgerEntry extends Model {
  static FIELD_INDEX_MAPPING = {
    id: 0,
    currency: 1,
    mts: 3,
    amount: 5,
    balance: 6,
    description: 8,
    wallet: null
  };

  /** @type {number} */
  id;

  /** @type {string} */
  currency;

  /** @type {number} */
  mts;

  /** @type {number} */
  amount;

  /** @type {number} */
  balance;

  /** @type {string} */
  description;

  /** @type {string} */
  wallet;

  /**
   * @param {LedgerEntryData[]|LedgerEntryData|Array[]|Array} data - ledger
   *   entry data, one or multiple in object or array format
   */
  constructor (data) {
    const parsedData = {}

    super({
      fields: LedgerEntry.FIELD_INDEX_MAPPING,
      parsedData,
      data
    })

    Model.setParsedProperties(this, parsedData)

    this.wallet = null

    if (_isString(this.description) && !_isEmpty(this.description)) {
      const spl = this.description.split('wallet')
      this.wallet = (spl && spl.length > 1) ? spl[spl.length - 1].trim() : null
    }
  }

  /**
   * @param {Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({
      fields: LedgerEntry.FIELD_INDEX_MAPPING,
      data
    })
  }

  /**
   * Validates a given ledger entry instance
   *
   * @param {object[]|object|LedgerEntry[]|LedgerEntry|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields: LedgerEntry.FIELD_INDEX_MAPPING,
      validators: {
        id: numberValidator,
        currency: currencyValidator,
        mts: dateValidator,
        amount: amountValidator,
        balance: amountValidator,
        description: stringValidator
      }
    })
  }
}

module.exports = LedgerEntry

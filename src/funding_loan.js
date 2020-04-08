'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const boolValidator = require('./validators/bool')
const stringValidator = require('./validators/string')
const symbolValidator = require('./validators/symbol')
const Model = require('./model')

const statuses = ['ACTIVE', 'EXECUTED', 'PARTIALLY FILLED', 'CANCELED']
const boolFields = ['notify', 'hidden', 'renew', 'noClose']
const fields = {
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
  noClose: 20
}

/**
 * Plain funding loan object used to instantiate model
 *
 * @typedef {object} FundingLoanData
 * @property {number} id - id
 * @property {string} symbol - symbol
 * @property {number} side - side
 * @property {number} mtsCreate - creation timestamp
 * @property {number} mtsUpdate - last update timestamp
 * @property {number} mtsOpening - open timestamp
 * @property {number} mtsLastPayout - last payout timestamp
 * @property {number} amount - amount
 * @property {number} flags - flags
 * @property {number} status - status
 * @property {number} rate - rate
 * @property {number} rateReal - rate real
 * @property {number} period - period flag
 * @property {number|boolean} notify - notify flag
 * @property {number|boolean} hidden - hidden flag
 * @property {number|boolean} renew - renew flag
 * @property {number|boolean} noClose - no-close flag
 */

/**
 * Funding Loan model
 *
 * @extends Model
 */
class FundingLoan extends Model {
  /**
   * @param {FundingLoanData|FundingLoanData[]|Array|Array[]} data - funding
   *   loan data, one or multiple in object or array format
   */
  constructor (data) {
    super({ data, fields, boolFields })
  }

  /**
   * @param {Array|Array[]} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserializeWithDataDefinition({ data, fields, boolFields })
  }

  /**
   * Validates a given funding loan instance
   *
   * @param {object[]|object|FundingLoan[]|FundingLoan|Array[]|Array} data -
   *   instance to validate
   * @returns {Error|null} error - null if instance is valid
   */
  static validate (data) {
    return super.validateWithDataDefinition({
      data,
      fields,
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

FundingLoan.status = {}
FundingLoan.side = {
  LEND: 'Lend',
  LOAN: 'Loan'
}

statuses.forEach(s => (FundingLoan.status[s.split(' ').join('_')] = s))

module.exports = FundingLoan

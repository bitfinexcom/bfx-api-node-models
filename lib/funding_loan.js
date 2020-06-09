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
 * Funding Loan model
 *
 * @class
 * @augments Model
 */
class FundingLoan extends Model {
  /**
   * @param {FundingLoan~Data|FundingLoan~Data[]} data - data
   */
  constructor (data = {}) {
    super({ data, fields, boolFields })
  }

  /**
   * @param {FundingLoan~Data|FundingLoan~Data[]} data - data to convert to
   *   POJO
   * @returns {FundingLoan~ObjectData} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields, boolFields })
  }

  /**
   * Validates a given funding loan instance
   *
   * @param {FundingLoan~Data|FundingLoan~Data[]} data - instance(s) to
   *   validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
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

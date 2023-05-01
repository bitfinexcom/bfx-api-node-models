'use strict'

const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const amountValidator = require('./validators/amount')
const currencyValidator = require('./validators/currency')
const stringValidator = require('./validators/string')
const objectValidator = require('./validators/object')
const Model = require('./model')
const fields = {
  id: 0,
  currency: 1,
  currencyName: 2,
  remark: 4,
  mtsStarted: 5,
  mtsUpdated: 6,
  status: 9,
  amount: 12,
  fees: 13,
  destinationAddress: 16,
  memo: 17,
  transactionId: 20,
  note: 21,
  bankFees: 24,
  bankRouterId: 25,
  externalBankMovId: 28,
  externalBankMovStatus: 29,
  externalBankMovDescription: 30,
  externalBankAccInfo: 31
}

/**
 * Currency Movement Info model
 */
class MovementInfo extends Model {
  /**
   * @param {object|Array} data - movement data
   * @param {number} data.id - id
   * @param {string} data.currency - currency
   * @param {string} data.currencyName - currency name
   * @param {string} data.remark - remarks related to movement
   * @param {number} data.mtsStarted - movement start timestamp
   * @param {number} data.mtsUpdated - last update timestamp
   * @param {string} data.status - status
   * @param {number} data.amount - moved amount
   * @param {number} data.fees - paid fees
   * @param {string} data.destinationAddress - destination address
   * @param {string} data.memo - memo/tag related to transaction
   * @param {string} data.transactionId - transaction ID
   * @param {string} data.note - transaction note
   * @param {number} data.bankFees - wire bank fees
   * @param {number} data.bankRouterId - identifier of bank router
   * @param {string} data.externalBankMovId - external provider movement id
   * @param {string} data.externalBankMovStatus - external provider movement status
   * @param {string} data.externalBankMovDescription - external provider movement info
   * @param {object} data.externalBankAccInfo - external provider bank account information for user
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * Validates a given MovementInfo instance
   *
   * @param {object[]|object|MovementInfo[]|MovementInfo|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        id: numberValidator,
        currency: currencyValidator,
        currencyName: stringValidator,
        remark: stringValidator,
        mtsStarted: dateValidator,
        mtsUpdated: dateValidator,
        status: stringValidator,
        amount: amountValidator,
        fees: numberValidator,
        destinationAddress: stringValidator,
        memo: stringValidator,
        transactionId: stringValidator,
        note: stringValidator,
        bankFees: numberValidator,
        bankRouterId: numberValidator,
        externalBankMovId: stringValidator,
        externalBankMovStatus: stringValidator,
        externalBankMovDescription: stringValidator,
        externalBankAccInfo: objectValidator
      }
    })
  }
}

module.exports = MovementInfo

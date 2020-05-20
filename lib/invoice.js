'use strict'

const stringValidator = require('./validators/string')
const Model = require('./model')

const fields = {
  invoiceHash: 0,
  invoice: 1,
  // PLACEHOLDER
  // PLACEHOLDER
  amount: 4
}

/**
 * Deposit Invoice model
 */
class Invoice extends Model {
  /**
   * @param {object|Array} data       - deposit invoice
   * @param {string} data.invoiceHash - Hashed invoice
   * @param {string} data.invoice     - Requested invoice
   * @param {string} data.amount      - Amount of invoice
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
   * @returns {string} str
   */
  toString () {
    const { invoiceHash, invoice, amount } = this

    return [
      `amount: ${amount}`,
      `invoice: ${invoice}`,
      `invoiceHash: ${invoiceHash}`
    ].join(' ')
  }

  /**
   * Validates a given invoice instance
   *
   * @param {object[]|object|Invoice[]|Invoice|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        invoiceHash: stringValidator,
        invoice: stringValidator,
        amount: stringValidator
      }
    })
  }
}

module.exports = Invoice

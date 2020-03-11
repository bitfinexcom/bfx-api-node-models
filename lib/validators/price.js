'use strict'

const numberValidator = require('./number')

/**
 * Validates a price
 *
 * @param {*} v - value
 * @returns {string} error - null if valid
 */
module.exports = (v) => (numberValidator(v) || v < 0
  ? 'must be a number greater than zero'
  : null
)

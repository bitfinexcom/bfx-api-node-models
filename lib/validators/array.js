'use strict'

/**
 * Validates a bool
 *
 * @param {*} v - value
 * @returns {string} error - null if valid
 */
module.exports = (v) => (!Array.isArray(v)
  ? 'must be an array'
  : null
)

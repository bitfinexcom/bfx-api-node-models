'use strict'

const _isFinite = require('lodash/isFinite')

/**
 * Validates a number
 *
 * @param {*} v - value
 * @returns {string} error - null if valid
 */
module.exports = (v) => (!_isFinite(v)
  ? 'must be a number'
  : null
)

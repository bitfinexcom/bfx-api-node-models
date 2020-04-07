'use strict'

const _isFinite = require('lodash/isFinite')

/**
 * Validates a date
 *
 * @param {*} v - value
 * @returns {string} error - null if valid
 */
module.exports = (v) => (!_isFinite(+v) || +v < 0
  ? 'must be a date or positive number'
  : null
)

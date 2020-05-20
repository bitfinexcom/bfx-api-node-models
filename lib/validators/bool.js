'use strict'

const _isBoolean = require('lodash/isBoolean')

/**
 * Validates a bool
 *
 * @private
 * @memberof module:bfx-api-node-models
 *
 * @param {*} v - value
 * @returns {string} error - null if valid
 */
module.exports = (v) => (!_isBoolean(v)
  ? 'must be a bool'
  : null
)

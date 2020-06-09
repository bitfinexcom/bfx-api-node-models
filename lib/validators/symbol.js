'use strict'

const _values = require('lodash/values')
const _includes = require('lodash/includes')
const { SYMBOLS } = require('bfx-hf-util')
const VALID_SYMBOLS = _values(SYMBOLS)

/**
 * Validates a symbol
 *
 * @param {string} v - value
 * @returns {string} error - null if valid
 */
module.exports = (v) => (!_includes(VALID_SYMBOLS, v)
  ? 'must be a symbol currently traded on Bitfinex'
  : null
)

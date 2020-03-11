'use strict'

const _includes = require('lodash/includes')
const { CURRENCIES } = require('bfx-hf-util')
const VALID_CURRENCIES = Object.values(CURRENCIES)

/**
 * Validates a currency
 *
 * @param {*} v - value
 * @returns {string} error - null if valid
 */
module.exports = (v) => (!_includes(VALID_CURRENCIES, v)
  ? 'must be a currency currently tradable on Bitfinex'
  : null
)

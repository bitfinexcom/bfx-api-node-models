'use strict'

const _isObject = require('lodash/isObject')

/**
 * Validates a object
 *
 * @param {*} v - value
 * @returns {string} error - null if valid
 */
module.exports = (v) => (!_isObject(v)
  ? 'must be an object'
  : null
)

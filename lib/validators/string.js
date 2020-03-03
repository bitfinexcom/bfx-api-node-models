'use strict'

const _includes = require('lodash/includes')
const _isString = require('lodash/isString')

/**
  * Validates a string
  *
  * @param {*} v
  * @param {string[]} validOptions - optional
  * @return {string} error - null if valid
  */
module.exports = (v, validOptions) => (
  !_isString(v) || (validOptions && !_includes(validOptions, v))
    ? 'must be a string'
    : null
)

'use strict'

const _isFinite = require('lodash/isFinite')

/**
  * Validates a number
  *
  * @param {*} v
  * @return {string} error - null if valid
  */
module.exports = (v) => (!_isFinite(v)
  ? 'must be a number'
  : null
)

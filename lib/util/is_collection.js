'use strict'

const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')

/**
 * Checks if the provided data is a collection of models
 *
 * @param {Object[]|Object|Array[]|Array] data
 * @return {boolean} isCollection
 */
module.exports = (data) => (
  _isArray(data) && (_isArray(data[0]) || _isObject(data[0]))
)

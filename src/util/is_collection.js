'use strict'

const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')

/**
 * Checks if the provided data is a collection of models
 *
 * @param {object[]|object|Array[]|Array} data - packet to analyse
 * @returns {boolean} isCollection
 */
module.exports = (data) => (
  _isArray(data) && (_isArray(data[0]) || _isObject(data[0]))
)

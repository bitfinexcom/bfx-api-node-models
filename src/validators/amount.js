'use strict'

const numberValidator = require('./number')

/**
 * Validates an amount
 *
 * @param {*} v - value
 * @returns {string} error - null if valid
 */
module.exports = (v) => numberValidator(v)

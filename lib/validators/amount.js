'use strict'

const numberValidator = require('./number')

/**
 * Validates an amount
 *
 * @private
 * @memberof module:bfx-api-node-models
 *
 * @param {*} v - value
 * @returns {string} error - null if valid
 */
module.exports = (v) => numberValidator(v)

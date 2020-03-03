'use strict'

const numberValidator = require('./number')

/**
  * Validates an amount
  *
  * @param {*} v
  * @return {string} error - null if valid
  */
module.exports = (v) => numberValidator(v)

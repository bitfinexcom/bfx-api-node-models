'use strict'

/**
 * {@link module:bfx-api-node-models.Trade|Trade} data in
 * {@link module:bitfinex-api-node.WSv2|WSv2} array format. Suitable for
 * passing to {@link module:bfx-api-node-models.Trade} to construct a model
 * instance.
 *
 * @typedef {Array} module:bfx-api-node-models.Trade~ArrayData
 * @property {number} 0 - id
 * @property {string} 1 - symbol
 * @property {number} 2 - mtsCreate
 * @property {number} 3 - orderID
 * @property {string} 4 - execAmount
 * @property {string} 5 - execPrice
 * @property {string} 6 - orderType
 * @property {number} 7 - orderPrice
 * @property {number} 8 - maker
 * @property {number} 9 - fee
 * @property {string} 10 - feeCurrency
 */

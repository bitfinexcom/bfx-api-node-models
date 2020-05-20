'use strict'

/**
 * {@link module:bfx-api-node-models.Trade|Trade} data in
 * {@link module:bitfinex-api-node.WSv2|WSv2} array format. Suitable for
 * passing to {@link module:bfx-api-node-models.Trade} to construct a model
 * instance.
 *
 * @typedef {Array} module:bfx-api-node-models.Trade~ArrayData
 * @property {numebr} 0 - id
 * @property {string} 1 - symbol
 * @property {numebr} 2 - mtsCreate
 * @property {numebr} 3 - orderID
 * @property {numebr} 4 - execAmount
 * @property {numebr} 5 - execPrice
 * @property {string} 6 - orderType
 * @property {numebr} 7 - orderPrice
 * @property {number} 8 - maker
 * @property {number} 9 - fee
 * @property {number} 10 - feeCurrency
 */

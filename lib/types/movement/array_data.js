'use strict'

/**
 * {@link module:bfx-api-node-models.Movement|Movement} data in
 * {@link module:bitfinex-api-node.WSv2|WSv2} array format. Suitable for
 * passing to {@link module:bfx-api-node-models.Movement|Movement} to construct
 * a model instance.
 *
 * @typedef {Array} module:bfx-api-node-models.Movement~ArrayData
 * @property {number} 0 - id
 * @property {string} 1 - currency
 * @property {string} 2 - currencyName
 * @property {number} 5 - mtsStarted
 * @property {number} 6 - mtsUpdated
 * @property {string} 9 - status
 * @property {number} 12 - amount
 * @property {number} 13 - fees
 * @property {string} 16 - destinationAddress
 * @property {number} 20 - transactionId
 */

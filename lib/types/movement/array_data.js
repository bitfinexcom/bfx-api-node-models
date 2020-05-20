'use strict'

/**
 * {@link module:bfx-api-node-models.Movement|Movement} data in
 * {@link module:bitfinex-api-node.WSv2|WSv2} array format. Suitable for
 * passing to {@link module:bfx-api-node-models.Movement|Movement} to construct
 * a model instance.
 *
 * @typedef {Array} module:bfx-api-node-models.Movement~ArrayData
 * @property {string} 0 - id
 * @property {string} 1 - currency
 * @property {string} 2 - currencyName
 * @property {string} 5 - mtsStarted
 * @property {string} 6 - mtsUpdated
 * @property {string} 9 - status
 * @property {string} 12 - amount
 * @property {string} 13 - fees
 * @property {string} 16 - destinationAddress
 * @property {string} 20 - transactionId
 */

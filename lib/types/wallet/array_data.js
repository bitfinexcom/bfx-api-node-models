'use strict'

/**
 * {@link module:bfx-api-node-models.Wallet|Wallet} data in
 * {@link module:bitfinex-api-node.WSv2|WSv2} array format. Suitable for
 * passing to {@link module:bfx-api-node-models.Wallet|Wallet} to construct a
 * model instance.
 *
 * @typedef {Array} module:bfx-api-node-models.Wallet~ArrayData
 * @property {string} 0 - type
 * @property {string} 1 - currency
 * @property {number} 2 - balance
 * @property {number} 3 - unsettledInterest
 * @property {number} 4 - balanceAvailable
 * @property {string} 5 - description
 * @property {object} 6 - meta
 */

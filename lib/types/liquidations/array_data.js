'use strict'

/**
 * {@link module:bfx-api-node-models.Liquidations|Liquidations} data in
 * {@link module:bitfinex-api-node.WSv2|WSv2} array format. Suitable for
 * passing to {@link module:bfx-api-node-models.Liquidations|Liquidations} to
 * construct a model instance.
 *
 * @typedef {Array} module:bfx-api-node-models.Liquidations~ArrayData
 * @property {number} 1 - posId
 * @property {number} 2 - mtsUpdated
 * @property {string} 4 - symbol
 * @property {number} 5 - amount
 * @property {number} 6 - basePrice
 * @property {number} 8 - isMatch
 * @property {number} 9 - isMarketSold
 */

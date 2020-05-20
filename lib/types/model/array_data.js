'use strict'

/**
 * {@link module:bfx-api-node-models.Order|Order} data in
 * {@link module:bitfinex-api-node.WSv2|WSv2} array format. Suitable for
 * passing to {@link module:bfx-api-node-models.Order} to construct a model
 * instance.
 *
 * @typedef {Array} module:bfx-api-node-models.Order~ArrayData
 * @property {number} 0 - id
 * @property {number} 1 - gid
 * @property {number} 2 - cid
 * @property {string} 3 - symbol
 * @property {number} 4 - mtsCreate
 * @property {number} 5 - mtsUpdate
 * @property {number} 6 - amount
 * @property {number} 7 - amountOrig
 * @property {string} 8 - type
 * @property {string} 9 - typePrev
 * @property {number} 10 - mtsTIF
 * @property {number} 12 - flags
 * @property {string} 13 - status
 * @property {number} 16 - price
 * @property {number} 17 - priceAvg
 * @property {number} 18 - priceTrailing
 * @property {number} 19 - priceAuxLimit
 * @property {number} 23 - notify
 * @property {number} 24 - hidden
 * @property {number} 25 - placedId
 * @property {string} 28 - routing
 * @property {object} 31 - meta
 */

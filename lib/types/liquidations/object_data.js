'use strict'

/**
 * {@link module:bfx-api-node-models.Liquidations|Liquidations} data in plain
 * object format. Suitable for passing to
 * {@link module:bfx-api-node-models.Liquidations|Liquidations} to construct a
 * model instance.
 *
 * @typedef {object} module:bfx-api-node-models.Liquidations~ObjectData
 * @property {number} posId - position ID
 * @property {number} mtsUpdated - timestamp
 * @property {string} symbol - symbol
 * @property {number} amount - amount
 * @property {number} basePrice - base price
 * @property {number|boolean} isMatch - matched flag
 * @property {number|boolean} isMarketSold - sold flag
 */

'use strict'

/**
 * {@link module:bfx-api-node-models.Order|Order} data in plain object format.
 * Suitable for passing to {@link module:bfx-api-node-models.Order|Order} to
 * construct a model instance.
 *
 * @typedef {object} module:bfx-api-node-models.Order~ObjectData
 * @property {number} id - ID
 * @property {number} [gid] - group ID
 * @property {number} [cid] - client ID
 * @property {string} symbol - symbol
 * @property {number} [mtsCreate] - creation timestamp
 * @property {number} [mtsUpdate] - last update timestamp
 * @property {string} amount - remaining order amount
 * @property {string} [amountOrig] - original/initial order amount
 * @property {module:bfx-api-node-models.Order~Type} [type] - order type
 * @property {module:bfx-api-node-models.Order~Type} [typePrev] - previous type
 * @property {number} [mtsTIF] - TIF timestamp, if set
 * @property {number} [flags] - order flags
 * @property {string} [status] - current order status
 * @property {string} price - order price
 * @property {string} [priceAvg] - average execution price
 * @property {string} [priceTrailing] - trailing distance for TRAILING STOP orders
 * @property {string} [priceAuxLimit] - stop price for STOP LIMIT and OCO orders
 * @property {number|boolean} [notify] - notify flag
 * @property {number} [placedId] - placed ID
 * @property {string} [affiliateCode] - affiliate code
 * @property {number} [lev] - leverage
 */

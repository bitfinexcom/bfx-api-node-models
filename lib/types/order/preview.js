'use strict'

/**
 * Preview of an order for display in an UI, prior to submission
 *
 * @see module:bfx-api-node-models.Order
 *
 * @typedef {object} module:bfx-api-node-models.Order~Preview
 * @property {number} gid - group id
 * @property {number} cid - client ID
 * @property {string} symbol - symbol
 * @property {number} amount - amount
 * @property {module:bfx-api-node-models.Order~Type} type - type
 * @property {number} [price] - price, optional for `MARKET` orders
 * @property {number} notify - notify flag
 * @property {number} flags - flags
 * @property {number} [lev] - leverage
 */

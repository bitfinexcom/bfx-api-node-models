'use strict'

/**
 * Preview of an {@link Order} for display in an UI, prior to submission
 *
 * @typedef {object} Order~Preview
 * @property {number} gid - group id
 * @property {number} cid - client ID
 * @property {string} symbol - symbol
 * @property {number} amount - amount
 * @property {Order~Type} type - type
 * @property {number} [price] - price, optional for `MARKET` orders
 * @property {number} notify - notify flag
 * @property {number} flags - flags
 * @property {number} [lev] - leverage
 */

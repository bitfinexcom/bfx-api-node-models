'use strict'

/**
 * {@link module:bfx-api-node-models.FundingCredit|Funding Credit} data in
 * plain object format. Suitable for passing to
 * {@link module:bfx-api-node-models.FundingCredit|Funding Credit} to construct
 * a model instance.
 *
 * @typedef {object} module:bfx-api-node-models.FundingCredit~ObjectData
 * @property {number} id - id
 * @property {string} symbol - symbol
 * @property {number} side - side
 * @property {number} mtsCreate - creation timestamp
 * @property {number} mtsUpdate - last update timestamp
 * @property {number} mtsOpening - open timestamp
 * @property {number} mtsLastPayout - last payout timestamp
 * @property {number} amount - remaining amount
 * @property {number} flags - flags
 * @property {number} status - current status
 * @property {number} rate - rate
 * @property {number} rateReal - rate
 * @property {number} period - period
 * @property {string} positionPair - position pair
 * @property {number|boolean} notify - notify flag
 * @property {number|boolean} hidden - hidden flag
 * @property {number|boolean} renew - renew flag
 * @property {number|boolean} noClose - no-close flag
 */

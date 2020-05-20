'use strict'

/**
 * {@link module:bfx-api-node-models.FundingOffer|Funding Offer} data in plain object format.
 * Suitable for passing to
 * {@link module:bfx-api-node-models.FundingOffer|Funding Offer} to construct a
 * model instance.
 *
 * @typedef {object} module:bfx-api-node-models.FundingOffer~ObjectData
 * @property {number} id - id
 * @property {string} symbol - symbol
 * @property {number} mtsCreate - creation timestamp
 * @property {number} mtsUpdate - last update timestamp
 * @property {string} amount - remaining amount
 * @property {string} amountOrig - original amount
 * @property {string} type - funding offer type
 * @property {number} flags - flags
 * @property {string} status - current status
 * @property {number} rate - rate
 * @property {number} rateReal - rate real
 * @property {number} period - period for the offer
 * @property {number|boolean} notify - notify flag
 * @property {number|boolean} hidden - hidden flag
 * @property {number|boolean} renew - renew flag
 */

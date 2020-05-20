'use strict'

/**
 * A set of parameters describing an atomic funding offer that can be sent via
 * the {@link module:bitfinex-api-node.WSv2|WSv2} API to submit it.
 *
 * @typedef {object} module:bfx-api-node-models.FundingOffer~SubmitPayload
 * @property {string} type - type
 * @property {string} symbol - symbol
 * @property {string} amount - amount
 * @property {string} rate - rate
 * @property {number} period - period
 * @property {number} flags - flags
 */

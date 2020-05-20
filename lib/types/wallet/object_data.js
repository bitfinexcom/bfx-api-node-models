'use strict'

/**
 * {@link module:bfx-api-node-models.Wallet|Wallet} data in plain object
 * format. Suitable for passing to
 * {@link module:bfx-api-node-models.Wallet|Wallet} to construct a model
 * instance.
 *
 * @typedef {object} module:bfx-api-node-models.Wallet~ObjectData
 * @property {string} type - wallet type (i.e. deposit)
 * @property {string} currency - wallet currency
 * @property {number} balance - total balance
 * @property {number} unsettledInterest - unsettled interest
 * @property {number} balanceAvailable - available balance
 */

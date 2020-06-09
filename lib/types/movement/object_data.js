'use strict'

/**
 * {@link Movement} data in plain object format. Suitable for passing to
 * {@link Movement} to construct a model instance.
 *
 * @typedef {object} Movement~ObjectData
 * @property {number} id - id
 * @property {string} currency - currency
 * @property {string} currencyName - currency name
 * @property {number} mtsStarted - movement start timestamp
 * @property {number} mtsUpdated - last update timestamp
 * @property {string} status - status
 * @property {number} amount - moved amount
 * @property {number} fees - paid fees
 * @property {string} destinationAddress - destination address
 * @property {number} transactionId - transaction ID
 */

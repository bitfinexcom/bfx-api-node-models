'use strict'

/**
 * {@link module:bfx-api-node-models.LedgerEntry|Ledger Entry} data in
 * {@link module:bitfinex-api-node.WSv2|WSv2} array format. Suitable for
 * passing to {@link module:bfx-api-node-models.LedgerEntry|Ledger Entry} to
 * construct a model instance.
 *
 * @typedef {Array} module:bfx-api-node-models.LedgerEntry~ArrayData
 * @property {number} 0 - id
 * @property {string} 1 - currency
 * @property {number} 3 - mts
 * @property {number} 5 - amount
 * @property {number} 6 - balance
 * @property {string} 8 - description
 */

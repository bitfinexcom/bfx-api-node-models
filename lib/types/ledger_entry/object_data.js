'use strict'

/**
 * {@link module:bfx-api-node-models.LedgerEntry|Ledger Entry} data in plain
 * object format. Suitable for passing to
 * {@link module:bfx-api-node-models.LedgerEntry|Ledger Entry} to construct a
 * model instance.
 *
 * @typedef {object} module:bfx-api-node-models.LedgerEntry~ObjectData
 * @property {number} id - id
 * @property {string} currency - currency
 * @property {number} mts - transaction timestamp
 * @property {number} amount - transaction amount
 * @property {number} balance - balance at time of transaction
 * @property {string} description - transaction description
 */

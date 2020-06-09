'use strict'

/**
 * {@link LedgerEntry} data in plain object format. Suitable for passing to
 * {@link LedgerEntry} to construct a model instance.
 *
 * @typedef {object} LedgerEntry~ObjectData
 * @property {number} id - id
 * @property {string} currency - currency
 * @property {number} mts - transaction timestamp
 * @property {number} amount - transaction amount
 * @property {number} balance - balance at time of transaction
 * @property {string} description - transaction description
 */

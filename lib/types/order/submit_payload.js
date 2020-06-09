'use strict'

/**
 * A set of parameters describing an atomic order that can be sent via the WSv2
 * API to submit it.
 *
 * @typedef {object} Order~SubmitPayload
 * @property {number} [gid] - group ID
 * @property {number} [cid] - client ID
 * @property {string} symbol - symbol
 * @property {Order~Type} type - type
 * @property {number} amount - amount
 * @property {number} [price] - optional for `MARKET` orders
 * @property {number} [price_trailing] - required for `TRAILING STOP` orders
 * @property {number} [price_aux_limit] - required for `STOP LIMIT` and `OCO`
 *   orders
 * @property {number} [price_oco_stop] - required for `OCO` orders
 * @property {number} [cid_oco] - required for `OCO` orders
 * @property {number} [lev] - leverage
 * @property {number} [flags=0] - flags
 * @property {object} [meta={}] - metadata
 * @property {string} [meta.aff_code] - affiliate code
 * @property {number} [tif] - time in force
 */

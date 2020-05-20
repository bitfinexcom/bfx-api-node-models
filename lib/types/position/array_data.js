'use strict'

/**
 * {@link module:bfx-api-node-models.Position|Position} data in
 * {@link module:bitfinex-api-node.WSv2|WSv2} array format. Suitable for
 * passing to {@link module:bfx-api-node-models.Position|Position} to construct
 * a model instance.
 *
 * @typedef {Array} module:bfx-api-node-models.Position~ArrayData
 * @property {string} 0 - symbol
 * @property {string} 1 - status
 * @property {number} 2 - amount
 * @property {string} 3 - basePrice
 * @property {string} 4 - marginFunding
 * @property {string} 5 - marginFundingType
 * @property {string} 6 - pl
 * @property {string} 7 - plPerc
 * @property {string} 8 - liquidationPrice
 * @property {number} 9 - leverage
 * @property {number} 11 - id
 * @property {number} 12 - mtsCreate
 * @property {number} 13 - mtsUpdate
 * @property {string} 15 - type
 * @property {number} 17 - collateral
 * @property {number} 18 - collateralMin
 * @property {object} 19 - meta
 */

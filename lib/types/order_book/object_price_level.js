'use strict'

require('./aggregated_price_level')
require('./aggregated_funding_price_level')
require('./raw_price_level')
require('./raw_funding_price_level')

/**
 * A single price level for an
 * {@link module:bfx-api-node-models.OrderBook|Order Book} model, in object
 * format. Contents vary depending between raw & standard order books, and
 * between trading & funding tickers.
 *
 * @typedef {(
 *   module:bfx-api-node-models.OrderBook~AggregatedFundingPriceLevel|
 *   module:bfx-api-node-models.OrderBook~AggregatedPriceLevel|
 *   module:bfx-api-node-models.OrderBook~RawFundingPriceLevel|
 *   module:bfx-api-node-models.OrderBook~RawPriceLevel
 * )} module:bfx-api-node-models.OrderBook~ObjectPriceLevel
 */

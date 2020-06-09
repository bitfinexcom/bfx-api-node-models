'use strict'

/**
 * A single price level for an {@link OrderBook} model, in object format.
 * Contents vary depending between raw & standard order books, and between
 * trading & funding tickers.
 *
 * @typedef {(
 *   OrderBook~AggregatedFundingPriceLevel|
 *   OrderBook~AggregatedPriceLevel|
 *   OrderBook~RawFundingPriceLevel|
 *   OrderBook~RawPriceLevel
 * )} OrderBook~ObjectPriceLevel
 */

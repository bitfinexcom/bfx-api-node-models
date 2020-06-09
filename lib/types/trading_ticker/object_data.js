'use strict'

/**
 * {@link TradingTicker} data in plain object format. Suitable for passing to
 * {@link TradingTicker} to construct a model instance.
 *
 * @typedef {object} TradingTicker~ObjectData
 * @property {string} symbol - symbol
 * @property {number} bid - best bid
 * @property {number} bidSize - total bid size
 * @property {number} ask - best ask
 * @property {number} askSize - total ask size
 * @property {number} dailyChange - change in last 24h period
 * @property {number} dailyChangePerc - change in last 24h period as percent
 * @property {number} lastPrice - last price
 * @property {number} volume - volume in last 24h period
 * @property {number} high - highest price in last 24h period
 * @property {number} low - lowest price in last 24h period
 */

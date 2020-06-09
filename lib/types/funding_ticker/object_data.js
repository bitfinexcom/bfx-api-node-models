'use strict'

/**
 * {@link FundingTicker} data in plain object format. Suitable for passing to
 * {@link FundingTicker} to construct a model instance.
 *
 * @typedef {object} FundingTicker~ObjectData
 * @property {string} symbol - symbol
 * @property {number|boolean} frr - current FRR
 * @property {number} bid - best bid
 * @property {number} bidSize - total bid amount
 * @property {number} bidPeriod - bid period
 * @property {number} ask - best ask
 * @property {number} askSize - total ask amount
 * @property {number} askPeriod - ask period
 * @property {number} dailyChange - net 24h period change
 * @property {number} dailyChangePerc - net 24h period change as percent
 * @property {number} lastPrice - last price
 * @property {number} volume - total volume in last 24h period
 * @property {number} high - highest rate in last 24h period
 * @property {number} low - lowest rate in last 24h period
 */

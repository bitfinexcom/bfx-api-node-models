'use strict'

const Model = require('./model')

class FundingTicker extends Model {
  constructor (data = {}) {
    super(data)
  }

  serialize () {
    const {
      symbol, frr, bid, bidPeriod, bidSize, ask, askPeriod, askSize,
      dailyChange, dailyChangePerc, lastPrice, volume, high, low
    } = this

    return [symbol, [
      frr, bid, bidPeriod, bidSize, ask, askPeriod, askSize, dailyChange,
      dailyChangePerc, lastPrice, volume, high, low
    ]]
  }

  static unserialize (arr) {
    const [ symbol, data = [] ] = arr
    const [
      frr, bid, bidPeriod, bidSize, ask, askPeriod, askSize, dailyChange,
      dailyChangePerc, lastPrice, volume, high, low
    ] = data

    return {
      symbol,
      frr,
      bid,
      bidPeriod,
      bidSize,
      ask,
      askPeriod,
      askSize,
      dailyChange,
      dailyChangePerc,
      lastPrice,
      volume,
      high,
      low
    }
  }
}

module.exports = FundingTicker

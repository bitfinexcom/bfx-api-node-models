'use strict'

const Model = require('./model')

class TradingTicker extends Model {
  constructor (data = {}) {
    super(data)
  }

  serialize () {
    const {
      symbol, bid, bidSize, ask, askSize, dailyChange, dailyChangePerc,
      lastPrice, volume, high, low
    } = this

    return [symbol, [
      bid, bidSize, ask, askSize, dailyChange, dailyChangePerc, lastPrice,
      volume, high, low
    ]]
  }

  static unserialize (arr) {
    const [ symbol, data = [] ] = arr
    const [
      bid, bidSize, ask, askSize, dailyChange, dailyChangePerc, lastPrice,
      volume, high, low
    ] = data

    return {
      symbol,
      bid,
      bidSize,
      ask,
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

module.exports = TradingTicker

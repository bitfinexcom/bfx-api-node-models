'use strict'

const _isArray = require('lodash/isArray')
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
    const [ symbol, data ] = arr
    const [
      bid, bidSize, ask, askSize, dailyChange, dailyChangePerc, lastPrice,
      volume, high, low
    ] = _isArray(data)
      ? data
      : [...arr].splice(1)

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

  quote () {
    return this.symbol.substring(4)
  }

  base () {
    return this.symbol.substring(1, 4)
  }
}

module.exports = TradingTicker

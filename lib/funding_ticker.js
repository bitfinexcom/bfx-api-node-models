'use strict'

const _isArray = require('lodash/isArray')
const Model = require('./model')

class FundingTicker extends Model {
  constructor (data = {}) {
    super(data)
  }

  serialize () {
    const {
      frr, bid, bidPeriod, bidSize, ask, askPeriod, askSize,
      dailyChange, dailyChangePerc, lastPrice, volume, high, low
    } = this

    return [
      frr, bid, bidPeriod, bidSize, ask, askPeriod, askSize, dailyChange,
      dailyChangePerc, lastPrice, volume, high, low
    ]
  }

  static unserialize (arr) {
    const [ data ] = arr
    const [
      frr, bid, bidPeriod, bidSize, ask, askPeriod, askSize, dailyChange,
      dailyChangePerc, lastPrice, volume, high, low
    ] = _isArray(data)
      ? data
      : [...arr].splice(0)

    return {
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

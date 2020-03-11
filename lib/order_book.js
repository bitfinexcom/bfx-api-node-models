'use strict'

const CRC = require('crc-32')
const { EventEmitter } = require('events')
const _isEmpty = require('lodash/isEmpty')
const _isString = require('lodash/isString')
const { preparePrice } = require('bfx-api-node-util')

/**
 * High level OB model to automatically integrate WS updates & maintain sort
 */
class OrderBook extends EventEmitter {
  /**
   * Initializes the order book with an existing snapshot (array form)
   *
   * @param {Array[]|OrderBook} snap - order book snapshot
   * @param {boolean} [raw] - true for raw 'R0' order books
   */
  constructor (snap = [], raw = false) {
    super()

    this.raw = raw

    if (snap instanceof OrderBook) {
      this.bids = snap.bids.slice()
      this.asks = snap.asks.slice()
    } else if (snap && Array.isArray(snap)) {
      this.updateFromSnapshot(snap)
    } else if (snap && Array.isArray(snap.bids) && Array.isArray(snap.asks)) {
      this.bids = snap.bids.slice()
      this.asks = snap.asks.slice()
    } else {
      this.bids = []
      this.asks = []
    }
  }

  /**
   * Returns the total volume at n basis points from the mid price
   *
   * @param {number} bps - basis points from mid price
   * @returns {number} vol - total volume
   */
  volBPSMid (bps) {
    const priceI = this.raw
      ? (this.bids[0] || this.asks[0]).length === 4 ? 2 : 1
      : 0
    const mid = this.midPrice()
    const askLimit = mid * (1 + (bps / 10000))
    const bidLimit = mid * (1 - (bps / 10000))
    let askVol = 0
    let bidVol = 0
    let row

    for (let i = 0; i < this.bids.length; i += 1) {
      row = this.bids[i]

      if (row[priceI] < bidLimit) {
        break
      }

      bidVol += row.length === 4 ? row[3] : row[2]
    }

    for (let i = 0; i < this.asks.length; i += 1) {
      row = this.asks[i]

      if (row[priceI] > askLimit) {
        break
      }

      askVol += Math.abs(row.length === 4 ? row[3] : row[2])
    }

    return askVol + bidVol
  }

  /**
   * Generates a crc-32 checksum of our current state. The checksum'ed string
   * itself is a concatenated list of the top 25 bids & asks, alternating.
   *
   * @see http://blog.bitfinex.com/api/bitfinex-api-order-books-checksums
   *
   * @returns {number} cs
   */
  checksum () {
    const { raw } = this
    const data = []

    for (let i = 0; i < 25; i += 1) {
      const bid = this.bids[i]
      const ask = this.asks[i]

      if (bid) {
        let price = bid[0]
        const amount = bid.length === 4 ? bid[3] : bid[2]
        if (!raw && !_isString(price)) {
          price = Number(preparePrice(price))
          price = /e/.test(price + '')
            ? price.toFixed(Math.abs((price + '').split('e')[1]) + 1) // i.e. 1.7e-7 to fixed
            : price
        }

        data.push(price, amount)
      }

      if (ask) {
        let price = ask[0]
        const amount = ask.length === 4 ? ask[3] : ask[2]
        if (!raw && !_isString(price)) {
          price = Number(preparePrice(price))
          price = /e/.test(price + '')
            ? price.toFixed(Math.abs((price + '').split('e')[1]) + 1) // i.e. 1.7e-7 to fixed
            : price
        }

        data.push(price, amount)
      }
    }

    return CRC.str(data.join(':'))
  }

  /**
   * Like checksum(), but for raw array-format order books
   *
   * @param {Array[]} arr - assumed sorted, [topBid, bid, ..., topAsk, ask, ...]
   * @param {boolean} [raw] - true for raw 'R0' order books
   * @returns {number} cs
   */
  static checksumArr (arr, raw = false) {
    let topAskI = -1

    // find first ask (book is sorted bids first)
    for (let i = 0; i < arr.length; i += 1) {
      if ((arr[i].length === 4 ? Number(-arr[i][3]) : Number(arr[i][2])) < 0) {
        topAskI = i
        break
      }
    }

    const data = []

    let ask
    let bid

    // Either bids/asks may be empty, or have differing lengths
    for (let i = 0; i < 25; i += 1) {
      bid = topAskI === -1 || i < topAskI // still reading bids
        ? arr[i]
        : null // reached asks

      ask = topAskI === -1
        ? null
        : arr[topAskI + i]

      if (bid) {
        let price = bid[0]
        const amount = bid.length === 4 ? bid[3] : bid[2]
        if (!raw && !_isString(price)) {
          price = Number(preparePrice(price))
          price = /e/.test(price + '')
            ? price.toFixed(Math.abs((price + '').split('e')[1]) + 1) // i.e. 1.7e-7 to fixed
            : price
        }
        data.push(price, amount)
      }

      if (ask) {
        let price = ask[0]
        const amount = ask.length === 4 ? ask[3] : ask[2]
        if (!raw && !_isString(price)) {
          price = Number(preparePrice(price))
          price = /e/.test(price + '')
            ? price.toFixed(Math.abs((price + '').split('e')[1]) + 1) // i.e. 1.7e-7 to fixed
            : price
        }
        data.push(price, amount)
      }
    }

    return CRC.str(data.join(':'))
  }

  updateFromSnapshot (snapshot) {
    this.bids = []
    this.asks = []

    if (_isEmpty(snapshot)) {
      return
    }

    for (let i = 0; i < snapshot.length; i++) {
      if (snapshot[i].length === 4) {
        if (Number(snapshot[i][3]) < 0) {
          this.bids.push(snapshot[i])
        } else {
          this.asks.push(snapshot[i])
        }
      } else {
        if (Number(snapshot[i][2]) < 0) {
          this.asks.push(snapshot[i])
        } else {
          this.bids.push(snapshot[i])
        }
      }
    }
  }

  /**
   * Integrate an update packet (add, update, or remove a price level). Emits an
   * 'update' event on success
   *
   * @param {Array} entry - price level to update with
   * @returns {boolean} success - false if entry doesn't match OB
   */
  updateWith (entry) {
    const { raw } = this
    const priceI = raw
      ? entry.length === 4 ? 2 : 1
      : 0
    const numEntry = entry.map((x) => Number(x))
    const count = raw ? -1 : numEntry.length === 4 ? numEntry[2] : numEntry[1]
    const price = numEntry[priceI]
    const oID = numEntry[0] // only for raw books
    const amount = numEntry.length === 4 ? numEntry[3] : numEntry[2]
    const dir = numEntry.length === 4
      ? amount < 0 ? 1 : -1
      : amount < 0 ? -1 : 1
    const side = numEntry.length === 4
      ? amount < 0 ? this.bids : this.asks
      : amount < 0 ? this.asks : this.bids

    let insertIndex = -1
    let pl

    // apply insert directly if empty
    if (side.length === 0 && (raw || count > 0)) {
      side.push(entry)
      this.emit('update', entry)
      return true
    }

    // Match by price level, or order ID for raw books
    for (let i = 0; i < side.length; i++) {
      if ((!raw && Number(side[i][priceI]) === price) || (raw && Number(side[i][0]) === oID)) {
        if ((!raw && count === 0) || (raw && price === 0)) {
          side.splice(i, 1) // remove
          this.emit('update', entry)
          return true
        } else if (!raw || (raw && price > 0)) {
          side.splice(i, 1) // remove, add update as new entry below
          break
        }
      }
    }

    // remove unkown, can happen if OB is initialized w/o all price levels
    if ((raw && price === 0) || (!raw && count === 0)) {
      return false
    }

    for (let i = 0; i < side.length; i++) {
      pl = side[i].map((x) => Number(x))

      if (insertIndex === -1 && (
        (dir === -1 && price < pl[priceI]) || // by price
        (dir === -1 && price === pl[priceI] && (raw && entry[0] < pl[0])) || // by order ID
        (dir === 1 && price > pl[priceI]) ||
        (dir === 1 && price === pl[priceI] && (raw && entry[0] < pl[0]))
      )) {
        insertIndex = i // insert index to maintain sort
        break
      }
    }

    // add
    if (insertIndex === -1) {
      side.push(entry)
    } else {
      side.splice(insertIndex, 0, entry)
    }

    this.emit('update', entry)
    return true
  }

  /**
   * @returns {number} topBid - may be null
   */
  topBid () {
    const priceI = this.raw
      ? (this.bids[0].length === 4 || this.asks[0].length === 4) ? 2 : 1
      : 0
    return (this.topBidLevel() || [])[priceI] || null
  }

  /**
   * @returns {number} topBidLevel - may be null
   */
  topBidLevel () {
    return this.bids[0] || null
  }

  /**
   * @returns {number} topAsk - may be null
   */
  topAsk () {
    const priceI = this.raw
      ? (this.bids[0].length === 4 || this.asks[0].length === 4) ? 2 : 1
      : 0
    return (this.topAskLevel() || [])[priceI] || null
  }

  /**
   * @returns {number} topAskLevel - may be null
   */
  topAskLevel () {
    return this.asks[0] || null
  }

  /**
   * @returns {number} price
   */
  midPrice () {
    const priceI = this.raw
      ? (this.bids[0].length === 4 || this.asks[0].length === 4) ? 2 : 1
      : 0
    const topAsk = (this.asks[0] || [])[priceI] || 0
    const topBid = (this.bids[0] || [])[priceI] || 0

    if (topAsk === 0) return topBid
    if (topBid === 0) return topAsk

    return (topAsk + topBid) / 2
  }

  /**
   * @returns {number} spread - top bid/ask difference
   */
  spread () {
    const priceI = this.raw
      ? (this.bids[0].length === 4 || this.asks[0].length === 4) ? 2 : 1
      : 0
    const topAsk = (this.asks[0] || [])[priceI] || 0
    const topBid = (this.bids[0] || [])[priceI] || 0

    if (topAsk === 0 || topBid === 0) {
      return 0
    }

    return topAsk - topBid
  }

  /**
   * @returns {number} amount - total buy-side volume
   */
  bidAmount () {
    let amount = 0

    for (let i = 0; i < this.bids.length; i++) {
      amount += this.bids[i].length === 4 ? this.bids[i][3] : this.bids[i][2]
    }

    return Math.abs(amount)
  }

  /**
   * @returns {number} amount - total sell-side volume
   */
  askAmount () {
    let amount = 0

    for (let i = 0; i < this.asks.length; i++) {
      amount += this.asks[i].length === 4 ? this.asks[i][3] : this.asks[i][2]
    }

    return Math.abs(amount)
  }

  /**
   * @param {number} price - price level to fetch
   * @returns {object} entry - unserialized, null if not found
   */
  getEntry (price) {
    const priceI = this.raw
      ? (this.bids[0].length === 4 || this.asks[0].length === 4) ? 2 : 1
      : 0
    const side = this.asks.length > 0
      ? price >= this.asks[0][priceI] ? this.asks : this.bids
      : price <= this.bids[0][priceI] ? this.bids : this.asks

    for (let i = 0; i < side.length; i++) {
      if (price === side[i][priceI]) {
        return OrderBook.unserialize(side[i])
      }
    }

    return null
  }

  serialize () {
    return (this.asks || []).concat(this.bids || [])
  }

  /**
   * @returns {object} pojo
   */
  toJS () {
    const arr = this.serialize()
    return OrderBook.unserialize(arr, this.raw)
  }

  /**
   * Modifies an array-format OB in place with an update entry. Maintains sort
   *
   * @param {number[][]} ob - array-format order book
   * @param {number[]} entry - price level to update with
   * @param {boolean} [raw] - true for raw 'R0' order books
   * @returns {boolean} success - false if entry doesn't match OB
   */
  static updateArrayOBWith (ob, entry, raw = false) {
    if (entry.length === 0) {
      return false
    }

    const priceI = raw
      ? entry.length === 4 ? 2 : 1
      : 0
    const price = Number(entry[priceI])
    const amount = entry.length === 4 ? Number(entry[3]) : Number(entry[2])
    const dir = entry.length === 4
      ? amount < 0 ? 1 : -1
      : amount < 0 ? -1 : 1
    const count = raw ? -1 : entry.length === 4 ? Number(entry[2]) : Number(entry[1])
    let insertIndex = -1
    let pl // price level

    for (let i = 0; i < ob.length; i++) {
      pl = ob[i].map((x) => Number(x))

      if (
        (!raw && pl[priceI] === price) ||
        (raw && pl[0] === Number(entry[0]))
      ) {
        if ((!raw && count === 0) || (raw && price === 0)) {
          ob.splice(i, 1) // remove existing
          return true
        } else {
          ob.splice(i, 1) // update; remove & re-insert
          break
        }
      }
    }

    // remove unkown, can happen if OB is initialized w/o all price levels
    if ((!raw && count === 0) || (raw && price === 0)) {
      return false
    }

    for (let i = 0; i < ob.length; i++) {
      pl = ob[i].map((x) => Number(x))

      if (insertIndex === -1) {
        if (
          (dir === -1 && (pl.length === 4 ? -pl[3] : pl[2]) < 0 && price < pl[priceI]) || // by price
          (dir === -1 && (pl.length === 4 ? -pl[3] : pl[2]) < 0 && price === pl[priceI] && (raw && Number(entry[0]) < pl[0])) || // by order ID
          (dir === 1 && (pl.length === 4 ? -pl[3] : pl[2]) > 0 && price > pl[priceI]) ||
          (dir === 1 && (pl.length === 4 ? -pl[3] : pl[2]) > 0 && price === pl[priceI] && (raw && Number(entry[0]) < pl[0])) ||
          (dir === 1 && (pl.length === 4 ? -pl[3] : pl[2]) < 0)
        ) {
          insertIndex = i
          break
        }
      }
    }

    // add
    if (insertIndex === -1) {
      ob.push(entry)
    } else {
      ob.splice(insertIndex, 0, entry)
    }

    return true
  }

  static arrayOBMidPrice (ob = [], raw = false) {
    if (ob.length === 0) return null

    const priceI = raw
      ? ob[0].length === 4 ? 2 : 1
      : 0
    let bestBuy = -Infinity
    let bestAsk = Infinity
    let entry

    for (let i = 0; i < ob.length; i++) {
      entry = ob[i]

      if ((entry.length === 4 ? -entry[3] : entry[2]) > 0 && entry[priceI] > bestBuy) bestBuy = entry[priceI]
      if ((entry.length === 4 ? -entry[3] : entry[2]) < 0 && entry[priceI] < bestAsk) bestAsk = entry[priceI]
    }

    if (bestBuy === -Infinity || bestAsk === Infinity) return null

    return (bestAsk + bestBuy) / 2.0
  }

  /**
   * Converts an array order book entry or snapshot to an object, with 'price',
   * 'count', and 'amount' keys on entries
   *
   * @param {number[]|number[][]} arr - array format order book
   * @param {boolean} [raw] - true for raw 'R0' order books
   * @returns {object} ob - either a map w/ bids & asks, or single entry object
   */
  static unserialize (arr, raw = false) {
    if (Array.isArray(arr[0])) {
      const entries = arr.map(e => OrderBook.unserialize(e, raw))
      const bids = entries.filter(e => (e.rate ? -e.amount : e.amount) > 0)
      const asks = entries.filter(e => (e.rate ? -e.amount : e.amount) < 0)

      return { bids, asks }
    }

    return arr.length === 4
      ? raw ? {
        orderID: arr[0],
        period: arr[1],
        rate: arr[2],
        amount: arr[3]
      } : {
        rate: arr[0],
        period: arr[1],
        count: arr[2],
        amount: arr[3]
      }
      : raw ? {
        orderID: arr[0],
        price: arr[1],
        amount: arr[2]
      } : {
        price: arr[0],
        count: arr[1],
        amount: arr[2]
      }
  }
}

module.exports = OrderBook

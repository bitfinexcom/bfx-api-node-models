/* eslint-env mocha */
'use strict'

const assert = require('assert')
const CRC = require('crc-32')
const { RESTv2 } = require('bfx-api-node-rest')
const { OrderBook } = require('../../../lib')

describe('OrderBook model', () => {
  it('constructor: integrates snapshot', () => {
    const entries = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    const ob = new OrderBook(entries)

    assert.deepStrictEqual(ob.bids, [entries[0]])
    assert.deepStrictEqual(ob.asks, [entries[1]])
  })

  it('topBid/topAsk: returns the top bid/ask, or null', () => {
    const ob = new OrderBook([
      [149, 1, 10],
      [148, 1, 10],
      [145, 1, 10],
      [140, 1, 10],
      [151, 1, -10],
      [152, 1, -10],
      [158, 1, -10],
      [160, 1, -10]
    ])

    assert.strictEqual(ob.topBid(), 149)
    assert.strictEqual(ob.topAsk(), 151)
  })

  it('topBidLevel/topAskLevel: returns the top bid/ask levels, or null', () => {
    const ob = new OrderBook([
      [149, 1, 10],
      [148, 1, 10],
      [145, 1, 10],
      [140, 1, 10],
      [151, 1, -10],
      [152, 1, -10],
      [158, 1, -10],
      [160, 1, -10]
    ])

    assert.deepStrictEqual(ob.topBidLevel(), [149, 1, 10])
    assert.deepStrictEqual(ob.topAskLevel(), [151, 1, -10])
  })

  it('checksum: returns expected value for normal OB', () => {
    const ob = new OrderBook({
      bids: [[6000, 1, 1], [5900, 1, 2]],
      asks: [[6100, 1, -3], [6200, 1, -4]]
    })

    assert.strictEqual(ob.checksum(), CRC.str('6000:1:6100:-3:5900:2:6200:-4'))
  })

  it('checksum: returns expected value for high precision numbers', () => {
    const ob = new OrderBook({
      bids: [['0.000000001', 1, 1], ['0.0000000001', 1, '0.0000000002']],
      asks: [['0.000000002', 1, -3], ['0.000000003', 1, -4]]
    })

    assert.strictEqual(ob.checksum(), CRC.str('0.000000001:1:0.000000002:-3:0.0000000001:0.0000000002:0.000000003:-4'))
  })

  it('updateWith: string update place the entry in the correct position in the book', () => {
    const ob = new OrderBook({
      bids: [['0.1', 1, 1], ['0.09', 1, '5']],
      asks: [['0.2', 1, -3], ['0.3', 1, -4]]
    })
    ob.updateWith(['0.15', 1, -1])
    ob.updateWith(['0.089', 1, 1])

    assert.strictEqual(ob.checksum(), CRC.str('0.1:1:0.15:-1:0.09:5:0.2:-3:0.089:1:0.3:-4'))
  })

  it('checksum: returns expected value for raw OB', () => {
    const ob = new OrderBook({
      bids: [[100, 6000, 1], [101, 6000, 2]], // first field is order ID here
      asks: [[102, 6100, -3], [103, 6100, -4]]
    }, true)

    assert.strictEqual(ob.checksum(), CRC.str('100:1:102:-3:101:2:103:-4'))
  })

  it('checksum: converts exp prices to fixed', () => {
    const ob = new OrderBook({
      bids: [[6000, 1, 1], [1.7e-8, 1, 2]],
      asks: [[6100, 1, -3], [6200, 1, -4]]
    })

    assert.strictEqual(ob.checksum(), CRC.str('6000:1:6100:-3:0.000000017:2:6200:-4'))
  })

  it('checksumArr: returns expected value for normal OB', () => {
    const ob = [
      [6000, 1, 1],
      [5900, 1, 2],
      [6100, 1, -3],
      [6200, 1, -4]
    ]

    assert.strictEqual(
      OrderBook.checksumArr(ob),
      CRC.str('6000:1:6100:-3:5900:2:6200:-4')
    )
  })

  it('checksumArr: converts exp prices to fixed', () => {
    const ob = [
      [6000, 1, 1],
      [1.7e-8, 1, 2],
      [6100, 1, -3],
      [6200, 1, -4]
    ]

    assert.strictEqual(
      OrderBook.checksumArr(ob),
      CRC.str('6000:1:6100:-3:0.000000017:2:6200:-4')
    )
  })

  it('checksumArr: returns expected value for raw OB', () => {
    const ob = [
      [100, 6000, 1],
      [101, 6000, 2],
      [102, 6100, -3],
      [103, 6100, -4]
    ]

    assert.strictEqual(
      OrderBook.checksumArr(ob, true),
      CRC.str('100:1:102:-3:101:2:103:-4')
    )
  })

  it('updateWith: correctly applies update', () => {
    const entries = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    const ob = new OrderBook(entries)
    assert(ob.updateWith([100, 3, 15])) // update bid
    assert(ob.updateWith([200, 3, -15])) // update ask

    assert.deepStrictEqual(ob.bids, [[100, 3, 15]])
    assert.deepStrictEqual(ob.asks, [[200, 3, -15]])

    assert(ob.updateWith([100, 0, 15])) // remove bid
    assert(ob.updateWith([200, 0, -15])) // remove ask

    assert.strictEqual(ob.bids.length, 0)
    assert.strictEqual(ob.asks.length, 0)

    assert(ob.updateWith([150, 1, 2])) // add bid
    assert(ob.updateWith([100, 1, 1])) // add bid
    assert(ob.updateWith([160, 1, 3])) // add bid

    assert(ob.updateWith([161, 1, -3])) // add ask
    assert(ob.updateWith([200, 1, -1])) // add ask
    assert(ob.updateWith([175, 1, -2])) // add ask

    assert.strictEqual(ob.bids.length, 3)
    assert.strictEqual(ob.asks.length, 3)

    assert.deepStrictEqual(ob.bids, [
      [160, 1, 3],
      [150, 1, 2],
      [100, 1, 1]
    ])

    assert.deepStrictEqual(ob.asks, [
      [161, 1, -3],
      [175, 1, -2],
      [200, 1, -1]
    ])

    assert(ob.updateWith([160, 2, 4])) // update top bid
    assert.deepStrictEqual(ob.bids, [
      [160, 2, 4],
      [150, 1, 2],
      [100, 1, 1]
    ])

    assert(ob.updateWith([150, 0, 2])) // remove middle bid
    assert.deepStrictEqual(ob.bids, [
      [160, 2, 4],
      [100, 1, 1]
    ])

    assert(ob.updateWith([159, 1, 42])) // insert middle bid
    assert.deepStrictEqual(ob.bids, [
      [160, 2, 4],
      [159, 1, 42],
      [100, 1, 1]
    ])

    assert(ob.updateWith([159.9, 2, 7])) // insert another bid
    assert.deepStrictEqual(ob.bids, [
      [160, 2, 4],
      [159.9, 2, 7],
      [159, 1, 42],
      [100, 1, 1]
    ])

    assert.deepStrictEqual(ob.asks, [ // verify asks
      [161, 1, -3],
      [175, 1, -2],
      [200, 1, -1]
    ])

    assert(ob.updateWith([161, 2, -4])) // update top ask
    assert.deepStrictEqual(ob.asks, [
      [161, 2, -4],
      [175, 1, -2],
      [200, 1, -1]
    ])

    assert(ob.updateWith([175, 0, -2])) // remove middle ask
    assert.deepStrictEqual(ob.asks, [
      [161, 2, -4],
      [200, 1, -1]
    ])

    assert(ob.updateWith([175, 1, -42])) // insert middle ask
    assert.deepStrictEqual(ob.asks, [
      [161, 2, -4],
      [175, 1, -42],
      [200, 1, -1]
    ])

    assert(ob.updateWith([170, 2, -7])) // insert another ask
    assert.deepStrictEqual(ob.asks, [
      [161, 2, -4],
      [170, 2, -7],
      [175, 1, -42],
      [200, 1, -1]
    ])

    assert.deepStrictEqual(ob.bids, [ // verify bids
      [160, 2, 4],
      [159.9, 2, 7],
      [159, 1, 42],
      [100, 1, 1]
    ])
  })

  it('updateWith: correctly applies update (raw books)', () => {
    let _id = Date.now()
    const id = () => _id++
    const idBidA = id()
    const idBidB = id()
    const idBidC = id()
    const idBidD = id()
    const idBidE = id()
    const idBidF = id()

    const idAskA = id()
    const idAskB = id()
    const idAskC = id()
    const idAskD = id()
    const idAskE = id()
    const idAskF = id()

    const entries = [
      [idBidA, 100, 10],
      [idAskA, 200, -10]
    ]

    const ob = new OrderBook(entries, true)
    assert(ob.updateWith([idBidA, 100, 15])) // update bid
    assert(ob.updateWith([idAskA, 200, -15])) // update ask

    assert.deepStrictEqual(ob.bids, [[idBidA, 100, 15]])
    assert.deepStrictEqual(ob.asks, [[idAskA, 200, -15]])

    assert(ob.updateWith([idBidA, 0, 15])) // remove bid
    assert(ob.updateWith([idAskA, 0, -15])) // remove ask

    assert.strictEqual(ob.bids.length, 0)
    assert.strictEqual(ob.asks.length, 0)

    assert(ob.updateWith([idBidC, 150, 2])) // add bid
    assert(ob.updateWith([idBidB, 100, 1])) // add bid
    assert(ob.updateWith([idBidD, 160, 3])) // add bid

    assert(ob.updateWith([idAskD, 161, -3])) // add ask
    assert(ob.updateWith([idAskB, 200, -1])) // add ask
    assert(ob.updateWith([idAskC, 175, -2])) // add ask

    assert.strictEqual(ob.bids.length, 3)
    assert.strictEqual(ob.asks.length, 3)

    assert.deepStrictEqual(ob.bids, [
      [idBidD, 160, 3],
      [idBidC, 150, 2],
      [idBidB, 100, 1]
    ])

    assert.deepStrictEqual(ob.asks, [
      [idAskD, 161, -3],
      [idAskC, 175, -2],
      [idAskB, 200, -1]
    ])

    assert(ob.updateWith([idBidD, 160, 4])) // update top bid
    assert.deepStrictEqual(ob.bids, [
      [idBidD, 160, 4],
      [idBidC, 150, 2],
      [idBidB, 100, 1]
    ])

    assert(ob.updateWith([idBidC, 0, 2])) // remove middle bid
    assert.deepStrictEqual(ob.bids, [
      [idBidD, 160, 4],
      [idBidB, 100, 1]
    ])

    assert(ob.updateWith([idBidE, 159, 42])) // insert middle bid
    assert.deepStrictEqual(ob.bids, [
      [idBidD, 160, 4],
      [idBidE, 159, 42],
      [idBidB, 100, 1]
    ])

    assert(ob.updateWith([idBidF, 159.9, 7])) // insert another bid
    assert.deepStrictEqual(ob.bids, [
      [idBidD, 160, 4],
      [idBidF, 159.9, 7],
      [idBidE, 159, 42],
      [idBidB, 100, 1]
    ])

    assert.deepStrictEqual(ob.asks, [ // verify asks
      [idAskD, 161, -3],
      [idAskC, 175, -2],
      [idAskB, 200, -1]
    ])

    assert(ob.updateWith([idAskD, 161, -4])) // update top ask
    assert.deepStrictEqual(ob.asks, [
      [idAskD, 161, -4],
      [idAskC, 175, -2],
      [idAskB, 200, -1]
    ])

    assert(ob.updateWith([idAskC, 0, -2])) // remove middle ask
    assert.deepStrictEqual(ob.asks, [
      [idAskD, 161, -4],
      [idAskB, 200, -1]
    ])

    assert(ob.updateWith([idAskE, 165, -42])) // insert middle ask
    assert.deepStrictEqual(ob.asks, [
      [idAskD, 161, -4],
      [idAskE, 165, -42],
      [idAskB, 200, -1]
    ])

    assert(ob.updateWith([idAskF, 162, -7])) // insert another ask
    assert.deepStrictEqual(ob.asks, [
      [idAskD, 161, -4],
      [idAskF, 162, -7],
      [idAskE, 165, -42],
      [idAskB, 200, -1]
    ])

    assert.deepStrictEqual(ob.bids, [ // verify bids
      [idBidD, 160, 4],
      [idBidF, 159.9, 7],
      [idBidE, 159, 42],
      [idBidB, 100, 1]
    ])
  })

  it('updateWith: maintains sort', () => {
    const ob = new OrderBook([
      [100, 100, 10],
      [200, 200, -10]
    ])

    assert(ob.updateWith([20, 5, 10]))
    assert(ob.updateWith([150, 5, 10]))
    assert(ob.updateWith([80, 5, 10]))
    assert(ob.updateWith([300, 5, -10]))
    assert(ob.updateWith([40, 5, 10]))
    assert(ob.updateWith([130, 5, 10]))
    assert(ob.updateWith([342, 5, -10]))
    assert(ob.updateWith([457, 5, -10]))

    for (let i = 0; i < ob.bids.length - 2; i++) {
      assert(ob.bids[i][0] > ob.bids[i + 1][0])
    }

    for (let i = 0; i < ob.asks.length - 2; i++) {
      assert(ob.asks[i][0] < ob.asks[i + 1][0])
    }
  })

  it('updateWith: emits an update event', (done) => {
    const ob = new OrderBook([
      [100, 2, 10],
      [200, 2, -10]
    ])

    ob.on('update', () => {
      done()
    })

    assert(ob.updateWith([20, 5, 10]))
  })

  it('midPrice: calculates mid price', () => {
    const entries = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    const ob = new OrderBook(entries)
    assert.strictEqual(ob.midPrice(), 150)
  })

  it('getEntry: returns null for unknown entries', () => {
    const entries = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    const ob = new OrderBook(entries)
    const entry = ob.getEntry(300)

    assert.strictEqual(entry, null)
  })

  it('getEntry: returns entry even with only one OB side', () => {
    const entriesA = [[100, 2, 10]]
    const entriesB = [[200, 2, -10]]
    const entriesC = [[0.00018942, 2, 11, 173094.48801557]]
    const entriesD = [[0.0001921, 30, 1, -5000]]

    const obA = new OrderBook(entriesA)
    const obB = new OrderBook(entriesB)
    const obC = new OrderBook(entriesC)
    const obD = new OrderBook(entriesD)

    assert.deepStrictEqual(obA.getEntry(100), { price: 100, count: 2, amount: 10 })
    assert.deepStrictEqual(obB.getEntry(200), { price: 200, count: 2, amount: -10 })
    assert.deepStrictEqual(obC.getEntry(0.00018942), { rate: 0.00018942, count: 11, amount: 173094.48801557, period: 2 })
    assert.deepStrictEqual(obD.getEntry(0.0001921), { rate: 0.0001921, count: 1, amount: -5000, period: 30 })
  })

  it('getEntry: unserializes entry before returning', () => {
    const entries = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    const ob = new OrderBook(entries)
    const entry = ob.getEntry(100)

    assert.strictEqual(entry.price, 100)
    assert.strictEqual(entry.count, 2)
    assert.strictEqual(entry.amount, 10)
  })

  it('updateArrayOBWith: returns false for unknown entry', () => {
    const ob = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    assert(!OrderBook.updateArrayOBWith(ob, [300, 0, -1]))
    assert(!OrderBook.updateArrayOBWith(ob, [300, 0, 1]))
  })

  it('updateArrayOBWith: correctly applies update', () => {
    const ob = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    assert(OrderBook.updateArrayOBWith(ob, [100, 0, 1])) // general manipulation
    assert(OrderBook.updateArrayOBWith(ob, [150, 1, 16]))
    assert(OrderBook.updateArrayOBWith(ob, [200, 7, -42]))
    assert(OrderBook.updateArrayOBWith(ob, [121, 3, 14]))
    assert(OrderBook.updateArrayOBWith(ob, [300, 1, -4]))
    assert.deepStrictEqual(ob, [
      [150, 1, 16],
      [121, 3, 14],
      [200, 7, -42],
      [300, 1, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [130, 1, 10])) // add middle bid
    assert.deepStrictEqual(ob, [
      [150, 1, 16],
      [130, 1, 10],
      [121, 3, 14],
      [200, 7, -42],
      [300, 1, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [140, 1, 20])) // add another bid
    assert.deepStrictEqual(ob, [
      [150, 1, 16],
      [140, 1, 20],
      [130, 1, 10],
      [121, 3, 14],
      [200, 7, -42],
      [300, 1, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [140, 1, 42])) // update the new bid
    assert.deepStrictEqual(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [130, 1, 10],
      [121, 3, 14],
      [200, 7, -42],
      [300, 1, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [130, 0, 42])) // remove a bid
    assert.deepStrictEqual(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [121, 3, 14],
      [200, 7, -42],
      [300, 1, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [250, 1, -10])) // add middle ask
    assert.deepStrictEqual(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [121, 3, 14],
      [200, 7, -42],
      [250, 1, -10],
      [300, 1, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [220, 1, -20])) // add another ask
    assert.deepStrictEqual(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [121, 3, 14],
      [200, 7, -42],
      [220, 1, -20],
      [250, 1, -10],
      [300, 1, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [220, 1, -42])) // update the new ask
    assert.deepStrictEqual(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [121, 3, 14],
      [200, 7, -42],
      [220, 1, -42],
      [250, 1, -10],
      [300, 1, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [300, 0, -4])) // remove an ask
    assert.deepStrictEqual(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [121, 3, 14],
      [200, 7, -42],
      [220, 1, -42],
      [250, 1, -10]
    ])
  })

  it('updateArrayOBWith: correctly applies update (raw books)', () => {
    let _id = Date.now()
    const id = () => _id++
    const idBidA = id()
    const idBidB = id()
    const idBidC = id()
    const idAskA = id()
    const idAskB = id()

    const ob = [
      [idBidA, 100, 10],
      [idAskA, 200, -10]
    ]

    assert(OrderBook.updateArrayOBWith(ob, [idBidA, 0, 10], true)) // general manipulation
    assert(OrderBook.updateArrayOBWith(ob, [idBidB, 150, 16], true))
    assert(OrderBook.updateArrayOBWith(ob, [idAskA, 200, -42], true))
    assert(OrderBook.updateArrayOBWith(ob, [idBidC, 121, 14], true))
    assert(OrderBook.updateArrayOBWith(ob, [idAskB, 300, -4], true))
    assert.deepStrictEqual(ob, [
      [idBidB, 150, 16],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskB, 300, -4]
    ])

    const idBidD = id()
    assert(OrderBook.updateArrayOBWith(ob, [idBidD, 130, 10], true)) // add middle bid
    assert.deepStrictEqual(ob, [
      [idBidB, 150, 16],
      [idBidD, 130, 10],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskB, 300, -4]
    ])

    const idBidE = id()
    assert(OrderBook.updateArrayOBWith(ob, [idBidE, 140, 20], true)) // add another bid
    assert.deepStrictEqual(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 20],
      [idBidD, 130, 10],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskB, 300, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [idBidE, 140, 42], true)) // update the new bid
    assert.deepStrictEqual(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidD, 130, 10],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskB, 300, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [idBidD, 0, 42], true)) // remove a bid
    assert.deepStrictEqual(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskB, 300, -4]
    ])

    const idAskC = id()
    assert(OrderBook.updateArrayOBWith(ob, [idAskC, 250, -10], true)) // add middle ask
    assert.deepStrictEqual(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskC, 250, -10],
      [idAskB, 300, -4]
    ])

    const idAskD = id()
    assert(OrderBook.updateArrayOBWith(ob, [idAskD, 220, -20], true)) // add another ask
    assert.deepStrictEqual(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskD, 220, -20],
      [idAskC, 250, -10],
      [idAskB, 300, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [idAskD, 220, -42], true)) // update the new ask
    assert.deepStrictEqual(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskD, 220, -42],
      [idAskC, 250, -10],
      [idAskB, 300, -4]
    ])

    assert(OrderBook.updateArrayOBWith(ob, [idAskB, 0, -4], true)) // remove an ask
    assert.deepStrictEqual(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskD, 220, -42],
      [idAskC, 250, -10]
    ])
  })

  it('unserialize: returns bid/asks map for snapshots', () => {
    const obAData = [
      [100, 2, 10],
      [200, 2, -10]
    ]
    const obBData = [
      [0.0005, 30, 1, -5000],
      [0.0008, 2, 5, 2000]
    ]

    const obA = OrderBook.unserialize(obAData)
    const obB = OrderBook.unserialize(obBData)
    assert.strictEqual(typeof obA, 'object')
    assert.strictEqual(typeof obB, 'object')
    assert.strictEqual(Object.keys(obA).length, 2)
    assert.strictEqual(Object.keys(obB).length, 2)
    assert.deepStrictEqual(obA.bids, [{ price: 100, count: 2, amount: 10 }])
    assert.deepStrictEqual(obA.asks, [{ price: 200, count: 2, amount: -10 }])
    assert.deepStrictEqual(obB.bids, [{ rate: 0.0005, count: 1, amount: -5000, period: 30 }])
    assert.deepStrictEqual(obB.asks, [{ rate: 0.0008, count: 5, amount: 2000, period: 2 }])
  })

  it('unserialize: returns map for entries', () => {
    const entryA = OrderBook.unserialize([150, 0, -1])
    const entryB = OrderBook.unserialize([0.0008, 2, 0, 1])

    assert.deepStrictEqual(entryA, {
      price: 150,
      count: 0,
      amount: -1
    })
    assert.deepStrictEqual(entryB, {
      rate: 0.0008,
      count: 0,
      amount: 1,
      period: 2
    })
  })

  it('unserialize: supports raw books', () => {
    const entryA = OrderBook.unserialize([[1337, 150, -1], [1338, 151, 1]], true)
    const entryB = OrderBook.unserialize([[1539, 2, 0.0008, 350], [1540, 30, 0.0004, -500]], true)

    const expA = {
      asks: [{
        orderID: 1337,
        price: 150,
        amount: -1
      }],
      bids: [{
        orderID: 1338,
        price: 151,
        amount: 1
      }]
    }
    const expB = {
      asks: [{
        orderID: 1539,
        rate: 0.0008,
        amount: 350,
        period: 2
      }],
      bids: [{
        orderID: 1540,
        rate: 0.0004,
        amount: -500,
        period: 30
      }]
    }

    assert.deepStrictEqual(entryA, expA)
    assert.deepStrictEqual(entryB, expB)
  })

  it('unserializes live trading data correctly', async () => {
    const rest = new RESTv2()
    const book = await rest.orderBook('tBTCUSD', 'P0')
    const obj = new OrderBook(book)
    let firstAsk = -1

    book.forEach((entry, i) => {
      if (entry[2] < 0) {
        if (firstAsk === -1) {
          firstAsk = i
        }

        assert.strictEqual(obj.asks[i - firstAsk][0], entry[0])
        assert.strictEqual(obj.asks[i - firstAsk][1], entry[1])
        assert.strictEqual(obj.asks[i - firstAsk][2], entry[2])
      } else {
        assert.strictEqual(obj.bids[i][0], entry[0])
        assert.strictEqual(obj.bids[i][1], entry[1])
        assert.strictEqual(obj.bids[i][2], entry[2])
      }
    })
  }).timeout(60000)

  it('unserializes live funding data correctly', async () => {
    const rest = new RESTv2()
    const book = await rest.orderBook('fUSD', 'P0')
    const obj = new OrderBook(book)
    let firstAsk = -1

    book.forEach((entry, i) => {
      if (entry[3] > 0) {
        if (firstAsk === -1) {
          firstAsk = i
        }

        assert.strictEqual(obj.asks[i - firstAsk][0], entry[0])
        assert.strictEqual(obj.asks[i - firstAsk][1], entry[1])
        assert.strictEqual(obj.asks[i - firstAsk][2], entry[2])
        assert.strictEqual(obj.asks[i - firstAsk][3], entry[3])
      } else {
        assert.strictEqual(obj.bids[i][0], entry[0])
        assert.strictEqual(obj.bids[i][1], entry[1])
        assert.strictEqual(obj.bids[i][2], entry[2])
        assert.strictEqual(obj.bids[i][3], entry[3])
      }
    })
  }).timeout(60000)

  describe.skip('volBPSMid', () => {})

  describe('spread', () => {
    it('returns total spread', () => {
      const book = new OrderBook({
        bids: [[1, 0, 1]],
        asks: [[2, 0, -1]]
      })
      assert.strictEqual(book.spread(), 1)
    })
  })

  describe('bidAmount', () => {
    it('returns total bid amount', () => {
      const book = new OrderBook({
        bids: [[1, 0, 1], [1.1, 0, 1]],
        asks: [[2, 0, -1]]
      })
      assert.strictEqual(book.bidAmount(), 2)
    })
  })

  describe('askAmount', () => {
    it('returns total ask amount', () => {
      const book = new OrderBook({
        bids: [[1, 0, 1]],
        asks: [[2, 0, -1], [2.1, 0, -1]]
      })
      assert.strictEqual(book.askAmount(), 2)
    })
  })

  describe('static arrayOBMidPrice', () => {
    it('returns mid price for an array-format OB', () => {
      const book = [[2, 0, -1], [1, 0, 1]]
      assert.strictEqual(OrderBook.arrayOBMidPrice(book), 1.5)
    })
  })
})

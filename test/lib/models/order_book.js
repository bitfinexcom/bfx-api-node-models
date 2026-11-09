'use strict'

const test = require('brittle')
const CRC = require('crc-32')
const { RESTv2 } = require('bfx-api-node-rest')
const { OrderBook } = require('../../../lib')

test('OrderBook model', async (t) => {
  await t.test('constructor: integrates snapshot', (t) => {
    const entries = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    const ob = new OrderBook(entries)

    t.alike(ob.bids, [entries[0]])
    t.alike(ob.asks, [entries[1]])
  })

  await t.test('topBid/topAsk: returns the top bid/ask, or null', (t) => {
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

    t.is(ob.topBid(), 149)
    t.is(ob.topAsk(), 151)
  })

  await t.test('topBidLevel/topAskLevel: returns the top bid/ask levels, or null', (t) => {
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

    t.alike(ob.topBidLevel(), [149, 1, 10])
    t.alike(ob.topAskLevel(), [151, 1, -10])
  })

  await t.test('checksum: returns expected value for normal OB', (t) => {
    const ob = new OrderBook({
      bids: [[6000, 1, 1], [5900, 1, 2]],
      asks: [[6100, 1, -3], [6200, 1, -4]]
    })

    t.is(ob.checksum(), CRC.str('6000:1:6100:-3:5900:2:6200:-4'))
  })

  await t.test('checksum: returns expected value for high precision numbers', (t) => {
    const ob = new OrderBook({
      bids: [['0.000000001', 1, 1], ['0.0000000001', 1, '0.0000000002']],
      asks: [['0.000000002', 1, -3], ['0.000000003', 1, -4]]
    })

    t.is(ob.checksum(), CRC.str('0.000000001:1:0.000000002:-3:0.0000000001:0.0000000002:0.000000003:-4'))
  })

  await t.test('updateWith: string update place the entry in the correct position in the book', (t) => {
    const ob = new OrderBook({
      bids: [['0.1', 1, 1], ['0.09', 1, '5']],
      asks: [['0.2', 1, -3], ['0.3', 1, -4]]
    })
    ob.updateWith(['0.15', 1, -1])
    ob.updateWith(['0.089', 1, 1])

    t.is(ob.checksum(), CRC.str('0.1:1:0.15:-1:0.09:5:0.2:-3:0.089:1:0.3:-4'))
  })

  await t.test('checksum: returns expected value for raw OB', (t) => {
    const ob = new OrderBook({
      bids: [[100, 6000, 1], [101, 6000, 2]], // first field is order ID here
      asks: [[102, 6100, -3], [103, 6100, -4]]
    }, true)

    t.is(ob.checksum(), CRC.str('100:1:102:-3:101:2:103:-4'))
  })

  await t.test('checksum: converts exp prices to fixed', (t) => {
    const ob = new OrderBook({
      bids: [[6000, 1, 1], [1.7e-8, 1, 2]],
      asks: [[6100, 1, -3], [6200, 1, -4]]
    })

    t.is(ob.checksum(), CRC.str('6000:1:6100:-3:0.000000017:2:6200:-4'))
  })

  await t.test('checksumArr: returns expected value for normal OB', (t) => {
    const ob = [
      [6000, 1, 1],
      [5900, 1, 2],
      [6100, 1, -3],
      [6200, 1, -4]
    ]

    t.is(
      OrderBook.checksumArr(ob),
      CRC.str('6000:1:6100:-3:5900:2:6200:-4')
    )
  })

  await t.test('checksumArr: converts exp prices to fixed', (t) => {
    const ob = [
      [6000, 1, 1],
      [1.7e-8, 1, 2],
      [6100, 1, -3],
      [6200, 1, -4]
    ]

    t.is(
      OrderBook.checksumArr(ob),
      CRC.str('6000:1:6100:-3:0.000000017:2:6200:-4')
    )
  })

  await t.test('checksumArr: returns expected value for raw OB', (t) => {
    const ob = [
      [100, 6000, 1],
      [101, 6000, 2],
      [102, 6100, -3],
      [103, 6100, -4]
    ]

    t.is(
      OrderBook.checksumArr(ob, true),
      CRC.str('100:1:102:-3:101:2:103:-4')
    )
  })

  await t.test('updateWith: correctly applies update', (t) => {
    const entries = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    const ob = new OrderBook(entries)
    t.ok(ob.updateWith([100, 3, 15])) // update bid
    t.ok(ob.updateWith([200, 3, -15])) // update ask

    t.alike(ob.bids, [[100, 3, 15]])
    t.alike(ob.asks, [[200, 3, -15]])

    t.ok(ob.updateWith([100, 0, 15])) // remove bid
    t.ok(ob.updateWith([200, 0, -15])) // remove ask

    t.is(ob.bids.length, 0)
    t.is(ob.asks.length, 0)

    t.ok(ob.updateWith([150, 1, 2])) // add bid
    t.ok(ob.updateWith([100, 1, 1])) // add bid
    t.ok(ob.updateWith([160, 1, 3])) // add bid

    t.ok(ob.updateWith([161, 1, -3])) // add ask
    t.ok(ob.updateWith([200, 1, -1])) // add ask
    t.ok(ob.updateWith([175, 1, -2])) // add ask

    t.is(ob.bids.length, 3)
    t.is(ob.asks.length, 3)

    t.alike(ob.bids, [
      [160, 1, 3],
      [150, 1, 2],
      [100, 1, 1]
    ])

    t.alike(ob.asks, [
      [161, 1, -3],
      [175, 1, -2],
      [200, 1, -1]
    ])

    t.ok(ob.updateWith([160, 2, 4])) // update top bid
    t.alike(ob.bids, [
      [160, 2, 4],
      [150, 1, 2],
      [100, 1, 1]
    ])

    t.ok(ob.updateWith([150, 0, 2])) // remove middle bid
    t.alike(ob.bids, [
      [160, 2, 4],
      [100, 1, 1]
    ])

    t.ok(ob.updateWith([159, 1, 42])) // insert middle bid
    t.alike(ob.bids, [
      [160, 2, 4],
      [159, 1, 42],
      [100, 1, 1]
    ])

    t.ok(ob.updateWith([159.9, 2, 7])) // insert another bid
    t.alike(ob.bids, [
      [160, 2, 4],
      [159.9, 2, 7],
      [159, 1, 42],
      [100, 1, 1]
    ])

    t.alike(ob.asks, [ // verify asks
      [161, 1, -3],
      [175, 1, -2],
      [200, 1, -1]
    ])

    t.ok(ob.updateWith([161, 2, -4])) // update top ask
    t.alike(ob.asks, [
      [161, 2, -4],
      [175, 1, -2],
      [200, 1, -1]
    ])

    t.ok(ob.updateWith([175, 0, -2])) // remove middle ask
    t.alike(ob.asks, [
      [161, 2, -4],
      [200, 1, -1]
    ])

    t.ok(ob.updateWith([175, 1, -42])) // insert middle ask
    t.alike(ob.asks, [
      [161, 2, -4],
      [175, 1, -42],
      [200, 1, -1]
    ])

    t.ok(ob.updateWith([170, 2, -7])) // insert another ask
    t.alike(ob.asks, [
      [161, 2, -4],
      [170, 2, -7],
      [175, 1, -42],
      [200, 1, -1]
    ])

    t.alike(ob.bids, [ // verify bids
      [160, 2, 4],
      [159.9, 2, 7],
      [159, 1, 42],
      [100, 1, 1]
    ])
  })

  await t.test('updateWith: correctly applies update (raw books)', (t) => {
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
    t.ok(ob.updateWith([idBidA, 100, 15])) // update bid
    t.ok(ob.updateWith([idAskA, 200, -15])) // update ask

    t.alike(ob.bids, [[idBidA, 100, 15]])
    t.alike(ob.asks, [[idAskA, 200, -15]])

    t.ok(ob.updateWith([idBidA, 0, 15])) // remove bid
    t.ok(ob.updateWith([idAskA, 0, -15])) // remove ask

    t.is(ob.bids.length, 0)
    t.is(ob.asks.length, 0)

    t.ok(ob.updateWith([idBidC, 150, 2])) // add bid
    t.ok(ob.updateWith([idBidB, 100, 1])) // add bid
    t.ok(ob.updateWith([idBidD, 160, 3])) // add bid

    t.ok(ob.updateWith([idAskD, 161, -3])) // add ask
    t.ok(ob.updateWith([idAskB, 200, -1])) // add ask
    t.ok(ob.updateWith([idAskC, 175, -2])) // add ask

    t.is(ob.bids.length, 3)
    t.is(ob.asks.length, 3)

    t.alike(ob.bids, [
      [idBidD, 160, 3],
      [idBidC, 150, 2],
      [idBidB, 100, 1]
    ])

    t.alike(ob.asks, [
      [idAskD, 161, -3],
      [idAskC, 175, -2],
      [idAskB, 200, -1]
    ])

    t.ok(ob.updateWith([idBidD, 160, 4])) // update top bid
    t.alike(ob.bids, [
      [idBidD, 160, 4],
      [idBidC, 150, 2],
      [idBidB, 100, 1]
    ])

    t.ok(ob.updateWith([idBidC, 0, 2])) // remove middle bid
    t.alike(ob.bids, [
      [idBidD, 160, 4],
      [idBidB, 100, 1]
    ])

    t.ok(ob.updateWith([idBidE, 159, 42])) // insert middle bid
    t.alike(ob.bids, [
      [idBidD, 160, 4],
      [idBidE, 159, 42],
      [idBidB, 100, 1]
    ])

    t.ok(ob.updateWith([idBidF, 159.9, 7])) // insert another bid
    t.alike(ob.bids, [
      [idBidD, 160, 4],
      [idBidF, 159.9, 7],
      [idBidE, 159, 42],
      [idBidB, 100, 1]
    ])

    t.alike(ob.asks, [ // verify asks
      [idAskD, 161, -3],
      [idAskC, 175, -2],
      [idAskB, 200, -1]
    ])

    t.ok(ob.updateWith([idAskD, 161, -4])) // update top ask
    t.alike(ob.asks, [
      [idAskD, 161, -4],
      [idAskC, 175, -2],
      [idAskB, 200, -1]
    ])

    t.ok(ob.updateWith([idAskC, 0, -2])) // remove middle ask
    t.alike(ob.asks, [
      [idAskD, 161, -4],
      [idAskB, 200, -1]
    ])

    t.ok(ob.updateWith([idAskE, 165, -42])) // insert middle ask
    t.alike(ob.asks, [
      [idAskD, 161, -4],
      [idAskE, 165, -42],
      [idAskB, 200, -1]
    ])

    t.ok(ob.updateWith([idAskF, 162, -7])) // insert another ask
    t.alike(ob.asks, [
      [idAskD, 161, -4],
      [idAskF, 162, -7],
      [idAskE, 165, -42],
      [idAskB, 200, -1]
    ])

    t.alike(ob.bids, [ // verify bids
      [idBidD, 160, 4],
      [idBidF, 159.9, 7],
      [idBidE, 159, 42],
      [idBidB, 100, 1]
    ])
  })

  await t.test('updateWith: maintains sort', (t) => {
    const ob = new OrderBook([
      [100, 100, 10],
      [200, 200, -10]
    ])

    t.ok(ob.updateWith([20, 5, 10]))
    t.ok(ob.updateWith([150, 5, 10]))
    t.ok(ob.updateWith([80, 5, 10]))
    t.ok(ob.updateWith([300, 5, -10]))
    t.ok(ob.updateWith([40, 5, 10]))
    t.ok(ob.updateWith([130, 5, 10]))
    t.ok(ob.updateWith([342, 5, -10]))
    t.ok(ob.updateWith([457, 5, -10]))

    for (let i = 0; i < ob.bids.length - 2; i++) {
      t.ok(ob.bids[i][0] > ob.bids[i + 1][0])
    }

    for (let i = 0; i < ob.asks.length - 2; i++) {
      t.ok(ob.asks[i][0] < ob.asks[i + 1][0])
    }
  })

  await t.test('updateWith: emits an update event', (t) => {
    t.plan(2)
    const ob = new OrderBook([
      [100, 2, 10],
      [200, 2, -10]
    ])

    ob.on('update', () => {
      t.pass()
    })

    t.ok(ob.updateWith([20, 5, 10]))
  })

  await t.test('midPrice: calculates mid price', (t) => {
    const entries = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    const ob = new OrderBook(entries)
    t.is(ob.midPrice(), 150)
  })

  await t.test('getEntry: returns null for unknown entries', (t) => {
    const entries = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    const ob = new OrderBook(entries)
    const entry = ob.getEntry(300)

    t.is(entry, null)
  })

  await t.test('getEntry: returns entry even with only one OB side', (t) => {
    const entriesA = [[100, 2, 10]]
    const entriesB = [[200, 2, -10]]
    const entriesC = [[0.00018942, 2, 11, 173094.48801557]]
    const entriesD = [[0.0001921, 30, 1, -5000]]

    const obA = new OrderBook(entriesA)
    const obB = new OrderBook(entriesB)
    const obC = new OrderBook(entriesC)
    const obD = new OrderBook(entriesD)

    t.alike(obA.getEntry(100), { price: 100, count: 2, amount: 10 })
    t.alike(obB.getEntry(200), { price: 200, count: 2, amount: -10 })
    t.alike(obC.getEntry(0.00018942), { rate: 0.00018942, count: 11, amount: 173094.48801557, period: 2 })
    t.alike(obD.getEntry(0.0001921), { rate: 0.0001921, count: 1, amount: -5000, period: 30 })
  })

  await t.test('getEntry: unserializes entry before returning', (t) => {
    const entries = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    const ob = new OrderBook(entries)
    const entry = ob.getEntry(100)

    t.is(entry.price, 100)
    t.is(entry.count, 2)
    t.is(entry.amount, 10)
  })

  await t.test('updateArrayOBWith: returns false for unknown entry', (t) => {
    const ob = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    t.ok(!OrderBook.updateArrayOBWith(ob, [300, 0, -1]))
    t.ok(!OrderBook.updateArrayOBWith(ob, [300, 0, 1]))
  })

  await t.test('updateArrayOBWith: correctly applies update', (t) => {
    const ob = [
      [100, 2, 10],
      [200, 2, -10]
    ]

    t.ok(OrderBook.updateArrayOBWith(ob, [100, 0, 1])) // general manipulation
    t.ok(OrderBook.updateArrayOBWith(ob, [150, 1, 16]))
    t.ok(OrderBook.updateArrayOBWith(ob, [200, 7, -42]))
    t.ok(OrderBook.updateArrayOBWith(ob, [121, 3, 14]))
    t.ok(OrderBook.updateArrayOBWith(ob, [300, 1, -4]))
    t.alike(ob, [
      [150, 1, 16],
      [121, 3, 14],
      [200, 7, -42],
      [300, 1, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [130, 1, 10])) // add middle bid
    t.alike(ob, [
      [150, 1, 16],
      [130, 1, 10],
      [121, 3, 14],
      [200, 7, -42],
      [300, 1, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [140, 1, 20])) // add another bid
    t.alike(ob, [
      [150, 1, 16],
      [140, 1, 20],
      [130, 1, 10],
      [121, 3, 14],
      [200, 7, -42],
      [300, 1, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [140, 1, 42])) // update the new bid
    t.alike(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [130, 1, 10],
      [121, 3, 14],
      [200, 7, -42],
      [300, 1, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [130, 0, 42])) // remove a bid
    t.alike(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [121, 3, 14],
      [200, 7, -42],
      [300, 1, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [250, 1, -10])) // add middle ask
    t.alike(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [121, 3, 14],
      [200, 7, -42],
      [250, 1, -10],
      [300, 1, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [220, 1, -20])) // add another ask
    t.alike(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [121, 3, 14],
      [200, 7, -42],
      [220, 1, -20],
      [250, 1, -10],
      [300, 1, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [220, 1, -42])) // update the new ask
    t.alike(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [121, 3, 14],
      [200, 7, -42],
      [220, 1, -42],
      [250, 1, -10],
      [300, 1, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [300, 0, -4])) // remove an ask
    t.alike(ob, [
      [150, 1, 16],
      [140, 1, 42],
      [121, 3, 14],
      [200, 7, -42],
      [220, 1, -42],
      [250, 1, -10]
    ])
  })

  await t.test('updateArrayOBWith: correctly applies update (raw books)', (t) => {
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

    t.ok(OrderBook.updateArrayOBWith(ob, [idBidA, 0, 10], true)) // general manipulation
    t.ok(OrderBook.updateArrayOBWith(ob, [idBidB, 150, 16], true))
    t.ok(OrderBook.updateArrayOBWith(ob, [idAskA, 200, -42], true))
    t.ok(OrderBook.updateArrayOBWith(ob, [idBidC, 121, 14], true))
    t.ok(OrderBook.updateArrayOBWith(ob, [idAskB, 300, -4], true))
    t.alike(ob, [
      [idBidB, 150, 16],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskB, 300, -4]
    ])

    const idBidD = id()
    t.ok(OrderBook.updateArrayOBWith(ob, [idBidD, 130, 10], true)) // add middle bid
    t.alike(ob, [
      [idBidB, 150, 16],
      [idBidD, 130, 10],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskB, 300, -4]
    ])

    const idBidE = id()
    t.ok(OrderBook.updateArrayOBWith(ob, [idBidE, 140, 20], true)) // add another bid
    t.alike(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 20],
      [idBidD, 130, 10],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskB, 300, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [idBidE, 140, 42], true)) // update the new bid
    t.alike(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidD, 130, 10],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskB, 300, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [idBidD, 0, 42], true)) // remove a bid
    t.alike(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskB, 300, -4]
    ])

    const idAskC = id()
    t.ok(OrderBook.updateArrayOBWith(ob, [idAskC, 250, -10], true)) // add middle ask
    t.alike(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskC, 250, -10],
      [idAskB, 300, -4]
    ])

    const idAskD = id()
    t.ok(OrderBook.updateArrayOBWith(ob, [idAskD, 220, -20], true)) // add another ask
    t.alike(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskD, 220, -20],
      [idAskC, 250, -10],
      [idAskB, 300, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [idAskD, 220, -42], true)) // update the new ask
    t.alike(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskD, 220, -42],
      [idAskC, 250, -10],
      [idAskB, 300, -4]
    ])

    t.ok(OrderBook.updateArrayOBWith(ob, [idAskB, 0, -4], true)) // remove an ask
    t.alike(ob, [
      [idBidB, 150, 16],
      [idBidE, 140, 42],
      [idBidC, 121, 14],
      [idAskA, 200, -42],
      [idAskD, 220, -42],
      [idAskC, 250, -10]
    ])
  })

  await t.test('unserialize: returns bid/asks map for snapshots', (t) => {
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
    t.is(typeof obA, 'object')
    t.is(typeof obB, 'object')
    t.is(Object.keys(obA).length, 2)
    t.is(Object.keys(obB).length, 2)
    t.alike(obA.bids, [{ price: 100, count: 2, amount: 10 }])
    t.alike(obA.asks, [{ price: 200, count: 2, amount: -10 }])
    t.alike(obB.bids, [{ rate: 0.0005, count: 1, amount: -5000, period: 30 }])
    t.alike(obB.asks, [{ rate: 0.0008, count: 5, amount: 2000, period: 2 }])
  })

  await t.test('unserialize: returns map for entries', (t) => {
    const entryA = OrderBook.unserialize([150, 0, -1])
    const entryB = OrderBook.unserialize([0.0008, 2, 0, 1])

    t.alike(entryA, {
      price: 150,
      count: 0,
      amount: -1
    })
    t.alike(entryB, {
      rate: 0.0008,
      count: 0,
      amount: 1,
      period: 2
    })
  })

  await t.test('unserialize: supports raw books', (t) => {
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

    t.alike(entryA, expA)
    t.alike(entryB, expB)
  })

  await t.test('unserializes live trading data correctly', { timeout: 60000 }, async (t) => {
    const rest = new RESTv2()
    const book = await rest.orderBook({
      symbol: 'tBTCUSD',
      prec: 'P0'
    })
    const obj = new OrderBook(book)
    let firstAsk = -1

    book.forEach((entry, i) => {
      if (entry[2] < 0) {
        if (firstAsk === -1) {
          firstAsk = i
        }

        t.is(obj.asks[i - firstAsk][0], entry[0])
        t.is(obj.asks[i - firstAsk][1], entry[1])
        t.is(obj.asks[i - firstAsk][2], entry[2])
      } else {
        t.is(obj.bids[i][0], entry[0])
        t.is(obj.bids[i][1], entry[1])
        t.is(obj.bids[i][2], entry[2])
      }
    })
  })

  await t.test('unserializes live funding data correctly', { timeout: 60000 }, async (t) => {
    const rest = new RESTv2()
    const book = await rest.orderBook({
      symbol: 'fUSD',
      prec: 'P0'
    })
    const obj = new OrderBook(book)
    let firstAsk = -1

    book.forEach((entry, i) => {
      if (entry[3] > 0) {
        if (firstAsk === -1) {
          firstAsk = i
        }

        t.is(obj.asks[i - firstAsk][0], entry[0])
        t.is(obj.asks[i - firstAsk][1], entry[1])
        t.is(obj.asks[i - firstAsk][2], entry[2])
        t.is(obj.asks[i - firstAsk][3], entry[3])
      } else {
        t.is(obj.bids[i][0], entry[0])
        t.is(obj.bids[i][1], entry[1])
        t.is(obj.bids[i][2], entry[2])
        t.is(obj.bids[i][3], entry[3])
      }
    })
  })

  await t.test('volBPSMid', (t) => {})

  await t.test('spread', (t) => {
    t.test('returns total spread', (t) => {
      const book = new OrderBook({
        bids: [[1, 0, 1]],
        asks: [[2, 0, -1]]
      })
      t.is(book.spread(), 1)
    })
  })

  await t.test('bidAmount', (t) => {
    t.test('returns total bid amount', (t) => {
      const book = new OrderBook({
        bids: [[1, 0, 1], [1.1, 0, 1]],
        asks: [[2, 0, -1]]
      })
      t.is(book.bidAmount(), 2)
    })
  })

  await t.test('askAmount', (t) => {
    t.test('returns total ask amount', (t) => {
      const book = new OrderBook({
        bids: [[1, 0, 1]],
        asks: [[2, 0, -1], [2.1, 0, -1]]
      })
      t.is(book.askAmount(), 2)
    })
  })

  await t.test('static arrayOBMidPrice', (t) => {
    t.test('returns mid price for an array-format OB', (t) => {
      const book = [[2, 0, -1], [1, 0, 1]]
      t.is(OrderBook.arrayOBMidPrice(book), 1.5)
    })
  })
})

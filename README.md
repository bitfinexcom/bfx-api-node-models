# Bitfinex Data Models for Node.JS

[![Build Status](https://travis-ci.org/bitfinexcom/bfx-api-node-models.svg?branch=master)](https://travis-ci.org/bitfinexcom/bfx-api-node-models)

This repo contains model classes for working with the data structures returned by the Bitfinex REST & WebSocket APIs. The models can all be initialized with an array-format payload as returned by an API call, and can be unserialized back to the array format when needed.

Some models, such as `Order` and `OrderBook` provide higher level methods which operate on the underlying data sets.

All models provide `serialize()` and `unserialize()` methods, which convert to/from array-format payloads respectively. All model constructors can take either array-format payloads, or objects/other model instances. A helper `toJS()` method is also provided for converting models to plain JS objects (POJOs).

### Features

* Convert between array, object, and class representations of API data
* Class methods for operating on model data where applicable (i.e. `OrderBook`)

Classes for the following Bitfinex API data types:
* Alert
* BalanceInfo
* Candle
* Currency
* FundingCredit
* FundingInfo
* FundingLoan
* FundingOffer
* FundingTickerHist
* FundingTicker
* FundingTrade
* LedgerEntry
* Liquidations
* MarginInfo
* Movement
* Notification
* OrderBook
* Order
* Position
* PublicTrade
* PulseMessage
* StatusMessagesDeriv
* Trade
* TradingTicker
* TradingTickerHist
* UserInfo
* Wallet
* WalletHist
* Currency
* SymbolDetails
* TransactionFee
* AccountSummary
* AuthPermission

### Installation

```js
npm i --save bfx-api-node-models
```

### Quickstart

```js
const { Order } = require('bfx-api-node-models')

const o = new Order({
  cid: Date.now(),
  symbol: 'tBTCUSD',
  price: 7000.0,
  amount: -0.02,
  type: Order.type.EXCHANGE_LIMIT
})

// Generate an API-compatible order creation packet for later submit
console.log(o.toNewOrderPacket())
```

### Docs

Refer to the [docs/](https://cdn.statically.io/gh/bitfinexcom/bfx-api-node-models/master/docs/index.html)
folder for JSDoc-generated API documentation covering each model class.

### Examples

The order model provides helper methods for order submission, updates, and cancellation. These methods are compatible with version 2.0.0 of `bitfinex-api-node`, and return promises which resolve upon receival of the relevant success/error notifications.

Orders are matched with their API packets by one/all of `id`, `gid`, and `cid`.

Example usage:
```js
const { Order } = require('bfx-api-node-models')
const ws = ... // setup WSv2 instance for order updates/submission

// Build new order
const o = new Order({
  cid: Date.now(),
  symbol: 'tBTCUSD',
  price: 7000.0,
  amount: -0.02,
  type: Order.type.EXCHANGE_LIMIT
}, ws) // note WSv2 client passed in here

let closed = false

// Enable automatic updates
o.registerListeners()

o.on('update', () => {
  debug('order updated: %j', o.serialize())
})

o.on('close', () => {
  debug('order closed: %s', o.status)
  closed = true
})

debug('submitting order %d', o.cid)

o.submit().then(() => {
  debug('got submit confirmation for order %d [%d]', o.cid, o.id)
}).catch((err) => {
  debug('failed to submit order: %s', err.message)
})
```

The order book model constructor takes either entire book snapshots as returned by the WSv2 API, or individual update packets with single bids/asks. Once constructed, order books may be updated either with complete snapshots via `updateFromSnapshot(snapshot)` or individual update packets via `updateWidth(entry)`.

Static helpers are also provided for working with array-format order books, in the form of `updateArrayOBWith(ob, entry, raw)`, `arrayOBMidPrice(ob, raw)`, and `checksumArr(ob, raw)`.

Checksums may be calculated for normal books via `checksum()`, for comparison with the checksums reported by the WSv2 API.

Example usage:
```js
const ob = new OrderBook([
  [140, 1, 10],
  [145, 1, 10],
  [148, 1, 10],
  [149, 1, 10],
  [151, 1, -10],
  [152, 1, -10],
  [158, 1, -10],
  [160, 1, -10]
])

ob.updateWith([145, 3, 15]) // update bid
ob.updateWith([158, 3, -15]) // update ask

console.log(ob.serialize())
```

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

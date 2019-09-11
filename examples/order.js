'use strict'

process.env.DEBUG = '*'

const debug = require('debug')('bfx:api:models:examples:order')
const { Order } = require('../')
const o = new Order({
  type: Order.type.EXCHANGE_LIMIT,
  symbol: 'tBTCUSD',
  amount: 0.05,
  price: 10000,
  hidden: true
})

debug('generated ws2 compatible new order packet:')
debug(JSON.stringify(o.toNewOrderPacket(), null, 2))

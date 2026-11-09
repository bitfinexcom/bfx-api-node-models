'use strict'

const { Order } = require('../')
const o = new Order({
  type: Order.type.EXCHANGE_LIMIT,
  symbol: 'tBTCUSD',
  amount: 0.05,
  price: 10000,
  hidden: true
})

console.log('generated ws2 compatible new order packet:')
console.log(JSON.stringify(o.toNewOrderPacket(), null, 2))

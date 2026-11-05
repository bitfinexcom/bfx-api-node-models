'use strict'

const test = require('brittle')
const _includes = require('lodash/includes')
const { SYMBOLS } = require('bfx-hf-util')
const { prepareAmount } = require('bfx-api-node-util')
const { RESTv2 } = require('bfx-api-node-rest')
const { FundingOffer } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_SYMBOLS = Object.values(SYMBOLS)

test('FundingOffer model', async (t) => {
  testModel(t, {
    model: FundingOffer,
    boolFields: ['notify', 'hidden', 'renew'],
    orderedFields: [
      'id', 'symbol', 'mtsCreate', 'mtsUpdate', 'amount', 'amountOrig', 'type',
      null, null, 'flags', 'status', null, null, null, 'rate', 'period',
      'notify', 'hidden', null, 'renew', 'rateReal'
    ]
  })

  testModelValidation(t, {
    model: FundingOffer,
    validData: {
      symbol: VALID_SYMBOLS,
      status: VALID_SYMBOLS, // need data from somewhere
      type: VALID_SYMBOLS, // need data from somewhere
      id: [...(new Array(5))].map(() => Math.random()),
      mtsCreate: [...(new Array(5))].map(() => Math.random()),
      mtsUpdate: [...(new Array(5))].map(() => Math.random()),
      mtsOpening: [...(new Array(5))].map(() => Math.random()),
      mtsLastPayout: [...(new Array(5))].map(() => Math.random()),
      amountOrig: [...(new Array(5))].map(() => Math.random()),
      amount: [...(new Array(5))].map(() => Math.random()),
      flags: [...(new Array(5))].map(() => Math.random()),
      rate: [...(new Array(5))].map(() => Math.random()),
      period: [...(new Array(5))].map(() => Math.random()),
      rateReal: [...(new Array(5))].map(() => Math.random()),
      notify: [...(new Array(5))].map(() => Math.random() > 0.5),
      hidden: [...(new Array(5))].map(() => Math.random() > 0.5),
      renew: [...(new Array(5))].map(() => Math.random() > 0.5),
      noClose: [...(new Array(5))].map(() => Math.random() > 0.5)
    }
  })

  await t.test('toNewOfferPacket', (t) => {
    t.test('generates a valid packet for WSv2', (t) => {
      const data = {
        type: 'test',
        symbol: 'fUSD',
        amount: prepareAmount(42),
        rate: prepareAmount(0.1),
        period: '30',
        flags: 0
      }

      const fo = new FundingOffer(data)
      t.alike(fo.toNewOfferPacket(), data)
    })
  })

  await t.test('submit', async (t) => {
    await t.test('throws an error if no API interface is available', async (t) => {
      const fo = new FundingOffer()
      await t.exception.all(fo.submit())
    })

    await t.test('calls submitFundingOffer on the RESTv2 instance', (t) => {
      t.plan(1)
      const fo = new FundingOffer()
      const rest = new RESTv2()

      rest.submitFundingOffer = async () => {
        t.pass()
        return []
      }

      fo.submit(rest)
    })

    await t.test('saves received data on itself', async (t) => {
      const rest = new RESTv2()
      const fo = new FundingOffer({ symbol: 'tBTCUSD' })
      const remoteFO = new FundingOffer({ symbol: 'just-testing' })

      rest.submitFundingOffer = async () => remoteFO.serialize()

      await fo.submit(rest)
      t.is(fo.symbol, 'just-testing')
    })
  })

  await t.test('cancel', async (t) => {
    await t.test('throws an error if no API interface is available', async (t) => {
      const fo = new FundingOffer()
      await t.exception.all(fo.cancel())
    })

    await t.test('calls cancelFundingOffer on the RESTv2 instance', (t) => {
      t.plan(1)
      const fo = new FundingOffer()
      const rest = new RESTv2()

      rest.cancelFundingOffer = async () => {
        t.pass()
        return []
      }

      fo.cancel(rest)
    })

    await t.test('saves received data on itself', async (t) => {
      const rest = new RESTv2()
      const fo = new FundingOffer({ symbol: 'tBTCUSD' })
      const remoteFO = new FundingOffer({ symbol: 'just-testing' })

      rest.cancelFundingOffer = async () => remoteFO.serialize()

      await fo.cancel(rest)
      t.is(fo.symbol, 'just-testing')
    })
  })

  await t.test('close', async (t) => {
    await t.test('throws an error if no API interface is available', async (t) => {
      const fo = new FundingOffer()
      await t.exception.all(fo.close())
    })

    await t.test('calls closeFunding on the RESTv2 instance', (t) => {
      t.plan(1)
      const fo = new FundingOffer()
      const rest = new RESTv2()

      rest.closeFunding = async () => {
        t.pass()
        return []
      }

      fo.close(rest)
    })

    await t.test('saves received data on itself', async (t) => {
      const rest = new RESTv2()
      const fo = new FundingOffer({ symbol: 'tBTCUSD' })
      const remoteFO = new FundingOffer({ symbol: 'just-testing' })

      rest.closeFunding = async () => remoteFO.serialize()

      await fo.close(rest)
      t.is(fo.symbol, 'just-testing')
    })
  })

  await t.test('toString', (t) => {
    t.test('includes pertinent information', (t) => {
      const fo = new FundingOffer({
        symbol: 'tBTCUSD',
        amount: 42,
        rate: 0.1,
        period: 30
      })

      const str = fo.toString()
      t.ok(/BTCUSD/.test(str), 'symbol missing')
      t.ok(_includes(str, '42'), 'amount missing')
      t.ok(_includes(str, '0.1'), 'rate missing')
      t.ok(_includes(str, '30'), 'period missing')
    })
  })
})

/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { prepareAmount } = require('bfx-api-node-util')
const { RESTv2 } = require('bfx-api-node-rest')
const { FundingOffer } = require('../../../lib')
const testModel = require('../../helpers/test_model')

describe('FundingOffer model', () => {
  testModel({
    model: FundingOffer,
    boolFields: ['notify', 'hidden', 'renew'],
    orderedFields: [
      'id', 'symbol', 'mtsCreate', 'mtsUpdate', 'amount', 'amountOrig', 'type',
      null, null, 'flags', 'status', null, null, null, 'rate', 'period',
      'notify', 'hidden', null, 'renew', 'rateReal'
    ]
  })

  describe('toNewOfferPacket', () => {
    it('generates a valid packet for WSv2', () => {
      const data = {
        type: 'test',
        symbol: 'fUSD',
        amount: prepareAmount(42),
        rate: prepareAmount(0.1),
        period: '30',
        flags: 0
      }

      const fo = new FundingOffer(data)
      assert.deepStrictEqual(fo.toNewOfferPacket(), data)
    })
  })

  describe('submit', () => {
    it('throws an error if no API interface is available', (done) => {
      const fo = new FundingOffer()
      fo.submit().catch(() => done())
    })

    it('calls submitFundingOffer on the RESTv2 instance', (done) => {
      const fo = new FundingOffer()
      const rest = new RESTv2()

      rest.submitFundingOffer = async () => {
        done()
        return []
      }

      fo.submit(rest)
    })

    it('saves received data on itself', async () => {
      const rest = new RESTv2()
      const fo = new FundingOffer({ symbol: 'tBTCUSD' })
      const remoteFO = new FundingOffer({ symbol: 'just-testing' })

      rest.submitFundingOffer = async () => remoteFO.serialize()

      await fo.submit(rest)
      assert.strictEqual(fo.symbol, 'just-testing')
    })
  })

  describe('cancel', () => {
    it('throws an error if no API interface is available', (done) => {
      const fo = new FundingOffer()
      fo.cancel().catch(() => done())
    })

    it('calls cancelFundingOffer on the RESTv2 instance', (done) => {
      const fo = new FundingOffer()
      const rest = new RESTv2()

      rest.cancelFundingOffer = async () => {
        done()
        return []
      }

      fo.cancel(rest)
    })

    it('saves received data on itself', async () => {
      const rest = new RESTv2()
      const fo = new FundingOffer({ symbol: 'tBTCUSD' })
      const remoteFO = new FundingOffer({ symbol: 'just-testing' })

      rest.cancelFundingOffer = async () => remoteFO.serialize()

      await fo.cancel(rest)
      assert.strictEqual(fo.symbol, 'just-testing')
    })
  })

  describe('close', () => {
    it('throws an error if no API interface is available', (done) => {
      const fo = new FundingOffer()
      fo.close().catch(() => done())
    })

    it('calls closeFunding on the RESTv2 instance', (done) => {
      const fo = new FundingOffer()
      const rest = new RESTv2()

      rest.closeFunding = async () => {
        done()
        return []
      }

      fo.close(rest)
    })

    it('saves received data on itself', async () => {
      const rest = new RESTv2()
      const fo = new FundingOffer({ symbol: 'tBTCUSD' })
      const remoteFO = new FundingOffer({ symbol: 'just-testing' })

      rest.closeFunding = async () => remoteFO.serialize()

      await fo.close(rest)
      assert.strictEqual(fo.symbol, 'just-testing')
    })
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const fo = new FundingOffer({
        symbol: 'tBTCUSD',
        amount: 42,
        rate: 0.1,
        period: 30
      })

      const str = fo.toString()
      assert.ok(/BTCUSD/.test(str), 'symbol missing')
      assert.ok(str.indexOf('42') !== -1, 'amount missing')
      assert.ok(str.indexOf('0.1') !== -1, 'rate missing')
      assert.ok(str.indexOf('30') !== -1, 'period missing')
    })
  })
})

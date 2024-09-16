/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { AccountSummary } = require('../../../lib')
const testModelValidation = require('../../helpers/test_model_validation')
const tradingVol30d = [
  {
    curr: 'BTC',
    vol: 0.01917394
  },
  {
    curr: 'ETH',
    vol: 0.67504702
  },
  {
    curr: 'XRP',
    vol: 11243.7965533
  },
  {
    curr: 'Total (USD)',
    vol: 7621.42803742,
    vol_safe: 7621.42803742,
    vol_maker: 6673.18852682,
    vol_BFX: 7621.42803742,
    vol_BFX_safe: 7621.42803742,
    vol_BFX_maker: 6673.18852682
  }
]
const OBJ = { USD: 3.14966754, ETH: 0.10302856 }
const DATA = [
  null,
  null,
  null,
  null,
  [
    [0.001, 0.001, 0.001, null, null, -0.0002],
    [0.002, 0.0021, 0.0022, null, null, 0.00075]
  ],
  [
    tradingVol30d,
    { USD: 8.56966754, BTC: 1.00006754 },
    30008.56966754
  ],
  [
    null,
    { USD: 3.14966754, ETH: 0.10302856 },
    283.14966754
  ],
  null,
  null,
  { leo_lev: 0, leo_amount_avg: 0.002 }
]

describe('Account Summary model', () => {
  testModelValidation({
    model: AccountSummary,
    validData: {
      trade_vol_30d: [...(new Array(5))].map(() => tradingVol30d),
      fees_trading_30d: [...(new Array(5))].map(() => OBJ),
      fees_trading_total_30d: [...(new Array(5))].map(() => Math.random()),
      fees_funding_30d: [...(new Array(5))].map(() => OBJ),
      fees_funding_total_30d: [...(new Array(5))].map(() => Math.random()),
      makerFee: [...(new Array(5))].map(() => Math.random()),
      derivMakerRebate: [...(new Array(5))].map(() => Math.random()),
      takerFeeToCrypto: [...(new Array(5))].map(() => Math.random()),
      takerFeeToStable: [...(new Array(5))].map(() => Math.random()),
      takerFeeToFiat: [...(new Array(5))].map(() => Math.random()),
      derivTakerFee: [...(new Array(5))].map(() => Math.random()),
      leoLev: [...(new Array(5))].map(() => Math.random()),
      leoAmountAvg: [...(new Array(5))].map(() => Math.random())
    }
  })

  it('initializes correctly', () => {
    const summary = new AccountSummary(DATA)
    assert.deepStrictEqual(summary.trade_vol_30d, tradingVol30d)
    assert.deepStrictEqual(
      summary.fees_trading_30d,
      { USD: 8.56966754, BTC: 1.00006754 }
    )
    assert.strictEqual(summary.fees_trading_total_30d, 30008.56966754)
    assert.deepStrictEqual(
      summary.fees_funding_30d,
      { USD: 3.14966754, ETH: 0.10302856 }
    )
    assert.strictEqual(summary.fees_funding_total_30d, 283.14966754)
    assert.strictEqual(summary.makerFee, 0.001)
    assert.strictEqual(summary.derivMakerRebate, -0.0002)
    assert.strictEqual(summary.takerFeeToCrypto, 0.002)
    assert.strictEqual(summary.takerFeeToStable, 0.0021)
    assert.strictEqual(summary.takerFeeToFiat, 0.0022)
    assert.strictEqual(summary.derivTakerFee, 0.00075)
    assert.strictEqual(summary.leoLev, 0)
    assert.strictEqual(summary.leoAmountAvg, 0.002)
  })

  it('serializes correctly', () => {
    const summary = new AccountSummary(DATA)
    const arr = summary.serialize()

    assert.deepStrictEqual(arr, DATA)
  })

  it('unserializes correctly', () => {
    const summary = AccountSummary.unserialize(DATA)
    assert.deepStrictEqual(summary.trade_vol_30d, tradingVol30d)
    assert.deepStrictEqual(
      summary.fees_trading_30d,
      { USD: 8.56966754, BTC: 1.00006754 }
    )
    assert.strictEqual(summary.fees_trading_total_30d, 30008.56966754)
    assert.deepStrictEqual(
      summary.fees_funding_30d,
      { USD: 3.14966754, ETH: 0.10302856 }
    )
    assert.strictEqual(summary.fees_funding_total_30d, 283.14966754)
    assert.strictEqual(summary.makerFee, 0.001)
    assert.strictEqual(summary.derivMakerRebate, -0.0002)
    assert.strictEqual(summary.takerFeeToCrypto, 0.002)
    assert.strictEqual(summary.takerFeeToStable, 0.0021)
    assert.strictEqual(summary.takerFeeToFiat, 0.0022)
    assert.strictEqual(summary.derivTakerFee, 0.00075)
    assert.strictEqual(summary.leoLev, 0)
    assert.strictEqual(summary.leoAmountAvg, 0.002)
  })
})

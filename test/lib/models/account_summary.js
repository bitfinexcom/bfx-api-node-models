'use strict'

const test = require('brittle')
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

test('Account Summary model', (t) => {
  testModelValidation(t, {
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

  t.test('initializes correctly', (t) => {
    const summary = new AccountSummary(DATA)
    t.alike(summary.trade_vol_30d, tradingVol30d)
    t.alike(
      summary.fees_trading_30d,
      { USD: 8.56966754, BTC: 1.00006754 }
    )
    t.is(summary.fees_trading_total_30d, 30008.56966754)
    t.alike(
      summary.fees_funding_30d,
      { USD: 3.14966754, ETH: 0.10302856 }
    )
    t.is(summary.fees_funding_total_30d, 283.14966754)
    t.is(summary.makerFee, 0.001)
    t.is(summary.derivMakerRebate, -0.0002)
    t.is(summary.takerFeeToCrypto, 0.002)
    t.is(summary.takerFeeToStable, 0.0021)
    t.is(summary.takerFeeToFiat, 0.0022)
    t.is(summary.derivTakerFee, 0.00075)
    t.is(summary.leoLev, 0)
    t.is(summary.leoAmountAvg, 0.002)
  })

  t.test('serializes correctly', (t) => {
    const summary = new AccountSummary(DATA)
    const arr = summary.serialize()

    t.alike(arr, DATA)
  })

  t.test('unserializes correctly', (t) => {
    const summary = AccountSummary.unserialize(DATA)
    t.alike(summary.trade_vol_30d, tradingVol30d)
    t.alike(
      summary.fees_trading_30d,
      { USD: 8.56966754, BTC: 1.00006754 }
    )
    t.is(summary.fees_trading_total_30d, 30008.56966754)
    t.alike(
      summary.fees_funding_30d,
      { USD: 3.14966754, ETH: 0.10302856 }
    )
    t.is(summary.fees_funding_total_30d, 283.14966754)
    t.is(summary.makerFee, 0.001)
    t.is(summary.derivMakerRebate, -0.0002)
    t.is(summary.takerFeeToCrypto, 0.002)
    t.is(summary.takerFeeToStable, 0.0021)
    t.is(summary.takerFeeToFiat, 0.0022)
    t.is(summary.derivTakerFee, 0.00075)
    t.is(summary.leoLev, 0)
    t.is(summary.leoAmountAvg, 0.002)
  })
})

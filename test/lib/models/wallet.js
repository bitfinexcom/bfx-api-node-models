/* eslint-env mocha */
'use strict'

const _flattenDeep = require('lodash/flattenDeep')
const _sample = require('lodash/sample')
const { CURRENCIES } = require('bfx-hf-util')
const { Wallet } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const GENERIC_INVALID_FIELDS = [false, '', undefined, []]
const VALID_TYPES = Object.values(Wallet.type)
const VALID_CURRENCIES = Object.values(CURRENCIES)
const VALID_DESCRIPTIONS = [null, 'some description']
const VALID_META = [null, { reason: 'TRADE' }]

const genWallet = (overrides = {}) => ({
  type: _sample(VALID_TYPES),
  currency: _sample(VALID_CURRENCIES),
  balance: Math.random(),
  balanceAvailable: Math.random(),
  unsettledInterest: Math.random(),
  description: _sample(VALID_DESCRIPTIONS),
  meta: _sample(VALID_META),

  ...overrides
})

describe('Wallet', () => {
  testModel({
    model: Wallet,
    orderedFields: [
      'type', 'currency', 'balance', 'unsettledInterest', 'balanceAvailable'
    ]
  })

  testModelValidation({
    model: Wallet,
    invalid: _flattenDeep([
      [42, ...GENERIC_INVALID_FIELDS].map(v => genWallet({ meta: v })),
      [42, {}, ...GENERIC_INVALID_FIELDS].map(v => [
        genWallet({ type: v }),
        genWallet({ currency: v })
      ]),

      [{}, ...GENERIC_INVALID_FIELDS].map(v => [
        genWallet({ type: v }),
        genWallet({ currency: v }),
        genWallet({ balance: v }),
        genWallet({ unsettledInterest: v }),
        genWallet({ balanceAvailable: v })
      ])
    ]),

    // TODO: Extract this strange nesting into a helper function
    valid: _flattenDeep([
      VALID_TYPES.map(type => (
        VALID_CURRENCIES.map(currency => (
          VALID_DESCRIPTIONS.map(description => (
            VALID_META.map(meta => (
              genWallet({
                meta,
                type,
                currency,
                describe
              })
            ))
          ))
        ))
      ))
    ])
  })
})

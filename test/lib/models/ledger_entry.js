/* eslint-env mocha */
'use strict'

const { CURRENCIES } = require('bfx-hf-util')
const { LedgerEntry } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_CURRENCIES = Object.values(CURRENCIES)

describe('Ledger entry model', () => {
  testModel({
    model: LedgerEntry,
    orderedFields: [
      'id', 'currency', null, 'mts', null, 'amount', 'balance', null,
      'description'
    ]
  })

  testModelValidation({
    model: LedgerEntry,
    validData: {
      currency: VALID_CURRENCIES,
      description: VALID_CURRENCIES, // pull data from somewhere
      id: [...(new Array(5))].map(() => Math.random()),
      mts: [...(new Array(5))].map(() => Math.random()),
      amount: [...(new Array(5))].map(() => Math.random()),
      balance: [...(new Array(5))].map(() => Math.random())
    }
  })
})

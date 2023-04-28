//* eslint-env mocha */
'use strict'

const { CURRENCIES } = require('bfx-hf-util')
const { MovementInfo } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_CURRENCIES = Object.values(CURRENCIES)

describe('MovementInfo model', () => {
  testModel({
    model: MovementInfo,
    orderedFields: [
      'id', 'currency', 'currencyName', null, 'remark', 'mtsStarted', 'mtsUpdated',
      null, null, 'status', null, null, 'amount', 'fees', null, null,
      'destinationAddress', 'memo', null, null, 'transactionId', 'note',
      null, null, 'bankFees', 'bankRouterId', null, null, 'externalBankMovId',
      'externalBankMovStatus', 'externalBankMovDescription', 'externalBankAccInfo'
    ]
  })

  testModelValidation({
    model: MovementInfo,
    validData: {
      id: new Array(...(new Array(5))).map(() => Math.random()),
      currency: VALID_CURRENCIES,
      currencyName: VALID_CURRENCIES, // pull data from somewhere
      remark: VALID_CURRENCIES,
      mtsStarted: new Array(...(new Array(5))).map(() => Math.random()),
      mtsUpdated: new Array(...(new Array(5))).map(() => Math.random()),
      status: VALID_CURRENCIES,
      amount: new Array(...(new Array(5))).map(() => Math.random()),
      fees: new Array(...(new Array(5))).map(() => Math.random()),
      destinationAddress: VALID_CURRENCIES,
      memo: VALID_CURRENCIES,
      transactionId: VALID_CURRENCIES,
      note: VALID_CURRENCIES,
      bankFees: new Array(...(new Array(5))).map(() => Math.random()),
      bankRouterId: new Array(...(new Array(5))).map(() => Math.random()),
      externalBankMovId: VALID_CURRENCIES,
      externalBankMovStatus: VALID_CURRENCIES,
      externalBankMovDescription: VALID_CURRENCIES,
      externalBankAccInfo: new Array(...(new Array(5))).map(() => ({
        router: `my-router-${Math.random()}`,
        meta: { [`foo-${Math.random()}`]: `bar-${Math.random()}` }
      }))
    }
  })
})

/* eslint-env mocha */
'use strict'

const { SYMBOLS } = require('bfx-hf-util')
const { StatusMessagesDeriv } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

const VALID_STRINGS = Object.values(SYMBOLS)

describe('Derivatives Status Message model', () => {
  testModel({
    model: StatusMessagesDeriv,
    orderedFields: [
      'key', 'timestamp', null, 'price', 'priceSpot', null, 'fundBal', null,
      'fundingEventTimestamp', 'fundingAccrued', 'fundingStep', null,
      'currentFunding', null, null, 'markprice', null, null, 'openInterest',
      null, null, null, 'clampMin', 'clampMax'
    ]
  })

  testModelValidation({
    model: StatusMessagesDeriv,
    validData: {
      key: VALID_STRINGS, // pull data from somewhere
      timestamp: VALID_STRINGS, // pull data from somewhere
      price: new Array(5).fill().map(Math.random),
      priceSpot: new Array(5).fill().map(Math.random),
      fundBal: new Array(5).fill().map(Math.random),
      fundingEventTimestamp: VALID_STRINGS,
      fundingAccrued: new Array(5).fill().map(Math.random),
      fundingStep: new Array(5).fill().map(Math.random),
      currentFunding: new Array(5).fill().map(Math.random),
      markprice: new Array(5).fill().map(Math.random),
      openInterest: new Array(5).fill().map(Math.random),
      clampMin: new Array(5).fill().map(Math.random),
      clampMax: new Array(5).fill().map(Math.random)
    }
  })
})

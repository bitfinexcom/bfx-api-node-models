'use strict'

const test = require('brittle')
const { WeightedAverages } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

test('WeightedAverages model', (t) => {
  testModel(t, {
    model: WeightedAverages,
    orderedFields: [
      'tradeCount', 'sumBuyingSpent', 'sumBuyingAmount', null,
      'sumSellingSpent', 'sumSellingAmount', null,
      'buyingWeightedPrice', 'sellingWeightedPrice', null,
      'firstTradeMts', 'lastTradeMts'
    ]
  })

  testModelValidation(t, {
    model: WeightedAverages,
    validData: {
      tradeCount: [...(new Array(5))].map(() => Math.random()),
      sumBuyingSpent: [...(new Array(5))].map(() => Math.random()),
      sumBuyingAmount: [...(new Array(5))].map(() => Math.random()),
      sumSellingSpent: [...(new Array(5))].map(() => Math.random()),
      sumSellingAmount: [...(new Array(5))].map(() => Math.random()),
      buyingWeightedPrice: [...(new Array(5))].map(() => Math.random()),
      sellingWeightedPrice: [...(new Array(5))].map(() => Math.random()),
      firstTradeMts: [...(new Array(5))].map(() => Math.random()),
      lastTradeMts: [...(new Array(5))].map(() => Math.random())
    }
  })
})

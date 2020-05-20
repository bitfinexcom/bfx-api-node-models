/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _compact = require('lodash/compact')
const _includes = require('lodash/includes')
const { Invoice } = require('../../../lib')
const testModel = require('../../helpers/test_model')
// const testModelValidation = require('../../helpers/test_model_validation')

describe('Invoice model', () => {
  testModel({
    model: Invoice,
    orderedFields: [
      'invoiceHash',
      'invoice',
      null,
      null,
      'amount'
    ]
  })

  // testModelValidation({
  //   model: Invoice,
  //   validData: {
  //     invoiceHash: ['foo', 'bar', 'baz', 'qux'],
  //     invoice: ['foo1', 'bar2', 'baz3', 'qux4'],
  //     amount: ['0.001', '0.002', '0.003', '0.004']
  //   }
  // })

  it('initializes correctly', () => {
    const invc = new Invoice([
      'invoiceHash',
      'invoice',
      null,
      null,
      'amount'
    ])

    assert.strictEqual(invc.invoiceHash, 'invoiceHash')
    assert.strictEqual(invc.invoice, 'invoice')
    assert.strictEqual(invc.amount, 'amount')
  })

  it('serializes correctly', () => {
    const invc = new Invoice([
      'invoiceHash',
      'invoice',
      null,
      null,
      'amount'
    ])

    const arr = _compact(invc.serialize())
    assert.deepStrictEqual(arr, [
      'invoiceHash',
      'invoice',
      'amount'
    ])
  })

  it('unserializes correctly', () => {
    const obj = Invoice.unserialize([
      'invoiceHash',
      'invoice',
      null,
      null,
      'amount'
    ])

    assert.strictEqual(obj.invoiceHash, 'invoiceHash')
    assert.strictEqual(obj.invoice, 'invoice')
    assert.strictEqual(obj.amount, 'amount')
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const invc = new Invoice({
        invoiceHash: 'invoiceHash',
        invoice: 'invoice',
        amount: '0.0001'
      })

      const str = invc.toString()
      assert.ok(_includes(str, 'invoiceHash: invoiceHash'), 'invoiceHash missing')
      assert.ok(_includes(str, 'invoice: invoice'), 'invoice missing')
      assert.ok(_includes(str, 'amount: 0.0001'), 'amount missing')
    })
  })
})

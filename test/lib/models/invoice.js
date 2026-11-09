'use strict'

const test = require('brittle')
const _compact = require('lodash/compact')
const _includes = require('lodash/includes')
const { Invoice } = require('../../../lib')
const testModel = require('../../helpers/test_model')

test('Invoice model', (t) => {
  testModel(t, {
    model: Invoice,
    orderedFields: [
      'invoiceHash',
      'invoice',
      null,
      null,
      'amount'
    ]
  })

  t.test('initializes correctly', (t) => {
    const invc = new Invoice([
      'invoiceHash',
      'invoice',
      null,
      null,
      'amount'
    ])

    t.is(invc.invoiceHash, 'invoiceHash')
    t.is(invc.invoice, 'invoice')
    t.is(invc.amount, 'amount')
  })

  t.test('serializes correctly', (t) => {
    const invc = new Invoice([
      'invoiceHash',
      'invoice',
      null,
      null,
      'amount'
    ])

    const arr = _compact(invc.serialize())
    t.alike(arr, [
      'invoiceHash',
      'invoice',
      'amount'
    ])
  })

  t.test('unserializes correctly', (t) => {
    const obj = Invoice.unserialize([
      'invoiceHash',
      'invoice',
      null,
      null,
      'amount'
    ])

    t.is(obj.invoiceHash, 'invoiceHash')
    t.is(obj.invoice, 'invoice')
    t.is(obj.amount, 'amount')
  })

  t.test('toString', (t) => {
    t.test('includes pertinent information', (t) => {
      const invc = new Invoice({
        invoiceHash: 'invoiceHash',
        invoice: 'invoice',
        amount: '0.0001'
      })

      const str = invc.toString()
      t.ok(_includes(str, 'invoiceHash: invoiceHash'), 'invoiceHash missing')
      t.ok(_includes(str, 'invoice: invoice'), 'invoice missing')
      t.ok(_includes(str, 'amount: 0.0001'), 'amount missing')
    })
  })
})

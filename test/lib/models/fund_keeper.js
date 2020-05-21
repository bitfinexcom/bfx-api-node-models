/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _includes = require('lodash/includes')
const _compact = require('lodash/compact')
const { FundKeeper } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('Fund Keeper model', () => {
  testModel({
    model: FundKeeper,
    orderedFields: [
      'mts',
      'type',
      null,
      null,
      null,
      null,
      'status',
      'text'
    ]
  })

  testModelValidation({
    model: FundKeeper,
    validData: {
      mts: new Array(...(new Array(5))).map(() => Math.random()),
      type: ['foo', 'bar', 'baz', 'qux'],
      status: ['foo', 'bar', 'baz', 'qux'],
      text: ['foo', 'bar', 'baz', 'qux']
    }
  })

  it('initializes correctly', () => {
    const fk = new FundKeeper([
      1590052551928,
      'fk-req',
      null,
      null,
      null,
      null,
      'success',
      'text'
    ])

    assert.strictEqual(fk.mts, 1590052551928)
    assert.strictEqual(fk.type, 'fk-req')
    assert.strictEqual(fk.status, 'success')
    assert.strictEqual(fk.text, 'text')
  })

  it('serializes correctly', () => {
    const fk = new FundKeeper([
      1590052551928,
      'fk-req',
      null,
      null,
      null,
      null,
      'success',
      'text'
    ])

    assert.deepStrictEqual(_compact(fk.serialize()), [
      1590052551928,
      'fk-req',
      'success',
      'text'
    ])
  })

  it('unserializes correctly', () => {
    const obj = FundKeeper.unserialize([
      1590052551928,
      'fk-req',
      null,
      null,
      null,
      null,
      'success',
      'text'
    ])

    assert.strictEqual(obj.mts, 1590052551928)
    assert.strictEqual(obj.type, 'fk-req')
    assert.strictEqual(obj.status, 'success')
    assert.strictEqual(obj.text, 'text')
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const fk = new FundKeeper({
        mts: 1590052551928,
        type: 'fk-req',
        status: 'success',
        text: 'text'
      })

      const str = fk.toString()
      assert.ok(_includes(str, 'type:fk-req status:success msg:text'), 'missing mandatory fields')
    })
  })
})

/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _compact = require('lodash/compact')
const _includes = require('lodash/includes')
const { PublicPulseProfile } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('Public Pulse Profile model', () => {
  testModel({
    model: PublicPulseProfile,
    orderedFields: [
      'id',
      'mtsCreate',
      null,
      'nickname',
      null,
      'picture',
      'text',
      null,
      null,
      'twitterHandle'
    ]
  })

  testModelValidation({
    model: PublicPulseProfile,
    validData: {
      id: 'foo',
      mtsCreate: new Array(...(new Array(5))).map(() => Math.random()),
      nickname: ['foo', 'bar', 'baz', 'qux'],
      picture: ['foo', 'bar', 'baz', 'qux'],
      text: ['foo', 'bar', 'baz', 'qux'],
      twitterHandle: ['foo', 'bar', 'baz', 'qux']
    }
  })

  it('initializes correctly', () => {
    const ppp = new PublicPulseProfile([
      'foo',
      12345,
      null,
      'foo',
      null,
      'bar.jpg',
      'baz',
      null,
      null,
      'qux'
    ])

    assert.strictEqual(ppp.id, 'foo')
    assert.strictEqual(ppp.mtsCreate, 12345)
    assert.strictEqual(ppp.nickname, 'foo')
    assert.strictEqual(ppp.picture, 'bar.jpg')
    assert.strictEqual(ppp.text, 'baz')
    assert.strictEqual(ppp.twitterHandle, 'qux')
  })

  it('serializes correctly', () => {
    const ppp = new PublicPulseProfile([
      'foo',
      12345,
      null,
      'foo',
      null,
      'bar.jpg',
      'baz',
      null,
      null,
      'qux'
    ])

    const arr = _compact(ppp.serialize())
    assert.deepStrictEqual(arr, [
      'foo',
      12345,
      'foo',
      'bar.jpg',
      'baz',
      'qux'
    ])
  })

  it('unserializes correctly', () => {
    const obj = PublicPulseProfile.unserialize([
      'foo',
      12345,
      null,
      'foo',
      null,
      'bar.jpg',
      'baz',
      null,
      null,
      'qux'
    ])

    assert.strictEqual(obj.id, 'foo')
    assert.strictEqual(obj.mtsCreate, 12345)
    assert.strictEqual(obj.nickname, 'foo')
    assert.strictEqual(obj.picture, 'bar.jpg')
    assert.strictEqual(obj.text, 'baz')
    assert.strictEqual(obj.twitterHandle, 'qux')
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const ppp = new PublicPulseProfile({
        id: 'foo777',
        mtsCreate: 12345,
        nickname: 'foo',
        picture: 'bar.jpg',
        text: 'baz',
        twitterHandle: 'qux'
      })

      const str = ppp.toString()
      assert.ok(_includes(str, 'foo777'), 'id missing')
      assert.ok(_includes(str, 'foo'), 'nickname missing')
      assert.ok(_includes(str, 'bar.jpg'), 'picture missing')
      assert.ok(_includes(str, 'baz'), 'text missing')
      assert.ok(_includes(str, 'qux'), 'twitterHandle missing')
    })
  })
})

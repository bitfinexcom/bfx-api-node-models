/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _compact = require('lodash/compact')
const _includes = require('lodash/includes')
const { PulseMessage } = require('../../../lib')
const testModel = require('../../helpers/test_model')
const testModelValidation = require('../../helpers/test_model_validation')

describe('Pulse Message model', () => {
  testModel({
    model: PulseMessage,
    orderedFields: [
      'id',
      'mts',
      null,
      'userID',
      null,
      'title',
      'content',
      null,
      null,
      'isPin',
      'isPublic',
      null,
      'tags',
      'attachments',
      null,
      'likes',
      'userLiked',
      null
    ]
  })

  testModelValidation({
    model: PulseMessage,
    validData: {
      id: 'foo',
      mts: new Array(...(new Array(5))).map(() => Math.random()),
      userID: ['foo', 'bar', 'baz', 'qux'],
      title: ['foo', 'bar', 'baz', 'qux'],
      content: ['foo', 'bar', 'baz', 'qux'],
      isPin: new Array(...(new Array(5))).map(() => Math.random()),
      isPublic: new Array(...(new Array(5))).map(() => Math.random()),
      tags: ['hash', 'tag'],
      attachments: ['foo', 'bar', 'baz', 'qux'],
      likes: new Array(...(new Array(5))).map(() => Math.random()),
      userLiked: new Array(...(new Array(5))).map(() => Math.random())
    }
  })

  it('initializes correctly', () => {
    const pm = new PulseMessage([
      'foo',
      12345,
      null,
      'bar',
      null,
      'title',
      'content',
      null,
      null,
      1,
      0,
      null,
      ['#hash', '#tag'],
      ['foo', 'bar'],
      null,
      1,
      2,
      null
    ])

    assert.strictEqual(pm.id, 'foo')
    assert.strictEqual(pm.mts, 12345)
    assert.strictEqual(pm.userID, 'bar')
    assert.strictEqual(pm.title, 'title')
    assert.strictEqual(pm.content, 'content')
    assert.strictEqual(pm.isPin, 1)
    assert.strictEqual(pm.isPublic, 0)
    assert.deepEqual(pm.tags, ['#hash', '#tag'])
    assert.deepEqual(pm.attachments, ['foo', 'bar'])
    assert.strictEqual(pm.likes, 1)
    assert.strictEqual(pm.userLiked, 2)
  })

  it('serializes correctly', () => {
    const pm = new PulseMessage([
      'foo',
      12345,
      null,
      'bar',
      null,
      'title',
      'content',
      null,
      null,
      1,
      1,
      null,
      ['#hash', '#tag'],
      ['foo', 'bar'],
      null,
      1,
      2,
      null
    ])

    const arr = _compact(pm.serialize())
    assert.deepStrictEqual(arr, [
      'foo',
      12345,
      'bar',
      'title',
      'content',
      1,
      1,
      ['#hash', '#tag'],
      ['foo', 'bar'],
      1,
      2
    ])
  })

  it('unserializes correctly', () => {
    const obj = PulseMessage.unserialize([
      'foo',
      12345,
      null,
      'bar',
      null,
      'title',
      'content',
      null,
      null,
      1,
      1,
      null,
      ['#hash', '#tag'],
      ['foo', 'bar'],
      null,
      1,
      2,
      null
    ])

    assert.strictEqual(obj.id, 'foo')
    assert.strictEqual(obj.mts, 12345)
    assert.strictEqual(obj.userID, 'bar')
    assert.strictEqual(obj.title, 'title')
    assert.strictEqual(obj.content, 'content')
    assert.strictEqual(obj.isPin, 1)
    assert.strictEqual(obj.isPublic, 1)
    assert.deepEqual(obj.tags, ['#hash', '#tag'])
    assert.deepEqual(obj.attachments, ['foo', 'bar'])
    assert.strictEqual(obj.likes, 1)
    assert.strictEqual(obj.userLiked, 2)
  })

  describe('toString', () => {
    it('includes pertinent information', () => {
      const pm = new PulseMessage({
        id: 'foo777',
        mts: 12345,
        userID: 'bar888',
        title: 'title',
        content: 'content',
        isPin: 1,
        isPublic: 0,
        tags: ['#hash', '#tag'],
        attachments: ['foo', 'bar'],
        likes: 1,
        userLiked: 1
      })

      const str = pm.toString()
      assert.ok(_includes(str, '(foo777)'), 'id missing')
      assert.ok(_includes(str, 'bar888'), 'userID missing')
      assert.ok(_includes(str, 'title'), 'title missing')
      assert.ok(_includes(str, 'pinned'), 'pinned missing')
      assert.ok(_includes(str, 'not public'), 'not public missing')
      assert.ok(_includes(str, 'content'), 'content missing')
      assert.ok(_includes(str, '#hash #tag'), 'hash tags missing')
      assert.ok(_includes(str, 'foo bar'), 'attachments missing')
      assert.ok(_includes(str, 'likes(1)'), 'likes missing')
    })
  })
})

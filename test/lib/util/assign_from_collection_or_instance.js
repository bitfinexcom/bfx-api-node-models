'use strict'
/* eslint-env mocha */

const assert = require('assert')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const _isFinite = require('lodash/isFinite')
const isCollection = require('../../../lib/util/is_collection')
const assignFromCollectionOrInstance = require('../../../lib/util/assign_from_collection_or_instance')

describe('static assignFromCollectionOrInstance', () => {
  it('correctly assigns object values', () => {
    class TestModel {
      static unserialize (data) {
        assert(_isObject(data))
        assert.deepStrictEqual(Object.keys(data), { a: 5, b: 42 })

        return data // already object
      }
    }

    const data = { a: 5, b: 42 }
    const target = new TestModel()

    assignFromCollectionOrInstance({ data, target })

    assert.strictEqual(target.a, 5)
    assert.strictEqual(target.b, 42)
  })

  it('correctly assigns an array of objects via iterator', () => {
    class TestModel {
      static unserialize (data) {
        if (isCollection(data)) {
          return data.map(TestModel.unserialize)
        }

        assert(_isObject(data))
        assert.deepStrictEqual(Object.keys(data), ['a'])

        return data // already object
      }
    }

    const data = [{ a: 0 }, { a: 1 }, { a: 2 }, { a: 3 }]
    const target = new TestModel()

    assignFromCollectionOrInstance({ data, target })

    assert.strictEqual(target.length, 4)
    assert.deepStrictEqual(target[0], { a: 0 })
    assert.deepStrictEqual(target[1], { a: 1 })
    assert.deepStrictEqual(target[2], { a: 2 })
    assert.deepStrictEqual(target[3], { a: 3 })
  })

  it('correctly assigns an array of arrays via iterator', () => {
    class TestModel {
      static unserialize (data) {
        if (isCollection(data)) {
          return data.map(TestModel.unserialize)
        }

        assert(_isArray(data))
        assert.strictEqual(data.length, 1)
        assert(_isFinite(data[0]))

        return { a: data[0] }
      }
    }

    const data = [[0], [1], [2], [3]]
    const target = new TestModel()

    assignFromCollectionOrInstance({ data, target })

    assert.strictEqual(target.length, 4)
    assert.deepStrictEqual(target[0], { a: 0 })
    assert.deepStrictEqual(target[1], { a: 1 })
    assert.deepStrictEqual(target[2], { a: 2 })
    assert.deepStrictEqual(target[3], { a: 3 })
  })

  it('correctly assigns an array model via unserialize', (done) => {
    class TestModel {
      static unserialize (data) {
        assert.strictEqual(data.length, 4)
        assert.deepStrictEqual(data, [0, 1, 2, 3])
        done()
      }
    }

    const data = [0, 1, 2, 3]
    const target = new TestModel()

    assignFromCollectionOrInstance({ data, target })
  })
})

'use strict'

const test = require('brittle')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const _isFinite = require('lodash/isFinite')
const isCollection = require('../../../lib/util/is_collection')
const assignFromCollectionOrInstance = require('../../../lib/util/assign_from_collection_or_instance')

test('static assignFromCollectionOrInstance', (t) => {
  t.test('correctly assigns object values', (t) => {
    class TestModel {
      static unserialize (data) {
        t.ok(_isObject(data))
        t.alike(Object.keys(data), { a: 5, b: 42 })

        return data // already object
      }
    }

    const data = { a: 5, b: 42 }
    const target = new TestModel()

    assignFromCollectionOrInstance({ data, target })

    t.is(target.a, 5)
    t.is(target.b, 42)
  })

  t.test('correctly assigns an array of objects via iterator', (t) => {
    class TestModel {
      static unserialize (data) {
        if (isCollection(data)) {
          return data.map(TestModel.unserialize)
        }

        t.ok(_isObject(data))
        t.alike(Object.keys(data), ['a'])

        return data // already object
      }
    }

    const data = [{ a: 0 }, { a: 1 }, { a: 2 }, { a: 3 }]
    const target = new TestModel()

    assignFromCollectionOrInstance({ data, target })

    t.is(target.length, 4)
    t.alike(target[0], { a: 0 })
    t.alike(target[1], { a: 1 })
    t.alike(target[2], { a: 2 })
    t.alike(target[3], { a: 3 })
  })

  t.test('correctly assigns an array of arrays via iterator', (t) => {
    class TestModel {
      static unserialize (data) {
        if (isCollection(data)) {
          return data.map(TestModel.unserialize)
        }

        t.ok(_isArray(data))
        t.is(data.length, 1)
        t.ok(_isFinite(data[0]))

        return { a: data[0] }
      }
    }

    const data = [[0], [1], [2], [3]]
    const target = new TestModel()

    assignFromCollectionOrInstance({ data, target })

    t.is(target.length, 4)
    t.alike(target[0], { a: 0 })
    t.alike(target[1], { a: 1 })
    t.alike(target[2], { a: 2 })
    t.alike(target[3], { a: 3 })
  })

  t.test('correctly assigns an array model via unserialize', (t) => {
    t.plan(2)
    class TestModel {
      static unserialize (data) {
        t.is(data.length, 4)
        t.alike(data, [0, 1, 2, 3])
      }
    }

    const data = [0, 1, 2, 3]
    const target = new TestModel()

    assignFromCollectionOrInstance({ data, target })
  })
})

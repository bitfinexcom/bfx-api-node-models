/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _includes = require('lodash/includes')

const testModel = ({ values = {}, model, orderedFields, boolFields = [] }) => {
  const Model = model
  const fields = orderedFields
  const fieldValues = fields.slice()

  // Apply overrides
  for (let i = 0; i < fields.length; i++) {
    if (values[fields[i]]) {
      fieldValues[i] = values[fields[i]]
    }

    if (_includes(boolFields, fields[i])) {
      fieldValues[i] = false
    }
  }

  const checkModelFields = (m) => {
    fields.forEach((f) => {
      checkField(m, f)
    })
  }

  const checkField = (m, f) => {
    if (f === null) return

    if (_includes(boolFields, f)) {
      assert.strictEqual(m[f], false)
    } else if (values[f]) {
      assert.strictEqual(m[f], values[f])
    } else {
      assert.strictEqual(m[f], f)
    }
  }

  it('constructs from an array source', () => {
    const m = new Model(fieldValues)
    checkModelFields(m)
  })

  it('constructs from an object source', () => {
    const data = {}
    fields.forEach(f => (f !== null) && (data[f] = f))
    boolFields.forEach((f) => { data[f] = false })
    Object.assign(data, values)

    const m = new Model(data)
    checkModelFields(m)
  })

  it('constructs from an array of arrays', () => {
    const m = new Model([fieldValues, fieldValues, fieldValues])
    const mArr = [...m]

    // test [] access
    for (let i = 0; i < m.length; i += 1) {
      checkModelFields(m[i])
    }

    // test iterator
    for (let i = 0; i < mArr.length; i += 1) {
      checkModelFields(mArr[i])
    }

    assert.strictEqual(m.length, mArr.length)

    // test equality
    for (let i = 0; i < m.length; i += 1) {
      assert.deepStrictEqual(m[i], mArr[i])
    }
  })

  it('constructs from an array of objects', () => {
    const data = {}
    fields.forEach(f => (f !== null) && (data[f] = f))
    boolFields.forEach((f) => { data[f] = false })
    Object.assign(data, values)

    const m = new Model([data, data, data])
    const mArr = [...m]

    // test [] access
    for (let i = 0; i < m.length; i += 1) {
      checkModelFields(m[i])
    }

    // test iterator
    for (let i = 0; i < mArr.length; i += 1) {
      checkModelFields(mArr[i])
    }

    assert.strictEqual(m.length, mArr.length)

    // test equality
    for (let i = 0; i < m.length; i += 1) {
      assert.deepStrictEqual(m[i], mArr[i])
    }
  })

  it('serializes correctly', () => {
    const data = {}
    fields.forEach(f => (f !== null) && (data[f] = f))
    boolFields.forEach((f) => { data[f] = false })
    Object.assign(data, values)

    const m = new Model(data)
    const arr = m.serialize()

    arr.forEach((v, i) => {
      checkField(m, fields[i])
    })
  })

  it('unserializes correctly', () => {
    const m = model.unserialize(fieldValues)
    checkModelFields(m)
  })
}

module.exports = testModel

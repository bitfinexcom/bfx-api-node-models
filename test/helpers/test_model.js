'use strict'

const _includes = require('lodash/includes')

const testModel = (t, { values = {}, model, orderedFields, boolFields = [] }) => {
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

  const checkModelFields = (t, m) => {
    fields.forEach((f) => {
      checkField(t, m, f)
    })
  }

  const checkField = (t, m, f) => {
    if (f === null) return

    if (_includes(boolFields, f)) {
      t.is(m[f], false)
    } else if (values[f]) {
      t.is(m[f], values[f])
    } else {
      t.is(m[f], f)
    }
  }

  t.test('constructs from an array source', (t) => {
    const m = new Model(fieldValues)
    checkModelFields(t, m)
  })

  t.test('constructs from an object source', (t) => {
    const data = {}
    fields.forEach(f => (f !== null) && (data[f] = f))
    boolFields.forEach((f) => { data[f] = false })
    Object.assign(data, values)

    const m = new Model(data)
    checkModelFields(t, m)
  })

  t.test('constructs from an array of arrays', (t) => {
    const m = new Model([fieldValues, fieldValues, fieldValues])
    const mArr = [...m]

    // test [] access
    for (let i = 0; i < m.length; i += 1) {
      checkModelFields(t, m[i])
    }

    // test iterator
    for (let i = 0; i < mArr.length; i += 1) {
      checkModelFields(t, mArr[i])
    }

    t.is(m.length, mArr.length)

    // test equality
    for (let i = 0; i < m.length; i += 1) {
      t.alike(m[i], mArr[i])
    }
  })

  t.test('constructs from an array of objects', (t) => {
    const data = {}
    fields.forEach(f => (f !== null) && (data[f] = f))
    boolFields.forEach((f) => { data[f] = false })
    Object.assign(data, values)

    const m = new Model([data, data, data])
    const mArr = [...m]

    // test [] access
    for (let i = 0; i < m.length; i += 1) {
      checkModelFields(t, m[i])
    }

    // test iterator
    for (let i = 0; i < mArr.length; i += 1) {
      checkModelFields(t, mArr[i])
    }

    t.is(m.length, mArr.length)

    // test equality
    for (let i = 0; i < m.length; i += 1) {
      t.alike(m[i], mArr[i])
    }
  })

  t.test('serializes correctly', (t) => {
    const data = {}
    fields.forEach(f => (f !== null) && (data[f] = f))
    boolFields.forEach((f) => { data[f] = false })
    Object.assign(data, values)

    const m = new Model(data)
    const arr = m.serialize()

    arr.forEach((v, i) => {
      checkField(t, m, fields[i])
    })
  })

  t.test('unserializes correctly', (t) => {
    const m = model.unserialize(fieldValues)
    checkModelFields(t, m)
  })
}

module.exports = testModel

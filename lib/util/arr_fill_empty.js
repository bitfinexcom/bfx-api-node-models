'use strict'

const arrFillEmpty = (arr, fill = null) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      arr[i] = fill
    }

    if (Array.isArray(arr[i])) {
      arrFillEmpty(arr[i], fill)
    }
  }
}

module.exports = arrFillEmpty

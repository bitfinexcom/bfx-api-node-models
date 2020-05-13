'use strict'

const _compact = require('lodash/compact')
const dateValidator = require('./validators/date')
const stringValidator = require('./validators/string')
const Model = require('./model')

const fields = {
  id: 0,
  mtsCreate: 1,
  // placeholder
  nickname: 3,
  // placeholder
  picture: 5,
  text: 6,
  // placeholder
  // placeholder
  twitterHandle: 9
}

/**
 * Public PulseProfile model
 */
class PublicPulseProfile extends Model {
  /**
   * @param {object|Array} data         - public pulse profile data
   * @param {string} data.id            - pulse User ID
   * @param {number} data.mtsCreate     - creation timestamp
   * @param {string} data.nickname      - profile nickname
   * @param {string} data.picture       - profile picture
   * @param {string} data.text          - profile bio
   * @param {string} data.twitterHandle - profile twitter handle
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    return super.unserialize({ data, fields })
  }

  /**
   * @returns {string} str
   */
  toString () {
    const {
      id, mtsCreate, nickname, picture, text, twitterHandle
    } = this

    return _compact([
      id,
      new Date(mtsCreate).toLocaleString(),
      nickname,
      picture,
      text,
      twitterHandle
    ]).join(' ')
  }

  /**
   * Validates a given public pulse profile instance
   *
   * @param {object[]|object|PublicPulseProfile[]|PublicPulseProfile|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        id: stringValidator,
        mtsCreate: dateValidator,
        nickname: stringValidator,
        picture: stringValidator,
        text: stringValidator,
        twitterHandle: stringValidator
      }
    })
  }
}

module.exports = PublicPulseProfile

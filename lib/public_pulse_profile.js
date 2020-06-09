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
 *
 * @class
 * @augments Model
 */
class PublicPulseProfile extends Model {
  /**
   * @param {PublicPulseProfile~Data|PublicPulseProfile~Data[]} data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {PublicPulseProfile~Data|PublicPulseProfile~Data[]} data - data to
   *   convert to POJO
   * @returns {PublicPulseProfile~ObjectData} pojo
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
   * @param {PublicPulseProfile~Data|PublicPulseProfile~Data[]} data - models
   *   to validate
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

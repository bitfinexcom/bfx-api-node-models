'use strict'

const _compact = require('lodash/compact')
const _flatten = require('lodash/flatten')
const _isArray = require('lodash/isArray')
const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const stringValidator = require('./validators/string')
const PublicPulseProfile = require('./public_pulse_profile')
const Model = require('./model')

const fields = {
  id: 0,
  mts: 1,
  // placeholder
  userID: 3,
  // placeholder
  title: 5,
  content: 6,
  // placeholder
  // placeholder
  isPin: 9,
  isPublic: 10,
  // placeholder
  tags: 12,
  attachments: 13,
  // placeholder
  likes: 15,
  userLiked: 16,
  // placeholder
  pulseProfile: 18
}

require('./types/pulse_message/data')

/**
 * Private PulseMessage model
 *
 * @class
 * @memberof module:bfx-api-node-models
 * @augments module:bfx-api-node-models.Model
 */
class PulseMessage extends Model {
  /**
   * @param {
   *   module:bfx-api-node-models.PulseMessage~Data|
   *   module:bfx-api-node-models.PulseMessage~Data[]
   * } data - data
   */
  constructor (data = {}) {
    super({ data, fields })
  }

  /**
   * @param {
   *   module:bfx-api-node-models.PulseMessage~Data|
   *   module:bfx-api-node-models.PulseMessage~Data[]
   * } data - data to convert to POJO
   *
   * @returns {module:bfx-api-node-models.PulseMessage~ObjectData} pojo
   */
  static unserialize (data) {
    const pojo = super.unserialize({ data, fields })

    if (pojo.isPublic && _isArray(pojo.pulseProfile)) {
      pojo.pulseProfile = PublicPulseProfile.unserialize(pojo.pulseProfile)
    }

    return pojo
  }

  /**
   * Return an array representation of this model
   *
   * @returns {Array} arr
   */
  serialize () {
    const arr = super.serialize()

    if (this.isPublic && this.pulseProfile) {
      const profile = new PublicPulseProfile(this.pulseProfile)
      arr[fields.pulseProfile] = profile.serialize()
    }

    return arr
  }

  /**
   * @returns {string} str
   */
  toString () {
    const {
      id, mts, userID, title, content, isPin, isPublic, tags, attachments, likes, userLiked
    } = this

    return _compact(_flatten([
      `(${id})`,
      new Date(mts).toLocaleString(),
      userID,
      title,
      content,
      !isPin ? 'not pinned' : 'pinned',
      !isPublic ? 'not public' : 'public',
      tags,
      attachments,
      likes && `likes(${likes})`,
      userLiked
    ])).join(' ')
  }

  /**
   * Validates a given public pulse profile instance
   *
   * @param {
   *   module:bfx-api-node-models.PulseMessage~Data|
   *   module:bfx-api-node-models.PulseMessage~Data[]
   * } data - instance to validate
   *
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    return super.validate({
      data,
      fields,
      validators: {
        id: stringValidator,
        mts: dateValidator,
        userID: stringValidator,
        title: stringValidator,
        content: stringValidator,
        isPin: numberValidator,
        isPublic: numberValidator,
        tags: stringValidator,
        attachments: stringValidator,
        likes: numberValidator,
        userLiked: numberValidator
      }
    })
  }
}

module.exports = PulseMessage

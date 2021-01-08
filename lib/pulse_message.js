'use strict'

const _compact = require('lodash/compact')
const _flatten = require('lodash/flatten')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const _isEmpty = require('lodash/isEmpty')
const { PULSE_FIELDS, PULSE_COMMENT_FIELDS, pulseValidator, pulseCommentValidator } = require('./config/pulse')
const PublicPulseProfile = require('./public_pulse_profile')
const Model = require('./model')

/**
 * Private PulseMessage model
 */
class PulseMessage extends Model {
  /**
   * @param {object|Array} data       - pulse message data
   * @param {string} data.id          - pulse message ID
   * @param {number} data.mts         - millisecond timestamp
   * @param {string} data.parent      - parent pulse message ID
   * @param {string} data.userID      - pulse User ID
   * @param {string} data.title       - title of the pulse message
   * @param {string} data.content     - content of the pulse message
   * @param {number} data.isPin       - 1 if the message is pinned, 0 if it is not pinned
   * @param {number} data.isPublic    - 1 if the message is public, 0 if it is not public
   * @param {string} data.tags        - tags used in the message
   * @param {string} data.attachments - attachments used in the message
   * @param {number} data.likes       - number of likes
   * @param {number} data.userLiked   - flag to show if the private user liked the pulse
   * @param {number} data.comments    - number of comments
   */
  constructor (data = {}) {
    if (_isArray(data)) {
      if (data.length === 19) {
        super({ data, fields: PULSE_COMMENT_FIELDS })
      } else {
        super({ data, fields: PULSE_FIELDS })
      }
    } else if (_isObject(data)) {
      if (!_isEmpty(data.parent)) {
        super({ data, fields: PULSE_COMMENT_FIELDS })
      } else {
        super({ data, fields: PULSE_FIELDS })
      }
    } else {
      throw new Error('unknown data type')
    }
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
   */
  static unserialize (data) {
    let pojo
    if ((_isArray(data[0]) && data[0].length === 19) || (data.length === 19)) {
      pojo = super.unserialize({ data, fields: PULSE_COMMENT_FIELDS })
    } else {
      pojo = super.unserialize({ data, fields: PULSE_FIELDS })
    }

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
      arr[PULSE_FIELDS.pulseProfile] = profile.serialize()
    }

    return arr
  }

  /**
   * @returns {string} str
   */
  toString () {
    const {
      id, mts, parent, userID, title, content, isPin, isPublic, tags, attachments, likes, userLiked, comments
    } = this

    return _compact(_flatten([
      `(${id})`,
      new Date(mts).toLocaleString(),
      parent,
      userID,
      title,
      content,
      !isPin ? 'not pinned' : 'pinned',
      !isPublic ? 'not public' : 'public',
      tags,
      attachments,
      likes && `likes(${likes})`,
      userLiked,
      comments && `comments(${comments})`
    ])).join(' ')
  }

  /**
   * Validates a given public pulse profile instance
   *
   * @param {object[]|object|PulseMessage[]|PulseMessage|Array} data - instance to validate
   * @returns {string} error - null if instance is valid
   */
  static validate (data) {
    const isPulseComment = !_isEmpty(data.parent)
    return super.validate({
      data,
      fields: isPulseComment ? PULSE_COMMENT_FIELDS : PULSE_FIELDS,
      validators: isPulseComment ? pulseCommentValidator : pulseValidator
    })
  }
}

module.exports = PulseMessage

'use strict'

const _compact = require('lodash/compact')
const _flatten = require('lodash/flatten')
const _isArray = require('lodash/isArray')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const stringValidator = require('./validators/string')
const PublicPulseProfile = require('./public_pulse_profile')
const Model = require('./model')

const pulseMessageValidator = {
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
  userLiked: numberValidator,
  comments: numberValidator
}

const pulseCommentValidator = {
  ...pulseMessageValidator,
  parent: stringValidator
}

const fields = {
  id: 0,
  mts: 1,
  parent: 2,
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
  pulseProfile: 18,
  comments: 19
}

/**
 * Private PulseMessage model
 */
class PulseMessage extends Model {
  /**
   * @param {object|Array} data       - pulse message data
   * @param {string} data.id          - pulse message ID
   * @param {number} data.mts         - millisecond timestamp
   * @param {string} data.parent      - parent pulse message id
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
    super({ data, fields })
  }

  /**
   * @param {object[]|object|Array[]|Array} data - data to convert to POJO
   * @returns {object} pojo
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
    return super.validate({
      data,
      fields,
      validators: !_isEmpty(data.parent) && _isString(data.parent) ? pulseCommentValidator : pulseMessageValidator
    })
  }
}

module.exports = PulseMessage

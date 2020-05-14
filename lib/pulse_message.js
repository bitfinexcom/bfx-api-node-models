'use strict'

const _compact = require('lodash/compact')
const _flatten = require('lodash/flatten')
const numberValidator = require('./validators/number')
const dateValidator = require('./validators/date')
const stringValidator = require('./validators/string')
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
  userLiked: 16
  // placeholder
}

/**
 * Private PulseMessage model
 */
class PulseMessage extends Model {
  /**
   * @param {object|Array} data       - pulse message data
   * @param {string} data.id          - pulse message ID
   * @param {number} data.mts         - millisecond timestamp
   * @param {string} data.userID      - pulse User ID
   * @param {string} data.title       - title of the pulse message
   * @param {string} data.content     - content of the pulse message
   * @param {number} data.isPin       - 1 if the message is pinned, 0 if it is not pinned
   * @param {number} data.isPublic    - 1 if the message is public, 0 if it is not public
   * @param {string} data.tags        - tags used in the message
   * @param {string} data.attachments - attachments used in the message
   * @param {number} data.likes       - number of likes
   * @param {number} data.userLiked   - flag to show if the private user liked the pulse
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
   * @param {object[]|object|PulseMessage[]|PulseMessage|Array} data - instance to validate
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

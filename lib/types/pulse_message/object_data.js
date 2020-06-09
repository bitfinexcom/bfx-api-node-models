'use strict'

/**
 * {@link PulseMessage} data in plain object format. Suitable for passing to
 * {@link PulseMessage} to construct a model instance.
 *
 * @typedef {object} PulseMessage~ObjectData
 * @property {string} id - pulse message ID
 * @property {number} mts - millisecond timestamp
 * @property {string} userID - pulse User ID
 * @property {string} title - title of the pulse message
 * @property {string} content - content of the pulse message
 * @property {number} isPin - 1 if the message is pinned, 0 if it is not pinned
 * @property {number} isPublic - 1 if the message is public, 0 if it is not
 *   public
 * @property {string} tags - tags used in the message
 * @property {string} attachments - attachments used in the message
 * @property {number} likes - number of likes
 * @property {number} userLiked - flag to show if the private user liked the
 *   pulse
 */

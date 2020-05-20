'use strict'

/**
 * {@link module:bfx-api-node-models.Notification|Notification} data in plain
 * object format. Suitable for passing to
 * {@link module:bfx-api-node-models.Notification|Notification} to
 * construct a model instance.
 *
 * @typedef {object} module:bfx-api-node-models.Notification~ObjectData
 * @property {number} mts - timestamp
 * @property {string} type - type (i.e. 'ucm-*' for broadcasts)
 * @property {number} messageID - message ID
 * @property {object} notifyInfo - metadata, set by client for broadcasts
 * @property {number} code - code
 * @property {string} status - status (i.e. 'error')
 * @property {string} text - notification text to display to user
 */

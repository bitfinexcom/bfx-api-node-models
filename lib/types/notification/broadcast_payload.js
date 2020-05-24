'use strict'

/**
 * Body of a broadcast (`ucm-*`) notification which may be sent via the
 * {@link module:bitfinex-api-node.WSv2|WSv2} API.
 *
 * @see {@link module:bitfinex-api-node.WSv2#notifyUI|WSv2#notifyUI}
 *
 * @typedef {object} module:bfx-api-node-models.Notification~BroadcastPayload
 * @property {string} [message] - message to display
 * @property {string} [type] - notification type, must be prefixed with 'ucm-*'
 *   for broadcasts
 * @property {string} [level] - 'info', 'error', or 'success'
 * @property {string} [image] - link to an image to be shown
 * @property {string} [link] - URL the notification should forward too
 * @property {string} [sound] - URL of sound to play
 */

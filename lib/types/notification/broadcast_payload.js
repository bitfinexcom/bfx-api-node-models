'use strict'

/**
 * Body of a broadcast (`ucm-*`) {@link Notification}} which may be sent via
 * the WSv2 API.
 *
 * @typedef {object} Notification~BroadcastPayload
 * @property {string} [message] - message to display
 * @property {string} [type] - notification type, must be prefixed with 'ucm-*'
 *   for broadcasts
 * @property {string} [level] - 'info', 'error', or 'success'
 * @property {string} [image] - link to an image to be shown
 * @property {string} [link] - URL the notification should forward too
 * @property {string} [sound] - URL of sound to play
 */

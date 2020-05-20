'use strict'

/**
 * This module contains model classes for working with the data structures
 * returned by the Bitfinex REST & WebSocket APIs. The models can all be
 * initialized with an array-format payload as returned by an API call, and can
 * be unserialized back to the array format when needed.
 *
 * Some models, such as {@link bfx-api-node-models.Order|Order} and
 * {@link bfx-api-node-models.OrderBook|OrderBook} provide higher level methods
 * which operate on the underlying data sets.
 *
 * All models provide `serialize()` and `unserialize()` methods, which convert
 * to/from array-format payloads respectively. All model constructors can take
 * either array-format payloads, or objects/other model instances. A helper
 * `toJS()` method is also provided for converting models to plain JS objects
 * (POJOs).
 *
 * @license MIT
 * @module bfx-api-node-models
 */

module.exports = require('./lib')

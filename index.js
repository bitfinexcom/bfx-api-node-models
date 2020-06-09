'use strict'

/**
 * This module contains model classes for working with the data structures
 * returned by the Bitfinex {@link external:bfx-api-node-rest|REST} &
 * {@link external:bitfinex-api-node|WebSocket} APIs. The models can all be
 * initialized with an array-format payload as returned by an API call, and can
 * be unserialized back to the array format when needed.
 *
 * Some models, such as {@link Order} and {@link OrderBook} provide higher
 * level methods which operate on the underlying data sets.
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

/**
 * @external bitfinex-api-node
 * @see https://github.com/bitfinexcom/bitfinex-api-node
 */

/**
 * @external bfx-api-node-rest
 * @see https://github.com/bitfinexcom/bfx-api-node-rest
 */

module.exports = require('./lib')

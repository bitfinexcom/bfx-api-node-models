## Modules

<dl>
<dt><a href="#module_bfx-api-node-models">bfx-api-node-models</a></dt>
<dd><p>This module contains model classes for working with the data structures
returned by the Bitfinex <a href="https://github.com/bitfinexcom/bfx-api-node-rest">REST</a> &amp;
<a href="https://github.com/bitfinexcom/bitfinex-api-node">WebSocket</a> APIs. The models can all be
initialized with an array-format payload as returned by an API call, and can
be unserialized back to the array format when needed.</p>
<p>Some models, such as <a href="#Order">Order</a> and <a href="#OrderBook">OrderBook</a> provide higher
level methods which operate on the underlying data sets.</p>
<p>All models provide <code>serialize()</code> and <code>unserialize()</code> methods, which convert
to/from array-format payloads respectively. All model constructors can take
either array-format payloads, or objects/other model instances. A helper
<code>toJS()</code> method is also provided for converting models to plain JS objects
(POJOs).</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Alert">Alert</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Price alert model</p>
</dd>
<dt><a href="#BalanceInfo">BalanceInfo</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Balance information model</p>
</dd>
<dt><a href="#Candle">Candle</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>OHLCV Candle model</p>
</dd>
<dt><a href="#ChangeLog">ChangeLog</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Change log model</p>
</dd>
<dt><a href="#Currency">Currency</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Currency model</p>
</dd>
<dt><a href="#FundingCredit">FundingCredit</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Funding Credit model</p>
</dd>
<dt><a href="#FundingInfo">FundingInfo</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Account Funding Info model</p>
</dd>
<dt><a href="#FundingLoan">FundingLoan</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Funding Loan model</p>
</dd>
<dt><a href="#FundingOffer">FundingOffer</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Funding Offer model</p>
</dd>
<dt><a href="#FundingTickerHist">FundingTickerHist</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Historical Funding Ticker model</p>
</dd>
<dt><a href="#FundingTicker">FundingTicker</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Funding Ticker model</p>
</dd>
<dt><a href="#FundingTrade">FundingTrade</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Funding Trade model</p>
</dd>
<dt><a href="#Invoice">Invoice</a></dt>
<dd><p>Deposit Invoice model</p>
</dd>
<dt><a href="#LedgerEntry">LedgerEntry</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Ledger Entry model; wallet field is automatically populated if a description
is provided.</p>
</dd>
<dt><a href="#Liquidations">Liquidations</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Liquidation Info model</p>
</dd>
<dt><a href="#Login">Login</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Login event model</p>
</dd>
<dt><a href="#MarginInfo">MarginInfo</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Margin Info model</p>
</dd>
<dt><a href="#Model">Model</a> ⇐ <code>events.EventEmitter</code></dt>
<dd><p>Base model class, providing format-conversion methods</p>
</dd>
<dt><a href="#Movement">Movement</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Currency Movement model</p>
</dd>
<dt><a href="#Notification">Notification</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Notification model. Broadcast notification body schema may be found at
<a href="#Notification..BroadcastPayload">BroadcastPayload</a>.</p>
</dd>
<dt><a href="#OrderBook">OrderBook</a> ⇐ <code>events.EventEmitter</code></dt>
<dd><p>High level OB model to automatically integrate WS updates &amp; maintain sort</p>
</dd>
<dt><a href="#Order">Order</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>High level order model; provides methods for execution &amp; can stay updated via
a WSv2 connection or used to execute as a rest payload</p>
</dd>
<dt><a href="#Position">Position</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Position model</p>
</dd>
<dt><a href="#PublicPulseProfile">PublicPulseProfile</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Public PulseProfile model</p>
</dd>
<dt><a href="#PublicTrade">PublicTrade</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Public Trade model, supporting both funding &amp; ordinary trades</p>
</dd>
<dt><a href="#PulseMessage">PulseMessage</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Private PulseMessage model</p>
</dd>
<dt><a href="#StatusMessagesDeriv">StatusMessagesDeriv</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Derivatives Status Message model</p>
</dd>
<dt><a href="#Trade">Trade</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Private Trade model</p>
</dd>
<dt><a href="#TradingTickerHist">TradingTickerHist</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Historical Trading Ticker model</p>
</dd>
<dt><a href="#TradingTicker">TradingTicker</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Trading Ticker model</p>
</dd>
<dt><a href="#UserInfo">UserInfo</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>User Info model</p>
</dd>
<dt><a href="#WalletHist">WalletHist</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Historical Wallet Update model</p>
</dd>
<dt><a href="#Wallet">Wallet</a> ⇐ <code><a href="#Model">Model</a></code></dt>
<dd><p>Wallet model</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#isCollection">isCollection(data)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the provided data is a collection of models</p>
</dd>
</dl>

<a name="module_bfx-api-node-models"></a>

## bfx-api-node-models
This module contains model classes for working with the data structures
returned by the Bitfinex [REST](https://github.com/bitfinexcom/bfx-api-node-rest) &
[WebSocket](https://github.com/bitfinexcom/bitfinex-api-node) APIs. The models can all be
initialized with an array-format payload as returned by an API call, and can
be unserialized back to the array format when needed.

Some models, such as [Order](#Order) and [OrderBook](#OrderBook) provide higher
level methods which operate on the underlying data sets.

All models provide `serialize()` and `unserialize()` methods, which convert
to/from array-format payloads respectively. All model constructors can take
either array-format payloads, or objects/other model instances. A helper
`toJS()` method is also provided for converting models to plain JS objects
(POJOs).

**License**: MIT  
<a name="Alert"></a>

## Alert ⇐ [<code>Model</code>](#Model)
Price alert model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [Alert](#Alert) ⇐ [<code>Model</code>](#Model)
    * [new Alert(data)](#new_Alert_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#Alert.unserialize) ⇒ [<code>ObjectData</code>](#Alert..ObjectData)
        * [.validate(data)](#Alert.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#Alert..ArrayData) : <code>Array</code>
        * [~Data](#Alert..Data) : [<code>Alert</code>](#Alert) \| [<code>ObjectData</code>](#Alert..ObjectData) \| [<code>ArrayData</code>](#Alert..ArrayData)
        * [~ObjectData](#Alert..ObjectData) : <code>object</code>

<a name="new_Alert_new"></a>

### new Alert(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Alert..Data) \| [<code>Array.&lt;Data&gt;</code>](#Alert..Data) | data |

<a name="Model+serialize"></a>

### alert.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Alert</code>](#Alert)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### alert.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Alert</code>](#Alert)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="Alert.unserialize"></a>

### Alert.unserialize(data) ⇒ [<code>ObjectData</code>](#Alert..ObjectData)
**Kind**: static method of [<code>Alert</code>](#Alert)  
**Returns**: [<code>ObjectData</code>](#Alert..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Alert..Data) \| [<code>Array.&lt;Data&gt;</code>](#Alert..Data) | data to convert to POJO |

<a name="Alert.validate"></a>

### Alert.validate(data) ⇒ <code>string</code>
Validates a given alert instance

**Kind**: static method of [<code>Alert</code>](#Alert)  
**Returns**: <code>string</code> - error - null if instance is valid  
**Todo**

- [ ] validate type (get a list)


| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Alert..Data) \| [<code>Array.&lt;Data&gt;</code>](#Alert..Data) | instance(s) to validate |

<a name="Alert..ArrayData"></a>

### Alert~ArrayData : <code>Array</code>
[Alert](#Alert) data in WSv2 array format. Suitable for passing to
[Alert](#Alert) to construct a model instance.

**Kind**: inner typedef of [<code>Alert</code>](#Alert)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | key |
| 1 | <code>string</code> | type |
| 2 | <code>string</code> | symbol |
| 3 | <code>string</code> | price |

<a name="Alert..Data"></a>

### Alert~Data : [<code>Alert</code>](#Alert) \| [<code>ObjectData</code>](#Alert..ObjectData) \| [<code>ArrayData</code>](#Alert..ArrayData)
[Alert](#Alert) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>Alert</code>](#Alert)  
<a name="Alert..ObjectData"></a>

### Alert~ObjectData : <code>object</code>
[Alert](#Alert) data in plain object format. Suitable for passing to
[Alert](#Alert) to construct a model instance.

**Kind**: inner typedef of [<code>Alert</code>](#Alert)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | alert key |
| type | <code>string</code> | alert type |
| symbol | <code>string</code> | configured symbol |
| price | <code>string</code> | configured price |

<a name="BalanceInfo"></a>

## BalanceInfo ⇐ [<code>Model</code>](#Model)
Balance information model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [BalanceInfo](#BalanceInfo) ⇐ [<code>Model</code>](#Model)
    * [new BalanceInfo(data)](#new_BalanceInfo_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#BalanceInfo.unserialize) ⇒ <code>object</code>
        * [.validate(data)](#BalanceInfo.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#BalanceInfo..ArrayData) : <code>Array</code>
        * [~Data](#BalanceInfo..Data) : [<code>BalanceInfo</code>](#BalanceInfo) \| [<code>ObjectData</code>](#BalanceInfo..ObjectData) \| [<code>ArrayData</code>](#BalanceInfo..ArrayData)
        * [~ObjectData](#BalanceInfo..ObjectData) : <code>object</code>

<a name="new_BalanceInfo_new"></a>

### new BalanceInfo(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#BalanceInfo..Data) \| [<code>Array.&lt;Data&gt;</code>](#BalanceInfo..Data) | data |

<a name="Model+serialize"></a>

### balanceInfo.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>BalanceInfo</code>](#BalanceInfo)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### balanceInfo.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>BalanceInfo</code>](#BalanceInfo)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="BalanceInfo.unserialize"></a>

### BalanceInfo.unserialize(data) ⇒ <code>object</code>
**Kind**: static method of [<code>BalanceInfo</code>](#BalanceInfo)  
**Returns**: <code>object</code> - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#BalanceInfo..Data) \| [<code>Array.&lt;Data&gt;</code>](#BalanceInfo..Data) | data to convert to   POJO |

<a name="BalanceInfo.validate"></a>

### BalanceInfo.validate(data) ⇒ <code>string</code>
Validates a given balance info instance

**Kind**: static method of [<code>BalanceInfo</code>](#BalanceInfo)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#BalanceInfo..Data) \| [<code>Array.&lt;Data&gt;</code>](#BalanceInfo..Data) | instance(s) to   validate |

<a name="BalanceInfo..ArrayData"></a>

### BalanceInfo~ArrayData : <code>Array</code>
[BalanceInfo](#BalanceInfo) data in WSv2 array format. Suitable for passing to
[BalanceInfo](#BalanceInfo) to construct a model instance.

**Kind**: inner typedef of [<code>BalanceInfo</code>](#BalanceInfo)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | amount |
| 1 | <code>number</code> | amountNet |

<a name="BalanceInfo..Data"></a>

### BalanceInfo~Data : [<code>BalanceInfo</code>](#BalanceInfo) \| [<code>ObjectData</code>](#BalanceInfo..ObjectData) \| [<code>ArrayData</code>](#BalanceInfo..ArrayData)
Balance info data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>BalanceInfo</code>](#BalanceInfo)  
<a name="BalanceInfo..ObjectData"></a>

### BalanceInfo~ObjectData : <code>object</code>
[BalanceInfo](#BalanceInfo) data in plain object format. Suitable for passing to
[BalanceInfo](#BalanceInfo) to construct a model instance.

**Kind**: inner typedef of [<code>BalanceInfo</code>](#BalanceInfo)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | total balance |
| amountNet | <code>number</code> | net balance |

<a name="Candle"></a>

## Candle ⇐ [<code>Model</code>](#Model)
OHLCV Candle model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [Candle](#Candle) ⇐ [<code>Model</code>](#Model)
    * [new Candle(data)](#new_Candle_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#Candle.unserialize) ⇒ [<code>ObjectData</code>](#Candle..ObjectData)
        * [.validate(data)](#Candle.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#Candle..ArrayData) : <code>Array</code>
        * [~Data](#Candle..Data) : [<code>Candle</code>](#Candle) \| [<code>ObjectData</code>](#Candle..ObjectData) \| [<code>ArrayData</code>](#Candle..ArrayData)
        * [~ObjectData](#Candle..ObjectData) : <code>object</code>

<a name="new_Candle_new"></a>

### new Candle(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Candle..Data) \| [<code>Array.&lt;Data&gt;</code>](#Candle..Data) | data |

<a name="Model+serialize"></a>

### candle.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Candle</code>](#Candle)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### candle.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Candle</code>](#Candle)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="Candle.unserialize"></a>

### Candle.unserialize(data) ⇒ [<code>ObjectData</code>](#Candle..ObjectData)
**Kind**: static method of [<code>Candle</code>](#Candle)  
**Returns**: [<code>ObjectData</code>](#Candle..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Candle..Data) \| [<code>Array.&lt;Data&gt;</code>](#Candle..Data) | data to convert to POJO |

<a name="Candle.validate"></a>

### Candle.validate(data) ⇒ <code>string</code>
Validates a given Candle instance

**Kind**: static method of [<code>Candle</code>](#Candle)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Candle..Data) \| [<code>Array.&lt;Data&gt;</code>](#Candle..Data) | instance(s) to validate |

<a name="Candle..ArrayData"></a>

### Candle~ArrayData : <code>Array</code>
[Candle](#Candle) data in WSv2 array format. Suitable for passing to
[Candle](#Candle) to construct a model instance.

**Kind**: inner typedef of [<code>Candle</code>](#Candle)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | mts |
| 1 | <code>number</code> | open |
| 2 | <code>number</code> | close |
| 3 | <code>number</code> | high |
| 4 | <code>number</code> | low |
| 5 | <code>number</code> | volume |

<a name="Candle..Data"></a>

### Candle~Data : [<code>Candle</code>](#Candle) \| [<code>ObjectData</code>](#Candle..ObjectData) \| [<code>ArrayData</code>](#Candle..ArrayData)
Candle data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>Candle</code>](#Candle)  
<a name="Candle..ObjectData"></a>

### Candle~ObjectData : <code>object</code>
[Candle](#Candle) data in plain object format. Suitable for passing to
[Candle](#Candle) to construct a model instance.

**Kind**: inner typedef of [<code>Candle</code>](#Candle)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mts | <code>number</code> | timestamp |
| open | <code>number</code> | open price |
| close | <code>number</code> | close price |
| high | <code>number</code> | highest price in period |
| low | <code>number</code> | lowest price in period |
| volume | <code>number</code> | total volume in period |

<a name="ChangeLog"></a>

## ChangeLog ⇐ [<code>Model</code>](#Model)
Change log model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [ChangeLog](#ChangeLog) ⇐ [<code>Model</code>](#Model)
    * [new ChangeLog(data)](#new_ChangeLog_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#ChangeLog.unserialize) ⇒ <code>object</code>
        * [.validate(data)](#ChangeLog.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#ChangeLog..ArrayData) : <code>Array</code>
        * [~Data](#ChangeLog..Data) : [<code>ChangeLog</code>](#ChangeLog) \| [<code>ObjectData</code>](#ChangeLog..ObjectData) \| [<code>ArrayData</code>](#ChangeLog..ArrayData)
        * [~ObjectData](#ChangeLog..ObjectData) : <code>object</code>

<a name="new_ChangeLog_new"></a>

### new ChangeLog(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#ChangeLog..Data) \| [<code>Array.&lt;Data&gt;</code>](#ChangeLog..Data) | data |

<a name="Model+serialize"></a>

### changeLog.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>ChangeLog</code>](#ChangeLog)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### changeLog.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>ChangeLog</code>](#ChangeLog)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="ChangeLog.unserialize"></a>

### ChangeLog.unserialize(data) ⇒ <code>object</code>
**Kind**: static method of [<code>ChangeLog</code>](#ChangeLog)  
**Returns**: <code>object</code> - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#ChangeLog..Data) \| [<code>Array.&lt;Data&gt;</code>](#ChangeLog..Data) | data to convert to POJO |

<a name="ChangeLog.validate"></a>

### ChangeLog.validate(data) ⇒ <code>string</code>
Validates a given wallet instance

**Kind**: static method of [<code>ChangeLog</code>](#ChangeLog)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#ChangeLog..Data) \| [<code>Array.&lt;Data&gt;</code>](#ChangeLog..Data) | instance(s) to validate |

<a name="ChangeLog..ArrayData"></a>

### ChangeLog~ArrayData : <code>Array</code>
[ChangeLog](#ChangeLog) data in WSv2 array format. Suitable for passing to
[ChangeLog](#ChangeLog) to construct a model instance.

**Kind**: inner typedef of [<code>ChangeLog</code>](#ChangeLog)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | mtsCreate |
| 2 | <code>string</code> | log |
| 5 | <code>string</code> | ip |
| 6 | <code>string</code> | userAgent |

<a name="ChangeLog..Data"></a>

### ChangeLog~Data : [<code>ChangeLog</code>](#ChangeLog) \| [<code>ObjectData</code>](#ChangeLog..ObjectData) \| [<code>ArrayData</code>](#ChangeLog..ArrayData)
Change log data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>ChangeLog</code>](#ChangeLog)  
<a name="ChangeLog..ObjectData"></a>

### ChangeLog~ObjectData : <code>object</code>
[ChangeLog](#ChangeLog) data in plain object format. Suitable for passing to
[ChangeLog](#ChangeLog) to construct a model instance.

**Kind**: inner typedef of [<code>ChangeLog</code>](#ChangeLog)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mtsCreate | <code>number</code> | timestamp |
| log | <code>string</code> | log data |
| ip | <code>string</code> | ip |
| userAgent | <code>string</code> | user agent |

<a name="Currency"></a>

## Currency ⇐ [<code>Model</code>](#Model)
Currency model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [Currency](#Currency) ⇐ [<code>Model</code>](#Model)
    * [new Currency(data)](#new_Currency_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#Currency.unserialize) ⇒ [<code>ObjectData</code>](#Currency..ObjectData)
        * [.validate(data)](#Currency.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#Currency..ArrayData) : <code>Array</code>
        * [~Data](#Currency..Data) : [<code>Currency</code>](#Currency) \| [<code>ObjectData</code>](#Currency..ObjectData) \| [<code>ArrayData</code>](#Currency..ArrayData)
        * [~ObjectData](#Currency..ObjectData) : <code>object</code>

<a name="new_Currency_new"></a>

### new Currency(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Currency..Data) \| [<code>Array.&lt;Data&gt;</code>](#Currency..Data) | data |

<a name="Model+serialize"></a>

### currency.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Currency</code>](#Currency)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### currency.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Currency</code>](#Currency)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="Currency.unserialize"></a>

### Currency.unserialize(data) ⇒ [<code>ObjectData</code>](#Currency..ObjectData)
**Kind**: static method of [<code>Currency</code>](#Currency)  
**Returns**: [<code>ObjectData</code>](#Currency..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Currency..Data) \| [<code>Array.&lt;Data&gt;</code>](#Currency..Data) | data to convert to POJO |

<a name="Currency.validate"></a>

### Currency.validate(data) ⇒ <code>string</code>
Validates a given currency instance

**Kind**: static method of [<code>Currency</code>](#Currency)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Currency..Data) \| [<code>Array.&lt;Data&gt;</code>](#Currency..Data) | instance(s) to validate |

<a name="Currency..ArrayData"></a>

### Currency~ArrayData : <code>Array</code>
[Currency](#Currency) data in WSv2 array format. Suitable for passing to
[Currency](#Currency) to construct a model instance.

**Kind**: inner typedef of [<code>Currency</code>](#Currency)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | id |
| 1 | <code>string</code> | name |
| 2 | <code>string</code> | pool |
| 3 | <code>string</code> | explorer |
| 4 | <code>string</code> | symbol |

<a name="Currency..Data"></a>

### Currency~Data : [<code>Currency</code>](#Currency) \| [<code>ObjectData</code>](#Currency..ObjectData) \| [<code>ArrayData</code>](#Currency..ArrayData)
Currency data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>Currency</code>](#Currency)  
<a name="Currency..ObjectData"></a>

### Currency~ObjectData : <code>object</code>
[Currency](#Currency) data in plain object format. Suitable for passing to
[Currency](#Currency) to construct a model instance.

**Kind**: inner typedef of [<code>Currency</code>](#Currency)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id |
| name | <code>string</code> | currency name ('Ethereum') |
| pool | <code>string</code> | pool |
| exporer | <code>string</code> | explorer URL |
| symbol | <code>string</code> | symbol ('ETH') |

<a name="FundingCredit"></a>

## FundingCredit ⇐ [<code>Model</code>](#Model)
Funding Credit model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [FundingCredit](#FundingCredit) ⇐ [<code>Model</code>](#Model)
    * [new FundingCredit(data)](#new_FundingCredit_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#FundingCredit.unserialize) ⇒ [<code>ObjectData</code>](#FundingCredit..ObjectData)
        * [.validate(data)](#FundingCredit.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#FundingCredit..ArrayData) : <code>Array</code>
        * [~Data](#FundingCredit..Data) : [<code>FundingCredit</code>](#FundingCredit) \| [<code>ObjectData</code>](#FundingCredit..ObjectData) \| [<code>ArrayData</code>](#FundingCredit..ArrayData)
        * [~ObjectData](#FundingCredit..ObjectData) : <code>object</code>

<a name="new_FundingCredit_new"></a>

### new FundingCredit(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingCredit..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingCredit..Data) | data |

<a name="Model+serialize"></a>

### fundingCredit.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>FundingCredit</code>](#FundingCredit)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### fundingCredit.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>FundingCredit</code>](#FundingCredit)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="FundingCredit.unserialize"></a>

### FundingCredit.unserialize(data) ⇒ [<code>ObjectData</code>](#FundingCredit..ObjectData)
**Kind**: static method of [<code>FundingCredit</code>](#FundingCredit)  
**Returns**: [<code>ObjectData</code>](#FundingCredit..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingCredit..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingCredit..Data) | data to convert to   POJO |

<a name="FundingCredit.validate"></a>

### FundingCredit.validate(data) ⇒ <code>string</code>
Validates a given funding credit instance

**Kind**: static method of [<code>FundingCredit</code>](#FundingCredit)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingCredit..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingCredit..Data) | instance(s) to   validate |

<a name="FundingCredit..ArrayData"></a>

### FundingCredit~ArrayData : <code>Array</code>
[FundingCredit](#FundingCredit) data in WSv2 array format. Suitable for passing to a
[FundingCredit](#FundingCredit) instance.

**Kind**: inner typedef of [<code>FundingCredit</code>](#FundingCredit)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | id |
| 1 | <code>string</code> | symbol |
| 2 | <code>number</code> | side |
| 3 | <code>number</code> | mtsCreate |
| 4 | <code>number</code> | mtsUpdate |
| 13 | <code>number</code> | mtsOpening |
| 14 | <code>number</code> | mtsLastPayout |
| 5 | <code>number</code> | amount |
| 6 | <code>number</code> | flags |
| 7 | <code>number</code> | status |
| 11 | <code>number</code> | rate |
| 19 | <code>number</code> | rateReal |
| 12 | <code>number</code> | period |
| 21 | <code>string</code> | positionPair |
| 15 | <code>number</code> | notify |
| 16 | <code>number</code> | hidden |
| 18 | <code>number</code> | renew |
| 20 | <code>number</code> | noClose |

<a name="FundingCredit..Data"></a>

### FundingCredit~Data : [<code>FundingCredit</code>](#FundingCredit) \| [<code>ObjectData</code>](#FundingCredit..ObjectData) \| [<code>ArrayData</code>](#FundingCredit..ArrayData)
[FundingCredit](#FundingCredit) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>FundingCredit</code>](#FundingCredit)  
<a name="FundingCredit..ObjectData"></a>

### FundingCredit~ObjectData : <code>object</code>
[FundingCredit](#FundingCredit) data in plain object format. Suitable for passing to
[FundingCredit](#FundingCredit) to construct a model instance.

**Kind**: inner typedef of [<code>FundingCredit</code>](#FundingCredit)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id |
| symbol | <code>string</code> | symbol |
| side | <code>number</code> | side |
| mtsCreate | <code>number</code> | creation timestamp |
| mtsUpdate | <code>number</code> | last update timestamp |
| mtsOpening | <code>number</code> | open timestamp |
| mtsLastPayout | <code>number</code> | last payout timestamp |
| amount | <code>number</code> | remaining amount |
| flags | <code>number</code> | flags |
| status | <code>number</code> | current status |
| rate | <code>number</code> | rate |
| rateReal | <code>number</code> | rate |
| period | <code>number</code> | period |
| positionPair | <code>string</code> | position pair |
| notify | <code>number</code> \| <code>boolean</code> | notify flag |
| hidden | <code>number</code> \| <code>boolean</code> | hidden flag |
| renew | <code>number</code> \| <code>boolean</code> | renew flag |
| noClose | <code>number</code> \| <code>boolean</code> | no-close flag |

<a name="FundingInfo"></a>

## FundingInfo ⇐ [<code>Model</code>](#Model)
Account Funding Info model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  
**Todo**

- [ ] Extract type defs (varying format)


* [FundingInfo](#FundingInfo) ⇐ [<code>Model</code>](#Model)
    * [new FundingInfo(data)](#new_FundingInfo_new)
    * _instance_
        * [.serialize()](#FundingInfo+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#FundingInfo.unserialize) ⇒ <code>object</code>
        * [.validate(data)](#FundingInfo.validate) ⇒ <code>string</code>

<a name="new_FundingInfo_new"></a>

### new FundingInfo(data)
Create a new instance from a data payload


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| <code>Array.&lt;Array&gt;</code> \| <code>Array</code> | funding info data |

<a name="FundingInfo+serialize"></a>

### fundingInfo.serialize() ⇒ <code>Array</code>
Return an array representation of this model

**Kind**: instance method of [<code>FundingInfo</code>](#FundingInfo)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### fundingInfo.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>FundingInfo</code>](#FundingInfo)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="FundingInfo.unserialize"></a>

### FundingInfo.unserialize(data) ⇒ <code>object</code>
TODO: Figure out a better object key for 'payload', as we need to support
      both arrays and POJOs

**Kind**: static method of [<code>FundingInfo</code>](#FundingInfo)  
**Returns**: <code>object</code> - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| <code>Array.&lt;Array&gt;</code> \| <code>Array</code> | data to convert to POJO |

<a name="FundingInfo.validate"></a>

### FundingInfo.validate(data) ⇒ <code>string</code>
Validates a given funding info instance

**Kind**: static method of [<code>FundingInfo</code>](#FundingInfo)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| [<code>Array.&lt;FundingInfo&gt;</code>](#FundingInfo) \| [<code>FundingInfo</code>](#FundingInfo) | data to validate |

<a name="FundingLoan"></a>

## FundingLoan ⇐ [<code>Model</code>](#Model)
Funding Loan model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [FundingLoan](#FundingLoan) ⇐ [<code>Model</code>](#Model)
    * [new FundingLoan(data)](#new_FundingLoan_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#FundingLoan.unserialize) ⇒ [<code>ObjectData</code>](#FundingLoan..ObjectData)
        * [.validate(data)](#FundingLoan.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#FundingLoan..ArrayData) : <code>Array</code>
        * [~Data](#FundingLoan..Data) : [<code>FundingLoan</code>](#FundingLoan) \| [<code>ObjectData</code>](#FundingLoan..ObjectData) \| [<code>ArrayData</code>](#FundingLoan..ArrayData)
        * [~ObjectData](#FundingLoan..ObjectData) : <code>object</code>

<a name="new_FundingLoan_new"></a>

### new FundingLoan(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingLoan..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingLoan..Data) | data |

<a name="Model+serialize"></a>

### fundingLoan.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>FundingLoan</code>](#FundingLoan)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### fundingLoan.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>FundingLoan</code>](#FundingLoan)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="FundingLoan.unserialize"></a>

### FundingLoan.unserialize(data) ⇒ [<code>ObjectData</code>](#FundingLoan..ObjectData)
**Kind**: static method of [<code>FundingLoan</code>](#FundingLoan)  
**Returns**: [<code>ObjectData</code>](#FundingLoan..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingLoan..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingLoan..Data) | data to convert to   POJO |

<a name="FundingLoan.validate"></a>

### FundingLoan.validate(data) ⇒ <code>string</code>
Validates a given funding loan instance

**Kind**: static method of [<code>FundingLoan</code>](#FundingLoan)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingLoan..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingLoan..Data) | instance(s) to   validate |

<a name="FundingLoan..ArrayData"></a>

### FundingLoan~ArrayData : <code>Array</code>
[FundingLoan](#FundingLoan) data in WSv2 array format. Suitable for passing to
[FundingLoan](#FundingLoan) to construct a model instance.

**Kind**: inner typedef of [<code>FundingLoan</code>](#FundingLoan)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | id |
| 1 | <code>string</code> | symbol |
| 2 | <code>number</code> | side |
| 3 | <code>number</code> | mtsCreate |
| 4 | <code>number</code> | mtsUpdate |
| 13 | <code>number</code> | mtsOpening |
| 14 | <code>number</code> | mtsLastPayout |
| 5 | <code>number</code> | amount |
| 6 | <code>number</code> | flags |
| 7 | <code>number</code> | status |
| 8 | <code>string</code> | type |
| 11 | <code>number</code> | rate |
| 19 | <code>number</code> | rateReal |
| 12 | <code>number</code> | period |
| 15 | <code>number</code> | notify |
| 16 | <code>number</code> | hidden |
| 18 | <code>number</code> | renew |
| 20 | <code>number</code> | noClose |

<a name="FundingLoan..Data"></a>

### FundingLoan~Data : [<code>FundingLoan</code>](#FundingLoan) \| [<code>ObjectData</code>](#FundingLoan..ObjectData) \| [<code>ArrayData</code>](#FundingLoan..ArrayData)
[FundingLoan](#FundingLoan) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>FundingLoan</code>](#FundingLoan)  
<a name="FundingLoan..ObjectData"></a>

### FundingLoan~ObjectData : <code>object</code>
[FundingLoan](#FundingLoan) data in plain object format. Suitable for passing to
[FundingLoan](#FundingLoan) to construct a model instance.

**Kind**: inner typedef of [<code>FundingLoan</code>](#FundingLoan)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id |
| symbol | <code>string</code> | symbol |
| side | <code>number</code> | side |
| mtsCreate | <code>number</code> | creation timestamp |
| mtsUpdate | <code>number</code> | last update timestamp |
| mtsOpening | <code>number</code> | open timestamp |
| mtsLastPayout | <code>number</code> | last payout timestamp |
| amount | <code>number</code> | amount |
| flags | <code>number</code> | flags |
| status | <code>number</code> | status |
| rate | <code>number</code> | rate |
| rateReal | <code>number</code> | rate real |
| period | <code>number</code> | period flag |
| notify | <code>number</code> \| <code>boolean</code> | notify flag |
| hidden | <code>number</code> \| <code>boolean</code> | hidden flag |
| renew | <code>number</code> \| <code>boolean</code> | renew flag |
| noClose | <code>number</code> \| <code>boolean</code> | no-close flag |

<a name="FundingOffer"></a>

## FundingOffer ⇐ [<code>Model</code>](#Model)
Funding Offer model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [FundingOffer](#FundingOffer) ⇐ [<code>Model</code>](#Model)
    * [new FundingOffer(data, [apiInterface])](#new_FundingOffer_new)
    * _instance_
        * [.toNewOfferPacket()](#FundingOffer+toNewOfferPacket) ⇒ [<code>SubmitPayload</code>](#FundingOffer..SubmitPayload)
        * [.submit([apiInterface])](#FundingOffer+submit) ⇒ <code>Promise</code>
        * [.cancel([apiInterface])](#FundingOffer+cancel) ⇒ <code>Promise</code>
        * [.close([apiInterface])](#FundingOffer+close) ⇒ <code>Promise</code>
        * [.toString()](#FundingOffer+toString) ⇒ <code>string</code>
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#FundingOffer.unserialize) ⇒ [<code>ObjectData</code>](#FundingOffer..ObjectData)
        * [.validate(data)](#FundingOffer.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#FundingOffer..ArrayData) : <code>Array</code>
        * [~Data](#FundingOffer..Data) : [<code>FundingOffer</code>](#FundingOffer) \| [<code>ObjectData</code>](#FundingOffer..ObjectData) \| [<code>ArrayData</code>](#FundingOffer..ArrayData)
        * [~ObjectData](#FundingOffer..ObjectData) : <code>object</code>
        * [~SubmitPayload](#FundingOffer..SubmitPayload) : <code>object</code>

<a name="new_FundingOffer_new"></a>

### new FundingOffer(data, [apiInterface])

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingOffer..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingOffer..Data) | data |
| [apiInterface] | <code>object</code> | rest or websocket object capable of   submitting funding offers |

<a name="FundingOffer+toNewOfferPacket"></a>

### fundingOffer.toNewOfferPacket() ⇒ [<code>SubmitPayload</code>](#FundingOffer..SubmitPayload)
Creates an order map that can be used in either the websocket `on`
command or a rest request body

**Kind**: instance method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: [<code>SubmitPayload</code>](#FundingOffer..SubmitPayload) - on  
<a name="FundingOffer+submit"></a>

### fundingOffer.submit([apiInterface]) ⇒ <code>Promise</code>
Submit the funding offer

**Kind**: instance method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| [apiInterface] | <code>bfx-api-node-rest.RESTv2</code> | rest instance |

<a name="FundingOffer+cancel"></a>

### fundingOffer.cancel([apiInterface]) ⇒ <code>Promise</code>
Cancel the funding offer

**Kind**: instance method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| [apiInterface] | <code>bfx-api-node-rest.RESTv2</code> | rest instance |

<a name="FundingOffer+close"></a>

### fundingOffer.close([apiInterface]) ⇒ <code>Promise</code>
Close the funding offer

**Kind**: instance method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| [apiInterface] | <code>bfx-api-node-rest.RESTv2</code> | rest instance |

<a name="FundingOffer+toString"></a>

### fundingOffer.toString() ⇒ <code>string</code>
Returns a string representation of the position

**Kind**: instance method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: <code>string</code> - desc  
<a name="Model+serialize"></a>

### fundingOffer.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>FundingOffer</code>](#FundingOffer)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### fundingOffer.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>FundingOffer</code>](#FundingOffer)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="FundingOffer.unserialize"></a>

### FundingOffer.unserialize(data) ⇒ [<code>ObjectData</code>](#FundingOffer..ObjectData)
**Kind**: static method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: [<code>ObjectData</code>](#FundingOffer..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingOffer..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingOffer..Data) | data to convert to   POJO |

<a name="FundingOffer.validate"></a>

### FundingOffer.validate(data) ⇒ <code>string</code>
Validates a given funding offer instance

**Kind**: static method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingOffer..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingOffer..Data) | instance(s) to   validate |

<a name="FundingOffer..ArrayData"></a>

### FundingOffer~ArrayData : <code>Array</code>
[FundingOffer](#FundingOffer) data in WSv2 array format. Suitable for passing to
[FundingOffer](#FundingOffer) to construct a model instance.

**Kind**: inner typedef of [<code>FundingOffer</code>](#FundingOffer)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | id |
| 1 | <code>string</code> | symbol |
| 2 | <code>number</code> | mtsCreate |
| 3 | <code>number</code> | mtsUpdate |
| 4 | <code>number</code> | amount |
| 5 | <code>number</code> | amountOrig |
| 6 | <code>string</code> | type |
| 9 | <code>number</code> | flags |
| 10 | <code>string</code> | status |
| 14 | <code>number</code> | rate |
| 15 | <code>number</code> | period |
| 16 | <code>number</code> | notify |
| 17 | <code>number</code> | hidden |
| 19 | <code>number</code> | renew |
| 20 | <code>number</code> | rateReal |

<a name="FundingOffer..Data"></a>

### FundingOffer~Data : [<code>FundingOffer</code>](#FundingOffer) \| [<code>ObjectData</code>](#FundingOffer..ObjectData) \| [<code>ArrayData</code>](#FundingOffer..ArrayData)
[FundingOffer](#FundingOffer) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>FundingOffer</code>](#FundingOffer)  
<a name="FundingOffer..ObjectData"></a>

### FundingOffer~ObjectData : <code>object</code>
[FundingOffer](#FundingOffer) data in plain object format. Suitable for passing to
[FundingOffer](#FundingOffer) to construct a model instance.

**Kind**: inner typedef of [<code>FundingOffer</code>](#FundingOffer)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id |
| symbol | <code>string</code> | symbol |
| mtsCreate | <code>number</code> | creation timestamp |
| mtsUpdate | <code>number</code> | last update timestamp |
| amount | <code>string</code> | remaining amount |
| amountOrig | <code>string</code> | original amount |
| type | <code>string</code> | funding offer type |
| flags | <code>number</code> | flags |
| status | <code>string</code> | current status |
| rate | <code>number</code> | rate |
| rateReal | <code>number</code> | rate real |
| period | <code>number</code> | period for the offer |
| notify | <code>number</code> \| <code>boolean</code> | notify flag |
| hidden | <code>number</code> \| <code>boolean</code> | hidden flag |
| renew | <code>number</code> \| <code>boolean</code> | renew flag |

<a name="FundingOffer..SubmitPayload"></a>

### FundingOffer~SubmitPayload : <code>object</code>
A set of parameters describing an atomic [FundingOffer](#FundingOffer) that can be
sent via the WSv2 API.

**Kind**: inner typedef of [<code>FundingOffer</code>](#FundingOffer)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | type |
| symbol | <code>string</code> | symbol |
| amount | <code>string</code> | amount |
| rate | <code>string</code> | rate |
| period | <code>number</code> | period |
| flags | <code>number</code> | flags |

<a name="FundingTickerHist"></a>

## FundingTickerHist ⇐ [<code>Model</code>](#Model)
Historical Funding Ticker model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [FundingTickerHist](#FundingTickerHist) ⇐ [<code>Model</code>](#Model)
    * [new FundingTickerHist(data)](#new_FundingTickerHist_new)
    * _instance_
        * [.quote()](#FundingTickerHist+quote) ⇒ <code>string</code>
        * [.base()](#FundingTickerHist+base) ⇒ <code>string</code>
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#FundingTickerHist.unserialize) ⇒ [<code>ObjectData</code>](#FundingTickerHist..ObjectData)
        * [.validate(data)](#FundingTickerHist.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#FundingTickerHist..ArrayData) : <code>Array</code>
        * [~Data](#FundingTickerHist..Data) : [<code>FundingTickerHist</code>](#FundingTickerHist) \| [<code>ObjectData</code>](#FundingTickerHist..ObjectData) \| [<code>ArrayData</code>](#FundingTickerHist..ArrayData)
        * [~ObjectData](#FundingTickerHist..ObjectData) : <code>object</code>

<a name="new_FundingTickerHist_new"></a>

### new FundingTickerHist(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingTickerHist..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingTickerHist..Data) | data |

<a name="FundingTickerHist+quote"></a>

### fundingTickerHist.quote() ⇒ <code>string</code>
Get the quote currency for the historical ticker.

**Kind**: instance method of [<code>FundingTickerHist</code>](#FundingTickerHist)  
**Returns**: <code>string</code> - quoteCurrency  
<a name="FundingTickerHist+base"></a>

### fundingTickerHist.base() ⇒ <code>string</code>
Get the base currency for the historical ticker.

**Kind**: instance method of [<code>FundingTickerHist</code>](#FundingTickerHist)  
**Returns**: <code>string</code> - baseCurrency  
<a name="Model+serialize"></a>

### fundingTickerHist.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>FundingTickerHist</code>](#FundingTickerHist)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### fundingTickerHist.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>FundingTickerHist</code>](#FundingTickerHist)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="FundingTickerHist.unserialize"></a>

### FundingTickerHist.unserialize(data) ⇒ [<code>ObjectData</code>](#FundingTickerHist..ObjectData)
**Kind**: static method of [<code>FundingTickerHist</code>](#FundingTickerHist)  
**Returns**: [<code>ObjectData</code>](#FundingTickerHist..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingTickerHist..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingTickerHist..Data) | data to   convert to POJO |

<a name="FundingTickerHist.validate"></a>

### FundingTickerHist.validate(data) ⇒ <code>string</code>
Validates a given historical funding ticker instance.

**Kind**: static method of [<code>FundingTickerHist</code>](#FundingTickerHist)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingTickerHist..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingTickerHist..Data) | models   to validate |

<a name="FundingTickerHist..ArrayData"></a>

### FundingTickerHist~ArrayData : <code>Array</code>
[FundingTickerHist](#FundingTickerHist) data in WSv2 array format. Suitable for passing to
[FundingTickerHist](#FundingTickerHist) to construct a model instance.

**Kind**: inner typedef of [<code>FundingTickerHist</code>](#FundingTickerHist)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | symbol |
| 2 | <code>number</code> | bid |
| 4 | <code>number</code> | bidPeriod |
| 5 | <code>number</code> | ask |
| 15 | <code>number</code> | mtsUpdate |

<a name="FundingTickerHist..Data"></a>

### FundingTickerHist~Data : [<code>FundingTickerHist</code>](#FundingTickerHist) \| [<code>ObjectData</code>](#FundingTickerHist..ObjectData) \| [<code>ArrayData</code>](#FundingTickerHist..ArrayData)
[FundingTickerHist](#FundingTickerHist) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>FundingTickerHist</code>](#FundingTickerHist)  
<a name="FundingTickerHist..ObjectData"></a>

### FundingTickerHist~ObjectData : <code>object</code>
[FundingTickerHist](#FundingTickerHist) data in plain object format. Suitable for passing
to [FundingTickerHist](#FundingTickerHist) to construct a model instance.

**Kind**: inner typedef of [<code>FundingTickerHist</code>](#FundingTickerHist)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| symbol | <code>string</code> | symbol |
| bid | <code>number</code> | bid |
| bidPeriod | <code>number</code> | bid period |
| ask | <code>number</code> | ask |
| mtsUpdate | <code>number</code> | timestamp |

<a name="FundingTicker"></a>

## FundingTicker ⇐ [<code>Model</code>](#Model)
Funding Ticker model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [FundingTicker](#FundingTicker) ⇐ [<code>Model</code>](#Model)
    * [new FundingTicker(data)](#new_FundingTicker_new)
    * _instance_
        * [.quote()](#FundingTicker+quote) ⇒ <code>string</code>
        * [.base()](#FundingTicker+base) ⇒ <code>string</code>
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#FundingTicker.unserialize) ⇒ [<code>ObjectData</code>](#FundingTicker..ObjectData)
        * [.validate(data)](#FundingTicker.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#FundingTicker..ArrayData) : <code>Array</code>
        * [~Data](#FundingTicker..Data) : [<code>FundingTicker</code>](#FundingTicker) \| [<code>ObjectData</code>](#FundingTicker..ObjectData) \| [<code>ArrayData</code>](#FundingTicker..ArrayData)
        * [~ObjectData](#FundingTicker..ObjectData) : <code>object</code>

<a name="new_FundingTicker_new"></a>

### new FundingTicker(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingTicker..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingTicker..Data) | data |

<a name="FundingTicker+quote"></a>

### fundingTicker.quote() ⇒ <code>string</code>
Get the quote currency for the ticker.

**Kind**: instance method of [<code>FundingTicker</code>](#FundingTicker)  
**Returns**: <code>string</code> - quoteCurrency  
<a name="FundingTicker+base"></a>

### fundingTicker.base() ⇒ <code>string</code>
Get the base currency for the ticker.

**Kind**: instance method of [<code>FundingTicker</code>](#FundingTicker)  
**Returns**: <code>string</code> - baseCurrency  
<a name="Model+serialize"></a>

### fundingTicker.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>FundingTicker</code>](#FundingTicker)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### fundingTicker.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>FundingTicker</code>](#FundingTicker)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="FundingTicker.unserialize"></a>

### FundingTicker.unserialize(data) ⇒ [<code>ObjectData</code>](#FundingTicker..ObjectData)
**Kind**: static method of [<code>FundingTicker</code>](#FundingTicker)  
**Returns**: [<code>ObjectData</code>](#FundingTicker..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingTicker..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingTicker..Data) | data to convert to   POJO |

<a name="FundingTicker.validate"></a>

### FundingTicker.validate(data) ⇒ <code>string</code>
Validates a given funding ticker instance

**Kind**: static method of [<code>FundingTicker</code>](#FundingTicker)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingTicker..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingTicker..Data) | instance(s) to   validate |

<a name="FundingTicker..ArrayData"></a>

### FundingTicker~ArrayData : <code>Array</code>
[FundingTicker](#FundingTicker) data in WSv2 array format. Suitable for passing to
[FundingTicker](#FundingTicker) instance.

**Kind**: inner typedef of [<code>FundingTicker</code>](#FundingTicker)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | symbol |
| 1 | <code>number</code> | frr |
| 2 | <code>number</code> | bid |
| 3 | <code>number</code> | bidSize |
| 4 | <code>number</code> | bidPeriod |
| 5 | <code>number</code> | ask |
| 6 | <code>number</code> | askSize |
| 7 | <code>number</code> | askPeriod |
| 8 | <code>number</code> | dailyChange |
| 9 | <code>number</code> | dailyChangePerc |
| 10 | <code>number</code> | lastPrice |
| 11 | <code>number</code> | volume |
| 12 | <code>number</code> | high |
| 13 | <code>number</code> | low |

<a name="FundingTicker..Data"></a>

### FundingTicker~Data : [<code>FundingTicker</code>](#FundingTicker) \| [<code>ObjectData</code>](#FundingTicker..ObjectData) \| [<code>ArrayData</code>](#FundingTicker..ArrayData)
[FundingTicker](#FundingTicker) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>FundingTicker</code>](#FundingTicker)  
<a name="FundingTicker..ObjectData"></a>

### FundingTicker~ObjectData : <code>object</code>
[FundingTicker](#FundingTicker) data in plain object format. Suitable for passing to
[FundingTicker](#FundingTicker) to construct a model instance.

**Kind**: inner typedef of [<code>FundingTicker</code>](#FundingTicker)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| symbol | <code>string</code> | symbol |
| frr | <code>number</code> \| <code>boolean</code> | current FRR |
| bid | <code>number</code> | best bid |
| bidSize | <code>number</code> | total bid amount |
| bidPeriod | <code>number</code> | bid period |
| ask | <code>number</code> | best ask |
| askSize | <code>number</code> | total ask amount |
| askPeriod | <code>number</code> | ask period |
| dailyChange | <code>number</code> | net 24h period change |
| dailyChangePerc | <code>number</code> | net 24h period change as percent |
| lastPrice | <code>number</code> | last price |
| volume | <code>number</code> | total volume in last 24h period |
| high | <code>number</code> | highest rate in last 24h period |
| low | <code>number</code> | lowest rate in last 24h period |

<a name="FundingTrade"></a>

## FundingTrade ⇐ [<code>Model</code>](#Model)
Funding Trade model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [FundingTrade](#FundingTrade) ⇐ [<code>Model</code>](#Model)
    * [new FundingTrade(data)](#new_FundingTrade_new)
    * _instance_
        * [.toString()](#FundingTrade+toString) ⇒ <code>string</code>
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#FundingTrade.unserialize) ⇒ [<code>ObjectData</code>](#FundingTrade..ObjectData)
        * [.validate(data)](#FundingTrade.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#FundingTrade..ArrayData) : <code>Array</code>
        * [~Data](#FundingTrade..Data) : [<code>FundingTrade</code>](#FundingTrade) \| [<code>ObjectData</code>](#FundingTrade..ObjectData) \| [<code>ArrayData</code>](#FundingTrade..ArrayData)
        * [~ObjectData](#FundingTrade..ObjectData) : <code>object</code>

<a name="new_FundingTrade_new"></a>

### new FundingTrade(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingTrade..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingTrade..Data) | data |

<a name="FundingTrade+toString"></a>

### fundingTrade.toString() ⇒ <code>string</code>
Returns a string representation of the model, containing pertinent
information.

**Kind**: instance method of [<code>FundingTrade</code>](#FundingTrade)  
**Returns**: <code>string</code> - str  
<a name="Model+serialize"></a>

### fundingTrade.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>FundingTrade</code>](#FundingTrade)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### fundingTrade.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>FundingTrade</code>](#FundingTrade)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="FundingTrade.unserialize"></a>

### FundingTrade.unserialize(data) ⇒ [<code>ObjectData</code>](#FundingTrade..ObjectData)
**Kind**: static method of [<code>FundingTrade</code>](#FundingTrade)  
**Returns**: [<code>ObjectData</code>](#FundingTrade..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingTrade..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingTrade..Data) | data to convert to   POJO |

<a name="FundingTrade.validate"></a>

### FundingTrade.validate(data) ⇒ <code>string</code>
Validates a given funding trade instance

**Kind**: static method of [<code>FundingTrade</code>](#FundingTrade)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#FundingTrade..Data) \| [<code>Array.&lt;Data&gt;</code>](#FundingTrade..Data) | instance(s) to   validate |

<a name="FundingTrade..ArrayData"></a>

### FundingTrade~ArrayData : <code>Array</code>
[FundingTrade](#FundingTrade) data in WSv2 array format. Suitable for passing to
[FundingTrade](#FundingTrade) to construct a model instance.

**Kind**: inner typedef of [<code>FundingTrade</code>](#FundingTrade)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | id |
| 1 | <code>string</code> | symbol |
| 2 | <code>number</code> | mtsCreate |
| 3 | <code>number</code> | offerID |
| 4 | <code>number</code> | amount |
| 5 | <code>number</code> | rate |
| 6 | <code>number</code> | period |
| 7 | <code>number</code> | maker |

<a name="FundingTrade..Data"></a>

### FundingTrade~Data : [<code>FundingTrade</code>](#FundingTrade) \| [<code>ObjectData</code>](#FundingTrade..ObjectData) \| [<code>ArrayData</code>](#FundingTrade..ArrayData)
[FundingTrade](#FundingTrade) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>FundingTrade</code>](#FundingTrade)  
<a name="FundingTrade..ObjectData"></a>

### FundingTrade~ObjectData : <code>object</code>
[FundingTrade](#FundingTrade) data in plain object format. Suitable for passing to
[FundingTrade](#FundingTrade) to construct a model instance.

**Kind**: inner typedef of [<code>FundingTrade</code>](#FundingTrade)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id |
| symbol | <code>string</code> | symbol |
| mtsCreate | <code>number</code> | creation timestamp |
| offerID | <code>number</code> | taken offer ID |
| amount | <code>number</code> | amount |
| rate | <code>number</code> | rate |
| period | <code>number</code> | period |
| maker | <code>number</code> \| <code>boolean</code> | maker flag |

<a name="Invoice"></a>

## Invoice
Deposit Invoice model

**Kind**: global class  

* [Invoice](#Invoice)
    * [new Invoice(data)](#new_Invoice_new)
    * _instance_
        * [.toString()](#Invoice+toString) ⇒ <code>string</code>
    * _static_
        * [.unserialize(data)](#Invoice.unserialize) ⇒ <code>object</code>
        * [.validate(data)](#Invoice.validate) ⇒ <code>string</code>

<a name="new_Invoice_new"></a>

### new Invoice(data)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> \| <code>Array</code> | deposit invoice |
| data.invoiceHash | <code>string</code> | Hashed invoice |
| data.invoice | <code>string</code> | Requested invoice |
| data.amount | <code>string</code> | Amount of invoice |

<a name="Invoice+toString"></a>

### invoice.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>Invoice</code>](#Invoice)  
**Returns**: <code>string</code> - str  
<a name="Invoice.unserialize"></a>

### Invoice.unserialize(data) ⇒ <code>object</code>
**Kind**: static method of [<code>Invoice</code>](#Invoice)  
**Returns**: <code>object</code> - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| <code>Array.&lt;Array&gt;</code> \| <code>Array</code> | data to convert to POJO |

<a name="Invoice.validate"></a>

### Invoice.validate(data) ⇒ <code>string</code>
Validates a given invoice instance

**Kind**: static method of [<code>Invoice</code>](#Invoice)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| [<code>Array.&lt;Invoice&gt;</code>](#Invoice) \| [<code>Invoice</code>](#Invoice) \| <code>Array</code> | instance to validate |

<a name="LedgerEntry"></a>

## LedgerEntry ⇐ [<code>Model</code>](#Model)
Ledger Entry model; wallet field is automatically populated if a description
is provided.

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [LedgerEntry](#LedgerEntry) ⇐ [<code>Model</code>](#Model)
    * [new LedgerEntry(data)](#new_LedgerEntry_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#LedgerEntry.unserialize) ⇒ [<code>ObjectData</code>](#LedgerEntry..ObjectData)
        * [.validate(data)](#LedgerEntry.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#LedgerEntry..ArrayData) : <code>Array</code>
        * [~Data](#LedgerEntry..Data) : [<code>LedgerEntry</code>](#LedgerEntry) \| [<code>ObjectData</code>](#LedgerEntry..ObjectData) \| [<code>ArrayData</code>](#LedgerEntry..ArrayData)
        * [~ObjectData](#LedgerEntry..ObjectData) : <code>object</code>

<a name="new_LedgerEntry_new"></a>

### new LedgerEntry(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#LedgerEntry..Data) \| [<code>Array.&lt;Data&gt;</code>](#LedgerEntry..Data) | data |

<a name="Model+serialize"></a>

### ledgerEntry.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>LedgerEntry</code>](#LedgerEntry)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### ledgerEntry.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>LedgerEntry</code>](#LedgerEntry)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="LedgerEntry.unserialize"></a>

### LedgerEntry.unserialize(data) ⇒ [<code>ObjectData</code>](#LedgerEntry..ObjectData)
**Kind**: static method of [<code>LedgerEntry</code>](#LedgerEntry)  
**Returns**: [<code>ObjectData</code>](#LedgerEntry..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#LedgerEntry..Data) \| [<code>Array.&lt;Data&gt;</code>](#LedgerEntry..Data) | data to convert to   POJO |

<a name="LedgerEntry.validate"></a>

### LedgerEntry.validate(data) ⇒ <code>string</code>
Validates a given ledger entry instance

**Kind**: static method of [<code>LedgerEntry</code>](#LedgerEntry)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#LedgerEntry..Data) \| [<code>Array.&lt;Data&gt;</code>](#LedgerEntry..Data) | instance(s) to   validate |

<a name="LedgerEntry..ArrayData"></a>

### LedgerEntry~ArrayData : <code>Array</code>
[LedgerEntry](#LedgerEntry) data in WSv2 array format. Suitable for passing to
[LedgerEntry](#LedgerEntry) to construct a model instance.

**Kind**: inner typedef of [<code>LedgerEntry</code>](#LedgerEntry)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | id |
| 1 | <code>string</code> | currency |
| 3 | <code>number</code> | mts |
| 5 | <code>number</code> | amount |
| 6 | <code>number</code> | balance |
| 8 | <code>string</code> | description |

<a name="LedgerEntry..Data"></a>

### LedgerEntry~Data : [<code>LedgerEntry</code>](#LedgerEntry) \| [<code>ObjectData</code>](#LedgerEntry..ObjectData) \| [<code>ArrayData</code>](#LedgerEntry..ArrayData)
[LedgerEntry](#LedgerEntry) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>LedgerEntry</code>](#LedgerEntry)  
<a name="LedgerEntry..ObjectData"></a>

### LedgerEntry~ObjectData : <code>object</code>
[LedgerEntry](#LedgerEntry) data in plain object format. Suitable for passing to
[LedgerEntry](#LedgerEntry) to construct a model instance.

**Kind**: inner typedef of [<code>LedgerEntry</code>](#LedgerEntry)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id |
| currency | <code>string</code> | currency |
| mts | <code>number</code> | transaction timestamp |
| amount | <code>number</code> | transaction amount |
| balance | <code>number</code> | balance at time of transaction |
| description | <code>string</code> | transaction description |

<a name="Liquidations"></a>

## Liquidations ⇐ [<code>Model</code>](#Model)
Liquidation Info model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [Liquidations](#Liquidations) ⇐ [<code>Model</code>](#Model)
    * [new Liquidations(data)](#new_Liquidations_new)
    * _instance_
        * [.toString()](#Liquidations+toString) ⇒ <code>string</code>
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#Liquidations.unserialize) ⇒ [<code>ObjectData</code>](#Liquidations..ObjectData)
        * [.validate(data)](#Liquidations.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#Liquidations..ArrayData) : <code>Array</code>
        * [~Data](#Liquidations..Data) : [<code>Liquidations</code>](#Liquidations) \| [<code>ObjectData</code>](#Liquidations..ObjectData) \| [<code>ArrayData</code>](#Liquidations..ArrayData)
        * [~ObjectData](#Liquidations..ObjectData) : <code>object</code>

<a name="new_Liquidations_new"></a>

### new Liquidations(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Liquidations..Data) \| [<code>Array.&lt;Data&gt;</code>](#Liquidations..Data) | data |

<a name="Liquidations+toString"></a>

### liquidations.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>Liquidations</code>](#Liquidations)  
**Returns**: <code>string</code> - str  
<a name="Model+serialize"></a>

### liquidations.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Liquidations</code>](#Liquidations)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### liquidations.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Liquidations</code>](#Liquidations)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="Liquidations.unserialize"></a>

### Liquidations.unserialize(data) ⇒ [<code>ObjectData</code>](#Liquidations..ObjectData)
**Kind**: static method of [<code>Liquidations</code>](#Liquidations)  
**Returns**: [<code>ObjectData</code>](#Liquidations..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Liquidations..Data) \| [<code>Array.&lt;Data&gt;</code>](#Liquidations..Data) | data to convert to   POJO |

<a name="Liquidations.validate"></a>

### Liquidations.validate(data) ⇒ <code>string</code>
Validates a given liquidation instance

**Kind**: static method of [<code>Liquidations</code>](#Liquidations)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Liquidations..Data) \| [<code>Array.&lt;Data&gt;</code>](#Liquidations..Data) | instance(s) to   validate |

<a name="Liquidations..ArrayData"></a>

### Liquidations~ArrayData : <code>Array</code>
[Liquidations](#Liquidations) data in WSv2 array format. Suitable for passing to
[Liquidations](#Liquidations) to construct a model instance.

**Kind**: inner typedef of [<code>Liquidations</code>](#Liquidations)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 1 | <code>number</code> | posId |
| 2 | <code>number</code> | mtsUpdated |
| 4 | <code>string</code> | symbol |
| 5 | <code>number</code> | amount |
| 6 | <code>number</code> | basePrice |
| 8 | <code>number</code> | isMatch |
| 9 | <code>number</code> | isMarketSold |

<a name="Liquidations..Data"></a>

### Liquidations~Data : [<code>Liquidations</code>](#Liquidations) \| [<code>ObjectData</code>](#Liquidations..ObjectData) \| [<code>ArrayData</code>](#Liquidations..ArrayData)
[Liquidations](#Liquidations) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>Liquidations</code>](#Liquidations)  
<a name="Liquidations..ObjectData"></a>

### Liquidations~ObjectData : <code>object</code>
[Liquidations](#Liquidations) data in plain object format. Suitable for passing to
[Liquidations](#Liquidations) to construct a model instance.

**Kind**: inner typedef of [<code>Liquidations</code>](#Liquidations)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| posId | <code>number</code> | position ID |
| mtsUpdated | <code>number</code> | timestamp |
| symbol | <code>string</code> | symbol |
| amount | <code>number</code> | amount |
| basePrice | <code>number</code> | base price |
| isMatch | <code>number</code> \| <code>boolean</code> | matched flag |
| isMarketSold | <code>number</code> \| <code>boolean</code> | sold flag |

<a name="Login"></a>

## Login ⇐ [<code>Model</code>](#Model)
Login event model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [Login](#Login) ⇐ [<code>Model</code>](#Model)
    * [new Login(data)](#new_Login_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#Login.unserialize) ⇒ [<code>ObjectData</code>](#Login..ObjectData)
        * [.validate(data)](#Login.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#Login..ArrayData) : <code>Array</code>
        * [~Data](#Login..Data) : [<code>Login</code>](#Login) \| [<code>ObjectData</code>](#Login..ObjectData) \| [<code>ArrayData</code>](#Login..ArrayData)
        * [~ObjectData](#Login..ObjectData) : <code>object</code>

<a name="new_Login_new"></a>

### new Login(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Login..Data) \| [<code>Array.&lt;Data&gt;</code>](#Login..Data) | data |

<a name="Model+serialize"></a>

### login.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Login</code>](#Login)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### login.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Login</code>](#Login)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="Login.unserialize"></a>

### Login.unserialize(data) ⇒ [<code>ObjectData</code>](#Login..ObjectData)
**Kind**: static method of [<code>Login</code>](#Login)  
**Returns**: [<code>ObjectData</code>](#Login..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Login..Data) \| [<code>Array.&lt;Data&gt;</code>](#Login..Data) | data to convert to POJO |

<a name="Login.validate"></a>

### Login.validate(data) ⇒ <code>string</code>
Validates a given login instance

**Kind**: static method of [<code>Login</code>](#Login)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Login..Data) \| [<code>Array.&lt;Data&gt;</code>](#Login..Data) | instance(s) to validate |

<a name="Login..ArrayData"></a>

### Login~ArrayData : <code>Array</code>
[Login](#Login) data in WSv2 array format. Suitable for passing to
[Login](#Login) to construct a model instance.

**Kind**: inner typedef of [<code>Login</code>](#Login)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | id |
| 2 | <code>number</code> | time |
| 4 | <code>string</code> | ip |
| 7 | <code>object</code> | extraData |

<a name="Login..Data"></a>

### Login~Data : [<code>Login</code>](#Login) \| [<code>ObjectData</code>](#Login..ObjectData) \| [<code>ArrayData</code>](#Login..ArrayData)
[Login](#Login) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>Login</code>](#Login)  
<a name="Login..ObjectData"></a>

### Login~ObjectData : <code>object</code>
[Login](#Login) data in plain object format. Suitable for passing to
[Login](#Login) to construct a model instance.

**Kind**: inner typedef of [<code>Login</code>](#Login)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id |
| time | <code>number</code> | timestamp |
| ip | <code>string</code> | client IP address |
| extraData | <code>object</code> | metadata |

<a name="MarginInfo"></a>

## MarginInfo ⇐ [<code>Model</code>](#Model)
Margin Info model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  
**Todo**

- [ ] Extract type defs (varying format)


* [MarginInfo](#MarginInfo) ⇐ [<code>Model</code>](#Model)
    * [new MarginInfo(data)](#new_MarginInfo_new)
    * _instance_
        * [.serialize()](#MarginInfo+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#MarginInfo.unserialize) ⇒ <code>object</code>
        * [.validate(data)](#MarginInfo.validate) ⇒ <code>string</code>

<a name="new_MarginInfo_new"></a>

### new MarginInfo(data)
Create a new instance from a data payload


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| <code>Array.&lt;Array&gt;</code> \| <code>Array</code> | margin info data |

<a name="MarginInfo+serialize"></a>

### marginInfo.serialize() ⇒ <code>Array</code>
Return an array representation of this model

**Kind**: instance method of [<code>MarginInfo</code>](#MarginInfo)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### marginInfo.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>MarginInfo</code>](#MarginInfo)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="MarginInfo.unserialize"></a>

### MarginInfo.unserialize(data) ⇒ <code>object</code>
TODO: Figure out a better object key for 'payload', as we need to support
      both arrays and POJOs

**Kind**: static method of [<code>MarginInfo</code>](#MarginInfo)  
**Returns**: <code>object</code> - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| <code>Array.&lt;Array&gt;</code> \| <code>Array</code> | data to convert to POJO |

<a name="MarginInfo.validate"></a>

### MarginInfo.validate(data) ⇒ <code>string</code>
Validates a given margin info instance

**Kind**: static method of [<code>MarginInfo</code>](#MarginInfo)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| [<code>Array.&lt;MarginInfo&gt;</code>](#MarginInfo) \| [<code>MarginInfo</code>](#MarginInfo) \| <code>Array</code> | instance(s)   to validate |

<a name="Model"></a>

## Model ⇐ <code>events.EventEmitter</code>
Base model class, providing format-conversion methods

**Kind**: global class  
**Extends**: <code>events.EventEmitter</code>  

* [Model](#Model) ⇐ <code>events.EventEmitter</code>
    * [new Model(params)](#new_Model_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(args)](#Model.unserialize) ⇒ <code>object</code>
        * [.validate(args)](#Model.validate) ⇒ <code>Error</code> \| <code>null</code>

<a name="new_Model_new"></a>

### new Model(params)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | model parameters |
| [params.data] | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| <code>Array</code> |  | model data |
| [params.fields] | <code>object</code> | <code>{}</code> | field definitions, { [index]: key } |
| [params.boolFields] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | array of boolean field keys |

<a name="Model+serialize"></a>

### model.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### model.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: <code>object</code> - pojo  
<a name="Model.unserialize"></a>

### Model.unserialize(args) ⇒ <code>object</code>
Generic method for converting either an array, object, or model instance to
a POJO.

**Kind**: static method of [<code>Model</code>](#Model)  
**Returns**: <code>object</code> - pojo  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| args | <code>object</code> |  | arguments |
| args.data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| <code>Array</code> |  | can also be a model instance |
| args.fields | <code>object</code> |  | field definitions, { [index]: key } |
| [args.boolFields] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | array of boolean field keys |

<a name="Model.validate"></a>

### Model.validate(args) ⇒ <code>Error</code> \| <code>null</code>
Validates either a single model instance or a collection of model instances
against a set of validation functions defined per-key.

Returns the first error found.

**Kind**: static method of [<code>Model</code>](#Model)  
**Returns**: <code>Error</code> \| <code>null</code> - error - null if instance is valid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| args | <code>object</code> |  | arguments |
| args.data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| <code>Array</code> |  | model or collection to validate |
| args.fields | <code>object</code> |  | map of fields to array indexes |
| args.validators | <code>object</code> |  | map of field names to validation funcs |
| [args.boolFields] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | array of boolean field keys |

<a name="Movement"></a>

## Movement ⇐ [<code>Model</code>](#Model)
Currency Movement model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [Movement](#Movement) ⇐ [<code>Model</code>](#Model)
    * [new Movement(data)](#new_Movement_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#Movement.unserialize) ⇒ <code>object</code>
        * [.validate(data)](#Movement.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#Movement..ArrayData) : <code>Array</code>
        * [~Data](#Movement..Data) : [<code>Movement</code>](#Movement) \| [<code>ObjectData</code>](#Movement..ObjectData) \| [<code>ArrayData</code>](#Movement..ArrayData)
        * [~ObjectData](#Movement..ObjectData) : <code>object</code>

<a name="new_Movement_new"></a>

### new Movement(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Movement..Data) \| [<code>Array.&lt;Data&gt;</code>](#Movement..Data) | data |

<a name="Model+serialize"></a>

### movement.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Movement</code>](#Movement)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### movement.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Movement</code>](#Movement)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="Movement.unserialize"></a>

### Movement.unserialize(data) ⇒ <code>object</code>
**Kind**: static method of [<code>Movement</code>](#Movement)  
**Returns**: <code>object</code> - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Movement..Data) \| [<code>Array.&lt;Data&gt;</code>](#Movement..Data) | data to convert to POJO |

<a name="Movement.validate"></a>

### Movement.validate(data) ⇒ <code>string</code>
Validates a given movement instance

**Kind**: static method of [<code>Movement</code>](#Movement)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Movement..Data) \| [<code>Array.&lt;Data&gt;</code>](#Movement..Data) | instance(s) to validate |

<a name="Movement..ArrayData"></a>

### Movement~ArrayData : <code>Array</code>
[Movement](#Movement) data in WSv2 array format. Suitable for passing to
[Movement](#Movement) to construct a model instance.

**Kind**: inner typedef of [<code>Movement</code>](#Movement)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | id |
| 1 | <code>string</code> | currency |
| 2 | <code>string</code> | currencyName |
| 5 | <code>number</code> | mtsStarted |
| 6 | <code>number</code> | mtsUpdated |
| 9 | <code>string</code> | status |
| 12 | <code>number</code> | amount |
| 13 | <code>number</code> | fees |
| 16 | <code>string</code> | destinationAddress |
| 20 | <code>number</code> | transactionId |

<a name="Movement..Data"></a>

### Movement~Data : [<code>Movement</code>](#Movement) \| [<code>ObjectData</code>](#Movement..ObjectData) \| [<code>ArrayData</code>](#Movement..ArrayData)
[Movement](#Movement) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>Movement</code>](#Movement)  
<a name="Movement..ObjectData"></a>

### Movement~ObjectData : <code>object</code>
[Movement](#Movement) data in plain object format. Suitable for passing to
[Movement](#Movement) to construct a model instance.

**Kind**: inner typedef of [<code>Movement</code>](#Movement)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id |
| currency | <code>string</code> | currency |
| currencyName | <code>string</code> | currency name |
| mtsStarted | <code>number</code> | movement start timestamp |
| mtsUpdated | <code>number</code> | last update timestamp |
| status | <code>string</code> | status |
| amount | <code>number</code> | moved amount |
| fees | <code>number</code> | paid fees |
| destinationAddress | <code>string</code> | destination address |
| transactionId | <code>number</code> | transaction ID |

<a name="Notification"></a>

## Notification ⇐ [<code>Model</code>](#Model)
Notification model. Broadcast notification body schema may be found at
[BroadcastPayload](#Notification..BroadcastPayload).

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [Notification](#Notification) ⇐ [<code>Model</code>](#Model)
    * [new Notification(data)](#new_Notification_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#Notification.unserialize) ⇒ [<code>ObjectData</code>](#Notification..ObjectData)
        * [.validate(data)](#Notification.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#Notification..ArrayData) : <code>Array</code>
        * [~BroadcastPayload](#Notification..BroadcastPayload) : <code>object</code>
        * [~Data](#Notification..Data) : [<code>Notification</code>](#Notification) \| [<code>ObjectData</code>](#Notification..ObjectData) \| [<code>ArrayData</code>](#Notification..ArrayData)
        * [~ObjectData](#Notification..ObjectData) : <code>object</code>

<a name="new_Notification_new"></a>

### new Notification(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Notification..Data) \| [<code>Array.&lt;Data&gt;</code>](#Notification..Data) | data |

<a name="Model+serialize"></a>

### notification.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Notification</code>](#Notification)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### notification.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Notification</code>](#Notification)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="Notification.unserialize"></a>

### Notification.unserialize(data) ⇒ [<code>ObjectData</code>](#Notification..ObjectData)
**Kind**: static method of [<code>Notification</code>](#Notification)  
**Returns**: [<code>ObjectData</code>](#Notification..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Notification..Data) \| [<code>Array.&lt;Data&gt;</code>](#Notification..Data) | data to convert to POJO |

<a name="Notification.validate"></a>

### Notification.validate(data) ⇒ <code>string</code>
Validates a given notification instance

**Kind**: static method of [<code>Notification</code>](#Notification)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Notification..Data) \| [<code>Array.&lt;Data&gt;</code>](#Notification..Data) | instance(s) to   validate |

<a name="Notification..ArrayData"></a>

### Notification~ArrayData : <code>Array</code>
[Notification](#Notification) data in WSv2 array format. Suitable for passing to
[Notification](#Notification) to construct a model instance.

**Kind**: inner typedef of [<code>Notification</code>](#Notification)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | mts |
| 1 | <code>string</code> | type |
| 2 | <code>number</code> | messageID |
| 4 | <code>object</code> | notifyInfo |
| 5 | <code>number</code> | code |
| 6 | <code>string</code> | status |
| 7 | <code>string</code> | text |

<a name="Notification..BroadcastPayload"></a>

### Notification~BroadcastPayload : <code>object</code>
Body of a broadcast (`ucm-*`) [Notification](#Notification)} which may be sent via
the WSv2 API.

**Kind**: inner typedef of [<code>Notification</code>](#Notification)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [message] | <code>string</code> | message to display |
| [type] | <code>string</code> | notification type, must be prefixed with 'ucm-*'   for broadcasts |
| [level] | <code>string</code> | 'info', 'error', or 'success' |
| [image] | <code>string</code> | link to an image to be shown |
| [link] | <code>string</code> | URL the notification should forward too |
| [sound] | <code>string</code> | URL of sound to play |

<a name="Notification..Data"></a>

### Notification~Data : [<code>Notification</code>](#Notification) \| [<code>ObjectData</code>](#Notification..ObjectData) \| [<code>ArrayData</code>](#Notification..ArrayData)
[Notification](#Notification) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>Notification</code>](#Notification)  
<a name="Notification..ObjectData"></a>

### Notification~ObjectData : <code>object</code>
[Notification](#Notification) data in plain object format. Suitable for passing to
[Notification](#Notification) to construct a model instance.

**Kind**: inner typedef of [<code>Notification</code>](#Notification)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mts | <code>number</code> | timestamp |
| type | <code>string</code> | type (i.e. 'ucm-*' for broadcasts) |
| messageID | <code>number</code> | message ID |
| notifyInfo | <code>object</code> | metadata, set by client for broadcasts |
| code | <code>number</code> | code |
| status | <code>string</code> | status (i.e. 'error') |
| text | <code>string</code> | notification text to display to user |

<a name="OrderBook"></a>

## OrderBook ⇐ <code>events.EventEmitter</code>
High level OB model to automatically integrate WS updates & maintain sort

**Kind**: global class  
**Extends**: <code>events.EventEmitter</code>  

* [OrderBook](#OrderBook) ⇐ <code>events.EventEmitter</code>
    * [new OrderBook(snap, [raw])](#new_OrderBook_new)
    * _instance_
        * [.volBPSMid(bps)](#OrderBook+volBPSMid) ⇒ <code>number</code>
        * [.checksum()](#OrderBook+checksum) ⇒ <code>number</code>
        * [.updateFromSnapshot(snapshot)](#OrderBook+updateFromSnapshot)
        * [.updateWith(entry)](#OrderBook+updateWith) ⇒ <code>boolean</code>
        * [.topBid()](#OrderBook+topBid) ⇒ <code>number</code>
        * [.topBidLevel()](#OrderBook+topBidLevel) ⇒ <code>number</code>
        * [.topAsk()](#OrderBook+topAsk) ⇒ <code>number</code>
        * [.topAskLevel()](#OrderBook+topAskLevel) ⇒ <code>number</code>
        * [.midPrice()](#OrderBook+midPrice) ⇒ <code>number</code>
        * [.spread()](#OrderBook+spread) ⇒ <code>number</code>
        * [.bidAmount()](#OrderBook+bidAmount) ⇒ <code>number</code>
        * [.askAmount()](#OrderBook+askAmount) ⇒ <code>number</code>
        * [.getEntry(price)](#OrderBook+getEntry) ⇒ <code>object</code>
        * [.toJS()](#OrderBook+toJS) ⇒ <code>object</code>
    * _static_
        * [.checksumArr(arr, [raw])](#OrderBook.checksumArr) ⇒ <code>number</code>
        * [.updateArrayOBWith(ob, entry, [raw])](#OrderBook.updateArrayOBWith) ⇒ <code>boolean</code>
        * [.arrayOBMidPrice(ob, [raw])](#OrderBook.arrayOBMidPrice) ⇒ <code>number</code>
        * [.unserialize(arr, [raw])](#OrderBook.unserialize) ⇒ <code>object</code>
    * _inner_
        * [~AggregatedFundingPriceLevel](#OrderBook..AggregatedFundingPriceLevel) : <code>object</code>
        * [~AggregatedPriceLevel](#OrderBook..AggregatedPriceLevel) : <code>object</code>
        * [~ArrayData](#OrderBook..ArrayData) : [<code>Array.&lt;ArrayPriceLevel&gt;</code>](#OrderBook..ArrayPriceLevel)
        * [~ArrayPriceLevel](#OrderBook..ArrayPriceLevel) : <code>Array.&lt;number&gt;</code>
        * [~Data](#OrderBook..Data) : [<code>OrderBook</code>](#OrderBook) \| [<code>ObjectData</code>](#OrderBook..ObjectData) \| [<code>ArrayData</code>](#OrderBook..ArrayData)
        * [~ObjectData](#OrderBook..ObjectData) : [<code>Array.&lt;ObjectPriceLevel&gt;</code>](#OrderBook..ObjectPriceLevel)
        * [~ObjectPriceLevel](#OrderBook..ObjectPriceLevel) : [<code>AggregatedFundingPriceLevel</code>](#OrderBook..AggregatedFundingPriceLevel) \| [<code>AggregatedPriceLevel</code>](#OrderBook..AggregatedPriceLevel) \| [<code>RawFundingPriceLevel</code>](#OrderBook..RawFundingPriceLevel) \| [<code>RawPriceLevel</code>](#OrderBook..RawPriceLevel)
        * [~RawFundingPriceLevel](#OrderBook..RawFundingPriceLevel) : <code>object</code>
        * [~RawPriceLevel](#OrderBook..RawPriceLevel) : <code>object</code>

<a name="new_OrderBook_new"></a>

### new OrderBook(snap, [raw])
Initializes the order book with an existing snapshot (array form)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| snap | [<code>Data</code>](#OrderBook..Data) |  | snapshot |
| [raw] | <code>boolean</code> | <code>false</code> | true for raw 'R0' order books |

<a name="OrderBook+volBPSMid"></a>

### orderBook.volBPSMid(bps) ⇒ <code>number</code>
Returns the total volume at n basis points from the mid price

**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - vol - total volume  

| Param | Type | Description |
| --- | --- | --- |
| bps | <code>number</code> | basis points from mid price |

<a name="OrderBook+checksum"></a>

### orderBook.checksum() ⇒ <code>number</code>
Generates a crc-32 checksum of our current state. The checksum'ed string
itself is a concatenated list of the top 25 bids & asks, alternating.

**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - cs  
**See**: http://blog.bitfinex.com/api/bitfinex-api-order-books-checksums  
<a name="OrderBook+updateFromSnapshot"></a>

### orderBook.updateFromSnapshot(snapshot)
Sets bids/asks to those in the provided snapshot

**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  

| Param | Type | Description |
| --- | --- | --- |
| snapshot | [<code>ArrayData</code>](#OrderBook..ArrayData) | snapshot |

<a name="OrderBook+updateWith"></a>

### orderBook.updateWith(entry) ⇒ <code>boolean</code>
Integrate an update packet (add, update, or remove a price level). Emits an
'update' event on success

**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>boolean</code> - success - false if entry doesn't match OB  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Array</code> | price level to update with |

<a name="OrderBook+topBid"></a>

### orderBook.topBid() ⇒ <code>number</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - topBid - may be null  
<a name="OrderBook+topBidLevel"></a>

### orderBook.topBidLevel() ⇒ <code>number</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - topBidLevel - may be null  
<a name="OrderBook+topAsk"></a>

### orderBook.topAsk() ⇒ <code>number</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - topAsk - may be null  
<a name="OrderBook+topAskLevel"></a>

### orderBook.topAskLevel() ⇒ <code>number</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - topAskLevel - may be null  
<a name="OrderBook+midPrice"></a>

### orderBook.midPrice() ⇒ <code>number</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - price  
<a name="OrderBook+spread"></a>

### orderBook.spread() ⇒ <code>number</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - spread - top bid/ask difference  
<a name="OrderBook+bidAmount"></a>

### orderBook.bidAmount() ⇒ <code>number</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - amount - total buy-side volume  
<a name="OrderBook+askAmount"></a>

### orderBook.askAmount() ⇒ <code>number</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - amount - total sell-side volume  
<a name="OrderBook+getEntry"></a>

### orderBook.getEntry(price) ⇒ <code>object</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>object</code> - entry - unserialized, null if not found  

| Param | Type | Description |
| --- | --- | --- |
| price | <code>number</code> | price level to fetch |

<a name="OrderBook+toJS"></a>

### orderBook.toJS() ⇒ <code>object</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>object</code> - pojo  
<a name="OrderBook.checksumArr"></a>

### OrderBook.checksumArr(arr, [raw]) ⇒ <code>number</code>
Like checksum(), but for raw array-format order books

**Kind**: static method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - cs  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | [<code>ArrayData</code>](#OrderBook..ArrayData) |  | assumed sorted, `[topBid, bid, ...,   topAsk, ask, ...]` |
| [raw] | <code>boolean</code> | <code>false</code> | true for raw 'R0' order books |

<a name="OrderBook.updateArrayOBWith"></a>

### OrderBook.updateArrayOBWith(ob, entry, [raw]) ⇒ <code>boolean</code>
Modifies an array-format OB in place with an update entry. Maintains sort

**Kind**: static method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>boolean</code> - success - false if entry doesn't match OB  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ob | [<code>ArrayData</code>](#OrderBook..ArrayData) |  | array-format order book |
| entry | [<code>ArrayPriceLevel</code>](#OrderBook..ArrayPriceLevel) |  | price level to update with |
| [raw] | <code>boolean</code> | <code>false</code> | true for raw 'R0' order books |

<a name="OrderBook.arrayOBMidPrice"></a>

### OrderBook.arrayOBMidPrice(ob, [raw]) ⇒ <code>number</code>
Finds the mid price of the provided array-format OB

**Kind**: static method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - midPrice - null if book is empty  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ob | [<code>ArrayData</code>](#OrderBook..ArrayData) |  | orderbook |
| [raw] | <code>boolean</code> | <code>false</code> | true for `raw` books |

<a name="OrderBook.unserialize"></a>

### OrderBook.unserialize(arr, [raw]) ⇒ <code>object</code>
Converts an array order book entry or snapshot to an object, with 'price',
'count', and 'amount' keys on entries

**Kind**: static method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>object</code> - ob - either a map w/ bids & asks, or single entry object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | [<code>ArrayData</code>](#OrderBook..ArrayData) \| [<code>ArrayPriceLevel</code>](#OrderBook..ArrayPriceLevel) |  | array format   order book |
| [raw] | <code>boolean</code> | <code>false</code> | true for raw 'R0' order books |

<a name="OrderBook..AggregatedFundingPriceLevel"></a>

### OrderBook~AggregatedFundingPriceLevel : <code>object</code>
An aggregate (non-raw) [OrderBook](#OrderBook) **funding** ticker price level in
object format.

**Kind**: inner typedef of [<code>OrderBook</code>](#OrderBook)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| rate | <code>number</code> | rate |
| period | <code>number</code> | period |
| amount | <code>number</code> | amount |
| count | <code>number</code> | count |

<a name="OrderBook..AggregatedPriceLevel"></a>

### OrderBook~AggregatedPriceLevel : <code>object</code>
An aggregate (non-raw) [OrderBook](#OrderBook) price level in object format.

**Kind**: inner typedef of [<code>OrderBook</code>](#OrderBook)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| price | <code>number</code> | price |
| amount | <code>number</code> | amount |
| count | <code>number</code> | count |

<a name="OrderBook..ArrayData"></a>

### OrderBook~ArrayData : [<code>Array.&lt;ArrayPriceLevel&gt;</code>](#OrderBook..ArrayPriceLevel)
[OrderBook](#OrderBook) data in WSv2 array format. Suitable for passing to
[OrderBook](#OrderBook) to construct a model instance.

**Kind**: inner typedef of [<code>OrderBook</code>](#OrderBook)  
<a name="OrderBook..ArrayPriceLevel"></a>

### OrderBook~ArrayPriceLevel : <code>Array.&lt;number&gt;</code>
A single price level for an [OrderBook](#OrderBook) model, in WSv2 array format.

**Kind**: inner typedef of [<code>OrderBook</code>](#OrderBook)  
<a name="OrderBook..Data"></a>

### OrderBook~Data : [<code>OrderBook</code>](#OrderBook) \| [<code>ObjectData</code>](#OrderBook..ObjectData) \| [<code>ArrayData</code>](#OrderBook..ArrayData)
[OrderBook](#OrderBook) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>OrderBook</code>](#OrderBook)  
<a name="OrderBook..ObjectData"></a>

### OrderBook~ObjectData : [<code>Array.&lt;ObjectPriceLevel&gt;</code>](#OrderBook..ObjectPriceLevel)
[OrderBook](#OrderBook) data as an array of price levels in object format.
Suitable for passing to [OrderBook](#OrderBook) to construct a model instance.

**Kind**: inner typedef of [<code>OrderBook</code>](#OrderBook)  
<a name="OrderBook..ObjectPriceLevel"></a>

### OrderBook~ObjectPriceLevel : [<code>AggregatedFundingPriceLevel</code>](#OrderBook..AggregatedFundingPriceLevel) \| [<code>AggregatedPriceLevel</code>](#OrderBook..AggregatedPriceLevel) \| [<code>RawFundingPriceLevel</code>](#OrderBook..RawFundingPriceLevel) \| [<code>RawPriceLevel</code>](#OrderBook..RawPriceLevel)
A single price level for an [OrderBook](#OrderBook) model, in object format.
Contents vary depending between raw & standard order books, and between
trading & funding tickers.

**Kind**: inner typedef of [<code>OrderBook</code>](#OrderBook)  
<a name="OrderBook..RawFundingPriceLevel"></a>

### OrderBook~RawFundingPriceLevel : <code>object</code>
A raw [OrderBook](#OrderBook) **funding** price level in object format.

**Kind**: inner typedef of [<code>OrderBook</code>](#OrderBook)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| rate | <code>number</code> | rate |
| period | <code>number</code> | period |
| amount | <code>number</code> | amount |
| orderID | <code>number</code> | order ID |

<a name="OrderBook..RawPriceLevel"></a>

### OrderBook~RawPriceLevel : <code>object</code>
A raw [OrderBook](#OrderBook) price level in object format.

**Kind**: inner typedef of [<code>OrderBook</code>](#OrderBook)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| price | <code>number</code> | price |
| amount | <code>number</code> | amount |
| orderID | <code>number</code> | order ID |

<a name="Order"></a>

## Order ⇐ [<code>Model</code>](#Model)
High level order model; provides methods for execution & can stay updated via
a WSv2 connection or used to execute as a rest payload

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [Order](#Order) ⇐ [<code>Model</code>](#Model)
    * [new Order([data], [apiInterface])](#new_Order_new)
    * _instance_
        * [.toString()](#Order+toString) ⇒ <code>string</code>
        * [.isOCO()](#Order+isOCO) ⇒ <code>boolean</code>
        * [.isHidden()](#Order+isHidden) ⇒ <code>boolean</code>
        * [.isPostOnly()](#Order+isPostOnly) ⇒ <code>boolean</code>
        * [.includesVariableRates()](#Order+includesVariableRates) ⇒ <code>boolean</code>
        * [.isPositionClose()](#Order+isPositionClose) ⇒ <code>boolean</code>
        * [.isReduceOnly()](#Order+isReduceOnly) ⇒ <code>boolean</code>
        * [.setOCO(v, [stopPrice], [cidOCO])](#Order+setOCO) ⇒ <code>number</code>
        * [.setHidden(v)](#Order+setHidden) ⇒ <code>number</code>
        * [.setPostOnly(v)](#Order+setPostOnly) ⇒ <code>number</code>
        * [.setNoVariableRates(v)](#Order+setNoVariableRates) ⇒ <code>number</code>
        * [.setPositionClose(v)](#Order+setPositionClose) ⇒ <code>number</code>
        * [.setReduceOnly(v)](#Order+setReduceOnly) ⇒ <code>number</code>
        * [.modifyFlag(flag, active)](#Order+modifyFlag) ⇒ <code>number</code>
        * [.update(changes, [apiInterface])](#Order+update) ⇒ <code>Promise</code>
        * [.toPreview()](#Order+toPreview) ⇒ [<code>Preview</code>](#Order..Preview)
        * [.registerListeners([apiInterface])](#Order+registerListeners)
        * [.removeListeners([apiInterface])](#Order+removeListeners)
        * [.cbGID()](#Order+cbGID) ⇒ <code>string</code>
        * [.submit([apiInterface])](#Order+submit) ⇒ <code>Promise</code>
        * [.cancel([apiInterface])](#Order+cancel) ⇒ <code>Promise</code>
        * [.recreate([apiInterface])](#Order+recreate) ⇒ <code>Promise</code>
        * [.updateFrom(order)](#Order+updateFrom)
        * [.getLastFillAmount()](#Order+getLastFillAmount) ⇒ <code>number</code>
        * [.resetFilledAmount()](#Order+resetFilledAmount)
        * [.getBaseCurrency()](#Order+getBaseCurrency) ⇒ <code>string</code>
        * [.getQuoteCurrency()](#Order+getQuoteCurrency) ⇒ <code>string</code>
        * [.getNotionalValue()](#Order+getNotionalValue) ⇒ <code>number</code>
        * [.isPartiallyFilled()](#Order+isPartiallyFilled) ⇒ <code>boolean</code>
        * [.toNewOrderPacket()](#Order+toNewOrderPacket) ⇒ [<code>SubmitPayload</code>](#Order..SubmitPayload)
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.flags](#Order.flags) : <code>enum</code>
        * [.unserialize(data)](#Order.unserialize) ⇒ [<code>ObjectData</code>](#Order..ObjectData)
        * [.getBaseCurrency(arr)](#Order.getBaseCurrency) ⇒ <code>string</code>
        * [.getQuoteCurrency(arr)](#Order.getQuoteCurrency) ⇒ <code>string</code>
        * [.validate(data)](#Order.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#Order..ArrayData) : <code>Array</code>
        * [~Data](#Order..Data) : [<code>Order</code>](#Order) \| [<code>ObjectData</code>](#Order..ObjectData) \| [<code>ArrayData</code>](#Order..ArrayData)
        * [~ObjectData](#Order..ObjectData) : <code>object</code>
        * [~Preview](#Order..Preview) : <code>object</code>
        * [~SubmitPayload](#Order..SubmitPayload) : <code>object</code>
        * [~Type](#Order..Type) : <code>&#x27;MARKET&#x27;</code> \| <code>&#x27;EXCHANGE MARKET&#x27;</code> \| <code>&#x27;LIMIT&#x27;</code> \| <code>&#x27;EXCHANGE LIMIT&#x27;</code> \| <code>&#x27;STOP&#x27;</code> \| <code>&#x27;EXCHANGE STOP&#x27;</code> \| <code>&#x27;TRAILING STOP&#x27;</code> \| <code>&#x27;EXCHANGE TRAILING STOP&#x27;</code> \| <code>&#x27;FOK&#x27;</code> \| <code>&#x27;EXCHANGE FOK&#x27;</code> \| <code>&#x27;STOP LIMIT&#x27;</code> \| <code>&#x27;EXCHANGE STOP LIMIT&#x27;</code>

<a name="new_Order_new"></a>

### new Order([data], [apiInterface])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | [<code>Data</code>](#Order..Data) | <code>{}</code> | order data |
| [apiInterface] | <code>object</code> |  | saved for a later call to   `registerListeners()`` |

**Example**  
```js
const debug = require('debug')('bfx:api:models:examples:order')
const { Order } = require('../')
const o = new Order({
  type: Order.type.EXCHANGE_LIMIT,
  symbol: 'tBTCUSD',
  amount: 0.05,
  price: 10000,
  hidden: true
})

debug('generated ws2 compatible new order packet:')
debug(JSON.stringify(o.toNewOrderPacket(), null, 2))
```
<a name="Order+toString"></a>

### order.toString() ⇒ <code>string</code>
Returns a string representation of the order

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - str  
**Todo**

- [ ] add verbose option to log all order information (TIF, etc)

<a name="Order+isOCO"></a>

### order.isOCO() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>boolean</code> - oco  
<a name="Order+isHidden"></a>

### order.isHidden() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>boolean</code> - hidden  
<a name="Order+isPostOnly"></a>

### order.isPostOnly() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>boolean</code> - postonly  
<a name="Order+includesVariableRates"></a>

### order.includesVariableRates() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>boolean</code> - includesVR  
<a name="Order+isPositionClose"></a>

### order.isPositionClose() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>boolean</code> - posclose  
<a name="Order+isReduceOnly"></a>

### order.isReduceOnly() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>boolean</code> - reduceonly  
<a name="Order+setOCO"></a>

### order.setOCO(v, [stopPrice], [cidOCO]) ⇒ <code>number</code>
Set the OCO flag and optionally update the stop price and OCO client ID.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>number</code> - finalFlags  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>boolean</code> | flag value |
| [stopPrice] | <code>number</code> | optional, defaults to current value |
| [cidOCO] | <code>number</code> | optional, defaults to current value |

<a name="Order+setHidden"></a>

### order.setHidden(v) ⇒ <code>number</code>
Update the hidden flag value. If hidden and the order is inserted into
the order book, it will not be shown to other users or available via the
API.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>number</code> - finalFlags  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>boolean</code> | flag value |

<a name="Order+setPostOnly"></a>

### order.setPostOnly(v) ⇒ <code>number</code>
Update the post-only flag value. If post-only and the order would
immediately fill, the order is automatically cancelled.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>number</code> - finalFlags  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>boolean</code> | flag value |

<a name="Order+setNoVariableRates"></a>

### order.setNoVariableRates(v) ⇒ <code>number</code>
Update the no-variable-rates flag value. Limits orders on margin from
taking funding with variable rates.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>number</code> - finalFlags  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>boolean</code> | flag value |

<a name="Order+setPositionClose"></a>

### order.setPositionClose(v) ⇒ <code>number</code>
Update the position-close flag value. If set, the order is cancelled if it
would not close an open position.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>number</code> - finalFlags  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>boolean</code> | flag value |

<a name="Order+setReduceOnly"></a>

### order.setReduceOnly(v) ⇒ <code>number</code>
Update the reduce-only flag. If set and the order would open a new
position, or increase the size of an existing position, it is
automatically cancelled.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>number</code> - finalFlags  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>boolean</code> | flag value |

<a name="Order+modifyFlag"></a>

### order.modifyFlag(flag, active) ⇒ <code>number</code>
Updates a specific flag

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>number</code> - finalFlags  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | flag value |
| active | <code>boolean</code> | active status |

<a name="Order+update"></a>

### order.update(changes, [apiInterface]) ⇒ <code>Promise</code>
Send an order update packet to the WS server, and update local state. This
updates the order atomically without changing its position in the queue for
its price level.

Rejects with an error if an attempt is made to apply a delta to a missing
amount.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>Promise</code> - p - resolves on ws2 confirmation or rest response  

| Param | Type | Description |
| --- | --- | --- |
| changes | <code>object</code> | changeset to apply to this order |
| [apiInterface] | <code>bitfinex-api-node.WSv2</code> \| <code>bfx-api-node-rest.RESTv2</code> | optional ws or rest, defaults to internal instance |

**Example**  
```js
const ws = new WSv2({ ... })

await ws.open()
await ws.auth()

const o = new Order({ ... }, ws)

await o.submit()
await o.update({ price: '2.0' }) // update price
await o.update({ delta: '18.0' }) // update amount with delta

console.log(o.toString()))  // inspect order
```
<a name="Order+toPreview"></a>

### order.toPreview() ⇒ [<code>Preview</code>](#Order..Preview)
Returns a POJO that can be used as a preview order in Honey Framework
algorithmic orders.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: [<code>Preview</code>](#Order..Preview) - preview  
<a name="Order+registerListeners"></a>

### order.registerListeners([apiInterface])
Registers for updates/persistence on the specified ws2 instance.

**Kind**: instance method of [<code>Order</code>](#Order)  

| Param | Type | Description |
| --- | --- | --- |
| [apiInterface] | <code>object</code> | optional, defaults to internal ws |

<a name="Order+removeListeners"></a>

### order.removeListeners([apiInterface])
Removes update listeners from the specified ws2 instance.
Will fail if rest interface is provided.

**Kind**: instance method of [<code>Order</code>](#Order)  

| Param | Type | Description |
| --- | --- | --- |
| [apiInterface] | <code>bitfinex-api-node.WSv2</code> \| <code>bfx-api-node-rest.RESTv2</code> | optional ws defaults to internal ws |

<a name="Order+cbGID"></a>

### order.cbGID() ⇒ <code>string</code>
Return the callback group ID for the order, used to bind listeners on
an API interface.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - cbGID  
<a name="Order+submit"></a>

### order.submit([apiInterface]) ⇒ <code>Promise</code>
Submit the order

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| [apiInterface] | <code>bitfinex-api-node.WSv2</code> \| <code>bfx-api-node-rest.RESTv2</code> | defaults to internal ws |

<a name="Order+cancel"></a>

### order.cancel([apiInterface]) ⇒ <code>Promise</code>
Cancel the order if open

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| [apiInterface] | <code>bitfinex-api-node.WSv2</code> \| <code>bfx-api-node-rest.RESTv2</code> | defaults to internal ws |

<a name="Order+recreate"></a>

### order.recreate([apiInterface]) ⇒ <code>Promise</code>
Equivalent to calling cancel() followed by submit()

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| [apiInterface] | <code>bitfinex-api-node.WSv2</code> \| <code>bfx-api-node-rest.RESTv2</code> | defaults to internal ws |

<a name="Order+updateFrom"></a>

### order.updateFrom(order)
Updates order information from the provided order.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Throws**:

- <code>Error</code> fails if the order ID/CID/GID do not match


| Param | Type | Description |
| --- | --- | --- |
| order | [<code>Order</code>](#Order) | order to update from |

<a name="Order+getLastFillAmount"></a>

### order.getLastFillAmount() ⇒ <code>number</code>
Query the amount that was filled on the last order update

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>number</code> - amount  
<a name="Order+resetFilledAmount"></a>

### order.resetFilledAmount()
Resets the last amount, so getLastFillAmount() returns 0

**Kind**: instance method of [<code>Order</code>](#Order)  
**See**

- [Order~getLastFillAmount](Order~getLastFillAmount)
- [Order~isPartiallyFilled](Order~isPartiallyFilled)

<a name="Order+getBaseCurrency"></a>

### order.getBaseCurrency() ⇒ <code>string</code>
Returns the base currency of the order.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - currency  
<a name="Order+getQuoteCurrency"></a>

### order.getQuoteCurrency() ⇒ <code>string</code>
Returns the quote currency of the order.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - currency  
<a name="Order+getNotionalValue"></a>

### order.getNotionalValue() ⇒ <code>number</code>
Returns the notional value of the order

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>number</code> - value  
<a name="Order+isPartiallyFilled"></a>

### order.isPartiallyFilled() ⇒ <code>boolean</code>
Indicates if the order is partially filled, based on the original and
current amounts.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>boolean</code> - isPartiallyFilled  
**See**: modules:bfx-api-node-models.Order~resetFilledAmount  
<a name="Order+toNewOrderPacket"></a>

### order.toNewOrderPacket() ⇒ [<code>SubmitPayload</code>](#Order..SubmitPayload)
Creates an order map that can be passed to the `on` command.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: [<code>SubmitPayload</code>](#Order..SubmitPayload) - o  
**Example**  
```js
const ws = new WSv2({ apiKey: '...', apiSecret: '...' })
await ws.open()
await ws.auth()

const o = new Order({
  type: 'MARKET'
  symbol: 'tLEOUSD',
  amount: -6,
})

ws.send([0, 'on', null, o.toNewOrderPacket()])
```
<a name="Model+serialize"></a>

### order.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Order</code>](#Order)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### order.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Order</code>](#Order)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="Order.flags"></a>

### Order.flags : <code>enum</code>
Valid order flag values

**Kind**: static enum of [<code>Order</code>](#Order)  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| OCO | <code>number</code> | <code></code> | Order cancels order (16384). Requires `priceAuxLimit` and `cidOCO` to be set, resolved to `price_oco_stop` and `cid_oco` on the generated `on` packet. |
| POSTONLY | <code>number</code> | <code></code> | Post-only (4096) orders are cancelled if they would execute immediately |
| HIDDEN | <code>number</code> | <code></code> | Hidden (64) orders are inserted into the book, not visible to other traders, and always pay the **taker** fee. |
| NO_VR | <code>number</code> | <code></code> | Excludes variable rate (524288) funding |
| POS_CLOSE | <code>number</code> | <code></code> | Position-close (512) orders are cancelled if they would not close an open position. |
| REDUCE_ONLY | <code>number</code> | <code></code> | Reduce-only (1024) orders are cancelled if they would open or increase the size of an existing position. |

<a name="Order.unserialize"></a>

### Order.unserialize(data) ⇒ [<code>ObjectData</code>](#Order..ObjectData)
**Kind**: static method of [<code>Order</code>](#Order)  
**Returns**: [<code>ObjectData</code>](#Order..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Order..Data) \| [<code>Array.&lt;Data&gt;</code>](#Order..Data) | data to convert to POJO |

<a name="Order.getBaseCurrency"></a>

### Order.getBaseCurrency(arr) ⇒ <code>string</code>
Get the base currency for an order in WSv2 array format.

**Kind**: static method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - currency - base currency from symbol  

| Param | Type | Description |
| --- | --- | --- |
| arr | [<code>ArrayData</code>](#Order..ArrayData) | order in ws2 array format |

<a name="Order.getQuoteCurrency"></a>

### Order.getQuoteCurrency(arr) ⇒ <code>string</code>
Get the quote currency for an order in WSv2 array format.

**Kind**: static method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - currency - quote currency from symbol  

| Param | Type | Description |
| --- | --- | --- |
| arr | [<code>ArrayData</code>](#Order..ArrayData) | order in ws2 array format |

<a name="Order.validate"></a>

### Order.validate(data) ⇒ <code>string</code>
Validates a given order instance

**Kind**: static method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Order..Data) \| [<code>Array.&lt;Data&gt;</code>](#Order..Data) | instance(s) to validate |

<a name="Order..ArrayData"></a>

### Order~ArrayData : <code>Array</code>
[Order](#Order) data in WSv2 array format. Suitable for passing to
[Order](#Order) to construct a model instance.

**Kind**: inner typedef of [<code>Order</code>](#Order)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | id |
| 1 | <code>number</code> | gid |
| 2 | <code>number</code> | cid |
| 3 | <code>string</code> | symbol |
| 4 | <code>number</code> | mtsCreate |
| 5 | <code>number</code> | mtsUpdate |
| 6 | <code>number</code> | amount |
| 7 | <code>number</code> | amountOrig |
| 8 | [<code>Type</code>](#Order..Type) | type |
| 9 | [<code>Type</code>](#Order..Type) | typePrev |
| 10 | <code>number</code> | mtsTIF |
| 12 | <code>number</code> | flags |
| 13 | <code>string</code> | status |
| 16 | <code>number</code> | price |
| 17 | <code>number</code> | priceAvg |
| 18 | <code>number</code> | priceTrailing |
| 19 | <code>number</code> | priceAuxLimit |
| 23 | <code>number</code> | notify |
| 24 | <code>number</code> | hidden |
| 25 | <code>number</code> | placedId |
| 28 | <code>string</code> | routing |
| 31 | <code>object</code> | meta |

<a name="Order..Data"></a>

### Order~Data : [<code>Order</code>](#Order) \| [<code>ObjectData</code>](#Order..ObjectData) \| [<code>ArrayData</code>](#Order..ArrayData)
[Order](#Order) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>Order</code>](#Order)  
<a name="Order..ObjectData"></a>

### Order~ObjectData : <code>object</code>
[Order](#Order) data in plain object format. Suitable for passing to
[Order](#Order) to construct a model instance.

**Kind**: inner typedef of [<code>Order</code>](#Order)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | ID |
| [gid] | <code>number</code> | group ID |
| [cid] | <code>number</code> | client ID |
| symbol | <code>string</code> | symbol |
| [mtsCreate] | <code>number</code> | creation timestamp |
| [mtsUpdate] | <code>number</code> | last update timestamp |
| amount | <code>string</code> | remaining order amount |
| [amountOrig] | <code>string</code> | original/initial order amount |
| [type] | [<code>Type</code>](#Order..Type) | order type |
| [typePrev] | [<code>Type</code>](#Order..Type) | previous type |
| [mtsTIF] | <code>number</code> | TIF timestamp, if set |
| [flags] | <code>number</code> | order flags |
| [status] | <code>string</code> | current order status |
| price | <code>string</code> | order price |
| [priceAvg] | <code>string</code> | average execution price |
| [priceTrailing] | <code>string</code> | trailing distance for TRAILING STOP orders |
| [priceAuxLimit] | <code>string</code> | stop price for STOP LIMIT and OCO orders |
| [notify] | <code>number</code> \| <code>boolean</code> | notify flag |
| [placedId] | <code>number</code> | placed ID |
| [affiliateCode] | <code>string</code> | affiliate code |
| [lev] | <code>number</code> | leverage |

<a name="Order..Preview"></a>

### Order~Preview : <code>object</code>
Preview of an [Order](#Order) for display in an UI, prior to submission

**Kind**: inner typedef of [<code>Order</code>](#Order)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| gid | <code>number</code> | group id |
| cid | <code>number</code> | client ID |
| symbol | <code>string</code> | symbol |
| amount | <code>number</code> | amount |
| type | [<code>Type</code>](#Order..Type) | type |
| [price] | <code>number</code> | price, optional for `MARKET` orders |
| notify | <code>number</code> | notify flag |
| flags | <code>number</code> | flags |
| [lev] | <code>number</code> | leverage |

<a name="Order..SubmitPayload"></a>

### Order~SubmitPayload : <code>object</code>
A set of parameters describing an atomic order that can be sent via the WSv2
API to submit it.

**Kind**: inner typedef of [<code>Order</code>](#Order)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [gid] | <code>number</code> |  | group ID |
| [cid] | <code>number</code> |  | client ID |
| symbol | <code>string</code> |  | symbol |
| type | [<code>Type</code>](#Order..Type) |  | type |
| amount | <code>number</code> |  | amount |
| [price] | <code>number</code> |  | optional for `MARKET` orders |
| [price_trailing] | <code>number</code> |  | required for `TRAILING STOP` orders |
| [price_aux_limit] | <code>number</code> |  | required for `STOP LIMIT` and `OCO`   orders |
| [price_oco_stop] | <code>number</code> |  | required for `OCO` orders |
| [cid_oco] | <code>number</code> |  | required for `OCO` orders |
| [lev] | <code>number</code> |  | leverage |
| [flags] | <code>number</code> | <code>0</code> | flags |
| [meta] | <code>object</code> | <code>{}</code> | metadata |
| [meta.aff_code] | <code>string</code> |  | affiliate code |
| [tif] | <code>number</code> |  | time in force |

<a name="Order..Type"></a>

### Order~Type : <code>&#x27;MARKET&#x27;</code> \| <code>&#x27;EXCHANGE MARKET&#x27;</code> \| <code>&#x27;LIMIT&#x27;</code> \| <code>&#x27;EXCHANGE LIMIT&#x27;</code> \| <code>&#x27;STOP&#x27;</code> \| <code>&#x27;EXCHANGE STOP&#x27;</code> \| <code>&#x27;TRAILING STOP&#x27;</code> \| <code>&#x27;EXCHANGE TRAILING STOP&#x27;</code> \| <code>&#x27;FOK&#x27;</code> \| <code>&#x27;EXCHANGE FOK&#x27;</code> \| <code>&#x27;STOP LIMIT&#x27;</code> \| <code>&#x27;EXCHANGE STOP LIMIT&#x27;</code>
Valid atomic order types, see the [Order](#Order) model.

**Kind**: inner typedef of [<code>Order</code>](#Order)  
<a name="Position"></a>

## Position ⇐ [<code>Model</code>](#Model)
Position model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [Position](#Position) ⇐ [<code>Model</code>](#Model)
    * [new Position(data, [apiInterface])](#new_Position_new)
    * _instance_
        * [.claim([apiInterface])](#Position+claim) ⇒ <code>Promise</code>
        * [.close([apiInterface])](#Position+close) ⇒ <code>Promise</code>
        * [.orderToClose([apiInterface])](#Position+orderToClose) ⇒ <code>Promise</code>
        * [.toString()](#Position+toString) ⇒ <code>string</code>
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#Position.unserialize) ⇒ [<code>ObjectData</code>](#Position..ObjectData)
        * [.validate(data)](#Position.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#Position..ArrayData) : <code>Array</code>
        * [~Data](#Position..Data) : [<code>Position</code>](#Position) \| [<code>ObjectData</code>](#Position..ObjectData) \| [<code>ArrayData</code>](#Position..ArrayData)
        * [~ObjectData](#Position..ObjectData) : <code>object</code>

<a name="new_Position_new"></a>

### new Position(data, [apiInterface])

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Position..Data) \| [<code>Array.&lt;Data&gt;</code>](#Position..Data) | data |
| [apiInterface] | <code>bitfinex-api-node.WSv2</code> \| <code>bfx-api-node-rest.RESTv2</code> | rest or websocket object that's capable of submitting   position changes |

<a name="Position+claim"></a>

### position.claim([apiInterface]) ⇒ <code>Promise</code>
Claim the position

**Kind**: instance method of [<code>Position</code>](#Position)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| [apiInterface] | <code>bfx-api-node-rest.RESTv2</code> | api |

<a name="Position+close"></a>

### position.close([apiInterface]) ⇒ <code>Promise</code>
Close the position

**Kind**: instance method of [<code>Position</code>](#Position)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| [apiInterface] | <code>bfx-api-node-rest.RESTv2</code> | api |

<a name="Position+orderToClose"></a>

### position.orderToClose([apiInterface]) ⇒ <code>Promise</code>
Generate an order that can be used to close the position.

**Kind**: instance method of [<code>Position</code>](#Position)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| [apiInterface] | <code>bitfinex-api-node.WSv2</code> \| <code>bfx-api-node-rest.RESTv2</code> | provided to returned `Order` instance |

<a name="Position+toString"></a>

### position.toString() ⇒ <code>string</code>
Returns a string representation of the position.

**Kind**: instance method of [<code>Position</code>](#Position)  
**Returns**: <code>string</code> - str  
<a name="Model+serialize"></a>

### position.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Position</code>](#Position)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### position.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Position</code>](#Position)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="Position.unserialize"></a>

### Position.unserialize(data) ⇒ [<code>ObjectData</code>](#Position..ObjectData)
**Kind**: static method of [<code>Position</code>](#Position)  
**Returns**: [<code>ObjectData</code>](#Position..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Position..Data) \| [<code>Array.&lt;Data&gt;</code>](#Position..Data) | data to convert to POJO |

<a name="Position.validate"></a>

### Position.validate(data) ⇒ <code>string</code>
Validates a given position instance

**Kind**: static method of [<code>Position</code>](#Position)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Position..Data) \| [<code>Array.&lt;Data&gt;</code>](#Position..Data) | instance(s) to validate |

<a name="Position..ArrayData"></a>

### Position~ArrayData : <code>Array</code>
[Position](#Position) data in WSv2 array format. Suitable for passing to
[Position](#Position) to construct a model instance.

**Kind**: inner typedef of [<code>Position</code>](#Position)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | symbol |
| 1 | <code>string</code> | status |
| 2 | <code>number</code> | amount |
| 3 | <code>string</code> | basePrice |
| 4 | <code>string</code> | marginFunding |
| 5 | <code>string</code> | marginFundingType |
| 6 | <code>string</code> | pl |
| 7 | <code>string</code> | plPerc |
| 8 | <code>string</code> | liquidationPrice |
| 9 | <code>number</code> | leverage |
| 11 | <code>number</code> | id |
| 12 | <code>number</code> | mtsCreate |
| 13 | <code>number</code> | mtsUpdate |
| 15 | <code>string</code> | type |
| 17 | <code>number</code> | collateral |
| 18 | <code>number</code> | collateralMin |
| 19 | <code>object</code> | meta |

<a name="Position..Data"></a>

### Position~Data : [<code>Position</code>](#Position) \| [<code>ObjectData</code>](#Position..ObjectData) \| [<code>ArrayData</code>](#Position..ArrayData)
[Position](#Position) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>Position</code>](#Position)  
<a name="Position..ObjectData"></a>

### Position~ObjectData : <code>object</code>
[Position](#Position) data in plain object format. Suitable for passing to
[Position](#Position) to construct a model instance.

**Kind**: inner typedef of [<code>Position</code>](#Position)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id |
| mtsCreate | <code>number</code> | creation timestamp |
| mtsUpdate | <code>number</code> | last update timestamp |
| symbol | <code>string</code> | symbol |
| status | <code>string</code> | status |
| type | <code>string</code> | type |
| amount | <code>string</code> | amount |
| basePrice | <code>string</code> | base price |
| marginFunding | <code>string</code> | margin funding |
| marginFundingType | <code>string</code> | margin funding type |
| pl | <code>string</code> | profit/loss |
| plPerc | <code>string</code> | profit/loss as percentage |
| liquidationPrice | <code>string</code> | liquidation price |
| leverage | <code>number</code> | leverage |
| collateral | <code>number</code> | collateral |
| collateralMin | <code>number</code> | minimum collateral to maintain position |
| meta | <code>object</code> | metadata |

<a name="PublicPulseProfile"></a>

## PublicPulseProfile ⇐ [<code>Model</code>](#Model)
Public PulseProfile model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [PublicPulseProfile](#PublicPulseProfile) ⇐ [<code>Model</code>](#Model)
    * [new PublicPulseProfile(data)](#new_PublicPulseProfile_new)
    * _instance_
        * [.toString()](#PublicPulseProfile+toString) ⇒ <code>string</code>
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#PublicPulseProfile.unserialize) ⇒ [<code>ObjectData</code>](#PublicPulseProfile..ObjectData)
        * [.validate(data)](#PublicPulseProfile.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#PublicPulseProfile..ArrayData) : <code>Array</code>
        * [~Data](#PublicPulseProfile..Data) : [<code>PublicPulseProfile</code>](#PublicPulseProfile) \| [<code>ObjectData</code>](#PublicPulseProfile..ObjectData) \| [<code>ArrayData</code>](#PublicPulseProfile..ArrayData)
        * [~ObjectData](#PublicPulseProfile..ObjectData) : <code>object</code>

<a name="new_PublicPulseProfile_new"></a>

### new PublicPulseProfile(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#PublicPulseProfile..Data) \| [<code>Array.&lt;Data&gt;</code>](#PublicPulseProfile..Data) | data |

<a name="PublicPulseProfile+toString"></a>

### publicPulseProfile.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>PublicPulseProfile</code>](#PublicPulseProfile)  
**Returns**: <code>string</code> - str  
<a name="Model+serialize"></a>

### publicPulseProfile.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>PublicPulseProfile</code>](#PublicPulseProfile)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### publicPulseProfile.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>PublicPulseProfile</code>](#PublicPulseProfile)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="PublicPulseProfile.unserialize"></a>

### PublicPulseProfile.unserialize(data) ⇒ [<code>ObjectData</code>](#PublicPulseProfile..ObjectData)
**Kind**: static method of [<code>PublicPulseProfile</code>](#PublicPulseProfile)  
**Returns**: [<code>ObjectData</code>](#PublicPulseProfile..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#PublicPulseProfile..Data) \| [<code>Array.&lt;Data&gt;</code>](#PublicPulseProfile..Data) | data to   convert to POJO |

<a name="PublicPulseProfile.validate"></a>

### PublicPulseProfile.validate(data) ⇒ <code>string</code>
Validates a given public pulse profile instance

**Kind**: static method of [<code>PublicPulseProfile</code>](#PublicPulseProfile)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#PublicPulseProfile..Data) \| [<code>Array.&lt;Data&gt;</code>](#PublicPulseProfile..Data) | models   to validate |

<a name="PublicPulseProfile..ArrayData"></a>

### PublicPulseProfile~ArrayData : <code>Array</code>
[PublicPulseProfile](#PublicPulseProfile) data in WSv2 array format. Suitable for passing
to [PublicPulseProfile](#PublicPulseProfile) instance.

**Kind**: inner typedef of [<code>PublicPulseProfile</code>](#PublicPulseProfile)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | id |
| 1 | <code>number</code> | mtsCreate |
| 3 | <code>string</code> | nickname |
| 5 | <code>string</code> | picture |
| 6 | <code>string</code> | text |
| 9 | <code>string</code> | twitterHandle |

<a name="PublicPulseProfile..Data"></a>

### PublicPulseProfile~Data : [<code>PublicPulseProfile</code>](#PublicPulseProfile) \| [<code>ObjectData</code>](#PublicPulseProfile..ObjectData) \| [<code>ArrayData</code>](#PublicPulseProfile..ArrayData)
[PublicPulseProfile](#PublicPulseProfile) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>PublicPulseProfile</code>](#PublicPulseProfile)  
<a name="PublicPulseProfile..ObjectData"></a>

### PublicPulseProfile~ObjectData : <code>object</code>
[PublicPulseProfile](#PublicPulseProfile) data in plain object format. Suitable for passing
to [PublicPulseProfile](#PublicPulseProfile) to construct a model instance.

**Kind**: inner typedef of [<code>PublicPulseProfile</code>](#PublicPulseProfile)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | pulse User ID |
| mtsCreate | <code>number</code> | creation timestamp |
| nickname | <code>string</code> | profile nickname |
| picture | <code>string</code> | profile picture |
| text | <code>string</code> | profile bio |
| twitterHandle | <code>string</code> | profile twitter handle |

<a name="PublicTrade"></a>

## PublicTrade ⇐ [<code>Model</code>](#Model)
Public Trade model, supporting both funding & ordinary trades

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  
**Todo**

- [ ] Extract type defs (varying format)


* [PublicTrade](#PublicTrade) ⇐ [<code>Model</code>](#Model)
    * [new PublicTrade(data)](#new_PublicTrade_new)
    * _instance_
        * [.toString()](#PublicTrade+toString) ⇒ <code>string</code>
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#PublicTrade.unserialize) ⇒ <code>object</code>
        * [.validate(data)](#PublicTrade.validate) ⇒ <code>string</code>

<a name="new_PublicTrade_new"></a>

### new PublicTrade(data)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> \| <code>Array</code> | public trade data |

<a name="PublicTrade+toString"></a>

### publicTrade.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>PublicTrade</code>](#PublicTrade)  
**Returns**: <code>string</code> - str  
<a name="Model+serialize"></a>

### publicTrade.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>PublicTrade</code>](#PublicTrade)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### publicTrade.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>PublicTrade</code>](#PublicTrade)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="PublicTrade.unserialize"></a>

### PublicTrade.unserialize(data) ⇒ <code>object</code>
**Kind**: static method of [<code>PublicTrade</code>](#PublicTrade)  
**Returns**: <code>object</code> - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| <code>Array.&lt;Array&gt;</code> \| <code>Array</code> | data to convert to POJO |

<a name="PublicTrade.validate"></a>

### PublicTrade.validate(data) ⇒ <code>string</code>
Validates a given public trade instance

**Kind**: static method of [<code>PublicTrade</code>](#PublicTrade)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| [<code>Array.&lt;PublicTrade&gt;</code>](#PublicTrade) \| [<code>PublicTrade</code>](#PublicTrade) \| <code>Array</code> | models to   validate |

<a name="PulseMessage"></a>

## PulseMessage ⇐ [<code>Model</code>](#Model)
Private PulseMessage model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [PulseMessage](#PulseMessage) ⇐ [<code>Model</code>](#Model)
    * [new PulseMessage(data)](#new_PulseMessage_new)
    * _instance_
        * [.serialize()](#PulseMessage+serialize) ⇒ <code>Array</code>
        * [.toString()](#PulseMessage+toString) ⇒ <code>string</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#PulseMessage.unserialize) ⇒ [<code>ObjectData</code>](#PulseMessage..ObjectData)
        * [.validate(data)](#PulseMessage.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#PulseMessage..ArrayData) : <code>Array</code>
        * [~Data](#PulseMessage..Data) : [<code>PulseMessage</code>](#PulseMessage) \| [<code>ObjectData</code>](#PulseMessage..ObjectData) \| [<code>ArrayData</code>](#PulseMessage..ArrayData)
        * [~ObjectData](#PulseMessage..ObjectData) : <code>object</code>

<a name="new_PulseMessage_new"></a>

### new PulseMessage(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#PulseMessage..Data) \| [<code>Array.&lt;Data&gt;</code>](#PulseMessage..Data) | data |

<a name="PulseMessage+serialize"></a>

### pulseMessage.serialize() ⇒ <code>Array</code>
Return an array representation of this model

**Kind**: instance method of [<code>PulseMessage</code>](#PulseMessage)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="PulseMessage+toString"></a>

### pulseMessage.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>PulseMessage</code>](#PulseMessage)  
**Returns**: <code>string</code> - str  
<a name="Model+toJS"></a>

### pulseMessage.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>PulseMessage</code>](#PulseMessage)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="PulseMessage.unserialize"></a>

### PulseMessage.unserialize(data) ⇒ [<code>ObjectData</code>](#PulseMessage..ObjectData)
**Kind**: static method of [<code>PulseMessage</code>](#PulseMessage)  
**Returns**: [<code>ObjectData</code>](#PulseMessage..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#PulseMessage..Data) \| [<code>Array.&lt;Data&gt;</code>](#PulseMessage..Data) | data to convert |

<a name="PulseMessage.validate"></a>

### PulseMessage.validate(data) ⇒ <code>string</code>
Validates a given public pulse profile instance

**Kind**: static method of [<code>PulseMessage</code>](#PulseMessage)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#PulseMessage..Data) \| [<code>Array.&lt;Data&gt;</code>](#PulseMessage..Data) | instance(s) to   validate |

<a name="PulseMessage..ArrayData"></a>

### PulseMessage~ArrayData : <code>Array</code>
[PulseMessage](#PulseMessage) data in WSv2 array format. Suitable for passing to
[PulseMessage](#PulseMessage) to construct a model instance.

**Kind**: inner typedef of [<code>PulseMessage</code>](#PulseMessage)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | id |
| 1 | <code>number</code> | mts |
| 3 | <code>string</code> | userID |
| 5 | <code>string</code> | title |
| 6 | <code>string</code> | content |
| 9 | <code>number</code> | isPin |
| 10 | <code>number</code> | isPublic |
| 12 | <code>string</code> | tags |
| 13 | <code>string</code> | attachments |
| 15 | <code>number</code> | likes |
| 16 | <code>number</code> | userLiked |

<a name="PulseMessage..Data"></a>

### PulseMessage~Data : [<code>PulseMessage</code>](#PulseMessage) \| [<code>ObjectData</code>](#PulseMessage..ObjectData) \| [<code>ArrayData</code>](#PulseMessage..ArrayData)
[PulseMessage](#PulseMessage) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>PulseMessage</code>](#PulseMessage)  
<a name="PulseMessage..ObjectData"></a>

### PulseMessage~ObjectData : <code>object</code>
[PulseMessage](#PulseMessage) data in plain object format. Suitable for passing to
[PulseMessage](#PulseMessage) to construct a model instance.

**Kind**: inner typedef of [<code>PulseMessage</code>](#PulseMessage)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | pulse message ID |
| mts | <code>number</code> | millisecond timestamp |
| userID | <code>string</code> | pulse User ID |
| title | <code>string</code> | title of the pulse message |
| content | <code>string</code> | content of the pulse message |
| isPin | <code>number</code> | 1 if the message is pinned, 0 if it is not pinned |
| isPublic | <code>number</code> | 1 if the message is public, 0 if it is not   public |
| tags | <code>string</code> | tags used in the message |
| attachments | <code>string</code> | attachments used in the message |
| likes | <code>number</code> | number of likes |
| userLiked | <code>number</code> | flag to show if the private user liked the   pulse |

<a name="StatusMessagesDeriv"></a>

## StatusMessagesDeriv ⇐ [<code>Model</code>](#Model)
Derivatives Status Message model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [StatusMessagesDeriv](#StatusMessagesDeriv) ⇐ [<code>Model</code>](#Model)
    * [new StatusMessagesDeriv(data)](#new_StatusMessagesDeriv_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#StatusMessagesDeriv.unserialize) ⇒ [<code>ObjectData</code>](#StatusMessagesDeriv..ObjectData)
        * [.validate(data)](#StatusMessagesDeriv.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#StatusMessagesDeriv..ArrayData) : <code>Array</code>
        * [~Data](#StatusMessagesDeriv..Data) : [<code>StatusMessagesDeriv</code>](#StatusMessagesDeriv) \| [<code>ObjectData</code>](#StatusMessagesDeriv..ObjectData) \| [<code>ArrayData</code>](#StatusMessagesDeriv..ArrayData)
        * [~ObjectData](#StatusMessagesDeriv..ObjectData) : <code>object</code>

<a name="new_StatusMessagesDeriv_new"></a>

### new StatusMessagesDeriv(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#StatusMessagesDeriv..Data) \| [<code>Array.&lt;Data&gt;</code>](#StatusMessagesDeriv..Data) | data |

<a name="Model+serialize"></a>

### statusMessagesDeriv.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>StatusMessagesDeriv</code>](#StatusMessagesDeriv)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### statusMessagesDeriv.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>StatusMessagesDeriv</code>](#StatusMessagesDeriv)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="StatusMessagesDeriv.unserialize"></a>

### StatusMessagesDeriv.unserialize(data) ⇒ [<code>ObjectData</code>](#StatusMessagesDeriv..ObjectData)
**Kind**: static method of [<code>StatusMessagesDeriv</code>](#StatusMessagesDeriv)  
**Returns**: [<code>ObjectData</code>](#StatusMessagesDeriv..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#StatusMessagesDeriv..Data) \| [<code>Array.&lt;Data&gt;</code>](#StatusMessagesDeriv..Data) | data   to convert to POJO |

<a name="StatusMessagesDeriv.validate"></a>

### StatusMessagesDeriv.validate(data) ⇒ <code>string</code>
Validates a given public trade instance

**Kind**: static method of [<code>StatusMessagesDeriv</code>](#StatusMessagesDeriv)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#StatusMessagesDeriv..Data) \| [<code>Array.&lt;Data&gt;</code>](#StatusMessagesDeriv..Data) | models   to validate |

<a name="StatusMessagesDeriv..ArrayData"></a>

### StatusMessagesDeriv~ArrayData : <code>Array</code>
[StatusMessagesDeriv](#StatusMessagesDeriv) data in WSv2 array format. Suitable for passing
to [StatusMessagesDeriv](#StatusMessagesDeriv) to construct a model instance.

**Kind**: inner typedef of [<code>StatusMessagesDeriv</code>](#StatusMessagesDeriv)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | key |
| 1 | <code>number</code> | timestamp |
| 3 | <code>number</code> | price |
| 4 | <code>number</code> | priceSpot |
| 6 | <code>number</code> | fundBal |
| 9 | <code>number</code> | fundingAccrued |
| 10 | <code>number</code> | fundingStep |

<a name="StatusMessagesDeriv..Data"></a>

### StatusMessagesDeriv~Data : [<code>StatusMessagesDeriv</code>](#StatusMessagesDeriv) \| [<code>ObjectData</code>](#StatusMessagesDeriv..ObjectData) \| [<code>ArrayData</code>](#StatusMessagesDeriv..ArrayData)
[StatusMessagesDeriv](#StatusMessagesDeriv) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>StatusMessagesDeriv</code>](#StatusMessagesDeriv)  
<a name="StatusMessagesDeriv..ObjectData"></a>

### StatusMessagesDeriv~ObjectData : <code>object</code>
[StatusMessagesDeriv](#StatusMessagesDeriv) data in plain object format. Suitable for
passing to [StatusMessagesDeriv](#StatusMessagesDeriv) to construct a model instance.

**Kind**: inner typedef of [<code>StatusMessagesDeriv</code>](#StatusMessagesDeriv)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key |
| timestamp | <code>number</code> | timestamp |
| price | <code>string</code> | price |
| priceSpot | <code>string</code> | spot price |
| fundBal | <code>string</code> | funding balance |
| fundingAccrued | <code>string</code> | accrued funding |
| fundingStep | <code>string</code> | funding step |

<a name="Trade"></a>

## Trade ⇐ [<code>Model</code>](#Model)
Private Trade model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [Trade](#Trade) ⇐ [<code>Model</code>](#Model)
    * [new Trade(data)](#new_Trade_new)
    * _instance_
        * [.toString()](#Trade+toString) ⇒ <code>string</code>
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#Trade.unserialize) ⇒ [<code>ObjectData</code>](#Trade..ObjectData)
        * [.validate(data)](#Trade.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#Trade..ArrayData) : <code>Array</code>
        * [~Data](#Trade..Data) : [<code>Trade</code>](#Trade) \| [<code>ObjectData</code>](#Trade..ObjectData) \| [<code>ArrayData</code>](#Trade..ArrayData)
        * [~ObjectData](#Trade..ObjectData) : <code>object</code>

<a name="new_Trade_new"></a>

### new Trade(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Trade..Data) \| [<code>Array.&lt;Data&gt;</code>](#Trade..Data) | data |

<a name="Trade+toString"></a>

### trade.toString() ⇒ <code>string</code>
**Kind**: instance method of [<code>Trade</code>](#Trade)  
**Returns**: <code>string</code> - str  
<a name="Model+serialize"></a>

### trade.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Trade</code>](#Trade)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### trade.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Trade</code>](#Trade)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="Trade.unserialize"></a>

### Trade.unserialize(data) ⇒ [<code>ObjectData</code>](#Trade..ObjectData)
**Kind**: static method of [<code>Trade</code>](#Trade)  
**Returns**: [<code>ObjectData</code>](#Trade..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Trade..Data) \| [<code>Array.&lt;Data&gt;</code>](#Trade..Data) | data to convert to POJO |

<a name="Trade.validate"></a>

### Trade.validate(data) ⇒ <code>string</code>
Validates a given trade instance

**Kind**: static method of [<code>Trade</code>](#Trade)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Trade..Data) \| [<code>Array.&lt;Data&gt;</code>](#Trade..Data) | instance(s) to validate |

<a name="Trade..ArrayData"></a>

### Trade~ArrayData : <code>Array</code>
[Trade](#Trade) data in WSv2 array format. Suitable for passing to
[Trade](#Trade) to construct a model instance.

**Kind**: inner typedef of [<code>Trade</code>](#Trade)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | id |
| 1 | <code>string</code> | symbol |
| 2 | <code>number</code> | mtsCreate |
| 3 | <code>number</code> | orderID |
| 4 | <code>string</code> | execAmount |
| 5 | <code>string</code> | execPrice |
| 6 | <code>string</code> | orderType |
| 7 | <code>number</code> | orderPrice |
| 8 | <code>number</code> | maker |
| 9 | <code>number</code> | fee |
| 10 | <code>string</code> | feeCurrency |

<a name="Trade..Data"></a>

### Trade~Data : [<code>Trade</code>](#Trade) \| [<code>ObjectData</code>](#Trade..ObjectData) \| [<code>ArrayData</code>](#Trade..ArrayData)
[Trade](#Trade) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>Trade</code>](#Trade)  
<a name="Trade..ObjectData"></a>

### Trade~ObjectData : <code>object</code>
[Trade](#Trade) data in plain object format. Suitable for passing to
[Trade](#Trade) to construct a model instance.

**Kind**: inner typedef of [<code>Trade</code>](#Trade)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id |
| symbol | <code>string</code> | symbol |
| mtsCreate | <code>number</code> | creation timestamp |
| orderID | <code>number</code> | order ID |
| execAmount | <code>string</code> | executed amount |
| execPrice | <code>string</code> | execution price |
| orderType | <code>string</code> | order type |
| orderPrice | <code>string</code> | order price |
| maker | <code>number</code> \| <code>boolean</code> | maker flag |
| fee | <code>string</code> | fee amount |
| feeCurrency | <code>string</code> | fee currency |

<a name="TradingTickerHist"></a>

## TradingTickerHist ⇐ [<code>Model</code>](#Model)
Historical Trading Ticker model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [TradingTickerHist](#TradingTickerHist) ⇐ [<code>Model</code>](#Model)
    * [new TradingTickerHist(data)](#new_TradingTickerHist_new)
    * _instance_
        * [.quote()](#TradingTickerHist+quote) ⇒ <code>string</code>
        * [.base()](#TradingTickerHist+base) ⇒ <code>string</code>
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#TradingTickerHist.unserialize) ⇒ [<code>ObjectData</code>](#TradingTickerHist..ObjectData)
        * [.validate(data)](#TradingTickerHist.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#TradingTickerHist..ArrayData) : <code>Array</code>
        * [~Data](#TradingTickerHist..Data) : [<code>TradingTickerHist</code>](#TradingTickerHist) \| [<code>ObjectData</code>](#TradingTickerHist..ObjectData) \| [<code>ArrayData</code>](#TradingTickerHist..ArrayData)
        * [~ObjectData](#TradingTickerHist..ObjectData) : <code>object</code>

<a name="new_TradingTickerHist_new"></a>

### new TradingTickerHist(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#TradingTickerHist..Data) \| [<code>Array.&lt;Data&gt;</code>](#TradingTickerHist..Data) | data |

<a name="TradingTickerHist+quote"></a>

### tradingTickerHist.quote() ⇒ <code>string</code>
Quote currency for the ticker

**Kind**: instance method of [<code>TradingTickerHist</code>](#TradingTickerHist)  
**Returns**: <code>string</code> - quoteCurrency  
<a name="TradingTickerHist+base"></a>

### tradingTickerHist.base() ⇒ <code>string</code>
Base currency for the ticker.

**Kind**: instance method of [<code>TradingTickerHist</code>](#TradingTickerHist)  
**Returns**: <code>string</code> - baseCurrency  
<a name="Model+serialize"></a>

### tradingTickerHist.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>TradingTickerHist</code>](#TradingTickerHist)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### tradingTickerHist.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>TradingTickerHist</code>](#TradingTickerHist)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="TradingTickerHist.unserialize"></a>

### TradingTickerHist.unserialize(data) ⇒ [<code>ObjectData</code>](#TradingTickerHist..ObjectData)
**Kind**: static method of [<code>TradingTickerHist</code>](#TradingTickerHist)  
**Returns**: [<code>ObjectData</code>](#TradingTickerHist..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#TradingTickerHist..Data) \| [<code>Array.&lt;Data&gt;</code>](#TradingTickerHist..Data) | data to   convert to POJO |

<a name="TradingTickerHist.validate"></a>

### TradingTickerHist.validate(data) ⇒ <code>string</code>
Validates a given historical trading ticker instance

**Kind**: static method of [<code>TradingTickerHist</code>](#TradingTickerHist)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#TradingTickerHist..Data) \| [<code>Array.&lt;Data&gt;</code>](#TradingTickerHist..Data) | models to   validate |

<a name="TradingTickerHist..ArrayData"></a>

### TradingTickerHist~ArrayData : <code>Array</code>
[TradingTickerHist](#TradingTickerHist) data in WSv2 array format. Suitable for passing to
[TradingTickerHist](#TradingTickerHist) to construct a model instance.

**Kind**: inner typedef of [<code>TradingTickerHist</code>](#TradingTickerHist)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | symbol |
| 1 | <code>number</code> | bid |
| 3 | <code>number</code> | ask |
| 12 | <code>number</code> | mtsUpdate |

<a name="TradingTickerHist..Data"></a>

### TradingTickerHist~Data : [<code>TradingTickerHist</code>](#TradingTickerHist) \| [<code>ObjectData</code>](#TradingTickerHist..ObjectData) \| [<code>ArrayData</code>](#TradingTickerHist..ArrayData)
[TradingTickerHist](#TradingTickerHist) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>TradingTickerHist</code>](#TradingTickerHist)  
<a name="TradingTickerHist..ObjectData"></a>

### TradingTickerHist~ObjectData : <code>object</code>
[TradingTickerHist](#TradingTickerHist) data in plain object format. Suitable for passing
to [TradingTickerHist](#TradingTickerHist) to construct a model instance.

**Kind**: inner typedef of [<code>TradingTickerHist</code>](#TradingTickerHist)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| symbol | <code>string</code> | symbol |
| bid | <code>number</code> | best bid |
| ask | <code>number</code> | best ask |
| mtsUpdate | <code>number</code> | timestamp |

<a name="TradingTicker"></a>

## TradingTicker ⇐ [<code>Model</code>](#Model)
Trading Ticker model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [TradingTicker](#TradingTicker) ⇐ [<code>Model</code>](#Model)
    * [new TradingTicker(data)](#new_TradingTicker_new)
    * _instance_
        * [.quote()](#TradingTicker+quote) ⇒ <code>string</code>
        * [.base()](#TradingTicker+base) ⇒ <code>string</code>
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#TradingTicker.unserialize) ⇒ [<code>ObjectData</code>](#TradingTicker..ObjectData)
        * [.validate(data)](#TradingTicker.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#TradingTicker..ArrayData) : <code>Array</code>
        * [~Data](#TradingTicker..Data) : [<code>TradingTicker</code>](#TradingTicker) \| [<code>ObjectData</code>](#TradingTicker..ObjectData) \| [<code>ArrayData</code>](#TradingTicker..ArrayData)
        * [~ObjectData](#TradingTicker..ObjectData) : <code>object</code>

<a name="new_TradingTicker_new"></a>

### new TradingTicker(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#TradingTicker..Data) \| [<code>Array.&lt;Data&gt;</code>](#TradingTicker..Data) | data |

<a name="TradingTicker+quote"></a>

### tradingTicker.quote() ⇒ <code>string</code>
Quote currency of the ticker

**Kind**: instance method of [<code>TradingTicker</code>](#TradingTicker)  
**Returns**: <code>string</code> - quoteCurrency  
<a name="TradingTicker+base"></a>

### tradingTicker.base() ⇒ <code>string</code>
Base currency of the ticker

**Kind**: instance method of [<code>TradingTicker</code>](#TradingTicker)  
**Returns**: <code>string</code> - baseCurrency  
<a name="Model+serialize"></a>

### tradingTicker.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>TradingTicker</code>](#TradingTicker)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### tradingTicker.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>TradingTicker</code>](#TradingTicker)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="TradingTicker.unserialize"></a>

### TradingTicker.unserialize(data) ⇒ [<code>ObjectData</code>](#TradingTicker..ObjectData)
**Kind**: static method of [<code>TradingTicker</code>](#TradingTicker)  
**Returns**: [<code>ObjectData</code>](#TradingTicker..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#TradingTicker..Data) \| [<code>Array.&lt;Data&gt;</code>](#TradingTicker..Data) | data to convert to   POJO |

<a name="TradingTicker.validate"></a>

### TradingTicker.validate(data) ⇒ <code>string</code>
Validates a given trading ticker instance

**Kind**: static method of [<code>TradingTicker</code>](#TradingTicker)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#TradingTicker..Data) \| [<code>Array.&lt;Data&gt;</code>](#TradingTicker..Data) | instance(s) to   validate |

<a name="TradingTicker..ArrayData"></a>

### TradingTicker~ArrayData : <code>Array</code>
[TradingTicker](#TradingTicker) data in WSv2 array format. Suitable for passing to
[TradingTicker](#TradingTicker) to construct a model instance.

**Kind**: inner typedef of [<code>TradingTicker</code>](#TradingTicker)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | symbol |
| 1 | <code>number</code> | bid |
| 2 | <code>number</code> | bidSize |
| 3 | <code>number</code> | ask |
| 4 | <code>number</code> | askSize |
| 5 | <code>number</code> | dailyChange |
| 6 | <code>number</code> | dailyChangePerc |
| 7 | <code>number</code> | lastPrice |
| 8 | <code>number</code> | volume |
| 9 | <code>number</code> | high |
| 10 | <code>number</code> | low |

<a name="TradingTicker..Data"></a>

### TradingTicker~Data : [<code>TradingTicker</code>](#TradingTicker) \| [<code>ObjectData</code>](#TradingTicker..ObjectData) \| [<code>ArrayData</code>](#TradingTicker..ArrayData)
[TradingTicker](#TradingTicker) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>TradingTicker</code>](#TradingTicker)  
<a name="TradingTicker..ObjectData"></a>

### TradingTicker~ObjectData : <code>object</code>
[TradingTicker](#TradingTicker) data in plain object format. Suitable for passing to
[TradingTicker](#TradingTicker) to construct a model instance.

**Kind**: inner typedef of [<code>TradingTicker</code>](#TradingTicker)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| symbol | <code>string</code> | symbol |
| bid | <code>number</code> | best bid |
| bidSize | <code>number</code> | total bid size |
| ask | <code>number</code> | best ask |
| askSize | <code>number</code> | total ask size |
| dailyChange | <code>number</code> | change in last 24h period |
| dailyChangePerc | <code>number</code> | change in last 24h period as percent |
| lastPrice | <code>number</code> | last price |
| volume | <code>number</code> | volume in last 24h period |
| high | <code>number</code> | highest price in last 24h period |
| low | <code>number</code> | lowest price in last 24h period |

<a name="UserInfo"></a>

## UserInfo ⇐ [<code>Model</code>](#Model)
User Info model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [UserInfo](#UserInfo) ⇐ [<code>Model</code>](#Model)
    * [new UserInfo(data)](#new_UserInfo_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#UserInfo.unserialize) ⇒ [<code>ObjectData</code>](#UserInfo..ObjectData)
        * [.validate(data)](#UserInfo.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#UserInfo..ArrayData) : <code>Array</code>
        * [~Data](#UserInfo..Data) : [<code>UserInfo</code>](#UserInfo) \| [<code>ObjectData</code>](#UserInfo..ObjectData) \| [<code>ArrayData</code>](#UserInfo..ArrayData)
        * [~ObjectData](#UserInfo..ObjectData) : <code>object</code>

<a name="new_UserInfo_new"></a>

### new UserInfo(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#UserInfo..Data) \| [<code>Array.&lt;Data&gt;</code>](#UserInfo..Data) | data |

<a name="Model+serialize"></a>

### userInfo.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>UserInfo</code>](#UserInfo)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### userInfo.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>UserInfo</code>](#UserInfo)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="UserInfo.unserialize"></a>

### UserInfo.unserialize(data) ⇒ [<code>ObjectData</code>](#UserInfo..ObjectData)
**Kind**: static method of [<code>UserInfo</code>](#UserInfo)  
**Returns**: [<code>ObjectData</code>](#UserInfo..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#UserInfo..Data) \| [<code>Array.&lt;Data&gt;</code>](#UserInfo..Data) | data to convert to POJO |

<a name="UserInfo.validate"></a>

### UserInfo.validate(data) ⇒ <code>string</code>
Validates a given historical trading ticker instance

**Kind**: static method of [<code>UserInfo</code>](#UserInfo)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#UserInfo..Data) \| [<code>Array.&lt;Data&gt;</code>](#UserInfo..Data) | instance(s) to validate |

<a name="UserInfo..ArrayData"></a>

### UserInfo~ArrayData : <code>Array</code>
[UserInfo](#UserInfo) data in WSv2 array format. Suitable for passing to
[UserInfo](#UserInfo) to construct a model instance.

**Kind**: inner typedef of [<code>UserInfo</code>](#UserInfo)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>number</code> | id |
| 1 | <code>string</code> | email |
| 2 | <code>string</code> | username |
| 7 | <code>number</code> | timezone |

<a name="UserInfo..Data"></a>

### UserInfo~Data : [<code>UserInfo</code>](#UserInfo) \| [<code>ObjectData</code>](#UserInfo..ObjectData) \| [<code>ArrayData</code>](#UserInfo..ArrayData)
[UserInfo](#UserInfo) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>UserInfo</code>](#UserInfo)  
<a name="UserInfo..ObjectData"></a>

### UserInfo~ObjectData : <code>object</code>
[UserInfo](#UserInfo) data in plain object format. Suitable for passing to
[UserInfo](#UserInfo) to construct a model instance.

**Kind**: inner typedef of [<code>UserInfo</code>](#UserInfo)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id |
| email | <code>string</code> | email |
| username | <code>string</code> | username |
| timezone | <code>number</code> | timezone as UTC offset |

<a name="WalletHist"></a>

## WalletHist ⇐ [<code>Model</code>](#Model)
Historical Wallet Update model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [WalletHist](#WalletHist) ⇐ [<code>Model</code>](#Model)
    * [new WalletHist(data)](#new_WalletHist_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#WalletHist.unserialize) ⇒ [<code>ObjectData</code>](#WalletHist..ObjectData)
        * [.validate(data)](#WalletHist.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#WalletHist..ArrayData) : <code>Array</code>
        * [~Data](#WalletHist..Data) : [<code>WalletHist</code>](#WalletHist) \| [<code>ObjectData</code>](#WalletHist..ObjectData) \| [<code>ArrayData</code>](#WalletHist..ArrayData)
        * [~ObjectData](#WalletHist..ObjectData) : <code>object</code>

<a name="new_WalletHist_new"></a>

### new WalletHist(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#WalletHist..Data) \| [<code>Array.&lt;Data&gt;</code>](#WalletHist..Data) | data |

<a name="Model+serialize"></a>

### walletHist.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>WalletHist</code>](#WalletHist)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### walletHist.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>WalletHist</code>](#WalletHist)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="WalletHist.unserialize"></a>

### WalletHist.unserialize(data) ⇒ [<code>ObjectData</code>](#WalletHist..ObjectData)
**Kind**: static method of [<code>WalletHist</code>](#WalletHist)  
**Returns**: [<code>ObjectData</code>](#WalletHist..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#WalletHist..Data) \| [<code>Array.&lt;Data&gt;</code>](#WalletHist..Data) | data to convert to POJO |

<a name="WalletHist.validate"></a>

### WalletHist.validate(data) ⇒ <code>string</code>
Validates a given historical wallet instance

**Kind**: static method of [<code>WalletHist</code>](#WalletHist)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#WalletHist..Data) \| [<code>Array.&lt;Data&gt;</code>](#WalletHist..Data) | instance(s) to validate |

<a name="WalletHist..ArrayData"></a>

### WalletHist~ArrayData : <code>Array</code>
[WalletHist](#WalletHist) data in WSv2 array format. Suitable for passing to
[WalletHist](#WalletHist) to construct a model instance.

**Kind**: inner typedef of [<code>WalletHist</code>](#WalletHist)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | type |
| 1 | <code>string</code> | currency |
| 2 | <code>number</code> | balance |
| 3 | <code>number</code> | unsettledInterest |
| 4 | <code>number</code> | balanceAvailable |
| 6 | <code>number</code> | mtsUpdate |

<a name="WalletHist..Data"></a>

### WalletHist~Data : [<code>WalletHist</code>](#WalletHist) \| [<code>ObjectData</code>](#WalletHist..ObjectData) \| [<code>ArrayData</code>](#WalletHist..ArrayData)
[WalletHist](#WalletHist) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>WalletHist</code>](#WalletHist)  
<a name="WalletHist..ObjectData"></a>

### WalletHist~ObjectData : <code>object</code>
[WalletHist](#WalletHist) data in plain object format. Suitable for passing to
[WalletHist](#WalletHist) to construct a model instance.

**Kind**: inner typedef of [<code>WalletHist</code>](#WalletHist)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | type (i.e. deposit) |
| currency | <code>string</code> | currency |
| balance | <code>number</code> | balance |
| unsettledInterest | <code>number</code> | unsettled interest |
| balanceAvailable | <code>number</code> | available balance |
| mtsUpdate | <code>number</code> | timestamp |

<a name="Wallet"></a>

## Wallet ⇐ [<code>Model</code>](#Model)
Wallet model

**Kind**: global class  
**Extends**: [<code>Model</code>](#Model)  

* [Wallet](#Wallet) ⇐ [<code>Model</code>](#Model)
    * [new Wallet(data)](#new_Wallet_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>object</code>
    * _static_
        * [.unserialize(data)](#Wallet.unserialize) ⇒ [<code>ObjectData</code>](#Wallet..ObjectData)
        * [.validate(data)](#Wallet.validate) ⇒ <code>string</code>
    * _inner_
        * [~ArrayData](#Wallet..ArrayData) : <code>Array</code>
        * [~Data](#Wallet..Data) : [<code>Wallet</code>](#Wallet) \| [<code>ObjectData</code>](#Wallet..ObjectData) \| [<code>ArrayData</code>](#Wallet..ArrayData)
        * [~ObjectData](#Wallet..ObjectData) : <code>object</code>

<a name="new_Wallet_new"></a>

### new Wallet(data)

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Wallet..Data) \| [<code>Array.&lt;Data&gt;</code>](#Wallet..Data) | data |

<a name="Model+serialize"></a>

### wallet.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Overrides**: [<code>serialize</code>](#Model+serialize)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### wallet.toJS() ⇒ <code>object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Wallet</code>](#Wallet)  
**Overrides**: [<code>toJS</code>](#Model+toJS)  
**Returns**: <code>object</code> - pojo  
<a name="Wallet.unserialize"></a>

### Wallet.unserialize(data) ⇒ [<code>ObjectData</code>](#Wallet..ObjectData)
**Kind**: static method of [<code>Wallet</code>](#Wallet)  
**Returns**: [<code>ObjectData</code>](#Wallet..ObjectData) - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Wallet..Data) \| [<code>Array.&lt;Data&gt;</code>](#Wallet..Data) | data to convert to POJO |

<a name="Wallet.validate"></a>

### Wallet.validate(data) ⇒ <code>string</code>
Validates a given wallet instance

**Kind**: static method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>string</code> - error - null if instance is valid  

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Data</code>](#Wallet..Data) \| [<code>Array.&lt;Data&gt;</code>](#Wallet..Data) | instance(s) to validate |

<a name="Wallet..ArrayData"></a>

### Wallet~ArrayData : <code>Array</code>
[Wallet](#Wallet) data in WSv2 array format. Suitable for passing to
[Wallet](#Wallet) to construct a model instance.

**Kind**: inner typedef of [<code>Wallet</code>](#Wallet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | type |
| 1 | <code>string</code> | currency |
| 2 | <code>number</code> | balance |
| 3 | <code>number</code> | unsettledInterest |
| 4 | <code>number</code> | balanceAvailable |
| 5 | <code>string</code> | description |
| 6 | <code>object</code> | meta |

<a name="Wallet..Data"></a>

### Wallet~Data : [<code>Wallet</code>](#Wallet) \| [<code>ObjectData</code>](#Wallet..ObjectData) \| [<code>ArrayData</code>](#Wallet..ArrayData)
[Wallet](#Wallet) data either in WSv2 array or object format.

**Kind**: inner typedef of [<code>Wallet</code>](#Wallet)  
<a name="Wallet..ObjectData"></a>

### Wallet~ObjectData : <code>object</code>
[Wallet](#Wallet) data in plain object format. Suitable for passing to
[Wallet](#Wallet) to construct a model instance.

**Kind**: inner typedef of [<code>Wallet</code>](#Wallet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | wallet type (i.e. deposit) |
| currency | <code>string</code> | wallet currency |
| balance | <code>number</code> | total balance |
| unsettledInterest | <code>number</code> | unsettled interest |
| balanceAvailable | <code>number</code> | available balance |

<a name="isCollection"></a>

## isCollection(data) ⇒ <code>boolean</code>
Checks if the provided data is a collection of models

**Kind**: global function  
**Returns**: <code>boolean</code> - isCollection  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;object&gt;</code> \| <code>object</code> \| <code>Array.&lt;Array&gt;</code> \| <code>Array</code> | packet to analyse |


## Classes

<dl>
<dt><a href="#Alert">Alert</a></dt>
<dd><p>Price alert model</p>
</dd>
<dt><a href="#BalanceInfo">BalanceInfo</a></dt>
<dd><p>Wallet balance information model</p>
</dd>
<dt><a href="#Candle">Candle</a></dt>
<dd><p>OHLCV Candle model</p>
</dd>
<dt><a href="#Currency">Currency</a></dt>
<dd><p>Currency model</p>
</dd>
<dt><a href="#FundingCredit">FundingCredit</a></dt>
<dd><p>Funding Credit model</p>
</dd>
<dt><a href="#FundingInfo">FundingInfo</a></dt>
<dd><p>Account Funding Info model</p>
</dd>
<dt><a href="#FundingLoan">FundingLoan</a></dt>
<dd><p>Funding Loan model</p>
</dd>
<dt><a href="#FundingOffer">FundingOffer</a></dt>
<dd><p>Funding Offer model</p>
</dd>
<dt><a href="#FundingTickerHist">FundingTickerHist</a></dt>
<dd><p>Historical Funding Ticker model</p>
</dd>
<dt><a href="#FundingTicker">FundingTicker</a></dt>
<dd><p>Funding Ticker model</p>
</dd>
<dt><a href="#FundingTrade">FundingTrade</a></dt>
<dd><p>Funding Trade model</p>
</dd>
<dt><a href="#LedgerEntry">LedgerEntry</a></dt>
<dd><p>Ledger Entry model; wallet field is automatically populated if a description
is provided.</p>
</dd>
<dt><a href="#Liquidations">Liquidations</a></dt>
<dd><p>Liquidation Info model</p>
</dd>
<dt><a href="#MarginInfo">MarginInfo</a></dt>
<dd><p>Margin Info model</p>
</dd>
<dt><a href="#Model">Model</a></dt>
<dd><p>Base model class, providing format-conversion methods</p>
</dd>
<dt><a href="#Movement">Movement</a></dt>
<dd><p>Currency Movement model</p>
</dd>
<dt><a href="#Notification">Notification</a></dt>
<dd><p>Notification model</p>
</dd>
<dt><a href="#OrderBook">OrderBook</a></dt>
<dd><p>High level OB model to automatically integrate WS updates &amp; maintain sort</p>
</dd>
<dt><a href="#Order">Order</a></dt>
<dd><p>High level order model; provides methods for execution &amp; can stay updated via
a WSv2 connection or used to execute as a rest payload</p>
</dd>
<dt><a href="#Position">Position</a></dt>
<dd><p>Position model</p>
</dd>
<dt><a href="#PublicTrade">PublicTrade</a></dt>
<dd><p>Public Trade model, supporting both funding &amp; ordinary trades</p>
</dd>
<dt><a href="#StatusMessagesDeriv">StatusMessagesDeriv</a></dt>
<dd><p>Derivatives Status Message model</p>
</dd>
<dt><a href="#Trade">Trade</a></dt>
<dd><p>Private Trade model</p>
</dd>
<dt><a href="#TradingTickerHist">TradingTickerHist</a></dt>
<dd><p>Historical Trading Ticker model</p>
</dd>
<dt><a href="#TradingTicker">TradingTicker</a></dt>
<dd><p>Trading Ticker model</p>
</dd>
<dt><a href="#UserInfo">UserInfo</a></dt>
<dd><p>User Info model</p>
</dd>
<dt><a href="#WalletHist">WalletHist</a></dt>
<dd><p>Historical Wallet Update model</p>
</dd>
<dt><a href="#Wallet">Wallet</a></dt>
<dd><p>Wallet model</p>
</dd>
</dl>

<a name="Alert"></a>

## Alert
Price alert model

**Kind**: global class  

* [Alert](#Alert)
    * [new Alert(data)](#new_Alert_new)
    * [.unserialize(arr)](#Alert.unserialize) ⇒ <code>Object</code>

<a name="new_Alert_new"></a>

### new Alert(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.key | <code>string</code> | 
| data.type | <code>string</code> | 
| data.symbol | <code>string</code> | 
| data.price | <code>string</code> | 

<a name="Alert.unserialize"></a>

### Alert.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>Alert</code>](#Alert)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="BalanceInfo"></a>

## BalanceInfo
Wallet balance information model

**Kind**: global class  

* [BalanceInfo](#BalanceInfo)
    * [new BalanceInfo(data)](#new_BalanceInfo_new)
    * [.unserialize(arr)](#BalanceInfo.unserialize) ⇒ <code>Object</code>

<a name="new_BalanceInfo_new"></a>

### new BalanceInfo(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.amount | <code>number</code> | 
| data.amountNet | <code>number</code> | 

<a name="BalanceInfo.unserialize"></a>

### BalanceInfo.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>BalanceInfo</code>](#BalanceInfo)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="Candle"></a>

## Candle
OHLCV Candle model

**Kind**: global class  

* [Candle](#Candle)
    * [new Candle(data)](#new_Candle_new)
    * [.unserialize(arr)](#Candle.unserialize) ⇒ <code>Object</code>

<a name="new_Candle_new"></a>

### new Candle(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.mts | <code>number</code> | 
| data.open | <code>number</code> | 
| data.close | <code>number</code> | 
| data.high | <code>number</code> | 
| data.low | <code>number</code> | 
| data.volume | <code>number</code> | 

<a name="Candle.unserialize"></a>

### Candle.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>Candle</code>](#Candle)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="Currency"></a>

## Currency
Currency model

**Kind**: global class  

* [Currency](#Currency)
    * [new Currency(data)](#new_Currency_new)
    * [.unserialize(arr)](#Currency.unserialize) ⇒ <code>Object</code>

<a name="new_Currency_new"></a>

### new Currency(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.id | <code>string</code> | 
| data.name | <code>string</code> | 
| data.pool | <code>string</code> | 
| data.exporer | <code>string</code> | 
| data.symbol | <code>string</code> | 

<a name="Currency.unserialize"></a>

### Currency.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>Currency</code>](#Currency)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="FundingCredit"></a>

## FundingCredit
Funding Credit model

**Kind**: global class  

* [FundingCredit](#FundingCredit)
    * [new FundingCredit(data)](#new_FundingCredit_new)
    * [.unserialize(arr)](#FundingCredit.unserialize) ⇒ <code>Object</code>

<a name="new_FundingCredit_new"></a>

### new FundingCredit(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.id | <code>number</code> | 
| data.symbol | <code>string</code> | 
| data.side | <code>number</code> | 
| data.mtsCreate | <code>number</code> | 
| data.mtsUpdate | <code>number</code> | 
| data.mtsOpening | <code>number</code> | 
| data.mtsLastPayout | <code>number</code> | 
| data.amount | <code>number</code> | 
| data.flags | <code>number</code> | 
| data.status | <code>number</code> | 
| data.rate | <code>number</code> | 
| data.rateReal | <code>number</code> | 
| data.period | <code>number</code> | 
| data.positionPair | <code>string</code> | 
| data.notify | <code>number</code> \| <code>boolean</code> | 
| data.hidden | <code>number</code> \| <code>boolean</code> | 
| data.renew | <code>number</code> \| <code>boolean</code> | 
| data.noClose | <code>number</code> \| <code>boolean</code> | 

<a name="FundingCredit.unserialize"></a>

### FundingCredit.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>FundingCredit</code>](#FundingCredit)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="FundingInfo"></a>

## FundingInfo
Account Funding Info model

**Kind**: global class  

* [FundingInfo](#FundingInfo)
    * _instance_
        * [.serialize()](#FundingInfo+serialize) ⇒ <code>Array</code>
    * _static_
        * [.unserialize(arr)](#FundingInfo.unserialize) ⇒ <code>Object</code>

<a name="FundingInfo+serialize"></a>

### fundingInfo.serialize() ⇒ <code>Array</code>
Return an array representation of this model

**Kind**: instance method of [<code>FundingInfo</code>](#FundingInfo)  
**Returns**: <code>Array</code> - arr  
<a name="FundingInfo.unserialize"></a>

### FundingInfo.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>FundingInfo</code>](#FundingInfo)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="FundingLoan"></a>

## FundingLoan
Funding Loan model

**Kind**: global class  

* [FundingLoan](#FundingLoan)
    * [new FundingLoan(data)](#new_FundingLoan_new)
    * [.unserialize(arr)](#FundingLoan.unserialize) ⇒ <code>Object</code>

<a name="new_FundingLoan_new"></a>

### new FundingLoan(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.id | <code>number</code> | 
| data.symbol | <code>string</code> | 
| data.side | <code>number</code> | 
| data.mtsCreate | <code>number</code> | 
| data.mtsUpdate | <code>number</code> | 
| data.mtsOpening | <code>number</code> | 
| data.mtsLastPayout | <code>number</code> | 
| data.amount | <code>number</code> | 
| data.flags | <code>number</code> | 
| data.status | <code>number</code> | 
| data.rate | <code>number</code> | 
| data.rateReal | <code>number</code> | 
| data.period | <code>number</code> | 
| data.notify | <code>number</code> \| <code>boolean</code> | 
| data.hidden | <code>number</code> \| <code>boolean</code> | 
| data.renew | <code>number</code> \| <code>boolean</code> | 
| data.noClose | <code>number</code> \| <code>boolean</code> | 

<a name="FundingLoan.unserialize"></a>

### FundingLoan.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>FundingLoan</code>](#FundingLoan)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="FundingOffer"></a>

## FundingOffer
Funding Offer model

**Kind**: global class  

* [FundingOffer](#FundingOffer)
    * [new FundingOffer(data, apiInterface)](#new_FundingOffer_new)
    * _instance_
        * [.toNewOfferPacket()](#FundingOffer+toNewOfferPacket) ⇒ <code>Object</code>
        * [.submit(apiInterface)](#FundingOffer+submit) ⇒ <code>Promise</code>
        * [.cancel(apiInterface)](#FundingOffer+cancel) ⇒ <code>Promise</code>
        * [.close(apiInterface)](#FundingOffer+close) ⇒ <code>Promise</code>
    * _static_
        * [.unserialize(arr)](#FundingOffer.unserialize) ⇒ <code>Object</code>

<a name="new_FundingOffer_new"></a>

### new FundingOffer(data, apiInterface)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> \| <code>Array</code> |  |
| data.id | <code>number</code> |  |
| data.symbol | <code>string</code> |  |
| data.mtsCreate | <code>number</code> |  |
| data.mtsUpdate | <code>number</code> |  |
| data.amount | <code>string</code> |  |
| data.amountOrig | <code>string</code> |  |
| data.type | <code>string</code> |  |
| data.flags | <code>number</code> |  |
| data.status | <code>string</code> |  |
| data.rate | <code>number</code> |  |
| data.rateReal | <code>number</code> |  |
| data.period | <code>number</code> |  |
| data.notify | <code>number</code> \| <code>boolean</code> |  |
| data.hidden | <code>number</code> \| <code>boolean</code> |  |
| data.renew | <code>number</code> \| <code>boolean</code> |  |
| apiInterface | <code>Object</code> | rest or websocket object capable of submitting funding offers |

<a name="FundingOffer+toNewOfferPacket"></a>

### fundingOffer.toNewOfferPacket() ⇒ <code>Object</code>
Creates an order map that can be used in either the websocket `on`
command or a rest request body

**Kind**: instance method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: <code>Object</code> - o  
<a name="FundingOffer+submit"></a>

### fundingOffer.submit(apiInterface) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| apiInterface | <code>WSv2</code> \| <code>Rest2</code> | optional ws or rest, defaults to internal ws |

<a name="FundingOffer+cancel"></a>

### fundingOffer.cancel(apiInterface) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| apiInterface | <code>WSv2</code> \| <code>Rest2</code> | optional ws or rest, defaults to internal ws |

<a name="FundingOffer+close"></a>

### fundingOffer.close(apiInterface) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| apiInterface | <code>WSv2</code> \| <code>Rest2</code> | optional ws or rest, defaults to internal ws |

<a name="FundingOffer.unserialize"></a>

### FundingOffer.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>FundingOffer</code>](#FundingOffer)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="FundingTickerHist"></a>

## FundingTickerHist
Historical Funding Ticker model

**Kind**: global class  

* [FundingTickerHist](#FundingTickerHist)
    * [new FundingTickerHist(data)](#new_FundingTickerHist_new)
    * _instance_
        * [.quote()](#FundingTickerHist+quote) ⇒ <code>string</code>
        * [.base()](#FundingTickerHist+base) ⇒ <code>string</code>
    * _static_
        * [.unserialize(arr)](#FundingTickerHist.unserialize) ⇒ <code>Object</code>

<a name="new_FundingTickerHist_new"></a>

### new FundingTickerHist(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.symbol | <code>string</code> | 
| data.bid | <code>number</code> | 
| data.bidPeriod | <code>number</code> | 
| data.ask | <code>number</code> | 
| data.mtsUpdate | <code>number</code> | 

<a name="FundingTickerHist+quote"></a>

### fundingTickerHist.quote() ⇒ <code>string</code>
**Kind**: instance method of [<code>FundingTickerHist</code>](#FundingTickerHist)  
**Returns**: <code>string</code> - quoteCurrency  
<a name="FundingTickerHist+base"></a>

### fundingTickerHist.base() ⇒ <code>string</code>
**Kind**: instance method of [<code>FundingTickerHist</code>](#FundingTickerHist)  
**Returns**: <code>string</code> - baseCurrency  
<a name="FundingTickerHist.unserialize"></a>

### FundingTickerHist.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>FundingTickerHist</code>](#FundingTickerHist)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="FundingTicker"></a>

## FundingTicker
Funding Ticker model

**Kind**: global class  

* [FundingTicker](#FundingTicker)
    * [new FundingTicker(data)](#new_FundingTicker_new)
    * _instance_
        * [.quote()](#FundingTicker+quote) ⇒ <code>string</code>
        * [.base()](#FundingTicker+base) ⇒ <code>string</code>
    * _static_
        * [.unserialize(arr)](#FundingTicker.unserialize) ⇒ <code>Object</code>

<a name="new_FundingTicker_new"></a>

### new FundingTicker(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.symbol | <code>string</code> | 
| data.frr | <code>number</code> \| <code>boolean</code> | 
| data.bid | <code>number</code> | 
| data.bidSize | <code>number</code> | 
| data.bidPeriod | <code>number</code> | 
| data.ask | <code>number</code> | 
| data.askSize | <code>number</code> | 
| data.askPeriod | <code>number</code> | 
| data.dailyChange | <code>number</code> | 
| data.dailyChangePerc | <code>number</code> | 
| data.lastPrice | <code>number</code> | 
| data.volume | <code>number</code> | 
| data.high | <code>number</code> | 
| data.low | <code>number</code> | 

<a name="FundingTicker+quote"></a>

### fundingTicker.quote() ⇒ <code>string</code>
**Kind**: instance method of [<code>FundingTicker</code>](#FundingTicker)  
**Returns**: <code>string</code> - quoteCurrency  
<a name="FundingTicker+base"></a>

### fundingTicker.base() ⇒ <code>string</code>
**Kind**: instance method of [<code>FundingTicker</code>](#FundingTicker)  
**Returns**: <code>string</code> - baseCurrency  
<a name="FundingTicker.unserialize"></a>

### FundingTicker.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>FundingTicker</code>](#FundingTicker)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="FundingTrade"></a>

## FundingTrade
Funding Trade model

**Kind**: global class  

* [FundingTrade](#FundingTrade)
    * [new FundingTrade(data)](#new_FundingTrade_new)
    * [.unserialize(arr)](#FundingTrade.unserialize) ⇒ <code>Object</code>

<a name="new_FundingTrade_new"></a>

### new FundingTrade(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.id | <code>number</code> | 
| data.symbol | <code>string</code> | 
| data.mtsCreate | <code>number</code> | 
| data.offerID | <code>number</code> | 
| data.amount | <code>number</code> | 
| data.rate | <code>number</code> | 
| data.period | <code>number</code> | 
| data.maker | <code>number</code> \| <code>boolean</code> | 

<a name="FundingTrade.unserialize"></a>

### FundingTrade.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>FundingTrade</code>](#FundingTrade)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="LedgerEntry"></a>

## LedgerEntry
Ledger Entry model; wallet field is automatically populated if a description
is provided.

**Kind**: global class  

* [LedgerEntry](#LedgerEntry)
    * [new LedgerEntry(data)](#new_LedgerEntry_new)
    * [.unserialize(arr)](#LedgerEntry.unserialize) ⇒ <code>Object</code>

<a name="new_LedgerEntry_new"></a>

### new LedgerEntry(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.id | <code>number</code> | 
| data.currency | <code>string</code> | 
| data.mts | <code>number</code> | 
| data.amount | <code>number</code> | 
| data.balance | <code>number</code> | 
| data.description | <code>string</code> | 

<a name="LedgerEntry.unserialize"></a>

### LedgerEntry.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>LedgerEntry</code>](#LedgerEntry)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="Liquidations"></a>

## Liquidations
Liquidation Info model

**Kind**: global class  

* [Liquidations](#Liquidations)
    * [new Liquidations(data)](#new_Liquidations_new)
    * [.unserialize(arr)](#Liquidations.unserialize) ⇒ <code>Object</code>

<a name="new_Liquidations_new"></a>

### new Liquidations(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.posId | <code>number</code> | 
| data.mtsUpdated | <code>number</code> | 
| data.symbol | <code>string</code> | 
| data.amount | <code>number</code> | 
| data.basePrice | <code>number</code> | 
| data.isMatch | <code>number</code> \| <code>boolean</code> | 
| data.isMarketSold | <code>number</code> \| <code>boolean</code> | 

<a name="Liquidations.unserialize"></a>

### Liquidations.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>Liquidations</code>](#Liquidations)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="MarginInfo"></a>

## MarginInfo
Margin Info model

**Kind**: global class  

* [MarginInfo](#MarginInfo)
    * _instance_
        * [.serialize()](#MarginInfo+serialize) ⇒ <code>Array</code>
    * _static_
        * [.unserialize(arr)](#MarginInfo.unserialize) ⇒ <code>Object</code>

<a name="MarginInfo+serialize"></a>

### marginInfo.serialize() ⇒ <code>Array</code>
Return an array representation of this model

**Kind**: instance method of [<code>MarginInfo</code>](#MarginInfo)  
**Returns**: <code>Array</code> - arr  
<a name="MarginInfo.unserialize"></a>

### MarginInfo.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>MarginInfo</code>](#MarginInfo)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Array</code> | 

<a name="Model"></a>

## Model
Base model class, providing format-conversion methods

**Kind**: global class  

* [Model](#Model)
    * [new Model(data, fields, boolFields, fieldKeys)](#new_Model_new)
    * _instance_
        * [.serialize()](#Model+serialize) ⇒ <code>Array</code>
        * [.toJS()](#Model+toJS) ⇒ <code>Object</code>
    * _static_
        * [.unserialize(data, fields, boolFields, fieldKeys)](#Model.unserialize) ⇒ <code>Object</code>

<a name="new_Model_new"></a>

### new Model(data, fields, boolFields, fieldKeys)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | model data |
| fields | <code>Object</code> | field definitions, { [index]: key } |
| boolFields | <code>Array</code> | array of boolean field keys |
| fieldKeys | <code>Array</code> | array of all field keys |

<a name="Model+serialize"></a>

### model.serialize() ⇒ <code>Array</code>
Converts this model to array-format and returns the result

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: <code>Array</code> - arr  
<a name="Model+toJS"></a>

### model.toJS() ⇒ <code>Object</code>
Converts this model to object-format and returns the result

**Kind**: instance method of [<code>Model</code>](#Model)  
**Returns**: <code>Object</code> - pojo  
<a name="Model.unserialize"></a>

### Model.unserialize(data, fields, boolFields, fieldKeys) ⇒ <code>Object</code>
Generic method for converting either an array, object, or model instance to
a POJO.

**Kind**: static method of [<code>Model</code>](#Model)  
**Returns**: <code>Object</code> - pojo  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> \| <code>Array</code> | can also be a model instance |
| fields | <code>Object</code> | field definitions, { [index]: key } |
| boolFields | <code>Array</code> | array of boolean field keys |
| fieldKeys | <code>Array</code> | array of all field keys |

<a name="Movement"></a>

## Movement
Currency Movement model

**Kind**: global class  

* [Movement](#Movement)
    * [new Movement(data)](#new_Movement_new)
    * [.unserialize(arr)](#Movement.unserialize) ⇒ <code>Object</code>

<a name="new_Movement_new"></a>

### new Movement(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.id | <code>number</code> | 
| data.currency | <code>string</code> | 
| data.currencyName | <code>string</code> | 
| data.mtsStarted | <code>number</code> | 
| data.mtsUpdated | <code>number</code> | 
| data.status | <code>string</code> | 
| data.amount | <code>number</code> | 
| data.fees | <code>number</code> | 
| data.destinationAddress | <code>string</code> | 
| data.transactionId | <code>number</code> | 

<a name="Movement.unserialize"></a>

### Movement.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>Movement</code>](#Movement)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="Notification"></a>

## Notification
Notification model

**Kind**: global class  

* [Notification](#Notification)
    * [new Notification(data)](#new_Notification_new)
    * [.unserialize(arr)](#Notification.unserialize) ⇒ <code>Object</code>

<a name="new_Notification_new"></a>

### new Notification(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.mts | <code>number</code> | 
| data.type | <code>string</code> | 
| data.messageID | <code>number</code> | 
| data.notifyInfo | <code>Object</code> | 
| data.code | <code>number</code> | 
| data.status | <code>string</code> | 
| data.text | <code>string</code> | 

<a name="Notification.unserialize"></a>

### Notification.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>Notification</code>](#Notification)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="OrderBook"></a>

## OrderBook
High level OB model to automatically integrate WS updates & maintain sort

**Kind**: global class  

* [OrderBook](#OrderBook)
    * [new OrderBook(snapshot, raw)](#new_OrderBook_new)
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
        * [.getEntry(price)](#OrderBook+getEntry) ⇒ <code>Object</code>
        * [.serialize()](#OrderBook+serialize) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.toJS()](#OrderBook+toJS) ⇒ <code>Object</code>
    * _static_
        * [.checksumArr(arr, raw)](#OrderBook.checksumArr) ⇒ <code>number</code>
        * [.updateArrayOBWith(ob, entry, raw)](#OrderBook.updateArrayOBWith) ⇒ <code>boolean</code>
        * [.arrayOBMidPrice(ob, raw)](#OrderBook.arrayOBMidPrice)
        * [.unserialize(arr, raw)](#OrderBook.unserialize) ⇒ <code>Object</code>

<a name="new_OrderBook_new"></a>

### new OrderBook(snapshot, raw)
Initializes the order book with an existing snapshot (array form)


| Param | Type | Description |
| --- | --- | --- |
| snapshot | <code>Array.&lt;Array&gt;</code> \| [<code>OrderBook</code>](#OrderBook) |  |
| raw | <code>boolean</code> | true for raw 'R0' order books |

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
Resets the internal bid/ask arrays and re-populates them with the provided
snapshot.

**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  

| Param | Type |
| --- | --- |
| snapshot | <code>Array.&lt;Array&gt;</code> | 

<a name="OrderBook+updateWith"></a>

### orderBook.updateWith(entry) ⇒ <code>boolean</code>
Integrate an update packet (add, update, or remove a price level). Emits an
'update' event on success

**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>boolean</code> - success - false if entry doesn't match OB  

| Param | Type |
| --- | --- |
| entry | <code>Array</code> | 

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

### orderBook.getEntry(price) ⇒ <code>Object</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>Object</code> - entry - unserialized, null if not found  

| Param | Type |
| --- | --- |
| price | <code>number</code> | 

<a name="OrderBook+serialize"></a>

### orderBook.serialize() ⇒ <code>Array.&lt;Array&gt;</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>Array.&lt;Array&gt;</code> - - arr  
<a name="OrderBook+toJS"></a>

### orderBook.toJS() ⇒ <code>Object</code>
**Kind**: instance method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>Object</code> - pojo  
<a name="OrderBook.checksumArr"></a>

### OrderBook.checksumArr(arr, raw) ⇒ <code>number</code>
Like checksum(), but for raw array-format order books

**Kind**: static method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>number</code> - cs  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | <code>Array.&lt;Array&gt;</code> |  | assumed sorted, [topBid, bid, ..., topAsk, ask, ...] |
| raw | <code>boolean</code> | <code>false</code> | true for raw 'R0' order books |

<a name="OrderBook.updateArrayOBWith"></a>

### OrderBook.updateArrayOBWith(ob, entry, raw) ⇒ <code>boolean</code>
Modifies an array-format OB in place with an update entry. Maintains sort

**Kind**: static method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>boolean</code> - success - false if entry doesn't match OB  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ob | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  |  |
| entry | <code>Array.&lt;number&gt;</code> |  |  |
| raw | <code>boolean</code> | <code>false</code> | true for raw 'R0' order books |

<a name="OrderBook.arrayOBMidPrice"></a>

### OrderBook.arrayOBMidPrice(ob, raw)
Resolves the mid-price of an array-format OB

**Kind**: static method of [<code>OrderBook</code>](#OrderBook)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ob | <code>Array.&lt;Array&gt;</code> |  |  |
| raw | <code>boolean</code> | <code>false</code> | default false |

<a name="OrderBook.unserialize"></a>

### OrderBook.unserialize(arr, raw) ⇒ <code>Object</code>
Converts an array order book entry or snapshot to an object, with 'price',
'count', and 'amount' keys on entries

**Kind**: static method of [<code>OrderBook</code>](#OrderBook)  
**Returns**: <code>Object</code> - ob - either a map w/ bids & asks, or single entry object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  |  |
| raw | <code>boolean</code> | <code>false</code> | true for raw 'R0' order books |

<a name="Order"></a>

## Order
High level order model; provides methods for execution & can stay updated via
a WSv2 connection or used to execute as a rest payload

**Kind**: global class  

* [Order](#Order)
    * [new Order(data, apiInterface)](#new_Order_new)
    * _instance_
        * [.isOCO()](#Order+isOCO) ⇒ <code>boolean</code>
        * [.isHidden()](#Order+isHidden) ⇒ <code>boolean</code>
        * [.isPostOnly()](#Order+isPostOnly) ⇒ <code>boolean</code>
        * [.includesVariableRates()](#Order+includesVariableRates) ⇒ <code>boolean</code>
        * [.isPositionClose()](#Order+isPositionClose) ⇒ <code>boolean</code>
        * [.isReduceOnly()](#Order+isReduceOnly) ⇒ <code>boolean</code>
        * [.setOCO(v, stopPrice)](#Order+setOCO)
        * [.setHidden(v)](#Order+setHidden)
        * [.setPostOnly(v)](#Order+setPostOnly)
        * [.setNoVariableRates(v)](#Order+setNoVariableRates)
        * [.setPositionClose(v)](#Order+setPositionClose)
        * [.setReduceOnly(v)](#Order+setReduceOnly)
        * [.update(changes, apiInterface)](#Order+update) ⇒ <code>Promise</code>
        * [.toPreview()](#Order+toPreview) ⇒ <code>Object</code>
        * [.registerListeners(apiInterface)](#Order+registerListeners)
        * [.removeListeners(apiInterface)](#Order+removeListeners)
        * [.cbGID()](#Order+cbGID) ⇒ <code>string</code>
        * [.submit(apiInterface)](#Order+submit) ⇒ <code>Promise</code>
        * [.cancel(apiInterface)](#Order+cancel) ⇒ <code>Promise</code>
        * [.recreate(apiInterface)](#Order+recreate) ⇒ <code>Promise</code>
        * [.updateFrom(order)](#Order+updateFrom)
        * [.getLastFillAmount()](#Order+getLastFillAmount) ⇒ <code>number</code>
        * [.resetFilledAmount()](#Order+resetFilledAmount)
        * [.getBaseCurrency()](#Order+getBaseCurrency) ⇒ <code>string</code>
        * [.getQuoteCurrency()](#Order+getQuoteCurrency) ⇒ <code>string</code>
        * [.getNotionalValue()](#Order+getNotionalValue) ⇒ <code>number</code>
        * [.isPartiallyFilled()](#Order+isPartiallyFilled) ⇒ <code>boolean</code>
        * [.toNewOrderPacket()](#Order+toNewOrderPacket) ⇒ <code>Object</code>
    * _static_
        * [.unserialize(arr)](#Order.unserialize) ⇒ <code>Object</code>
        * [.getBaseCurrency(arr)](#Order.getBaseCurrency) ⇒ <code>string</code>
        * [.getQuoteCurrency(arr)](#Order.getQuoteCurrency) ⇒ <code>string</code>

<a name="new_Order_new"></a>

### new Order(data, apiInterface)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> \| <code>Array</code> |  |
| data.id | <code>number</code> |  |
| data.gid | <code>number</code> |  |
| data.cid | <code>number</code> |  |
| data.symbol | <code>string</code> |  |
| data.mtsCreate | <code>number</code> |  |
| data.mtsUpdate | <code>number</code> |  |
| data.amount | <code>string</code> |  |
| data.amountOrig | <code>string</code> |  |
| data.type | <code>string</code> |  |
| data.typePrev | <code>string</code> |  |
| data.mtsTIF | <code>number</code> |  |
| data.flags | <code>number</code> |  |
| data.status | <code>string</code> |  |
| data.price | <code>string</code> |  |
| data.priceAvg | <code>string</code> |  |
| data.priceTrailing | <code>string</code> |  |
| data.priceAuxLimit | <code>string</code> |  |
| data.notify | <code>number</code> \| <code>boolean</code> |  |
| data.placedId | <code>number</code> |  |
| apiInterface | <code>Object</code> | saved for a later call to registerListeners() |

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

### order.setOCO(v, stopPrice)
**Kind**: instance method of [<code>Order</code>](#Order)  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>boolean</code> |  |
| stopPrice | <code>number</code> | optional, defaults to current value |

<a name="Order+setHidden"></a>

### order.setHidden(v)
**Kind**: instance method of [<code>Order</code>](#Order)  

| Param | Type |
| --- | --- |
| v | <code>boolean</code> | 

<a name="Order+setPostOnly"></a>

### order.setPostOnly(v)
**Kind**: instance method of [<code>Order</code>](#Order)  

| Param | Type |
| --- | --- |
| v | <code>boolean</code> | 

<a name="Order+setNoVariableRates"></a>

### order.setNoVariableRates(v)
**Kind**: instance method of [<code>Order</code>](#Order)  

| Param | Type |
| --- | --- |
| v | <code>boolean</code> | 

<a name="Order+setPositionClose"></a>

### order.setPositionClose(v)
**Kind**: instance method of [<code>Order</code>](#Order)  

| Param | Type |
| --- | --- |
| v | <code>boolean</code> | 

<a name="Order+setReduceOnly"></a>

### order.setReduceOnly(v)
**Kind**: instance method of [<code>Order</code>](#Order)  

| Param | Type |
| --- | --- |
| v | <code>boolean</code> | 

<a name="Order+update"></a>

### order.update(changes, apiInterface) ⇒ <code>Promise</code>
Send an order update packet to the WS server, and update local state. This
updates the order atomically without changing its position in the queue for
its price level.

Rejects with an error if an attempt is made to apply a delta to a missing
amount.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>Promise</code> - p - resolves on ws2 confirmation or rest response  

| Param | Type | Description |
| --- | --- | --- |
| changes | <code>Object</code> |  |
| apiInterface | <code>WSv2</code> \| <code>Rest2</code> | optional ws or rest, defaults to internal instance |

<a name="Order+toPreview"></a>

### order.toPreview() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>Object</code> - preview  
<a name="Order+registerListeners"></a>

### order.registerListeners(apiInterface)
Registers for updates/persistence on the specified ws2 instance

**Kind**: instance method of [<code>Order</code>](#Order)  

| Param | Type | Description |
| --- | --- | --- |
| apiInterface | <code>Object</code> | optional, defaults to internal ws |

<a name="Order+removeListeners"></a>

### order.removeListeners(apiInterface)
Removes update listeners from the specified ws2 instance.
Will fail if rest interface is provided.

**Kind**: instance method of [<code>Order</code>](#Order)  

| Param | Type | Description |
| --- | --- | --- |
| apiInterface | <code>WSv2</code> \| <code>Rest2</code> | optional ws defaults to internal ws |

<a name="Order+cbGID"></a>

### order.cbGID() ⇒ <code>string</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - cbGID  
<a name="Order+submit"></a>

### order.submit(apiInterface) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| apiInterface | <code>WSv2</code> \| <code>Rest2</code> | optional ws or rest, defaults to internal ws |

<a name="Order+cancel"></a>

### order.cancel(apiInterface) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| apiInterface | <code>WSv2</code> \| <code>Rest2</code> | optional ws or rest, defaults to internal ws |

<a name="Order+recreate"></a>

### order.recreate(apiInterface) ⇒ <code>Promise</code>
Equivalent to calling cancel() followed by submit()

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| apiInterface | <code>WSv2</code> \| <code>Rest2</code> | optional ws or rest, defaults to internal ws |

<a name="Order+updateFrom"></a>

### order.updateFrom(order)
Updates order information from the provided order. Throws an error if the
order ID/CID/GID do not match

**Kind**: instance method of [<code>Order</code>](#Order)  

| Param | Type |
| --- | --- |
| order | [<code>Order</code>](#Order) | 

<a name="Order+getLastFillAmount"></a>

### order.getLastFillAmount() ⇒ <code>number</code>
Query the amount that was filled on the last order update

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>number</code> - amount  
<a name="Order+resetFilledAmount"></a>

### order.resetFilledAmount()
Resets the last amount, so getLastFillAmount() returns 0

**Kind**: instance method of [<code>Order</code>](#Order)  
<a name="Order+getBaseCurrency"></a>

### order.getBaseCurrency() ⇒ <code>string</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - currency  
<a name="Order+getQuoteCurrency"></a>

### order.getQuoteCurrency() ⇒ <code>string</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - currency  
<a name="Order+getNotionalValue"></a>

### order.getNotionalValue() ⇒ <code>number</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>number</code> - value  
<a name="Order+isPartiallyFilled"></a>

### order.isPartiallyFilled() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>boolean</code> - isPartiallyFilled  
<a name="Order+toNewOrderPacket"></a>

### order.toNewOrderPacket() ⇒ <code>Object</code>
Creates an order map that can be passed to the `on` command.

**Kind**: instance method of [<code>Order</code>](#Order)  
**Returns**: <code>Object</code> - o  
<a name="Order.unserialize"></a>

### Order.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>Order</code>](#Order)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="Order.getBaseCurrency"></a>

### Order.getBaseCurrency(arr) ⇒ <code>string</code>
**Kind**: static method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - currency - base currency from symbol  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | order in ws2 array format |

<a name="Order.getQuoteCurrency"></a>

### Order.getQuoteCurrency(arr) ⇒ <code>string</code>
**Kind**: static method of [<code>Order</code>](#Order)  
**Returns**: <code>string</code> - currency - quote currency from symbol  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | order in ws2 array format |

<a name="Position"></a>

## Position
Position model

**Kind**: global class  

* [Position](#Position)
    * [new Position(data, apiInterface)](#new_Position_new)
    * _instance_
        * [.claim(apiInterface)](#Position+claim) ⇒ <code>Promise</code>
    * _static_
        * [.unserialize(arr)](#Position.unserialize) ⇒ <code>Object</code>

<a name="new_Position_new"></a>

### new Position(data, apiInterface)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> \| <code>Array</code> |  |
| data.id | <code>number</code> |  |
| data.mtsCreate | <code>number</code> |  |
| data.mtsUpdate | <code>number</code> |  |
| data.id | <code>number</code> |  |
| data.symbol | <code>string</code> |  |
| data.status | <code>string</code> |  |
| data.type | <code>string</code> |  |
| data.amount | <code>string</code> |  |
| data.basePrice | <code>string</code> |  |
| data.marginFunding | <code>string</code> |  |
| data.marginFundingType | <code>string</code> |  |
| data.pl | <code>string</code> |  |
| data.plPerc | <code>string</code> |  |
| data.liquidationPrice | <code>string</code> |  |
| data.leverage | <code>number</code> |  |
| data.collateral | <code>number</code> |  |
| data.collateralMin | <code>number</code> |  |
| data.meta | <code>Object</code> |  |
| apiInterface | <code>WSv2</code> \| <code>Rest2</code> | optional, rest or websocket object thats capable of submitting position changes |

<a name="Position+claim"></a>

### position.claim(apiInterface) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Position</code>](#Position)  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| apiInterface | <code>WSv2</code> \| <code>Rest2</code> | optional ws or rest, defaults to internal ws |

<a name="Position.unserialize"></a>

### Position.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>Position</code>](#Position)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="PublicTrade"></a>

## PublicTrade
Public Trade model, supporting both funding & ordinary trades

**Kind**: global class  

* [PublicTrade](#PublicTrade)
    * [new PublicTrade(data)](#new_PublicTrade_new)
    * [.unserialize(arr)](#PublicTrade.unserialize) ⇒ <code>Object</code>

<a name="new_PublicTrade_new"></a>

### new PublicTrade(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 

<a name="PublicTrade.unserialize"></a>

### PublicTrade.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>PublicTrade</code>](#PublicTrade)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="StatusMessagesDeriv"></a>

## StatusMessagesDeriv
Derivatives Status Message model

**Kind**: global class  

* [StatusMessagesDeriv](#StatusMessagesDeriv)
    * [new StatusMessagesDeriv(data)](#new_StatusMessagesDeriv_new)
    * [.unserialize(arr)](#StatusMessagesDeriv.unserialize) ⇒ <code>Object</code>

<a name="new_StatusMessagesDeriv_new"></a>

### new StatusMessagesDeriv(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.key | <code>string</code> | 
| data.timestamp | <code>number</code> | 
| data.price | <code>string</code> | 
| data.priceSpot | <code>string</code> | 
| data.fundBal | <code>string</code> | 
| data.fundingAccrued | <code>string</code> | 
| data.fundingStep | <code>string</code> | 

<a name="StatusMessagesDeriv.unserialize"></a>

### StatusMessagesDeriv.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>StatusMessagesDeriv</code>](#StatusMessagesDeriv)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="Trade"></a>

## Trade
Private Trade model

**Kind**: global class  

* [Trade](#Trade)
    * [new Trade(data)](#new_Trade_new)
    * [.unserialize(arr)](#Trade.unserialize) ⇒ <code>Object</code>

<a name="new_Trade_new"></a>

### new Trade(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.id | <code>number</code> | 
| data.symbol | <code>string</code> | 
| data.mtsCreate | <code>number</code> | 
| data.orderID | <code>number</code> | 
| data.execAmount | <code>string</code> | 
| data.execPrice | <code>string</code> | 
| data.orderType | <code>string</code> | 
| data.orderPrice | <code>string</code> | 
| data.maker | <code>number</code> \| <code>boolean</code> | 
| data.fee | <code>string</code> | 
| data.feeCurrency | <code>string</code> | 

<a name="Trade.unserialize"></a>

### Trade.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>Trade</code>](#Trade)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="TradingTickerHist"></a>

## TradingTickerHist
Historical Trading Ticker model

**Kind**: global class  

* [TradingTickerHist](#TradingTickerHist)
    * [new TradingTickerHist(data)](#new_TradingTickerHist_new)
    * _instance_
        * [.quote()](#TradingTickerHist+quote) ⇒ <code>string</code>
        * [.base()](#TradingTickerHist+base) ⇒ <code>string</code>
    * _static_
        * [.unserialize(arr)](#TradingTickerHist.unserialize) ⇒ <code>Object</code>

<a name="new_TradingTickerHist_new"></a>

### new TradingTickerHist(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.symbol | <code>string</code> | 
| data.bid | <code>string</code> | 
| data.ask | <code>string</code> | 
| data.mtsUpdate | <code>number</code> | 

<a name="TradingTickerHist+quote"></a>

### tradingTickerHist.quote() ⇒ <code>string</code>
**Kind**: instance method of [<code>TradingTickerHist</code>](#TradingTickerHist)  
**Returns**: <code>string</code> - quoteCurrency  
<a name="TradingTickerHist+base"></a>

### tradingTickerHist.base() ⇒ <code>string</code>
**Kind**: instance method of [<code>TradingTickerHist</code>](#TradingTickerHist)  
**Returns**: <code>string</code> - baseCurrency  
<a name="TradingTickerHist.unserialize"></a>

### TradingTickerHist.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>TradingTickerHist</code>](#TradingTickerHist)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="TradingTicker"></a>

## TradingTicker
Trading Ticker model

**Kind**: global class  

* [TradingTicker](#TradingTicker)
    * [new TradingTicker(data)](#new_TradingTicker_new)
    * _instance_
        * [.quote()](#TradingTicker+quote) ⇒ <code>string</code>
        * [.base()](#TradingTicker+base) ⇒ <code>string</code>
    * _static_
        * [.unserialize(arr)](#TradingTicker.unserialize) ⇒ <code>Object</code>

<a name="new_TradingTicker_new"></a>

### new TradingTicker(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.symbol | <code>string</code> | 
| data.bid | <code>number</code> | 
| data.bidSize | <code>number</code> | 
| data.ask | <code>number</code> | 
| data.askSize | <code>number</code> | 
| data.dailyChange | <code>number</code> | 
| data.dailyChangePerc | <code>number</code> | 
| data.lastPrice | <code>number</code> | 
| data.volume | <code>number</code> | 
| data.high | <code>number</code> | 
| data.low | <code>number</code> | 

<a name="TradingTicker+quote"></a>

### tradingTicker.quote() ⇒ <code>string</code>
**Kind**: instance method of [<code>TradingTicker</code>](#TradingTicker)  
**Returns**: <code>string</code> - quoteCurrency  
<a name="TradingTicker+base"></a>

### tradingTicker.base() ⇒ <code>string</code>
**Kind**: instance method of [<code>TradingTicker</code>](#TradingTicker)  
**Returns**: <code>string</code> - baseCurrency  
<a name="TradingTicker.unserialize"></a>

### TradingTicker.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>TradingTicker</code>](#TradingTicker)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="UserInfo"></a>

## UserInfo
User Info model

**Kind**: global class  

* [UserInfo](#UserInfo)
    * [new UserInfo(data)](#new_UserInfo_new)
    * [.unserialize(arr)](#UserInfo.unserialize) ⇒ <code>Object</code>

<a name="new_UserInfo_new"></a>

### new UserInfo(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.id | <code>number</code> | 
| data.email | <code>string</code> | 
| data.username | <code>string</code> | 
| data.timezone | <code>number</code> | 

<a name="UserInfo.unserialize"></a>

### UserInfo.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>UserInfo</code>](#UserInfo)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="WalletHist"></a>

## WalletHist
Historical Wallet Update model

**Kind**: global class  

* [WalletHist](#WalletHist)
    * [new WalletHist(data)](#new_WalletHist_new)
    * [.unserialize(arr)](#WalletHist.unserialize) ⇒ <code>Object</code>

<a name="new_WalletHist_new"></a>

### new WalletHist(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.type | <code>string</code> | 
| data.currency | <code>string</code> | 
| data.balance | <code>number</code> | 
| data.unsettledInterest | <code>number</code> | 
| data.balanceAvailable | <code>number</code> | 
| data.mtsUpdate | <code>number</code> | 

<a name="WalletHist.unserialize"></a>

### WalletHist.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>WalletHist</code>](#WalletHist)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 

<a name="Wallet"></a>

## Wallet
Wallet model

**Kind**: global class  

* [Wallet](#Wallet)
    * [new Wallet(data)](#new_Wallet_new)
    * [.unserialize(arr)](#Wallet.unserialize) ⇒ <code>Object</code>

<a name="new_Wallet_new"></a>

### new Wallet(data)

| Param | Type |
| --- | --- |
| data | <code>Object</code> \| <code>Array</code> | 
| data.type | <code>string</code> | 
| data.currency | <code>string</code> | 
| data.balance | <code>number</code> | 
| data.unsettledInterest | <code>number</code> | 
| data.balanceAvailable | <code>number</code> | 

<a name="Wallet.unserialize"></a>

### Wallet.unserialize(arr) ⇒ <code>Object</code>
**Kind**: static method of [<code>Wallet</code>](#Wallet)  
**Returns**: <code>Object</code> - pojo  

| Param | Type |
| --- | --- |
| arr | <code>Object</code> \| <code>Array</code> | 


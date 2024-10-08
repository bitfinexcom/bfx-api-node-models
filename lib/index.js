'use strict'

module.exports = {
  OrderBook: require('./order_book'),
  BalanceInfo: require('./balance_info'),
  FundingCredit: require('./funding_credit'),
  FundingInfo: require('./funding_info'),
  FundingLoan: require('./funding_loan'),
  FundingOffer: require('./funding_offer'),
  FundingTrade: require('./funding_trade'),
  MarginInfo: require('./margin_info'),
  Notification: require('./notification'),
  Order: require('./order'),
  Position: require('./position'),
  Trade: require('./trade'),
  Wallet: require('./wallet'),
  WalletHist: require('./wallet_hist'),
  Alert: require('./alert'),
  TradingTicker: require('./trading_ticker'),
  TradingTickerHist: require('./trading_ticker_hist'),
  FundingTicker: require('./funding_ticker'),
  FundingTickerHist: require('./funding_ticker_hist'),
  PublicTrade: require('./public_trade'),
  Candle: require('./candle'),
  LedgerEntry: require('./ledger_entry'),
  Liquidations: require('./liquidations'),
  Movement: require('./movement'),
  MovementInfo: require('./movement_info'),
  UserInfo: require('./user_info'),
  Currency: require('./currency'),
  StatusMessagesDeriv: require('./status_messages_deriv'),
  Login: require('./login'),
  ChangeLog: require('./change_log'),
  Invoice: require('./invoice'),
  SymbolDetails: require('./symbol_details'),
  TransactionFee: require('./transaction_fee'),
  AccountSummary: require('./account_summary'),
  AuthPermission: require('./auth_permission'),
  CoreSettings: require('./core_settings'),
  WeightedAverages: require('./weighted_averages'),

  isCollection: require('./util/is_collection')
}

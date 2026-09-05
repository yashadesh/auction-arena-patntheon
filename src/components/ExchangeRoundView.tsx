import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  ArrowLeftRight, 
  UserCheck, 
  Coins, 
  Check, 
  AlertCircle, 
  Clock, 
  Layers, 
  Trash2, 
  HelpCircle,
  TrendingUp,
  Tag,
  RotateCcw
} from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { GavelButton } from './GavelButton';
import { soundFX } from '../utils/soundFX';
import { RectificationModal } from './RectificationModal';

export const ExchangeRoundView: React.FC = () => {
  const { 
    stocks, 
    teams, 
    config, 
    executeExchangeTrade, 
    exchangeTransactions,
    revertExchangeTransaction
  } = useGame();

  const [sellerTeamId, setSellerTeamId] = useState<string>('');
  const [selectedStockId, setSelectedStockId] = useState<string>('');
  const [sellerReservePrice, setSellerReservePrice] = useState<number>(12000);
  const [randomOpeningPrice, setRandomOpeningPrice] = useState<number>(10000);
  const [buyerTeamId, setBuyerTeamId] = useState<string>('');
  const [finalBidPrice, setFinalBidPrice] = useState<number>(14000);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string; lastTxId?: string } | null>(null);
  const [isRectifyModalOpen, setIsRectifyModalOpen] = useState<boolean>(false);

  const sellerTeam = teams.find(t => t.id === sellerTeamId);
  const buyerTeam = teams.find(t => t.id === buyerTeamId);
  const selectedStock = stocks.find(s => s.id === selectedStockId);

  // Available stocks for this seller
  const sellerAvailableStocks = sellerTeam 
    ? Object.entries(sellerTeam.holdings)
        .filter(([_, lots]) => Number(lots) > 0)
        .map(([sId, lots]) => {
          const stock = stocks.find(s => s.id === sId);
          return { stock, lots: Number(lots) };
        })
        .filter((item): item is { stock: typeof stocks[0]; lots: number } => item.stock !== undefined)
    : [];

  const handleSellerChange = (teamId: string) => {
    setSellerTeamId(teamId);
    setSelectedStockId('');
  };

  const handleStockChange = (stockId: string) => {
    setSelectedStockId(stockId);
    const stock = stocks.find(s => s.id === stockId);
    if (stock) {
      setSellerReservePrice(stock.openingBidPrice || 12000);
      setRandomOpeningPrice(Math.round(((stock.openingBidPrice || 12000) * 0.9) / 500) * 500);
      setFinalBidPrice(stock.openingBidPrice || 12000);
    }
  };

  const handleExecuteTrade = () => {
    if (!sellerTeamId) {
      setStatusMessage({ type: 'error', text: 'Please select a selling team.' });
      return;
    }
    if (!selectedStockId) {
      setStatusMessage({ type: 'error', text: 'Please select a stock being sold.' });
      return;
    }
    if (!buyerTeamId) {
      setStatusMessage({ type: 'error', text: 'Please select the winning buyer team.' });
      return;
    }
    if (sellerTeamId === buyerTeamId) {
      setStatusMessage({ type: 'error', text: 'Seller and buyer cannot be the same team.' });
      return;
    }
    if (finalBidPrice < sellerReservePrice) {
      if (!confirm(`Warning: Winning bid (₹${finalBidPrice.toLocaleString('en-IN')}) is below seller's reserve price (₹${sellerReservePrice.toLocaleString('en-IN')}). Proceed anyway?`)) {
        return;
      }
    }

    const res = executeExchangeTrade(
      selectedStockId,
      sellerTeamId,
      buyerTeamId,
      finalBidPrice,
      sellerReservePrice
    );

    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message, lastTxId: res.transactionId });
      setBuyerTeamId('');
      setTimeout(() => setStatusMessage(null), 6000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleUndoTrade = (txId: string) => {
    const res = revertExchangeTransaction(txId);
    if (res.success) {
      setStatusMessage({ type: 'success', text: `Undone! ${res.message}` });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ArrowLeftRight className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 font-mono">
              ROUND 3: EXCHANGE & P2P TRADING FLOOR
            </h2>
            <button
              onClick={() => setIsRectifyModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-bold flex items-center gap-1.5 transition"
              title="Fix mistakes in trades or portfolios without fail"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rectify Mistake</span>
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Teams can pitch and sell 1 lot (20 shares) directly to the highest bidder on the trading floor. Seller receives cash directly; buyer receives the stock lot.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-purple-400 border border-purple-500/30">
            1 Lot Transfer = 20 Shares
          </span>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300' 
            : 'bg-red-950/80 border border-red-800 text-red-300'
        }`}>
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{statusMessage.text}</span>
          </div>

          {statusMessage.lastTxId && (
            <button
              onClick={() => {
                if (statusMessage.lastTxId) {
                  handleUndoTrade(statusMessage.lastTxId);
                }
              }}
              className="px-2.5 py-1 rounded-lg bg-red-950/90 hover:bg-red-900 border border-red-800 text-red-300 text-[11px] font-bold flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Undo Last Trade</span>
            </button>
          )}
        </div>
      )}

      {/* Main Trade Setup & Execution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Trade Terminal */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              Live Trade Execution Terminal
            </h3>

            {/* Step 1: Selling Team & Stock Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  1. Select Pitching/Selling Team:
                </label>
                <select
                  value={sellerTeamId}
                  onChange={(e) => handleSellerChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Choose Seller Team --</option>
                  {teams.map(t => {
                    const totalHeldLots = Object.values(t.holdings).reduce((a: number, b) => a + Number(b), 0);
                    return (
                      <option key={t.id} value={t.id} disabled={totalHeldLots === 0}>
                        {t.name} ({totalHeldLots} total lots held)
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  2. Select Stock to Put on Floor (1 Lot):
                </label>
                <select
                  value={selectedStockId}
                  onChange={(e) => handleStockChange(e.target.value)}
                  disabled={!sellerTeamId || sellerAvailableStocks.length === 0}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-200 disabled:opacity-40 focus:outline-none focus:border-amber-500"
                >
                  <option value="">
                    {sellerTeamId ? (sellerAvailableStocks.length === 0 ? '-- No holdings to sell --' : '-- Choose Stock --') : '-- Select Seller First --'}
                  </option>
                  {sellerAvailableStocks.map(item => (
                    <option key={item.stock.id} value={item.stock.id}>
                      {item.stock.name} ({item.lots} lots held by seller)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 2: Pricing & Bidding Details */}
            {selectedStock && sellerTeam && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-slate-200">
                      Floor Asset: <span className="text-amber-400 font-mono">{selectedStock.name} (1 Lot = 20 Shares)</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Seller Holds: <strong className="text-slate-200 font-mono">{sellerTeam.holdings[selectedStock.id]} lots</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Seller Minimum (Reserve):
                    </label>
                    <input
                      type="number"
                      value={sellerReservePrice}
                      onChange={(e) => setSellerReservePrice(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Coordinator Opening Bid:
                    </label>
                    <input
                      type="number"
                      value={randomOpeningPrice}
                      onChange={(e) => setRandomOpeningPrice(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-400 mb-1">
                      Final Winning Bid (₹):
                    </label>
                    <input
                      type="number"
                      value={finalBidPrice}
                      onChange={(e) => setFinalBidPrice(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Step 3: Winning Buyer Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    3. Select Highest Valid Bidder (Buyer):
                  </label>
                  <select
                    value={buyerTeamId}
                    onChange={(e) => setBuyerTeamId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="">-- Choose Buyer Team --</option>
                    {teams.filter(t => t.id !== sellerTeamId).map(t => {
                      const currentBuyerHeld = t.holdings[selectedStock.id] || 0;
                      const canAfford = t.cash >= finalBidPrice;
                      return (
                        <option key={t.id} value={t.id} disabled={!canAfford}>
                          {t.name} (Cash: ₹{t.cash.toLocaleString('en-IN')}) [Holds {currentBuyerHeld} lots] {!canAfford ? '• [Insufficient Cash]' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Live Trade Impact Preview */}
                {sellerTeam && buyerTeam && (
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs grid grid-cols-2 gap-4">
                    <div className="border-r border-slate-800 pr-2 space-y-1">
                      <span className="text-slate-400 font-bold block">Seller ({sellerTeam.name}):</span>
                      <div className="text-[11px] text-slate-300">
                        Cash: <span className="font-mono text-emerald-400">+{formatINR(finalBidPrice)}</span> (Now {formatINR(sellerTeam.cash + finalBidPrice)})
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Lots: <span className="font-mono text-red-400">-1 Lot</span> (Now {(sellerTeam.holdings[selectedStock.id] || 0) - 1})
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 font-bold block">Buyer ({buyerTeam.name}):</span>
                      <div className="text-[11px] text-slate-300">
                        Cash: <span className="font-mono text-red-400">-{formatINR(finalBidPrice)}</span> (Now {formatINR(buyerTeam.cash - finalBidPrice)})
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Lots: <span className="font-mono text-emerald-400">+1 Lot</span> (Now {(buyerTeam.holdings[selectedStock.id] || 0) + 1})
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Execute Button */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <GavelButton
                label="HAMMER (SOLD!)"
                size="sm"
                className="bg-purple-600 hover:bg-purple-500 text-white"
              />

              <button
                onClick={() => {
                  soundFX.playGavel();
                  handleExecuteTrade();
                }}
                disabled={!sellerTeamId || !selectedStockId || !buyerTeamId}
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition"
              >
                <ArrowLeftRight className="w-4 h-4" />
                Execute Peer-to-Peer Lot Transfer
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Trade Audit Log */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Exchange Trade History
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {exchangeTransactions.length} Trades
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 h-[500px] overflow-y-auto space-y-2.5">
            {exchangeTransactions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <ArrowLeftRight className="w-8 h-8 mb-2 opacity-40 text-purple-400" />
                <p className="text-xs font-semibold">No P2P trades executed yet.</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Once teams negotiate and sell lots on the trading floor, transactions will be audited here.
                </p>
              </div>
            ) : (
              exchangeTransactions.map((tx) => {
                const stock = stocks.find(s => s.id === tx.stockId);
                const seller = teams.find(t => t.id === tx.sellerTeamId);
                const buyer = teams.find(t => t.id === tx.buyerTeamId);

                return (
                  <div
                    key={tx.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">
                        {stock?.name || 'Stock'}
                      </span>
                      <span className="font-mono font-bold text-emerald-400">
                        {formatINR(tx.finalPrice)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Seller: <strong className="text-slate-300">{seller?.name || 'Unknown'}</strong></span>
                      <span>→</span>
                      <span>Buyer: <strong className="text-slate-300">{buyer?.name || 'Unknown'}</strong></span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900 font-mono">
                      <span>1 Lot (20 Shares) • {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <button
                        onClick={() => handleUndoTrade(tx.id)}
                        className="px-2 py-0.5 rounded bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-[10px] font-bold flex items-center gap-1 transition"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        Undo Trade
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Rectification Modal */}
      <RectificationModal
        isOpen={isRectifyModalOpen}
        onClose={() => setIsRectifyModalOpen(false)}
        initialTab="history"
        initialStockId={selectedStockId || stocks[0]?.id}
      />
    </div>
  );
};

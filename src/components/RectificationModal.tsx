import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  X, 
  RotateCcw, 
  AlertTriangle, 
  Check, 
  Coins, 
  Layers, 
  Eye, 
  ArrowLeftRight, 
  DollarSign, 
  Search, 
  ShieldAlert, 
  CheckCircle2, 
  Trash2,
  Edit3,
  SlidersHorizontal,
  FileText
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

interface RectificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'history' | 'lots' | 'cash';
  initialTeamId?: string;
  initialStockId?: string;
}

export const RectificationModal: React.FC<RectificationModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'history',
  initialTeamId,
  initialStockId
}) => {
  const {
    teams,
    stocks,
    config,
    normalTransactions,
    insiderTransactions,
    insiderNewsTransactions,
    exchangeTransactions,
    revertNormalTransaction,
    revertInsiderTransaction,
    revertInsiderNewsTransaction,
    revertExchangeTransaction,
    rectifyTeamHolding,
    rectifyTeamCash,
    rectifyTeamPenaltyAndBonus
  } = useGame();

  const [activeTab, setActiveTab] = useState<'history' | 'lots' | 'cash'>(initialTab);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'normal' | 'insider' | 'news' | 'exchange'>('all');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Lots Rectification Form State
  const [selectedTeamId, setSelectedTeamId] = useState<string>(initialTeamId || teams[0]?.id || '');
  const [selectedStockId, setSelectedStockId] = useState<string>(initialStockId || stocks[0]?.id || '');
  const [targetLots, setTargetLots] = useState<number>(0);
  const [adjustCashWithLots, setAdjustCashWithLots] = useState<boolean>(true);

  // Cash & Penalties Rectification Form State
  const [cashTeamId, setCashTeamId] = useState<string>(initialTeamId || teams[0]?.id || '');
  const [newCashAmount, setNewCashAmount] = useState<number>(() => {
    const t = teams.find(tm => tm.id === (initialTeamId || teams[0]?.id));
    return t ? t.cash : 1000000;
  });
  const [newPenalties, setNewPenalties] = useState<number>(() => {
    const t = teams.find(tm => tm.id === (initialTeamId || teams[0]?.id));
    return t ? t.penalties : 0;
  });
  const [newBonus, setNewBonus] = useState<number>(() => {
    const t = teams.find(tm => tm.id === (initialTeamId || teams[0]?.id));
    return t ? t.bonus : 0;
  });

  // Sync state when team/stock selection changes in Lots tab
  const currentTeam = teams.find(t => t.id === selectedTeamId) || teams[0];
  const currentStock = stocks.find(s => s.id === selectedStockId) || stocks[0];
  const currentHoldingLots = currentTeam?.holdings[currentStock?.id] || 0;

  React.useEffect(() => {
    if (currentTeam && currentStock) {
      setTargetLots(currentTeam.holdings[currentStock.id] || 0);
    }
  }, [selectedTeamId, selectedStockId, currentTeam, currentStock]);

  // Sync state when team changes in Cash tab
  const currentCashTeam = teams.find(t => t.id === cashTeamId) || teams[0];
  React.useEffect(() => {
    if (currentCashTeam) {
      setNewCashAmount(currentCashTeam.cash);
      setNewPenalties(currentCashTeam.penalties);
      setNewBonus(currentCashTeam.bonus);
    }
  }, [cashTeamId, currentCashTeam]);

  if (!isOpen) return null;

  // Handlers for Reversions
  const handleRevertNormal = (txId: string) => {
    if (!confirm('Are you sure you want to undo this allotment? Stock lots will be removed and deducted cash will be refunded to teams.')) return;
    const res = revertNormalTransaction(txId);
    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleRevertInsider = (txId: string) => {
    if (!confirm('Undo this insider round transaction? Winner/runner-up lots will be removed and bids refunded.')) return;
    const res = revertInsiderTransaction(txId);
    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleRevertNews = (txId: string) => {
    if (!confirm('Undo this insider news bid? Winner will be refunded.')) return;
    const res = revertInsiderNewsTransaction(txId);
    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleRevertExchange = (txId: string) => {
    if (!confirm('Undo this P2P exchange trade? The stock lot will return to seller and cash will be refunded to buyer.')) return;
    const res = revertExchangeTransaction(txId);
    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  // Handler for Direct Lots Rectification
  const handleApplyLotsRectification = () => {
    if (!selectedTeamId || !selectedStockId) return;
    const res = rectifyTeamHolding(selectedTeamId, selectedStockId, targetLots, adjustCashWithLots);
    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  // Handler for Direct Cash Rectification
  const handleApplyCashRectification = () => {
    if (!cashTeamId) return;
    rectifyTeamCash(cashTeamId, newCashAmount);
    rectifyTeamPenaltyAndBonus(cashTeamId, newPenalties, newBonus);
    setStatusMessage({ 
      type: 'success', 
      text: `Successfully updated ${currentCashTeam?.name}: Cash = ${formatINR(newCashAmount)}, Penalties = ${formatINR(newPenalties)}, Bonus = ${formatINR(newBonus)}` 
    });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const totalNormalTx = normalTransactions.length;
  const totalInsiderTx = insiderTransactions.length;
  const totalNewsTx = insiderNewsTransactions.length;
  const totalExchangeTx = exchangeTransactions.length;
  const totalAllTx = totalNormalTx + totalInsiderTx + totalNewsTx + totalExchangeTx;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-100 font-mono">
                  RECTIFY MISTAKES & ERROR CORRECTION
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono">
                  Fail-Safe Undo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Fix any miscount, wrong team selection, incorrect bid, or balance discrepancy on the fly.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'history'
                ? 'border-amber-400 text-amber-400 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>1. Transaction Reversals ({totalAllTx})</span>
          </button>

          <button
            onClick={() => setActiveTab('lots')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'lots'
                ? 'border-amber-400 text-amber-400 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Fix Stock Lots / Shares</span>
          </button>

          <button
            onClick={() => setActiveTab('cash')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'cash'
                ? 'border-amber-400 text-amber-400 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>3. Fix Team Cash & Penalties</span>
          </button>
        </div>

        {/* Global Status Message */}
        {statusMessage && (
          <div className={`mx-6 mt-4 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
              : 'bg-red-950/80 border border-red-800 text-red-300'
          }`}>
            {statusMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {statusMessage.text}
          </div>
        )}

        {/* Main Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-xs">
          
          {/* TAB 1: TRANSACTION REVERSALS */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  onClick={() => setHistoryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition ${
                    historyFilter === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Transactions ({totalAllTx})
                </button>
                <button
                  onClick={() => setHistoryFilter('normal')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition ${
                    historyFilter === 'normal' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Round 1 Allotments ({totalNormalTx})
                </button>
                <button
                  onClick={() => setHistoryFilter('insider')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition ${
                    historyFilter === 'insider' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Round 2 Auctions ({totalInsiderTx})
                </button>
                <button
                  onClick={() => setHistoryFilter('news')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition ${
                    historyFilter === 'news' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  News Intel Bids ({totalNewsTx})
                </button>
                <button
                  onClick={() => setHistoryFilter('exchange')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition ${
                    historyFilter === 'exchange' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Round 3 P2P Trades ({totalExchangeTx})
                </button>
              </div>

              {totalAllTx === 0 ? (
                <div className="p-12 text-center text-slate-500 bg-slate-950 rounded-2xl border border-slate-800">
                  <RotateCcw className="w-8 h-8 mx-auto text-slate-600 mb-2 opacity-50" />
                  <p className="font-semibold">No recorded transactions yet.</p>
                  <p className="text-[11px] text-slate-600 mt-1">When rounds are played, every transaction will appear here with an instant undo button.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Normal Round Allotments */}
                  {(historyFilter === 'all' || historyFilter === 'normal') && normalTransactions.map((tx) => {
                    const stock = stocks.find(s => s.id === tx.stockId);
                    const totalCost = tx.teamPurchases.reduce((acc, p) => acc + p.amountPaid, 0);
                    const totalLots = tx.teamPurchases.reduce((acc, p) => acc + p.lots, 0);
                    return (
                      <div key={tx.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono font-bold text-[10px]">
                              ROUND 1 ALLOTMENT
                            </span>
                            <span className="font-bold text-slate-100 text-sm">
                              {stock?.name || 'Stock'} ({stock?.ticker})
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(tx.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Allocated <span className="font-bold text-slate-200">{totalLots} lots</span> ({totalLots * 20} sh) across {tx.teamPurchases.length} team(s):{' '}
                            {tx.teamPurchases.map(p => {
                              const t = teams.find(tm => tm.id === p.teamId);
                              return `${t?.name || 'Team'}: ${p.lots} lots`;
                            }).join(', ')}
                            {totalCost > 0 && ` • Cash Deducted: ${formatINR(totalCost)}`}
                          </div>
                        </div>

                        <button
                          onClick={() => handleRevertNormal(tx.id)}
                          className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/60 font-bold text-xs flex items-center gap-1.5 transition shrink-0"
                          title="Undo this allotment"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Undo Allotment
                        </button>
                      </div>
                    );
                  })}

                  {/* Insider Round Transactions (5-Lot and 3-Lot) */}
                  {(historyFilter === 'all' || historyFilter === 'insider') && insiderTransactions.map((tx) => {
                    const stock = stocks.find(s => s.id === tx.stockId);
                    const winner = teams.find(t => t.id === tx.winnerTeamId);
                    const runnerUp = tx.runnerUpTeamId ? teams.find(t => t.id === tx.runnerUpTeamId) : null;
                    const is5Lot = tx.type === '5_lots_bid' || tx.winnerLots === 5;

                    return (
                      <div key={tx.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-mono font-bold text-[10px]">
                              {is5Lot ? 'ROUND 2 • 5-LOT AUCTION' : 'ROUND 2 • 3-LOT ALLOTMENT'}
                            </span>
                            <span className="font-bold text-slate-100 text-sm">
                              {stock?.name || 'Stock'}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(tx.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Winner: <span className="font-bold text-amber-400">{winner?.name}</span> ({tx.winnerLots} lots for {formatINR(tx.winnerBid)})
                            {runnerUp && tx.runnerUpLots && ` • Runner-up: ${runnerUp.name} (${tx.runnerUpLots} lot for ${formatINR(tx.runnerUpBid || 0)})`}
                            {tx.deductCash ? ' • Cash Deducted' : ' • Manual Cash'}
                          </div>
                        </div>

                        <button
                          onClick={() => handleRevertInsider(tx.id)}
                          className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/60 font-bold text-xs flex items-center gap-1.5 transition shrink-0"
                          title="Undo this auction"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Undo Auction
                        </button>
                      </div>
                    );
                  })}

                  {/* Insider News Transactions */}
                  {(historyFilter === 'all' || historyFilter === 'news') && insiderNewsTransactions.map((tx) => {
                    const stock = stocks.find(s => s.id === tx.stockId);
                    const winner = teams.find(t => t.id === tx.winnerTeamId);

                    return (
                      <div key={tx.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-bold text-[10px]">
                              INSIDER NEWS BID
                            </span>
                            <span className="font-bold text-slate-100 text-sm">
                              {stock?.name || 'Stock'}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(tx.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Won by <span className="font-bold text-blue-300">{winner?.name}</span> for bid of <span className="font-bold text-amber-400">{formatINR(tx.bidAmount)}</span>
                            {tx.deductCash ? ' (Cash Deducted)' : ' (Recorded)'}
                          </div>
                        </div>

                        <button
                          onClick={() => handleRevertNews(tx.id)}
                          className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/60 font-bold text-xs flex items-center gap-1.5 transition shrink-0"
                          title="Undo news bid"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Undo Bid
                        </button>
                      </div>
                    );
                  })}

                  {/* Exchange Transactions */}
                  {(historyFilter === 'all' || historyFilter === 'exchange') && exchangeTransactions.map((tx) => {
                    const stock = stocks.find(s => s.id === tx.stockId);
                    const seller = teams.find(t => t.id === tx.sellerTeamId);
                    const buyer = teams.find(t => t.id === tx.buyerTeamId);

                    return (
                      <div key={tx.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
                              ROUND 3 • P2P EXCHANGE
                            </span>
                            <span className="font-bold text-slate-100 text-sm">
                              {stock?.name || 'Stock'}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(tx.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Seller: <span className="font-bold text-slate-200">{seller?.name}</span> → Buyer: <span className="font-bold text-amber-400">{buyer?.name}</span> • Price: <span className="font-bold text-emerald-400">{formatINR(tx.finalPrice)}</span> (1 lot / 20 shares)
                          </div>
                        </div>

                        <button
                          onClick={() => handleRevertExchange(tx.id)}
                          className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/60 font-bold text-xs flex items-center gap-1.5 transition shrink-0"
                          title="Reverse this P2P trade"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Reverse Trade
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DIRECT STOCK LOTS RECTIFIER */}
          {activeTab === 'lots' && (
            <div className="space-y-6 max-w-2xl mx-auto bg-slate-950/70 p-6 rounded-3xl border border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-slate-100 font-mono flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  CORRECT STOCK ALLOTMENT & LOTS COUNT
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Made a counting mistake or selected the wrong team? Overwrite a team's held lots for any stock directly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Select Team */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 uppercase block">1. Select Team</label>
                  <select
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-semibold focus:outline-none focus:border-amber-500"
                  >
                    {teams.map(t => (
                      <option key={t.id} value={t.id}>{t.name} (Cash: {formatINR(t.cash)})</option>
                    ))}
                  </select>
                </div>

                {/* Select Stock */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 uppercase block">2. Select Stock</label>
                  <select
                    value={selectedStockId}
                    onChange={(e) => setSelectedStockId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-semibold focus:outline-none focus:border-amber-500"
                  >
                    {stocks.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.ticker}) - {s.category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Current vs New Lots */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Current Holding in Record</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">
                      {currentHoldingLots} Lots ({currentHoldingLots * 20} Shares = {formatINR(currentHoldingLots * config.lotBasePrice)})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Max Limit</span>
                    <span className="text-xs font-mono text-slate-300">{config.maxLotsPerStock} Lots (160 Shares)</span>
                  </div>
                </div>

                {/* Lot Selection Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-200 block">
                    Set Corrected Lot Count (0 to {config.maxLotsPerStock} Lots):
                  </label>
                  
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setTargetLots(num)}
                        className={`w-10 h-10 rounded-xl font-mono font-bold text-xs transition ${
                          targetLots === num
                            ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 shadow-md'
                            : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono mt-1">
                    New Allotment: <span className="font-bold text-slate-100">{targetLots} lots</span> ({targetLots * 20} shares)
                  </p>
                </div>

                {/* Cash Adjustment Toggle */}
                <div className="pt-2 border-t border-slate-800 flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="adjustCashWithLots"
                    checked={adjustCashWithLots}
                    onChange={(e) => setAdjustCashWithLots(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-950"
                  />
                  <label htmlFor="adjustCashWithLots" className="text-[11px] text-slate-300 cursor-pointer">
                    <span className="font-bold text-slate-200">Automatically adjust cash balance: </span>
                    {targetLots > currentHoldingLots && (
                      <span className="text-red-400">
                        Deduct {formatINR((targetLots - currentHoldingLots) * config.lotBasePrice)} from team cash
                      </span>
                    )}
                    {targetLots < currentHoldingLots && (
                      <span className="text-emerald-400">
                        Refund {formatINR((currentHoldingLots - targetLots) * config.lotBasePrice)} back to team cash
                      </span>
                    )}
                    {targetLots === currentHoldingLots && (
                      <span className="text-slate-400">No change in lots (0 difference)</span>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleApplyLotsRectification}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                Apply Lots Rectification for {currentTeam?.name}
              </button>
            </div>
          )}

          {/* TAB 3: DIRECT CASH & PENALTY RECTIFIER */}
          {activeTab === 'cash' && (
            <div className="space-y-6 max-w-2xl mx-auto bg-slate-950/70 p-6 rounded-3xl border border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-slate-100 font-mono flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-400" />
                  CORRECT TEAM CASH IN HAND, PENALTIES & BONUS
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Directly adjust cash balance to correct manual calculation mistakes or apply rule penalties.
                </p>
              </div>

              {/* Select Team */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase block">Select Team</label>
                <select
                  value={cashTeamId}
                  onChange={(e) => setCashTeamId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 font-semibold focus:outline-none focus:border-amber-500"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.name} (Current Cash: {formatINR(t.cash)})</option>
                  ))}
                </select>
              </div>

              {/* Cash Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center justify-between">
                  <span>Cash in Hand (₹)</span>
                  <span className="text-[10px] text-slate-500 font-normal">Starting was {formatINR(config.startingCash)}</span>
                </label>
                
                <input
                  type="number"
                  step={5000}
                  value={newCashAmount}
                  onChange={(e) => setNewCashAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-emerald-400 focus:outline-none focus:border-amber-500"
                />

                {/* Quick Offset Buttons */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-500 self-center mr-1 font-mono">Quick Adjust:</span>
                  {[-50000, -10000, -5000, +5000, +10000, +50000].map(delta => (
                    <button
                      key={delta}
                      type="button"
                      onClick={() => setNewCashAmount(prev => Math.max(0, prev + delta))}
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition ${
                        delta > 0 
                          ? 'bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900/60 border border-emerald-800/40' 
                          : 'bg-red-950/60 text-red-400 hover:bg-red-900/60 border border-red-800/40'
                      }`}
                    >
                      {delta > 0 ? `+₹${delta/1000}k` : `-₹${Math.abs(delta)/1000}k`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Penalties & Bonus Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-red-400 uppercase block">
                    Penalties Deducted (₹)
                  </label>
                  <input
                    type="number"
                    step={1000}
                    value={newPenalties}
                    onChange={(e) => setNewPenalties(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-red-400 focus:outline-none focus:border-red-500"
                  />
                  <span className="text-[10px] text-slate-500 block">Deducted from final net worth</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-blue-400 uppercase block">
                    Bonus Awarded (₹)
                  </label>
                  <input
                    type="number"
                    step={1000}
                    value={newBonus}
                    onChange={(e) => setNewBonus(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-blue-400 focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-500 block">Added to final net worth</span>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleApplyCashRectification}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                Save Cash & Penalty Rectification for {currentCashTeam?.name}
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[11px]">All adjustments auto-recalculate leaderboards & P&L in real-time</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
          >
            Close Rectifier
          </button>
        </div>

      </div>
    </div>
  );
};

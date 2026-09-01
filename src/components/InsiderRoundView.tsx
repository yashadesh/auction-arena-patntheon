import React, { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { 
  Eye, 
  Gavel, 
  Award, 
  Copy, 
  Check, 
  AlertCircle, 
  Search, 
  ShieldAlert, 
  Sparkles,
  TrendingUp,
  Layers,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckSquare,
  Square,
  DollarSign,
  FileText,
  UserCheck,
  Send,
  Volume2,
  Trash2
} from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { GavelButton } from './GavelButton';
import { soundFX } from '../utils/soundFX';
import { RectificationModal } from './RectificationModal';

export const InsiderRoundView: React.FC = () => {
  const { 
    stocks, 
    teams, 
    config, 
    selectedStockId, 
    setSelectedStockId, 
    insiderTransactions,
    insiderNewsTransactions,
    executeInsiderNewsAuction,
    executeStockAuction5Lots,
    executeStockAllotment3Lots,
    revertInsiderTransaction,
    revertInsiderNewsTransaction
  } = useGame();

  const selectedStock = stocks.find(s => s.id === selectedStockId) || stocks[0];

  // Active Tab within this round: 'news_bid' | 'lot5_auction' | 'lot3_allotment'
  const [activeSubTab, setActiveSubTab] = useState<'lot5_auction' | 'news_bid' | 'lot3_allotment'>('lot5_auction');
  const [isRectifyModalOpen, setIsRectifyModalOpen] = useState<boolean>(false);

  // --- Form 1: 5-Lot Auction State ---
  const [lot5WinnerId, setLot5WinnerId] = useState<string>('');
  const [lot5Bid, setLot5Bid] = useState<number>(selectedStock.openingBidPrice || 12000);
  const [lot5AutoDeduct, setLot5AutoDeduct] = useState<boolean>(true);
  const [lot5HasRunnerUp, setLot5HasRunnerUp] = useState<boolean>(false);
  const [lot5RunnerUpId, setLot5RunnerUpId] = useState<string>('');
  const [lot5RunnerUpBid, setLot5RunnerUpBid] = useState<number>(
    Math.max(selectedStock.openingBidPrice, (selectedStock.openingBidPrice || 12000) - 5000)
  );

  // --- Form 2: Insider News Bid State ---
  const [newsWinnerId, setNewsWinnerId] = useState<string>('');
  const [newsBid, setNewsBid] = useState<number>(10000);
  const [newsAutoDeduct, setNewsAutoDeduct] = useState<boolean>(true);
  const [showInsiderOnScreen, setShowInsiderOnScreen] = useState<boolean>(false);
  const [copiedInsider, setCopiedInsider] = useState<boolean>(false);

  // --- Form 3: 3-Lot Host Allotment State ---
  const [lot3TeamId, setLot3TeamId] = useState<string>('');
  const [lot3LotsCount, setLot3LotsCount] = useState<number>(3);
  const [lot3PriceToDeduct, setLot3PriceToDeduct] = useState<number>(30000);
  const [lot3AutoDeduct, setLot3AutoDeduct] = useState<boolean>(true);

  // General & Timer State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Update bids when stock changes
  const handleSelectStock = (stockId: string) => {
    setSelectedStockId(stockId);
    const st = stocks.find(s => s.id === stockId);
    if (st) {
      setLot5Bid(st.openingBidPrice || 12000);
      setLot5RunnerUpBid(Math.max(st.openingBidPrice || 12000, (st.openingBidPrice || 12000) - 5000));
      setLot5WinnerId('');
      setLot5RunnerUpId('');
      setNewsWinnerId('');
      setNewsBid(10000);
      setLot3TeamId('');
      setLot3PriceToDeduct(30000);
      setShowInsiderOnScreen(false);
      setStatusMessage(null);
    }
  };

  // Check past transactions for selected stock
  const stock5LotTx = insiderTransactions.find(tx => tx.stockId === selectedStock.id && (tx.pass === 1 || tx.winnerLots === 5 || tx.type === '5_lots_bid'));
  const stock3LotTx = insiderTransactions.find(tx => tx.stockId === selectedStock.id && (tx.pass === 2 || tx.winnerLots === 3 || tx.type === '3_lots_allotment'));
  const stockNewsTx = insiderNewsTransactions.find(tx => tx.stockId === selectedStock.id);

  // Handlers
  const handleExecuteLot5Auction = () => {
    if (!lot5WinnerId) {
      setStatusMessage({ type: 'error', text: 'Please select the winning team for the 5-Lot auction.' });
      return;
    }
    if (lot5Bid < (selectedStock.openingBidPrice || 10000)) {
      setStatusMessage({ 
        type: 'error', 
        text: `Winning bid cannot be lower than opening base price ₹${(selectedStock.openingBidPrice || 10000).toLocaleString('en-IN')}` 
      });
      return;
    }
    if (lot5HasRunnerUp && lot5RunnerUpId && lot5WinnerId === lot5RunnerUpId) {
      setStatusMessage({ type: 'error', text: 'Winner and runner-up cannot be the same team.' });
      return;
    }

    const res = executeStockAuction5Lots(
      selectedStock.id,
      lot5WinnerId,
      lot5Bid,
      lot5HasRunnerUp ? lot5RunnerUpId : undefined,
      lot5HasRunnerUp ? lot5RunnerUpBid : undefined,
      lot5HasRunnerUp ? 1 : 0,
      lot5AutoDeduct
    );

    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setLot5WinnerId('');
      setLot5RunnerUpId('');
      setLot5HasRunnerUp(false);
      setTimeout(() => setStatusMessage(null), 5000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleExecuteNewsAuction = () => {
    if (!newsWinnerId) {
      setStatusMessage({ type: 'error', text: 'Please select the team that won the Insider News bid.' });
      return;
    }
    if (newsBid <= 0) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid bid amount for the Insider News.' });
      return;
    }

    const res = executeInsiderNewsAuction(selectedStock.id, newsWinnerId, newsBid, newsAutoDeduct);
    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => setStatusMessage(null), 5000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleExecuteLot3Allotment = () => {
    if (!lot3TeamId) {
      setStatusMessage({ type: 'error', text: 'Please select the team to allot 3 lots to.' });
      return;
    }

    const res = executeStockAllotment3Lots(selectedStock.id, lot3TeamId, lot3LotsCount, lot3PriceToDeduct, lot3AutoDeduct);
    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setLot3TeamId('');
      setTimeout(() => setStatusMessage(null), 5000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleCopyInsider = () => {
    navigator.clipboard.writeText(
      `CONFIDENTIAL INSIDER REPORT [${selectedStock.ticker} - ${selectedStock.name}]:\n"${selectedStock.insiderNews}"`
    );
    setCopiedInsider(true);
    setTimeout(() => setCopiedInsider(false), 3000);
  };

  const handleUndoInsiderTx = (txId: string) => {
    const res = revertInsiderTransaction(txId);
    if (res.success) {
      setStatusMessage({ type: 'success', text: `Undone! ${res.message}` });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleUndoNewsTx = (txId: string) => {
    const res = revertInsiderNewsTransaction(txId);
    if (res.success) {
      setStatusMessage({ type: 'success', text: `Undone! ${res.message}` });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const filteredStocks = stocks.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with 30s Timer & Rectify Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Gavel className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 font-mono">
              INSIDER AUCTION & ALLOTMENT ARENA
            </h2>
            <button
              onClick={() => setIsRectifyModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-bold flex items-center gap-1.5 transition"
              title="Fix any mistake in shares or bids without fail"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rectify Mistake</span>
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            <strong>Lot 5</strong> decided by highest bidder • <strong>Insider News</strong> bidding deducted from cash • <strong>Lot 3</strong> price deducted by host.
          </p>
        </div>

        {/* 30-Second Auction Timer Widget */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950 border border-slate-800">
          <div className="px-3 py-0.5 text-center">
            <span className="text-[9px] text-slate-400 uppercase font-bold block">30s Arena Timer</span>
            <span className={`text-xl font-black font-mono tracking-wider ${
              timerSeconds <= 10 && timerSeconds > 0 
                ? 'text-red-400 animate-pulse' 
                : timerSeconds === 0 
                ? 'text-red-500' 
                : 'text-amber-400'
            }`}>
              {timerSeconds}s
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-sm"
              title={isTimerRunning ? 'Pause' : 'Start'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(30);
              }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
              title="Reset to 30s"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTimerSeconds(prev => prev + 10)}
              className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 transition"
              title="Add 10s"
            >
              +10s
            </button>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300' 
            : 'bg-red-950/80 border border-red-800 text-red-300'
        }`}>
          {statusMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {statusMessage.text}
        </div>
      )}

      {/* Main Grid: Stock Sidebar (Left 4 cols) & 3-Step Execution Tabs (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 4 Cols: Stock Selection List */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Stock ({stocks.length})
            </h3>
            <span className="text-[10px] text-amber-400 font-mono">Lot = 20 Shares</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search ticker or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="max-h-[560px] overflow-y-auto space-y-1.5 pr-1">
            {filteredStocks.map((st) => {
              const isSelected = st.id === selectedStock.id;
              const has5L = insiderTransactions.some(tx => tx.stockId === st.id && (tx.pass === 1 || tx.winnerLots === 5 || tx.type === '5_lots_bid'));
              const has3L = insiderTransactions.some(tx => tx.stockId === st.id && (tx.pass === 2 || tx.winnerLots === 3 || tx.type === '3_lots_allotment'));
              const hasNews = insiderNewsTransactions.some(tx => tx.stockId === st.id);

              return (
                <button
                  key={st.id}
                  onClick={() => handleSelectStock(st.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 text-slate-100'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate text-slate-200">
                      {st.name}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 shrink-0 ml-2">
                      ₹{st.openingBidPrice?.toLocaleString('en-IN') || '12,000'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1 text-[10px]">
                    <span className="text-slate-500 font-mono uppercase">{st.ticker} • {st.category}</span>
                    <div className="flex items-center gap-1 font-mono">
                      {has5L && <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold">5L✓</span>}
                      {hasNews && <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-400 text-[9px] font-bold">Intel✓</span>}
                      {has3L && <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 text-[9px] font-bold">3L✓</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 8 Cols: 3 Sub-Tabs for the Reform */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Selected Stock Info Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                  {selectedStock.category} • {selectedStock.ticker}
                </span>
                <h3 className="text-2xl font-black text-slate-100 mt-1 font-mono">
                  {selectedStock.name}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Opening Bid</span>
                  <span className="text-sm font-bold font-mono text-amber-400">
                    ₹{selectedStock.openingBidPrice?.toLocaleString('en-IN') || '12,000'}
                  </span>
                </div>
                <div className="text-right border-l border-slate-800 pl-3">
                  <span className="text-[10px] text-slate-500 block">Actual Return</span>
                  <span className={`text-sm font-bold font-mono ${selectedStock.returnPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {selectedStock.returnPercent >= 0 ? `+${selectedStock.returnPercent}%` : `${selectedStock.returnPercent}%`} ({(1 + selectedStock.returnPercent/100).toFixed(2)}x)
                  </span>
                </div>
              </div>
            </div>

            {/* Public Clue */}
            <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
              <span className="text-amber-400 font-bold mr-2">Public Market Clue:</span>
              "{selectedStock.displayNews}"
            </div>
          </div>

          {/* Sub-Tabs: 1. Lot 5 Auction | 2. Insider News Bid | 3. Lot 3 Host Allotment */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setActiveSubTab('lot5_auction')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeSubTab === 'lot5_auction'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Gavel className="w-4 h-4" />
              <span>1. Lot 5 Stock Auction (Highest Bid)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('news_bid')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeSubTab === 'news_bid'
                  ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>2. Insider News Bidding (Intel)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('lot3_allotment')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeSubTab === 'lot3_allotment'
                  ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>3. Lot 3 Allotment (Deducted by Us)</span>
            </button>
          </div>

          {/* TAB 1: 5-LOT STOCK AUCTION (HIGHEST BIDDER WINS) */}
          {activeSubTab === 'lot5_auction' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono">
                    <Gavel className="w-4 h-4 text-amber-400" />
                    5-LOT AUCTION — HIGHEST BIDDER WINS (100 SHARES)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    The price is decided by competitive bidding. Winning bid is deducted from the team's cash.
                  </p>
                </div>

                <button
                  onClick={() => setLot5AutoDeduct(!lot5AutoDeduct)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    lot5AutoDeduct
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {lot5AutoDeduct ? <CheckSquare className="w-4 h-4 text-amber-400" /> : <Square className="w-4 h-4 text-slate-500" />}
                  <span>Auto-deduct bid cash: {lot5AutoDeduct ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {stock5LotTx && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>
                      5-Lot Auction already recorded: <strong>{teams.find(t => t.id === stock5LotTx.winnerTeamId)?.name || 'Team'}</strong> won for <strong>₹{stock5LotTx.winnerBid.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => handleUndoInsiderTx(stock5LotTx.id)}
                    className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-[11px] font-bold flex items-center gap-1 transition shrink-0"
                    title="Undo this 5-lot auction"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Undo 5-Lot
                  </button>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Winner Team */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Select Highest Bidder (Winning Team)
                  </label>
                  <select
                    value={lot5WinnerId}
                    onChange={(e) => setLot5WinnerId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 font-semibold focus:outline-none focus:border-amber-500"
                  >
                    <option value="">-- Choose Winning Team --</option>
                    {teams.map(t => {
                      const currentHolding = t.holdings[selectedStock.id] || 0;
                      const hasRoom = currentHolding + 5 <= config.maxLotsPerStock;
                      return (
                        <option key={t.id} value={t.id} disabled={!hasRoom}>
                          {t.name} (Cash: ₹{t.cash.toLocaleString('en-IN')}) {hasRoom ? `• currently ${currentHolding} lots` : '• MAX CAP REACHED'}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Winning Bid Amount */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Highest Bid Amount (₹)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step={1000}
                      min={selectedStock.openingBidPrice || 10000}
                      value={lot5Bid}
                      onChange={(e) => setLot5Bid(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Quick Bid Increment Buttons */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      onClick={() => {
                        soundFX.playBid();
                        setLot5Bid(prev => prev + 5000);
                      }}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 transition"
                    >
                      +₹5,000
                    </button>
                    <button
                      onClick={() => {
                        soundFX.playBid();
                        setLot5Bid(prev => prev + 10000);
                      }}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 transition"
                    >
                      +₹10,000
                    </button>
                    <button
                      onClick={() => {
                        soundFX.playBid();
                        setLot5Bid(prev => prev + 25000);
                      }}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 transition"
                    >
                      +₹25,000
                    </button>
                    <button
                      onClick={() => {
                        soundFX.playBid();
                        setLot5Bid(selectedStock.openingBidPrice || 12000);
                      }}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-amber-400 ml-auto transition"
                    >
                      Reset Base
                    </button>
                  </div>
                </div>
              </div>

              {/* Optional Runner Up Toggle */}
              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => setLot5HasRunnerUp(!lot5HasRunnerUp)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
                >
                  <span className="text-amber-400">{lot5HasRunnerUp ? '▼' : '▶'}</span>
                  <span>Optional: Allot 1 Lot to Runner-Up Bidder</span>
                </button>

                {lot5HasRunnerUp && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Runner-Up Team (1 Lot)</label>
                      <select
                        value={lot5RunnerUpId}
                        onChange={(e) => setLot5RunnerUpId(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                      >
                        <option value="">-- Choose Runner-Up --</option>
                        {teams.filter(t => t.id !== lot5WinnerId).map(t => (
                          <option key={t.id} value={t.id}>
                            {t.name} (Cash: ₹{t.cash.toLocaleString('en-IN')})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Runner-Up Bid (₹)</label>
                      <input
                        type="number"
                        value={lot5RunnerUpBid}
                        onChange={(e) => setLot5RunnerUpBid(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <GavelButton
                    label="HAMMER (SOLD!)"
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-400"
                  />
                  <span className="text-[11px] text-slate-400 italic">Strike gavel to call the bid floor closed</span>
                </div>

                <button
                  onClick={() => {
                    soundFX.playGavel();
                    handleExecuteLot5Auction();
                  }}
                  disabled={!lot5WinnerId}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition"
                >
                  <Gavel className="w-4 h-4" />
                  Award 5 Lots & Deduct Bid (₹{lot5Bid.toLocaleString('en-IN')})
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: INSIDER NEWS BIDDING (INTEL AUCTION) */}
          {activeSubTab === 'news_bid' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2 font-mono">
                    <Eye className="w-4 h-4 text-purple-400" />
                    INSIDER NEWS BIDDING (CONFIDENTIAL INTEL)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Teams bid for the secret insider report. Winning bid is deducted from the team's cash balance.
                  </p>
                </div>

                <button
                  onClick={() => setNewsAutoDeduct(!newsAutoDeduct)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    newsAutoDeduct
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {newsAutoDeduct ? <CheckSquare className="w-4 h-4 text-purple-400" /> : <Square className="w-4 h-4 text-slate-500" />}
                  <span>Auto-deduct intel bid: {newsAutoDeduct ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {stockNewsTx && (
                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/60 text-xs text-purple-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-purple-400" />
                    <span>
                      Insider Intel purchased by: <strong>{teams.find(t => t.id === stockNewsTx.winnerTeamId)?.name || 'Team'}</strong> for <strong>₹{stockNewsTx.bidAmount.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => handleUndoNewsTx(stockNewsTx.id)}
                    className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-[11px] font-bold flex items-center gap-1 transition shrink-0"
                    title="Undo this intel purchase"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Undo Intel
                  </button>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Winner Team */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Team that Won the Insider News Bid
                  </label>
                  <select
                    value={newsWinnerId}
                    onChange={(e) => setNewsWinnerId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 font-semibold focus:outline-none focus:border-purple-500"
                  >
                    <option value="">-- Choose Winning Team --</option>
                    {teams.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} (Cash: ₹{t.cash.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                </div>

                {/* News Bid Amount */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Insider News Bid Amount (₹)
                  </label>
                  <input
                    type="number"
                    step={1000}
                    min={0}
                    value={newsBid}
                    onChange={(e) => setNewsBid(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-purple-300 focus:outline-none focus:border-purple-500"
                  />

                  {/* Quick Bid Chips */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      onClick={() => setNewsBid(5000)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 transition"
                    >
                      ₹5,000
                    </button>
                    <button
                      onClick={() => setNewsBid(10000)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 transition"
                    >
                      ₹10,000
                    </button>
                    <button
                      onClick={() => setNewsBid(prev => prev + 5000)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 transition"
                    >
                      +₹5k
                    </button>
                    <button
                      onClick={() => setNewsBid(prev => prev + 10000)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 transition"
                    >
                      +₹10k
                    </button>
                  </div>
                </div>
              </div>

              {/* Confidential Intel Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-purple-300 font-mono uppercase">
                      Confidential Insider News Clue
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowInsiderOnScreen(!showInsiderOnScreen)}
                      className="text-[11px] text-slate-400 hover:text-slate-200 underline"
                    >
                      {showInsiderOnScreen ? 'Hide Text' : 'Reveal on Host Screen'}
                    </button>

                    <button
                      onClick={handleCopyInsider}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-semibold transition"
                    >
                      {copiedInsider ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedInsider ? 'Copied!' : 'Copy to Send'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80">
                  {showInsiderOnScreen ? (
                    <p className="text-xs text-purple-200 italic font-mono leading-relaxed">
                      "{selectedStock.insiderNews}"
                    </p>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      [Confidential text hidden to prevent screen leakage — click Copy or Reveal]
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <GavelButton
                  label="HAMMER (SOLD!)"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-500 text-white"
                />

                <button
                  onClick={() => {
                    soundFX.playGavel();
                    handleExecuteNewsAuction();
                  }}
                  disabled={!newsWinnerId}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition"
                >
                  <Eye className="w-4 h-4" />
                  Record Insider News Sale & Deduct ₹{newsBid.toLocaleString('en-IN')}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: 3-LOT STOCK ALLOTMENT (PRICE DEDUCTED BY US) */}
          {activeSubTab === 'lot3_allotment' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-blue-300 flex items-center gap-2 font-mono">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    3-LOT STOCK ALLOTMENT (PRICE DEDUCTED BY US)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Allocate 3 lots (60 shares) to a team. The price is determined and deducted by the host.
                  </p>
                </div>

                <button
                  onClick={() => setLot3AutoDeduct(!lot3AutoDeduct)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    lot3AutoDeduct
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {lot3AutoDeduct ? <CheckSquare className="w-4 h-4 text-blue-400" /> : <Square className="w-4 h-4 text-slate-500" />}
                  <span>Auto-deduct host price: {lot3AutoDeduct ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {stock3LotTx && (
                <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/60 text-xs text-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>
                      3-Lot Allotment already recorded: <strong>{teams.find(t => t.id === stock3LotTx.winnerTeamId)?.name || 'Team'}</strong> received {stock3LotTx.winnerLots} lots for <strong>₹{stock3LotTx.winnerBid.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => handleUndoInsiderTx(stock3LotTx.id)}
                    className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-[11px] font-bold flex items-center gap-1 transition shrink-0"
                    title="Undo this 3-lot allotment"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Undo 3-Lot
                  </button>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Recipient Team */}
                <div className="space-y-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-300 block">
                    Select Recipient Team
                  </label>
                  <select
                    value={lot3TeamId}
                    onChange={(e) => setLot3TeamId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="">-- Choose Team --</option>
                    {teams.map(t => {
                      const currentHolding = t.holdings[selectedStock.id] || 0;
                      const hasRoom = currentHolding + lot3LotsCount <= config.maxLotsPerStock;
                      return (
                        <option key={t.id} value={t.id} disabled={!hasRoom}>
                          {t.name} (Cash: ₹{t.cash.toLocaleString('en-IN')}) {hasRoom ? `• held ${currentHolding}L` : '• FULL'}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Lots Count */}
                <div className="space-y-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-300 block">
                    Lots to Allot ({lot3LotsCount * 20} shares)
                  </label>
                  <select
                    value={lot3LotsCount}
                    onChange={(e) => {
                      const l = parseInt(e.target.value);
                      setLot3LotsCount(l);
                      setLot3PriceToDeduct(l * 10000);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value={1}>1 Lot (20 Shares)</option>
                    <option value={2}>2 Lots (40 Shares)</option>
                    <option value={3}>3 Lots (60 Shares) [Standard]</option>
                  </select>
                </div>

                {/* Price Deducted by Us */}
                <div className="space-y-2 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-300 block">
                    Price Deducted by Us (₹)
                  </label>
                  <input
                    type="number"
                    step={1000}
                    value={lot3PriceToDeduct}
                    onChange={(e) => setLot3PriceToDeduct(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-blue-300 focus:outline-none focus:border-blue-500"
                  />

                  {/* Preset Price Chips */}
                  <div className="flex items-center gap-1 pt-1">
                    <button
                      onClick={() => setLot3PriceToDeduct(lot3LotsCount * 10000)}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 transition"
                    >
                      ₹{(lot3LotsCount * 10000).toLocaleString('en-IN')} (Base)
                    </button>
                    <button
                      onClick={() => setLot3PriceToDeduct(selectedStock.openingBidPrice || 12000)}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 transition"
                    >
                      Opening Bid
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <GavelButton
                  label="HAMMER (SOLD!)"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-500 text-white"
                />

                <button
                  onClick={() => {
                    soundFX.playGavel();
                    handleExecuteLot3Allotment();
                  }}
                  disabled={!lot3TeamId}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition"
                >
                  <DollarSign className="w-4 h-4" />
                  Allot {lot3LotsCount} Lots & Deduct ₹{lot3PriceToDeduct.toLocaleString('en-IN')} (Deducted by Us)
                </button>
              </div>
            </div>
          )}

          {/* Activity Log for Selected Stock */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Activity History for {selectedStock.name}
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">1-Click Undo Enabled</span>
            </div>

            {(!stock5LotTx && !stock3LotTx && !stockNewsTx) ? (
              <p className="text-xs text-slate-500 italic py-2">
                No auctions or allotments completed for this stock yet.
              </p>
            ) : (
              <div className="space-y-2 text-xs font-mono">
                {stockNewsTx && (
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-between text-purple-300">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">INTEL NEWS</span>
                      <span>{teams.find(t => t.id === stockNewsTx.winnerTeamId)?.name || 'Team'}</span>
                      <span className="text-slate-400 font-normal">({formatINR(stockNewsTx.bidAmount)})</span>
                    </div>
                    <button
                      onClick={() => handleUndoNewsTx(stockNewsTx.id)}
                      className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-[11px] font-bold flex items-center gap-1 transition shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Undo Intel
                    </button>
                  </div>
                )}

                {stock5LotTx && (
                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-between text-amber-300">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">5 LOTS (100 SH)</span>
                      <span>{teams.find(t => t.id === stock5LotTx.winnerTeamId)?.name || 'Team'}</span>
                      <span className="text-slate-400 font-normal">({formatINR(stock5LotTx.winnerBid)})</span>
                    </div>
                    <button
                      onClick={() => handleUndoInsiderTx(stock5LotTx.id)}
                      className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-[11px] font-bold flex items-center gap-1 transition shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Undo 5-Lot
                    </button>
                  </div>
                )}

                {stock3LotTx && (
                  <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-between text-blue-300">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">{stock3LotTx.winnerLots || 3} LOTS ({(stock3LotTx.winnerLots || 3) * 20} SH)</span>
                      <span>{teams.find(t => t.id === stock3LotTx.winnerTeamId)?.name || 'Team'}</span>
                      <span className="text-slate-400 font-normal">({formatINR(stock3LotTx.winnerBid)})</span>
                    </div>
                    <button
                      onClick={() => handleUndoInsiderTx(stock3LotTx.id)}
                      className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-[11px] font-bold flex items-center gap-1 transition shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Undo 3-Lot
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Rectification Modal */}
      <RectificationModal
        isOpen={isRectifyModalOpen}
        onClose={() => setIsRectifyModalOpen(false)}
        initialTab="history"
        initialStockId={selectedStock.id}
      />
    </div>
  );
};

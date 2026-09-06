import React, { useState, useEffect } from 'react';
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
  TrendingDown,
  ArrowRight,
  RotateCcw,
  CheckSquare,
  Square,
  Clock,
  Play,
  Pause,
  History,
  CheckCircle2,
  Flame,
  Tv,
  Coins,
  ChevronLeft,
  ChevronRight
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
    executeInsiderRoundIntel,
    revertInsiderTransaction,
    revertInsiderNewsTransaction,
    setActiveTab
  } = useGame();

  const selectedStock = stocks.find(s => s.id === selectedStockId) || stocks[0];

  // Insider Round Confidential Intel State (0 Lots Allotted - Pure Intel Auction)
  const [winnerTeamId, setWinnerTeamId] = useState<string>('');
  const [winningBid, setWinningBid] = useState<number>(
    selectedStock.openingBidPrice || 10000
  );
  const [autoDeduct, setAutoDeduct] = useState<boolean>(true);
  const [showConfidentialIntel, setShowConfidentialIntel] = useState<boolean>(false);
  const [copiedIntel, setCopiedIntel] = useState<boolean>(false);

  // General & Timer State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'won' | 'pending'>('all');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string; lastTxId?: string } | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isRectifyModalOpen, setIsRectifyModalOpen] = useState<boolean>(false);

  const categories = [
    'All', 
    'Tech', 
    'Banking & NBFC', 
    'Energy & Commodities', 
    'Auto & EV', 
    'Defense & Infra', 
    'Pharma & Healthcare', 
    'Consumer & Retail', 
    'Fintech & Exchanges',
    'FMCG & Consumer',
    'Telecom',
    'Aviation & Logistics'
  ];

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          const next = prev - 1;
          if (next <= 3 && next > 0) soundFX.playTick();
          else if (next === 0) soundFX.playBuzzer();
          return next;
        });
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Update bid presets when stock changes
  const handleSelectStock = (stockId: string) => {
    setSelectedStockId(stockId);
    const st = stocks.find(s => s.id === stockId);
    if (st) {
      setWinningBid(st.openingBidPrice || 10000);
      setWinnerTeamId('');
      setShowConfidentialIntel(false);
      setStatusMessage(null);
    }
  };

  // Check if an insider round has already occurred for this stock
  const existingInsiderTx = insiderTransactions.find(tx => tx.stockId === selectedStock.id);
  const existingWinner = existingInsiderTx ? teams.find(t => t.id === existingInsiderTx.winnerTeamId) : null;

  const handleExecuteIntelBid = () => {
    if (!winnerTeamId) {
      setStatusMessage({ type: 'error', text: 'Please select the winning team for the Insider Round.' });
      return;
    }
    if (winningBid <= 0) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid winning bid amount.' });
      return;
    }

    const res = executeInsiderRoundIntel(selectedStock.id, winnerTeamId, winningBid, autoDeduct);
    if (res.success) {
      soundFX.playGavel();
      setShowConfidentialIntel(true);
      const latestTx = insiderTransactions[0];
      setStatusMessage({
        type: 'success',
        text: res.message,
        lastTxId: latestTx?.id
      });
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleUndoTx = (txId: string) => {
    const res = revertInsiderTransaction(txId);
    if (res.success) {
      setStatusMessage({ type: 'success', text: `Undone! ${res.message}` });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleCopyIntel = () => {
    const textToCopy = `[CONFIDENTIAL INSIDER INTEL] ${selectedStock.name} (${selectedStock.ticker})\nExpected Outcome: ${selectedStock.returnPercent >= 0 ? '+' : ''}${selectedStock.returnPercent}%\nIntel Narrative: ${selectedStock.insiderNews}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedIntel(true);
    setTimeout(() => setCopiedIntel(false), 3000);
  };

  const wonStockIds = React.useMemo(() => {
    return new Set(insiderTransactions.map(tx => tx.stockId));
  }, [insiderTransactions]);

  const currentIndex = stocks.findIndex(s => s.id === selectedStock.id);
  const handlePrevStock = () => {
    if (currentIndex > 0) {
      handleSelectStock(stocks[currentIndex - 1].id);
    }
  };
  const handleNextStock = () => {
    if (currentIndex < stocks.length - 1) {
      handleSelectStock(stocks[currentIndex + 1].id);
    }
  };

  // Calculate insider round wins per team (no cap)
  const teamWinsMap = React.useMemo(() => {
    const map: Record<string, number> = {};
    insiderTransactions.forEach(tx => {
      if (tx.winnerTeamId) {
        map[tx.winnerTeamId] = (map[tx.winnerTeamId] || 0) + 1;
      }
    });
    return map;
  }, [insiderTransactions]);

  const filteredStocks = stocks.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const isWon = wonStockIds.has(s.id);
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'won' && isWon) || 
                          (filterStatus === 'pending' && !isWon);
    return matchesSearch && matchesCat && matchesStatus;
  });

  const selectedTeamObj = teams.find(t => t.id === winnerTeamId);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & 30s Timer */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Eye className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 font-mono uppercase tracking-wide">
              THE INSIDER ROUND (SECTION 4)
            </h2>
            <button
              onClick={() => setIsRectifyModalOpen(true)}
              className="ml-2 px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-bold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rectify</span>
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Surprise one-winner auction: The winning bid unlocks the <strong className="text-purple-300">confidential inside information</strong> revealing whether the stock will rise or fall. No automatic shares are allotted; there is no limitation on the number of insider rounds a team can win.
          </p>
        </div>

        {/* 30-Second Buzzer Timer */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950 border border-slate-800">
          <div className="px-3 py-0.5 text-center">
            <span className="text-[9px] text-slate-400 uppercase font-bold block">Round Buzzer</span>
            <span className={`text-xl font-black font-mono tracking-wider ${
              timerSeconds <= 10 && timerSeconds > 0 
                ? 'text-red-400 animate-pulse' 
                : timerSeconds === 0 
                ? 'text-red-500' 
                : 'text-purple-400'
            }`}>
              {timerSeconds}s
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition shadow-sm"
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

            <div className="h-5 w-px bg-slate-800 mx-1" />

            <GavelButton
              label="HAMMER"
              size="sm"
              className="bg-purple-600 hover:bg-purple-500 text-white"
            />
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300' 
            : 'bg-red-950/80 border border-red-800 text-red-300'
        }`}>
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{statusMessage.text}</span>
          </div>

          {statusMessage.type === 'success' && statusMessage.lastTxId && (
            <button
              onClick={() => handleUndoTx(statusMessage.lastTxId!)}
              className="px-3 py-1.5 rounded-lg bg-red-900/80 hover:bg-red-800 text-red-200 border border-red-700 text-xs font-bold flex items-center gap-1.5 shrink-0 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Undo This Award
            </button>
          )}
        </div>
      )}

      {/* Main Auction Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Stock Catalog */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Stock for Insider Round ({stocks.length})
            </h3>
            <span className="text-[10px] text-purple-400 font-mono">Exclusive Intel</span>
          </div>

          {/* Quick Direct Jump Dropdown */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
              Direct Jump (#1 to #{stocks.length})
            </label>
            <select
              value={selectedStock.id}
              onChange={(e) => handleSelectStock(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:border-purple-500 focus:outline-none truncate"
            >
              {stocks.map((st, i) => {
                const hasWon = wonStockIds.has(st.id);
                return (
                  <option key={st.id} value={st.id}>
                    #{i + 1} {st.ticker} - {st.name} {hasWon ? '★ (WON)' : ''}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search companies or ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Insider Status Tabs */}
          <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-semibold">
            <button
              onClick={() => setFilterStatus('all')}
              className={`py-1 rounded-lg transition text-center ${
                filterStatus === 'all' 
                  ? 'bg-slate-800 text-slate-100 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({stocks.length})
            </button>
            <button
              onClick={() => setFilterStatus('won')}
              className={`py-1 rounded-lg transition text-center ${
                filterStatus === 'won' 
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Won ({wonStockIds.size})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`py-1 rounded-lg transition text-center ${
                filterStatus === 'pending' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pending ({stocks.length - wonStockIds.size})
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 rounded-lg shrink-0 font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat === 'All' ? 'All Sectors' : cat}
              </button>
            ))}
          </div>

          <div className="max-h-[420px] overflow-y-auto space-y-1.5 pr-1">
            {filteredStocks.map((st) => {
              const isSelected = st.id === selectedStock.id;
              const hasInsider = wonStockIds.has(st.id);
              const globalIdx = stocks.findIndex(s => s.id === st.id);

              return (
                <button
                  key={st.id}
                  onClick={() => handleSelectStock(st.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-500/10 border-purple-500/50 text-slate-100'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="truncate mr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-400 shrink-0">
                        #{globalIdx + 1}
                      </span>
                      <span className="text-xs font-bold block truncate text-slate-200">
                        {st.name}
                      </span>
                      {hasInsider && (
                        <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[9px] font-mono font-bold">
                          WON
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">
                      {st.ticker} • Base: ₹{st.openingBidPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-xs font-mono font-bold block ${st.returnPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {st.returnPercent >= 0 ? `+${st.returnPercent}%` : `${st.returnPercent}%`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 8 Cols: Selected Stock Auction Floor */}
        <div className="lg:col-span-8 space-y-4">
          {/* Spotlight Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/30 border border-slate-800 shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">
                    Surprise Insider Round • Exclusive Intel Auction
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedStock.ticker}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1 font-mono">
                  {selectedStock.name}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Normal Starting Bid</span>
                  <span className="text-base font-black font-mono text-purple-400">
                    ₹{selectedStock.openingBidPrice.toLocaleString('en-IN')} / lot
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={handlePrevStock}
                    disabled={currentIndex === 0}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 transition"
                    title="Previous Stock"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono font-bold text-slate-400 px-1">
                    #{currentIndex + 1}/{stocks.length}
                  </span>
                  <button
                    onClick={handleNextStock}
                    disabled={currentIndex >= stocks.length - 1}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 transition"
                    title="Next Stock"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Public Clue on Screen */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold text-[10px] uppercase tracking-wider block font-mono">
                Public Clue Shown on Arena Projector:
              </span>
              <p className="text-xs text-slate-300 italic">
                "{selectedStock.displayNews}"
              </p>
            </div>

            {/* Existing Winner Alert if already completed */}
            {existingInsiderTx && existingWinner && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-emerald-300 block">
                    ✓ Insider Round Already Awarded
                  </span>
                  <span className="text-slate-300">
                    Won by <strong>{existingWinner.name}</strong> for <strong>{formatINR(existingInsiderTx.winnerBid)}</strong> (Confidential Intel Unlocked • No Shares Allotted).
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('normal')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center gap-1 transition shrink-0"
                >
                  Go to Normal Bidding →
                </button>
              </div>
            )}
          </div>

          {/* Section 4 Operating Rule Card */}
          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs text-slate-300 space-y-1.5">
            <span className="text-[11px] font-bold text-purple-300 font-mono uppercase tracking-wider block">
              Rule Book Section 4 Mandate:
            </span>
            <p className="leading-relaxed">
              "The single highest bidder receives exclusive access to the <strong>confidential inside information</strong> revealing whether the stock will rise or fall. <strong>No shares/lots are allotted in the Insider Round</strong> — the winning bid unlocks the secret intelligence. There is <strong>no limitation</strong> on the number of insider rounds a team can win."
            </p>
          </div>

          {/* Award Intel Form */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono">
              <Gavel className="w-4 h-4 text-purple-400" />
              SUBMIT WINNING BID & UNLOCK INTEL
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Select Winner Team */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Winning Team (Single Highest Bidder)
                </label>
                <select
                  value={winnerTeamId}
                  onChange={(e) => setWinnerTeamId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500 font-sans"
                >
                  <option value="">Select Team...</option>
                  {teams.map((t) => {
                    const wins = teamWinsMap[t.id] || 0;
                    return (
                      <option key={t.id} value={t.id}>
                        {t.name} (Intel Wins: {wins}, Cash: {formatINR(t.cash)})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Winning Bid Input */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Winning Bid Amount (Pays for Secret Intel)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-xs">₹</span>
                  <input
                    type="number"
                    step="5000"
                    value={winningBid}
                    onChange={(e) => setWinningBid(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3 py-2 text-xs font-mono font-bold text-slate-100 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Syndicate Insider Wins Tracker (No Limitation) */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-300 font-mono flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-purple-400" />
                  Syndicate Insider Wins Tracker (No Limitation)
                </span>
                <span className="text-slate-500 text-[10px]">
                  Teams may win unlimited insider rounds
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {teams.map(t => {
                  const wins = teamWinsMap[t.id] || 0;
                  return (
                    <div 
                      key={t.id}
                      className={`p-2 rounded-lg border flex items-center justify-between ${
                        wins > 0 
                          ? 'bg-purple-950/30 border-purple-800/60 text-purple-200' 
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                      }`}
                    >
                      <span className="truncate font-sans font-medium text-[11px] mr-1">{t.name}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="font-bold text-purple-300">
                          {wins} {wins === 1 ? 'win' : 'wins'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Bid Increment Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
              <span className="text-[11px] text-slate-500 uppercase font-bold">Quick Presets:</span>
              {[10000, 15000, 20000, 25000, 30000, 40000, 50000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setWinningBid(amt)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold transition"
                >
                  ₹{(amt / 1000)}k
                </button>
              ))}
              <div className="h-4 w-px bg-slate-800 mx-1" />
              <button
                onClick={() => setWinningBid(prev => prev + 5000)}
                className="px-2 py-1 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-800 text-purple-300 font-bold"
              >
                +₹5,000
              </button>
              <button
                onClick={() => setWinningBid(prev => prev + 10000)}
                className="px-2 py-1 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-800 text-purple-300 font-bold"
              >
                +₹10,000
              </button>
            </div>

            {/* Deduct Cash Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setAutoDeduct(!autoDeduct)}
                className="flex items-center gap-2 text-xs font-medium text-slate-300"
              >
                {autoDeduct ? <CheckSquare className="w-4 h-4 text-purple-400" /> : <Square className="w-4 h-4 text-slate-500" />}
                <span>Auto-deduct winning bid ({formatINR(winningBid)}) from winner's cash</span>
              </button>
              <span className="text-[11px] text-slate-400 font-mono">
                {selectedTeamObj ? `Winner Cash After: ${formatINR(selectedTeamObj.cash - (autoDeduct ? winningBid : 0))}` : ''}
              </span>
            </div>

            {/* Execute Button */}
            <div className="pt-2">
              <button
                onClick={handleExecuteIntelBid}
                disabled={!winnerTeamId || winningBid <= 0}
                className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition shadow-xl shadow-purple-600/20 font-mono"
              >
                <Award className="w-5 h-5" />
                CONFIRM WINNING BID & UNLOCK CONFIDENTIAL INTEL
              </button>
            </div>
          </div>

          {/* CONFIDENTIAL INTEL CARD (Unlocked for the Winner) */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                <h4 className="text-sm font-bold text-slate-100 font-mono">
                  CONFIDENTIAL INSIDE INFORMATION
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConfidentialIntel(!showConfidentialIntel)}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {showConfidentialIntel ? 'Hide Intel' : 'Peek / Reveal'}
                </button>
                <button
                  onClick={handleCopyIntel}
                  className="px-3 py-1 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-800 text-xs font-bold flex items-center gap-1.5 transition"
                  title="Copy formatted intel to deliver discreetly to winning team"
                >
                  {copiedIntel ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIntel ? 'Copied!' : 'Copy to Send'}</span>
                </button>
              </div>
            </div>

            {showConfidentialIntel ? (
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-mono">
                    Stock Outcome:
                  </span>
                  <span className={`px-2.5 py-1 rounded-lg font-mono font-black text-xs flex items-center gap-1 ${
                    selectedStock.returnPercent >= 0 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                      : 'bg-red-950 text-red-400 border border-red-800'
                  }`}>
                    {selectedStock.returnPercent >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {selectedStock.returnPercent >= 0 ? `+${selectedStock.returnPercent}% SURGE` : `${selectedStock.returnPercent}% CRASH`}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                  <span className="text-purple-400 font-bold block mb-1">Secret Intelligence Narrative:</span>
                  "{selectedStock.insiderNews || (selectedStock as any).insiderClue}"
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-500 space-y-1">
                <span>Intel hidden to preserve confidentiality during live floor hosting.</span>
                <span className="block text-[11px] text-purple-400">Click "Peek / Reveal" above or award the round to display.</span>
              </div>
            )}

            {/* NEXT STEP BUTTON (Section 4 Mandate) */}
            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('normal')}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition font-mono"
              >
                <Coins className="w-4 h-4" />
                PROCEED TO NORMAL BIDDING FOR {selectedStock.name.toUpperCase()} (OPEN TO ALL TEAMS)
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-slate-500 mt-1.5">
                Rule 4: "Immediately after the Insider Round closes, that same stock is shown again — this time open to every team, including the Insider Round winner, under the normal bidding process."
              </p>
            </div>
          </div>

          {/* Past Insider Transactions */}
          {insiderTransactions.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-purple-400" />
                  Recorded Insider Round Auctions ({insiderTransactions.length})
                </span>
                <span className="text-[11px] text-slate-500">Full audit trail with 1-click Undo</span>
              </div>

              <div className="space-y-2">
                {insiderTransactions.map(tx => {
                  const st = stocks.find(s => s.id === tx.stockId);
                  const winner = teams.find(t => t.id === tx.winnerTeamId);
                  return (
                    <div key={tx.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 text-xs">
                      <div className="text-slate-300 text-[11px]">
                        <span className="text-slate-500 font-mono mr-2">{new Date(tx.timestamp).toLocaleTimeString()}</span>
                        <strong className="text-slate-100">{st?.name}</strong> • Winner: <strong className="text-purple-300">{winner?.name}</strong> • Bid: <strong className="text-amber-400">{formatINR(tx.winnerBid)}</strong> ({tx.winnerLots ? `${tx.winnerLots} lots` : 'Intel only'})
                      </div>
                      <button
                        onClick={() => handleUndoTx(tx.id)}
                        className="px-2 py-1 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 text-[11px] font-bold flex items-center gap-1 transition"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Undo
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rectification Modal */}
      <RectificationModal
        isOpen={isRectifyModalOpen}
        onClose={() => setIsRectifyModalOpen(false)}
        initialTab="lots"
        initialStockId={selectedStock.id}
      />
    </div>
  );
};

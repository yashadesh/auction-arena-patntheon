import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { 
  Coins, 
  Check, 
  AlertTriangle, 
  Search, 
  Sparkles,
  Lock,
  Play,
  Pause,
  RotateCcw,
  CheckSquare,
  Square,
  TrendingUp,
  History,
  ArrowRight,
  Flame,
  Tv,
  Calculator,
  Eye
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';
import { soundFX } from '../utils/soundFX';
import { GavelButton } from './GavelButton';
import { RectificationModal } from './RectificationModal';

export const NormalRoundView: React.FC = () => {
  const { 
    stocks, 
    teams, 
    config, 
    selectedStockId, 
    setSelectedStockId, 
    executeNormalRound,
    normalTransactions,
    revertNormalTransaction,
    revealedMultipliers,
    setActiveTab
  } = useGame();

  const [lotSelections, setLotSelections] = useState<Record<string, number>>({});
  const [customBids, setCustomBids] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [autoDeductMoney, setAutoDeductMoney] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string; lastTxId?: string } | null>(null);
  const [isRectifyModalOpen, setIsRectifyModalOpen] = useState(false);
  const [rectifyTeamId, setRectifyTeamId] = useState<string | undefined>(undefined);

  const categories = ['All', 'Tech', 'Banking & NBFC', 'Energy & Commodities', 'Auto & EV', 'Defense & Infra', 'Pharma & Healthcare', 'Consumer & Retail', 'Fintech & Exchanges'];

  // 30-Second Round Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          const next = prev - 1;
          if (next <= 3 && next > 0) {
            soundFX.playTick();
          } else if (next === 0) {
            soundFX.playBuzzer();
          }
          return next;
        });
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const selectedStock = stocks.find(s => s.id === selectedStockId) || stocks[0];
  const openingBid = selectedStock.openingBidPrice || 10000;
  const isRevealed = !!revealedMultipliers[selectedStock.id];
  const multiplier = 1 + (selectedStock.returnPercent / 100);

  const handleLotChange = (teamId: string, delta: number) => {
    const currentLots = lotSelections[teamId] || 0;
    const newLots = Math.max(0, currentLots + delta);
    setLotSelections(prev => ({
      ...prev,
      [teamId]: newLots
    }));
  };

  const handleSetLotsDirect = (teamId: string, val: number) => {
    const newLots = Math.max(0, val);
    setLotSelections(prev => ({
      ...prev,
      [teamId]: newLots
    }));
  };

  const totalLotsEntered: number = Object.values(lotSelections).reduce<number>((a, b) => a + Number(b), 0);
  
  // Total cost per team
  const getTeamCost = (teamId: string, lots: number) => {
    if (lots <= 0) return 0;
    if (customBids[teamId] && customBids[teamId] > 0) {
      return customBids[teamId];
    }
    return lots * openingBid;
  };

  const totalBaseCost: number = Object.entries(lotSelections).reduce((acc, [tId, lots]) => {
    return acc + getTeamCost(tId, Number(lots));
  }, 0);

  const handleExecute = () => {
    if (totalLotsEntered === 0) {
      setStatusMessage({ type: 'error', text: 'Please enter at least 1 lot for any team before saving allotment.' });
      return;
    }

    // Convert customBids to price per lot for executeNormalRound if custom entered
    const customLotPrices: Record<string, number> = {};
    Object.entries(customBids).forEach(([tId, totalBid]) => {
      const lots = lotSelections[tId] || 0;
      const numBid = typeof totalBid === 'number' ? totalBid : 0;
      if (lots > 0 && numBid > 0) {
        customLotPrices[tId] = Math.round(numBid / lots);
      }
    });

    const res = executeNormalRound(selectedStock.id, lotSelections, autoDeductMoney, customLotPrices);
    if (res.success) {
      soundFX.playGavel();
      const latestTx = normalTransactions[0];
      setStatusMessage({ 
        type: 'success', 
        text: res.message,
        lastTxId: latestTx?.id
      });
      setLotSelections({});
      setCustomBids({});
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const handleQuickUndoLast = (txId: string) => {
    const res = revertNormalTransaction(txId);
    if (res.success) {
      setStatusMessage({ type: 'success', text: `Undone! ${res.message}` });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
    }
  };

  const filteredStocks = stocks.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const currentIndex = stocks.findIndex(s => s.id === selectedStock.id);
  const handlePrevStock = () => {
    if (currentIndex > 0) {
      setSelectedStockId(stocks[currentIndex - 1].id);
      setLotSelections({});
      setCustomBids({});
    }
  };
  const handleNextStock = () => {
    if (currentIndex < stocks.length - 1) {
      setSelectedStockId(stocks[currentIndex + 1].id);
      setLotSelections({});
      setCustomBids({});
    }
  };

  const stockAllotments = normalTransactions.filter(tx => tx.stockId === selectedStock.id);

  return (
    <div className="space-y-6">
      {/* Top Header with 30s Timer & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Coins className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 font-mono uppercase tracking-wide">
              LIVE FLOOR AUCTION (STOCK-BY-STOCK)
            </h2>
            <button
              onClick={() => {
                setRectifyTeamId(undefined);
                setIsRectifyModalOpen(true);
              }}
              className="ml-2 px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-bold flex items-center gap-1.5 transition"
              title="Fix any mistake in shares or cash"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rectify</span>
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Section 3: Starting bid buys 1 lot. Teams can buy as many lots as desired (no lot limitation). All {stocks.length} stocks traversed in sequence.
          </p>
        </div>

        {/* 30-Second Auction Timer Widget */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950 border border-slate-800">
          <div className="px-3 py-0.5 text-center">
            <span className="text-[9px] text-slate-400 uppercase font-bold block">Round Buzzer</span>
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

            <div className="h-5 w-px bg-slate-800 mx-1" />

            <GavelButton
              label="HAMMER"
              size="sm"
              className="bg-amber-500 hover:bg-amber-400"
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
            {statusMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{statusMessage.text}</span>
          </div>

          {statusMessage.type === 'success' && normalTransactions[0] && (
            <button
              onClick={() => handleQuickUndoLast(normalTransactions[0].id)}
              className="px-3 py-1.5 rounded-lg bg-red-900/80 hover:bg-red-800 text-red-200 border border-red-700 text-xs font-bold flex items-center gap-1.5 shrink-0 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Undo This Allotment
            </button>
          )}
        </div>
      )}

      {/* Main Calculation & Allotment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Stock Catalog Navigator */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Stock Catalog ({stocks.length})
            </h3>
            <span className="text-[10px] text-amber-400 font-mono">1 Lot = 20 Shares</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 rounded-lg shrink-0 font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat === 'All' ? 'All' : cat.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="max-h-[440px] overflow-y-auto space-y-1.5 pr-1">
            {filteredStocks.map((st) => {
              const isSelected = st.id === selectedStock.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setSelectedStockId(st.id);
                    setLotSelections({});
                    setCustomBids({});
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 text-slate-100'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="truncate">
                    <span className="text-xs font-bold block truncate text-slate-200">
                      {st.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">
                      {st.ticker} • ₹{st.openingBidPrice.toLocaleString('en-IN')}/lot
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-xs font-mono font-bold block ${st.returnPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {st.returnPercent >= 0 ? `+${st.returnPercent}%` : `${st.returnPercent}%`}
                    </span>
                    <span className="text-[9px] text-slate-500">{(1 + st.returnPercent/100).toFixed(2)}x</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 8 Cols: Stock Spotlight & Bidding Interface */}
        <div className="lg:col-span-8 space-y-4">
          {/* Selected Stock Info Banner with Prev/Next Navigation */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                    {selectedStock.category} • {selectedStock.ticker}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Stock #{currentIndex + 1} of {stocks.length}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1 font-mono">
                  {selectedStock.name}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {/* Prev & Next Stock Navigation */}
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={handlePrevStock}
                    disabled={currentIndex <= 0}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-xs font-bold text-slate-200 transition"
                    title="Previous stock"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={handleNextStock}
                    disabled={currentIndex >= stocks.length - 1}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-xs font-bold text-slate-200 transition"
                    title="Next stock"
                  >
                    Next →
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Starting Bid (1 Lot)</span>
                  <span className="text-base font-black font-mono text-amber-400">
                    ₹{openingBid.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Confusing Public Clue Banner */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] uppercase font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                Public Clue (Contradictory & Confusing on Purpose):
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                "{selectedStock.displayNews}"
              </p>
            </div>

            {/* Lot Ladder Calculator Bar (Rule 3 Demonstration) */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="text-slate-400 font-bold text-[11px]">Bidding Scale (Rule 3):</span>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  1 Lot = <strong className="text-amber-400">{formatINR(openingBid)}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  2 Lots = <strong className="text-amber-400">{formatINR(openingBid * 2)}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  3 Lots = <strong className="text-amber-400">{formatINR(openingBid * 3)}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  4 Lots = <strong className="text-amber-400">{formatINR(openingBid * 4)}</strong>
                </span>
              </div>
            </div>

            {/* Trigger Surprise Insider Round Banner */}
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-center justify-between gap-3">
              <div className="text-xs">
                <span className="font-bold text-purple-300 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-purple-400" />
                  Run as Surprise Insider Round? (Section 4)
                </span>
                <span className="text-[11px] text-slate-400 block">
                  1-winner auction: Winner gets 6 lots guaranteed + confidential intelligence for their winning bid!
                </span>
              </div>
              <button
                onClick={() => setActiveTab('insider')}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition shrink-0 shadow-md"
              >
                <Eye className="w-3.5 h-3.5" />
                Launch Insider Auction
              </button>
            </div>
          </div>

          {/* Allocation & Calculation Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono">
                  <Lock className="w-4 h-4 text-amber-400" />
                  TEAM BIDS & ALLOTMENT INPUT
                </h4>
                <p className="text-[11px] text-slate-400">
                  Bidding ₹{openingBid.toLocaleString('en-IN')} buys 1 lot (20 sh). Enter lots won by each team.
                </p>
              </div>

              {/* Mode Toggle: Auto Deduct vs Manual */}
              <button
                onClick={() => setAutoDeductMoney(!autoDeductMoney)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  autoDeductMoney
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/40'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {autoDeductMoney ? <CheckSquare className="w-4 h-4 text-amber-400" /> : <Square className="w-4 h-4 text-slate-500" />}
                <span>Auto-deduct cash ({autoDeductMoney ? 'ON' : 'OFF'})</span>
              </button>
            </div>

            {/* Teams Input Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2.5">Team</th>
                    <th className="px-3 py-2.5 text-center">Owned</th>
                    <th className="px-3 py-2.5 text-center">Lots Won</th>
                    <th className="px-3 py-2.5 text-right">Calculated Bid Cost</th>
                    <th className="px-3 py-2.5 text-right">Custom Bid (Optional)</th>
                    <th className="px-3 py-2.5 text-right">Available Cash</th>
                    <th className="px-3 py-2.5 text-center">Fix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {teams.map((team) => {
                    const currentHeld = team.holdings[selectedStock.id] || 0;
                    const selectedLots = lotSelections[team.id] || 0;
                    const cost = getTeamCost(team.id, selectedLots);
                    return (
                      <tr key={team.id} className="hover:bg-slate-800/30 transition">
                        <td className="px-3 py-2.5 font-sans font-semibold text-slate-200">
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-2.5 h-2.5 rounded-full shrink-0" 
                              style={{ backgroundColor: team.avatarColor }}
                            />
                            <span>{team.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            currentHeld > 0 ? 'bg-amber-500/10 text-amber-400' : 'text-slate-500'
                          }`}>
                            {currentHeld} lots
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleLotChange(team.id, -1)}
                              disabled={selectedLots <= 0}
                              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 font-bold text-sm flex items-center justify-center transition"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min={0}
                              value={selectedLots}
                              onChange={(e) => handleSetLotsDirect(team.id, parseInt(e.target.value) || 0)}
                              className="w-14 h-7 bg-slate-950 border border-slate-800 rounded-lg text-center font-mono font-bold text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                            />
                            <button
                              onClick={() => handleLotChange(team.id, 1)}
                              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center transition"
                              title="Add 1 lot"
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleLotChange(team.id, 2)}
                              className="px-1.5 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 font-bold"
                              title="Add 2 lots"
                            >
                              +2
                            </button>
                            <button
                              onClick={() => handleLotChange(team.id, 5)}
                              className="px-1.5 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-emerald-400 font-bold"
                              title="Add 5 lots"
                            >
                              +5
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-right text-amber-400 font-bold">
                          {cost > 0 ? formatINR(cost) : '—'}
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <input
                            type="number"
                            placeholder={selectedLots > 0 ? `₹${(selectedLots * openingBid).toLocaleString('en-IN')}` : 'Auto'}
                            value={customBids[team.id] || ''}
                            onChange={(e) => {
                              const v = parseInt(e.target.value) || 0;
                              setCustomBids(prev => ({ ...prev, [team.id]: v }));
                            }}
                            className="w-24 px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-right font-mono text-[11px] text-slate-100 focus:outline-none focus:border-amber-500"
                          />
                        </td>
                        <td className="px-3 py-2.5 text-right text-slate-400">
                          {formatINR(team.cash)}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          <button
                            onClick={() => {
                              setRectifyTeamId(team.id);
                              setIsRectifyModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-700/60 transition"
                            title={`Rectify or overwrite holdings for ${team.name}`}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                Total Lots: <span className="font-bold text-slate-100 font-mono">{totalLotsEntered} lots</span> ({totalLotsEntered * 20} shares)
                {autoDeductMoney && ` • Deducting: ${formatINR(totalBaseCost)}`}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setLotSelections({});
                    setCustomBids({});
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Clear Inputs
                </button>

                <button
                  onClick={handleExecute}
                  disabled={totalLotsEntered === 0}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
                >
                  <Lock className="w-4 h-4" />
                  Save Bids & Allot Shares
                </button>

                {currentIndex < stocks.length - 1 && (
                  <button
                    onClick={handleNextStock}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition border border-slate-700"
                    title="Move to Next Stock per Section 5"
                  >
                    Next Stock
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Past Transactions for This Stock */}
          {stockAllotments.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-amber-400" />
                  Recorded Allotments for {selectedStock.name} ({stockAllotments.length})
                </span>
                <span className="text-[11px] text-slate-500">Mistakes can be undone with 1-click</span>
              </div>

              <div className="space-y-2">
                {stockAllotments.map(tx => (
                  <div key={tx.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                    <div className="text-slate-300 text-[11px]">
                      <span className="text-slate-500 font-mono mr-2">{new Date(tx.timestamp).toLocaleTimeString()}</span>
                      {tx.teamPurchases.map(p => {
                        const t = teams.find(tm => tm.id === p.teamId);
                        return `${t?.name || 'Team'}: ${p.lots} lots (${formatINR(p.amountPaid)})`;
                      }).join(', ')}
                    </div>

                    <button
                      onClick={() => handleQuickUndoLast(tx.id)}
                      className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-[11px] font-bold flex items-center gap-1 transition shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Undo
                    </button>
                  </div>
                ))}
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
        initialTeamId={rectifyTeamId}
        initialStockId={selectedStock.id}
      />
    </div>
  );
};

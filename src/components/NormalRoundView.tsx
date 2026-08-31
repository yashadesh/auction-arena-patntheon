import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { 
  Coins, 
  Check, 
  AlertTriangle, 
  Search, 
  Sparkles,
  Lock,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckSquare,
  Square,
  TrendingUp,
  HelpCircle,
  Gavel
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';
import { soundFX } from '../utils/soundFX';
import { GavelButton } from './GavelButton';

export const NormalRoundView: React.FC = () => {
  const { 
    stocks, 
    teams, 
    config, 
    selectedStockId, 
    setSelectedStockId, 
    executeNormalRound,
    revealedMultipliers,
    toggleRevealMultiplier
  } = useGame();

  const [lotSelections, setLotSelections] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [autoDeductMoney, setAutoDeductMoney] = useState(false); // Default false since user handles money deduction
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
  const isRevealed = !!revealedMultipliers[selectedStock.id];
  const multiplier = 1 + (selectedStock.returnPercent / 100);

  const handleLotChange = (teamId: string, delta: number) => {
    const currentLots = lotSelections[teamId] || 0;
    const currentHolding = teams.find(t => t.id === teamId)?.holdings[selectedStock.id] || 0;
    const maxAdditional = config.maxLotsPerStock - currentHolding;
    
    const newLots = Math.max(0, Math.min(maxAdditional, currentLots + delta));
    setLotSelections(prev => ({
      ...prev,
      [teamId]: newLots
    }));
  };

  const handleSetLotsDirect = (teamId: string, val: number) => {
    const currentHolding = teams.find(t => t.id === teamId)?.holdings[selectedStock.id] || 0;
    const maxAdditional = config.maxLotsPerStock - currentHolding;
    const newLots = Math.max(0, Math.min(maxAdditional, Math.max(0, val)));
    setLotSelections(prev => ({
      ...prev,
      [teamId]: newLots
    }));
  };

  const totalLotsEntered: number = Object.values(lotSelections).reduce<number>((a, b) => a + Number(b), 0);
  const totalBaseCost: number = totalLotsEntered * config.lotBasePrice;

  const handleExecute = () => {
    if (totalLotsEntered === 0) {
      setStatusMessage({ type: 'error', text: 'Please enter at least 1 lot for any team before saving allotment.' });
      return;
    }

    const res = executeNormalRound(selectedStock.id, lotSelections, autoDeductMoney);
    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setLotSelections({});
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
      {/* Top Header with 30s Timer */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Coins className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 font-mono">
              STOCK ALLOTMENT & CALCULATOR
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Select stock → Record lots shared with Team A through Team H → Instant portfolio calculation.
          </p>
        </div>

        {/* 30-Second Auction Timer Widget */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950 border border-slate-800">
          <div className="px-3 py-0.5 text-center">
            <span className="text-[9px] text-slate-400 uppercase font-bold block">30s Timer</span>
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
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300' 
            : 'bg-red-950/80 border border-red-800 text-red-300'
        }`}>
          {statusMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {statusMessage.text}
        </div>
      )}

      {/* Main Calculation & Allotment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Stock Picker */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Stock ({stocks.length})
            </h3>
            <span className="text-[10px] text-amber-400 font-mono">1 Lot = 20 Shares</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
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
                      {st.ticker} • {st.category}
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

        {/* Right 8 Cols: Stock Info & Allotment Entry */}
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
                  <span className="text-[10px] text-slate-500 block">Base Price</span>
                  <span className="text-sm font-bold font-mono text-amber-400">₹10,000 / lot</span>
                </div>
                <div className="text-right border-l border-slate-800 pl-3">
                  <span className="text-[10px] text-slate-500 block">Return</span>
                  <span className={`text-sm font-bold font-mono ${selectedStock.returnPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {selectedStock.returnPercent >= 0 ? `+${selectedStock.returnPercent}%` : `${selectedStock.returnPercent}%`} ({multiplier.toFixed(2)}x)
                  </span>
                </div>
              </div>
            </div>

            {/* Public Clue */}
            <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
              <span className="text-amber-400 font-bold mr-2">Market Clue:</span>
              "{selectedStock.displayNews}"
            </div>
          </div>

          {/* Allocation & Calculation Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono">
                  <Lock className="w-4 h-4 text-amber-400" />
                  TEAM ALLOTMENT & SHARES INPUT
                </h4>
                <p className="text-[11px] text-slate-400">
                  Enter how many lots each team received (1 lot = 20 shares).
                </p>
              </div>

              {/* Mode Toggle: Auto Deduct vs Just Store Shares */}
              <button
                onClick={() => setAutoDeductMoney(!autoDeductMoney)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  autoDeductMoney
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/40'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {autoDeductMoney ? <CheckSquare className="w-4 h-4 text-amber-400" /> : <Square className="w-4 h-4 text-slate-500" />}
                <span>Auto-deduct cash ({autoDeductMoney ? 'ON' : 'OFF - Manual'})</span>
              </button>
            </div>

            {/* Teams Input Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2.5">Team</th>
                    <th className="px-3 py-2.5 text-center">Current Owned</th>
                    <th className="px-3 py-2.5 text-center">Add Lots</th>
                    <th className="px-3 py-2.5 text-right">Base Cost</th>
                    <th className="px-3 py-2.5 text-right">Calculated Final Value</th>
                    <th className="px-3 py-2.5 text-right">Current Cash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {teams.map((team) => {
                    const currentHeld = team.holdings[selectedStock.id] || 0;
                    const selectedLots = lotSelections[team.id] || 0;
                    const cost = selectedLots * config.lotBasePrice;
                    const totalAfterLots = currentHeld + selectedLots;
                    const calculatedStockValue = totalAfterLots * config.lotBasePrice * multiplier;
                    const maxAdd = config.maxLotsPerStock - currentHeld;

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
                            {currentHeld} lots ({currentHeld * 20} sh)
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
                              max={maxAdd}
                              value={selectedLots}
                              onChange={(e) => handleSetLotsDirect(team.id, parseInt(e.target.value) || 0)}
                              className="w-12 h-7 bg-slate-950 border border-slate-800 rounded-lg text-center font-mono font-bold text-slate-100 text-xs focus:outline-none focus:border-amber-500"
                            />
                            <button
                              onClick={() => handleLotChange(team.id, 1)}
                              disabled={selectedLots >= maxAdd}
                              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 font-bold text-sm flex items-center justify-center transition"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-right text-amber-400 font-bold">
                          {cost > 0 ? formatINR(cost) : '—'}
                        </td>
                        <td className="px-3 py-2.5 text-right font-bold text-slate-200">
                          {totalAfterLots > 0 ? formatINR(calculatedStockValue) : '—'}
                        </td>
                        <td className="px-3 py-2.5 text-right text-slate-400">
                          {formatINR(team.cash)}
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
                Total Lots to Save: <span className="font-bold text-slate-100 font-mono">{totalLotsEntered} lots</span> ({totalLotsEntered * 20} shares)
                {autoDeductMoney && ` • Deducting: ${formatINR(totalBaseCost)}`}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setLotSelections({})}
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
                  Save Allotment & Update Calculations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

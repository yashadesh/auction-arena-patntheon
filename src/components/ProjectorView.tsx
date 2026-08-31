import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { 
  TrendingUp, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Award, 
  Coins, 
  Eye, 
  Sparkles, 
  Maximize2,
  Tv,
  Volume2,
  Gavel
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';
import { soundFX } from '../utils/soundFX';
import { GavelButton } from './GavelButton';

export const ProjectorView: React.FC = () => {
  const { 
    config, 
    stocks, 
    selectedStockId, 
    valuations, 
    activeTab 
  } = useGame();

  const selectedStock = stocks.find(s => s.id === selectedStockId) || stocks[0];

  // Live Auction Buzzer Timer (Default 30 seconds)
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timerSeconds > 0) {
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
    } else if (timerSeconds === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between space-y-6">
      {/* Top Projector Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/50 border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <TrendingUp className="w-7 h-7 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-wider">
              {config.eventName}
            </h1>
            <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest">
              {config.clubName} • LIVE TRADING FLOOR ARENA
            </p>
          </div>
        </div>

        {/* Live Timer Control Widget */}
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="px-4 py-1 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Round Buzzer</span>
            <span className={`text-2xl sm:text-3xl font-black font-mono tracking-widest ${
              timerSeconds <= 10 && timerSeconds > 0 
                ? 'text-red-400 animate-pulse' 
                : timerSeconds === 0 
                ? 'text-red-500 font-extrabold' 
                : 'text-amber-400'
            }`}>
              {formatTimer(timerSeconds)}
            </span>
          </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-md"
                title={isRunning ? 'Pause Timer' : 'Start Timer'}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setIsRunning(false);
                  setTimerSeconds(30);
                }}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-xs font-bold"
                title="Reset to 30s"
              >
                <RotateCcw className="w-4 h-4 inline mr-1" />
                30s
              </button>
              <button
                onClick={() => setTimerSeconds(prev => prev + 10)}
                className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
                title="Add 10 seconds"
              >
                +10s
              </button>

              <div className="h-6 w-px bg-slate-800 mx-1" />

              <GavelButton
                label="HAMMER (SOLD!)"
                size="sm"
                className="bg-amber-500 hover:bg-amber-400 shadow-amber-500/20"
              />
            </div>
        </div>
      </div>

      {/* Main Floor Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left 7 Cols: Active Floor Clue & Auction Spotlight */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex-1 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider font-mono">
                  {selectedStock.category} • {selectedStock.ticker}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Lot: 20 Shares @ ₹{config.lotBasePrice.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="mt-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Current Stock on Floor
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-mono mt-1">
                  {selectedStock.name}
                </h2>
              </div>
            </div>

            {/* Display News Banner */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3 shadow-inner">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Public Market Intelligence & Clues
              </div>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans font-medium">
                "{selectedStock.displayNews}"
              </p>
            </div>

            {/* Floor Rules / Constraints Pill Row */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase">Base Lot Price</span>
                <span className="font-bold text-amber-400 text-sm">₹10,000</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase">Max Holding</span>
                <span className="font-bold text-slate-200 text-sm">8 Lots (160 Sh)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase">Insider Opening</span>
                <span className="font-bold text-blue-400 text-sm">₹{selectedStock.openingBidPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Real-Time Floor Leaderboard */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2 font-mono">
              <Award className="w-5 h-5 text-amber-400" />
              LIVE STANDINGS LEADERBOARD
            </h3>
            <span className="text-xs text-slate-400 font-mono">{valuations.length} Teams</span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto max-h-[500px] pr-1">
            {valuations.map((v) => {
              const isTop1 = v.rank === 1;
              const isTop2 = v.rank === 2;
              const isTop3 = v.rank === 3;

              return (
                <div
                  key={v.team.id}
                  className={`p-3 rounded-xl border transition flex items-center justify-between ${
                    isTop1
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/5'
                      : isTop2
                      ? 'bg-slate-800/40 border-slate-700'
                      : isTop3
                      ? 'bg-slate-800/20 border-slate-800'
                      : 'bg-slate-950/60 border-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-black flex items-center justify-center ${
                        isTop1
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : isTop2
                          ? 'bg-slate-300 text-slate-950 font-bold'
                          : isTop3
                          ? 'bg-amber-800 text-amber-100 font-bold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {v.rank}
                    </span>

                    <div>
                      <span className="text-sm font-bold text-slate-100 block">
                        {v.team.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Cash: {formatINR(v.cashInHand)} • {v.totalLotsHeld} Lots
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-slate-100 block">
                      {formatINR(v.netWorth)}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${v.roiPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatPercent(v.roiPercent)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
            Finance Club • BIT Mesra Trading Floor Simulation
          </div>
        </div>
      </div>
    </div>
  );
};

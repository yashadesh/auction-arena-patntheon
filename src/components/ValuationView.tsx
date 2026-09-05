import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { 
  Award, 
  Trophy, 
  Sparkles, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  FileSpreadsheet, 
  ChevronDown, 
  ChevronUp, 
  Coins, 
  ShieldAlert, 
  Printer, 
  Copy, 
  Check,
  RotateCcw,
  CheckCircle2,
  Table
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatINR, formatPercent } from '../utils/formatters';
import { exportValuationSummaryCSV } from '../utils/exportValuationCSV';
import { soundFX } from '../utils/soundFX';
import { GavelButton } from './GavelButton';
import { RectificationModal } from './RectificationModal';

interface ValuationViewProps {
  onSelectTeam: (teamId: string) => void;
}

export const ValuationView: React.FC<ValuationViewProps> = ({ onSelectTeam }) => {
  const { 
    teams, 
    stocks, 
    config, 
    valuations, 
    revealedMultipliers, 
    toggleRevealMultiplier, 
    revealAllMultipliers, 
    hideAllMultipliers 
  } = useGame();

  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
  const [copiedAnnouncement, setCopiedAnnouncement] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isRectifyModalOpen, setIsRectifyModalOpen] = useState(false);

  const winner = valuations.length > 0 ? valuations[0] : null;
  const runnerUp = valuations.length > 1 ? valuations[1] : null;
  const thirdPlace = valuations.length > 2 ? valuations[2] : null;

  const allRevealed = stocks.every(s => revealedMultipliers[s.id]);
  const someRevealed = Object.values(revealedMultipliers).some(Boolean);

  const fireWinnerCelebration = () => {
    soundFX.playChime();
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  useEffect(() => {
    if (allRevealed && winner) {
      fireWinnerCelebration();
    }
  }, [allRevealed]);

  // Export comprehensive downloadable CSV file for organizers
  const handleExportCSV = () => {
    soundFX.playBid();
    exportValuationSummaryCSV(valuations, stocks, config);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleCopyAnnouncement = () => {
    if (!winner) return;
    const text = `🏆 OFFICIAL RESULTS ANNOUNCEMENT - ${config.eventName.toUpperCase()}:
🥇 WINNER & CHAMPION: ${winner.team.name} with a Final Net Worth of ${formatINR(winner.netWorth)} (${formatPercent(winner.roiPercent)} ROI)!
${runnerUp ? `🥈 2nd Place: ${runnerUp.team.name} with ${formatINR(runnerUp.netWorth)}\n` : ''}${thirdPlace ? `🥉 3rd Place: ${thirdPlace.team.name} with ${formatINR(thirdPlace.netWorth)}\n` : ''}
Congratulations to all participating trading syndicates!
Organized by: ${config.clubName}`;

    navigator.clipboard.writeText(text);
    setCopiedAnnouncement(true);
    soundFX.playBid();
    setTimeout(() => setCopiedAnnouncement(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Multiplier Reveal Controls */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-6 h-6" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono tracking-tight">
              FINAL EVALUATION & WINNER (SECTION 6)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Section 6 Formula: <code className="text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono font-bold">Final Value = Cash remaining + Value of all shares held (after outcomes are applied)</code>.
            Once every stock on the list has been through its round, hidden outcomes are revealed all at once.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {allRevealed ? (
            <button
              onClick={hideAllMultipliers}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
            >
              <EyeOff className="w-4 h-4" />
              Hide Multipliers
            </button>
          ) : (
            <button
              onClick={() => {
                revealAllMultipliers();
                fireWinnerCelebration();
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4" />
              Reveal All Return Multipliers
            </button>
          )}

          <button
            onClick={handleExportCSV}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
              downloadSuccess
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            }`}
            title="Download complete audited CSV file with Master Leaderboard, Team Portfolios, and Multipliers"
          >
            {downloadSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <Download className="w-4 h-4 text-emerald-400" />
            )}
            <span>{downloadSuccess ? 'CSV Exported!' : 'Export Organizers CSV'}</span>
          </button>

          <button
            onClick={handleCopyAnnouncement}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
            title="Copy announcement speech"
          >
            {copiedAnnouncement ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
            {copiedAnnouncement ? 'Copied Speech!' : 'Copy Script'}
          </button>

          <button
            onClick={() => setIsRectifyModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-bold flex items-center gap-1.5 border border-red-800 transition"
            title="Rectify selection or counting mistakes in portfolios or undo past rounds"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Rectify Mistake</span>
          </button>

          <GavelButton size="sm" label="Final Hammer" />
        </div>
      </div>

      {/* Winner Podium Showcase (Top 3) */}
      {winner && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 2nd Place */}
          {runnerUp && (
            <div 
              onClick={() => onSelectTeam(runnerUp.team.id)}
              className="order-2 md:order-1 p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/60 shadow-lg relative cursor-pointer hover:border-slate-500 transition"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-slate-700 text-slate-200 font-black text-sm flex items-center justify-center border border-slate-600">
                  2
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">RUNNER-UP</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mt-3 truncate">{runnerUp.team.name}</h3>
              <div className="mt-2">
                <span className="text-xs text-slate-400 block">Final Net Worth</span>
                <span className="text-xl font-bold font-mono text-slate-100">
                  {formatINR(runnerUp.netWorth)}
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Cash: <strong className="text-slate-300 font-mono">{formatINR(runnerUp.cashInHand)}</strong></span>
                <span className={runnerUp.overallPnl >= 0 ? 'text-emerald-400 font-mono font-bold' : 'text-red-400 font-mono font-bold'}>
                  {formatPercent(runnerUp.roiPercent)}
                </span>
              </div>
            </div>
          )}

          {/* 1st Place Champion */}
          <div 
            onClick={() => onSelectTeam(winner.team.id)}
            className="order-1 md:order-2 p-6 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-2 border-amber-500/80 shadow-2xl shadow-amber-500/10 relative cursor-pointer hover:border-amber-400 transition"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              CHAMPION
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg shadow-amber-500/30">
                1
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-400 font-mono">WOLF OF BIT MESRA</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-100 mt-3 truncate">{winner.team.name}</h3>
            <div className="mt-3">
              <span className="text-xs text-amber-300/80 block">Champion Net Worth</span>
              <span className="text-3xl font-extrabold font-mono text-amber-400">
                {formatINR(winner.netWorth)}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span>Cash: <strong className="text-slate-100 font-mono">{formatINR(winner.cashInHand)}</strong></span>
              <span className="font-mono font-extrabold text-emerald-400">
                {formatPercent(winner.roiPercent)} ROI
              </span>
            </div>
          </div>

          {/* 3rd Place */}
          {thirdPlace && (
            <div 
              onClick={() => onSelectTeam(thirdPlace.team.id)}
              className="order-3 md:order-3 p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-900/40 shadow-lg relative cursor-pointer hover:border-amber-800 transition"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-amber-900/60 text-amber-300 font-black text-sm flex items-center justify-center border border-amber-800/60">
                  3
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">3RD PLACE</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mt-3 truncate">{thirdPlace.team.name}</h3>
              <div className="mt-2">
                <span className="text-xs text-slate-400 block">Final Net Worth</span>
                <span className="text-xl font-bold font-mono text-slate-100">
                  {formatINR(thirdPlace.netWorth)}
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Cash: <strong className="text-slate-300 font-mono">{formatINR(thirdPlace.cashInHand)}</strong></span>
                <span className={thirdPlace.overallPnl >= 0 ? 'text-emerald-400 font-mono font-bold' : 'text-red-400 font-mono font-bold'}>
                  {formatPercent(thirdPlace.roiPercent)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interactive Stock Multiplier Reveal Board */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Stock Multiplier Reveal Board (Table 1 Valuation Factors)
            </h3>
            <p className="text-[11px] text-slate-400">
              Click individual stocks below to dramatically reveal their final price return % and lot multiplier to the trading floor.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {Object.values(revealedMultipliers).filter(Boolean).length} / {stocks.length} Revealed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-56 overflow-y-auto pr-1">
          {stocks.map(stock => {
            const isRevealed = !!revealedMultipliers[stock.id];
            const multiplier = 1 + (stock.returnPercent / 100);
            const lotValue = config.lotBasePrice * multiplier;

            return (
              <button
                key={stock.id}
                onClick={() => toggleRevealMultiplier(stock.id)}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  isRevealed
                    ? stock.returnPercent >= 0
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-slate-100'
                      : 'bg-red-950/40 border-red-500/40 text-slate-100'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/80 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase truncate">
                    {stock.ticker}
                  </span>
                  {isRevealed ? (
                    <Eye className="w-3 h-3 text-slate-300" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-slate-500" />
                  )}
                </div>

                <div className="text-xs font-bold truncate text-slate-200">
                  {stock.name}
                </div>

                <div className="mt-1.5 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                  {isRevealed ? (
                    <>
                      <span className={`font-bold ${stock.returnPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stock.returnPercent >= 0 ? `+${stock.returnPercent}%` : `${stock.returnPercent}%`}
                      </span>
                      <span className="text-slate-300 font-semibold">
                        ₹{(lotValue / 1000).toFixed(1)}k/lot
                      </span>
                    </>
                  ) : (
                    <span className="text-slate-500 italic text-[10px]">Click to Reveal</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Master Calculations Leaderboard Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Master Calculation Leaderboard & Team Balance Sheets
          </h3>
          <span className="text-xs text-slate-500">
            Tie-breakers applied: (1) Higher Cash, (2) Fewer Stocks Held
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">Rank</th>
                  <th className="px-4 py-3.5">Team Syndicate</th>
                  <th className="px-4 py-3.5 text-right">Cash in Hand</th>
                  <th className="px-4 py-3.5 text-right">Base Invested</th>
                  <th className="px-4 py-3.5 text-right">Portfolio Value</th>
                  <th className="px-4 py-3.5 text-right">Penalties / Bonus</th>
                  <th className="px-4 py-3.5 text-right">Final Net Worth</th>
                  <th className="px-4 py-3.5 text-right">Total Net P&L</th>
                  <th className="px-4 py-3.5 text-right">ROI %</th>
                  <th className="px-4 py-3.5 text-center">Breakdown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {valuations.map((v) => {
                  const isExpanded = expandedTeamId === v.team.id;
                  const isTop1 = v.rank === 1;
                  const isTop2 = v.rank === 2;
                  const isTop3 = v.rank === 3;

                  return (
                    <React.Fragment key={v.team.id}>
                      <tr 
                        className={`hover:bg-slate-800/40 transition cursor-pointer ${
                          isExpanded ? 'bg-slate-800/30' : ''
                        }`}
                        onClick={() => setExpandedTeamId(isExpanded ? null : v.team.id)}
                      >
                        <td className="px-4 py-3 font-mono font-bold">
                          <span
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                              isTop1
                                ? 'bg-amber-500 text-slate-950 font-extrabold'
                                : isTop2
                                ? 'bg-slate-300 text-slate-950 font-bold'
                                : isTop3
                                ? 'bg-amber-800 text-amber-200 font-bold'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {v.rank}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-200">
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-3 h-3 rounded-full shrink-0" 
                              style={{ backgroundColor: v.team.avatarColor }}
                            />
                            <span className="font-bold">{v.team.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-slate-300">
                          {formatINR(v.cashInHand)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-slate-400">
                          {formatINR(v.totalBaseInvested)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-slate-200">
                          {formatINR(v.totalPortfolioValue)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-slate-400">
                          {(v.team.penalties || v.team.bonus) ? (
                            <span>
                              {v.team.penalties > 0 && <span className="text-red-400">-{formatINR(v.team.penalties)} </span>}
                              {v.team.bonus > 0 && <span className="text-emerald-400">+{formatINR(v.team.bonus)}</span>}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-extrabold text-sm">
                          <span className={v.overallPnl >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {formatINR(v.netWorth)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold">
                          <span className={v.overallPnl >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {v.overallPnl >= 0 ? `+${formatINR(v.overallPnl)}` : formatINR(v.overallPnl)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold">
                          <span className={`px-2 py-0.5 rounded text-[11px] ${
                            v.roiPercent >= 0 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {formatPercent(v.roiPercent)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedTeamId(isExpanded ? null : v.team.id);
                            }}
                            className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Detailed Holdings Balance Sheet */}
                      {isExpanded && (
                        <tr className="bg-slate-950/90 border-b border-slate-800">
                          <td colSpan={10} className="p-4 sm:p-6">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                                  <span>Portfolio Ledger for {v.team.name}</span>
                                  <span className="text-slate-400 font-normal">
                                    ({v.totalLotsHeld} lots • {v.distinctStocksCount} distinct companies)
                                  </span>
                                </h4>

                                <button
                                  onClick={() => onSelectTeam(v.team.id)}
                                  className="text-xs text-amber-400 hover:underline font-medium"
                                >
                                  Edit Penalties & Profile →
                                </button>
                              </div>

                              {v.holdingsBreakdown.length === 0 ? (
                                <div className="p-4 rounded-xl bg-slate-900 text-center text-xs text-slate-500">
                                  No stock holdings acquired. All net worth remains in cash.
                                </div>
                              ) : (
                                <div className="overflow-x-auto">
                                  <table className="w-full text-xs text-left bg-slate-900/80 rounded-xl overflow-hidden border border-slate-800">
                                    <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                                      <tr>
                                        <th className="px-3 py-2">Stock</th>
                                        <th className="px-3 py-2 text-center">Lots (Shares)</th>
                                        <th className="px-3 py-2 text-right">Purchase Price (Base)</th>
                                        <th className="px-3 py-2 text-right">Return %</th>
                                        <th className="px-3 py-2 text-right">Calculated Return</th>
                                        <th className="px-3 py-2 text-right">Final Portfolio Value</th>
                                        <th className="px-3 py-2 text-right">Net P&L</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/60">
                                      {v.holdingsBreakdown.map((h) => (
                                        <tr key={h.stock.id} className="hover:bg-slate-800/40">
                                          <td className="px-3 py-2">
                                            <span className="font-bold text-slate-200">{h.stock.name}</span>
                                            <span className="text-[10px] text-slate-500 font-mono ml-1.5">({h.stock.ticker})</span>
                                          </td>
                                          <td className="px-3 py-2 text-center font-mono text-slate-300">
                                            {h.lots} lots ({h.shares} sh)
                                          </td>
                                          <td className="px-3 py-2 text-right font-mono text-slate-300 font-bold">
                                            {formatINR(h.baseCost)}
                                          </td>
                                          <td className="px-3 py-2 text-right font-mono font-bold">
                                            <span className={h.returnPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                                              {h.returnPercent >= 0 ? `+${h.returnPercent}%` : `${h.returnPercent}%`}
                                            </span>
                                          </td>
                                          <td className="px-3 py-2 text-right font-mono font-semibold">
                                            <span className={h.returnAmount >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                                              {h.returnAmount >= 0 ? `+${formatINR(h.returnAmount)}` : formatINR(h.returnAmount)}
                                            </span>
                                            <span className="block text-[10px] text-slate-500">
                                              ({h.returnPercent}% of {formatINR(h.baseCost)})
                                            </span>
                                          </td>
                                          <td className="px-3 py-2 text-right font-mono font-bold text-amber-300">
                                            {formatINR(h.holdingValue)}
                                          </td>
                                          <td className="px-3 py-2 text-right font-mono font-bold">
                                            <span className={h.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                                              {h.pnl >= 0 ? `+${formatINR(h.pnl)}` : formatINR(h.pnl)}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Rectification Modal */}
      <RectificationModal
        isOpen={isRectifyModalOpen}
        onClose={() => setIsRectifyModalOpen(false)}
        initialTab="portfolio"
      />
    </div>
  );
};

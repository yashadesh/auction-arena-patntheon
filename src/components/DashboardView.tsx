import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  TrendingUp, 
  Coins, 
  Eye, 
  ArrowLeftRight, 
  Award, 
  Layers, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  Tv,
  Download,
  FileSpreadsheet,
  RotateCcw
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';
import { exportValuationSummaryCSV } from '../utils/exportValuationCSV';
import { GavelButton } from './GavelButton';
import { RectificationModal } from './RectificationModal';

interface DashboardViewProps {
  onSelectTeam: (teamId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectTeam }) => {
  const { 
    teams, 
    stocks, 
    config, 
    valuations, 
    setActiveTab, 
    normalTransactions, 
    insiderTransactions, 
    insiderNewsTransactions,
    exchangeTransactions 
  } = useGame();

  const [csvDownloaded, setCsvDownloaded] = useState(false);
  const [isRectifyModalOpen, setIsRectifyModalOpen] = useState(false);

  const handleExport = () => {
    exportValuationSummaryCSV(valuations, stocks, config);
    setCsvDownloaded(true);
    setTimeout(() => setCsvDownloaded(false), 2500);
  };

  const totalLotsCirculating = teams.reduce((acc, t) => {
    return acc + Object.values(t.holdings).reduce((hAcc: number, lots) => hAcc + Number(lots), 0);
  }, 0);

  const totalCash = teams.reduce((acc, t) => acc + t.cash, 0);
  const totalEconomyWealth = valuations.reduce((acc, v) => acc + v.netWorth, 0);

  // Find most popular stock
  const stockHoldingCounts: Record<string, number> = {};
  teams.forEach(t => {
    Object.entries(t.holdings).forEach(([sId, lots]) => {
      stockHoldingCounts[sId] = (stockHoldingCounts[sId] || 0) + Number(lots);
    });
  });

  let topStockName = 'None';
  let topStockLots = 0;
  Object.entries(stockHoldingCounts).forEach(([sId, lots]) => {
    if (lots > topStockLots) {
      topStockLots = lots;
      const found = stocks.find(s => s.id === sId);
      if (found) topStockName = found.name;
    }
  });

  const allActivity = [
    ...normalTransactions.map(tx => {
      const stock = stocks.find(s => s.id === tx.stockId);
      const totalLots = tx.teamPurchases.reduce((a, b) => a + b.lots, 0);
      const totalPaid = tx.teamPurchases.reduce((a, b) => a + b.amountPaid, 0);
      return {
        id: tx.id,
        timestamp: tx.timestamp,
        type: 'Normal Round',
        icon: Coins,
        color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        text: `Allocated ${totalLots} lots (${totalLots * 20} shares) of ${stock?.name || 'Stock'} across ${tx.teamPurchases.length} teams for ${formatINR(totalPaid)}.`
      };
    }),
    ...insiderNewsTransactions.map(tx => {
      const stock = stocks.find(s => s.id === tx.stockId);
      const winner = teams.find(t => t.id === tx.winnerTeamId);
      return {
        id: tx.id,
        timestamp: tx.timestamp,
        type: 'Insider News Auction',
        icon: Eye,
        color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
        text: `${winner?.name || 'Winner'} won confidential Insider News for ${stock?.name || 'Stock'} for ${formatINR(tx.bidAmount)}${tx.deductCash ? ' (cash deducted)' : ''}.`
      };
    }),
    ...insiderTransactions.map(tx => {
      const stock = stocks.find(s => s.id === tx.stockId);
      const winner = teams.find(t => t.id === tx.winnerTeamId);
      const hasLots = !!tx.winnerLots && tx.winnerLots > 0;
      return {
        id: tx.id,
        timestamp: tx.timestamp,
        type: hasLots ? 'Insider Round (Lots + Intel)' : 'Insider Round (Intel)',
        icon: TrendingUp,
        color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
        text: hasLots 
          ? `${winner?.name || 'Winner'} won ${tx.winnerLots} lots (${tx.winnerLots * 20} sh) of ${stock?.name || 'Stock'} at ${formatINR(tx.winnerBid)} (includes confidential intel).`
          : `${winner?.name || 'Winner'} won confidential insider intel for ${stock?.name || 'Stock'} for ${formatINR(tx.winnerBid)} (no shares allotted).`
      };
    }),
    ...exchangeTransactions.map(tx => {
      const stock = stocks.find(s => s.id === tx.stockId);
      const seller = teams.find(t => t.id === tx.sellerTeamId);
      const buyer = teams.find(t => t.id === tx.buyerTeamId);
      return {
        id: tx.id,
        timestamp: tx.timestamp,
        type: 'Exchange Trade',
        icon: ArrowLeftRight,
        color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
        text: `${seller?.name || 'Seller'} sold 1 lot of ${stock?.name || 'Stock'} to ${buyer?.name || 'Buyer'} for ${formatINR(tx.finalPrice)}.`
      };
    })
  ].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-6">
      {/* Hero Banner with BIT Mesra Finance Club theme */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 sm:p-8">
        <div className="absolute right-0 top-0 w-96 h-full opacity-10 pointer-events-none flex items-center justify-center">
          <TrendingUp className="w-80 h-80 text-amber-500" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Live Trading Floor Operating System
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
            {config.eventName} — Auctioneer Hub
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Welcome to the official calculation and execution engine for {config.clubName}. Track real-time cash, mystery stock purchases, insider information bids, exchange transactions, and compute instantaneous final portfolio valuations with zero manual errors.
          </p>

          {/* Quick Round Navigation CTA Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('normal')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
            >
              <Coins className="w-4 h-4" />
              Live Floor (Stock-by-Stock)
            </button>
            <button
              onClick={() => setActiveTab('insider')}
              className="px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 font-semibold text-xs flex items-center gap-2 border border-purple-700 transition"
            >
              <Eye className="w-4 h-4 text-purple-400" />
              The Insider Round (Secret Intel)
            </button>
            <button
              onClick={() => setActiveTab('exchange')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition"
            >
              <ArrowLeftRight className="w-4 h-4 text-amber-400" />
              P2P Trading Floor
            </button>
            <button
              onClick={() => setActiveTab('valuation')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition"
            >
              <Award className="w-4 h-4" />
              Final Evaluation & Winner
            </button>
            <button
              onClick={() => setActiveTab('projector')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-2 border border-slate-800 transition"
            >
              <Tv className="w-4 h-4 text-amber-400" />
              Arena Projector (30s)
            </button>

            <button
              onClick={() => setIsRectifyModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 font-bold text-xs flex items-center gap-2 transition"
              title="Rectify selection or counting mistakes"
            >
              <RotateCcw className="w-4 h-4" />
              Rectify Mistake
            </button>

            <button
              onClick={handleExport}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
                csvDownloaded
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800'
              }`}
              title="Download full valuation summary CSV for organizers"
            >
              {csvDownloaded ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-emerald-400" />}
              <span>{csvDownloaded ? 'CSV Exported' : 'Export CSV'}</span>
            </button>

            <GavelButton
              label="HAMMER"
              size="sm"
              className="bg-amber-500 hover:bg-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Liquid Cash</span>
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-100 mt-2">
            {formatINR(totalCash)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Across {teams.length} participating teams
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Lots in Play</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-100 mt-2">
            {totalLotsCirculating} Lots
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {totalLotsCirculating * config.lotSize} total shares distributed
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Economy Wealth</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-2">
            {formatINR(totalEconomyWealth)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Cash + current portfolio valuations
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Most Acquired Stock</span>
            <Briefcase className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-sm font-bold text-slate-100 truncate mt-2">
            {topStockName}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {topStockLots > 0 ? `${topStockLots} lots (${topStockLots * 20} shares)` : 'No holdings yet'}
          </span>
        </div>
      </div>

      {/* Main Grid: Live Standings + Game Flow & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Real-Time Standings Board */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Live Team Net Worth Standings
            </h2>
            <button
              onClick={() => setActiveTab('valuation')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              Full Calculation Matrix →
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Rank</th>
                    <th className="px-4 py-3">Team Name</th>
                    <th className="px-4 py-3 text-right">Cash in Hand</th>
                    <th className="px-4 py-3 text-right">Portfolio Value</th>
                    <th className="px-4 py-3 text-right">Estimated Net Worth</th>
                    <th className="px-4 py-3 text-center">Lots</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {valuations.map((v) => {
                    const isTop1 = v.rank === 1;
                    const isTop2 = v.rank === 2;
                    const isTop3 = v.rank === 3;

                    return (
                      <tr 
                        key={v.team.id}
                        className="hover:bg-slate-800/40 transition cursor-pointer"
                        onClick={() => onSelectTeam(v.team.id)}
                      >
                        <td className="px-4 py-3 font-mono font-bold">
                          <span
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                              isTop1
                                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                                : isTop2
                                ? 'bg-slate-300 text-slate-950 font-bold'
                                : isTop3
                                ? 'bg-amber-700/60 text-amber-200 font-bold'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {v.rank}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-200">
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ backgroundColor: v.team.avatarColor }}
                            />
                            <span>{v.team.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-slate-300">
                          {formatINR(v.cashInHand)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-slate-300">
                          {formatINR(v.totalPortfolioValue)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold">
                          <span className={v.overallPnl >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {formatINR(v.netWorth)}
                          </span>
                          <span className="text-[10px] text-slate-500 block font-normal">
                            {formatPercent(v.roiPercent)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-mono">
                          <div className="text-slate-300 font-bold">{v.totalLotsHeld} lots</div>
                          <div className="flex items-center justify-center gap-1 mt-0.5">
                            <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans font-bold ${
                              v.isDisqualified 
                                ? 'bg-red-950/80 text-red-400 border border-red-800' 
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {v.distinctStocksCount} stocks {v.isDisqualified ? '⚠️ Disqualified' : '✓'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTeam(v.team.id);
                            }}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Round Workflow Guide */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Auction Simulation Rules & Flow
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2 font-bold text-amber-400 mb-1">
                  <Coins className="w-4 h-4" />
                  1. Normal Round (Rule 3)
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Revealed clues shown. Starting bid buys 1 lot. Bidding higher buys more lots at once. Open to every team.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2 font-bold text-purple-400 mb-1">
                  <Eye className="w-4 h-4" />
                  2. The Insider Round (Rules 4 & 8)
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  1-winner auction. Winning bid buys confidential inside intelligence (0 lots allotted). Same stock immediately reopens for normal bidding open to all teams. No limit on wins.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
                  <Award className="w-4 h-4" />
                  3. Portfolio & Valuation (Rules 6 & 7)
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Must hold 6 to 9 distinct stocks (disqualified otherwise). Outcomes revealed simultaneously: Cash + Shares Value = Net Worth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Live Floor Activity Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              Live Trade Ledger
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRectifyModalOpen(true)}
                className="px-2 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 text-[11px] font-bold flex items-center gap-1 transition"
                title="Undo transaction or rectify portfolio"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Undo / Rectify</span>
              </button>
              <span className="text-xs text-slate-500 font-mono">
                {allActivity.length} Events
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 h-[480px] overflow-y-auto space-y-3">
            {allActivity.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <AlertCircle className="w-8 h-8 mb-2 opacity-50 text-slate-400" />
                <p className="text-xs font-semibold">No transactions recorded yet.</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Start executing Normal, Insider, or Exchange rounds to populate the trading floor ledger.
                </p>
              </div>
            ) : (
              allActivity.map((act) => {
                const Icon = act.icon;
                return (
                  <div
                    key={act.id}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold border ${act.color}`}>
                        <Icon className="w-3 h-3" />
                        {act.type}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs leading-snug">
                      {act.text}
                    </p>
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
      />
    </div>
  );
};

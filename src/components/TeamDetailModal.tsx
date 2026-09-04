import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  X, 
  Award, 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  ShieldAlert, 
  Check, 
  Briefcase 
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';

interface TeamDetailModalProps {
  teamId: string | null;
  onClose: () => void;
}

export const TeamDetailModal: React.FC<TeamDetailModalProps> = ({ teamId, onClose }) => {
  const { valuations, config } = useGame();

  if (!teamId) return null;

  const valuation = valuations.find(v => v.team.id === teamId);
  if (!valuation) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span
              className="w-5 h-5 rounded-full ring-2 ring-slate-700"
              style={{ backgroundColor: valuation.team.avatarColor }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-100 font-mono">
                  {valuation.team.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-xs">
                  Rank #{valuation.rank}
                </span>
              </div>
              <p className="text-xs text-slate-400">Team Balance Sheet & Portfolio Valuation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Cash in Hand</span>
              <span className="text-sm sm:text-base font-extrabold font-mono text-slate-100 mt-1 block">
                {formatINR(valuation.cashInHand)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Holdings Value</span>
              <span className="text-sm sm:text-base font-extrabold font-mono text-amber-400 mt-1 block">
                {formatINR(valuation.totalPortfolioValue)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Final Net Worth</span>
              <span className="text-sm sm:text-base font-extrabold font-mono text-emerald-400 mt-1 block">
                {formatINR(valuation.netWorth)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Total ROI %</span>
              <span className={`text-sm sm:text-base font-extrabold font-mono mt-1 block ${
                valuation.roiPercent >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {formatPercent(valuation.roiPercent)}
              </span>
            </div>
          </div>

          {/* Holdings Breakdown Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-400" />
              Stock Holdings Breakdown ({valuation.holdingsBreakdown.length} Companies, {valuation.totalLotsHeld} Lots)
            </h4>

            {valuation.holdingsBreakdown.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center text-slate-500">
                No active stock holdings held in this portfolio.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-2.5">Stock</th>
                      <th className="px-4 py-2.5 text-center">Lots (Shares)</th>
                      <th className="px-4 py-2.5 text-right">Purchase Price (Base)</th>
                      <th className="px-4 py-2.5 text-right">Return %</th>
                      <th className="px-4 py-2.5 text-right">Calculated Return</th>
                      <th className="px-4 py-2.5 text-right">Final Portfolio Value</th>
                      <th className="px-4 py-2.5 text-right">Net P&L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {valuation.holdingsBreakdown.map((item) => (
                      <tr key={item.stock.id} className="hover:bg-slate-900/40">
                        <td className="px-4 py-2.5">
                          <span className="font-bold text-slate-200 block">{item.stock.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{item.stock.ticker} • {item.stock.category}</span>
                        </td>
                        <td className="px-4 py-2.5 text-center font-mono font-bold text-slate-300">
                          {item.lots} lots ({item.shares} sh)
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono text-slate-300 font-bold">
                          {formatINR(item.baseCost)}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold">
                          <span className={item.returnPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {item.returnPercent >= 0 ? `+${item.returnPercent}%` : `${item.returnPercent}%`}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono font-semibold">
                          <span className={item.returnAmount >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {item.returnAmount >= 0 ? `+${formatINR(item.returnAmount)}` : formatINR(item.returnAmount)}
                          </span>
                          <span className="block text-[10px] text-slate-500 font-mono">
                            ({item.returnPercent}% of {formatINR(item.baseCost)})
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-amber-300">
                          {formatINR(item.holdingValue)}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold">
                          <span className={item.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {item.pnl >= 0 ? `+${formatINR(item.pnl)}` : formatINR(item.pnl)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

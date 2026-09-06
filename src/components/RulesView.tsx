import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  BookOpen, 
  Coins, 
  Eye, 
  Award, 
  ShieldCheck, 
  TrendingUp, 
  Calculator,
  ArrowRight,
  Flame,
  CheckCircle2,
  Tv,
  Users,
  ShieldAlert,
  Briefcase,
  AlertTriangle,
  Scale
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const RulesView: React.FC = () => {
  const { config, stocks, teams, setActiveTab, resetAllTeamsToCapital, insiderTransactions } = useGame();
  
  // Interactive Example Calculator for Rule 3
  const [calcStockOpening, setCalcStockOpening] = useState<number>(15000);
  const [calcLots, setCalcLots] = useState<number>(2);

  // Interactive Example Calculator for Rule 6
  const [demoCash, setDemoCash] = useState<number>(850000);
  const [demoInvested, setDemoInvested] = useState<number>(150000);
  const [demoReturnPct, setDemoReturnPct] = useState<number>(25);

  const demoHoldingValue = demoInvested + (demoInvested * demoReturnPct) / 100;
  const demoFinalNetWorth = demoCash + demoHoldingValue;

  // Interactive Simulator for Rule 7
  const [simDistinctStocks, setSimDistinctStocks] = useState<number>(7);

  // Rule 8 Live Syndicate Wins Map
  const teamWinsMap: Record<string, number> = {};
  insiderTransactions.forEach(tx => {
    if (tx.winnerTeamId) {
      teamWinsMap[tx.winnerTeamId] = (teamWinsMap[tx.winnerTeamId] || 0) + 1;
    }
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold mb-2">
          <BookOpen className="w-4 h-4" />
          Official Rule Book & Operating Guidelines
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
          {config.eventName}
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          {config.clubName} • The complete 8-section official operational framework. Read below for event structure, starting capital, normal bidding mechanics, surprise insider rounds, tie-breakers, final evaluation formulas, portfolio size requirements, and insider round caps.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('normal')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
          >
            <Coins className="w-4 h-4" />
            Open Live Floor Auction
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTab('insider')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            Insider Round Arena (6 Lots + Intel)
          </button>
          <button
            onClick={() => {
              if (confirm('Set all participating teams to the official ₹10,00,000 starting capital?')) {
                resetAllTeamsToCapital(1000000);
                alert('All teams reset to ₹10,00,000 starting cash!');
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/40 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Reset starting capital for all teams to ₹10,00,000 as per Rule 2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Sync ₹10,00,000 Starting Cash
          </button>
        </div>
      </div>

      {/* Quick Summary Grid (All 8 Rules Highlighted) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Rule 2: Starting Cash</span>
          <span className="text-base font-black text-emerald-400 mt-1 block">₹10,00,000</span>
          <span className="text-[11px] text-slate-400 font-sans mt-0.5 block">Strict capital ceiling</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Rule 3: Normal Bidding</span>
          <span className="text-base font-black text-amber-400 mt-1 block">1 Lot = Start Bid</span>
          <span className="text-[11px] text-slate-400 font-sans mt-0.5 block">Bid size decides lots won</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Rule 4: Insider Round</span>
          <span className="text-base font-black text-purple-400 mt-1 block">Secret Intel</span>
          <span className="text-[11px] text-slate-400 font-sans mt-0.5 block">Highest bidder wins (No shares)</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Rule 6: Final Valuation</span>
          <span className="text-base font-black text-blue-400 mt-1 block">Cash + Outcomes</span>
          <span className="text-[11px] text-slate-400 font-sans mt-0.5 block">All revealed simultaneously</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Rule 7: Portfolio Size</span>
          <span className="text-base font-black text-amber-400 mt-1 block">6 to 9 Stocks</span>
          <span className="text-[11px] text-red-400 font-sans mt-0.5 block font-semibold">&lt;6 or &gt;9 Disqualified!</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Rule 8: Insider Wins</span>
          <span className="text-base font-black text-purple-400 mt-1 block">No Win Limit</span>
          <span className="text-[11px] text-slate-400 font-sans mt-0.5 block">Unlimited wins per team</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Catalog Size</span>
          <span className="text-base font-black text-slate-200 mt-1 block">Exactly 100 Stocks</span>
          <span className="text-[11px] text-slate-400 font-sans mt-0.5 block">Official locked dataset</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Tie-Breaker Hierarchy</span>
          <span className="text-base font-black text-emerald-400 mt-1 block">Cash &gt; Fewer Stocks</span>
          <span className="text-[11px] text-slate-400 font-sans mt-0.5 block">Official resolution order</span>
        </div>
      </div>

      {/* SECTION 1 */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-black text-sm">
            01
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 font-mono uppercase tracking-wide">
              1. What is this Event?
            </h2>
            <span className="text-xs text-slate-400">Trading Floor Concept & Mechanics</span>
          </div>
        </div>

        <div className="space-y-3 text-slate-300 text-sm leading-relaxed pl-12">
          <p>
            <strong className="text-slate-100">Wolf of BIT Mesra</strong> is a live stock trading simulation. Every team starts with the same amount of pretend money and spends the event buying and holding shares in a list of companies.
          </p>
          <p>
            Stocks are shown to everyone one at a time, and teams bid against each other to buy shares of whichever stock is currently on screen. Along with each stock, a short piece of news about that company is displayed. <strong className="text-amber-300">The news is written to be confusing and contradictory on purpose</strong> — it has clues pointing both up and down, and it's up to each team to read between the lines and decide whether they think the stock will actually rise or fall.
          </p>
          <p className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs">
            At the very end, every stock's real outcome is revealed, and whichever team's total money (cash left over, plus the value of everything they bought) is the highest, wins.
          </p>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-black text-sm">
            02
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 font-mono uppercase tracking-wide">
              2. Starting Capital
            </h2>
            <span className="text-xs text-slate-400">Capital Rules & Constraints</span>
          </div>
        </div>

        <div className="space-y-3 text-slate-300 text-sm leading-relaxed pl-12">
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              Official Starting Capital: ₹10,00,000 per team
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
              <li>Every team begins the event with <strong>₹10,00,000 in virtual capital</strong>.</li>
              <li>This is the <strong>only money</strong> a team has to work with for the entire event — <strong>there are no top-ups, and there is no borrowing</strong>.</li>
              <li>Teams must budget carefully across all {stocks.length} companies.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-black text-sm">
            03
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 font-mono uppercase tracking-wide">
              3. How a Normal Round Works
            </h2>
            <span className="text-xs text-slate-400">Stock-by-Stock Auction Mechanics & Lot Bidding</span>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm leading-relaxed pl-12">
          <p>
            The event moves through the stock list one company at a time. For each stock, the process is:
          </p>

          <ol className="space-y-2.5 text-xs">
            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="w-5 h-5 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">1</span>
              <span>The stock's name and its confusing news are displayed on screen for everyone to see.</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="w-5 h-5 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">2</span>
              <span>A starting bid amount is announced for that stock. <strong>This amount buys exactly one lot of shares.</strong></span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="w-5 h-5 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">3</span>
              <span><strong>Teams bid against each other.</strong> Bidding a bigger amount buys more lots at once — the size of the bid directly decides how many lots that team walks away with.</span>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="w-5 h-5 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">4</span>
              <span>Once no team wants to bid any higher, the stock closes for that round and the event moves to the next stock.</span>
            </li>
          </ol>

          {/* Official Rulebook Example Box */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              Official Example from Rule Book:
            </div>
            <p className="text-xs text-slate-200">
              <strong className="text-amber-300">Tata Steel</strong> opens at <strong className="text-emerald-400">₹15,000</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Bid of ₹15,000</span>
                <span className="font-bold text-amber-400">Buys 1 Lot (20 Sh)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Bid of ₹30,000</span>
                <span className="font-bold text-amber-400">Buys 2 Lots (40 Sh)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Bid of ₹45,000</span>
                <span className="font-bold text-amber-400">Buys 3 Lots (60 Sh)</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200">
              <strong className="text-emerald-300">New Rule — No Lot Limitation:</strong> Teams can buy as many lots of any stock as they want and can afford. There is no maximum cap per stock (e.g. 5, 10, 20, or more lots). Teams can bid for unlimited lots subject only to their available cash.
            </div>
            <p className="text-xs text-slate-300 italic pt-1">
              "A team can win as many or as few lots of a stock as they can afford and are willing to bid for. There is no requirement to buy every stock — skipping a stock entirely is a completely valid strategy."
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider block">
              Interactive Lot Bidding Estimator (Unlimited Lots):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Stock Opening Bid (1 Lot Price)</label>
                <input
                  type="number"
                  step="1000"
                  value={calcStockOpening}
                  onChange={(e) => setCalcStockOpening(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Number of Lots (No Cap)</label>
                <input
                  type="number"
                  min="1"
                  value={calcLots}
                  onChange={(e) => setCalcLots(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono text-xs"
                />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">Total Bid Required for {calcLots} Lots ({calcLots * 20} Shares):</span>
              <span className="text-base font-black text-amber-400">{formatINR(calcStockOpening * calcLots)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4 */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-black text-sm">
            04
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 font-mono uppercase tracking-wide">
              4. The Insider Round
            </h2>
            <span className="text-xs text-slate-400">Surprise One-Winner Auction for Confidential Intelligence (No Shares Allotted)</span>
          </div>
        </div>

        <div className="space-y-3 text-slate-300 text-sm leading-relaxed pl-12">
          <p>
            For a few stocks during the event — <strong className="text-purple-300">chosen at random, never announced in advance</strong> — instead of the normal bidding process, that stock goes through a special one-winner auction called the <strong>Insider Round</strong>.
          </p>
          <p>
            In the Insider Round, teams bid against each other just once, and <strong>only the single highest bidder wins</strong>. The winning team unlocks exclusive access to:
          </p>

          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-1 text-xs">
            <span className="text-[10px] font-bold text-purple-400 uppercase font-mono block">Winning Auction Benefit</span>
            <span className="text-base font-bold text-slate-100 font-mono block">Confidential Intelligence (Secret Clue)</span>
            <p className="text-slate-300 text-xs">
              Reveals whether that stock is actually going to rise or fall at the end!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <span className="font-bold text-amber-400 uppercase font-mono block text-[11px]">
              No Automatic Share Allotment:
            </span>
            <p className="text-slate-300 leading-relaxed">
              <strong>No shares or lots are allotted in the Insider Round</strong>. The winning bid directly buys confidential access to the inside intelligence. There is no limitation on how many insider rounds each team can win.
            </p>
            <p className="text-purple-300 font-medium pt-1 border-t border-slate-800/80">
              Immediately after the Insider Round closes, that same stock is shown again — this time open to every team, including the Insider Round winner, under the normal bidding process described in Section 3. This allows the winning team to leverage their knowledge by buying shares, while still giving every other team an equal chance to participate.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5 */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-black text-sm">
            05
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 font-mono uppercase tracking-wide">
              5. The Event Continues
            </h2>
            <span className="text-xs text-slate-400">Full Catalog Flow</span>
          </div>
        </div>

        <div className="space-y-3 text-slate-300 text-sm leading-relaxed pl-12">
          <p>
            This entire process — display the stock, run the bidding (normal or Insider Round), then move on — <strong>repeats for every stock on the list, one after another, until the full stock list has been covered</strong> ({stocks.length} master companies).
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono flex items-center justify-between">
            <span>Master Catalog Size: {stocks.length} Companies</span>
            <button
              onClick={() => setActiveTab('stocks-master')}
              className="text-amber-400 hover:text-amber-300 font-bold"
            >
              View All Stocks →
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 6 */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-black text-sm">
            06
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 font-mono uppercase tracking-wide">
              6. Final Evaluation & Winner
            </h2>
            <span className="text-xs text-slate-400">Hidden Outcomes Reveal & Net Worth Formula</span>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm leading-relaxed pl-12">
          <p>
            Every stock has a real outcome that was decided in advance but kept hidden throughout the event — for example, a stock might have been fixed to rise 20% or fall 20%. <strong>Once every stock on the list has been through its round, these outcomes are revealed all at once.</strong>
          </p>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-950 to-emerald-950/40 border border-emerald-500/40 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider block">
              Official Valuation Formula:
            </span>
            <div className="text-lg font-mono font-extrabold text-slate-100 p-3 rounded-xl bg-slate-900 border border-slate-800">
              Cash remaining + Value of all shares held (after outcomes are applied)
            </div>
            <p className="text-xs text-slate-300 mt-2">
              The team with the <strong>highest final value wins Wolf of BIT Mesra</strong>.
            </p>
          </div>

          {/* Interactive Calculator for Rule 6 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider block">
              Test Valuation Calculation:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Cash Remaining (₹)</label>
                <input
                  type="number"
                  step="10000"
                  value={demoCash}
                  onChange={(e) => setDemoCash(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Base Cost Invested (₹)</label>
                <input
                  type="number"
                  step="10000"
                  value={demoInvested}
                  onChange={(e) => setDemoInvested(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Stock Outcome Return (%)</label>
                <input
                  type="number"
                  step="5"
                  value={demoReturnPct}
                  onChange={(e) => setDemoReturnPct(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs"
                />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">Shares Value After Outcome:</span>
                <span className="font-bold text-slate-200">
                  {formatINR(demoHoldingValue)} ({demoReturnPct >= 0 ? '+' : ''}{demoReturnPct}%)
                </span>
              </div>
              <div className="sm:text-right">
                <span className="text-slate-400 block text-[10px]">Final Calculated Net Worth:</span>
                <span className="text-base font-black text-emerald-400">{formatINR(demoFinalNetWorth)}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-500 italic">
            Note: All companies, news, and outcomes used in this event are fictional and created for simulation purposes only.
          </div>
        </div>
      </div>

      {/* SECTION 7 */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-mono font-black text-sm">
            07
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 font-mono uppercase tracking-wide">
              7. Portfolio Size Requirement (6 to 9 Stocks)
            </h2>
            <span className="text-xs text-slate-400">Strict Diversification Boundaries & Disqualification</span>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm leading-relaxed pl-12">
          <p>
            By the end of the event, every team must hold shares in <strong>at least 6 different stocks</strong>, and <strong>no more than 9 different stocks</strong>.
          </p>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-950 to-slate-950 border border-red-500/40 space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase font-mono tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              Strict Disqualification Mandate:
            </div>
            <p className="text-sm font-semibold text-slate-100 leading-snug">
              "If, at the end of the event, a team holds fewer than 6 different stocks, or more than 9 different stocks, that team is disqualified — regardless of how high their final value would otherwise have been."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold font-mono uppercase block">Why the lower limit (Minimum 6)?</span>
              <p className="text-slate-400 leading-relaxed">
                Prevents a team from parking all their capital into just 1 or 2 stocks they feel certain about or won insider info on, forcing genuine portfolio management and risk distribution across the market.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold font-mono uppercase block">Why the upper limit (Maximum 9)?</span>
              <p className="text-slate-400 leading-relaxed">
                Prevents teams from buying small amounts of everything to eliminate risk entirely without conviction.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <span className="font-bold text-slate-200 font-mono block text-xs">
              Important Distinction: Distinct Stocks vs. Lots Held
            </span>
            <p className="text-slate-400 leading-relaxed">
              This limit is on the <strong>number of different stocks</strong> you hold, not on the number of lots. You can buy as many lots of any of those 6 to 9 stocks as you wish (subject to cash and bidding outcome).
            </p>
          </div>

          {/* Interactive Simulator for Rule 7 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider block">
              Rule 7 Compliance Simulator:
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono">
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Distinct Stocks in Portfolio:</span>
                  <span className="text-base font-black text-slate-100">{simDistinctStocks} Stocks</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={simDistinctStocks}
                  onChange={(e) => setSimDistinctStocks(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 (Under)</span>
                  <span className="text-amber-400 font-bold">6 (Min)</span>
                  <span className="text-emerald-400 font-bold">7-8 (Optimal)</span>
                  <span className="text-amber-400 font-bold">9 (Max)</span>
                  <span>15 (Over)</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border w-full sm:w-64 text-center ${
                simDistinctStocks >= 6 && simDistinctStocks <= 9
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : 'bg-red-950/40 border-red-500/50 text-red-300'
              }`}>
                <span className="text-[10px] uppercase font-bold block mb-1">Status Under Rule 7</span>
                <span className="text-sm font-black font-mono block">
                  {simDistinctStocks >= 6 && simDistinctStocks <= 9 ? '✓ ELIGIBLE FOR VICTORY' : '⚠️ DISQUALIFIED'}
                </span>
                <span className="text-[11px] block mt-1">
                  {simDistinctStocks < 6 
                    ? `Needs ${6 - simDistinctStocks} more stock${6 - simDistinctStocks === 1 ? '' : 's'}` 
                    : simDistinctStocks > 9 
                    ? `Holds ${simDistinctStocks - 9} stock${simDistinctStocks - 9 === 1 ? '' : 's'} too many` 
                    : 'Portfolio size within 6–9 range'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 8 */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-black text-sm">
            08
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 font-mono uppercase tracking-wide">
              8. Insider Round Participation: No Limit on Wins
            </h2>
            <span className="text-xs text-slate-400">Open Bidding Strategy Across All Surprise Rounds</span>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm leading-relaxed pl-12">
          <p>
            Across the entire event, <strong>there is no limitation on the number of Insider Rounds any team can win</strong>.
          </p>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-950 to-slate-950 border border-purple-500/40 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase font-mono tracking-wider">
              <Flame className="w-4 h-4" />
              Official Rule 8 Mandate:
            </div>
            <p className="text-sm font-semibold text-slate-100 leading-snug">
              "Any team with sufficient capital may bid on and win as many Insider Rounds as they wish. No shares are allotted in the Insider Round — the winning bid unlocks confidential intelligence. Teams can then use that knowledge to bid for lots in the open normal bidding round that follows."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <span className="text-purple-400 font-bold font-mono uppercase block">Capital Strategy Note:</span>
            <p className="text-slate-400 leading-relaxed">
              Because winning the Insider Round costs money directly out of cash-in-hand without adding shares to the team's portfolio, teams must carefully weigh the cost of buying intelligence against the capital needed to actually purchase shares in the subsequent round while maintaining their mandatory 6-to-9 distinct stock portfolio.
            </p>
          </div>

          {/* Live Syndicate Wins Tracker */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider block">
                Live Syndicate Insider Win Counts:
              </span>
              <span className="text-[11px] text-purple-400 font-mono">
                No Limitation
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              {teams.map(t => {
                const wins = teamWinsMap[t.id] || 0;
                return (
                  <div
                    key={t.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between ${
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
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  BookOpen, 
  Coins, 
  Eye, 
  ArrowLeftRight, 
  Award, 
  ShieldCheck, 
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const RulesView: React.FC = () => {
  const { config } = useGame();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800">
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
          <BookOpen className="w-4 h-4" />
          Official Rulebook & Operational Procedures
        </div>
        <h2 className="text-2xl font-black text-slate-100 font-mono mt-1">
          {config.eventName} — Simplified Official Rules
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {config.clubName} • Live Trading Floor Simulation
        </p>
      </div>

      {/* Core Rules Table */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Starting Cash</span>
          <span className="text-base font-extrabold font-mono text-emerald-400 mt-1 block">
            {formatINR(config.startingCash)}
          </span>
          <span className="text-[11px] text-slate-500">Virtual cash per team</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">1 Lot Definition</span>
          <span className="text-base font-extrabold font-mono text-amber-400 mt-1 block">
            {config.lotSize} Shares
          </span>
          <span className="text-[11px] text-slate-500">Fixed block unit</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Price per Lot</span>
          <span className="text-base font-extrabold font-mono text-slate-100 mt-1 block">
            ₹{config.lotBasePrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-slate-500">During normal rounds</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Maximum per Stock</span>
          <span className="text-base font-extrabold font-mono text-purple-400 mt-1 block">
            {config.maxLotsPerStock} Lots (160 Sh)
          </span>
          <span className="text-[11px] text-slate-500">Max ₹80,000 cost/stock</span>
        </div>
      </div>

      {/* Section 1 & 2: Objective & Lot Rules */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          1. Game Objective & Winning Condition
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Teams start with equal virtual cash ({formatINR(config.startingCash)}) and build a portfolio by purchasing lots of mystery stocks. The game combines normal stock rounds, an Insider Round, and a final Exchange Round. The team with the <strong>highest final Net Worth</strong> at the end wins.
        </p>

        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2 pt-2">
          <Coins className="w-4 h-4 text-amber-400" />
          2. Basic Lot Rules
        </h3>
        <ul className="list-disc list-inside space-y-1.5 text-slate-300">
          <li>1 lot = 20 shares.</li>
          <li>1 lot costs ₹10,000 during normal stock rounds.</li>
          <li>A team may buy 0–8 lots of any one stock.</li>
          <li>Maximum holding in one stock is 160 shares (8 lots), costing ₹80,000.</li>
          <li>Teams may buy different stocks as long as they have enough cash.</li>
          <li>Once a normal-round purchase is locked, it cannot be reversed except through the Exchange Round.</li>
        </ul>
      </div>

      {/* Section 3: Normal Stock Round */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Coins className="w-4 h-4 text-blue-400" />
          3. Normal Stock Round
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
            <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-2.5 w-20">Step</th>
                <th className="px-4 py-2.5">What Happens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="px-4 py-2.5 font-bold font-mono text-amber-400">1</td>
                <td className="px-4 py-2.5">The host reveals 2–3 clues about the mystery company.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold font-mono text-amber-400">2</td>
                <td className="px-4 py-2.5">Teams privately choose how many lots (0–8) they want.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold font-mono text-amber-400">3</td>
                <td className="px-4 py-2.5">At the buzzer, all decisions are locked.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold font-mono text-amber-400">4</td>
                <td className="px-4 py-2.5">The company is revealed and ₹10,000 per lot is deducted.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-bold font-mono text-amber-400">5</td>
                <td className="px-4 py-2.5">Holdings and cash are updated on the team ledger/scoreboard.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4: Insider Round */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-400" />
          4. Insider Bidding & Stock Auction Rules
        </h3>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
          <li>
            <strong className="text-purple-400">1. Insider News Bidding (Intel Auction):</strong> Teams bid competitively for exclusive access to the confidential market intel / clue. The winning team pays their bid amount, which is deducted from their cash balance, and receives the confidential report.
          </li>
          <li>
            <strong className="text-amber-400">2. 5-Lot Stock Auction (100 Shares):</strong> The amount for 5 lots is decided by <strong>competitive open bidding</strong>. The highest bidder pays their winning bid amount (deducted from cash) and is awarded 5 lots (100 shares).
          </li>
          <li>
            <strong className="text-blue-400">3. 3-Lot Stock Allotment (Deducted by Us):</strong> For the 3 lots (60 shares), the price is decided and <strong>deducted by the host/coordinators only</strong> (default ₹30,000 or custom host price).
          </li>
          <li>Both the 5-lot bid and insider news bid amounts are subtracted from the winning team's cash balance.</li>
          <li>All lots acquired count toward each team's strict 8-lot (160 shares) maximum holding cap per stock.</li>
        </ul>
      </div>

      {/* Section 5 & 6: Exchange Round & Final Valuation */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-purple-400" />
          5. Exchange Round — How It Works
        </h3>
        <p className="text-slate-300 leading-relaxed">
          After all stocks have been revealed, teams can sell holdings directly to other teams. This round uses seller-controlled pricing and competitive bidding:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-slate-300">
          <li><strong>Select:</strong> Selling team selects one stock and offers 1 full lot (20 shares).</li>
          <li><strong>Seller Price:</strong> Seller decides minimum selling price they will accept.</li>
          <li><strong>Random Opening:</strong> Coordinator announces random opening bid price.</li>
          <li><strong>Bidding:</strong> Interested teams increase bid (bidder decides increment).</li>
          <li><strong>Sale:</strong> Highest valid bidder wins, pays final bid, receives 1 lot.</li>
          <li><strong>Seller:</strong> Receives final bid amount and loses 1 lot from holdings.</li>
        </ul>

        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2 pt-3">
          <Award className="w-4 h-4 text-emerald-400" />
          6. Final Valuation Formula
        </h3>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <p className="font-mono text-amber-400 text-sm font-bold">
            Final Net Worth = Cash in Hand + Market Value of Holdings
          </p>
          <p className="font-mono text-slate-300">
            Holding value for a stock = Lots Held × ₹10,000 × Final Price Multiplier
          </p>
          <p className="text-slate-400 text-[11px]">
            Final Price Multiplier = 1 + (Decided Return % / 100). (e.g. +20% → 1.20x, -30% → 0.70x, +40% → 1.40x).
          </p>
        </div>

        <div className="pt-2">
          <h4 className="font-bold text-slate-200 mb-1">Tie-Breaker Hierarchy:</h4>
          <ol className="list-decimal list-inside space-y-1 text-slate-300">
            <li>Higher cash in hand</li>
            <li>Fewer distinct stocks held</li>
            <li>Coin toss</li>
          </ol>
        </div>
      </div>

      {/* Section 7: Rectification & Error Recovery Protocol */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          7. Operator Rectification & Error Correction Protocol
        </h3>
        <p className="text-slate-300 leading-relaxed">
          In high-energy auction environments, rapid bidding or counting slips may occur. This system incorporates a fail-safe rectification engine:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-slate-300">
          <li><strong>One-Click Transaction Undo:</strong> Any normal allotment, insider auction, or exchange trade can be immediately rolled back from the audit feed with full cash and lot restoration.</li>
          <li><strong>Direct Portfolio Rectification:</strong> Click <em>"Rectify Mistake"</em> in the header or on any team card to manually adjust lots or cash balances if numbers were entered incorrectly.</li>
          <li><strong>Audit Trail:</strong> All calculations, penalties, and lot allotments are automatically tracked and preserved in real time.</li>
        </ul>
      </div>
    </div>
  );
};

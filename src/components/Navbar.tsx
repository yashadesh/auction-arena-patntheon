import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  TrendingUp, 
  Users, 
  Layers, 
  Eye, 
  ArrowLeftRight, 
  Award, 
  Tv, 
  BookOpen, 
  SlidersHorizontal, 
  RotateCcw, 
  FileSpreadsheet,
  Download,
  Upload,
  Coins,
  CheckCircle2,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { exportValuationSummaryCSV } from '../utils/exportValuationCSV';
import { SoundToggle } from './GavelButton';

interface NavbarProps {
  onOpenTeamManager: () => void;
  onOpenConfig: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTeamManager, onOpenConfig }) => {
  const { 
    config, 
    activeTab, 
    setActiveTab, 
    teams, 
    stocks,
    valuations,
    resetGame, 
    loadDemoGame, 
    exportGameState, 
    importGameState 
  } = useGame();

  const [showExportModal, setShowExportModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [copied, setCopied] = useState(false);
  const [csvDownloaded, setCsvDownloaded] = useState(false);

  const totalEconomyCash = teams.reduce((acc, t) => acc + t.cash, 0);

  const handleQuickExportCSV = () => {
    exportValuationSummaryCSV(valuations, stocks, config);
    setCsvDownloaded(true);
    setTimeout(() => setCsvDownloaded(false), 2500);
  };

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: Layers, badge: null },
    { id: 'normal', label: 'Live Floor (Stock-by-Stock)', icon: Coins, badge: 'Sec 3' },
    { id: 'insider', label: 'Insider Round (6 Lots + Intel)', icon: Eye, badge: 'Sec 4' },
    { id: 'exchange', label: 'P2P Trading', icon: ArrowLeftRight, badge: null },
    { id: 'valuation', label: 'Final Valuation', icon: Award, badge: 'Sec 6' },
    { id: 'projector', label: 'Arena Projector', icon: Tv, badge: '30s' },
    { id: 'stocks-master', label: 'Stocks Catalog', icon: FileSpreadsheet, badge: `${stocks.length}` },
    { id: 'rules', label: 'Official Rules', icon: BookOpen, badge: '6 Sec' },
  ];

  const handleDownloadBackup = () => {
    const json = exportGameState();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wolf-of-bit-mesra-state-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const ok = importGameState(importJsonText);
    if (ok) {
      alert('Game state imported successfully!');
      setShowExportModal(false);
      setImportJsonText('');
    } else {
      alert('Invalid JSON data. Please check and try again.');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/40">
              <TrendingUp className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-slate-100 text-lg font-mono">
                  {config.eventName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  AUCTIONEER CONSOLE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">{config.clubName}</p>
            </div>
          </div>

          {/* Quick Stats & Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Registered Teams</span>
                <span className="font-semibold text-slate-200 font-mono">{teams.length} Teams</span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Economy Cash</span>
                <span className="font-semibold text-emerald-400 font-mono">{formatINR(totalEconomyCash)}</span>
              </div>
            </div>

            <button
              id="btn-quick-csv"
              onClick={handleQuickExportCSV}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition ${
                csvDownloaded 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700/60'
              }`}
              title="Download full valuation summary CSV for organizers"
            >
              {csvDownloaded ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-emerald-400" />}
              <span>{csvDownloaded ? 'CSV Saved' : 'Export CSV'}</span>
            </button>

            <SoundToggle />

            <button
              id="btn-team-manager"
              onClick={onOpenTeamManager}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/60 text-xs font-semibold transition"
            >
              <Users className="w-4 h-4 text-amber-400" />
              Teams ({teams.length})
            </button>

            <button
              id="btn-config"
              onClick={onOpenConfig}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
              title="Game Configuration"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1">
              <button
                id="btn-load-demo"
                onClick={() => {
                  if (confirm('Load pre-filled simulation demo data with holdings for all teams?')) {
                    loadDemoGame();
                  }
                }}
                className="px-2.5 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-800/40 text-xs font-medium transition"
                title="Fill sample round data for quick demo"
              >
                Sample Data
              </button>

              <button
                id="btn-export-backup"
                onClick={() => setShowExportModal(true)}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
                title="Backup / Restore Game State"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                id="btn-quick-guide"
                onClick={() => setShowHelpModal(true)}
                className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition flex items-center gap-1.5 text-xs font-semibold"
                title="Quick Event Rules & Valuation Guide"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Guide</span>
              </button>

              <button
                id="btn-reset-game"
                onClick={() => {
                  if (confirm(`Are you sure you want to reset all team holdings and cash back to starting ${formatINR(config.startingCash)}?`)) {
                    resetGame();
                  }
                }}
                className="p-2 rounded-lg bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-900/40 transition"
                title="Reset Game"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-900 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono uppercase ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Export / Import Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
              <Download className="w-5 h-5 text-amber-400" />
              Backup & Restore Game State
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              All active game data is automatically saved locally. You can also export a JSON backup or restore from a previous save.
            </p>

            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadBackup}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  Download JSON File
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(exportGameState());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Paste JSON to Restore:
                </label>
                <textarea
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste exported game state JSON here..."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={!importJsonText.trim()}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  Restore Game State
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Guide & Rules Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-4 scrollbar-none">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="text-base font-bold text-slate-100 font-mono">
                  WOLF OF BIT MESRA — QUICK REFERENCE GUIDE
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold px-2 py-1 rounded bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Core Rulebook Summary */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/30 space-y-2">
              <span className="text-[11px] uppercase font-bold text-amber-400 font-mono tracking-wider flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                Rule 2: Starting Capital — ₹10,00,000 per Team
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                Every team starts with <strong className="text-emerald-400">₹10,00,000</strong> in virtual capital. No top-ups, no borrowing.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 space-y-1 border border-slate-800">
                <div className="text-slate-400">Section 6 Evaluation Formula:</div>
                <div className="text-amber-400 font-bold">
                  Final Value = Cash Remaining + Value of All Shares Held (After Outcomes Applied)
                </div>
              </div>
            </div>

            {/* Step-by-Step Round Flow */}
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-slate-200 uppercase font-mono text-[11px] tracking-wider text-slate-400">
                Official Rule Book 6-Section Framework:
              </h4>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 font-mono">1. What is this Event?</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">Stock-by-Stock</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Companies shown one at a time with confusing and contradictory news clues. Read between the lines to decide whether it will rise or fall.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 font-mono">2. Starting Capital</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-emerald-400 font-mono font-bold">₹10,00,000</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Only money a team has for the entire event — no top-ups, no borrowing.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 font-mono">3. Normal Round Bidding</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">1 Lot = Starting Bid</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Announced starting bid buys exactly 1 lot. Bidding a bigger amount buys more lots at once (e.g. Tata Steel ₹15k = 1 lot, ₹30k = 2 lots, ₹45k = 3 lots).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-400 font-mono">4. The Insider Round</span>
                  <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px] font-mono border border-purple-500/20">6 Lots + Intel</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Surprise 1-winner auction. Highest bid directly buys <strong>6 lots guaranteed + confidential inside information</strong>. Immediately after, the stock reopens for normal bidding open to all teams.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-300 font-mono">5. Catalog Continues</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">All 44 Stocks</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Process repeats stock by stock until the full catalog has been traversed.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 font-mono">6. Final Evaluation & Winner</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">Reveal All At Once</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Outcomes revealed all at once. Final Value = Cash remaining + Value of all shares held after outcomes applied. Highest final value wins Wolf of BIT Mesra!
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
              >
                Got It, Let's Trade!
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

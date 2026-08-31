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
  CheckCircle2
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
    { id: 'dashboard', label: 'Summary', icon: Layers, badge: null },
    { id: 'normal', label: '1. Allot & Calculate', icon: Coins, badge: 'R1' },
    { id: 'insider', label: '2. Insider Auction (5L/3L)', icon: Eye, badge: 'R2' },
    { id: 'exchange', label: '3. P2P Exchange', icon: ArrowLeftRight, badge: 'R3' },
    { id: 'valuation', label: '4. Leaderboard & P&L', icon: Award, badge: 'Win' },
    { id: 'projector', label: '30s Arena Timer', icon: Tv, badge: '30s' },
    { id: 'stocks-master', label: 'Stocks & Multipliers', icon: FileSpreadsheet, badge: '44' },
    { id: 'rules', label: 'Rules', icon: BookOpen, badge: null },
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
                id="btn-reset-game"
                onClick={() => {
                  if (confirm('Are you sure you want to reset all team holdings and cash back to starting ₹5,00,000?')) {
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
    </header>
  );
};

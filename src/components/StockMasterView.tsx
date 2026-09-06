import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Stock } from '../types';
import { 
  FileSpreadsheet, 
  Search, 
  Filter, 
  Edit3, 
  Plus, 
  Eye, 
  EyeOff, 
  Check, 
  TrendingUp, 
  TrendingDown, 
  Lock,
  Tag,
  RefreshCw,
  Coins,
  Gavel,
  CheckCircle2,
  LayoutGrid,
  List
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export const StockMasterView: React.FC = () => {
  const { stocks, updateStock, addStock, syncOfficialStocks, config, setSelectedStockId, setActiveTab } = useGame();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [returnFilter, setReturnFilter] = useState<'all' | 'positive' | 'negative'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Stock>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [syncedFeedback, setSyncedFeedback] = useState(false);
  const [revealedSecrets, setRevealedSecrets] = useState<Record<string, boolean>>({});
  const [newStock, setNewStock] = useState<Omit<Stock, 'id'>>({
    name: '',
    ticker: '',
    category: 'Tech',
    returnPercent: 20,
    openingBidPrice: 10000,
    displayNews: '',
    insiderNews: ''
  });

  const categories = [
    'All', 
    'Tech', 
    'Banking & NBFC', 
    'Energy & Commodities', 
    'Auto & EV', 
    'Pharma & Healthcare', 
    'Defense & Infra', 
    'Consumer & Retail', 
    'Fintech & Exchanges',
    'FMCG & Consumer',
    'Telecom',
    'Aviation & Logistics'
  ];

  const filteredStocks = stocks.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.displayNews.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesReturn = returnFilter === 'all' 
      ? true 
      : returnFilter === 'positive' 
      ? s.returnPercent >= 0 
      : s.returnPercent < 0;
    return matchesSearch && matchesCat && matchesReturn;
  });

  const handleStartEdit = (stock: Stock) => {
    setEditingStockId(stock.id);
    setEditForm({ ...stock });
  };

  const handleSaveEdit = (stockId: string) => {
    updateStock(stockId, editForm);
    setEditingStockId(null);
  };

  const handleSyncOfficial = () => {
    syncOfficialStocks();
    setSyncedFeedback(true);
    setTimeout(() => setSyncedFeedback(false), 2500);
  };

  const handleCreateStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStock.name.trim()) return;
    addStock(newStock);
    setShowAddModal(false);
    setNewStock({
      name: '',
      ticker: '',
      category: 'Tech',
      returnPercent: 20,
      openingBidPrice: 10000,
      displayNews: '',
      insiderNews: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 font-mono">
              OFFICIAL 100 STOCKS CATALOG & NEWS REPOSITORY
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold font-mono">
              {stocks.length} Stocks Verified
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Verified complete database of the exact 100 stocks from Table 1 of the official rulebook sheet with accurate return percentages, opening bid values, public clues, and confidential insider intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSyncOfficial}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border ${
              syncedFeedback
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-700/80'
            }`}
            title="Reload official rulebook values (opening bid prices and return percentages) from PDF Table 1"
          >
            {syncedFeedback ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <RefreshCw className="w-4 h-4 text-amber-400" />}
            <span>{syncedFeedback ? 'Synced to Official 100 Stocks!' : 'Sync with Official Sheet'}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search stock, ticker, or news keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Quick Return filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setReturnFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition ${returnFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              All ({stocks.length})
            </button>
            <button
              onClick={() => setReturnFilter('positive')}
              className={`px-2.5 py-1 rounded-lg transition ${returnFilter === 'positive' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-emerald-400'}`}
            >
              Gainers (+)
            </button>
            <button
              onClick={() => setReturnFilter('negative')}
              className={`px-2.5 py-1 rounded-lg transition ${returnFilter === 'negative' ? 'bg-red-500/20 text-red-300 font-bold border border-red-500/40' : 'text-slate-400 hover:text-red-400'}`}
            >
              Losers (-)
            </button>
          </div>

          {/* View Mode Toggle: Grid vs Table */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition flex items-center gap-1 text-xs font-semibold ${
                viewMode === 'grid' 
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Cards Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition flex items-center gap-1 text-xs font-semibold ${
                viewMode === 'table' 
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Dense Table View (Best for 100 stocks)"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto scrollbar-none py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'All' ? 'All Sectors' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* View Output: Table Mode vs Card Mode */}
      {viewMode === 'table' ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Company & Ticker</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4 text-right">Opening Bid</th>
                  <th className="py-3 px-4 text-right">Return % (Mult)</th>
                  <th className="py-3 px-4">Public Market News</th>
                  <th className="py-3 px-4">Secret Intel</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredStocks.map((stock) => {
                  const globalIdx = stocks.findIndex(s => s.id === stock.id);
                  const isRevealed = !!revealedSecrets[stock.id];
                  const multiplier = 1 + (stock.returnPercent / 100);

                  return (
                    <tr key={stock.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 text-slate-500 font-bold">
                        #{globalIdx + 1}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-100 font-sans">{stock.name}</div>
                        <span className="text-[10px] text-amber-400 font-mono font-bold uppercase">{stock.ticker}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-sans">
                          {stock.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-200 font-bold whitespace-nowrap">
                        ₹{stock.openingBidPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <span className={`font-bold ${stock.returnPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {stock.returnPercent >= 0 ? `+${stock.returnPercent}%` : `${stock.returnPercent}%`}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          ({multiplier.toFixed(2)}x)
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-[11px] text-slate-300 font-sans line-clamp-2" title={stock.displayNews}>
                          {stock.displayNews}
                        </p>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        {isRevealed ? (
                          <div className="space-y-1">
                            <p className="text-[11px] text-amber-300 font-sans italic line-clamp-2" title={stock.insiderNews}>
                              "{stock.insiderNews}"
                            </p>
                            <button
                              onClick={() => setRevealedSecrets(prev => ({ ...prev, [stock.id]: false }))}
                              className="text-[9px] text-slate-500 hover:text-slate-300 underline block"
                            >
                              Hide Clue
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setRevealedSecrets(prev => ({ ...prev, [stock.id]: true }))}
                            className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] flex items-center gap-1 font-sans"
                          >
                            <Lock className="w-3 h-3" />
                            <span>Reveal Clue</span>
                          </button>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedStockId(stock.id);
                              setActiveTab('normal');
                            }}
                            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-200 flex items-center gap-1"
                            title="Open in Normal Live Floor"
                          >
                            <Coins className="w-3 h-3 text-amber-400" />
                            <span>R1</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStockId(stock.id);
                              setActiveTab('insider');
                            }}
                            className="px-2 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-[10px] font-bold text-purple-300 border border-purple-500/30 flex items-center gap-1"
                            title="Open in Insider Round"
                          >
                            <Gavel className="w-3 h-3" />
                            <span>R2</span>
                          </button>
                          <button
                            onClick={() => handleStartEdit(stock)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
                            title="Edit Stock"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Stock Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStocks.map((stock) => {
            const globalIdx = stocks.findIndex(s => s.id === stock.id);
            const isEditing = editingStockId === stock.id;
            const multiplier = 1 + (stock.returnPercent / 100);

            return (
              <div
                key={stock.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition space-y-4 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          #{globalIdx + 1} • {stock.ticker}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {stock.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-100 mt-1.5">
                        {stock.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedStockId(stock.id);
                          setActiveTab('normal');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 hover:text-white flex items-center gap-1 transition"
                        title="Allot in Round 1"
                      >
                        <Coins className="w-3 h-3 text-amber-400" />
                        <span>R1</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedStockId(stock.id);
                          setActiveTab('insider');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[11px] font-semibold text-amber-400 border border-amber-500/30 flex items-center gap-1 transition"
                        title="Auction in Round 2"
                      >
                        <Gavel className="w-3 h-3" />
                        <span>R2 Auction</span>
                      </button>
                      <button
                        onClick={() => isEditing ? handleSaveEdit(stock.id) : handleStartEdit(stock)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
                        title={isEditing ? 'Save edits' : 'Edit values'}
                      >
                        {isEditing ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit3 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Key Metrics Chips */}
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase">Final Return</span>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editForm.returnPercent ?? stock.returnPercent}
                          onChange={(e) => setEditForm(prev => ({ ...prev, returnPercent: parseInt(e.target.value) || 0 }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-amber-400 font-bold"
                        />
                      ) : (
                        <span className={`font-bold text-sm ${stock.returnPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {stock.returnPercent >= 0 ? `+${stock.returnPercent}%` : `${stock.returnPercent}%`}
                        </span>
                      )}
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase">Multiplier</span>
                      <span className="font-bold text-sm text-slate-200">
                        {multiplier.toFixed(2)}x
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase">Opening Bid</span>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editForm.openingBidPrice ?? stock.openingBidPrice}
                          onChange={(e) => setEditForm(prev => ({ ...prev, openingBidPrice: parseInt(e.target.value) || 0 }))}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-slate-200 font-bold"
                        />
                      ) : (
                        <span className="font-bold text-sm text-amber-400">
                          ₹{stock.openingBidPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Display & Insider News */}
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1">
                        <Tag className="w-3 h-3 text-blue-400" />
                        Display News (Public Clue)
                      </span>
                      {isEditing ? (
                        <textarea
                          value={editForm.displayNews ?? stock.displayNews}
                          onChange={(e) => setEditForm(prev => ({ ...prev, displayNews: e.target.value }))}
                          rows={2}
                          className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200"
                        />
                      ) : (
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {stock.displayNews}
                        </p>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/20 space-y-1">
                      <span className="text-amber-400 font-bold uppercase text-[10px] flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" />
                        Insider Confidential Intelligence
                      </span>
                      {isEditing ? (
                        <textarea
                          value={editForm.insiderNews ?? stock.insiderNews}
                          onChange={(e) => setEditForm(prev => ({ ...prev, insiderNews: e.target.value }))}
                          rows={2}
                          className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-amber-200"
                        />
                      ) : (
                        <p className="text-amber-200/90 text-[11px] leading-relaxed italic">
                          {stock.insiderNews}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => setEditingStockId(null)}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(stock.id)}
                      className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 font-mono flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              Add Custom Stock
            </h3>

            <form onSubmit={handleCreateStock} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={newStock.name}
                    onChange={(e) => setNewStock(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Ticker</label>
                  <input
                    type="text"
                    required
                    value={newStock.ticker}
                    onChange={(e) => setNewStock(prev => ({ ...prev, ticker: e.target.value.toUpperCase() }))}
                    placeholder="e.g. ACME"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Category</label>
                  <select
                    value={newStock.category}
                    onChange={(e) => setNewStock(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-100"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Return %</label>
                  <input
                    type="number"
                    value={newStock.returnPercent}
                    onChange={(e) => setNewStock(prev => ({ ...prev, returnPercent: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Opening Bid (₹)</label>
                  <input
                    type="number"
                    step={1000}
                    value={newStock.openingBidPrice}
                    onChange={(e) => setNewStock(prev => ({ ...prev, openingBidPrice: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Public Display News</label>
                <textarea
                  rows={2}
                  value={newStock.displayNews}
                  onChange={(e) => setNewStock(prev => ({ ...prev, displayNews: e.target.value }))}
                  placeholder="Public hint visible during the rounds..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Insider Confidential Intelligence</label>
                <textarea
                  rows={2}
                  value={newStock.insiderNews}
                  onChange={(e) => setNewStock(prev => ({ ...prev, insiderNews: e.target.value }))}
                  placeholder="Sealed clue revealed only to the winning bidder..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

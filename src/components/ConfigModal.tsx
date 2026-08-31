import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { GameConfig } from '../types';
import { SlidersHorizontal, X, Check, RotateCcw } from 'lucide-react';
import { formatINR } from '../utils/formatters';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  const { config, updateConfig } = useGame();

  const [form, setForm] = useState<GameConfig>({ ...config });

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-slate-100">
              Simulation Parameters & Rules Setup
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Event / Competition Name</label>
            <input
              type="text"
              value={form.eventName}
              onChange={(e) => setForm(prev => ({ ...prev, eventName: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-bold"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Hosting Organization / Club</label>
            <input
              type="text"
              value={form.clubName}
              onChange={(e) => setForm(prev => ({ ...prev, clubName: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Starting Cash per Team (₹)</label>
              <input
                type="number"
                step={10000}
                value={form.startingCash}
                onChange={(e) => setForm(prev => ({ ...prev, startingCash: parseInt(e.target.value) || 0 }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-amber-400 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Shares per Lot</label>
              <input
                type="number"
                value={form.lotSize}
                onChange={(e) => setForm(prev => ({ ...prev, lotSize: parseInt(e.target.value) || 0 }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Normal Lot Base (₹)</label>
              <input
                type="number"
                step={1000}
                value={form.lotBasePrice}
                onChange={(e) => setForm(prev => ({ ...prev, lotBasePrice: parseInt(e.target.value) || 0 }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Max Lots / Stock</label>
              <input
                type="number"
                value={form.maxLotsPerStock}
                onChange={(e) => setForm(prev => ({ ...prev, maxLotsPerStock: parseInt(e.target.value) || 0 }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Min Bid Incr (₹)</label>
              <input
                type="number"
                step={1000}
                value={form.minBidIncrement}
                onChange={(e) => setForm(prev => ({ ...prev, minBidIncrement: parseInt(e.target.value) || 0 }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

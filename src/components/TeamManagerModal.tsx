import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Team } from '../types';
import { 
  Users, 
  Plus, 
  Trash2, 
  X, 
  Edit2, 
  Check, 
  Coins, 
  ShieldAlert, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

interface TeamManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTeam: (teamId: string) => void;
}

export const TeamManagerModal: React.FC<TeamManagerModalProps> = ({ isOpen, onClose, onSelectTeam }) => {
  const { teams, addTeam, updateTeam, removeTeam, config } = useGame();

  const [newTeamName, setNewTeamName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCash, setEditCash] = useState<number>(0);
  const [editPenalties, setEditPenalties] = useState<number>(0);
  const [editBonus, setEditBonus] = useState<number>(0);

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    addTeam(newTeamName.trim());
    setNewTeamName('');
  };

  const handleStartEdit = (team: Team) => {
    setEditingId(team.id);
    setEditName(team.name);
    setEditCash(team.cash);
    setEditPenalties(team.penalties || 0);
    setEditBonus(team.bonus || 0);
  };

  const handleSaveEdit = (teamId: string) => {
    updateTeam(teamId, {
      name: editName.trim() || undefined,
      cash: editCash,
      penalties: editPenalties,
      bonus: editBonus
    });
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-slate-100">
              Trading Syndicates & Team Management ({teams.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Quick Add Team Input */}
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter new team syndicate name..."
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!newTeamName.trim()}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              Add Team
            </button>
          </form>

          {/* Teams Table */}
          <div className="space-y-2">
            {teams.map((team) => {
              const isEditing = editingId === team.id;
              const totalLots = Object.values(team.holdings).reduce((a: number, b) => a + Number(b), 0);

              return (
                <div
                  key={team.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: team.avatarColor }}
                    />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 font-bold"
                      />
                    ) : (
                      <div>
                        <span className="font-bold text-slate-200 block text-sm">{team.name}</span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {totalLots} lots held • {Object.keys(team.holdings).length} stocks
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Cash (₹):</span>
                          <input
                            type="number"
                            value={editCash}
                            onChange={(e) => setEditCash(parseInt(e.target.value) || 0)}
                            className="w-24 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 font-mono"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Penalty:</span>
                          <input
                            type="number"
                            value={editPenalties}
                            onChange={(e) => setEditPenalties(parseInt(e.target.value) || 0)}
                            className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-red-400 font-mono"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Bonus:</span>
                          <input
                            type="number"
                            value={editBonus}
                            onChange={(e) => setEditBonus(parseInt(e.target.value) || 0)}
                            className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-emerald-400 font-mono"
                          />
                        </div>
                        <button
                          onClick={() => handleSaveEdit(team.id)}
                          className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white mt-3"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block">Current Cash</span>
                          <span className="font-mono font-bold text-slate-200">
                            {formatINR(team.cash)}
                          </span>
                        </div>

                        {(team.penalties > 0 || team.bonus > 0) && (
                          <div className="text-right">
                            <span className="text-[10px] text-slate-500 block">Penalties/Bonus</span>
                            <span className="font-mono text-[11px]">
                              {team.penalties > 0 && <span className="text-red-400">-{formatINR(team.penalties)} </span>}
                              {team.bonus > 0 && <span className="text-emerald-400">+{formatINR(team.bonus)}</span>}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              onSelectTeam(team.id);
                              onClose();
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-[11px]"
                          >
                            Ledger
                          </button>
                          <button
                            onClick={() => handleStartEdit(team)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
                            title="Edit Cash & Penalties"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {teams.length > 2 && (
                            <button
                              onClick={() => {
                                if (confirm(`Remove ${team.name}?`)) {
                                  removeTeam(team.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/50 text-slate-500 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

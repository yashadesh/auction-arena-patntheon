import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { NormalRoundView } from './components/NormalRoundView';
import { InsiderRoundView } from './components/InsiderRoundView';
import { ExchangeRoundView } from './components/ExchangeRoundView';
import { ValuationView } from './components/ValuationView';
import { ProjectorView } from './components/ProjectorView';
import { StockMasterView } from './components/StockMasterView';
import { RulesView } from './components/RulesView';
import { TeamManagerModal } from './components/TeamManagerModal';
import { TeamDetailModal } from './components/TeamDetailModal';
import { ConfigModal } from './components/ConfigModal';

function MainLayout() {
  const { activeTab } = useGame();
  const [isTeamManagerOpen, setIsTeamManagerOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [selectedTeamDetailId, setSelectedTeamDetailId] = useState<string | null>(null);

  const isProjectorMode = activeTab === 'projector';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        onOpenTeamManager={() => setIsTeamManagerOpen(true)}
        onOpenConfig={() => setIsConfigOpen(true)}
      />

      {/* Main View Container */}
      <main className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 ${isProjectorMode ? 'max-w-[1700px]' : 'max-w-7xl'}`}>
        {activeTab === 'dashboard' && (
          <DashboardView onSelectTeam={(id) => setSelectedTeamDetailId(id)} />
        )}
        {activeTab === 'normal' && <NormalRoundView />}
        {activeTab === 'insider' && <InsiderRoundView />}
        {activeTab === 'exchange' && <ExchangeRoundView />}
        {activeTab === 'valuation' && (
          <ValuationView onSelectTeam={(id) => setSelectedTeamDetailId(id)} />
        )}
        {activeTab === 'projector' && <ProjectorView />}
        {activeTab === 'stocks-master' && <StockMasterView />}
        {activeTab === 'rules' && <RulesView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Wolf of BIT Mesra • Finance Club Live Auction & Valuation Engine</span>
          <span className="text-[11px] text-slate-600">44 Master Stocks • Multipliers • Real-Time P&L</span>
        </div>
      </footer>

      {/* Modals */}
      <TeamManagerModal
        isOpen={isTeamManagerOpen}
        onClose={() => setIsTeamManagerOpen(false)}
        onSelectTeam={(id) => setSelectedTeamDetailId(id)}
      />

      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
      />

      <TeamDetailModal
        teamId={selectedTeamDetailId}
        onClose={() => setSelectedTeamDetailId(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <MainLayout />
    </GameProvider>
  );
}

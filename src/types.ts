export interface Stock {
  id: string;
  name: string;
  ticker: string;
  category: 'Tech' | 'Banking & NBFC' | 'Energy & Commodities' | 'Auto & EV' | 'Pharma & Healthcare' | 'Defense & Infra' | 'Consumer & Retail' | 'Fintech & Exchanges';
  returnPercent: number; // e.g. 20 for +20%, -30 for -30%
  openingBidPrice: number; // in Rs. e.g. 12000
  displayNews: string;
  insiderNews: string;
}

export interface Team {
  id: string;
  name: string;
  avatarColor: string;
  startingCash: number;
  cash: number;
  // Map of stockId -> number of lots held (0 to 8)
  holdings: Record<string, number>;
  penalties: number;
  bonus: number;
  notes?: string;
}

export interface NormalRoundTransaction {
  id: string;
  timestamp: number;
  stockId: string;
  teamPurchases: Array<{
    teamId: string;
    lots: number;
    amountPaid: number;
  }>;
}

export interface InsiderRoundTransaction {
  id: string;
  timestamp: number;
  stockId: string;
  type?: '5_lots_bid' | '3_lots_allotment' | 'insider_news_bid';
  pass?: 1 | 2; // 1 = 5-Lot Bidding, 2 = 3-Lot Host Allotment
  winnerTeamId: string;
  winnerBid: number; // amount paid / deducted
  winnerLots: number; // 5 for 5-lot auction, 3 for 3-lot allotment
  runnerUpTeamId?: string;
  runnerUpBid?: number;
  runnerUpLots?: number;
  deductCash?: boolean;
}

export interface InsiderNewsTransaction {
  id: string;
  timestamp: number;
  stockId: string;
  winnerTeamId: string;
  bidAmount: number;
  deductCash?: boolean;
}

export interface ExchangeTransaction {
  id: string;
  timestamp: number;
  stockId: string;
  sellerTeamId: string;
  buyerTeamId: string;
  lots: number; // usually 1
  finalPrice: number; // paid to seller from buyer
  sellerReservePrice?: number;
}

export interface GameConfig {
  eventName: string;
  clubName: string;
  startingCash: number; // Rs. 1,000,000 (10 Lakhs)
  lotSize: number; // 20 shares
  lotBasePrice: number; // Rs. 10,000
  maxLotsPerStock: number; // 8 lots (160 shares = Rs. 80,000)
  minBidIncrement: number; // Rs. 5,000
}

export interface TeamValuation {
  team: Team;
  cashInHand: number;
  holdingsBreakdown: Array<{
    stock: Stock;
    lots: number;
    shares: number;
    baseCost: number; // lots * 10,000
    finalMultiplier: number; // 1 + return% / 100
    holdingValue: number; // lots * 10,000 * multiplier
    pnl: number; // holdingValue - baseCost
    returnPercent: number;
  }>;
  totalPortfolioValue: number;
  totalBaseInvested: number;
  portfolioPnl: number;
  netWorth: number; // cashInHand + totalPortfolioValue - penalties + bonus
  overallPnl: number; // netWorth - startingCash
  roiPercent: number; // ((netWorth - startingCash) / startingCash) * 100
  distinctStocksCount: number;
  totalLotsHeld: number;
  rank: number;
}

export interface GameContextType {
  stocks: Stock[];
  teams: Team[];
  config: GameConfig;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedStockId: string;
  setSelectedStockId: (id: string) => void;
  revealedMultipliers: Record<string, boolean>;
  normalTransactions: NormalRoundTransaction[];
  insiderTransactions: InsiderRoundTransaction[];
  insiderNewsTransactions: InsiderNewsTransaction[];
  exchangeTransactions: ExchangeTransaction[];
  
  // Actions
  addTeam: (name: string) => void;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  setTeamCash: (teamId: string, newCash: number) => void;
  adjustTeamCash: (teamId: string, delta: number) => void;
  setTeamStockLots: (teamId: string, stockId: string, lots: number) => void;
  removeTeam: (id: string) => void;
  updateStock: (id: string, updates: Partial<Stock>) => void;
  addStock: (stock: Omit<Stock, 'id'>) => void;
  updateConfig: (updates: Partial<GameConfig>) => void;
  
  // Round Operations
  executeNormalRound: (stockId: string, teamPurchases: Record<string, number>, deductCash?: boolean) => { success: boolean; message: string };
  executeInsiderRound: (
    stockId: string,
    winnerTeamId: string,
    winnerBid: number,
    winnerLots?: number,
    pass?: 1 | 2,
    runnerUpTeamId?: string,
    runnerUpBid?: number,
    runnerUpLots?: number,
    deductCash?: boolean
  ) => { success: boolean; message: string };
  executeInsiderNewsAuction: (
    stockId: string,
    winnerTeamId: string,
    bidAmount: number,
    deductCash?: boolean
  ) => { success: boolean; message: string };
  executeStockAuction5Lots: (
    stockId: string,
    winnerTeamId: string,
    winnerBid: number,
    runnerUpTeamId?: string,
    runnerUpBid?: number,
    runnerUpLots?: number,
    deductCash?: boolean
  ) => { success: boolean; message: string };
  executeStockAllotment3Lots: (
    stockId: string,
    teamId: string,
    lots: number,
    priceDeducted: number,
    deductCash?: boolean
  ) => { success: boolean; message: string };
  executeExchangeTrade: (stockId: string, sellerTeamId: string, buyerTeamId: string, finalPrice: number, sellerReserve?: number) => { success: boolean; message: string };
  
  // Rectification & Mistake Correction Operations
  revertNormalTransaction: (txId: string) => { success: boolean; message: string };
  revertInsiderTransaction: (txId: string) => { success: boolean; message: string };
  revertInsiderNewsTransaction: (txId: string) => { success: boolean; message: string };
  revertExchangeTransaction: (txId: string) => { success: boolean; message: string };
  rectifyTeamHolding: (teamId: string, stockId: string, newLots: number, adjustCash?: boolean, cashDelta?: number) => { success: boolean; message: string };
  rectifyTeamCash: (teamId: string, newCash: number) => void;
  rectifyTeamPenaltyAndBonus: (teamId: string, penalties: number, bonus: number) => void;

  // Multipliers & Valuation
  toggleRevealMultiplier: (stockId: string) => void;
  revealAllMultipliers: () => void;
  hideAllMultipliers: () => void;
  
  // Game Management
  resetGame: () => void;
  loadDemoGame: () => void;
  exportGameState: () => string;
  importGameState: (jsonStr: string) => boolean;
  
  // Computed
  valuations: TeamValuation[];
}

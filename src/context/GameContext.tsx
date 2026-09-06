import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Stock, 
  Team, 
  GameConfig, 
  NormalRoundTransaction, 
  InsiderRoundTransaction, 
  InsiderNewsTransaction,
  ExchangeTransaction, 
  TeamValuation, 
  GameContextType 
} from '../types';
import { INITIAL_STOCKS, DEFAULT_TEAMS } from '../data/defaultStocks';
import { calculateAllTeamsValuation } from '../utils/calculations';

const STORAGE_KEY = 'WOLF_BIT_MESRA_CALC_V101';

const DEFAULT_CONFIG: GameConfig = {
  eventName: 'WOLF OF BIT MESRA',
  clubName: 'Finance Club, BIT Mesra',
  startingCash: 1000000,
  lotSize: 20,
  lotBasePrice: 10000,
  maxLotsPerStock: 999999, // No limitation of lots
  minBidIncrement: 5000,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<Stock[]>(() => {
    // Official 100 stocks from Table 1 are authoritative for return percentages
    const saved = localStorage.getItem(`${STORAGE_KEY}_STOCKS`);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === INITIAL_STOCKS.length) {
          return INITIAL_STOCKS.map(initStock => {
            const savedStock = parsed.find((p: Stock) => p.id === initStock.id);
            if (savedStock) {
              return {
                ...initStock,
                openingBidPrice: typeof savedStock.openingBidPrice === 'number' ? savedStock.openingBidPrice : initStock.openingBidPrice,
                returnPercent: initStock.returnPercent,
              };
            }
            return initStock;
          });
        }
      } catch (e) {}
    }
    return INITIAL_STOCKS;
  });

  const [config, setConfig] = useState<GameConfig>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_CONFIG`) || localStorage.getItem('WOLF_BIT_MESRA_CALC_V100_CONFIG') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V7_CONFIG') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V4_CONFIG') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V3_CONFIG');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CONFIG, ...parsed };
      } catch (e) {}
    }
    return DEFAULT_CONFIG;
  });

  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_TEAMS`) || localStorage.getItem('WOLF_BIT_MESRA_CALC_V100_TEAMS') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V7_TEAMS') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V4_TEAMS') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V3_TEAMS');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return DEFAULT_TEAMS.map(dt => ({
      id: dt.id,
      name: dt.name,
      avatarColor: dt.avatarColor,
      startingCash: DEFAULT_CONFIG.startingCash,
      cash: DEFAULT_CONFIG.startingCash,
      holdings: {},
      holdingInvested: {},
      penalties: 0,
      bonus: 0
    }));
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedStockId, setSelectedStockId] = useState<string>(INITIAL_STOCKS[0].id);
  const [revealedMultipliers, setRevealedMultipliers] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_REVEALED`) || localStorage.getItem('WOLF_BIT_MESRA_CALC_V100_REVEALED') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V7_REVEALED') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V4_REVEALED') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V3_REVEALED');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {};
  });

  const [normalTransactions, setNormalTransactions] = useState<NormalRoundTransaction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_NORMAL_TX`) || localStorage.getItem('WOLF_BIT_MESRA_CALC_V100_NORMAL_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V7_NORMAL_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V4_NORMAL_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V3_NORMAL_TX');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  const [insiderTransactions, setInsiderTransactions] = useState<InsiderRoundTransaction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_INSIDER_TX`) || localStorage.getItem('WOLF_BIT_MESRA_CALC_V100_INSIDER_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V7_INSIDER_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V4_INSIDER_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V3_INSIDER_TX');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  const [insiderNewsTransactions, setInsiderNewsTransactions] = useState<InsiderNewsTransaction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_INSIDER_NEWS_TX`) || localStorage.getItem('WOLF_BIT_MESRA_CALC_V100_INSIDER_NEWS_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V7_INSIDER_NEWS_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V4_INSIDER_NEWS_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V3_INSIDER_NEWS_TX');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  const [exchangeTransactions, setExchangeTransactions] = useState<ExchangeTransaction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_EXCHANGE_TX`) || localStorage.getItem('WOLF_BIT_MESRA_CALC_V100_EXCHANGE_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V7_EXCHANGE_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V4_EXCHANGE_TX') || localStorage.getItem('WOLF_BIT_MESRA_CALC_V3_EXCHANGE_TX');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_STOCKS`, JSON.stringify(stocks));
  }, [stocks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_TEAMS`, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_CONFIG`, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_REVEALED`, JSON.stringify(revealedMultipliers));
  }, [revealedMultipliers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_NORMAL_TX`, JSON.stringify(normalTransactions));
  }, [normalTransactions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_INSIDER_TX`, JSON.stringify(insiderTransactions));
  }, [insiderTransactions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_INSIDER_NEWS_TX`, JSON.stringify(insiderNewsTransactions));
  }, [insiderNewsTransactions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_EXCHANGE_TX`, JSON.stringify(exchangeTransactions));
  }, [exchangeTransactions]);

  // Ensure team.holdingInvested is always initialized and synced with transaction history
  useEffect(() => {
    setTeams(prevTeams => {
      let hasChanges = false;
      const updatedTeams = prevTeams.map(team => {
        let teamChanged = false;
        const currentInvested = { ...(team.holdingInvested || {}) };

        Object.entries(team.holdings).forEach(([stockId, lots]) => {
          const lotCount = Number(lots) || 0;
          if (lotCount > 0) {
            // Check if there is an insider transaction for this team and stock
            const insiderTx = insiderTransactions.find(
              tx => tx.stockId === stockId && tx.winnerTeamId === team.id && (tx.pass === 1 || tx.winnerLots === 5 || tx.type === '5_lots_bid')
            );
            if (insiderTx && insiderTx.winnerBid > 0 && currentInvested[stockId] !== insiderTx.winnerBid) {
              currentInvested[stockId] = insiderTx.winnerBid;
              teamChanged = true;
            } else if (currentInvested[stockId] === undefined || currentInvested[stockId] <= 0) {
              currentInvested[stockId] = lotCount * config.lotBasePrice;
              teamChanged = true;
            }
          } else if (currentInvested[stockId] !== undefined) {
            delete currentInvested[stockId];
            teamChanged = true;
          }
        });

        if (teamChanged) {
          hasChanges = true;
          return { ...team, holdingInvested: currentInvested };
        }
        return team;
      });

      return hasChanges ? updatedTeams : prevTeams;
    });
  }, [insiderTransactions, config.lotBasePrice]);

  const addTeam = (name: string) => {
    const newId = `team-${Date.now()}`;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
    const nextLetter = letters[teams.length] || `${teams.length + 1}`;
    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#14b8a6', '#6366f1', '#eab308'];
    const color = colors[teams.length % colors.length];
    
    const newTeam: Team = {
      id: newId,
      name: name.trim() || `Team ${nextLetter}`,
      avatarColor: color,
      startingCash: config.startingCash,
      cash: config.startingCash,
      holdings: {},
      penalties: 0,
      bonus: 0
    };

    setTeams(prev => [...prev, newTeam]);
  };

  const updateTeam = (id: string, updates: Partial<Team>) => {
    setTeams(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const setTeamCash = (teamId: string, newCash: number) => {
    setTeams(prev => prev.map(t => (t.id === teamId ? { ...t, cash: Math.max(0, newCash) } : t)));
  };

  const adjustTeamCash = (teamId: string, delta: number) => {
    setTeams(prev => prev.map(t => (t.id === teamId ? { ...t, cash: Math.max(0, t.cash + delta) } : t)));
  };

  const setTeamStockLots = (teamId: string, stockId: string, lots: number) => {
    const safeLots = Math.max(0, lots);
    setTeams(prev => prev.map(t => {
      if (t.id !== teamId) return t;
      const updatedHoldings = { ...t.holdings };
      const updatedInvested = { ...(t.holdingInvested || {}) };
      if (safeLots === 0) {
        delete updatedHoldings[stockId];
        delete updatedInvested[stockId];
      } else {
        const curLots = t.holdings[stockId] || 0;
        updatedHoldings[stockId] = safeLots;
        if (updatedInvested[stockId] === undefined) {
          updatedInvested[stockId] = safeLots * config.lotBasePrice;
        } else if (curLots > 0) {
          updatedInvested[stockId] = Math.round((updatedInvested[stockId] / curLots) * safeLots);
        }
      }
      return { ...t, holdings: updatedHoldings, holdingInvested: updatedInvested };
    }));
  };

  const removeTeam = (id: string) => {
    setTeams(prev => prev.filter(t => t.id !== id));
  };

  const updateStock = (id: string, updates: Partial<Stock>) => {
    setStocks(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  const addStock = (stockData: Omit<Stock, 'id'>) => {
    // Strictly maintain the 100 stocks of the official rulebook sheet
    const newId = `stock-${Date.now()}`;
    setStocks(prev => {
      if (prev.length >= 100) return prev;
      return [...prev, { ...stockData, id: newId }];
    });
  };

  const syncOfficialStocks = () => {
    setStocks(INITIAL_STOCKS);
    try {
      localStorage.setItem(`${STORAGE_KEY}_STOCKS`, JSON.stringify(INITIAL_STOCKS));
    } catch (e) {}
  };

  const updateConfig = (updates: Partial<GameConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const resetAllTeamsToCapital = (amount: number = 1000000) => {
    setTeams(prev => prev.map(t => ({
      ...t,
      startingCash: amount,
      cash: amount,
      holdings: {},
      holdingInvested: {},
      penalties: 0,
      bonus: 0
    })));
  };

  // Normal round lot purchases / allocations
  // Per Section 3: Announced starting bid buys 1 lot. Bidding bigger amount buys more lots at once.
  const executeNormalRound = (
    stockId: string, 
    teamPurchases: Record<string, number>, 
    deductCash: boolean = true,
    customLotPrices?: Record<string, number>
  ) => {
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) return { success: false, message: 'Stock not found' };

    const getLotPrice = (teamId: string) => {
      if (customLotPrices && customLotPrices[teamId] !== undefined && customLotPrices[teamId] > 0) {
        return customLotPrices[teamId];
      }
      return stock.openingBidPrice || config.lotBasePrice || 10000;
    };

    // Validate
    for (const team of teams) {
      const additionalLots = teamPurchases[team.id] || 0;
      if (additionalLots <= 0) continue;

      if (deductCash) {
        const lotPrice = getLotPrice(team.id);
        const totalCost = additionalLots * lotPrice;
        if (team.cash < totalCost) {
          return {
            success: false,
            message: `${team.name} has insufficient cash (Required: ₹${totalCost.toLocaleString('en-IN')}, Available: ₹${team.cash.toLocaleString('en-IN')})`
          };
        }
      }
    }

    // Apply
    const recordedPurchases: Array<{ teamId: string; lots: number; amountPaid: number }> = [];

    setTeams(prev =>
      prev.map(team => {
        const additionalLots = teamPurchases[team.id] || 0;
        if (additionalLots <= 0) return team;

        const lotPrice = getLotPrice(team.id);
        const totalCost = additionalLots * lotPrice;
        const currentLots = team.holdings[stockId] || 0;
        const currentInvested = team.holdingInvested?.[stockId] ?? (currentLots * (stock.openingBidPrice || config.lotBasePrice));

        recordedPurchases.push({
          teamId: team.id,
          lots: additionalLots,
          amountPaid: deductCash ? totalCost : 0
        });

        return {
          ...team,
          cash: deductCash ? team.cash - totalCost : team.cash,
          holdings: {
            ...team.holdings,
            [stockId]: currentLots + additionalLots
          },
          holdingInvested: {
            ...(team.holdingInvested || {}),
            [stockId]: currentInvested + totalCost
          }
        };
      })
    );

    if (recordedPurchases.length > 0) {
      setNormalTransactions(prev => [
        {
          id: `normal-tx-${Date.now()}`,
          timestamp: Date.now(),
          stockId,
          teamPurchases: recordedPurchases
        },
        ...prev
      ]);
    }

    return { 
      success: true, 
      message: `Successfully allocated shares of ${stock.name}${deductCash ? ' and deducted cash' : ' (allotment recorded; cash handled manually)'}!` 
    };
  };

  // Section 4: Official Insider Round Auction (Confidential Intelligence)
  // One-winner auction where the single highest bidder unlocks confidential inside information.
  // Note: No automatic share/lot allotment in the insider round. Winning bid pays for intelligence.
  // There is NO limit/cap on how many insider rounds each team can win.
  const executeInsiderRound6Lots = (
    stockId: string,
    winnerTeamId: string,
    winningBid: number,
    deductCash: boolean = true
  ) => {
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) return { success: false, message: 'Stock not found' };

    const winner = teams.find(t => t.id === winnerTeamId);
    if (!winner) return { success: false, message: 'Winner team not found' };

    if (deductCash && winner.cash < winningBid) {
      return { 
        success: false, 
        message: `${winner.name} has insufficient cash for winning bid ₹${winningBid.toLocaleString('en-IN')} (Available: ₹${winner.cash.toLocaleString('en-IN')})` 
      };
    }

    // Deduct bid from winner's cash. NO lots are allotted!
    if (deductCash && winningBid > 0) {
      setTeams(prev =>
        prev.map(team => {
          if (team.id === winnerTeamId) {
            return {
              ...team,
              cash: team.cash - winningBid
            };
          }
          return team;
        })
      );
    }

    setInsiderTransactions(prev => [
      {
        id: `insider-intel-tx-${Date.now()}`,
        timestamp: Date.now(),
        stockId,
        type: 'intel_bid',
        pass: 1,
        winnerTeamId,
        winnerBid: winningBid,
        winnerLots: 0,
        deductCash
      },
      ...prev
    ]);

    setInsiderNewsTransactions(prev => [
      {
        id: `news-tx-${Date.now()}`,
        timestamp: Date.now(),
        stockId,
        winnerTeamId,
        bidAmount: winningBid,
        deductCash: false // cash handled above
      },
      ...prev
    ]);

    return {
      success: true,
      message: `Insider Round Won by ${winner.name}! Confidential intelligence unlocked for winning bid of ₹${winningBid.toLocaleString('en-IN')}${deductCash ? ' (cash deducted)' : ''} (No shares allotted).`
    };
  };

  const executeInsiderRoundIntel = executeInsiderRound6Lots;

  // 1. Insider News Bidding (Auction for Secret Clue / Intel)
  const executeInsiderNewsAuction = (
    stockId: string,
    winnerTeamId: string,
    bidAmount: number,
    deductCash: boolean = true
  ) => {
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) return { success: false, message: 'Stock not found' };

    const winner = teams.find(t => t.id === winnerTeamId);
    if (!winner) return { success: false, message: 'Winner team not found' };

    if (deductCash && winner.cash < bidAmount) {
      return { 
        success: false, 
        message: `${winner.name} has insufficient cash for Insider News bid ₹${bidAmount.toLocaleString('en-IN')} (Available: ₹${winner.cash.toLocaleString('en-IN')})` 
      };
    }

    // Deduct cash if selected
    if (deductCash && bidAmount > 0) {
      setTeams(prev =>
        prev.map(team => (team.id === winnerTeamId ? { ...team, cash: team.cash - bidAmount } : team))
      );
    }

    setInsiderNewsTransactions(prev => [
      {
        id: `news-tx-${Date.now()}`,
        timestamp: Date.now(),
        stockId,
        winnerTeamId,
        bidAmount,
        deductCash
      },
      ...prev
    ]);

    return {
      success: true,
      message: `Insider News for ${stock.name} won by ${winner.name}! Bid of ₹${bidAmount.toLocaleString('en-IN')}${deductCash ? ' deducted from cash' : ' recorded'}.`
    };
  };

  // 2. 5-Lots Stock Auction (Highest Bidder Wins 5 Lots / 100 Shares)
  const executeStockAuction5Lots = (
    stockId: string,
    winnerTeamId: string,
    winnerBid: number,
    runnerUpTeamId?: string,
    runnerUpBid?: number,
    runnerUpLots: number = 0,
    deductCash: boolean = true
  ) => {
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) return { success: false, message: 'Stock not found' };

    const winner = teams.find(t => t.id === winnerTeamId);
    if (!winner) return { success: false, message: 'Winner team not found' };

    if (deductCash && winner.cash < winnerBid) {
      return { 
        success: false, 
        message: `${winner.name} has insufficient cash for winning bid ₹${winnerBid.toLocaleString('en-IN')} (Available: ₹${winner.cash.toLocaleString('en-IN')})` 
      };
    }

    let runnerUp: Team | undefined;
    if (runnerUpTeamId && runnerUpBid && runnerUpBid > 0 && runnerUpLots > 0) {
      runnerUp = teams.find(t => t.id === runnerUpTeamId);
      if (!runnerUp) return { success: false, message: 'Runner-up team not found' };

      if (deductCash && runnerUp.cash < runnerUpBid) {
        return { 
          success: false, 
          message: `${runnerUp.name} has insufficient cash for runner-up bid ₹${runnerUpBid.toLocaleString('en-IN')}` 
        };
      }
    }

    // Apply 5 lots to winner & deduct bid
    setTeams(prev =>
      prev.map(team => {
        if (team.id === winnerTeamId) {
          const currentLots = team.holdings[stockId] || 0;
          const currentInvested = team.holdingInvested?.[stockId] ?? (currentLots * config.lotBasePrice);
          return {
            ...team,
            cash: deductCash ? team.cash - winnerBid : team.cash,
            holdings: {
              ...team.holdings,
              [stockId]: currentLots + 5
            },
            holdingInvested: {
              ...(team.holdingInvested || {}),
              [stockId]: currentInvested + winnerBid
            }
          };
        }
        if (runnerUp && team.id === runnerUp.id && runnerUpBid && runnerUpLots > 0) {
          const currentLots = team.holdings[stockId] || 0;
          const currentInvested = team.holdingInvested?.[stockId] ?? (currentLots * config.lotBasePrice);
          return {
            ...team,
            cash: deductCash ? team.cash - runnerUpBid : team.cash,
            holdings: {
              ...team.holdings,
              [stockId]: currentLots + runnerUpLots
            },
            holdingInvested: {
              ...(team.holdingInvested || {}),
              [stockId]: currentInvested + runnerUpBid
            }
          };
        }
        return team;
      })
    );

    setInsiderTransactions(prev => [
      {
        id: `insider-5l-tx-${Date.now()}`,
        timestamp: Date.now(),
        stockId,
        type: '5_lots_bid',
        pass: 1,
        winnerTeamId,
        winnerBid,
        winnerLots: 5,
        runnerUpTeamId: runnerUp ? runnerUpTeamId : undefined,
        runnerUpBid: runnerUp ? runnerUpBid : undefined,
        runnerUpLots: runnerUp ? runnerUpLots : undefined,
        deductCash
      },
      ...prev
    ]);

    return {
      success: true,
      message: `5 Lots (100 shares) of ${stock.name} awarded to ${winner.name} for highest bid ₹${winnerBid.toLocaleString('en-IN')}${deductCash ? ' (cash deducted)' : ''}!`
    };
  };

  // 3. 3-Lots Stock Allocation (Price Deducted by Us / Host Allotment)
  const executeStockAllotment3Lots = (
    stockId: string,
    teamId: string,
    lots: number = 3,
    priceDeducted: number = 30000,
    deductCash: boolean = true
  ) => {
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) return { success: false, message: 'Stock not found' };

    const team = teams.find(t => t.id === teamId);
    if (!team) return { success: false, message: 'Team not found' };

    if (deductCash && team.cash < priceDeducted) {
      return {
        success: false,
        message: `${team.name} has insufficient cash (Required: ₹${priceDeducted.toLocaleString('en-IN')}, Available: ₹${team.cash.toLocaleString('en-IN')})`
      };
    }

    // Apply lots and deduct specified price
    setTeams(prev =>
      prev.map(t => {
        if (t.id === teamId) {
          const currentLots = t.holdings[stockId] || 0;
          const currentInvested = t.holdingInvested?.[stockId] ?? (currentLots * config.lotBasePrice);
          return {
            ...t,
            cash: deductCash ? t.cash - priceDeducted : t.cash,
            holdings: {
              ...t.holdings,
              [stockId]: currentLots + lots
            },
            holdingInvested: {
              ...(t.holdingInvested || {}),
              [stockId]: currentInvested + priceDeducted
            }
          };
        }
        return t;
      })
    );

    setInsiderTransactions(prev => [
      {
        id: `insider-3l-tx-${Date.now()}`,
        timestamp: Date.now(),
        stockId,
        type: '3_lots_allotment',
        pass: 2,
        winnerTeamId: teamId,
        winnerBid: priceDeducted,
        winnerLots: lots,
        deductCash
      },
      ...prev
    ]);

    return {
      success: true,
      message: `${lots} Lots (${lots * 20} shares) of ${stock.name} allotted to ${team.name} with price ₹${priceDeducted.toLocaleString('en-IN')}${deductCash ? ' deducted by host' : ' recorded'}!`
    };
  };

  // General Insider Round wrapper
  const executeInsiderRound = (
    stockId: string,
    winnerTeamId: string,
    winnerBid: number,
    winnerLots: number = 5,
    pass: 1 | 2 = 1,
    runnerUpTeamId?: string,
    runnerUpBid?: number,
    runnerUpLots: number = 0,
    deductCash: boolean = true
  ) => {
    if (winnerLots === 5 || pass === 1) {
      return executeStockAuction5Lots(stockId, winnerTeamId, winnerBid, runnerUpTeamId, runnerUpBid, runnerUpLots, deductCash);
    } else {
      return executeStockAllotment3Lots(stockId, winnerTeamId, winnerLots, winnerBid, deductCash);
    }
  };

  // Exchange trade
  const executeExchangeTrade = (
    stockId: string,
    sellerTeamId: string,
    buyerTeamId: string,
    finalPrice: number,
    sellerReserve?: number
  ) => {
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) return { success: false, message: 'Stock not found' };

    const seller = teams.find(t => t.id === sellerTeamId);
    const buyer = teams.find(t => t.id === buyerTeamId);

    if (!seller || !buyer) return { success: false, message: 'Seller or Buyer team not found' };
    if (seller.id === buyer.id) return { success: false, message: 'Seller and buyer cannot be the same team' };

    const sellerLots = seller.holdings[stockId] || 0;
    if (sellerLots < 1) {
      return { success: false, message: `${seller.name} does not own any lots of ${stock.name} to sell` };
    }

    if (buyer.cash < finalPrice) {
      return { success: false, message: `${buyer.name} does not have enough cash (₹${buyer.cash.toLocaleString('en-IN')} available, required ₹${finalPrice.toLocaleString('en-IN')})` };
    }

    // Execute transfer
    setTeams(prev =>
      prev.map(team => {
        if (team.id === sellerTeamId) {
          const currentLots = team.holdings[stockId] || 0;
          const currentInvested = team.holdingInvested?.[stockId] ?? (currentLots * config.lotBasePrice);
          const costPerLot = currentLots > 0 ? currentInvested / currentLots : config.lotBasePrice;
          const updatedInvested = { ...(team.holdingInvested || {}) };
          if (currentLots <= 1) {
            delete updatedInvested[stockId];
          } else {
            updatedInvested[stockId] = Math.max(0, currentInvested - costPerLot);
          }

          return {
            ...team,
            cash: team.cash + finalPrice,
            holdings: {
              ...team.holdings,
              [stockId]: Math.max(0, currentLots - 1)
            },
            holdingInvested: updatedInvested
          };
        }
        if (team.id === buyerTeamId) {
          const currentLots = team.holdings[stockId] || 0;
          const currentInvested = team.holdingInvested?.[stockId] ?? (currentLots * config.lotBasePrice);
          return {
            ...team,
            cash: team.cash - finalPrice,
            holdings: {
              ...team.holdings,
              [stockId]: currentLots + 1
            },
            holdingInvested: {
              ...(team.holdingInvested || {}),
              [stockId]: currentInvested + finalPrice
            }
          };
        }
        return team;
      })
    );

    setExchangeTransactions(prev => [
      {
        id: `exchange-tx-${Date.now()}`,
        timestamp: Date.now(),
        stockId,
        sellerTeamId,
        buyerTeamId,
        lots: 1,
        finalPrice,
        sellerReservePrice: sellerReserve
      },
      ...prev
    ]);

    return { 
      success: true, 
      message: `Exchange trade executed! 1 lot of ${stock.name} transferred from ${seller.name} to ${buyer.name} for ₹${finalPrice.toLocaleString('en-IN')}` 
    };
  };

  // Reversals & Undo Methods (Mistake Rectification)
  const revertNormalTransaction = (txId: string) => {
    const tx = normalTransactions.find(t => t.id === txId);
    if (!tx) return { success: false, message: 'Allotment transaction not found' };

    const stock = stocks.find(s => s.id === tx.stockId);
    const stockName = stock?.name || 'Stock';

    setTeams(prev =>
      prev.map(team => {
        const purchase = tx.teamPurchases.find(p => p.teamId === team.id);
        if (!purchase) return team;

        const currentLots = team.holdings[tx.stockId] || 0;
        const newLots = Math.max(0, currentLots - purchase.lots);
        const updatedHoldings = { ...team.holdings };
        const updatedInvested = { ...(team.holdingInvested || {}) };
        
        const costToDeduct = purchase.amountPaid > 0 ? purchase.amountPaid : (purchase.lots * config.lotBasePrice);
        const currentInvested = updatedInvested[tx.stockId] ?? (currentLots * config.lotBasePrice);
        const newInvested = Math.max(0, currentInvested - costToDeduct);

        if (newLots === 0) {
          delete updatedHoldings[tx.stockId];
          delete updatedInvested[tx.stockId];
        } else {
          updatedHoldings[tx.stockId] = newLots;
          updatedInvested[tx.stockId] = newInvested;
        }

        return {
          ...team,
          cash: team.cash + purchase.amountPaid,
          holdings: updatedHoldings,
          holdingInvested: updatedInvested
        };
      })
    );

    setNormalTransactions(prev => prev.filter(t => t.id !== txId));
    return {
      success: true,
      message: `Reverted allotment for ${stockName}! Lots removed and ₹${tx.teamPurchases.reduce((a, b) => a + b.amountPaid, 0).toLocaleString('en-IN')} refunded.`
    };
  };

  const revertInsiderTransaction = (txId: string) => {
    const tx = insiderTransactions.find(t => t.id === txId);
    if (!tx) return { success: false, message: 'Insider transaction not found' };

    const stock = stocks.find(s => s.id === tx.stockId);
    const stockName = stock?.name || 'Stock';

    setTeams(prev =>
      prev.map(team => {
        let updated = { ...team };
        const updatedHoldings = { ...team.holdings };
        const updatedInvested = { ...(team.holdingInvested || {}) };

        if (team.id === tx.winnerTeamId) {
          const currentLots = team.holdings[tx.stockId] || 0;
          const newLots = Math.max(0, currentLots - tx.winnerLots);
          const currentInvested = updatedInvested[tx.stockId] ?? (currentLots * config.lotBasePrice);
          const newInvested = Math.max(0, currentInvested - tx.winnerBid);

          if (newLots === 0) {
            delete updatedHoldings[tx.stockId];
            delete updatedInvested[tx.stockId];
          } else {
            updatedHoldings[tx.stockId] = newLots;
            updatedInvested[tx.stockId] = newInvested;
          }

          updated = {
            ...updated,
            cash: tx.deductCash ? updated.cash + tx.winnerBid : updated.cash,
            holdings: updatedHoldings,
            holdingInvested: updatedInvested
          };
        }

        if (tx.runnerUpTeamId && team.id === tx.runnerUpTeamId && tx.runnerUpLots) {
          const rCurrentLots = updated.holdings[tx.stockId] || 0;
          const rNewLots = Math.max(0, rCurrentLots - tx.runnerUpLots);
          const rCurrentInvested = updatedInvested[tx.stockId] ?? (rCurrentLots * config.lotBasePrice);
          const rNewInvested = Math.max(0, rCurrentInvested - (tx.runnerUpBid || (tx.runnerUpLots * config.lotBasePrice)));

          if (rNewLots === 0) {
            delete updatedHoldings[tx.stockId];
            delete updatedInvested[tx.stockId];
          } else {
            updatedHoldings[tx.stockId] = rNewLots;
            updatedInvested[tx.stockId] = rNewInvested;
          }

          updated = {
            ...updated,
            cash: tx.deductCash && tx.runnerUpBid ? updated.cash + tx.runnerUpBid : updated.cash,
            holdings: updatedHoldings,
            holdingInvested: updatedInvested
          };
        }

        return updated;
      })
    );

    setInsiderTransactions(prev => prev.filter(t => t.id !== txId));
    return {
      success: true,
      message: `Reverted insider transaction for ${stockName}! Lots removed and cash refunded.`
    };
  };

  const revertInsiderNewsTransaction = (txId: string) => {
    const tx = insiderNewsTransactions.find(t => t.id === txId);
    if (!tx) return { success: false, message: 'News bid transaction not found' };

    const stock = stocks.find(s => s.id === tx.stockId);
    const stockName = stock?.name || 'Stock';

    if (tx.deductCash && tx.bidAmount > 0) {
      setTeams(prev =>
        prev.map(team => (team.id === tx.winnerTeamId ? { ...team, cash: team.cash + tx.bidAmount } : team))
      );
    }

    setInsiderNewsTransactions(prev => prev.filter(t => t.id !== txId));
    return {
      success: true,
      message: `Reverted insider news bid for ${stockName}! ₹${tx.bidAmount.toLocaleString('en-IN')} refunded to winner.`
    };
  };

  const revertExchangeTransaction = (txId: string) => {
    const tx = exchangeTransactions.find(t => t.id === txId);
    if (!tx) return { success: false, message: 'Exchange trade not found' };

    const stock = stocks.find(s => s.id === tx.stockId);
    const stockName = stock?.name || 'Stock';

    setTeams(prev =>
      prev.map(team => {
        if (team.id === tx.sellerTeamId) {
          const curLots = team.holdings[tx.stockId] || 0;
          const updatedInvested = { ...(team.holdingInvested || {}) };
          const curInvested = updatedInvested[tx.stockId] ?? (curLots * config.lotBasePrice);

          return {
            ...team,
            cash: team.cash - tx.finalPrice,
            holdings: {
              ...team.holdings,
              [tx.stockId]: curLots + tx.lots
            },
            holdingInvested: {
              ...updatedInvested,
              [tx.stockId]: curInvested + tx.finalPrice
            }
          };
        }
        if (team.id === tx.buyerTeamId) {
          const curLots = team.holdings[tx.stockId] || 0;
          const newLots = Math.max(0, curLots - tx.lots);
          const updatedHoldings = { ...team.holdings };
          const updatedInvested = { ...(team.holdingInvested || {}) };
          const curInvested = updatedInvested[tx.stockId] ?? (curLots * config.lotBasePrice);
          const newInvested = Math.max(0, curInvested - tx.finalPrice);

          if (newLots === 0) {
            delete updatedHoldings[tx.stockId];
            delete updatedInvested[tx.stockId];
          } else {
            updatedHoldings[tx.stockId] = newLots;
            updatedInvested[tx.stockId] = newInvested;
          }

          return {
            ...team,
            cash: team.cash + tx.finalPrice,
            holdings: updatedHoldings,
            holdingInvested: updatedInvested
          };
        }
        return team;
      })
    );

    setExchangeTransactions(prev => prev.filter(t => t.id !== txId));
    return {
      success: true,
      message: `Reversed exchange trade for ${stockName}! ${tx.lots} lot returned to seller and ₹${tx.finalPrice.toLocaleString('en-IN')} refunded to buyer.`
    };
  };

  // Direct Portfolio & Counting Rectification
  const rectifyTeamHolding = (
    teamId: string,
    stockId: string,
    newLots: number,
    adjustCash: boolean = false,
    cashDelta?: number,
    customInvested?: number
  ) => {
    const team = teams.find(t => t.id === teamId);
    const stock = stocks.find(s => s.id === stockId);
    if (!team || !stock) return { success: false, message: 'Team or Stock not found' };

    const safeLots = Math.max(0, newLots);
    const currentLots = team.holdings[stockId] || 0;
    const lotDiff = safeLots - currentLots;

    const calculatedCashAdjustment = cashDelta !== undefined 
      ? cashDelta 
      : adjustCash 
      ? - (lotDiff * config.lotBasePrice) 
      : 0;

    setTeams(prev =>
      prev.map(t => {
        if (t.id !== teamId) return t;
        const updatedHoldings = { ...t.holdings };
        const updatedInvested = { ...(t.holdingInvested || {}) };

        if (safeLots === 0) {
          delete updatedHoldings[stockId];
          delete updatedInvested[stockId];
        } else {
          updatedHoldings[stockId] = safeLots;
          if (customInvested !== undefined && customInvested >= 0) {
            updatedInvested[stockId] = customInvested;
          } else if (updatedInvested[stockId] === undefined) {
            updatedInvested[stockId] = safeLots * config.lotBasePrice;
          } else if (currentLots > 0) {
            updatedInvested[stockId] = Math.round((updatedInvested[stockId] / currentLots) * safeLots);
          }
        }

        return {
          ...t,
          cash: Math.max(0, t.cash + calculatedCashAdjustment),
          holdings: updatedHoldings,
          holdingInvested: updatedInvested
        };
      })
    );

    return {
      success: true,
      message: `Rectified ${team.name}'s holdings of ${stock.name}: ${currentLots} → ${safeLots} lots (${safeLots * 20} shares)${calculatedCashAdjustment !== 0 ? ` (Cash adjusted by ${calculatedCashAdjustment > 0 ? '+' : ''}₹${calculatedCashAdjustment.toLocaleString('en-IN')})` : ''}!`
    };
  };

  const rectifyTeamCash = (teamId: string, newCash: number) => {
    setTeams(prev => prev.map(t => (t.id === teamId ? { ...t, cash: Math.max(0, newCash) } : t)));
  };

  const rectifyTeamPenaltyAndBonus = (teamId: string, penalties: number, bonus: number) => {
    setTeams(prev => prev.map(t => (t.id === teamId ? { ...t, penalties: Math.max(0, penalties), bonus: Math.max(0, bonus) } : t)));
  };

  // Multiplier reveals
  const toggleRevealMultiplier = (stockId: string) => {
    setRevealedMultipliers(prev => ({
      ...prev,
      [stockId]: !prev[stockId]
    }));
  };

  const revealAllMultipliers = () => {
    const all: Record<string, boolean> = {};
    stocks.forEach(s => { all[s.id] = true; });
    setRevealedMultipliers(all);
  };

  const hideAllMultipliers = () => {
    setRevealedMultipliers({});
  };

  const resetGame = () => {
    setStocks(INITIAL_STOCKS);
    try {
      localStorage.setItem(`${STORAGE_KEY}_STOCKS`, JSON.stringify(INITIAL_STOCKS));
    } catch (e) {}
    setTeams(DEFAULT_TEAMS.map(dt => ({
      id: dt.id,
      name: dt.name,
      avatarColor: dt.avatarColor,
      startingCash: config.startingCash,
      cash: config.startingCash,
      holdings: {},
      holdingInvested: {},
      penalties: 0,
      bonus: 0
    })));
    setNormalTransactions([]);
    setInsiderTransactions([]);
    setInsiderNewsTransactions([]);
    setExchangeTransactions([]);
    setRevealedMultipliers({});
  };

  const loadDemoGame = () => {
    const demoTeams: Team[] = DEFAULT_TEAMS.map((dt, idx) => {
      const holdings: Record<string, number> = {};
      const holdingInvested: Record<string, number> = {};
      let remainingCash = config.startingCash;
      
      // User's specific showcase scenario: Team A bought 5 lots of Reliance in 40k!
      if (idx === 0) {
        holdings['reliance'] = 5;
        holdingInvested['reliance'] = 40000;
        remainingCash -= 40000;
      }

      const stockSubset = stocks.slice(idx * 3, idx * 3 + 5);
      stockSubset.forEach((st, sIdx) => {
        if (idx === 0 && st.id === 'reliance') return;
        const lots = ((idx + sIdx) % 4) + 1;
        const cost = lots * 10000;
        if (remainingCash >= cost) {
          holdings[st.id] = lots;
          holdingInvested[st.id] = cost;
          remainingCash -= cost;
        }
      });

      return {
        id: dt.id,
        name: dt.name,
        avatarColor: dt.avatarColor,
        startingCash: config.startingCash,
        cash: remainingCash,
        holdings,
        holdingInvested,
        penalties: idx === 3 ? 10000 : 0,
        bonus: idx === 1 ? 5000 : 0
      };
    });

    setTeams(demoTeams);
  };

  const exportGameState = () => {
    const state = {
      stocks,
      teams,
      config,
      revealedMultipliers,
      normalTransactions,
      insiderTransactions,
      insiderNewsTransactions,
      exchangeTransactions,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(state, null, 2);
  };

  const importGameState = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.stocks) setStocks(parsed.stocks);
      if (parsed.teams) setTeams(parsed.teams);
      if (parsed.config) setConfig(parsed.config);
      if (parsed.revealedMultipliers) setRevealedMultipliers(parsed.revealedMultipliers);
      if (parsed.normalTransactions) setNormalTransactions(parsed.normalTransactions);
      if (parsed.insiderTransactions) setInsiderTransactions(parsed.insiderTransactions);
      if (parsed.insiderNewsTransactions) setInsiderNewsTransactions(parsed.insiderNewsTransactions);
      if (parsed.exchangeTransactions) setExchangeTransactions(parsed.exchangeTransactions);
      return true;
    } catch (e) {
      console.error('Failed to import state:', e);
      return false;
    }
  };

  const insiderWinsMap: Record<string, number> = {};
  insiderTransactions.forEach(tx => {
    if (tx.winnerTeamId) {
      insiderWinsMap[tx.winnerTeamId] = (insiderWinsMap[tx.winnerTeamId] || 0) + 1;
    }
  });

  const valuations = calculateAllTeamsValuation(teams, stocks, config, insiderWinsMap);

  return (
    <GameContext.Provider
      value={{
        stocks,
        teams,
        config,
        activeTab,
        setActiveTab,
        selectedStockId,
        setSelectedStockId,
        revealedMultipliers,
        normalTransactions,
        insiderTransactions,
        insiderNewsTransactions,
        exchangeTransactions,
        addTeam,
        updateTeam,
        setTeamCash,
        adjustTeamCash,
        setTeamStockLots,
        removeTeam,
        updateStock,
        addStock,
        syncOfficialStocks,
        updateConfig,
        resetAllTeamsToCapital,
        executeNormalRound,
        executeInsiderRound6Lots,
        executeInsiderRoundIntel,
        executeInsiderRound,
        executeInsiderNewsAuction,
        executeStockAuction5Lots,
        executeStockAllotment3Lots,
        executeExchangeTrade,
        revertNormalTransaction,
        revertInsiderTransaction,
        revertInsiderNewsTransaction,
        revertExchangeTransaction,
        rectifyTeamHolding,
        rectifyTeamCash,
        rectifyTeamPenaltyAndBonus,
        toggleRevealMultiplier,
        revealAllMultipliers,
        hideAllMultipliers,
        resetGame,
        loadDemoGame,
        exportGameState,
        importGameState,
        valuations
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};

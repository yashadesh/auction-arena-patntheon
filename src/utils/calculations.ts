import { Team, Stock, TeamValuation, GameConfig } from '../types';

export function calculateTeamValuation(
  team: Team,
  stocks: Stock[],
  config: GameConfig
): TeamValuation {
  const stockMap = new Map<string, Stock>(stocks.map(s => [s.id, s]));

  let totalPortfolioValue = 0;
  let totalBaseInvested = 0;
  let distinctStocksCount = 0;
  let totalLotsHeld = 0;

  const holdingsBreakdown = Object.entries(team.holdings)
    .filter(([_, lots]) => lots > 0)
    .map(([stockId, lots]) => {
      const stock = stockMap.get(stockId) || {
        id: stockId,
        name: 'Unknown Stock',
        ticker: stockId.toUpperCase(),
        category: 'Tech' as const,
        returnPercent: 0,
        openingBidPrice: 10000,
        displayNews: '',
        insiderNews: ''
      };

      const shares = lots * config.lotSize;
      const baseCost = lots * config.lotBasePrice;
      const finalMultiplier = 1 + (stock.returnPercent / 100);
      const holdingValue = lots * config.lotBasePrice * finalMultiplier;
      const pnl = holdingValue - baseCost;

      totalPortfolioValue += holdingValue;
      totalBaseInvested += baseCost;
      distinctStocksCount += 1;
      totalLotsHeld += lots;

      return {
        stock,
        lots,
        shares,
        baseCost,
        finalMultiplier,
        holdingValue,
        pnl,
        returnPercent: stock.returnPercent
      };
    });

  // Sort holdings by value descending
  holdingsBreakdown.sort((a, b) => b.holdingValue - a.holdingValue);

  const portfolioPnl = totalPortfolioValue - totalBaseInvested;
  const penalties = team.penalties || 0;
  const bonus = team.bonus || 0;
  const netWorth = team.cash + totalPortfolioValue - penalties + bonus;
  const startingCash = team.startingCash || config.startingCash;
  const overallPnl = netWorth - startingCash;
  const roiPercent = startingCash > 0 ? (overallPnl / startingCash) * 100 : 0;

  return {
    team,
    cashInHand: team.cash,
    holdingsBreakdown,
    totalPortfolioValue,
    totalBaseInvested,
    portfolioPnl,
    netWorth,
    overallPnl,
    roiPercent,
    distinctStocksCount,
    totalLotsHeld,
    rank: 0 // calculated in master leaderboard
  };
}

export function calculateAllTeamsValuation(
  teams: Team[],
  stocks: Stock[],
  config: GameConfig
): TeamValuation[] {
  const valuations = teams.map(team => calculateTeamValuation(team, stocks, config));

  // Sort according to Wolf of BIT Mesra winning & tie-breaker rules:
  // 1. Highest Net Worth
  // 2. Highest Cash in Hand (Tie-breaker 1)
  // 3. Fewer Distinct Stocks Held (Tie-breaker 2)
  // 4. Higher ROI %
  valuations.sort((a, b) => {
    if (Math.abs(b.netWorth - a.netWorth) > 0.01) {
      return b.netWorth - a.netWorth;
    }
    if (Math.abs(b.cashInHand - a.cashInHand) > 0.01) {
      return b.cashInHand - a.cashInHand;
    }
    if (a.distinctStocksCount !== b.distinctStocksCount) {
      return a.distinctStocksCount - b.distinctStocksCount; // fewer stocks wins tie
    }
    return b.roiPercent - a.roiPercent;
  });

  return valuations.map((val, index) => ({
    ...val,
    rank: index + 1
  }));
}

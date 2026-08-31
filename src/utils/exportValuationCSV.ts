import { TeamValuation, GameConfig, Stock } from '../types';

/**
 * Generates an exhaustive, highly structured CSV for event coordinators and organizers.
 * Covers:
 * 1. Master Leaderboard Summary (Rank, Team, Net Worth, Cash, Holdings Value, ROI, Penalties, Total Lots)
 * 2. Per-Team Detailed Holding Breakdown (Stock, Ticker, Category, Lots, Shares, Multiplier, P&L)
 * 3. Audit Verification Data (Cash In Hand + All Holding Values = Net Worth check)
 */
export function exportValuationSummaryCSV(
  valuations: TeamValuation[],
  stocks: Stock[],
  config: GameConfig
): void {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const filename = `${config.eventName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-valuation-summary-${new Date().toISOString().slice(0, 10)}.csv`;

  let csv = `sep=,\n`;
  csv += `"========================================================================================="\n`;
  csv += `"${config.eventName.toUpperCase()} - FINAL OFFICIAL PORTFOLIO VALUATION & AUDIT SUMMARY"\n`;
  csv += `"Host Organization:","${config.clubName}"\n`;
  csv += `"Export Generated At:","${timestamp}"\n`;
  csv += `"Starting Cash per Syndicate:","INR ${config.startingCash.toLocaleString('en-IN')}"\n`;
  csv += `"Base Lot Size:","${config.lotSize} Shares @ INR ${config.lotBasePrice.toLocaleString('en-IN')}/lot"\n`;
  csv += `"Formula Applied:","Final Net Worth = Liquid Cash in Hand + SUM(Lots Held * Lot Base Price * Return Multiplier) - Penalties + Bonus"\n`;
  csv += `"Tie-Breaker Hierarchy:","1. Net Worth  ->  2. Cash in Hand  ->  3. Fewer Distinct Stocks  ->  4. Higher ROI %"\n`;
  csv += `"========================================================================================="\n\n`;

  // Section 1: Executive Leaderboard Table
  csv += `"SECTION 1: OFFICIAL FINAL STANDINGS & SUMMARY METRICS"\n`;
  csv += `"Rank","Team Syndicate Name","Starting Cash (INR)","Final Cash in Hand (INR)","Holdings Base Cost (INR)","Portfolio Market Value (INR)","Penalties (INR)","Bonus (INR)","Final Net Worth (INR)","Total Net P&L (INR)","ROI (%)","Total Lots Held","Distinct Stocks Held","Winning Margin vs 2nd (INR)"\n`;

  const topNetWorth = valuations[0]?.netWorth || 0;
  const runnerUpNetWorth = valuations[1]?.netWorth || 0;

  valuations.forEach((v) => {
    const margin = v.rank === 1 ? v.netWorth - runnerUpNetWorth : 0;
    csv += `"${v.rank}",` +
      `"${v.team.name.replace(/"/g, '""')}",` +
      `${v.team.startingCash || config.startingCash},` +
      `${v.cashInHand},` +
      `${v.totalBaseInvested},` +
      `${v.totalPortfolioValue},` +
      `${v.team.penalties || 0},` +
      `${v.team.bonus || 0},` +
      `${v.netWorth},` +
      `${v.overallPnl},` +
      `"${v.roiPercent.toFixed(2)}%",` +
      `${v.totalLotsHeld},` +
      `${v.distinctStocksCount},` +
      `${v.rank === 1 ? margin : ''}\n`;
  });

  csv += `\n"SECTION 2: COMPLETE AUDITED BREAKDOWN PER SYNDICATE"\n`;
  valuations.forEach((v) => {
    csv += `\n"--- TEAM RANK #${v.rank}: ${v.team.name.toUpperCase().replace(/"/g, '""')} ---"\n`;
    csv += `"Liquid Cash:","INR ${v.cashInHand.toLocaleString('en-IN')}"\n`;
    csv += `"Portfolio Valuation:","INR ${v.totalPortfolioValue.toLocaleString('en-IN')}"\n`;
    csv += `"Total Lots Held:","${v.totalLotsHeld} Lots (${v.totalLotsHeld * config.lotSize} Shares across ${v.distinctStocksCount} distinct companies)"\n`;
    csv += `"Overall Net Worth:","INR ${v.netWorth.toLocaleString('en-IN')}"\n`;
    csv += `"Overall Return:","${v.roiPercent.toFixed(2)}% (${v.overallPnl >= 0 ? '+' : ''}INR ${v.overallPnl.toLocaleString('en-IN')})"\n`;

    csv += `"Stock Ticker","Company Name","Sector","Lots Held","Total Shares","Base Lot Cost (INR)","Table 1 Return %","Multiplier Factor","Current Value (INR)","Net Stock P&L (INR)","% of Portfolio"\n`;

    if (v.holdingsBreakdown.length === 0) {
      csv += `"(None)","No active stock holdings at final whistle","--",0,0,0,"0%",1.00,0,0,"0.0%"\n`;
    } else {
      v.holdingsBreakdown.forEach((h) => {
        const pctOfPortfolio = v.totalPortfolioValue > 0 ? ((h.holdingValue / v.totalPortfolioValue) * 100).toFixed(1) : '0.0';
        csv += `"${h.stock.ticker}",` +
          `"${h.stock.name.replace(/"/g, '""')}",` +
          `"${h.stock.category}",` +
          `${h.lots},` +
          `${h.shares},` +
          `${h.baseCost},` +
          `"${h.returnPercent >= 0 ? '+' : ''}${h.returnPercent}%",` +
          `${h.finalMultiplier.toFixed(2)}x,` +
          `${h.holdingValue},` +
          `${h.pnl},` +
          `"${pctOfPortfolio}%"\n`;
      });
    }
  });

  // Section 3: Master Stock Performance Multiplier reference
  csv += `\n\n"SECTION 3: MASTER STOCK MULTIPLIER AUDIT TABLE (TABLE 1 VALUATIONS)"\n`;
  csv += `"Stock ID","Ticker","Company Name","Sector","Opening Auction Base (INR)","Performance Return %","Multiplier Factor","Valuation per Lot (INR)"\n`;
  stocks.forEach((s) => {
    const mult = 1 + (s.returnPercent / 100);
    const lotVal = config.lotBasePrice * mult;
    csv += `"${s.id}",` +
      `"${s.ticker}",` +
      `"${s.name.replace(/"/g, '""')}",` +
      `"${s.category}",` +
      `${s.openingBidPrice || 12000},` +
      `"${s.returnPercent >= 0 ? '+' : ''}${s.returnPercent}%",` +
      `${mult.toFixed(2)}x,` +
      `${lotVal}\n`;
  });

  // Trigger browser download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

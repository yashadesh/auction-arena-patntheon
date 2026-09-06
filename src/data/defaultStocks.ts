import { Stock } from '../types';

export const INITIAL_STOCKS: Stock[] = [
  // Page 1
  {
    id: 'reliance',
    name: 'Reliance Industries',
    ticker: 'RELIANCE',
    category: 'Energy & Commodities',
    returnPercent: 20,
    openingBidPrice: 8000,
    displayNews: 'Realince is planning a big restructuring. One report says a part of the company might be sold off — a big win for investors. Another report says the company is short on cash right now. No one knows which one is true yet.',
    insiderNews: "The sell-off is happening, and it's their most profitable part going to a new company. This stock is set to close strong this round will go in positive trend."
  },
  {
    id: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    ticker: 'TCS',
    category: 'Tech',
    returnPercent: 25,
    openingBidPrice: 10000,
    displayNews: "TCS just landed a huge new deal with a foreign client, but at the same time, a few senior leaders are reportedly leaving the company. Some say this is a golden opportunity, others say it's a warning sign. Nobody's sure which matters more.",
    insiderNews: "The leadership exits are routine, nothing serious. The new deal, though, is bigger than reported and will boost this quarter's numbers a lot. This stock is set to close strong."
  },
  {
    id: 'hdfc-bank',
    name: 'HDFC Bank',
    ticker: 'HDFCBANK',
    category: 'Banking & NBFC',
    returnPercent: 30,
    openingBidPrice: 10000,
    displayNews: 'HDFC Bank reports record profits this quarter — but regulators are reportedly "reviewing" some of its lending practices. Some analysts call it the safest stock in the game right now. Others say a regulatory action could hit any day. The bank has made no official statement.',
    insiderNews: 'The regulatory "review" being reported is routine and procedural — a standard compliance check that happens periodically, not the start of any enforcement action. No penalty or restriction is being considered internally. The record profit numbers are genuine will go for a positive return .'
  },
  {
    id: 'icici-bank',
    name: 'ICICI Bank',
    ticker: 'ICICIBANK',
    category: 'Banking & NBFC',
    returnPercent: 20,
    openingBidPrice: 8000,
    displayNews: 'ICICI Bank announces it\'s raising fresh capital — but it\'s still unclear if this is to fund big growth plans or to cover hidden bad loans. One report says the bank is eyeing a major acquisition. Another says a rival bank is trying to poach half its top management this week. The RBI has also scheduled a "routine" inspection. No one can agree on what any of this means.',
    insiderNews: 'The capital raise is for growth, not bad loans — the acquisition talk is real and will be announced soon. The management exits and RBI inspection are non-issues, just noise. This stock is set to close strong. Will go positive .'
  },
  {
    id: 'infosys',
    name: 'Infosys',
    ticker: 'INFY',
    category: 'Tech',
    returnPercent: 25,
    openingBidPrice: 10000,
    displayNews: 'Infosys just won a massive multi-year contract — but on the same day, its CFO abruptly resigned "for personal reasons." A leaked internal memo (unconfirmed) hints at "employee restructuring" in the next quarter. Meanwhile, a rival firm claims Infosys underbid the new contract and will "struggle to deliver profitably." Analysts on TV are split three ways — some call it the deal of the year, some call the CFO exit a red flag, and some say ignore everything until the earnings call. The company has issued no clarification.',
    insiderNews: 'The CFO exit is unrelated — she\'s joining a competitor, nothing internal. The "underbid" claim is a rival\'s PR spin; margins on the new deal are actually strong. The restructuring memo is real but small-scale, won\'t affect near-term earnings. Bottom line: this stock is set to close strong and good return .'
  },
  {
    id: 'tata-motors',
    name: 'Tata Motors',
    ticker: 'TATAMOTORS',
    category: 'Auto & EV',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'Tata Motors\' EV division just posted disappointing sales numbers this month, and a top EV executive has quietly stepped down. But the same day, the company announced it\'s in talks to export vehicles to a new international market. Some analysts say the EV slowdown is temporary and the export deal changes everything. Others say the export talks are just a distraction from bad numbers. No official word from the company.',
    insiderNews: 'The EV slowdown is real and won\'t recover this quarter — the executive left because of it. The export deal is still months away from being finalized and won\'t move the numbers yet. This stock is set to close weak, will go for a fall.'
  },
  {
    id: 'lt',
    name: 'Larsen and Toubro (L&T)',
    ticker: 'LT',
    category: 'Defense & Infra',
    returnPercent: -20,
    openingBidPrice: 8000,
    displayNews: 'L&T just bagged its biggest-ever infrastructure order from the government — reports value the deal in thousands of crores. Stock analysts on TV are calling it a "generational win" and comparing it to the company\'s best years. The order book is said to be "overflowing." One small line buried in the press release mentions "execution timelines under review," but everyone\'s too excited about the order size to talk about it.',
    insiderNews: 'The order is real, but it\'s back-loaded over 7 years with almost nothing hitting revenue this year. Worse, that "execution timelines under review" line means an existing project is delayed and will trigger a penalty clause this quarter. The market will realize this after the initial excitement fades. This stock is set to close weak.'
  },

  // Page 2
  {
    id: 'tata-steel',
    name: 'Tata Steel',
    ticker: 'TATASTEEL',
    category: 'Energy & Commodities',
    returnPercent: -15,
    openingBidPrice: 6000,
    displayNews: 'Global steel prices are rising sharply, and Tata Steel just announced plans to expand a plant overseas. But a separate report says the company is facing rising raw material costs and a "temporary" halt at one of its domestic units for "maintenance." Some analysts say rising steel prices will boost profits massively. Others say the cost pressure and plant halt will eat into any gains. No official statement from the company yet.',
    insiderNews: 'The plant halt isn\'t just maintenance — it\'s a longer shutdown due to a technical fault, and it\'ll hit output this quarter. The raw material cost spike is also worse than reported. The rising steel prices help, but not enough to offset these two hits. This stock is set to close weak.'
  },
  {
    id: 'sun-pharma',
    name: 'Sun Pharma',
    ticker: 'SUNPHARMA',
    category: 'Pharma & Healthcare',
    returnPercent: 20,
    openingBidPrice: 8000,
    displayNews: 'Sun Pharma faces an FDA "Observation Letter" on a plant, and its top-selling drug nears a patent cliff — both sound alarming. But a brokerage also notes two new specialty drugs launching soon, and unusually heavy buying alongside the selling. Analysts are split: some call it a falling knife, others a hidden opportunity.',
    insiderNews: 'The FDA letter is a routine Form 483 note, not a warning — no import ban, remediation already approved. The patent-cliff drug is being replaced by two new specialty launches that more than cover the revenue gap. The heavy volume is a big institutional investor quietly building a position. Stock closes strong will give a bull rise.'
  },
  {
    id: 'adani-enterprises',
    name: 'Adani Enterprises',
    ticker: 'ADANIENT',
    category: 'Energy & Commodities',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'Adani Enterprises unveiled a massive green energy investment plan, and a foreign fund just bought a fresh stake — both seen as strong confidence signals. But rating agencies are "reviewing" the group\'s debt levels, and a foreign media report questions its accounting practices, calling both "baseless" by the company.',
    insiderNews: 'The hydrogen offtake story is being overstated — the counterparty has quietly paused negotiations pending a compliance review, and no binding agreement is close. Meanwhile, the leverage flag from the ratings note is more serious than the public write-up let on: a formal review of group debt levels is underway internally, and refinancing terms are expected to tighten. Expect a negative correction when Adani Enterprises re-enters the public board. Will give bearish rise.'
  },
  {
    id: 'adani-ports',
    name: 'Adani Ports',
    ticker: 'ADANIPORTS',
    category: 'Defense & Infra',
    returnPercent: 15,
    openingBidPrice: 10000,
    displayNews: 'Adani Ports posted record cargo volumes and is close to acquiring a stake in a major international port — clear positives. But Adani Enterprises\' group-level debt review has some analysts fearing "spill-over" risk into Ports too, while other brokerages reaffirm their buy ratings.',
    insiderNews: 'Adani Ports runs on a separate balance sheet with strong independent cash flows — the group-level debt worries don\'t actually touch this company\'s numbers. The international port acquisition is close to finalizing and will be announced as a done deal soon. The record cargo volumes are genuine and expected to keep climbing next quarter. This stock is set to close strong. Will go bullish.'
  },
  {
    id: 'bajaj-finance',
    name: 'Bajaj Finance',
    ticker: 'BAJFINANCE',
    category: 'Banking & NBFC',
    returnPercent: -10,
    openingBidPrice: 10000,
    displayNews: 'Bajaj Finance posted its highest-ever quarterly loan disbursement, smashing estimates, and announced a digital lending tie-up expected to double its customer base. Shares rallied and brokerages raised targets. Still, some analysts privately question how much of that disbursement growth is sustainable.',
    insiderNews: 'A large chunk of that record disbursement is low-quality, high-risk loans pushed out just to hit the headline number — early defaults are already rising internally. The digital partnership is still in pilot phase, years from doubling anything. The rally is short-term hype. Stock closes weak.'
  },
  {
    id: 'axis-bank',
    name: 'Axis Bank',
    ticker: 'AXISBANK',
    category: 'Banking & NBFC',
    returnPercent: 10,
    openingBidPrice: 10000,
    displayNews: 'Axis Bank posted its highest-ever quarterly profit, beating every estimate, and announced a rural digital banking expansion calling it a "game-changer." Brokerages upgraded their outlook — though one analyst quietly flagged that a chunk of the profit looks one-time in nature.',
    insiderNews: 'A large chunk of that record profit came from a one-time asset sale, not core banking — underlying business actually grew slower than last quarter. The rural partnership is still in early testing with no real revenue. Strip out the one-time gain and the "best quarter" story collapses. Will have positive return .'
  },
  {
    id: 'apple',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    category: 'Tech',
    returnPercent: -30,
    openingBidPrice: 12000,
    displayNews: 'Apple unveiled major new AI features for its next iPhone, with rave early reviews, and one analyst says it could drive the biggest upgrade cycle in years. But a supplier delay, a new EU antitrust probe, and a downgrade citing slowing China sales are adding pressure.',
    insiderNews: 'Wait — despite the display news leaning positive, the decided outcome is weak. The supplier delay turns out worse than first reported and pushes shipments into next quarter. The EU probe escalates faster than expected. China sales genuinely soften. The AI hype fades once real shipment numbers disappoint. Stock closes weak'
  },

  // Page 3
  {
    id: 'microsoft',
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    category: 'Tech',
    returnPercent: -20,
    openingBidPrice: 12000,
    displayNews: 'Microsoft\'s cloud division posted record growth, crushing Wall Street estimates, and it unveiled a new AI partnership expected to be a multi-billion-dollar revenue driver. Analysts rushed to raise price targets — but a few noted the growth number looked unusually front-loaded.',
    insiderNews: 'The record cloud growth was boosted by heavy one-time enterprise contracts that won\'t repeat next quarter — real run-rate growth is much slower. The AI partnership involves massive upfront infrastructure spending that eats into margins for at least a year before revenue shows up. Stock closes weak, down 20%.'
  },
  {
    id: 'google',
    name: 'Google (Alphabet Inc.)',
    ticker: 'GOOGL',
    category: 'Tech',
    returnPercent: -20,
    openingBidPrice: 14000,
    displayNews: 'Google\'s parent reported record ad revenue and unveiled a major AI search breakthrough, calling it a "generational leap." Analysts raised price targets across the board — though a couple pointed out the ad revenue spike coincided with unusually high political ad spending.',
    insiderNews: 'A large part of that record ad revenue came from temporary political ad spending that won\'t repeat — core ad growth actually slowed. The AI search breakthrough is still months from public rollout and has hit internal delays. Once the temporary boost fades, the numbers won\'t look as strong. Stock closes weak, down 20%.'
  },
  {
    id: 'ntpc',
    name: 'NTPC Limited',
    ticker: 'NTPC',
    category: 'Energy & Commodities',
    returnPercent: 35,
    openingBidPrice: 6000,
    displayNews: 'NTPC shares slid on reports of a coal supply shortage hitting several plants, and a government tariff review is worrying some analysts about margins. A brokerage cut its rating — but NTPC\'s renewable capacity push is also drawing quiet praise from a few analysts.',
    insiderNews: 'The coal shortage is already resolved through emergency imports arranged last week — output won\'t actually be hit. The tariff review is expected to favor NTPC, not squeeze it, since it aligns with the renewable push. The downgrade was based on outdated information'
  },
  {
    id: 'powergrid',
    name: 'Power Grid Corporation',
    ticker: 'POWERGRID',
    category: 'Energy & Commodities',
    returnPercent: 30,
    openingBidPrice: 8000,
    displayNews: 'Power Grid shares came under pressure on reports of delays in a key transmission project, flagged as "execution risk." A regulator reviewing its tariff-setting mechanism worried investors, and a brokerage downgraded the stock — though the sell-off looked overdone to some traders.',
    insiderNews: 'The transmission delay is minor — just a few weeks — and won\'t affect this year\'s revenue at all. The tariff review is actually expected to lock in stable, favorable rates for years, good news the market hasn\'t priced in. The downgrade used stale data'
  },
  {
    id: 'vedanta',
    name: 'Vedanta Limited',
    ticker: 'VEDL',
    category: 'Energy & Commodities',
    returnPercent: -20,
    openingBidPrice: 8000,
    displayNews: 'Vedanta announced a major expansion in metals and mining and declared a surprise special dividend, which analysts called "a strong signal of management confidence." Commodity prices ticked up too — but a few analysts quietly questioned how the dividend was actually funded.',
    insiderNews: 'The special dividend is funded largely through fresh debt, not free cash flow — the balance sheet is more stretched than it looks. The expansion is years from adding production. The commodity price uptick is temporary and already reversing'
  },
  {
    id: 'bel',
    name: 'Bharat Electronics Limited (BEL)',
    ticker: 'BEL',
    category: 'Defense & Infra',
    returnPercent: 25,
    openingBidPrice: 10000,
    displayNews: 'BEL shares fell on reports of delays in a major defense order, raising "order execution risk." A parliamentary committee reviewing procurement timelines added to the worry, and a brokerage cut its rating — though defense-sector analysts remain broadly bullish long-term',
    insiderNews: 'The order delay is just paperwork — actual production and delivery stay unaffected. The parliamentary review is expected to fast-track future defense orders, a strong positive the market hasn\'t priced in. The downgrade was based on outdated information'
  },
  {
    id: 'hal',
    name: 'Hindustan Aeronautics Limited (HAL)',
    ticker: 'HAL',
    category: 'Defense & Infra',
    returnPercent: 30,
    openingBidPrice: 12000,
    displayNews: 'HAL shares slid after reports that a fighter jet delivery was pushed back, flagged as a "production bottleneck." A defense ministry audit reviewing cost overruns added concern, and a brokerage downgraded the stock — but government orders for HAL remain strong overall.',
    insiderNews: 'The delivery delay is due to a minor component wait, already resolved — deliveries resume on schedule this week. The cost-overrun audit is expected to clear HAL and even recommend a larger future order. The downgrade used stale information.'
  },
  {
    id: 'asian-paints',
    name: 'Asian Paints',
    ticker: 'ASIANPAINT',
    category: 'FMCG & Consumer',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'Asian Paints reported strong festive season sales, beating expectations, and announced entry into a new international market, calling it "the next big growth engine." A brokerage raised its target price — though a few analysts flagged unusually heavy dealer discounting behind the numbers.',
    insiderNews: 'The festive sales beat was driven by heavy dealer discounting to push volumes — real demand is weaker than the headline suggests, and margins took a hit. The international expansion needs years of upfront investment. The "resilient" narrative won\'t hold once this is understood.'
  },
  {
    id: 'cipla',
    name: 'Cipla Limited',
    ticker: 'CIPLA',
    category: 'Pharma & Healthcare',
    returnPercent: 40,
    openingBidPrice: 10000,
    displayNews: 'Cipla shares fell sharply after the US FDA flagged "manufacturing compliance issues" at a key plant, raising import-alert fears. A top scientist left, and a brokerage downgraded the stock — though the company insists its remediation is already on track.',
    insiderNews: 'The FDA flag is a minor procedural note, not a compliance violation — no import alert is coming, and remediation is already complete. The scientist\'s exit is routine retirement, not a red flag. The downgrade was based on outdated information'
  },

  // Page 4
  {
    id: 'ather-energy',
    name: 'Ather Energy',
    ticker: 'ATHER',
    category: 'Auto & EV',
    returnPercent: 30,
    openingBidPrice: 6000,
    displayNews: 'Ather Energy shares slid on reports of slowing EV scooter sales, with analysts warning of "demand fatigue." A supplier flagged battery component delays, and a brokerage downgraded the stock citing rising competition — though Ather\'s brand loyalty remains strong among reviewers.',
    insiderNews: 'The sales slowdown is seasonal, not demand fatigue — pre-orders for the next model are already tracking well above expectations. The battery delay is minor and already resolved through a backup supplier. The downgrade used stale data'
  },
  {
    id: 'titan',
    name: 'Titan Company',
    ticker: 'TITAN',
    category: 'FMCG & Consumer',
    returnPercent: 20,
    openingBidPrice: 12000,
    displayNews: 'Titan had a great festive season with jewellery sales up and expansion into a new country — clear positives. But gold prices have risen sharply, and some experts worry this could eat into profits even though sales remain strong.',
    insiderNews: 'Titan already bought its gold months ago at a much lower price, so the current price spike won\'t hurt them this time. Sales are strong, and almost all of it will turn straight into profit'
  },
  {
    id: 'mm',
    name: 'Mahindra and Mahindra',
    ticker: 'M&M',
    category: 'Auto & EV',
    returnPercent: -10,
    openingBidPrice: 8000,
    displayNews: 'M&M reported record SUV sales, beating every estimate, and announced a major new EV platform, calling it "the future of Indian mobility." A brokerage raised its target price — though a few analysts noted heavy dealer incentives behind the sales surge.',
    insiderNews: 'The record SUV sales came from heavy dealer incentives and pre-buying ahead of a price hike — real underlying demand is softer, and margins are under pressure. The EV platform is years from meaningful volume. The "best-positioned" narrative won\'t hold thus stock will fall.'
  },
  {
    id: 'coal-india',
    name: 'Coal India',
    ticker: 'COALINDIA',
    category: 'Energy & Commodities',
    returnPercent: -20,
    openingBidPrice: 6000,
    displayNews: 'Coal India announced record coal production, with power-plant demand at an all-time high due to summer heat — strong near-term news. But a government push toward solar/wind and a threatened workers\' strike next month are raising longer-term concerns.',
    insiderNews: 'The strike talk is serious — union leaders have already agreed on dates internally, and it will start before this round ends, hitting production hard. The record output is the last "normal" number before that. The solar/wind shift is years away and doesn\'t matter yet.'
  },
  {
    id: 'spacex',
    name: 'SpaceX',
    ticker: 'SPACEX',
    category: 'Tech',
    returnPercent: -30,
    openingBidPrice: 12000,
    displayNews: 'SpaceX announced a record number of launches and a massive new government contract, calling it the biggest deal in company history. It hinted at a faster next-gen rocket timeline too — though one analyst quietly questioned the profitability of some of those launches.',
    insiderNews: 'The record launch count includes several low-margin rideshare missions that barely break even — real profitability is weaker than the headline suggests. The new contract has strict penalty clauses internal teams already expect to miss. The next-gen rocket timeline is overly optimistic and likely to slip.'
  },
  {
    id: 'ongc',
    name: 'ONGC',
    ticker: 'ONGC',
    category: 'Energy & Commodities',
    returnPercent: -20,
    openingBidPrice: 6000,
    displayNews: 'ONGC\'s quarterly profit jumped as crude oil prices rallied, and it announced a major offshore discovery, calling it "game-changing." A brokerage raised its target price — though the offshore find is still years from actual extraction.',
    insiderNews: 'The profit jump was driven mostly by a one-time inventory gain from the price rally, not core production growth — output stayed flat. The "game-changing" discovery needs heavy capex before it earns a rupee. Once the one-time gain fades next quarter, numbers drop back down.'
  },
  {
    id: 'maruti',
    name: 'Maruti Suzuki',
    ticker: 'MARUTI',
    category: 'Auto & EV',
    returnPercent: 30,
    openingBidPrice: 8000,
    displayNews: 'Maruti Suzuki shares fell after a dip in monthly car sales, blamed on "weak rural demand." A supplier flagged a component shortage that could slow production, and a brokerage downgraded the stock — though bookings for an upcoming new model were reportedly strong.',
    insiderNews: 'The sales dip is due to a planned factory shutdown for a model changeover, not weak demand — bookings for the new model are already strong. The supplier shortage is minor and resolved through a backup vendor. The downgrade used outdated information'
  },
  {
    id: 'lic',
    name: 'LIC India',
    ticker: 'LICI',
    category: 'Banking & NBFC',
    returnPercent: 35,
    openingBidPrice: 8000,
    displayNews: 'LIC shares fell on reports of declining new policy sales, with analysts warning of market share loss to private insurers. A regulator is reviewing its investment practices, and a brokerage downgraded the stock — though LIC insists a new policy lineup is already in the works.',
    insiderNews: 'The sales dip is a temporary pause while LIC rolls out a new, higher-margin policy lineup — early internal numbers already outperform expectations. The regulatory review is routine and expected to clear without issue. The downgrade used outdated data'
  },
  {
    id: 'cupid',
    name: 'Cupid Ltd.',
    ticker: 'CUPID',
    category: 'Pharma & Healthcare',
    returnPercent: 60,
    openingBidPrice: 6000,
    displayNews: 'Cupid Ltd shares fell on reports of a slowdown in government tender orders, raising "order book uncertainty." A rival launched a cheaper competing product, and a brokerage downgraded the stock citing pricing pressure — though Cupid\'s export pipeline was rumored to be picking up.',
    insiderNews: 'The tender slowdown is temporary — a new, much larger export order is about to be announced, more than making up for it. The rival\'s cheaper product already has quality issues surfacing in early reviews. The downgrade used outdated information.'
  },

  // Page 5
  {
    id: 'itc',
    name: 'ITC Limited',
    ticker: 'ITC',
    category: 'FMCG & Consumer',
    returnPercent: -30,
    openingBidPrice: 6000,
    displayNews: 'ITC reported record quarterly revenue across FMCG and hotels, beating estimates, and announced a major packaged-foods expansion, calling it "the next big growth driver." A brokerage raised its target price — though the revenue jump coincided with unusually heavy trade-channel stocking.',
    insiderNews: 'The record FMCG revenue was boosted by heavy trade-channel stocking ahead of a price hike — actual consumer demand is softer, and a sales dip may follow as inventory corrects. The packaged foods expansion needs years to turn profitable.'
  },
  {
    id: 'zomato',
    name: 'Zomato',
    ticker: 'ZOMATO',
    category: 'Tech',
    returnPercent: 40,
    openingBidPrice: 6000,
    displayNews: 'Zomato reported strong order growth this quarter but flagged rising delivery costs and tougher competition from a rival\'s aggressive discounting. Its new quick-commerce push is reportedly gaining fast, though some worry it\'s burning cash with no clear profit timeline.',
    insiderNews: 'The quick-commerce push is actually turning profitable faster than expected — a key regional market hit breakeven ahead of schedule. The rival\'s discounting is unsustainable and already being pulled back internally. Delivery costs are being offset by a new, not-yet-public packaging deal.'
  },
  {
    id: 'groww',
    name: 'Groww',
    ticker: 'GROWW',
    category: 'Banking & NBFC',
    returnPercent: 30,
    openingBidPrice: 6000,
    displayNews: 'Groww reported a sharp rise in new user sign-ups and announced plans for a public listing soon. But rising regulatory scrutiny on trading apps and a rival\'s zero-fee offer to poach users are adding pressure, splitting analyst opinion.',
    insiderNews: 'The regulatory scrutiny doesn\'t target Groww specifically — its compliance is already ahead of the new rules. The rival\'s zero-fee offer is a short-term promo already losing them money. The listing plans are moving faster than reported and expected to be well-received.'
  },
  {
    id: 'zerodha',
    name: 'Zerodha',
    ticker: 'ZERODHA',
    category: 'Banking & NBFC',
    returnPercent: -20,
    openingBidPrice: 8000,
    displayNews: 'Zerodha announced record trading volumes and user growth, cementing its lead as India\'s largest broker, and revealed plans for a new wealth management product. Industry watchers call it the most dominant fintech story in India right now — though the volume spike looked unusually sharp.',
    insiderNews: 'The record trading volumes were driven by a short-term retail trading frenzy that\'s already cooling off — sustainable revenue growth is much slower. The wealth management product is still in early testing with regulatory approvals pending. Once the volume spike fades, the "dominant" narrative won\'t hold'
  },
  {
    id: 'nestle-india',
    name: 'Nestlé India',
    ticker: 'NESTLEIND',
    category: 'FMCG & Consumer',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'Nestlé reported record quarterly sales across its food and beverage portfolio, beating expectations, and announced a major new product line, calling it its biggest innovation push in a decade. A brokerage raised its target price — though a few noted the sales jump followed a recent price hike.',
    insiderNews: 'The record sales were driven by aggressive price hikes passed onto consumers, not real volume growth — unit sales actually declined slightly. The new product line has had a weak initial retailer response and may get scaled back. The "safest, most reliable" narrative won\'t hold.'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    ticker: 'NFLX',
    category: 'Tech',
    returnPercent: 20,
    openingBidPrice: 10000,
    displayNews: 'Netflix shares fell on reports of slowing subscriber growth in developed markets, raising "market saturation" fears. A brokerage downgraded it citing rising content costs, and a rival streaming platform announced aggressive price cuts — though emerging-market subscriber trends were quietly holding up.',
    insiderNews: 'The subscriber slowdown is only in developed markets — growth in emerging markets is quietly beating internal targets and more than offsetting it. A recently signed, not-yet-public cost-sharing deal solves the content-cost worry. The rival\'s price cuts are unsustainable and expected to reverse within weeks.'
  },
  {
    id: 'paytm',
    name: 'Paytm',
    ticker: 'PAYTM',
    category: 'Banking & NBFC',
    returnPercent: 45,
    openingBidPrice: 8000,
    displayNews: 'Paytm shares fell after a regulator flagged "compliance concerns" over its lending partnerships, raising "regulatory overhang" fears. A senior executive resigned, and a brokerage downgraded the stock, citing an uncertain path to profitability — though Paytm\'s core payments volumes kept climbing.',
    insiderNews: 'The compliance flag is minor and already addressed informally with the regulator — no penalty is coming. The executive resignation is personal, unrelated to any internal issue. The company is actually closer to profitability than reported, with a real turnaround expected next quarter.'
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    ticker: 'COIN',
    category: 'Banking & NBFC',
    returnPercent: 40,
    openingBidPrice: 10000,
    displayNews: 'Coinbase shares fell as crypto prices turned volatile and a regulator opened a new inquiry into its practices. Analysts warned of regulatory risk and declining trading volumes, and a brokerage downgraded the stock, citing an uncertain "crypto winter" ahead — though on-chain data hinted at rising activity.',
    insiderNews: 'The regulatory inquiry is routine and expected to close with no action. Trading volumes have actually picked up sharply in the last few days as prices stabilize — data the market hasn\'t seen yet. The "crypto winter" call is based on outdated sentiment.'
  },

  // Page 6
  {
    id: 'nvidia',
    name: 'NVIDIA Corporation',
    ticker: 'NVDA',
    category: 'Tech',
    returnPercent: -30,
    openingBidPrice: 14000,
    displayNews: 'NVIDIA reported record quarterly revenue driven by soaring AI chip demand, crushing every estimate, and unveiled its next-gen AI chip, calling it "a generational leap." Multiple brokerages raised price targets — though a few analysts flagged unusually large bulk orders behind the revenue jump.',
    insiderNews: 'A large chunk of that record revenue came from a handful of bulk orders pulled forward from next quarter — real run-rate demand is much lower than it looks. The next-gen chip is facing production yield issues that could delay wide availability. This quarter\'s number won\'t repeat.'
  },
  {
    id: 'netweb',
    name: 'Netweb Technologies',
    ticker: 'NETWEB',
    category: 'Tech',
    returnPercent: 50,
    openingBidPrice: 12000,
    displayNews: 'Netweb shares fell on reports of a delay in a major government supercomputing order, raising "execution risk" fears for this small-cap stock. A brokerage flagged high valuation concerns, and a competitor announced a rival product launch — though Netweb\'s order pipeline was rumored to be growing.',
    insiderNews: 'The order delay is just a paperwork formality — actual delivery and revenue booking stay on schedule this quarter. The competitor\'s rival product is still in early testing, years from being a real threat. The valuation concern was based on old numbers before a new, not-yet-public private-sector deal.'
  },
  {
    id: 'jpmorgan',
    name: 'JP Morgan Chase',
    ticker: 'JPM',
    category: 'Banking & NBFC',
    returnPercent: 20,
    openingBidPrice: 10000,
    displayNews: 'JP Morgan reported record quarterly profit, beating every estimate, and announced a major digital banking expansion, calling it "the future of the company." A brokerage raised its target price — though a few analysts noted an unusual one-time trading gain behind the profit beat.',
    insiderNews: 'A large chunk of that record profit came from a one-time trading gain that won\'t repeat next quarter — core banking revenue actually grew slower than expected. The digital banking expansion is burning heavily on tech spend with no real payoff yet'
  },
  {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    ticker: 'GS',
    category: 'Banking & NBFC',
    returnPercent: -20,
    openingBidPrice: 12000,
    displayNews: 'Goldman Sachs reported record quarterly trading revenue, beating every estimate, and announced a major wealth management expansion, calling it "a new era of growth beyond Wall Street." A brokerage raised its target price — though a few analysts flagged unusually volatile trading weeks behind the revenue surge.',
    insiderNews: 'The record trading revenue came from a few unusually volatile weeks that won\'t repeat — underlying trading desk performance was actually flat. The wealth management expansion is burning cash on hiring and infrastructure with no meaningful revenue yet.'
  },
  {
    id: 'bharti-airtel',
    name: 'Bharti Airtel',
    ticker: 'BHARTIARTL',
    category: 'Telecom',
    returnPercent: -25,
    openingBidPrice: 12000,
    displayNews: 'Airtel saw choppy trading — one report says its Africa business posted record growth, another claims spectrum payment obligations are straining near-term cash flow. A brokerage likes "diversified geography," another flags "debt servicing risk." No official statement. Volumes above average, sentiment split.',
    insiderNews: 'The Africa growth figure is accurate but small relative to the spectrum obligation, which is larger than disclosed and due sooner than modeled. Expect a negative consolidation irrespective of volume average'
  },
  {
    id: 'wipro',
    name: 'Wipro Limited',
    ticker: 'WIPRO',
    category: 'Tech',
    returnPercent: 20,
    openingBidPrice: 10000,
    displayNews: 'Wipro traded erratically — one report says it won a large multi-year IT services contract, another claims attrition among senior consultants is rising sharply. A brokerage cites "deal pipeline strength," another flags "talent risk." No comment from the company. Sentiment split evenly.',
    insiderNews: 'The attrition concern is overstated — most departures are at junior levels with minimal client impact. The new contract is larger than publicly disclosed. Expect a positive surprise.'
  },
  {
    id: 'reliance-jio',
    name: 'Reliance Jio',
    ticker: 'JIO',
    category: 'Telecom',
    returnPercent: 25,
    openingBidPrice: 10000,
    displayNews: 'Reliance Jio traded erratically this week amid conflicting reports on its 5G rollout. One outlet claims subscriber additions hit a record high, another says tariff hikes are pushing users to cheaper rivals. A brokerage cites "market leadership," another flags "ARPU pressure." No official comment. Volumes ran above average, sentiment split evenly.',
    insiderNews: 'The tariff-hike churn is smaller than reported — most switching users are low-value accounts. Subscriber growth in the high-ARPU segment is genuinely strong and understated. Expect a positive surprise.'
  },
  {
    id: 'hcltech',
    name: 'HCLTech',
    ticker: 'HCLTECH',
    category: 'Tech',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'HCLTech saw choppy trading — one report highlights strong engineering-services revenue, another claims a major client is reducing its outsourcing budget. A brokerage likes "diversified vertical mix," another flags "client concentration risk." No official statement. Volumes above average.',
    insiderNews: 'The client budget cut is real and larger than reported, affecting a bigger revenue share than the bullish note assumes. Expect a negative correction.'
  },
  {
    id: 'tech-mahindra',
    name: 'Tech Mahindra',
    ticker: 'TECHM',
    category: 'Tech',
    returnPercent: 15,
    openingBidPrice: 12000,
    displayNews: 'Tech Mahindra traded erratically — one report says a telecom-vertical deal win is imminent, another claims margin pressure from wage hikes is mounting. A brokerage cites "5G vertical strength," another flags "cost inflation." No comment. Sentiment split evenly on the floor.',
    insiderNews: 'The wage-hike impact is smaller than modeled due to an internal automation push. The telecom deal is bigger and closer to signing than reported. Expect a positive surprise.'
  },

  // Page 7
  {
    id: 'britannia',
    name: 'Britannia Industries',
    ticker: 'BRITANNIA',
    category: 'FMCG & Consumer',
    returnPercent: -20,
    openingBidPrice: 12000,
    displayNews: 'Britannia saw choppy trading — one report cites strong festive biscuit sales, another claims rising wheat and palm oil costs are squeezing margins. A brokerage likes "brand strength," another flags "input cost inflation." No official statement.',
    insiderNews: 'The festive sales bump is smaller than headlined, and input costs are running above internal guidance. Expect a negative correction.'
  },
  {
    id: 'dabur',
    name: 'Dabur India',
    ticker: 'DABUR',
    category: 'FMCG & Consumer',
    returnPercent: 15,
    openingBidPrice: 6000,
    displayNews: 'Dabur traded erratically — one report says rural demand for its health portfolio is rebounding, another claims urban volumes are softening amid competitive discounting. A brokerage cites "ayurveda portfolio strength," another flags "volume slowdown." No comment.',
    insiderNews: 'The rural rebound is real and broader than reported; urban softness is smaller and temporary. Expect a positive surprise.'
  },
  {
    id: 'havells',
    name: 'Havells India',
    ticker: 'HAVELLS',
    category: 'FMCG & Consumer',
    returnPercent: -20,
    openingBidPrice: 8000,
    displayNews: 'Havells saw choppy trading — one report highlights strong summer appliance sales, another claims copper and aluminium cost spikes are hitting margins. A brokerage likes "distribution reach," another flags "commodity cost risk." No official statement.',
    insiderNews: 'The appliance sales bump is smaller than reported, and commodity costs are running well above internal guidance. Expect a negative correction.'
  },
  {
    id: 'dmart',
    name: 'Avenue Supermarts (DMart)',
    ticker: 'DMART',
    category: 'FMCG & Consumer',
    returnPercent: 30,
    openingBidPrice: 12000,
    displayNews: 'DMart traded erratically — one report says same-store sales growth beat expectations, another claims new store openings are slower than guided due to real estate delays. A brokerage cites "cost discipline," another flags "expansion slowdown." No comment.',
    insiderNews: 'The store-opening delay is smaller than reported — three new stores are opening ahead of schedule, undisclosed. Expect a positive surprise.'
  },
  {
    id: 'irctc',
    name: 'IRCTC',
    ticker: 'IRCTC',
    category: 'Defense & Infra',
    returnPercent: -20,
    openingBidPrice: 8000,
    displayNews: 'IRCTC saw choppy trading — one report cites record ticket-booking volumes, another claims a proposed reduction in convenience-fee rates is under government review. A brokerage likes "monopoly position," another flags "fee-cut risk." No official statement.',
    insiderNews: 'The fee-cut proposal is further along than publicly known and expected to hit revenue harder than the bullish case assumes. Expect a negative correction.'
  },
  {
    id: 'divis-labs',
    name: "Divi's Laboratories",
    ticker: 'DIVISLAB',
    category: 'Pharma & Healthcare',
    returnPercent: 15,
    openingBidPrice: 8000,
    displayNews: 'Divi\'s Labs traded erratically — one report says a large API export order was won, another claims a key customer is delaying orders amid inventory destocking. A brokerage cites "specialty API strength," another flags "destocking risk." No comment.',
    insiderNews: 'The destocking concern is nearly resolved — the customer\'s order delay was temporary and orders have already resumed, undisclosed. Expect a positive surprise.'
  },
  {
    id: 'trent',
    name: 'Trent Ltd.',
    ticker: 'TRENT',
    category: 'FMCG & Consumer',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'Trent saw choppy trading — one report highlights strong Zudio store expansion, another claims same-store sales growth is decelerating faster than guided. A brokerage likes "value-fashion positioning," another flags "same-store slowdown." No official statement.',
    insiderNews: 'The same-store slowdown is worse than reported and is structural, not seasonal, as newer stores cannibalize older ones. Expect a negative correction.'
  },
  {
    id: 'bata-india',
    name: 'Bata India',
    ticker: 'BATAINDIA',
    category: 'FMCG & Consumer',
    returnPercent: 25,
    openingBidPrice: 10000,
    displayNews: 'Bata traded erratically — one report says festive footwear sales hit a multi-year high, another claims rising leather costs are pressuring margins. A brokerage cites "brand recall," another flags "input cost risk." No comment from the company.',
    insiderNews: 'Leather costs are locked in below current spot prices via an undisclosed supplier contract. Festive sales strength is real and continuing. Expect a positive surprise.'
  },
  {
    id: 'pvr-inox',
    name: 'PVR Inox',
    ticker: 'PVRINOX',
    category: 'FMCG & Consumer',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'PVR Inox saw choppy trading — one report cites a strong box-office weekend, another claims footfall recovery is stalling as streaming competition intensifies. A brokerage likes "content pipeline," another flags "structural footfall decline." No official statement.',
    insiderNews: 'The strong weekend was a one-off driven by a single release; underlying footfall trends are weaker than reported. Expect a negative correction.'
  },
  {
    id: 'jubilant-foodworks',
    name: 'Jubilant FoodWorks',
    ticker: 'JUBLFOOD',
    category: 'FMCG & Consumer',
    returnPercent: 20,
    openingBidPrice: 12000,
    displayNews: 'Jubilant FoodWorks traded erratically — one report says delivery order volumes hit a record, another claims rising cheese and packaging costs are squeezing margins. A brokerage cites "store expansion pace," another flags "cost inflation." No comment.',
    insiderNews: 'A supplier contract locking in cheese costs was recently finalized internally, undisclosed. Delivery volume growth is stronger than reported. Expect a positive surprise.'
  },
  {
    id: 'idfc-first-bank',
    name: 'IDFC First Bank',
    ticker: 'IDFCFIRSTB',
    category: 'Banking & NBFC',
    returnPercent: -20,
    openingBidPrice: 8000,
    displayNews: 'IDFC First Bank saw choppy trading — one report highlights strong retail loan growth, another claims asset quality in its microfinance book is deteriorating. A brokerage likes "retail franchise build-out," another flags "microfinance stress." No official statement.',
    insiderNews: 'Microfinance stress is worse than reported, and a provisioning increase is expected to hit earnings harder than the bullish case assumes. Expect a negative correction.'
  },

  // Page 8
  {
    id: 'sbi',
    name: 'State Bank of India (SBI)',
    ticker: 'SBIN',
    category: 'Banking & NBFC',
    returnPercent: 20,
    openingBidPrice: 10000,
    displayNews: 'SBI traded erratically — one report says corporate loan growth is accelerating, another claims employee pension provisioning could rise sharply. A brokerage cites "scale advantage," another flags "provisioning risk." No comment from the bank.',
    insiderNews: 'The pension provisioning concern is overstated — an actuarial revision already accounted for it internally. Corporate loan growth is stronger than reported. Expect a positive surprise.'
  },
  {
    id: 'jsw-steel',
    name: 'JSW Steel',
    ticker: 'JSWSTEEL',
    category: 'Energy & Commodities',
    returnPercent: -20,
    openingBidPrice: 12000,
    displayNews: 'JSW Steel saw choppy trading — one report cites rising global steel prices, another claims a key blast furnace is undergoing an unplanned shutdown. A brokerage likes "capacity expansion," another flags "production disruption." No official statement.',
    insiderNews: 'The blast furnace shutdown is longer than disclosed and will hit output more than the bullish pricing narrative offsets. Expect a negative correction.'
  },
  {
    id: 'ultratech-cement',
    name: 'UltraTech Cement',
    ticker: 'ULTRACEMCO',
    category: 'Energy & Commodities',
    returnPercent: 30,
    openingBidPrice: 12000,
    displayNews: 'UltraTech traded erratically — one report says cement demand is picking up on infrastructure spending, another claims fuel and freight costs are rising sharply. A brokerage cites "pricing power," another flags "cost inflation." No comment.',
    insiderNews: 'Fuel costs are hedged below current spot levels via an undisclosed contract. Demand pickup is real and stronger than reported. Expect a positive surprise.'
  },
  {
    id: 'bajaj-auto',
    name: 'Bajaj Auto',
    ticker: 'BAJAJ-AUTO',
    category: 'Auto & EV',
    returnPercent: -15,
    openingBidPrice: 12000,
    displayNews: 'Bajaj Auto saw choppy trading — one report highlights strong three-wheeler export orders, another claims domestic two-wheeler sales are declining amid rural demand weakness. A brokerage likes "export diversification," another flags "domestic slowdown." No official statement.',
    insiderNews: 'Domestic weakness is worse than reported and export orders are smaller in near-term revenue impact than headlined. Expect a negative correction.'
  },
  {
    id: 'hero-motocorp',
    name: 'Hero MotoCorp',
    ticker: 'HEROMOTOCO',
    category: 'Auto & EV',
    returnPercent: 30,
    openingBidPrice: 12000,
    displayNews: 'Hero MotoCorp traded erratically — one report says festive two-wheeler sales beat expectations, another claims rising commodity costs are squeezing margins. A brokerage cites "rural demand recovery," another flags "cost pressure." No comment from the company.',
    insiderNews: 'Commodity costs are smaller than modeled due to an undisclosed hedging position. Festive sales strength is continuing into the current month. Expect a positive surprise.'
  },
  {
    id: 'eicher-motors',
    name: 'Eicher Motors',
    ticker: 'EICHERMOT',
    category: 'Auto & EV',
    returnPercent: -10,
    openingBidPrice: 14000,
    displayNews: 'Eicher Motors saw choppy trading — one report cites strong Royal Enfield export demand, another claims domestic waiting periods are shrinking as demand cools. A brokerage likes "premium positioning," another flags "domestic demand softening." No official statement.',
    insiderNews: 'Domestic demand softening is worse than reported and export demand isn\'t large enough yet to offset it. Expect a negative correction.'
  },
  {
    id: 'tesla',
    name: 'Tesla Inc.',
    ticker: 'TSLA',
    category: 'Auto & EV',
    returnPercent: 35,
    openingBidPrice: 14000,
    displayNews: 'Tesla traded erratically — one report says a new affordable model is nearing production, another claims delivery numbers missed internal targets this quarter. A brokerage cites "energy storage growth," another flags "delivery miss." No official comment.',
    insiderNews: 'The delivery miss is smaller than reported once a logistics delay is accounted for. The affordable model timeline is ahead of what\'s public. Expect a positive surprise.'
  },
  {
    id: 'meta',
    name: 'Meta Platforms',
    ticker: 'META',
    category: 'Tech',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'Meta saw choppy trading — one report highlights strong ad revenue growth, another claims regulatory pressure in the EU over data practices is intensifying. A brokerage likes "AI-driven ad targeting," another flags "regulatory overhang." No official statement.',
    insiderNews: 'The EU regulatory action is more advanced than disclosed and expected to force costly changes sooner than the bullish case assumes. Expect a negative correction.'
  },
  {
    id: 'amazon',
    name: 'Amazon.com',
    ticker: 'AMZN',
    category: 'Tech',
    returnPercent: 30,
    openingBidPrice: 14000,
    displayNews: 'Amazon traded erratically — one report says AWS cloud growth is reaccelerating, another claims retail margins are under pressure from rising fulfillment costs. A brokerage cites "cloud dominance," another flags "retail margin risk." No comment.',
    insiderNews: 'Fulfillment cost pressure is smaller than modeled due to an undisclosed automation rollout. AWS growth is stronger than the bullish note suggests. Expect a positive surprise.'
  },
  // Page 12
  {
    id: 'kotak-bank',
    name: 'Kotak Mahindra Bank',
    ticker: 'KOTAKBANK',
    category: 'Banking & NBFC',
    returnPercent: 20,
    openingBidPrice: 10000,
    displayNews: 'Kotak Mahindra Bank posted strong loan growth this quarter, but a senior management change was announced the same day. A brokerage likes the growth, another calls the leadership shuffle "unsettling." No clarity yet.',
    insiderNews: 'The leadership change is a planned succession, not a resignation under pressure. Loan growth momentum is genuine and continuing. Expect a positive surprise.'
  },
  {
    id: 'indusind-bank',
    name: 'IndusInd Bank',
    ticker: 'INDUSINDBK',
    category: 'Banking & NBFC',
    returnPercent: -25,
    openingBidPrice: 8000,
    displayNews: 'IndusInd Bank reported a rise in deposits, but a report claims its microfinance book is seeing rising defaults. One brokerage stays bullish, another downgrades on asset quality worries.',
    insiderNews: 'The default numbers are worse than disclosed, and a provisioning hit is expected next quarter. Expect a negative correction.'
  },
  {
    id: 'bank-of-baroda',
    name: 'Bank of Baroda',
    ticker: 'BANKBARODA',
    category: 'Banking & NBFC',
    returnPercent: 15,
    openingBidPrice: 8000,
    displayNews: 'Bank of Baroda beat profit estimates this quarter, but a report says a large corporate account may need restructuring. Analysts are split on whether this is a one-off or a pattern.',
    insiderNews: 'The account in question is fully secured with no expected loss. Profit growth is genuine and continuing. Expect a positive surprise.'
  },
  {
    id: 'hindalco',
    name: 'Hindalco Industries',
    ticker: 'HINDALCO',
    category: 'Energy & Commodities',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'Hindalco announced expansion plans as aluminium prices rise, but a report flags a smelter facing a temporary power-supply issue. Bulls cite pricing, bears cite disruption.',
    insiderNews: 'The power issue is longer than disclosed and will cut output meaningfully this quarter. Expect a negative correction.'
  },
  {
    id: 'adani-green',
    name: 'Adani Green Energy',
    ticker: 'ADANIGREEN',
    category: 'Energy & Commodities',
    returnPercent: 30,
    openingBidPrice: 12000,
    displayNews: 'Adani Green announced a record renewable capacity addition, but a rating agency is reviewing group-level debt, same as other Adani stocks. Sentiment is split.',
    insiderNews: "This entity's project financing is ring-fenced and unaffected by the group review. Capacity additions are ahead of schedule. Expect a positive surprise."
  },
  {
    id: 'adani-power',
    name: 'Adani Power',
    ticker: 'ADANIPOWER',
    category: 'Energy & Commodities',
    returnPercent: -20,
    openingBidPrice: 12000,
    displayNews: 'Adani Power reported higher power generation, but coal supply costs are reportedly rising sharply for its plants. One brokerage stays bullish on demand, another flags margin risk.',
    insiderNews: "Coal costs are running well above what's been disclosed, and margins will be squeezed harder than modeled. Expect a negative correction."
  },
  {
    id: 'gail',
    name: 'GAIL India',
    ticker: 'GAIL',
    category: 'Energy & Commodities',
    returnPercent: 15,
    openingBidPrice: 10000,
    displayNews: 'GAIL reported strong gas transmission volumes, but a report says a pipeline expansion project is facing regulatory delays. Bulls and bears are evenly split.',
    insiderNews: 'The regulatory delay is a formality already close to resolution internally. Transmission volume growth is stronger than reported. Expect a positive surprise.'
  },
  {
    id: 'ioc',
    name: 'Indian Oil Corporation (IOC)',
    ticker: 'IOC',
    category: 'Energy & Commodities',
    returnPercent: -15,
    openingBidPrice: 6000,
    displayNews: 'IOC posted higher refining margins this quarter, but crude sourcing costs are reportedly rising fast. A brokerage likes margins, another flags cost pressure.',
    insiderNews: 'Sourcing costs are higher than disclosed and expected to erode the margin gain entirely. Expect a negative correction.'
  },
  // Page 13
  {
    id: 'grasim',
    name: 'Grasim Industries',
    ticker: 'GRASIM',
    category: 'Energy & Commodities',
    returnPercent: 20,
    openingBidPrice: 6000,
    displayNews: 'Grasim announced expansion in its chemicals division, but a report flags rising input costs across its businesses. Analysts are split on the net impact.',
    insiderNews: 'Input costs are already hedged via a supplier contract not yet disclosed. The chemicals expansion is ahead of schedule. Expect a positive surprise.'
  },
  {
    id: 'ambuja-cements',
    name: 'Ambuja Cements',
    ticker: 'AMBUJACEM',
    category: 'Defense & Infra',
    returnPercent: -10,
    openingBidPrice: 8000,
    displayNews: 'Ambuja Cements reported higher sales volumes, but a report says fuel costs are rising sharply at several plants. One brokerage stays bullish, another flags margin risk.',
    insiderNews: 'Fuel costs are running higher than disclosed and will offset most of the volume gain. Expect a negative correction.'
  },
  {
    id: 'pidilite',
    name: 'Pidilite Industries',
    ticker: 'PIDILITIND',
    category: 'Consumer & Retail',
    returnPercent: 25,
    openingBidPrice: 10000,
    displayNews: 'Pidilite reported strong festive-season demand for its adhesives, but a report flags rising VAM (raw material) costs. Bulls and bears are evenly split.',
    insiderNews: 'Raw material costs are locked in below spot levels via an undisclosed contract. Demand strength is continuing. Expect a positive surprise.'
  },
  {
    id: 'godrej-consumer',
    name: 'Godrej Consumer Products',
    ticker: 'GODREJCP',
    category: 'FMCG & Consumer',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'Godrej Consumer reported strong household product sales, but a report flags rising palm oil costs squeezing margins. A brokerage likes the sales growth, another flags cost pressure.',
    insiderNews: 'The sales bump was driven by heavy trade discounting, and palm oil costs are worse than disclosed. Expect a negative correction.'
  },
  {
    id: 'marico',
    name: 'Marico',
    ticker: 'MARICO',
    category: 'FMCG & Consumer',
    returnPercent: 15,
    openingBidPrice: 8000,
    displayNews: 'Marico reported strong rural demand recovery, but a report flags rising copra prices pressuring its edible oils business. Analysts are split on the net impact.',
    insiderNews: 'Copra costs are smaller than modeled due to an undisclosed hedge. Rural demand recovery is genuine and continuing. Expect a positive surprise.'
  },
  {
    id: 'hul',
    name: 'Hindustan Unilever (HUL)',
    ticker: 'HINDUNILVR',
    category: 'FMCG & Consumer',
    returnPercent: -10,
    openingBidPrice: 10000,
    displayNews: 'HUL reported steady volume growth, but a report flags intensifying competition from smaller regional FMCG brands. A brokerage likes scale, another flags market-share risk.',
    insiderNews: 'Regional competitor gains are larger than disclosed in key categories. Expect a negative correction.'
  },
  {
    id: 'voltas',
    name: 'Voltas',
    ticker: 'VOLTAS',
    category: 'Consumer & Retail',
    returnPercent: 20,
    openingBidPrice: 8000,
    displayNews: 'Voltas reported record summer AC sales, but a report flags rising compressor component costs. Bulls cite demand, bears cite margin pressure.',
    insiderNews: 'Compressor costs are hedged via an undisclosed long-term supplier deal. Summer demand strength is continuing. Expect a positive surprise.'
  },
  {
    id: 'bajaj-finserv',
    name: 'Bajaj Finserv',
    ticker: 'BAJAJFINSV',
    category: 'Banking & NBFC',
    returnPercent: -15,
    openingBidPrice: 8000,
    displayNews: 'Bajaj Finserv reported strong insurance premium growth, but a report flags rising claims ratios in its general insurance arm. Analysts are split on the net effect.',
    insiderNews: 'Claims ratios are worse than disclosed and expected to hit underwriting profit meaningfully. Expect a negative correction.'
  },
  {
    id: 'sbi-life',
    name: 'SBI Life Insurance',
    ticker: 'SBILIFE',
    category: 'Banking & NBFC',
    returnPercent: 25,
    openingBidPrice: 8000,
    displayNews: 'SBI Life reported record new business premium, but a report flags a proposed regulatory change to commission structures. Bulls and bears are evenly split.',
    insiderNews: 'The regulatory change favors larger insurers like SBI Life, not against them, contrary to the public read. Expect a positive surprise.'
  },
  {
    id: 'ashok-leyland',
    name: 'Ashok Leyland',
    ticker: 'ASHOKLEY',
    category: 'Auto & EV',
    returnPercent: -20,
    openingBidPrice: 8000,
    displayNews: 'Ashok Leyland reported strong truck order inflows, but a report flags rising steel and axle component costs. A brokerage likes the order book, another flags margin risk.',
    insiderNews: 'Component costs are running higher than disclosed and will offset most of the order-book gain this quarter. Expect a negative correction.'
  },
  {
    id: 'tvs-motor',
    name: 'TVS Motor Company',
    ticker: 'TVSMOTOR',
    category: 'Auto & EV',
    returnPercent: 30,
    openingBidPrice: 8000,
    displayNews: 'TVS Motor reported strong festive two-wheeler sales, but a report flags a supplier delay on a key electronic component. Analysts are split on the net impact.',
    insiderNews: 'The supplier delay is already resolved via a backup vendor, undisclosed. Festive sales strength is continuing. Expect a positive surprise.'
  },
  // Page 14
  {
    id: 'apollo-hospitals',
    name: 'Apollo Hospitals',
    ticker: 'APOLLOHOSP',
    category: 'Pharma & Healthcare',
    returnPercent: -15,
    openingBidPrice: 10000,
    displayNews: 'Apollo Hospitals reported record patient volumes, but a report flags rising staffing costs across its hospital network. A brokerage likes volumes, another flags cost pressure.',
    insiderNews: 'Staffing cost inflation is worse than disclosed and expected to compress margins meaningfully. Expect a negative correction.'
  },
  {
    id: 'dr-reddys',
    name: "Dr. Reddy's Laboratories",
    ticker: 'DRREDDY',
    category: 'Pharma & Healthcare',
    returnPercent: 20,
    openingBidPrice: 10000,
    displayNews: "Dr. Reddy's reported a strong US generics quarter, but a report flags a facility inspection by a foreign regulator. Bulls and bears are evenly split.",
    insiderNews: 'The inspection is a routine periodic visit with no adverse findings expected. US generics strength is continuing. Expect a positive surprise.'
  },
  {
    id: 'lupin',
    name: 'Lupin Limited',
    ticker: 'LUPIN',
    category: 'Pharma & Healthcare',
    returnPercent: -20,
    openingBidPrice: 8000,
    displayNews: 'Lupin reported a large new drug approval, but a report flags pricing pressure in its US generics portfolio. A brokerage likes the approval, another flags pricing risk.',
    insiderNews: 'Pricing pressure is worse than disclosed across a bigger part of the portfolio than the approval offsets. Expect a negative correction.'
  },
  {
    id: 'info-edge',
    name: 'Info Edge (Naukri)',
    ticker: 'NAUKRI',
    category: 'Tech',
    returnPercent: 35,
    openingBidPrice: 8000,
    displayNews: 'Info Edge reported strong billing growth on its recruitment platform, but a report flags rising customer acquisition costs. Analysts are split on the net effect.',
    insiderNews: 'Acquisition costs are smaller than modeled due to an undisclosed organic-traffic shift. Billing growth strength is continuing. Expect a positive surprise.'
  },
  {
    id: 'nykaa',
    name: 'Nykaa',
    ticker: 'NYKAA',
    category: 'Consumer & Retail',
    returnPercent: -30,
    openingBidPrice: 8000,
    displayNews: 'Nykaa reported strong festive-season order growth, but a report flags rising customer-return rates on its fashion vertical. A brokerage likes growth, another flags margin risk.',
    insiderNews: 'Return rates are worse than disclosed and are expected to erode margins on the fashion vertical significantly. Expect a negative correction.'
  },
  {
    id: 'indigo',
    name: 'InterGlobe Aviation (IndiGo)',
    ticker: 'INDIGO',
    category: 'Aviation & Logistics',
    returnPercent: 25,
    openingBidPrice: 12000,
    displayNews: 'IndiGo reported record passenger volumes, but a report flags rising aviation turbine fuel costs. Bulls cite volumes, bears cite fuel-cost pressure.',
    insiderNews: 'Fuel costs are partly hedged via an undisclosed contract, smaller impact than modeled. Passenger volume strength is continuing. Expect a positive surprise.'
  },
  {
    id: 'varun-beverages',
    name: 'Varun Beverages',
    ticker: 'VBL',
    category: 'FMCG & Consumer',
    returnPercent: -15,
    openingBidPrice: 8000,
    displayNews: 'Varun Beverages reported strong summer sales volumes, but a report flags rising sugar and packaging costs. A brokerage likes volumes, another flags cost pressure.',
    insiderNews: 'Sugar costs are running higher than disclosed and expected to offset most of the volume gain. Expect a negative correction.'
  },
  {
    id: 'boeing',
    name: 'Boeing',
    ticker: 'BA',
    category: 'Defense & Infra',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'Boeing announced a large new aircraft order, but a report flags a fresh quality-control issue on a key production line. Bulls cite the order, bears cite production risk.',
    insiderNews: 'The quality-control issue is more serious than disclosed and expected to delay deliveries meaningfully. Expect a negative correction.'
  },
  {
    id: 'intel',
    name: 'Intel',
    ticker: 'INTC',
    category: 'Tech',
    returnPercent: 30,
    openingBidPrice: 10000,
    displayNews: 'Intel unveiled a new chip manufacturing process, but a report flags delays at a key overseas fabrication plant. Analysts are split on the net impact.',
    insiderNews: 'The fabrication delay is minor and already resolved via a backup facility, undisclosed. The new chip process is ahead of schedule. Expect a positive surprise.'
  },
  {
    id: 'uber',
    name: 'Uber Technologies',
    ticker: 'UBER',
    category: 'Tech',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: 'Uber reported record ride volumes, but a report flags rising driver-incentive costs to retain supply. A brokerage likes volumes, another flags margin risk.',
    insiderNews: 'Driver-incentive costs are running higher than disclosed and expected to compress margins meaningfully this quarter. Expect a negative correction.'
  },
  {
    id: 'paypal',
    name: 'PayPal Holdings',
    ticker: 'PYPL',
    category: 'Fintech & Exchanges',
    returnPercent: 15,
    openingBidPrice: 8000,
    displayNews: 'PayPal reported strong transaction volume growth, but a report flags rising competition from newer payment apps. Bulls cite volumes, bears cite competitive risk.',
    insiderNews: "Competitive pressure is smaller than modeled — PayPal's checkout share is holding steady, undisclosed. Volume growth strength is continuing. Expect a positive surprise."
  },
  // Page 15
  {
    id: 'visa',
    name: 'Visa Inc.',
    ticker: 'V',
    category: 'Fintech & Exchanges',
    returnPercent: -10,
    openingBidPrice: 8000,
    displayNews: 'Visa reported strong cross-border transaction growth, but a report flags rising regulatory scrutiny on interchange fees in several markets. Analysts are split on the net effect.',
    insiderNews: 'Regulatory scrutiny is more advanced than disclosed and expected to force fee cuts sooner than the bullish case assumes. Expect a negative correction.'
  }
];

export const DEFAULT_TEAMS = [
  { id: 'team-1', name: 'Team A', avatarColor: '#f59e0b' },
  { id: 'team-2', name: 'Team B', avatarColor: '#3b82f6' },
  { id: 'team-3', name: 'Team C', avatarColor: '#10b981' },
  { id: 'team-4', name: 'Team D', avatarColor: '#8b5cf6' },
  { id: 'team-5', name: 'Team E', avatarColor: '#ec4899' },
  { id: 'team-6', name: 'Team F', avatarColor: '#06b6d4' },
  { id: 'team-7', name: 'Team G', avatarColor: '#f97316' },
  { id: 'team-8', name: 'Team H', avatarColor: '#14b8a6' },
  { id: 'team-9', name: 'Team I', avatarColor: '#6366f1' },
  { id: 'team-10', name: 'Team J', avatarColor: '#e11d48' },
];

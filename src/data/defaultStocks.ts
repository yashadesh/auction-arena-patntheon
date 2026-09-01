import { Stock } from '../types';

export const INITIAL_STOCKS: Stock[] = [
  {
    id: 'reliance',
    name: 'Reliance Industries',
    ticker: 'RELIANCE',
    category: 'Conglomerate' as any,
    returnPercent: 20,
    openingBidPrice: 12000,
    displayNews: 'Reliance is planning a big restructuring. One report says a part of the company might be sold off — a big win for investors. Another report says the company is short on cash right now. No one knows which one is true yet.',
    insiderNews: "The sell-off is happening, and it's their most profitable part going to a new company. This stock is set to close strong this round."
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
    openingBidPrice: 15000,
    displayNews: 'HDFC Bank reports record profits this quarter — but regulators are reportedly "reviewing" some of its lending practices. Some analysts call it the safest stock in the game right now. Others say a regulatory action could hit any day. The bank has made no official statement.',
    insiderNews: "The regulatory review is more serious than public reports suggest — a penalty is expected before this round closes. The record profit numbers won't be enough to offset it. This stock is set to close weak."
  },
  {
    id: 'icici-bank',
    name: 'ICICI Bank',
    ticker: 'ICICIBANK',
    category: 'Banking & NBFC',
    returnPercent: 20,
    openingBidPrice: 12000,
    displayNews: "ICICI Bank announces it's raising fresh capital — but it's still unclear if this is to fund big growth plans or to cover hidden bad loans. One report says the bank is eyeing a major acquisition. Another says a rival bank is trying to poach half its top management this week. The RBI has also scheduled a \"routine\" inspection. No one can agree on what any of this means.",
    insiderNews: "The capital raise is for growth, not bad loans — the acquisition talk is real and will be announced soon. The management exits and RBI inspection are non-issues, just noise. This stock is set to close strong."
  },
  {
    id: 'infosys',
    name: 'Infosys',
    ticker: 'INFY',
    category: 'Tech',
    returnPercent: 25,
    openingBidPrice: 10000,
    displayNews: "Infosys just won a massive multi-year contract — but on the same day, its CFO abruptly resigned \"for personal reasons.\" A leaked internal memo (unconfirmed) hints at \"employee restructuring\" in the next quarter. Meanwhile, a rival firm claims Infosys underbid the new contract and will \"struggle to deliver profitably.\" Analysts on TV are split three ways — some call it the deal of the year, some call the CFO exit a red flag, and some say ignore everything until the earnings call. The company has issued no clarification.",
    insiderNews: "The CFO exit is unrelated — she's joining a competitor, nothing internal. The \"underbid\" claim is a rival's PR spin; margins on the new deal are actually strong. The restructuring memo is real but small-scale, won't affect near-term earnings. Bottom line: this stock is set to close strong."
  },
  {
    id: 'tata-motors',
    name: 'Tata Motors',
    ticker: 'TATAMOTORS',
    category: 'Auto & EV',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: "Tata Motors' EV division just posted disappointing sales numbers this month, and a top EV executive has quietly stepped down. But the same day, the company announced it's in talks to export vehicles to a new international market. Some analysts say the EV slowdown is temporary and the export deal changes everything. Others say the export talks are just a distraction from bad numbers. No official word from the company.",
    insiderNews: "The EV slowdown is real and won't recover this quarter — the executive left because of it. The export deal is still months away from being finalized and won't move the numbers yet. This stock is set to close weak."
  },
  {
    id: 'lt',
    name: 'Larsen and Toubro (L&T)',
    ticker: 'LT',
    category: 'Defense & Infra',
    returnPercent: -20,
    openingBidPrice: 8000,
    displayNews: "L&T just bagged its biggest-ever infrastructure order from the government — reports value the deal in thousands of crores. Stock analysts on TV are calling it a \"generational win\" and comparing it to the company's best years. The order book is said to be \"overflowing.\" One small line buried in the press release mentions \"execution timelines under review,\" but everyone's too excited about the order size to talk about it.",
    insiderNews: "The order is real, but it's back-loaded over 7 years with almost nothing hitting revenue this year. Worse, that \"execution timelines under review\" line means an existing project is delayed and will trigger a penalty clause this quarter. The market will realize this after the initial excitement fades. This stock is set to close weak."
  },
  {
    id: 'tata-steel',
    name: 'Tata Steel',
    ticker: 'TATASTEEL',
    category: 'Energy & Commodities',
    returnPercent: -15,
    openingBidPrice: 12000,
    displayNews: "Global steel prices are rising sharply, and Tata Steel just announced plans to expand a plant overseas. But a separate report says the company is facing rising raw material costs and a \"temporary\" halt at one of its domestic units for \"maintenance.\" Some analysts say rising steel prices will boost profits massively. Others say the cost pressure and plant halt will eat into any gains. No official statement from the company yet.",
    insiderNews: "The plant halt isn't just maintenance — it's a longer shutdown due to a technical fault, and it'll hit output this quarter. The raw material cost spike is also worse than reported. The rising steel prices help, but not enough to offset these two hits. This stock is set to close weak."
  },
  {
    id: 'sun-pharma',
    name: 'Sun Pharma',
    ticker: 'SUNPHARMA',
    category: 'Pharma & Healthcare',
    returnPercent: 20,
    openingBidPrice: 8000,
    displayNews: "Sun Pharmaceutical Industries saw choppy trading this week after conflicting reports emerged. A leading business daily cited \"sources close to the matter\" suggesting the company's flagship generic drug may face renewed USFDA scrutiny at its Halol facility — while a separate report claims the plant recently cleared a surprise inspection with zero observations. Adding to the noise, a mid-tier brokerage downgraded the stock citing \"pricing pressure in the US generics market,\" even as another analyst house issued a bullish note flagging Sun Pharma's specialty portfolio as \"undervalued relative to peers.\" Management has not issued any official statement. Trading volumes spiked 40% above average, with no clear directional consensus among floor traders.",
    insiderNews: "Sun Pharma Insider Brief: The USFDA scrutiny rumor is stale — that inspection cycle closed months ago with no adverse findings, and the Halol facility received an unblemished re-clearance that hasn't been formally announced yet. The brokerage downgrade was based on outdated Q-on-Q pricing data; internally, specialty drug margins for the current quarter are tracking well ahead of street estimates. Expect a positive surprise when Sun Pharma re-enters the public board."
  },
  {
    id: 'adani-enterprises',
    name: 'Adani Enterprises',
    ticker: 'ADANIENT',
    category: 'Defense & Infra',
    returnPercent: -20,
    openingBidPrice: 12000,
    displayNews: "Adani Enterprises Ltd. traded erratically this week as contradictory headlines hit the wires. One report claimed the group's new green hydrogen facility had secured a major offtake agreement with a European buyer, while a rival outlet cited \"unnamed officials\" suggesting the deal was still \"in early-stage talks\" and far from binding. Separately, a foreign brokerage raised its target price citing \"aggressive infrastructure expansion,\" even as a domestic ratings agency flagged \"elevated leverage across group entities\" in a routine sector note. No official confirmation has come from Adani Enterprises. Floor chatter was split roughly evenly between bulls and bears, with volumes running well above the week's average.",
    insiderNews: "The hydrogen offtake story is being overstated — the counterparty has quietly paused negotiations pending a compliance review, and no binding agreement is close. Meanwhile, the leverage flag from the ratings note is more serious than the public write-up let on: a formal review of group debt levels is underway internally, and refinancing terms are expected to tighten. Expect a negative correction when Adani Enterprises re-enters the public board."
  },
  {
    id: 'adani-ports',
    name: 'Adani Ports',
    ticker: 'ADANIPORTS',
    category: 'Defense & Infra',
    returnPercent: 15,
    openingBidPrice: 14000,
    displayNews: "Adani Ports reports record cargo volumes this quarter, and the company announces plans to acquire a stake in a major international port. But this comes right after news that Adani Enterprises (a group company) is facing a rating agency review — and some analysts worry the group's debt troubles could \"spill over\" into Adani Ports too. A few brokerages have reaffirmed a \"buy\" rating, while others are advising caution \"given group-level risk.\" No clarity yet on how connected the two companies' finances really are.",
    insiderNews: "Adani Ports runs on a separate balance sheet with strong independent cash flows — the group-level debt worries don't actually touch this company's numbers. The international port acquisition is close to finalizing and will be announced as a done deal soon. The record cargo volumes are genuine and expected to keep climbing next quarter. This stock is set to close strong."
  },
  {
    id: 'bajaj-finance',
    name: 'Bajaj Finance',
    ticker: 'BAJFINANCE',
    category: 'Banking & NBFC',
    returnPercent: -10,
    openingBidPrice: 10000,
    displayNews: "Bajaj Finance Ltd. saw volatile trading this week amid dueling narratives. One report highlighted the NBFC's \"record disbursal growth\" in its consumer lending arm, while a separate piece cited \"internal sources\" flagging a rise in early-stage delinquencies within its unsecured personal loan book. A domestic brokerage reiterated a buy rating on \"strong AUM momentum,\" even as another analyst house warned of \"asset quality pressure amid tightening RBI norms on unsecured lending.\" The company has issued no official comment. Trading volumes ran well above average, with sentiment split roughly evenly across the floor.",
    insiderNews: "The disbursal-growth story is old news already priced in. What isn't public: early-stage delinquencies in the unsecured personal loan book have been quietly worsening for two straight quarters, and an internal provisioning review is underway that's expected to push credit costs meaningfully higher than street estimates. The RBI's tightening stance on unsecured lending is also expected to hit growth guidance harder than analysts currently assume. Expect a negative correction when Bajaj Finance re-enters the public board."
  },
  {
    id: 'axis-bank',
    name: 'Axis Bank',
    ticker: 'AXISBANK',
    category: 'Banking & NBFC',
    returnPercent: 10,
    openingBidPrice: 15000,
    displayNews: "Axis Bank Ltd. traded erratically this week following contradictory coverage. One report cited \"sources familiar with the matter\" suggesting the bank's corporate loan book was seeing a fresh uptick in stressed assets, while a separate outlet claimed the bank had actually seen its best quarter for recoveries in over a year. A foreign brokerage raised its target price on \"improving net interest margins,\" even as a domestic research desk cut its rating citing \"elevated provisioning risk amid slowing credit growth.\" No official statement has come from Axis Bank. Trading volumes ran well above the week's average, with sentiment split roughly evenly across the floor.",
    insiderNews: "The stressed-assets rumor is overstated — that pocket of corporate exposure has already been substantially recovered, and the \"best quarter for recoveries\" report is the accurate one, just not yet reflected in public commentary. Internally, net interest margins are tracking stronger than the brokerage's already-positive note suggests, and provisioning is expected to come in well below the bearish desk's estimate. Expect a positive surprise when Axis Bank re-enters the public board."
  },
  {
    id: 'apple',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    category: 'Tech',
    returnPercent: -30,
    openingBidPrice: 20000,
    displayNews: "Apple Inc. saw volatile trading this week after dueling reports emerged from supply chain trackers. One outlet claimed the company's upcoming flagship device was seeing \"record pre-order demand\" from key markets, while a separate report cited \"assembly partners\" suggesting production targets had quietly been trimmed due to a component shortage. A leading brokerage raised its price target on \"resilient services revenue,\" even as another analyst flagged \"softening demand signals in China\" as a near-term risk. Apple has made no official comment. Trading volumes ran above average, with sentiment split roughly evenly on the floor.",
    insiderNews: "The \"record pre-order demand\" story is being cherry-picked from one region — company-wide, the production trim is real and larger than reported, driven by a genuine component shortage that isn't resolving as fast as suppliers claim. Internally, China demand is softening faster than the bearish analyst's note suggests, and the services-revenue optimism doesn't offset the hardware shortfall this cycle. Expect a negative correction when Apple re-enters the public board."
  },
  {
    id: 'microsoft',
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    category: 'Tech',
    returnPercent: 20,
    openingBidPrice: 18000,
    displayNews: "Microsoft Corporation traded erratically this week following contradictory coverage of its Azure cloud division. One report cited \"internal projections\" suggesting Azure growth was decelerating faster than guided, while a separate outlet claimed enterprise AI contract wins had accelerated well beyond expectations. A major brokerage raised its price target on \"strong AI-driven cloud demand,\" even as another analyst house warned of \"margin compression from data-center capex\" weighing on near-term earnings. Microsoft has made no official statement. Trading volumes ran above average, with sentiment split roughly evenly across the floor.",
    insiderNews: "The \"decelerating Azure growth\" story is based on stale internal projections that have since been revised upward — enterprise AI contract wins are, in fact, running ahead of even the bullish analyst's estimate. The margin-compression concern is real but smaller than reported; capex efficiency gains from recent data-center upgrades are offsetting most of the pressure. Expect a positive surprise when Microsoft re-enters the public board."
  },
  {
    id: 'google',
    name: 'Alphabet Inc. (Google)',
    ticker: 'GOOGL',
    category: 'Tech',
    returnPercent: -20,
    openingBidPrice: 16000,
    displayNews: "Alphabet Inc. saw volatile trading this week following dueling reports on its core advertising business. One outlet cited \"internal metrics\" suggesting search ad revenue was holding up better than feared against AI-chatbot competition, while a separate report claimed major advertisers were quietly shifting budgets away from Google Search toward newer AI-native platforms. A leading brokerage raised its target price on \"resilient Cloud segment growth,\" even as another analyst flagged \"regulatory overhang from ongoing antitrust proceedings\" as a near-term risk. Alphabet has made no official comment. Trading volumes ran well above average, with sentiment split roughly evenly on the floor.",
    insiderNews: "The \"resilient search ad revenue\" story is outdated — the advertiser budget shift toward AI-native platforms is real and accelerating faster than the public report suggests, hitting core search revenue harder than modeled. The Cloud growth optimism doesn't offset this shortfall this cycle, and the antitrust overhang is also expected to force costly remedies sooner than the bearish analyst anticipated. Expect a negative correction when Alphabet re-enters the public board."
  },
  {
    id: 'ntpc',
    name: 'NTPC Ltd.',
    ticker: 'NTPC',
    category: 'Energy & Commodities',
    returnPercent: 35,
    openingBidPrice: 6000,
    displayNews: "NTPC Ltd. traded erratically this week amid contradictory coverage of its power generation capacity plans. One report cited \"government sources\" suggesting a major new thermal plant clearance was imminent, boosting long-term capacity guidance, while a separate outlet claimed the same clearance had been stalled over environmental compliance objections. A domestic brokerage raised its target price citing \"strong PLF (plant load factor) improvement,\" even as another analyst warned of \"coal supply constraints\" pressuring near-term output. NTPC has issued no official statement. Trading volumes ran above average, with sentiment split roughly evenly across the floor.",
    insiderNews: "The environmental-objection story is outdated — those compliance concerns were quietly resolved weeks ago, and the thermal plant clearance is expected to be formally announced sooner than the public report suggests. The coal supply constraint is also less severe than the bearish analyst claims; NTPC has secured additional long-term supply contracts that haven't been disclosed publicly yet. Expect a positive surprise when NTPC re-enters the public board."
  },
  {
    id: 'power-grid',
    name: 'Power Grid Corporation',
    ticker: 'POWERGRID',
    category: 'Energy & Commodities',
    returnPercent: 30,
    openingBidPrice: 9000,
    displayNews: "Power Grid Corporation of India Ltd. saw volatile trading this week amid contradictory coverage of its transmission infrastructure pipeline. One report cited \"sources within the ministry\" suggesting a major interstate transmission project had won expedited approval, while a separate outlet claimed the same project faced fresh land-acquisition delays. A domestic brokerage raised its target price on \"stable regulated-return business model,\" even as another analyst flagged \"execution risk on new capex commitments.\" Power Grid has issued no official statement. Trading volumes ran above average, with sentiment split roughly evenly across the floor.",
    insiderNews: "The land-acquisition delay story is stale — that issue was resolved through an alternate route months ago, and the expedited approval report is the accurate one, just not yet formally announced. Execution risk on new capex is also overstated; internally, the project pipeline is ahead of schedule with lower-than-guided cost overruns. Expect a positive surprise when Power Grid re-enters the public board."
  },
  {
    id: 'vedanta',
    name: 'Vedanta Limited',
    ticker: 'VEDL',
    category: 'Energy & Commodities',
    returnPercent: -20,
    openingBidPrice: 8000,
    displayNews: "Vedanta faced intense scrutiny regarding its parent entity debt refinancing deadlines and commodity market cycle corrections. Metal price volatility continues to test profit margins.",
    insiderNews: "Debt servicing pressure at the parent company level is higher than officially admitted, and high dividend payouts are stretching operational liquidity. Expect a negative correction on the board."
  },
  {
    id: 'bel',
    name: 'Bharat Electronics Limited (BEL)',
    ticker: 'BEL',
    category: 'Defense & Infra',
    returnPercent: 25,
    openingBidPrice: 12000,
    displayNews: "Bharat Electronics Ltd. traded erratically this week following dueling reports on its defence order pipeline. One outlet cited \"sources close to the ministry\" suggesting a large radar-systems order was imminent, while a separate report claimed the tender process had been extended, pushing any award well into next year. A brokerage raised its target price on \"record order backlog,\" even as another analyst warned of \"execution delays on existing contracts\" weighing on near-term revenue recognition. BEL has made no official comment. Trading volumes ran well above average, with sentiment split roughly evenly on the floor.",
    insiderNews: "The tender-extension story is outdated — the radar-systems order has already been informally cleared and is expected to be announced sooner than the public report suggests. The execution-delay concern is also overstated; internally, existing contract deliveries are tracking ahead of schedule, which should support stronger near-term revenue recognition than the bearish note assumes. Expect a positive surprise when BEL re-enters the public board."
  },
  {
    id: 'hal',
    name: 'Hindustan Aeronautics Limited (HAL)',
    ticker: 'HAL',
    category: 'Defense & Infra',
    returnPercent: 30,
    openingBidPrice: 15000,
    displayNews: "HAL saw big market excitement surrounding sovereign defense export talks and multi-engine aircraft manufacture contracts, despite occasional murmur of raw-material inflation.",
    insiderNews: "The \"technical objections\" story is outdated — those concerns were resolved in a follow-up round of talks that hasn't been made public, and the export order is now close to signing, ahead of the market's expectations. The raw-material cost pressure is also smaller than the bearish analyst suggests, thanks to a recently locked-in supplier contract. Expect a positive surprise when HAL re-enters the public board."
  },
  {
    id: 'asian-paints',
    name: 'Asian Paints',
    ticker: 'ASIANPAINT',
    category: 'Consumer & Retail',
    returnPercent: -20,
    openingBidPrice: 15000,
    displayNews: "Asian Paints Ltd. saw volatile trading this week following dueling reports on consumer demand trends. One outlet cited \"channel checks\" suggesting rural paint demand was rebounding strongly ahead of the festive season, while a separate report claimed dealer inventory was piling up amid weaker-than-expected urban offtake. A brokerage raised its target price on \"market leadership and pricing power,\" even as another analyst warned of \"raw material cost inflation and rising competitive intensity\" from newer entrants. Asian Paints has issued no official statement. Trading volumes ran above average, with sentiment split roughly evenly on the floor.",
    insiderNews: "The \"rural demand rebound\" story is cherry-picked from one region — company-wide, dealer inventory buildup is real and worse than reported, signaling weaker sell-through than the bullish brokerage assumes. Competitive intensity from newer entrants is also biting harder than modeled, pressuring both volumes and pricing power simultaneously. Expect a negative correction when Asian Paints re-enters the public board."
  },
  {
    id: 'cipla',
    name: 'Cipla Ltd.',
    ticker: 'CIPLA',
    category: 'Pharma & Healthcare',
    returnPercent: 40,
    openingBidPrice: 20000,
    displayNews: "Cipla Ltd. traded erratically this week amid contradictory coverage of a key generic drug filing. One report cited \"regulatory sources\" suggesting USFDA approval for a high-value inhaler product was imminent, while a separate outlet claimed the application had received an additional information request, pushing any approval further out. A brokerage raised its target price on \"strong respiratory portfolio momentum,\" even as another analyst flagged \"pricing pressure in the US generics market.\" Cipla has issued no official statement. Trading volumes ran above average, with sentiment split roughly evenly across the floor.",
    insiderNews: "The \"additional information request\" story is outdated — that query was already resolved internally, and the inhaler approval is now expected sooner than the public report suggests. US pricing pressure is also less severe than the bearish analyst claims, thanks to a favorable distribution agreement that hasn't been disclosed yet. Expect a positive surprise when Cipla re-enters the public board."
  },
  {
    id: 'ather-energy',
    name: 'Ather Energy',
    ticker: 'ATHER',
    category: 'Auto & EV',
    returnPercent: 30,
    openingBidPrice: 14000,
    displayNews: "Ather Energy Ltd. saw volatile trading this week following dueling reports on electric two-wheeler sales. One outlet cited \"dealership data\" suggesting monthly delivery numbers had hit a fresh record, while a separate report claimed production bottlenecks at a key plant were causing a backlog of unfulfilled orders. A brokerage raised its target price on \"expanding market share,\" even as another analyst warned of \"cash burn and margin pressure\" typical of a scaling EV player. Ather has made no official comment. Trading volumes ran well above average, with sentiment split roughly evenly on the floor.",
    insiderNews: "The production-bottleneck story is stale — that constraint was resolved with a capacity upgrade that hasn't been publicly announced, and the record-delivery numbers are the accurate, current picture. Cash burn concerns are also overstated; internally, unit economics have improved faster than the bearish analyst assumes as scale kicks in. Expect a positive surprise when Ather Energy re-enters the public board."
  },
  {
    id: 'titan',
    name: 'Titan Company',
    ticker: 'TITAN',
    category: 'Consumer & Retail',
    returnPercent: 20,
    openingBidPrice: 18000,
    displayNews: "Titan had a great festive season — jewellery sales are up, and the company is also expanding into a new country. But gold prices have gone up a lot recently, and some experts worry this could eat into profits even though sales are strong and gold is also falling drastically seeing that many investor are thinking of withdrawing their equities.",
    insiderNews: "Titan already bought its gold months ago at a much lower price, so the price spike everyone's worried about won't actually hurt them this time. Sales are strong, and almost all of it will turn into profit."
  },
  {
    id: 'mahindra',
    name: 'Mahindra & Mahindra (M&M)',
    ticker: 'M&M',
    category: 'Auto & EV',
    returnPercent: -10,
    openingBidPrice: 12000,
    displayNews: "Mahindra & Mahindra Ltd. traded erratically this week amid contradictory coverage of its SUV order book. One report cited \"dealer channel checks\" suggesting waiting periods on flagship models were stretching even longer, signaling robust demand, while a separate outlet claimed cancellations had ticked up as competitors launched aggressively priced rivals. A brokerage raised its target price on \"market-leading SUV franchise,\" even as another analyst warned of \"rising input costs and competitive discounting\" pressuring margins. M&M has issued no official statement. Trading volumes ran above average, with sentiment split roughly evenly across the floor.",
    insiderNews: "The \"longer waiting periods\" story is cherry-picked from one model — company-wide, cancellations are running higher than reported as competitor pricing bites into the order book faster than modeled. Input cost pressure is also worse than the bearish analyst suggests, and planned discounting to defend market share is expected to compress margins more than the street has priced in. Expect a negative correction when M&M re-enters the public board."
  },
  {
    id: 'coal-india',
    name: 'Coal India',
    ticker: 'COALINDIA',
    category: 'Energy & Commodities',
    returnPercent: -20,
    openingBidPrice: 15000,
    displayNews: "Coal India announces record coal production this month, and demand from power plants is at an all-time high because of the summer heat. But the government is also talking about pushing companies to use more solar and wind power instead of coal. On top of that, a workers' union has threatened a strike next month if their demands aren't met. Some people say Coal India will make huge profits right now. Others say the strike and the shift to solar/wind could hurt the company badly, just not yet.",
    insiderNews: "The strike talk is serious — union leaders have already agreed on dates internally, and it will start before this round ends, hitting production hard. The record output number you saw is actually the last \"normal\" number before that happens. The solar/wind shift is real but years away and won't matter this round. Expecting huge sell off of the shares."
  },
  {
    id: 'spacex',
    name: 'SpaceX',
    ticker: 'SPACEX',
    category: 'Tech',
    returnPercent: -30,
    openingBidPrice: 12000,
    displayNews: "SpaceX shares swung this week on conflicting reports: one outlet says a major satellite-constellation deal is signed, another claims regulatory review is delaying it. One brokerage cites \"record launch cadence\"; another flags \"Starship capex burn.\" No official confirmation either way. Volumes ran well above average, sentiment split evenly on the floor.",
    insiderNews: "The \"signed deal\" report is premature — regulatory review has escalated further than disclosed. Starship costs are running above internal projections, with a milestone delay expected internally but not yet public. Expect a negative correction when SpaceX re-enters the board."
  },
  {
    id: 'ongc',
    name: 'ONGC',
    ticker: 'ONGC',
    category: 'Energy & Commodities',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: "ONGC saw choppy trading this week after a burst of conflicting reports on its exploration program. One report suggested a new offshore find could meaningfully boost the company's reserve base, supporting long-term production guidance. A separate outlet claimed exploration costs at the same site were running well over budget with disappointing early yield data, directly contradicting the optimistic read. A brokerage flagged \"crude price tailwinds\" as supportive, even as another analyst warned \"aging field decline rates\" could offset any new-find upside. ONGC issued no official statement. Trading volumes ran above average, with sentiment split roughly evenly on the floor.",
    insiderNews: "The offshore find is smaller than the optimistic report claims, and the disappointing yield data is closer to accurate. More importantly, decline rates at ONGC's legacy fields are accelerating faster than currently modeled — a bigger swing factor than any single new find. The crude price tailwind doesn't offset the volume decline expected internally over coming quarters. Expect a negative correction when ONGC re-enters the public board."
  },
  {
    id: 'maruti-suzuki',
    name: 'Maruti Suzuki',
    ticker: 'MARUTI',
    category: 'Auto & EV',
    returnPercent: 30,
    openingBidPrice: 18000,
    displayNews: "Maruti Suzuki traded erratically this week amid a burst of contradictory coverage around export order momentum and rising cost pressures. One report suggested a large new export order from an African market was close to being finalized, seen as a potential volume catalyst for the fiscal year. A separate outlet claimed a new emissions norm would meaningfully raise input costs across the compact-car lineup, offsetting that optimism. A brokerage cited \"market-leading volumes\" as a durable advantage, even as another analyst warned of \"margin compression\" from the compliance-driven cost increase. Maruti issued no official statement. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "The export order is further along than reported and larger in scale — a signing is expected sooner than the market anticipates. The margin-compression concern is overstated; a supplier agreement locking in key component costs was recently finalized internally and hasn't been disclosed, keeping the emissions-compliance cost increase well below what's currently modeled. Expect a positive surprise when Maruti Suzuki re-enters the public board."
  },
  {
    id: 'lic-india',
    name: 'LIC of India',
    ticker: 'LICI',
    category: 'Banking & NBFC',
    returnPercent: 35,
    openingBidPrice: 9000,
    displayNews: "LIC saw choppy trading this week following a burst of dueling reports on its business fundamentals. One report claimed new premium collections had hit a record for the quarter, evidence LIC was defending its market position well. A separate outlet claimed policy lapses were actually rising as private insurers stepped up competitive pressure with more flexible products, contradicting the strong-collections narrative. A brokerage highlighted LIC's \"scale and distribution reach\" as a structural moat, even as another analyst flagged \"market share erosion\" to private players as an ongoing concern. LIC issued no official statement. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "The lapse-rate concern is overstated — internal figures show the trend actually stabilizing over the past two months, contrary to what's being publicly reported. The record premium collection figure is accurate and continuing into the current quarter at a pace ahead of even the bullish brokerage's own estimate. Expect a positive surprise when LIC re-enters the public board."
  },
  {
    id: 'cupid',
    name: 'Cupid Ltd.',
    ticker: 'CUPID',
    category: 'Pharma & Healthcare',
    returnPercent: 60,
    openingBidPrice: 10000,
    displayNews: "Cupid Ltd. traded erratically this week amid a burst of contradictory coverage of its order pipeline. One report suggested the company had won a large government tender, potentially one of its biggest single order wins in recent years. A separate outlet claimed export shipment approvals for an unrelated overseas order were facing regulatory delays, raising concerns about near-term revenue timing regardless of the tender outcome. A brokerage cited \"order book strength\" as the dominant near-term driver, even as another analyst flagged \"regulatory uncertainty\" on the export side as a risk to guidance. Cupid made no official comment. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "The export shipment delay is outdated — that approval was quietly resolved through an alternate regulatory pathway, and shipments have already resumed, though undisclosed. On the tender side, the win is confirmed and larger in value than the figure currently circulating publicly. Expect a positive surprise when Cupid re-enters the public board."
  },
  {
    id: 'itc',
    name: 'ITC Limited',
    ticker: 'ITC',
    category: 'Consumer & Retail',
    returnPercent: -30,
    openingBidPrice: 12000,
    displayNews: "ITC saw choppy trading this week following a burst of dueling reports on its diversified business segments. One report highlighted strong growth across ITC's FMCG segment, evidence the company's diversification strategy away from tobacco was paying off. A separate outlet cited rising input costs alongside a proposed tax hike on cigarettes under policy discussion, directly raising concerns about the core tobacco business's profitability. A brokerage cited \"diversification beyond tobacco\" as a structural positive, even as another analyst flagged \"regulatory tax risk\" as a near-term headwind for the segment still driving most profits. ITC issued no official statement. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "The tax hike proposal is further along in the policy process than what's currently publicly known, and expected to hit tobacco segment margins harder than the bullish diversification narrative accounts for. The FMCG growth figures are accurate but not yet large enough in scale to offset a meaningful tax-driven hit to the core business. Expect a negative correction when ITC re-enters the public board."
  },
  {
    id: 'zomato',
    name: 'Zomato',
    ticker: 'ZOMATO',
    category: 'Tech',
    returnPercent: 40,
    openingBidPrice: 14000,
    displayNews: "Zomato traded erratically this week amid a burst of contradictory coverage of its quick-commerce unit's financial performance. One report claimed the unit had turned profitable for the first time, framing it as a significant milestone for the broader business. A separate outlet claimed losses at the same unit were actually still mounting, directly contradicting the profitability claim. A brokerage cited Zomato's \"market leadership\" in both food delivery and quick commerce as the more important long-term driver, even as another analyst flagged \"cash burn\" at the quick-commerce unit as an ongoing concern. Zomato made no official comment. Volumes ran well above average, sentiment split evenly on the floor.",
    insiderNews: "The profitability report is accurate and arrived ahead of the internal schedule management had guided toward. The loss figures cited in the competing report are from an outdated quarter and don't reflect the unit's current trajectory. Combined with continued market share gains in core delivery, the turnaround looks more durable than the mixed public coverage suggests. Expect a positive surprise when Zomato re-enters the public board."
  },
  {
    id: 'groww',
    name: 'Groww',
    ticker: 'GROWW',
    category: 'Fintech & Exchanges',
    returnPercent: 30,
    openingBidPrice: 15000,
    displayNews: "Groww saw choppy trading this week following a burst of dueling reports on its business trajectory. One report claimed user growth and trading volumes had hit new highs, pointing to continued strong customer acquisition. A separate outlet claimed upcoming regulatory changes on F&O (futures and options) trading could meaningfully hurt revenue, directly offsetting the growth narrative. A brokerage cited Groww's \"market share gains\" against established brokerages as the dominant trend, even as another analyst flagged \"regulatory headwinds\" as a structural risk to the current revenue mix. Groww issued no official statement. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "The regulatory impact from the F&O changes is smaller than the bearish report suggests — an exemption clause applies to a meaningful portion of Groww's core product mix that hasn't been publicized yet. Combined with the genuinely strong user growth and volume figures, the underlying business trajectory looks stronger than the mixed public narrative implies. Expect a positive surprise when Groww re-enters the public board."
  },
  {
    id: 'zerodha',
    name: 'Zerodha',
    ticker: 'ZERODHA',
    category: 'Fintech & Exchanges',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: "Zerodha traded erratically this week amid a burst of contradictory coverage of its user base trends. One report claimed the active user base was still growing steadily, evidence of continued market leadership. A separate outlet claimed churn was actually rising as rival platforms cut fees to attract price-sensitive traders, directly contradicting the steady-growth narrative. A brokerage cited Zerodha's \"brand trust and low-cost model\" as durable competitive advantages, even as another analyst flagged \"fee-war pressure\" from newer, well-funded entrants as a growing threat to the current business model. Zerodha made no official comment. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "The churn numbers are worse than what's currently being publicly reported, and don't account for accelerating attrition among active traders. A fee cut being planned internally to compete with newer entrants is expected to hit revenue harder than currently modeled, since it applies to Zerodha's highest-volume customer segment. The brand-trust advantage isn't proving sufficient to offset the fee-war pressure. Expect a negative correction when Zerodha re-enters the public board."
  },
  {
    id: 'nestle-india',
    name: 'Nestlé India',
    ticker: 'NESTLEIND',
    category: 'Consumer & Retail',
    returnPercent: -20,
    openingBidPrice: 10000,
    displayNews: "Nestlé India saw choppy trading this week following a burst of dueling reports on demand trends heading into the festive season. One report cited strong festive-season sales figures as evidence of resilient consumer demand. A separate outlet claimed rural demand was actually softer than expected, alongside rising input costs, directly contradicting the strong-sales narrative. A brokerage cited Nestlé's \"pricing power\" as a durable advantage that could offset near-term cost pressure, even as another analyst flagged \"volume growth slowdown\" as a more concerning underlying trend than the sales headline suggested. Nestlé India issued no official statement. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "The festive sales bump is overstated — underlying volume growth is weaker than the headline figure suggests, once a temporary promotional push is stripped out. Cocoa and dairy input costs are also running above internal guidance, worse than the bullish pricing-power narrative accounts for. Expect a negative correction when Nestlé India re-enters the public board."
  },
  {
    id: 'netflix',
    name: 'Netflix',
    ticker: 'NFLX',
    category: 'Tech',
    returnPercent: 20,
    openingBidPrice: 10000,
    displayNews: "Netflix traded erratically this week amid a burst of contradictory coverage of its subscriber trends. One report claimed ad-tier subscriber growth had beaten internal expectations by a wide margin, framing it as a key driver of the next growth phase. A separate outlet claimed gains from the earlier password-sharing crackdown were fading as the one-time boost worked its way through the subscriber base, directly offsetting the ad-tier optimism. A brokerage cited \"content slate strength\" heading into the next quarter as the dominant factor to watch, even as another analyst flagged \"subscriber saturation\" in mature markets as a longer-term concern. Netflix made no official comment. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "Ad-tier growth is stronger than even the optimistic report suggests, and a major content licensing deal not yet public is expected to drive a fresh wave of subscriber additions next quarter. The fading password-sharing boost is real but smaller in impact than suggested, and doesn't offset the new content-driven growth expected internally. Expect a positive surprise when Netflix re-enters the public board."
  },
  {
    id: 'paytm',
    name: 'Paytm (One97 Communications)',
    ticker: 'PAYTM',
    category: 'Fintech & Exchanges',
    returnPercent: 45,
    openingBidPrice: 14000,
    displayNews: "Paytm saw choppy trading this week following a burst of dueling reports on its business direction. One report claimed lending partnerships were expanding meaningfully, pointing to a new revenue stream gaining traction. A separate outlet claimed regulatory scrutiny on its core payments business was intensifying, directly raising concerns about near-term operational stability. A brokerage cited \"diversification into lending\" as a positive structural shift, even as another analyst flagged \"compliance risk\" as an overhang that could limit near-term upside regardless of the lending expansion. Paytm issued no official statement. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "The regulatory scrutiny concern is largely resolved behind the scenes — a key restriction the market has been pricing in has already been quietly waived following a compliance review, though undisclosed. The lending partnership expansion is also bigger in scope than currently reported, with an additional partner bank in advanced talks. Expect a positive surprise when Paytm re-enters the public board."
  },
  {
    id: 'coinbase',
    name: 'Coinbase Global',
    ticker: 'COIN',
    category: 'Fintech & Exchanges',
    returnPercent: 40,
    openingBidPrice: 18000,
    displayNews: "Coinbase saw volatile trading this week amid a burst of contradictory coverage of trading volume trends against a backdrop of broader crypto market volatility. One report claimed institutional trading volume was surging as more traditional finance players entered the space, framing it as a structural tailwind. A separate outlet claimed retail trading activity had dropped sharply over the same period, raising concerns about the platform's more volatile revenue segment. A brokerage cited \"institutional adoption\" as the dominant long-term trend, even as another analyst flagged \"revenue concentration risk\" given how much near-term revenue still depends on retail trading fees. Coinbase made no official comment. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "Institutional trading volume is even stronger than the optimistic report suggests, and a new custody services deal with a major asset manager — not yet public — is expected to add a significant new, more stable revenue stream. The retail volume drop is real but smaller than reported, and the institutional strength more than offsets it internally. Expect a positive surprise when Coinbase re-enters the public board."
  },
  {
    id: 'nvidia',
    name: 'NVIDIA Corporation',
    ticker: 'NVDA',
    category: 'Tech',
    returnPercent: -30,
    openingBidPrice: 18000,
    displayNews: "Nvidia traded erratically this week amid a burst of contradictory coverage of AI chip demand and export policy. One report claimed AI chip demand remained \"insatiable\" across data-center customers, pointing to continued order backlog strength. A separate outlet cited rumors of a new export restriction that could limit sales to a key overseas market, directly raising concerns about near-term revenue exposure. A brokerage cited Nvidia's \"data-center dominance\" as the more important long-term driver regardless of any single-market restriction, even as another analyst flagged \"geopolitical risk\" as a growing overhang on the stock. Nvidia made no official comment. Volumes ran well above average, sentiment split evenly on the floor.",
    insiderNews: "The export restriction is more serious than currently reported — a rumored licensing workaround the market had hoped for has fallen through, and a meaningful chunk of sales to that key market are now effectively blocked, worse than what the bearish analyst assumed. The \"insatiable demand\" narrative doesn't fully account for this specific market being closed off in the near term. Expect a negative correction when Nvidia re-enters the public board."
  },
  {
    id: 'netweb',
    name: 'Netweb Technologies',
    ticker: 'NETWEB',
    category: 'Tech',
    returnPercent: 50,
    openingBidPrice: 20000,
    displayNews: "Netweb Technologies saw choppy trading this week following a burst of dueling reports on its order pipeline. One report highlighted a large AI-server order win, framing it as a significant validation of the company's positioning in the domestic AI infrastructure buildout. A separate outlet claimed execution delays were pushing revenue recognition for that same order into the next fiscal year, directly offsetting the near-term optimism. A brokerage cited \"AI infrastructure tailwinds\" as a durable long-term driver, even as another analyst flagged \"order-to-revenue lag\" as a recurring concern for the company's growth numbers. Netweb made no official comment. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "The execution-delay concern is outdated — internal delivery timelines show the order actually shipping and being recognized within the current quarter, ahead of even the bullish brokerage's own estimate. The order-to-revenue lag flagged as a recurring issue doesn't apply to this particular contract given the accelerated internal timeline. Expect a positive surprise when Netweb Technologies re-enters the public board."
  },
  {
    id: 'jp-morgan',
    name: 'JPMorgan Chase & Co.',
    ticker: 'JPM',
    category: 'Banking & NBFC',
    returnPercent: 20,
    openingBidPrice: 15000,
    displayNews: "JPMorgan Chase traded erratically this week amid a burst of contradictory coverage of its quarterly performance drivers. One report claimed trading-desk revenue had hit a record on elevated market volatility, pointing to a strong quarter for the markets business. A separate outlet claimed loan-loss provisions were rising on growing credit concerns across the consumer and commercial loan books, directly raising questions about overall earnings quality. A brokerage cited JPMorgan's \"diversified revenue base\" as a structural strength, even as another analyst flagged \"credit risk building\" as a trend worth monitoring closely. JPMorgan made no official comment. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "Trading revenue is even stronger than the optimistic report suggests, and the loan-loss provisions being flagged are actually being front-loaded conservatively by management as a precaution, overstating the actual underlying credit risk. Combined with the record trading quarter, overall earnings quality looks stronger than the mixed public coverage suggests. Expect a positive surprise when JPMorgan Chase re-enters the public board."
  },
  {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    ticker: 'GS',
    category: 'Banking & NBFC',
    returnPercent: -20,
    openingBidPrice: 15000,
    displayNews: "Goldman Sachs saw choppy trading this week following a burst of dueling reports on its two core business lines. One report claimed the investment-banking deal pipeline was recovering strongly, pointing to a pickup in M&A advisory mandates. A separate outlet claimed trading revenue was set to disappoint on an unusually slow quarter for market-making activity, directly offsetting the investment-banking optimism. A brokerage cited an \"M&A pipeline rebound\" as the more important driver heading into the next reporting cycle, even as another analyst flagged \"trading revenue softness\" as a bigger near-term drag. Goldman Sachs made no official comment. Volumes ran above average, sentiment split evenly on the floor.",
    insiderNews: "The deal-pipeline recovery is overstated — several large deals characterized as \"in the pipeline\" have quietly stalled internally, undisclosed publicly. Trading revenue softness is also worse than what the bearish analyst assumed. With both weaker than reported, the setup looks more negative than the mixed public coverage currently reflects. Expect a negative correction when Goldman Sachs re-enters the public board."
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

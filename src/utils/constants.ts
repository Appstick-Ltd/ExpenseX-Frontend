export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#tour' },
  { label: 'Features', href: '#features' },
  { label: 'AI Engine', href: '#ai-engine' },
  { label: 'Intelligence', href: '#safe-to-spend' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Privacy', href: '#privacy' },
];

export const HERO_DATA = {
  eyebrow: 'YOUR PERSONAL FINANCE COMPANION',
  headlinePart1: 'Track less.',
  headlinePart2: 'Know more.',
  typewriterPrefix: 'Your money, understood.',
  typewriterStrings: [
    'Spend more consciously.',
    'Capture automatically.',
    'Understand intelligently.',
    'Build better habits.',
    'Voice. Receipts. SMS. Email.',
  ],
  descriptionPrimary: "You don't have to track every expense. ExpenseX AI does it for you.",
  descriptionSecondary: 'Capture transactions through voice, receipts, SMS, email or manual entry — then let AI organize and understand your financial life.',
  ctaPrimary: 'Download ExpenseX AI',
  ctaSecondary: 'Take a Quick Tour →',
  availability: 'Available on iOS and Android',
};

export const PHONE_MOCKUP_DATA = {
  greeting: 'Good morning',
  userName: 'Alex',
  healthScore: 78,
  healthMax: 100,
  safeToSpend: '$18,500',
  totalBalance: '$63,500',
  income: '$45,000',
  expenses: '$26,500',
  aiInsight: "You're spending 8% less than your weekly target.",
  recentTransactions: [
    { merchant: 'Sweetgreen', category: 'Food & Dining', amount: '-$45', date: 'Yesterday', icon: 'utensils' },
    { merchant: 'Uber', category: 'Transportation', amount: '-$32', date: 'Yesterday', icon: 'car' },
    { merchant: 'Salary Deposit', category: 'Income', amount: '+$3,500', date: 'Sep 01', icon: 'arrow-down-left' },
  ],
};

export const TOUR_STEPS = [
  {
    id: '01',
    tab: '01 Capture',
    headline: 'Just speak.\nExpenseX understands.',
    description: 'Tell ExpenseX AI about an expense in your own words. AI extracts the important details automatically without manual typing.',
    type: 'voice',
  },
  {
    id: '02',
    tab: '02 Organize',
    headline: 'From raw data\nto clean transactions.',
    description: 'Messy bank statements and obscure merchant codes are instantly transformed into clear, categorized financial records.',
    type: 'organize',
  },
  {
    id: '03',
    tab: '03 Understand',
    headline: "Don't just see numbers.\nUnderstand them.",
    description: 'Real-time financial health scoring, automated cashflow breakdown, and conversational insights into where your money actually goes.',
    type: 'understand',
  },
  {
    id: '04',
    tab: '04 Predict',
    headline: "Know what's coming\nbefore it happens.",
    description: 'Forecast upcoming recurring bills, anticipated income, and potential deficit alerts days in advance.',
    isComingSoon: true,
    type: 'predict',
  },
  {
    id: '05',
    tab: '05 Improve',
    headline: 'Better habits.\nBetter decisions.',
    description: 'AI-guided spending caps, smart savings allocations, and continuous coaching that helps your net worth grow effortlessly.',
    type: 'improve',
  },
];

export const CAPTURE_CHANNELS = [
  {
    id: 'receipt',
    title: 'Receipt Scan',
    badge: 'AI Vision OCR',
    subtitle: 'Point camera at any paper or digital invoice',
    sample: {
      merchant: 'Whole Foods Market',
      amount: '$384',
      date: 'Today, 2:15 PM',
      category: 'Groceries',
      confidence: '99.4%',
    },
  },
  {
    id: 'sms',
    title: 'SMS Detection',
    badge: 'Bank Alert Parser',
    subtitle: 'Automatically detects incoming bank debit texts',
    sample: {
      rawText: 'Alert: $245 debited for POS purchase at Target Superstore. Avl Bal: $3,210',
      detectedMerchant: 'Target',
      category: 'Shopping',
      amount: '$245',
    },
  },
  {
    id: 'email',
    title: 'Email Detection',
    badge: 'Digital Invoices',
    subtitle: 'Syncs digital receipts from food delivery, rides, and e-commerce',
    sample: {
      subject: 'Payment Confirmation: Amazon Order #84910',
      status: 'Order payment of $520 successful',
      detectedMerchant: 'Amazon',
      category: 'Shopping',
      amount: '$520',
    },
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp AI Bot',
    badge: 'Chatbot Sync',
    subtitle: 'Forward paper bills, voice notes, or text casual expenses in WhatsApp',
    sample: {
      userMessage: 'Paid $85 for fuel at Shell Station ⛽',
      botResponse: '✓ Logged: $85 under Fuel & Transport',
      category: 'Fuel & Transport',
      amount: '$85',
    },
  },
];

export const AI_PIPELINE_STAGES = [
  { step: '01', name: 'Raw Signals', desc: 'Voice, Receipt, SMS, Email, WhatsApp' },
  { step: '02', name: 'AI Extraction', desc: 'Tokenize text & structured entities' },
  { step: '03', name: 'Categorize', desc: 'Predict taxonomy across 45+ categories' },
  { step: '04', name: 'Recognize', desc: 'Resolve messy merchant descriptors' },
  { step: '05', name: 'Deduplicate', desc: 'Prevent multi-channel double-counting' },
  { step: '06', name: 'Financial Intel', desc: 'Synthesize Safe to Spend & Insights' },
];

export const RAW_MERCHANT_EXAMPLES = [
  { raw: 'AMZN Mktp US*892019', clean: 'Amazon', category: 'Shopping', amount: '$520' },
  { raw: 'SWTG*SOHO NYC 02', clean: 'Sweetgreen Salad', category: 'Food & Dining', amount: '$45' },
  { raw: 'UBR* PENDING TRIP CARD', clean: 'Uber Ride', category: 'Transportation', amount: '$32' },
];

export const SAFE_TO_SPEND_DATA = {
  amount: '$18,500',
  headline: "Balance isn't\nthe whole story.",
  description: 'Traditional apps show your current bank balance. ExpenseX AI calculates your true Safe to Spend margin by factoring upcoming bills, scheduled rent, savings goals, and everyday recurring expenses.',
  breakdown: [
    { label: 'Bank Balance', value: '$63,500', type: 'positive' },
    { label: 'Upcoming Rent & Bills', value: '-$22,000', type: 'negative' },
    { label: 'Savings Goal Allocation', value: '-$15,000', type: 'negative' },
    { label: 'Committed Budgets', value: '-$8,000', type: 'negative' },
    { label: 'True Safe to Spend', value: '$18,500', type: 'highlight' },
  ],
};

export const AI_INSIGHTS_DATA = [
  {
    title: 'Food & Dining Surge',
    stat: '↑ 18% vs Last Month',
    why: 'Weekend dining at Sweetgreen and Nobu exceeded average limits by $230.',
    action: 'Suggestion: Keep weekend dining under $200 to maintain your vacation savings target.',
    severity: 'warning',
  },
  {
    title: 'Subscription Optimization',
    stat: '$220/mo Unused',
    why: 'You have 3 entertainment streaming subscriptions active, but only accessed 1 during August.',
    action: 'Suggestion: Pause unused services to save $140 monthly.',
    severity: 'positive',
  },
  {
    title: 'Weekly Pacing',
    stat: '8% Below Target',
    why: 'Great discipline on transportation and daily grocery spend this week.',
    action: 'You are on track to unlock your $1,000 bonus savings milestone.',
    severity: 'highlight',
  },
];

export const ASK_EXPENSEX_SAMPLES = [
  {
    question: 'How much did I spend on food this month?',
    answer: 'You spent $842 on food this month — 12% more than last month. $512 was spent on dining out during weekends, while groceries accounted for $330.',
  },
  {
    question: 'Where did most of my money go?',
    answer: 'Your top 3 spending categories this month are: Housing & Utilities ($2,200 / 46%), Food & Dining ($842 / 18%), and Shopping ($610 / 13%).',
  },
  {
    question: 'Why did my spending increase?',
    answer: 'Your spending rose by $480 mainly due to two unplanned electronics purchases on Amazon ($320) and three additional restaurant outings with friends ($160).',
  },
  {
    question: 'How can I save $1,000 next month?',
    answer: 'Based on your transaction habits, you can comfortably save $1,000 by capping weekend dining at $150/week (saves $400), switching to off-peak Uber rides (saves $180), and pausing 2 subscriptions (saves $220).',
  },
  {
    question: 'Can I afford a $900 phone?',
    answer: 'If purchased with 6-month installment at $150/month, your Safe to Spend margin will drop from $1,850 to $350. It is recommended to wait until November when your bonus arrives.',
  },
];

export const BUDGETS_DATA = [
  { category: 'Food & Dining', spent: 320, limit: 500, percentage: 64, icon: 'utensils' },
  { category: 'Transportation', spent: 140, limit: 300, percentage: 46, icon: 'car' },
  { category: 'Shopping', spent: 240, limit: 500, percentage: 48, icon: 'shopping-bag' },
  { category: 'Bills & Utilities', spent: 420, limit: 600, percentage: 70, icon: 'zap' },
];

export const SAVINGS_GOALS_DATA = [
  {
    title: 'Dream Vacation',
    target: '$5,000',
    saved: '$1,800',
    percentage: 36,
    monthlyTarget: '$533',
    deadline: 'December 2026',
  },
  {
    title: 'Emergency Reserve',
    target: '$12,000',
    saved: '$8,500',
    percentage: 71,
    monthlyTarget: '$1,000',
    deadline: 'Ongoing',
  },
];

export const PRIVACY_POINTS = [
  {
    title: 'Explicit Permissions',
    desc: 'Nothing is tracked without your direct consent. You choose whether SMS, Email, or Voice capture is activated.',
  },
  {
    title: 'Granular Access Control',
    desc: 'Connect or disconnect your email and bank SMS feeds anytime with a single toggle. Revocable in 1 click.',
  },
  {
    title: 'Zero Ad-Tracking or Selling',
    desc: 'Your financial information is never monetized, indexed for ad networks, or shared with third-party brokers.',
  },
  {
    title: 'Complete Data Export & Deletion',
    desc: 'Export your clean transactions to CSV/JSON anytime. Delete your account and all associated data permanently with zero retention.',
  },
];

export const ROADMAP_PHASES = [
  {
    phase: 'PHASE 1',
    title: 'AI Capture Foundation',
    status: 'LIVE',
    isLive: true,
    items: [
      'Voice Natural Language Capture',
      'Receipt Vision OCR Scan',
      'SMS Alert Transaction Parser',
      'Email Digital Invoice Sync',
      'Intelligent Categorization',
      'Merchant Resolution Engine',
      'Cross-Channel Duplicate Detection',
      'Confirmation & Review Queue',
    ],
  },
  {
    phase: 'PHASE 2',
    title: 'Intelligent Finance',
    status: 'COMING SOON',
    isLive: false,
    items: [
      'Ask ExpenseX Conversational AI',
      'Dynamic Financial Health Index',
      'Predictive Safe to Spend Margin',
      'Daily AI Morning Briefing',
      'Monthly Retrospective Review',
      '30-Day Cash Flow Forecast',
      'AI Autonomous Goal Planner',
      '"Can I Afford It?" Simulator',
    ],
  },
  {
    phase: 'PHASE 3',
    title: 'Growth & Social Finance',
    status: 'COMING SOON',
    isLive: false,
    items: [
      'Annual Money Wrapped Visualizer',
      'Savings & Budget Challenges',
      'Financial Wellness Badges',
      'Shareable Milestone Reports',
      'Peer Referral Rewards',
      'Deep AI Expense Audit',
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How does ExpenseX AI differ from standard expense tracker apps?',
    answer: 'Standard apps require tedious manual logging for every coffee, groceries, and taxi ride. ExpenseX AI automatically captures transactions through natural speech ("I spent 450 at Chillox"), receipt photos, SMS alerts, and digital invoice emails. AI categorizes them, detects duplicates, and explains your finances instead of just showing static charts.',
  },
  {
    question: 'Is my financial data secure?',
    answer: 'Absolutely. We practice strict zero-knowledge encryption in transit and at rest. We never sell your data to marketers or advertisers. You have complete control to connect, disconnect, export, or permanently wipe your account and history whenever you want.',
  },
  {
    question: 'What happens if I receive both an SMS and an email for the same purchase?',
    answer: 'ExpenseX AI includes a built-in cross-channel Deduplication Engine. When an SMS alert and email receipt describe the same transaction within the same timeframe and amount, they are automatically merged into a single consolidated transaction.',
  },
  {
    question: 'Can I still enter cash expenses manually?',
    answer: 'Yes! While automation is our core differentiator, our ultra-fast Quick Add widget lets you record manual cash transactions in under 3 seconds with preset category tags.',
  },
];

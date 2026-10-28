import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles/globals.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ToasterProvider } from './components/common/ToasterProvider';

export const metadata: Metadata = {
  title: 'ExpenseX AI — Your AI Money Assistant | Track Expenses Without Typing',
  description:
    'Your money should explain itself. ExpenseX is your AI Money Assistant that automatically tracks expenses from voice, receipts, SMS, and email without manual typing.',
  keywords: [
    'expense',
    'expenses',
    'expense tracker',
    'AI expense tracker',
    'automatic expense tracker',
    'best expense tracker',
    'smart expense tracker',
    'free expense tracker app',
    'daily expense manager',
    'personal expense tracker',
    'expense manager app',
    'ExpenseX',
    'ExpenseX AI',
  ],
  authors: [{ name: 'ExpenseX AI Team' }],
  metadataBase: new URL('https://expensexai.com'),
  alternates: {
    canonical: 'https://expensexai.com/',
  },
  openGraph: {
    type: 'website',
    url: 'https://expensexai.com/',
    siteName: 'ExpenseX AI',
    locale: 'en_US',
    title: 'ExpenseX AI — Your AI Money Assistant',
    description:
      'Your money should explain itself. ExpenseX uses AI to track your expenses from voice, receipts, SMS, and email without manual typing.',
    images: [
      {
        url: 'https://expensexai.com/logo-512.png',
        width: 512,
        height: 512,
        alt: 'ExpenseX AI Logo — Your AI Money Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ExpenseX_AI',
    creator: '@ExpenseX_AI',
    title: 'ExpenseX AI — Your AI Money Assistant',
    description:
      'Your money should explain itself. ExpenseX uses AI to track your expenses from voice, receipts, SMS, and email without manual typing.',
    images: ['https://expensexai.com/logo-512.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/logo-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/logo-192.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

const jsonLdSoftwareApp = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ExpenseX AI',
  alternateName: [
    'Expense',
    'Expenses',
    'Expense AI',
    'Expense Tracker',
    'Expense Tracker App',
    'AI Expense Tracker',
    'Smart Expense Tracker',
    'Daily Expense Tracker',
    'Personal Expense Tracker',
    'Expense Manager',
    'Expense Manager App',
    'ExpenseX',
  ],
  applicationCategory: 'FinanceApplication',
  applicationSubCategory: 'Expense Tracker, Budgeting, Personal Finance',
  operatingSystem: 'Android, Web',
  softwareVersion: '2.4.0',
  description:
    'Your money should explain itself. ExpenseX AI is your AI Money Assistant. It eliminates manual expense logging via natural voice capture, receipt vision OCR, bank SMS auto-parsing, and digital email invoices.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'Instant Receipt OCR Scanning',
    'Automated Bank SMS Detection',
    'Hands-Free Voice Expense Logging',
    'WhatsApp AI Bot Tracking',
    'Safe-to-Spend Daily Predictive Limit',
    'Dynamic Envelope Budgeting',
    'Autonomous Multi-Goal Savings',
    'Enterprise AES-256 KMS Cloud Encryption',
  ],
  screenshot: 'https://expensexai.com/logo-512.png',
  image: 'https://expensexai.com/logo-512.png',
};

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ExpenseX AI',
  legalName: 'Appstick',
  url: 'https://expensexai.com/',
  logo: 'https://expensexai.com/logo-512.png',
  foundingLocation: {
    '@type': 'Place',
    name: 'Khulna, Bangladesh',
  },
  founder: {
    '@type': 'Person',
    name: 'Md. Riaz Mahmud',
    jobTitle: 'Founder & CEO',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '50, KDA Outer Bypass Rd',
    addressLocality: 'Khulna',
    postalCode: '9100',
    addressCountry: 'BD',
  },
  sameAs: [
    'https://twitter.com/ExpenseX_AI',
    'https://github.com/ExpenseX-AI',
    'https://linkedin.com/company/expensex-ai',
    'https://appstick.com.bd/',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Corporate Inquiries',
      email: 'info@expensexai.com',
      telephone: '+880 1404-049797',
      availableLanguage: ['English', 'Bengali'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@expensexai.com',
      telephone: '+880 1404-049797',
      availableLanguage: ['English', 'Bengali'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Privacy & Data Protection',
      email: 'privacy@expensexai.com',
      availableLanguage: ['English', 'Bengali'],
    },
  ],
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ExpenseX AI and how does it track expenses automatically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ExpenseX AI is an autonomous personal finance platform developed by Appstick. It captures and categorizes transactions across camera receipt scans, bank SMS transaction alerts, natural language voice memos, and digital email invoices—eliminating manual typing friction.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does ExpenseX AI compare to traditional manual expense trackers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional expense trackers require you to manually enter merchant names, amounts, dates, and categories. ExpenseX AI automates this workflow: our multi-modal vision and NLP pipeline extracts merchant data, taxes, currencies, and line items from receipts, audio, and messages without tedious form typing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Safe-to-Spend algorithm work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Safe-to-Spend is a predictive financial guidance metric calculated by ExpenseX AI. It projects recurring bills, active savings goal commitments, and typical spending velocity to give you a clear daily spending ceiling to prevent overdrafts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my financial data secure and private with ExpenseX AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Security and data privacy are foundational at ExpenseX AI. All data in transit and at rest is protected with enterprise AES-256 encryption via Google Cloud Key Management Service (KMS). Multi-modal processing occurs in isolated cloud environments: we never sell your data, never broker transaction history to advertisers, and your personal financial information is never used to train public foundation models.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which platforms and operating systems are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ExpenseX AI is designed for iOS, Android, and modern desktop web browsers. Categorized transactions and budgets synchronize across all authorized devices in the beta cohort.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ToasterProvider />
        {/* Accessible Static Crawler Fallback (safe from React hydration mismatch) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 840px; margin: 40px auto; padding: 24px; line-height: 1.6; color: #1e293b; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <h1 style="color: #0f172a; margin-bottom: 8px;">ExpenseX AI — Autonomous Personal Finance &amp; Expense Manager</h1>
  <p style="font-size: 15px; color: #475569; margin-bottom: 16px;">
    <strong>Company:</strong> Appstick &bull; 
    <strong>Founder &amp; CEO:</strong> Md. Riaz Mahmud &bull; 
    <strong>Headquarters:</strong> 50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh
  </p>
  <p style="font-size: 14px; color: #334155;">
    <strong>Official Website:</strong> <a href="https://expensexai.com/">https://expensexai.com/</a> | 
    <strong>Corporate Inquiries:</strong> <a href="mailto:info@expensexai.com">info@expensexai.com</a> | 
    <strong>Customer Support:</strong> <a href="mailto:support@expensexai.com">support@expensexai.com</a> | 
    <strong>Privacy Office:</strong> <a href="mailto:privacy@expensexai.com">privacy@expensexai.com</a> | 
    <strong>Phone:</strong> +880 1404-049797
  </p>
  <div style="padding: 12px 16px; background: #f8fafc; border-left: 4px solid #6366f1; margin: 16px 0; border-radius: 4px; font-size: 13.5px; color: #334155;">
    <strong>Product Status Note:</strong> ExpenseX AI is currently live in production across Android and Web. All balances, spending metrics, and transaction ledgers presented on this website represent <em>illustrative demo data</em> for preview purposes.
  </div>
  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
  <h2 style="color: #0f172a; font-size: 20px;">About ExpenseX AI</h2>
  <p>ExpenseX AI is an AI-powered personal finance platform developed and operated by Appstick to eliminate manual expense logging. The platform uses multi-modal machine intelligence to automatically capture, organize, and analyze spending across Android and Web platforms.</p>
  <h2 style="color: #0f172a; font-size: 20px;">Feature Availability Status</h2>
  <ul style="padding-left: 20px;">
    <li><strong>Available Now (Live in Production):</strong> Multi-Modal Vision OCR Receipt Capture, Voice Expense Entry, Bank SMS Transaction Parsing (Android), Dynamic Envelope Budgeting, Safe-to-Spend Computation, Smart Categorization, Deduplication Engine.</li>
    <li><strong>In Development:</strong> WhatsApp AI Assistant Bot, Email Invoice Sync, Conversational AI Money Assistant.</li>
    <li><strong>Coming Soon:</strong> 30-Day Predictive Cashflow Forecasting, Autonomous Financial Wrapped.</li>
  </ul>
  <h2 style="color: #0f172a; font-size: 20px;">Enterprise Security &amp; Cloud Privacy</h2>
  <p>User privacy is protected through hardware-backed AES-256 cloud KMS encryption in transit and at rest. Multi-modal intelligence is hosted in isolated Google Cloud VPC environments. Under our enterprise data policy, customer financial data is never sold, never shared with third-party advertisers, and never used to train public foundation models.</p>
  <h2 style="color: #0f172a; font-size: 20px;">Public Pages &amp; Verification Links</h2>
  <ul style="padding-left: 20px;">
    <li><a href="/about">About Us &amp; Company Overview</a></li>
    <li><a href="/pricing">Pricing &amp; Plans</a></li>
    <li><a href="/privacy-policy">Privacy Policy &amp; Data Rights</a></li>
    <li><a href="/terms-of-service">Terms of Service</a></li>
    <li><a href="/contact">Official Contact Information</a></li>
  </ul>
  <p style="font-size: 13px; color: #64748b; margin-top: 24px;">Note: JavaScript is recommended to experience the full interactive 3D web application.</p>
</div>`,
          }}
        />
        <div id="root" suppressHydrationWarning>{children}</div>
      </body>
    </html>
  );
}

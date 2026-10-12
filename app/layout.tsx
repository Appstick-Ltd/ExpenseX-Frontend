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
  operatingSystem: 'iOS, Android, Web',
  softwareVersion: '2.4.0',
  description:
    'Your money should explain itself. ExpenseX AI is your AI Money Assistant. It eliminates manual expense logging via natural voice capture, receipt vision OCR, bank SMS auto-parsing, and digital email invoices.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5.0',
    worstRating: '1.0',
    ratingCount: '1280',
    reviewCount: '940',
  },
  featureList: [
    'Instant Receipt OCR Scanning',
    'Automated Bank SMS Detection',
    'Hands-Free Voice Expense Logging',
    'WhatsApp AI Bot Tracking',
    'Safe-to-Spend Daily Predictive Limit',
    'Dynamic Envelope Budgeting',
    'Autonomous Multi-Goal Savings',
    'Zero-Knowledge Financial Data Privacy',
  ],
  screenshot: 'https://expensexai.com/logo-512.png',
  image: 'https://expensexai.com/logo-512.png',
};

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ExpenseX AI',
  url: 'https://expensexai.com/',
  logo: 'https://expensexai.com/logo-512.png',
  sameAs: [
    'https://twitter.com/ExpenseX_AI',
    'https://github.com/ExpenseX-AI',
    'https://linkedin.com/company/expensex-ai',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@expensex.ai',
    availableLanguage: ['English'],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
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
      </head>
      <body>
        <ToasterProvider />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

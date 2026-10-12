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
  legalName: 'Appstick Ltd.',
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
      telephone: '+8801404049797',
      availableLanguage: ['English', 'Bengali'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@expensexai.com',
      availableLanguage: ['English', 'Bengali'],
    },
  ],
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
        {/* Accessible Static Crawler Fallback */}
        <noscript>
          <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", maxWidth: '840px', margin: '40px auto', padding: '24px', lineHeight: 1.6, color: '#1e293b', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h1 style={{ color: '#0f172a', marginBottom: '8px' }}>ExpenseX AI — Autonomous Personal Finance &amp; Expense Manager</h1>
            <p style={{ fontSize: '15px', color: '#475569', marginBottom: '16px' }}>
              <strong>Company:</strong> Appstick Ltd. &bull; 
              <strong>Founder &amp; CEO:</strong> Md. Riaz Mahmud &bull; 
              <strong>Headquarters:</strong> 50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh
            </p>
            <p style={{ fontSize: '14px', color: '#334155' }}>
              <strong>Official Website:</strong> <a href="https://expensexai.com/">https://expensexai.com/</a> | 
              <strong>Contact Email:</strong> <a href="mailto:info@expensexai.com">info@expensexai.com</a> | 
              <strong>Support:</strong> <a href="mailto:support@expensexai.com">support@expensexai.com</a> | 
              <strong>Phone:</strong> +880 1404-049797
            </p>
            <hr style={{ border: 0, borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />
            
            <h2 style={{ color: '#0f172a', fontSize: '20px' }}>About ExpenseX AI</h2>
            <p>ExpenseX AI is an AI-first personal finance platform developed by Appstick Ltd. to eliminate manual expense logging. The application leverages multi-modal machine intelligence to automatically capture, organize, and analyze spending across iOS, Android, and Web platforms.</p>
            
            <h2 style={{ color: '#0f172a', fontSize: '20px' }}>AI Architecture &amp; Key Features</h2>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>AI Vision OCR Receipt Scanning:</strong> Multi-modal document processing capable of reading crumpled receipts and digital invoices in &lt;140ms with 99.4% accuracy.</li>
              <li><strong>Voice Expense Capture:</strong> Natural language voice entry that automatically parses merchant, amount, category, and timestamps without typing.</li>
              <li><strong>Bank SMS &amp; Digital Invoice Parsing:</strong> Contextual processing of transaction alerts and email receipts with intelligent deduplication.</li>
              <li><strong>Safe-to-Spend&trade; Predictive Intelligence:</strong> Real-time predictive cashflow velocity algorithms calculating safe daily spending limits.</li>
              <li><strong>Bank-Grade Zero-Knowledge Privacy:</strong> AES-256 field encryption. User financial records are never sold or used to train public foundation models.</li>
            </ul>

            <h2 style={{ color: '#0f172a', fontSize: '20px' }}>Public Pages &amp; Verification Links</h2>
            <ul style={{ paddingLeft: '20px' }}>
              <li><a href="/about">About Us &amp; Company Overview</a></li>
              <li><a href="/pricing">Pricing &amp; Early-Bird Beta Plans</a></li>
              <li><a href="/privacy-policy">Privacy Policy &amp; Data Rights</a></li>
              <li><a href="/terms-of-service">Terms of Service</a></li>
              <li><a href="/contact">Official Contact Information</a></li>
            </ul>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '24px' }}>Note: JavaScript is recommended to experience the full interactive 3D web application.</p>
          </div>
        </noscript>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

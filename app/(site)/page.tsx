import React from 'react';
import PageClient from './pageClient';

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
  operatingSystem: 'Android',
  softwareVersion: '2.4.0',
  description:
    'Your money should explain itself. ExpenseX AI is your AI Money Assistant. It eliminates manual expense logging via natural voice capture, receipt vision OCR, and automated bank SMS parsing.',
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
    'Safe-to-Spend Daily Predictive Limit',
    'Dynamic Envelope Budgeting',
    'Autonomous Multi-Goal Savings',
    'Enterprise AES-256 KMS Cloud Encryption',
  ],
  screenshot: 'https://expensexai.com/logo-512.png',
  image: 'https://expensexai.com/logo-512.png',
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
        text: 'ExpenseX AI is an intelligent personal finance platform developed by Appstick. It captures and categorizes transactions across camera receipt scans, bank SMS transaction alerts (Android), and natural language voice memos—eliminating manual typing friction.',
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
        text: 'ExpenseX AI is officially available for download on the Google Play Store for Android devices. iOS availability on the Apple App Store is currently in progress.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <PageClient />
    </>
  );
}

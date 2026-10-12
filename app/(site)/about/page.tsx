import type { Metadata } from 'next';
import AboutView from '../../components/site/AboutView';

export const metadata: Metadata = {
  title: 'About ExpenseX AI — Autonomous Personal Finance by Appstick',
  description:
    'ExpenseX AI is an AI-first personal finance platform developed by Appstick to eliminate manual expense logging through multi-modal machine intelligence.',
  alternates: {
    canonical: 'https://expensexai.com/about',
  },
};

export default function AboutPage() {
  return <AboutView />;
}

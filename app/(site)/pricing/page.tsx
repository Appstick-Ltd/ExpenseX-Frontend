import type { Metadata } from 'next';
import PricingView from '../../components/site/PricingView';

export const metadata: Metadata = {
  title: 'Transparent Pricing & Plans — ExpenseX AI',
  description:
    'Explore ExpenseX AI transparent plans. Start free with automated receipt scanning and core finance tracking with zero hidden fees.',
  alternates: {
    canonical: 'https://expensexai.com/pricing',
  },
};

export default function PricingPage() {
  return <PricingView />;
}

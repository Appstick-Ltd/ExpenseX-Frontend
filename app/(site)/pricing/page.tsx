import type { Metadata } from 'next';
import PricingView from '../../components/site/PricingView';

export const metadata: Metadata = {
  title: 'Transparent Plans & Beta Access — ExpenseX AI',
  description:
    'Explore ExpenseX AI transparent early bird and beta plans. 100% free lifetime grandfathered perks for early adopters with zero hidden fees.',
  alternates: {
    canonical: 'https://expensexai.com/pricing',
  },
};

export default function PricingPage() {
  return <PricingView />;
}

import type { Metadata } from 'next';
import TermsView from '../../components/site/TermsView';

export const metadata: Metadata = {
  title: 'Terms of Service — ExpenseX AI & Appstick Ltd.',
  description:
    'Terms of service, usage license, and legal operating agreement between users and Appstick Ltd. for ExpenseX AI.',
  alternates: {
    canonical: 'https://expensexai.com/terms-of-service',
  },
};

export default function TermsServicePage() {
  return <TermsView />;
}

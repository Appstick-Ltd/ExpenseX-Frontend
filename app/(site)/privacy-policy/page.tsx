import type { Metadata } from 'next';
import PrivacyPolicyView from '../../components/site/PrivacyPolicyView';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Rights — ExpenseX AI & Appstick Ltd.',
  description:
    'ExpenseX AI zero-knowledge privacy policy, AES-256 cloud encryption, and user data rights. Operating by Appstick Ltd.',
  alternates: {
    canonical: 'https://expensexai.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}

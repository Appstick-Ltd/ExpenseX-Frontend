import type { Metadata } from 'next';
import PrivacyPolicyView from '../../components/site/PrivacyPolicyView';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Rights — ExpenseX AI & Appstick Ltd.',
  description:
    'ExpenseX AI enterprise cloud privacy policy, AES-256 KMS encryption, and user data rights. Developed and operated by Appstick Ltd.',
  alternates: {
    canonical: 'https://expensexai.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}

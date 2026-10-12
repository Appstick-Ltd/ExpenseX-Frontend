import type { Metadata } from 'next';
import PrivacyPolicyView from '../../components/site/PrivacyPolicyView';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Rights — ExpenseX AI & Appstick',
  description:
    'ExpenseX AI enterprise cloud privacy policy, AES-256 KMS encryption, and user data rights. Developed and operated by Appstick',
  alternates: {
    canonical: 'https://expensexai.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}

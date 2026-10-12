import type { Metadata } from 'next';
import ContactView from '../../components/site/ContactView';

export const metadata: Metadata = {
  title: 'Official Contact Channels — ExpenseX AI & Appstick Ltd.',
  description:
    'Get in touch with the ExpenseX AI engineering team and Appstick Ltd. leadership. Email, WhatsApp, and Khulna office contact details.',
  alternates: {
    canonical: 'https://expensexai.com/contact',
  },
};

export default function ContactPage() {
  return <ContactView />;
}

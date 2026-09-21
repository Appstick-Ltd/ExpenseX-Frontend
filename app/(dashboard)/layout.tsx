import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { PortalAuthProvider } from '../context/PortalAuthContext';
import '../../styles/portal.css';

export const metadata: Metadata = {
  title: 'ExpenseX Management Console — Superadmin Portal',
  description: 'Manage users, subscriptions, system categories, and platform analytics for ExpenseX AI.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PortalAuthProvider>
      {children}
    </PortalAuthProvider>
  );
}

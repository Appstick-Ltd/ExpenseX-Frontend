'use client';
import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToasterProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#0F172A',
          color: '#F8FAFC',
          fontSize: '13px',
          fontWeight: 500,
          borderRadius: '10px',
          padding: '12px 16px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
        error: {
          style: {
            background: '#FEF2F2',
            color: '#991B1B',
            border: '1px solid #FCA5A5',
            fontSize: '13px',
            fontWeight: 600,
          },
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FFFFFF',
          },
        },
        success: {
          style: {
            background: '#F0FDF4',
            color: '#166534',
            border: '1px solid #86EFAC',
            fontSize: '13px',
            fontWeight: 600,
          },
          iconTheme: {
            primary: '#10B981',
            secondary: '#FFFFFF',
          },
        },
      }}
    />
  );
};

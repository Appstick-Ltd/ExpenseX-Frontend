'use client';
import React from 'react';

export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#05070D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '3px solid rgba(109, 61, 245, 0.2)',
          borderTopColor: '#6D3DF5',
          borderRightColor: '#FF5A36',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span
        style={{
          fontSize: '14px',
          color: '#94A3B8',
          letterSpacing: '0.05em',
          fontFamily: "'Geist', 'Inter', sans-serif",
        }}
      >
        Loading ExpenseX...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

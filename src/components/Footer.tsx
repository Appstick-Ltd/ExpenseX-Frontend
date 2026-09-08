import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const footerLinks = [
    { label: 'Product', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#tour' },
    { label: 'AI Engine', href: '#ai-engine' },
    { label: 'Safe to Spend', href: '#safe-to-spend' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Support', href: '#support' },
  ];

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '60px 0 40px 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            marginBottom: '40px',
          }}
        >
          {/* Logo & Tagline */}
          <div>
            <Logo size="md" />
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>
              Track less. Know more.
            </p>
          </div>

          {/* Links */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            color: 'var(--text-muted)',
            gap: '16px',
          }}
        >
          <div>© 2026 ExpenseX AI. All rights reserved.</div>
          <div>Your Intelligent Personal Finance Companion.</div>
        </div>
      </div>
    </footer>
  );
};

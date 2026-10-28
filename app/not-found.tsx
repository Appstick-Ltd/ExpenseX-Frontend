'use client';
import Link from 'next/link';
import { Home, ArrowLeft, LayoutDashboard, Compass, HelpCircle } from 'lucide-react';
import { Logo } from './components/common/Logo';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#05070D',
        color: '#F8FAFC',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'space-between',
      }}
    >
      {/* Ambient background glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '450px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(109, 61, 245, 0.22) 0%, rgba(255, 90, 54, 0.08) 50%, transparent 80%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '400px',
          height: '350px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Header with Logo */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'rgba(5, 7, 13, 0.6)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo size="md" />
        </Link>
      </header>

      {/* Main Content Stage */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          textAlign: 'center',
        }}
      >
        {/* Glass Card Container */}
        <div
          style={{
            maxWidth: '580px',
            width: '100%',
            background: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: 'clamp(32px, 6vw, 56px) clamp(24px, 4vw, 48px)',
            boxShadow:
              '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(109, 61, 245, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Eyebrow Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(109, 61, 245, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#C084FC',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#FF5A36',
                boxShadow: '0 0 8px #FF5A36',
              }}
            />
            <span>404 • Signal Lost in Space</span>
          </div>

          {/* Huge Gradient 404 */}
          <div
            style={{
              fontSize: 'clamp(72px, 14vw, 120px)',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              background:
                'linear-gradient(135deg, #FFFFFF 20%, #A855F7 60%, #FF5A36 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
              userSelect: 'none',
              filter: 'drop-shadow(0 0 35px rgba(139, 92, 246, 0.3))',
            }}
          >
            404
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(22px, 4vw, 30px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              marginBottom: '12px',
              lineHeight: 1.25,
            }}
          >
            Page not found
          </h1>

          {/* Body description */}
          <p
            style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: '#94A3B8',
              lineHeight: 1.6,
              maxWidth: '440px',
              marginBottom: '36px',
            }}
          >
            The financial route you are looking for does not exist or has been shifted.
            Let&apos;s get you back on track.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6D3DF5 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(109, 61, 245, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              <Home size={16} />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#E2E8F0',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
              }}
            >
              <LayoutDashboard size={16} />
              <span>Go to Dashboard</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') window.history.back();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '12px',
                background: 'transparent',
                color: '#94A3B8',
                fontWeight: 500,
                fontSize: '14px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <ArrowLeft size={16} />
              <span>Go Back</span>
            </button>
          </div>
        </div>

        {/* Quick helpful links */}
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            fontSize: '13px',
            color: '#64748B',
          }}
        >
          <span>Need guidance?</span>
          <Link
            href="/"
            onClick={() => {
              try {
                sessionStorage.setItem('scroll_to_section', 'features');
              } catch {}
            }}
            style={{
              color: '#94A3B8',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Compass size={13} /> Features
          </Link>
          <Link
            href="/"
            onClick={() => {
              try {
                sessionStorage.setItem('scroll_to_section', 'faq');
              } catch {}
            }}
            style={{
              color: '#94A3B8',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <HelpCircle size={13} /> FAQ
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '20px 24px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#64748B',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        © {new Date().getFullYear()} ExpenseX AI. All rights reserved.
      </footer>
    </div>
  );
}

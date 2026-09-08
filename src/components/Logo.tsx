import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const iconDimensions = {
    sm: { w: 20, h: 26 },
    md: { w: 26, h: 34 },
    lg: { w: 34, h: 44 },
  }[size];

  return (
    <div className={`logo-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <div
        className="logo-mark"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 0 12px rgba(109, 61, 245, 0.45))',
        }}
      >
        <svg
          width={iconDimensions.w}
          height={iconDimensions.h}
          viewBox="0 0 28 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradBlade1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#6D3DF5" />
            </linearGradient>
            <linearGradient id="logoGradBlade2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A59" />
              <stop offset="100%" stopColor="#6D3DF5" />
            </linearGradient>
          </defs>
          <path
            d="M11.0282 18.0135L5.46135 8.89203C5.47388 8.87031 10.2348 8.92549 10.2208 8.94178C10.2074 8.95264 13.3539 14.2268 13.3539 14.2268C13.3539 14.2268 21.3944 1.14898 22.0496 0C21.285 1.08098 13.6486 11.9766 13.4166 12.3279L10.8137 7.939C10.8137 7.939 3.58522 7.84364 3.5938 7.84494C3.70368 8.11236 9.54676 17.6131 9.93332 18.2353L0 36L11.0282 18.0135Z"
            fill="url(#logoGradBlade1)"
          />
          <path
            d="M27.9992 0.0540897C28.0212 0.0540897 16.2823 19.2843 16.2823 19.2843C16.2823 19.2843 20.9852 27.1447 21.1063 27.3439C21.0982 27.3439 17.0214 27.4525 17.0225 27.4503C17.0225 27.4525 14.1216 22.8014 14.1246 22.7845C14.1209 22.7732 6.10327 35.9453 6.08811 35.9474C6.07668 35.9453 14.0655 25.3157 14.0875 25.3008C14.0937 25.2886 16.1458 28.9399 16.1671 28.953L24.0039 29.0218C23.9986 29.0218 18.2984 19.653 18.0795 19.2982C18.0879 19.3119 28.1021 0.0540897 27.9992 0.0540897Z"
            fill="url(#logoGradBlade2)"
          />
        </svg>
      </div>

      {showText && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              fontSize: size === 'sm' ? '17px' : size === 'md' ? '21px' : '28px',
            }}
          >
            Expense<span style={{ color: '#A78BFA' }}>X</span>
          </span>
          <span
            style={{
              fontSize: size === 'sm' ? '10px' : '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              padding: '2px 6px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.25), rgba(255, 90, 54, 0.2))',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              color: '#FFFFFF',
              boxShadow: '0 0 10px rgba(109, 61, 245, 0.3)',
            }}
          >
            AI
          </span>
        </div>
      )}
    </div>
  );
};

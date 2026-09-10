import React from 'react';
import logoImg from '../assets/logo.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '', onClick }) => {
  const iconDimensions = {
    sm: { height: 22, width: 29 },
    md: { height: 30, width: 39 },
    lg: { height: 42, width: 55 },
  }[size];

  return (
    <div
      className={`logo-container ${className}`}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'sm' ? '8px' : '10px',
        userSelect: 'none',
        cursor: onClick ? 'pointer' : 'inherit',
      }}
    >
      <div
        className="logo-mark"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 0 14px rgba(109, 61, 245, 0.45))',
          flexShrink: 0,
        }}
      >
        <img
          src={logoImg}
          alt="ExpenseX AI Logo"
          width={iconDimensions.width}
          height={iconDimensions.height}
          style={{
            width: `${iconDimensions.width}px`,
            height: `${iconDimensions.height}px`,
            objectFit: 'contain',
            display: 'block',
          }}
          loading="eager"
        />
      </div>

      {showText && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              fontSize: size === 'sm' ? '17px' : size === 'md' ? '21px' : '28px',
              lineHeight: 1,
            }}
          >
            ExpenseX
          </span>
          <span
            style={{
              fontSize: size === 'sm' ? '10px' : size === 'md' ? '11px' : '13px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              padding: '2px 6px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.25), rgba(255, 90, 54, 0.2))',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              color: '#FFFFFF',
              boxShadow: '0 0 10px rgba(109, 61, 245, 0.3)',
              lineHeight: 1.2,
            }}
          >
            AI
          </span>
        </div>
      )}
    </div>
  );
};


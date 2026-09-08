import React from 'react';
import Typewriter from 'typewriter-effect';
import { HERO_DATA } from '../utils/constants';

export const TypewriterText: React.FC = () => {
  return (
    <div
      className="typewriter-container"
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
        fontSize: 'clamp(17px, 2.2vw, 22px)',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        minHeight: '36px',
        marginBottom: '36px',
      }}
    >
      <span style={{ color: 'var(--text-muted)' }}>{HERO_DATA.typewriterPrefix}</span>
      <span
        style={{
          color: 'var(--purple-light)',
          fontWeight: 600,
          borderBottom: '1.5px solid rgba(139, 92, 246, 0.4)',
          paddingBottom: '2px',
        }}
      >
        <Typewriter
          options={{
            strings: HERO_DATA.typewriterStrings,
            autoStart: true,
            loop: true,
            delay: 45,
            deleteSpeed: 25,
          }}
        />
      </span>
    </div>
  );
};

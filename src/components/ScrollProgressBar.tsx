import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2.5px',
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <div
        style={{
          width: `${scrollProgress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #6D3DF5 0%, #A78BFA 60%, #FF5A36 100%)',
          boxShadow: '0 0 12px rgba(167, 139, 250, 0.8), 0 0 4px #FF5A36',
          transition: 'width 0.1s ease-out',
        }}
      />
    </div>
  );
};

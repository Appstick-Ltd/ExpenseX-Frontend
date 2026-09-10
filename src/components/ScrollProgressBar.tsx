import React, { useEffect, useRef } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0 && barRef.current) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

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
      }}
    >
      <div
        ref={barRef}
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, #6D3DF5 0%, #A78BFA 60%, #FF5A36 100%)',
          boxShadow: '0 0 12px rgba(167, 139, 250, 0.8), 0 0 4px #FF5A36',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

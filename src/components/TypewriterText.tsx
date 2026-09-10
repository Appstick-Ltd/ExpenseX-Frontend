import React from 'react';
import Typewriter from 'typewriter-effect';
import { HERO_DATA } from '../utils/constants';

export const TypewriterText: React.FC = () => {
  return (
    <>
      <div className="typewriter-hero-block">
        <span className="typewriter-prefix">{HERO_DATA.typewriterPrefix}</span>
        <span className="typewriter-dynamic-phrase">
          <Typewriter
            options={{
              strings: HERO_DATA.typewriterStrings,
              autoStart: true,
              loop: true,
              delay: 45,
              deleteSpeed: 25,
              cursor: '|',
            }}
          />
        </span>
      </div>

      <style>{`
        .typewriter-hero-block {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 24px;
          font-size: clamp(16px, 2.2vw, 21px);
          line-height: 1.4;
          min-height: 32px;
        }

        .typewriter-prefix {
          font-weight: 500;
          color: #94A3B8;
          letter-spacing: -0.01em;
        }

        .typewriter-dynamic-phrase {
          display: inline-block;
          font-weight: 600;
          color: #C084FC !important;
          -webkit-text-fill-color: #C084FC !important;
          text-shadow: 0 0 20px rgba(192, 132, 252, 0.35);
        }

        .typewriter-dynamic-phrase .Typewriter {
          display: inline;
        }

        .typewriter-dynamic-phrase .Typewriter__wrapper {
          color: #C084FC !important;
          -webkit-text-fill-color: #C084FC !important;
          font-weight: 600;
        }

        .typewriter-dynamic-phrase .Typewriter__cursor {
          color: #A855F7 !important;
          -webkit-text-fill-color: #A855F7 !important;
          font-weight: 300;
          margin-left: 2px;
          animation: blinkCursor 1s infinite;
        }

        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (max-width: 992px) {
          .typewriter-hero-block {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: 4px !important;
            margin-bottom: 16px !important;
            min-height: 52px !important;
          }
          .typewriter-prefix {
            font-size: 14.5px !important;
            color: #94A3B8 !important;
            line-height: 1.3 !important;
          }
          .typewriter-dynamic-phrase {
            font-size: 16px !important;
            font-weight: 700 !important;
            color: #C084FC !important;
            min-height: 24px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </>
  );
};

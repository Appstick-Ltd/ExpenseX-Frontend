import { Camera, MessageSquare, Mail, MessageCircle, Sparkles, Check } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';
import receiptOcrImg from '../assets/receipt_ai_ocr.jpg';

export const CaptureChannels: React.FC = () => {
  return (
    <section
      id="features"
      className="section-wrapper"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot" />
            <span>CAPTURE FROM ANYWHERE</span>
          </div>

          <h2 className="section-title">
            ExpenseX captures expenses <br />
            <span className="text-gradient">before you can forget them.</span>
          </h2>

          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Most people stop tracking because manual entry is friction. ExpenseX removes the friction entirely by capturing from the channels you already live in.
          </p>
        </div>

        {/* 4 Premium Cards Grid (Compact & Refined with 3D Tilt) */}
        <div
          className="capture-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Card 1: Receipt Scan */}
          <Card3DTilt
            className="glass-card capture-card"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '20px',
            }}
          >
            <div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(109, 61, 245, 0.15)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: 'var(--purple-light)',
                }}
              >
                <Camera size={22} />
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Receipt Scan</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                Snap a photo of grocery slips, dining bills, or handwritten tokens. AI vision digitizes line items instantly.
              </p>

              {/* Receipt Visualizer with scan line & real AI OCR image */}
              <div
                style={{
                  borderRadius: '14px',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
                  background: 'linear-gradient(135deg, #181c36 0%, #0d1024 100%)',
                  minHeight: '170px',
                }}
              >
                <img
                  src={receiptOcrImg}
                  alt="ExpenseX AI OCR Receipt Scan"
                  style={{
                    width: '100%',
                    height: '170px',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'contrast(1.05) brightness(0.95)',
                  }}
                />

                {/* Laser scan beam */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, #FF5A36, #8B5CF6, transparent)',
                    boxShadow: '0 0 14px #8B5CF6, 0 0 24px #FF5A36',
                    animation: 'scanLine 2.2s infinite ease-in-out',
                    zIndex: 2,
                  }}
                />

                {/* Micro HUD pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    right: '8px',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    background: 'rgba(5, 7, 13, 0.85)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '11px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Sweetgreen • $45</span>
                  <span style={{ color: '#34D399', fontWeight: 700 }}>99.4% OCR match</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--purple-light)', fontWeight: 600 }}>
              <Sparkles size={14} />
              <span>Multi-currency OCR</span>
            </div>
          </Card3DTilt>

          {/* Card 2: SMS Detection */}
          <Card3DTilt
            className="glass-card capture-card"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '20px',
            }}
          >
            <div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(52, 211, 153, 0.15)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: '#34D399',
                }}
              >
                <MessageSquare size={22} />
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>SMS Auto-Read</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                Bank & debit SMS alerts parsed in background on device. Zero data ever leaves your device unencrypted.
              </p>

              {/* SMS Bubble Mockup */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: '12px',
                  padding: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginBottom: '4px' }}>
                  BANK ALERTS • 14:32
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '8px' }}>
                  Debited $85.00 via VISA *4421 at SHELL OIL. Avail Bal: $4,210.
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '6px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '11px',
                  }}
                >
                  <span style={{ color: '#34D399', fontWeight: 600 }}>✓ Auto-categorized</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Fuel & Gas</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#34D399', fontWeight: 600 }}>
              <Check size={14} />
              <span>100% on-device parsing</span>
            </div>
          </Card3DTilt>

          {/* Card 3: Email Detection */}
          <Card3DTilt
            className="glass-card capture-card"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '20px',
            }}
          >
            <div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(255, 90, 54, 0.15)',
                  border: '1px solid rgba(255, 90, 54, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: '#FF7A59',
                }}
              >
                <Mail size={22} />
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Email Detection</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                Securely parses order confirmations from Uber, Amazon, DoorDash, and airlines.
              </p>

              {/* Email Mock */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: '12px',
                  padding: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ fontSize: '10px', color: '#FF9A7B', fontWeight: 700, marginBottom: '4px' }}>
                  PAYMENT CONFIRMATION
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '8px' }}>
                  Your order payment of $520 was successful.
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '6px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '11px',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>ExpenseX AI</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Amazon • $520</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#FF9A7B', fontWeight: 600 }}>
              <Check size={14} />
              <span>Read-only invoice parsing</span>
            </div>
          </Card3DTilt>

          {/* Card 4: WhatsApp AI Bot */}
          <Card3DTilt
            className="glass-card capture-card"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '20px',
            }}
          >
            <div>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: '#25D366',
                }}
              >
                <MessageCircle size={22} />
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>WhatsApp AI Bot</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                Forward paper bills, drop voice notes, or text casual expenses directly in WhatsApp without opening the app.
              </p>

              {/* WhatsApp Chat Simulation Mock */}
              <div
                style={{
                  background: 'rgba(5, 7, 13, 0.85)',
                  borderRadius: '12px',
                  padding: '12px',
                  border: '1px solid rgba(37, 211, 102, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {/* User Message (Right) */}
                <div
                  style={{
                    alignSelf: 'flex-end',
                    background: 'rgba(37, 211, 102, 0.2)',
                    border: '1px solid rgba(37, 211, 102, 0.35)',
                    borderRadius: '10px 10px 2px 10px',
                    padding: '6px 10px',
                    maxWidth: '88%',
                  }}
                >
                  <div style={{ fontSize: '11px', color: '#E2E8F0', lineHeight: 1.3 }}>
                    Paid $85 for fuel at Shell Station ⛽
                  </div>
                  <div style={{ fontSize: '9px', color: '#86EFAC', textAlign: 'right', marginTop: '2px' }}>
                    2:45 PM • ✓✓
                  </div>
                </div>

                {/* Bot Response (Left) */}
                <div
                  style={{
                    alignSelf: 'flex-start',
                    background: 'rgba(109, 61, 245, 0.25)',
                    border: '1px solid rgba(139, 92, 246, 0.35)',
                    borderRadius: '10px 10px 10px 2px',
                    padding: '6px 10px',
                    maxWidth: '92%',
                  }}
                >
                  <div style={{ fontSize: '11px', color: '#A78BFA', fontWeight: 700, marginBottom: '2px' }}>
                    ✓ Logged: Fuel & Transport
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                    $85 recorded. Budget remaining: $345
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#25D366', fontWeight: 600 }}>
              <Sparkles size={14} />
              <span>Zero app opening needed</span>
            </div>
          </Card3DTilt>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .capture-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .capture-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .capture-card {
            padding: 20px 16px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

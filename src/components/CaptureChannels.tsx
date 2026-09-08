import { Camera, MessageSquare, Mail, MessageCircle, Sparkles, Check } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

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

          <h2 className="section-headline">
            Not just voice. <br />
            <span className="text-gradient-purple">Every financial signal, in one place.</span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto' }}>
            ExpenseX AI connects seamlessly across physical paper, bank SMS notifications, and digital receipts so zero transactions fall through the cracks.
          </p>
        </div>

        {/* 4 Premium Cards Grid (Compact & Refined with 3D Tilt) */}
        <div
          className="capture-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
        >
          {/* Card 1: Receipt Scan */}
          <Card3DTilt
            className="glass-card"
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
                }}
              >
                <img
                  src="/assets/image/receipt_ai_ocr.jpg"
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
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Chillox • ৳450</span>
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
            className="glass-card"
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

              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>SMS Detection</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                Understands bank & mobile financial service alerts (bKash, Nagad, City, SCB) on receipt.
              </p>

              {/* SMS Alert Mock */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: '12px',
                  padding: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ fontSize: '10px', color: '#34D399', fontWeight: 700, marginBottom: '4px' }}>
                  TRANSACTION ALERT
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '8px' }}>
                  ৳2,450 paid to Agora Superstore.
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
                  <span style={{ color: 'var(--text-muted)' }}>AI Detected</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Shopping • ৳2,450</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#34D399', fontWeight: 600 }}>
              <Check size={14} />
              <span>Real-time background sync</span>
            </div>
          </Card3DTilt>

          {/* Card 3: Email Detection */}
          <Card3DTilt
            className="glass-card"
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
                Securely parses order confirmations from Uber, Daraz, Pathao, Foodpanda, and airlines.
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
                  Your order payment of ৳5,200 was successful.
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
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Daraz • ৳5,200</span>
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
            className="glass-card"
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
                  background: 'rgba(15, 23, 42, 0.75)',
                  borderRadius: '12px',
                  padding: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {/* User Message (Right) */}
                <div
                  style={{
                    alignSelf: 'flex-end',
                    background: 'rgba(18, 140, 126, 0.35)',
                    border: '1px solid rgba(37, 211, 102, 0.35)',
                    borderRadius: '10px 10px 2px 10px',
                    padding: '6px 10px',
                    maxWidth: '88%',
                  }}
                >
                  <div style={{ fontSize: '11px', color: '#E2E8F0', lineHeight: 1.3 }}>
                    Paid ৳850 for fuel at Padma Oil ⛽
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
                    ৳850 recorded. Budget remaining: ৳3,450
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
          }
        }
      `}</style>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, Building2, Send, CheckCircle2, MessageCircle, Clock, Sparkles } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card3DTilt } from '../components/Card3DTilt';
import { playMicroClick } from '../utils/audio';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    document.title = 'Official Contact Channels — ExpenseX AI & Appstick';
    window.scrollTo(0, 0);
  }, []);

  const navigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    playMicroClick();
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playMicroClick();
    setSubmitted(true);
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', position: 'relative', overflowX: 'hidden' }}>

      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.2) 0%, rgba(255, 90, 54, 0.06) 50%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Navbar />

      <main style={{ flex: 1, paddingTop: '110px', paddingBottom: '90px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '1060px', margin: '0 auto', padding: '0 24px' }}>

          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <a
              href="/"
              onClick={navigateHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--purple-light)',
                fontSize: '13.5px',
                fontWeight: 600,
                textDecoration: 'none',
                marginBottom: '32px',
                padding: '9px 18px',
                borderRadius: '999px',
                background: 'rgba(109, 61, 245, 0.12)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(109, 61, 245, 0.22)';
                e.currentTarget.style.transform = 'translateX(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(109, 61, 245, 0.12)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <ArrowLeft size={16} />
              Back to Overview
            </a>
          </motion.div>

          {/* Heading */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
                <Sparkles size={14} style={{ marginRight: '6px' }} />
                <span>OFFICIAL VERIFICATION &bull; DIRECT CONTACT</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: 'clamp(34px, 5.5vw, 56px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#FFFFFF',
                marginBottom: '20px',
              }}
            >
              Get in Touch with <span className="text-gradient-purple">ExpenseX AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6 }}
            >
              Direct contact channels for startup program reviewers, institutional partners, early adopters, and security researchers.
            </motion.p>
          </div>

          {/* Grid Layout: Contact Details & Form */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'start',
            }}
          >
            {/* Left Column: Official Verified Channels */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card3DTilt
                maxTilt={6}
                style={{
                  background: 'linear-gradient(135deg, rgba(17, 24, 48, 0.95) 0%, rgba(26, 17, 46, 0.9) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  borderRadius: '24px',
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '18px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>Official Headquarters</h2>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    ACTIVE
                  </span>
                </div>

                {/* Email row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255, 90, 54, 0.15)', color: '#FF5A36', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '3px' }}>PRIMARY BUSINESS EMAIL</div>
                    <a href="mailto:info@expensexai.com" onClick={() => playMicroClick()} style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', textDecoration: 'none' }}>
                      info@expensexai.com
                    </a>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Customer Helpdesk: <a href="mailto:support@expensexai.com" style={{ color: 'var(--purple-light)' }}>support@expensexai.com</a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '3px' }}>DIRECT WHATSAPP &bull; PHONE</div>
                    <a href="https://wa.me/8801404049797" target="_blank" rel="noopener noreferrer" onClick={() => playMicroClick()} style={{ fontSize: '16px', fontWeight: 700, color: '#25D366', textDecoration: 'none' }}>
                      +880 1404-049797
                    </a>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Direct founder &amp; tech escalation line</div>
                  </div>
                </div>

                {/* Office row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(109, 61, 245, 0.15)', color: '#A78BFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '3px' }}>PHYSICAL OFFICE ADDRESS</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.5 }}>
                      50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh
                    </div>
                  </div>
                </div>

                {/* Corporate entity */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '3px' }}>PARENT COMPANY &bull; LEADERSHIP</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>Appstick</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Founder &amp; CEO: Md. Riaz Mahmud</div>
                  </div>
                </div>

                {/* Response SLA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <Clock size={16} color="var(--purple-light)" />
                  <span>Standard Response Time: <strong>Within 24 Hours</strong></span>
                </div>
              </Card3DTilt>
            </motion.div>

            {/* Right Column: Interactive Send Message Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div
                className="glass-card"
                style={{
                  borderRadius: '24px',
                  padding: '40px 36px',
                  background: 'rgba(14, 20, 38, 0.8)',
                  border: '1px solid var(--border-medium)',
                }}
              >
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>Send Direct Message</h2>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
                  Have an inquiry regarding our Google Cloud deployment, API integration, or feature rollout?
                </p>

                {submitted ? (
                  <div
                    style={{
                      padding: '32px 24px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '16px',
                      textAlign: 'center',
                    }}
                  >
                    <CheckCircle2 size={40} color="#10B981" style={{ margin: '0 auto 16px auto' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>Message Dispatched</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                      Thank you! Your message has been routed to <strong>info@expensexai.com</strong>. We will get back to you promptly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Henderson"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-medium)',
                          borderRadius: '12px',
                          color: '#FFFFFF',
                          fontSize: '14.5px',
                          outline: 'none',
                          transition: 'border 0.2s',
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--purple-light)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        Business Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-medium)',
                          borderRadius: '12px',
                          color: '#FFFFFF',
                          fontSize: '14.5px',
                          outline: 'none',
                          transition: 'border 0.2s',
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--purple-light)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        Inquiry or Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your team, question, or verification details..."
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-medium)',
                          borderRadius: '12px',
                          color: '#FFFFFF',
                          fontSize: '14.5px',
                          outline: 'none',
                          resize: 'vertical',
                          transition: 'border 0.2s',
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--purple-light)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        padding: '16px 28px',
                        fontSize: '15px',
                        fontWeight: 700,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        marginTop: '6px',
                      }}
                    >
                      <Send size={16} /> Send Direct Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
export default ContactPage;

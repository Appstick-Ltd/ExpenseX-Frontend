'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, Building2, Send, CheckCircle2, MessageCircle, Clock, Sparkles } from 'lucide-react';
import { Card3DTilt } from '../ui/Card3DTilt';
import { playMicroClick } from '../../helpers/audio';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playMicroClick();
    setSubmitted(true);
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', width: '100%' }}>
      {/* Ambient Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '3%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.2) 0%, rgba(255, 90, 54, 0.08) 50%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ paddingTop: '110px', paddingBottom: '90px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Back Pill Button */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Link
              href="/"
              onClick={() => playMicroClick()}
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
            </Link>
          </motion.div>

          {/* Heading */}
          <div style={{ marginBottom: '56px' }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <Mail size={14} style={{ marginRight: '6px' }} />
              <span>DIRECT CHANNELS &bull; VERIFIED CONTACT</span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(34px, 5.5vw, 52px)',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '16px',
                letterSpacing: '-0.025em',
              }}
            >
              Get in Touch with the <br />
              <span className="gradient-text-coral">ExpenseX AI Team.</span>
            </h1>
            <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '700px', lineHeight: 1.65, margin: 0 }}>
              Whether you have inquiries regarding early beta access, partner API integrations, technical deployment on Google Cloud, or general feedback, our leadership and support engineers are here to assist.
            </p>
          </div>

          {/* Two-Column Contact Layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
            }}
          >
            {/* Left Column: Official Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Card3DTilt
                maxTilt={5}
                className="glass-card"
                style={{
                  borderRadius: '24px',
                  padding: '40px 36px',
                  background: 'rgba(14, 20, 38, 0.75)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>Official Channels</h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Verified direct reachability across email, phone, and office.</p>
                </div>

                {/* Email Support */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(109, 61, 245, 0.18)', border: '1px solid rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-light)', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '3px' }}>DIRECT INQUIRY DESKS</div>
                    <div style={{ fontSize: '14.5px', color: '#FFFFFF', marginBottom: '4px' }}>
                      <strong style={{ color: 'var(--purple-light)' }}>User &amp; Beta Support:</strong>{' '}
                      <a href="mailto:support@expensexai.com" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>support@expensexai.com</a>
                    </div>
                    <div style={{ fontSize: '14.5px', color: '#FFFFFF', marginBottom: '4px' }}>
                      <strong style={{ color: 'var(--purple-light)' }}>Corporate &amp; Partnerships:</strong>{' '}
                      <a href="mailto:info@expensexai.com" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>info@expensexai.com</a>
                    </div>
                    <div style={{ fontSize: '14.5px', color: '#FFFFFF' }}>
                      <strong style={{ color: 'var(--purple-light)' }}>Privacy &amp; Data Rights:</strong>{' '}
                      <a href="mailto:privacy@expensexai.com" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>privacy@expensexai.com</a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat & Phone */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.18)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '3px' }}>WHATSAPP CHAT &bull; TELEPHONE</div>
                    <a href="https://wa.me/8801404049797" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', textDecoration: 'none' }}>
                      +880 1404-049797
                    </a>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Mon &ndash; Fri &bull; 9:00 AM &ndash; 7:00 PM (GMT+6)</div>
                  </div>
                </div>

                {/* Physical Headquarters Address */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255, 90, 54, 0.18)', border: '1px solid rgba(255, 90, 54, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--coral-accent)', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '3px' }}>GLOBAL HEADQUARTERS &bull; CORPORATE ADDRESS</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.4 }}>
                      50, KDA Outer Bypass Rd,
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Khulna 9100, Bangladesh</div>
                  </div>
                </div>

                {/* Parent Entity Info */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.18)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8', flexShrink: 0 }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '3px' }}>PARENT COMPANY &bull; LEADERSHIP</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>Appstick Ltd.</div>
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
                  Have an inquiry regarding our Google for Startups deployment, API integration, or feature rollout?
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
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
      </div>
    </div>
  );
};

export default ContactView;

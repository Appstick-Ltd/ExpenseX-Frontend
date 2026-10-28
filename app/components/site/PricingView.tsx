'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Coins,
  Cpu,
  Layers,
  Award,
} from 'lucide-react';
import { Card3DTilt } from '../ui/Card3DTilt';
import { playMicroClick } from '../../helpers/audio';
import { openEarlyAccessModal } from '../../helpers/modalEvents';
import { getGooglePlayProducts } from '../../helpers/backend';

type CurrencyCode = 'USD' | 'BDT' | 'EUR' | 'GBP';

interface RegionalConfig {
  amount: number;
  currency: string;
  regionCode?: string;
}

interface BasePlan {
  basePlanId: string;
  state?: string;
  regionalConfigs: RegionalConfig[];
  plan?: {
    name?: { en?: string; bn?: string } | string;
    productId?: string;
    aiCredit?: number;
    coin?: number;
    isPopular?: boolean;
    facilities?: Array<{ en?: string; bn?: string } | string>;
    features?: Array<{ en?: string; bn?: string } | string>;
  };
}

interface OneTimeProduct {
  packageName: string;
  productId: string;
  name: string;
  description?: string;
  credits: number;
  amount: number;
  currency: string;
  formattedPrice?: string;
  regionalConfigs: RegionalConfig[];
}

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  BDT: '৳',
  EUR: '€',
  GBP: '£',
};

const PLAN_ORDER = ['monthly', '3-month', '6-month', 'yearly'];

const sortBasePlans = (plans: BasePlan[]): BasePlan[] => {
  return [...plans].sort((a, b) => {
    const aId = (a.basePlanId || a.plan?.productId || '').toLowerCase();
    const bId = (b.basePlanId || b.plan?.productId || '').toLowerCase();
    const aIdx = PLAN_ORDER.indexOf(aId);
    const bIdx = PLAN_ORDER.indexOf(bId);
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
  });
};

const getFeatureText = (f: any): string => {
  if (!f) return '';
  if (typeof f === 'string') return f;
  if (typeof f === 'object') {
    return f.en || f.bn || Object.values(f)[0] || '';
  }
  return String(f);
};

// Fallback initial data with exact facilities configured in the ExpenseX admin panel
const DEFAULT_BASE_PLANS: BasePlan[] = [
  {
    basePlanId: 'monthly',
    state: 'ACTIVE',
    regionalConfigs: [
      { amount: 5.49, currency: 'USD' },
      { amount: 700, currency: 'BDT' },
      { amount: 5.49, currency: 'EUR' },
      { amount: 4.49, currency: 'GBP' },
    ],
    plan: {
      name: { en: 'Starter Monthly', bn: 'স্টার্টার মাসিক' },
      productId: 'monthly',
      aiCredit: 500,
      coin: 50,
      isPopular: false,
      facilities: [
        { en: '500 AI Credit' },
        { en: 'AI SMS Expense Extraction' },
        { en: 'Smart Expense Categorization' },
        { en: 'AI Money Assistant' },
        { en: 'AI Voice Expense Entry' },
        { en: 'AI Email Expense Extraction' },
        { en: 'AI Spending Insights' },
        { en: 'Smart Budget Analysis' },
        { en: 'Spending Pattern Analysis' },
        { en: 'Unlimited Expense Records' },
        { en: 'Unlimited Income Records' },
      ],
    },
  },
  {
    basePlanId: '3-month',
    state: 'ACTIVE',
    regionalConfigs: [
      { amount: 12.99, currency: 'USD' },
      { amount: 1700, currency: 'BDT' },
      { amount: 12.99, currency: 'EUR' },
      { amount: 10.99, currency: 'GBP' },
    ],
    plan: {
      name: { en: 'Premium Plan', bn: 'Premium Plan' },
      productId: '3-month',
      aiCredit: 1500,
      coin: 300,
      isPopular: false,
      facilities: [
        { en: '1500 AI Credits' },
        { en: 'AI SMS Expense Extraction' },
        { en: 'Smart Expense Categorization' },
        { en: 'AI Money Assistant' },
        { en: 'AI Voice Expense Entry' },
        { en: 'AI Email Expense Extraction' },
        { en: 'AI Spending Insights' },
        { en: 'Smart Budget Analysis' },
        { en: 'Spending Habits & Trend Analysis' },
        { en: 'Unlimited Expense Record' },
        { en: 'Unlimited Income Records' },
      ],
    },
  },
  {
    basePlanId: '6-month',
    state: 'ACTIVE',
    regionalConfigs: [
      { amount: 26.99, currency: 'USD' },
      { amount: 3500, currency: 'BDT' },
      { amount: 26.99, currency: 'EUR' },
      { amount: 22.99, currency: 'GBP' },
    ],
    plan: {
      name: { en: 'Standard Plan', bn: 'Standard Plan' },
      productId: '6-month',
      aiCredit: 3000,
      coin: 600,
      isPopular: true,
      facilities: [
        { en: '3000 AI Credit' },
        { en: 'AI SMS Expense Extraction' },
        { en: 'Smart Expense Categorization' },
        { en: 'AI Money Assistant' },
        { en: 'AI Voice Expense Entry' },
        { en: 'AI Email Expense Extraction' },
        { en: 'AI Spending Insights' },
        { en: 'Personalized Financial Recommendations' },
        { en: 'Unlimited Expense Records' },
        { en: 'Unlimited Income Records' },
      ],
    },
  },
  {
    basePlanId: 'yearly',
    state: 'ACTIVE',
    regionalConfigs: [
      { amount: 43.99, currency: 'USD' },
      { amount: 5600, currency: 'BDT' },
      { amount: 43.99, currency: 'EUR' },
      { amount: 36.99, currency: 'GBP' },
    ],
    plan: {
      name: { en: 'Annual Plan', bn: 'Annual Plan' },
      productId: 'yearly',
      aiCredit: 6000,
      coin: 1200,
      isPopular: false,
      facilities: [
        { en: '6000 AI Credits' },
        { en: 'AI SMS Expense Extraction' },
        { en: 'Smart Expense Categorization' },
        { en: 'AI Money Assistant' },
        { en: 'AI Voice Expense Entry' },
        { en: 'AI Email Expense Extraction' },
        { en: 'AI Spending Insights' },
        { en: 'Smart Budget Analysis' },
        { en: 'Spending Habits & Trend Analysis' },
        { en: 'Multiple Accounts & Wallets Support' },
        { en: 'Unlimited Expense Records' },
        { en: 'Unlimited Income Records' },
      ],
    },
  },
];

const DEFAULT_CREDIT_PACKS: OneTimeProduct[] = [
  {
    packageName: 'com.expensexai.app',
    productId: 'credits_100',
    name: '100 AI Credits',
    credits: 100,
    amount: 1,
    currency: 'USD',
    regionalConfigs: [
      { amount: 1, currency: 'USD' },
      { amount: 150, currency: 'BDT' },
      { amount: 1.09, currency: 'EUR' },
      { amount: 0.89, currency: 'GBP' },
    ],
  },
  {
    packageName: 'com.expensexai.app',
    productId: 'credits_200',
    name: '200 AI Credits',
    credits: 200,
    amount: 1.99,
    currency: 'USD',
    regionalConfigs: [
      { amount: 1.99, currency: 'USD' },
      { amount: 290, currency: 'BDT' },
      { amount: 2.19, currency: 'EUR' },
      { amount: 1.79, currency: 'GBP' },
    ],
  },
  {
    packageName: 'com.expensexai.app',
    productId: 'credits_300',
    name: '300 AI Credits',
    credits: 300,
    amount: 2.99,
    currency: 'USD',
    regionalConfigs: [
      { amount: 2.99, currency: 'USD' },
      { amount: 420, currency: 'BDT' },
      { amount: 3.19, currency: 'EUR' },
      { amount: 2.59, currency: 'GBP' },
    ],
  },
  {
    packageName: 'com.expensexai.app',
    productId: 'credits_500',
    name: '500 AI Credits',
    credits: 500,
    amount: 4.99,
    currency: 'USD',
    regionalConfigs: [
      { amount: 4.99, currency: 'USD' },
      { amount: 700, currency: 'BDT' },
      { amount: 5.49, currency: 'EUR' },
      { amount: 4.49, currency: 'GBP' },
    ],
  },
  {
    packageName: 'com.expensexai.app',
    productId: 'credits_1000',
    name: '1000 AI Credits',
    credits: 1000,
    amount: 9.99,
    currency: 'USD',
    regionalConfigs: [
      { amount: 9.99, currency: 'USD' },
      { amount: 1400, currency: 'BDT' },
      { amount: 10.99, currency: 'EUR' },
      { amount: 8.99, currency: 'GBP' },
    ],
  },
];

export const PricingView: React.FC = () => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'credits'>('subscriptions');
  const [basePlans, setBasePlans] = useState<BasePlan[]>(DEFAULT_BASE_PLANS);
  const [creditPacks, setCreditPacks] = useState<OneTimeProduct[]>(DEFAULT_CREDIT_PACKS);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveApi, setIsLiveApi] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    let isMounted = true;
    async function fetchPricing() {
      try {
        setIsLoading(true);
        const res: any = await getGooglePlayProducts();
        if (!isMounted) return;

        if (res?.success && res?.data) {
          if (Array.isArray(res.data.subscriptions) && res.data.subscriptions.length > 0) {
            const firstSub = res.data.subscriptions[0];
            if (Array.isArray(firstSub.basePlans) && firstSub.basePlans.length > 0) {
              setBasePlans(sortBasePlans(firstSub.basePlans));
            }
          }
          if (Array.isArray(res.data.oneTimeProducts) && res.data.oneTimeProducts.length > 0) {
            // Sort by credit amount ascending
            const sorted = [...res.data.oneTimeProducts].sort((a, b) => (a.credits || 0) - (b.credits || 0));
            setCreditPacks(sorted);
          }
          setIsLiveApi(true);
        }
      } catch (err) {
        console.warn('Using pre-cached Google Play pricing data:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchPricing();
    return () => {
      isMounted = false;
    };
  }, []);

  const getPrice = (regionalConfigs: RegionalConfig[] = [], fallbackAmount: number = 0) => {
    const matched = regionalConfigs.find((r) => r.currency?.toUpperCase() === currency);
    if (matched && typeof matched.amount === 'number') {
      return matched.amount;
    }
    // Fallback to USD
    const usd = regionalConfigs.find((r) => r.currency?.toUpperCase() === 'USD');
    return usd?.amount ?? fallbackAmount;
  };

  const formatPrice = (amount: number) => {
    const symbol = CURRENCY_SYMBOLS[currency] || '$';
    if (currency === 'BDT') {
      return `${symbol}${amount.toLocaleString('en-US')}`;
    }
    return `${symbol}${amount.toFixed(2)}`;
  };

  const getPlanDurationLabel = (planId: string) => {
    switch (planId) {
      case 'monthly':
        return '/ month';
      case '3-month':
        return '/ 3 months';
      case '6-month':
        return '/ 6 months';
      case 'yearly':
        return '/ year';
      default:
        return '';
    }
  };

  const getPlanPerMonthEquivalent = (planId: string, totalAmount: number) => {
    let months = 1;
    if (planId === '3-month') months = 3;
    if (planId === '6-month') months = 6;
    if (planId === 'yearly') months = 12;

    if (months === 1) return null;
    const perMonth = totalAmount / months;
    return `~${formatPrice(perMonth)}/mo`;
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', width: '100%', minHeight: '100vh' }}>
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
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.22) 0%, rgba(255, 90, 54, 0.08) 50%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ paddingTop: '110px', paddingBottom: '90px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
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
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <Zap size={14} style={{ marginRight: '6px' }} />
              <span>OFFICIAL GOOGLE PLAY BILLING</span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(34px, 5vw, 54px)',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '16px',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Transparent Pricing. <br />
              <span className="gradient-text-coral">Start Free, Power Up with AI.</span>
            </h1>
            <p
              style={{
                fontSize: '17px',
                color: 'var(--text-secondary)',
                maxWidth: '680px',
                margin: '0 auto 28px auto',
                lineHeight: 1.6,
              }}
            >
              Enjoy full automated expense capture on our Free Plan, or unlock advanced recurring analysis, extra AI credits, and multi-vault sync with Google Play In-App Subscriptions.
            </p>

            {/* Currency Selector & Controls Bar */}
            <div
              style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                padding: '8px 14px',
                borderRadius: '16px',
                background: 'rgba(14, 20, 38, 0.85)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Currency Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '4px' }}>
                  Currency:
                </span>
                {(['USD', 'BDT', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      playMicroClick();
                      setCurrency(c);
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      background: currency === c ? 'linear-gradient(135deg, #6D3DF5 0%, #FF5A36 100%)' : 'rgba(255, 255, 255, 0.05)',
                      color: currency === c ? '#FFFFFF' : 'var(--text-muted)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {c} ({CURRENCY_SYMBOLS[c]})
                  </button>
                ))}
              </div>

              <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.12)' }} />

              {/* View Tab Switcher */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => {
                    playMicroClick();
                    setActiveTab('subscriptions');
                  }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'subscriptions' ? 'rgba(139, 92, 246, 0.35)' : 'transparent',
                    color: activeTab === 'subscriptions' ? '#FFFFFF' : 'var(--text-muted)',
                    borderBottom: activeTab === 'subscriptions' ? '2px solid #A78BFA' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Layers size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: '-1px' }} />
                  Pro Subscriptions
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playMicroClick();
                    setActiveTab('credits');
                  }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'credits' ? 'rgba(139, 92, 246, 0.35)' : 'transparent',
                    color: activeTab === 'credits' ? '#FFFFFF' : 'var(--text-muted)',
                    borderBottom: activeTab === 'credits' ? '2px solid #A78BFA' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Cpu size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: '-1px' }} />
                  AI Credit Booster Packs
                </button>
              </div>
            </div>
          </div>

          {/* TAB 1: SUBSCRIPTION PLANS */}
          {activeTab === 'subscriptions' && (
            <div>
              {/* Free Plan + Google Play Plans Flex Grid (Max 3 Cards per Line, Centered) */}
              <div
                className="pricing-cards-container"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'stretch',
                  gap: '24px',
                  marginBottom: '64px',
                  maxWidth: '1240px',
                  margin: '0 auto 64px auto',
                }}
              >
                {/* 1. Free Tier Included Forever */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    flex: '0 1 calc(33.333% - 16px)',
                    minWidth: '290px',
                    maxWidth: '380px',
                    display: 'flex',
                  }}
                >
                  <Card3DTilt
                    maxTilt={5}
                    className="glass-card"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '24px',
                      padding: '32px 26px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(14, 20, 38, 0.75)',
                      position: 'relative',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#CBD5E1',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          marginBottom: '16px',
                        }}
                      >
                        <Sparkles size={12} /> INCLUDED FOREVER
                      </div>

                      <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>Free Plan</h3>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                        Core automated finance capture for daily personal use. No credit card required.
                      </p>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px', paddingBottom: '18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <span style={{ fontSize: '42px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                          {CURRENCY_SYMBOLS[currency]}0
                        </span>
                        <span style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>/ free forever</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          playMicroClick();
                          openEarlyAccessModal({
                            planName: 'Free Starter Plan',
                            planPrice: `${CURRENCY_SYMBOLS[currency]}0 / forever`,
                          });
                        }}
                        className="btn-secondary"
                        style={{
                          width: '100%',
                          padding: '13px 20px',
                          fontSize: '14px',
                          fontWeight: 700,
                          borderRadius: '12px',
                          marginBottom: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#FFFFFF',
                        }}
                      >
                        <span>Download Free Plan</span> <ArrowRight size={15} />
                      </button>

                      <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--purple-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                        Included Features:
                      </div>

                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#E2E8F0', lineHeight: 1.4 }}>
                          <Check size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>100 Initial AI Credits</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#E2E8F0', lineHeight: 1.4 }}>
                          <Check size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>Receipt Vision OCR Extraction</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#E2E8F0', lineHeight: 1.4 }}>
                          <Check size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>Voice Expense Entry (Audio NLP)</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#E2E8F0', lineHeight: 1.4 }}>
                          <Check size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>SMS Transaction Parser (Android)</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#E2E8F0', lineHeight: 1.4 }}>
                          <Check size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>Safe-to-Spend™ Velocity Margin</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#E2E8F0', lineHeight: 1.4 }}>
                          <Check size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>Dynamic Envelope Budgeting</span>
                        </li>
                      </ul>
                    </div>
                  </Card3DTilt>
                </motion.div>

                {/* 2. Google Play Subscription Plans */}
                {basePlans.map((bp, idx) => {
                  const planData = bp.plan;
                  const rawName = typeof planData?.name === 'object' ? planData.name.en : planData?.name || bp.basePlanId;
                  const price = getPrice(bp.regionalConfigs, 5.49);
                  const isPopular = Boolean(planData?.isPopular || bp.basePlanId === '6-month');
                  const isYearly = bp.basePlanId === 'yearly';
                  const perMonth = getPlanPerMonthEquivalent(bp.basePlanId, price);

                  const facilitiesList =
                    Array.isArray(planData?.facilities) && planData.facilities.length > 0
                      ? planData.facilities
                      : Array.isArray(planData?.features) && planData.features.length > 0
                      ? planData.features
                      : [];

                  return (
                    <motion.div
                      key={bp.basePlanId}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 * (idx + 1) }}
                      style={{
                        flex: '0 1 calc(33.333% - 16px)',
                        minWidth: '290px',
                        maxWidth: '380px',
                        display: 'flex',
                      }}
                    >
                      <Card3DTilt
                        maxTilt={6}
                        className="glass-card"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '24px',
                          padding: '32px 26px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          border: isPopular
                            ? '1.5px solid rgba(167, 139, 250, 0.75)'
                            : isYearly
                            ? '1.5px solid rgba(16, 185, 129, 0.55)'
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          background: isPopular
                            ? 'linear-gradient(135deg, rgba(14, 20, 38, 0.95) 0%, rgba(34, 22, 60, 0.92) 100%)'
                            : 'rgba(14, 20, 38, 0.75)',
                          boxShadow: isPopular ? '0 15px 45px rgba(139, 92, 246, 0.28)' : 'none',
                          position: 'relative',
                        }}
                      >
                        <div>
                          {/* Popular / Best Value Badge */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                background: isPopular
                                  ? 'rgba(139, 92, 246, 0.22)'
                                  : isYearly
                                  ? 'rgba(16, 185, 129, 0.2)'
                                  : 'rgba(109, 61, 245, 0.15)',
                                border: isPopular
                                  ? '1px solid rgba(167, 139, 250, 0.55)'
                                  : isYearly
                                  ? '1px solid rgba(16, 185, 129, 0.45)'
                                  : '1px solid rgba(139, 92, 246, 0.35)',
                                color: isPopular ? '#C084FC' : isYearly ? '#34D399' : 'var(--purple-light)',
                                fontSize: '11px',
                                fontWeight: 800,
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                                padding: '4px 10px',
                                borderRadius: '999px',
                              }}
                            >
                              {isPopular ? (
                                <>
                                  <Award size={12} /> MOST POPULAR
                                </>
                              ) : isYearly ? (
                                <>
                                  <Sparkles size={12} /> BEST VALUE &bull; SAVE 33%
                                </>
                              ) : (
                                <>
                                  <Zap size={12} /> PRO SUBSCRIPTION
                                </>
                              )}
                            </div>

                            {/* Coins Badge */}
                            {Boolean(planData?.coin) && (
                              <div
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '11.5px',
                                  fontWeight: 700,
                                  color: '#FBBF24',
                                }}
                              >
                                <Coins size={12} /> +{planData?.coin} Coins
                              </div>
                            )}
                          </div>

                          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                            {rawName}
                          </h3>

                          {/* Credits Pill */}
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#A78BFA',
                              background: 'rgba(109, 61, 245, 0.14)',
                              padding: '3px 10px',
                              borderRadius: '6px',
                              marginBottom: '18px',
                            }}
                          >
                            <Cpu size={12} /> {planData?.aiCredit?.toLocaleString()} AI Credits Included
                          </div>

                          {/* Price */}
                          <div style={{ marginBottom: '22px', paddingBottom: '18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                              <span style={{ fontSize: '42px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                                {formatPrice(price)}
                              </span>
                              <span style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                                {getPlanDurationLabel(bp.basePlanId)}
                              </span>
                            </div>
                            {perMonth && (
                              <div style={{ fontSize: '12px', color: '#34D399', fontWeight: 700, marginTop: '3px' }}>
                                Equivalent to {perMonth}
                              </div>
                            )}
                          </div>

                          {/* CTA Button */}
                          <button
                            type="button"
                            onClick={() => {
                              playMicroClick();
                              openEarlyAccessModal({
                                planName: rawName,
                                planPrice: formatPrice(price),
                                duration: getPlanDurationLabel(bp.basePlanId),
                              });
                            }}
                            className={isPopular ? 'btn-primary' : 'btn-secondary'}
                            style={{
                              width: '100%',
                              padding: '13px 20px',
                              fontSize: '14px',
                              fontWeight: 700,
                              borderRadius: '12px',
                              marginBottom: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              border: isPopular ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                              color: '#FFFFFF',
                            }}
                          >
                            <span>
                              {isPopular
                                ? 'Get Most Popular Plan'
                                : isYearly
                                ? 'Get Yearly Plan (Save 33%)'
                                : 'Choose Plan'}
                            </span>
                            <ArrowRight size={15} />
                          </button>

                          <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--purple-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                            What&apos;s Included:
                          </div>

                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                            {facilitiesList.map((f: any, fIdx: number) => {
                              const featureName = getFeatureText(f);
                              if (!featureName) return null;
                              return (
                                <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#E2E8F0', lineHeight: 1.4 }}>
                                  <Check size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                                  <span>{featureName}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </Card3DTilt>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: AI CREDIT BOOSTER PACKS */}
          {activeTab === 'credits' && (
            <div>
              <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                  Need More AI Inferences?
                </h3>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                  Purchase standalone one-time AI credits anytime through Google Play. Credits never expire and are consumed per smart receipt scan, invoice parse, or conversational inquiry.
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'stretch',
                  gap: '20px',
                  marginBottom: '64px',
                  maxWidth: '1240px',
                  margin: '0 auto 64px auto',
                }}
              >
                {creditPacks.map((pack, idx) => {
                  const price = getPrice(pack.regionalConfigs, pack.amount);
                  const isTopPack = pack.credits >= 500;

                  return (
                    <motion.div
                      key={pack.productId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 * idx }}
                      style={{
                        flex: '0 1 calc(33.333% - 14px)',
                        minWidth: '240px',
                        maxWidth: '360px',
                        display: 'flex',
                      }}
                    >
                      <Card3DTilt
                        maxTilt={6}
                        className="glass-card"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '20px',
                          padding: '28px 22px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          textAlign: 'center',
                          border: isTopPack ? '1.5px solid rgba(109, 61, 245, 0.45)' : '1px solid rgba(255, 255, 255, 0.08)',
                          background: isTopPack ? 'rgba(20, 16, 42, 0.85)' : 'rgba(14, 20, 38, 0.7)',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              width: '46px',
                              height: '46px',
                              borderRadius: '12px',
                              background: isTopPack ? 'rgba(255, 90, 54, 0.16)' : 'rgba(109, 61, 245, 0.16)',
                              color: isTopPack ? 'var(--coral-accent)' : 'var(--purple-light)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 16px auto',
                            }}
                          >
                            <Cpu size={22} />
                          </div>

                          <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                            {pack.credits.toLocaleString()} Credits
                          </h4>
                          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '18px' }}>
                            One-Time Booster Pack
                          </p>

                          <div style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', marginBottom: '4px' }}>
                            {formatPrice(price)}
                          </div>
                          <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '22px' }}>
                            ~{formatPrice(price / pack.credits)} per credit
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            playMicroClick();
                            openEarlyAccessModal({
                              planName: `${pack.credits.toLocaleString()} AI Credits Booster`,
                              planPrice: formatPrice(price),
                            });
                          }}
                          className="btn-secondary"
                          style={{
                            width: '100%',
                            padding: '11px 16px',
                            fontSize: '13.5px',
                            fontWeight: 700,
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: '#FFFFFF',
                          }}
                        >
                          <span>Get {pack.credits} Credits</span>
                          <ArrowRight size={14} />
                        </button>
                      </Card3DTilt>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default PricingView;

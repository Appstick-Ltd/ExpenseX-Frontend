'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Users,
  Crown,
  Wallet,
  Zap,
  ChevronDown,
  Coins,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Shield,
  CreditCard,
} from 'lucide-react';
import { getAdminOverview, getStoredAdminUser } from '../../services/portalApi';
import { get } from '../../../../app/helpers/api';
import { Shimmer } from '../common/Shimmer';

interface OverviewTabProps {
  onNavigateTab: (tabId: string) => void;
}

// Sparkline Mini Bar component
const MiniBarSparkline: React.FC<{ heights?: number[]; color: string }> = ({ heights = [35, 45, 60, 50, 75, 90], color }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 32 }}>
    {heights.map((h, i) => (
      <div
        key={i}
        style={{
          width: 4,
          height: `${Math.max(15, Math.min(100, h))}%`,
          backgroundColor: color,
          borderRadius: 2,
          opacity: 0.35 + (i / Math.max(1, heights.length)) * 0.65,
          transition: 'height 0.3s ease',
        }}
      />
    ))}
  </div>
);


// Overview Skeleton Component for Loading State
const OverviewSkeleton: React.FC = () => {
  return (
    <div style={{ paddingBottom: 48, color: '#0F172A', fontFamily: 'inherit' }}>
      {/* 1. Header Welcome Bar Skeleton */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 16,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
          borderRadius: 16,
          padding: '16px 20px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        }}
      >
        <div>
          <Shimmer width={210} height={24} style={{ marginBottom: 8 }} />
          <Shimmer width={260} height={13} />
        </div>
        <Shimmer width={140} height={34} borderRadius={8} />
      </div>

      {/* 2. Top 4 KPI Metric Cards Skeleton */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: '20px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Shimmer width={44} height={44} borderRadius={12} />
              <div>
                <Shimmer width={75} height={12} style={{ marginBottom: 8 }} />
                <Shimmer width={95} height={22} style={{ marginBottom: 6 }} />
                <Shimmer width={80} height={12} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 32 }}>
              {[30, 45, 60, 50, 75, 90].map((h, j) => (
                <div
                  key={j}
                  style={{
                    width: 4,
                    height: `${h}%`,
                    backgroundColor: '#E2E8F0',
                    borderRadius: 2,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Mid Row: Revenue Overview (Left) + Users by Plan (Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 20,
          marginBottom: 24,
        }}
        className="mc-overview-mid-grid"
      >
        {/* Left Chart Skeleton */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '22px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <Shimmer width={150} height={18} style={{ marginBottom: 8 }} />
              <Shimmer width={120} height={13} />
            </div>
            <Shimmer width={110} height={30} borderRadius={8} />
          </div>
          <div style={{ height: 220, display: 'flex', alignItems: 'flex-end', gap: 12, padding: '16px 0' }}>
            <Shimmer width="100%" height={190} borderRadius={12} />
          </div>
        </div>

        {/* Right Donut Skeleton */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '22px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Shimmer width={120} height={18} style={{ marginBottom: 20 }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flex: 1,
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  border: '14px solid #E2E8F0',
                  boxSizing: 'border-box',
                }}
                className="mc-shimmer"
              />
              <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Shimmer width={40} height={18} />
                <Shimmer width={55} height={10} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 140 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Shimmer width={8} height={8} borderRadius="50%" />
                    <Shimmer width={55} height={12} />
                  </div>
                  <Shimmer width={40} height={12} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row Skeleton: Recent Users + Recent Transactions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: 20,
        }}
        className="mc-overview-bottom-grid"
      >
        {/* Recent Users Skeleton */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Shimmer width={110} height={16} />
            <Shimmer width={60} height={14} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F8FAFC' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Shimmer width={28} height={28} borderRadius="50%" />
                  <div>
                    <Shimmer width={85} height={12} style={{ marginBottom: 4 }} />
                    <Shimmer width={120} height={10} />
                  </div>
                </div>
                <Shimmer width={48} height={18} borderRadius={6} />
                <Shimmer width={65} height={12} />
                <Shimmer width={50} height={18} borderRadius={6} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions Skeleton */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Shimmer width={135} height={16} />
            <Shimmer width={60} height={14} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F8FAFC' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Shimmer width={28} height={28} borderRadius="50%" />
                  <Shimmer width={110} height={12} />
                </div>
                <Shimmer width={55} height={16} borderRadius={4} />
                <Shimmer width={50} height={14} />
                <Shimmer width={60} height={12} />
                <Shimmer width={50} height={18} borderRadius={6} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [revenuePeriod, setRevenuePeriod] = useState<'Last 6 Months' | 'Last 3 Months' | 'This Year'>('Last 6 Months');
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Dynamic API Telemetry State
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [subscriptionTransactions, setSubscriptionTransactions] = useState<any[]>([]);

  // Dynamic greeting based on current time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Admin user information
  const adminUser = useMemo(() => {
    try {
      return getStoredAdminUser();
    } catch {
      return null;
    }
  }, []);

  const adminName = adminUser?.name || 'Super Admin';

  const fetchDashboardData = useCallback(async (period: string = revenuePeriod, isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else if (!dashboardData) {
      setLoading(true);
    }

    try {
      // 1. Fetch overview data and subscription transactions in parallel
      const [overviewRes, subRes] = await Promise.allSettled([
        (async () => {
          try {
            return await getAdminOverview(period);
          } catch {
            return await get('/dashboards/admin/overview', { period });
          }
        })(),
        get('/google-play/subscription/history', { limit: 5, page: 1 }),
      ]);

      if (overviewRes.status === 'fulfilled' && overviewRes.value) {
        const res = overviewRes.value;
        if (res?.data) {
          setDashboardData(res.data);
        } else if (res?.success && res) {
          setDashboardData(res);
        }
      }

      if (subRes.status === 'fulfilled' && subRes.value) {
        const rawList = Array.isArray(subRes.value?.data)
          ? subRes.value.data
          : Array.isArray(subRes.value?.data?.docs)
          ? subRes.value.data.docs
          : Array.isArray(subRes.value)
          ? subRes.value
          : [];

        if (rawList.length > 0) {
          const mappedSubs = rawList.map((item: any) => {
            const userObj = typeof item.user === 'object' && item.user !== null ? item.user : null;
            const userName = userObj?.name || '';
            const userEmail = userObj?.email || (typeof item.user === 'string' ? item.user : 'User');
            const userAvatar = userObj?.image || userObj?.avatar || '';

            // Plan Name resolution
            const planRaw = item.subscriptionPlan?.name || item.plan || item.basePlanId || 'Subscription';
            let planName = 'Subscription';
            if (typeof planRaw === 'string') {
              planName = planRaw;
            } else if (typeof planRaw === 'object' && planRaw !== null) {
              planName = planRaw.en || planRaw.bn || Object.values(planRaw)[0] || 'Subscription';
            }

            // Amount formatting
            const amt = item.amount !== undefined && item.amount !== null ? Number(item.amount) : 0;
            const curr = (item.currency || 'USD').toUpperCase();
            let formattedAmount = `${curr} ${amt.toLocaleString()}`;
            if (curr === 'USD') {
              formattedAmount = `$${amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            } else if (curr === 'BDT') {
              formattedAmount = `৳${amt.toLocaleString()}`;
            }

            // Date formatting
            const dateStr = item.createdAt || item.startTime;
            let formattedDate = '—';
            if (dateStr && !isNaN(new Date(dateStr).getTime())) {
              formattedDate = new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }

            // Status formatting
            const rawStatus = (item.status || 'Active').toLowerCase();
            const displayStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1);

            return {
              id: item._id || item.id || Math.random().toString(),
              name: userName,
              email: userEmail,
              avatar: userAvatar,
              plan: planName,
              type: planName,
              typeIcon: 'crown',
              amount: formattedAmount,
              date: formattedDate,
              status: displayStatus,
            };
          });

          setSubscriptionTransactions(mappedSubs);
        }
      }
    } catch (err) {
      console.warn('Dashboard telemetry fetch notice:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [revenuePeriod, dashboardData]);

  useEffect(() => {
    fetchDashboardData(revenuePeriod);
  }, [revenuePeriod]);

  // Dynamic KPI extraction with fallback
  const kpi = dashboardData?.kpi || {
    totalUsers: 0,
    totalUsersGrowth: 0,
    totalUsersSparkline: [],
    activeSubscribers: 0,
    activeSubscribersGrowth: 0,
    activeSubscribersSparkline: [],
    totalRevenue: 0,
    totalRevenueGrowth: 0,
    totalRevenueSparkline: [],
    aiRequests: 0,
    aiRequestsGrowth: 0,
    aiRequestsSparkline: [],
  };

  // Dynamic Revenue Datasets
  const emptyDatasets: Record<string, any[]> = {
    'Last 6 Months': [],
    'Last 3 Months': [],
    'This Year': [],
  };

  const activeDatasets = dashboardData?.revenueOverview?.datasets || emptyDatasets;
  const currentRevenueData: any[] = activeDatasets[revenuePeriod] || [];

  // SVG dimensions
  const svgWidth = 620;
  const svgHeight = 220;
  const paddingLeft = 56;
  const paddingRight = 24;
  const paddingTop = 24;
  const paddingBottom = 32;

  const chartW = svgWidth - paddingLeft - paddingRight;
  const chartH = svgHeight - paddingTop - paddingBottom;

  // DYNAMIC REVENUE MAXIMUM CALCULATION
  // Prevents the SVG chart curve from ever shooting off the top
  const rawMaxVal = Math.max(
    ...currentRevenueData.map((d) => Number(d.value) || 0),
    dashboardData?.revenueOverview?.maxRevenue || 0,
    1000
  );

  const getNiceScaleCeiling = (val: number) => {
    if (val <= 1000) return 1000;
    if (val <= 5000) return Math.ceil(val / 1000) * 1000;
    if (val <= 10000) return Math.ceil(val / 2000) * 2000;
    if (val <= 25000) return Math.ceil(val / 5000) * 5000;
    if (val <= 50000) return Math.ceil(val / 10000) * 10000;
    if (val <= 100000) return Math.ceil(val / 20000) * 20000;
    if (val <= 200000) return Math.ceil(val / 50000) * 50000;
    if (val <= 500000) return Math.ceil(val / 100000) * 100000;
    return Math.ceil(val / 250000) * 250000;
  };

  const maxRevenueVal = getNiceScaleCeiling(rawMaxVal * 1.15);

  const gridSteps = [
    maxRevenueVal,
    Math.round(maxRevenueVal * 0.75),
    Math.round(maxRevenueVal * 0.5),
    Math.round(maxRevenueVal * 0.25),
    0,
  ];

  const formatGridLabel = (val: number) => {
    if (val === 0) return '$0';
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${Math.round(val / 1000)}K`;
    return `$${val}`;
  };

  // Safe SVG points calculation
  const points = currentRevenueData.map((d, i) => {
    const divisor = Math.max(1, currentRevenueData.length - 1);
    const x = paddingLeft + (i / divisor) * chartW;
    const clampedVal = Math.min(d.value, maxRevenueVal);
    const y = paddingTop + chartH - (clampedVal / maxRevenueVal) * chartH;
    return { x, y, ...d };
  });

  const curvePath = points.length > 0 ? points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cpX1 = prev.x + (pt.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (pt.x - prev.x) / 2;
    const cpY2 = pt.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pt.x} ${pt.y}`;
  }, '') : '';

  const areaPath = points.length > 0
    ? `${curvePath} L ${points[points.length - 1].x} ${paddingTop + chartH} L ${points[0].x} ${paddingTop + chartH} Z`
    : '';

  const activeNodeIndex = hoveredNode !== null && hoveredNode < points.length
    ? hoveredNode
    : (points.length > 0 ? points.length - 1 : null);
  const activeNode = activeNodeIndex !== null ? points[activeNodeIndex] : null;

  // Dynamic Donut segments
  const planList = dashboardData?.usersByPlan?.plans || [];

  const circumference = 2 * Math.PI * 40;
  let accumulatedDash = 0;
  const donutSegments = planList.map((plan: any) => {
    const rawVal = plan.rawPercentage ?? parseFloat(plan.percentage) ?? 0;
    const dashLength = (rawVal / 100) * circumference;
    const dashOffset = -accumulatedDash;
    accumulatedDash += dashLength;
    return {
      ...plan,
      strokeDasharray: `${dashLength.toFixed(1)} ${circumference.toFixed(1)}`,
      strokeDashoffset: dashOffset.toFixed(1),
    };
  });

  const recentUsers: any[] = dashboardData?.recentUsers || [];
  const recentTransactions: any[] =
    subscriptionTransactions.length > 0
      ? subscriptionTransactions
      : dashboardData?.recentTransactions || [];

  // Helper for growth badge
  const renderGrowthBadge = (growth: number) => {
    const isPositive = growth > 0;
    const isZero = growth === 0;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginTop: 4,
          fontSize: 12,
          color: isZero ? '#64748B' : isPositive ? '#10B981' : '#EF4444',
          fontWeight: 600,
        }}
      >
        <span>
          {isZero ? '—' : isPositive ? `↑ ${growth}%` : `↓ ${Math.abs(growth)}%`}
        </span>
        <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last month</span>
      </div>
    );
  };

  // 1. Until data arrives, show loading skeleton (never show default values upfront)
  if (loading && !dashboardData) {
    return <OverviewSkeleton />;
  }

  // 2. If data is unavailable or request failed
  if (!dashboardData) {
    return (
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 16,
          padding: '48px 24px',
          textAlign: 'center',
          border: '1px solid #E2E8F0',
          margin: '24px 0',
        }}
      >
        <p style={{ fontSize: 14, color: '#64748B', marginBottom: 16 }}>
          Telemetry data is currently unavailable.
        </p>
        <button
          onClick={() => fetchDashboardData(revenuePeriod, true)}
          style={{
            background: '#6366F1',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 48, color: '#0F172A', fontFamily: 'inherit' }}>
      {/* 1. Header Welcome Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 16,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
          borderRadius: 16,
          padding: '16px 20px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px 0', color: '#0F172A', letterSpacing: '-0.02em' }}>
            {greeting}, {adminName} <span style={{ display: 'inline-block' }}>👋</span>
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
            Here&apos;s a quick overview of ExpenseX AI.
          </p>
        </div>
        <button
          onClick={() => fetchDashboardData(revenuePeriod, true)}
          disabled={loading || refreshing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 8,
            padding: '7px 14px',
            fontSize: 12,
            fontWeight: 600,
            color: '#475569',
            cursor: loading || refreshing ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <RefreshCw size={13} className={loading || refreshing ? 'animate-spin' : ''} />
          <span>{loading || refreshing ? 'Refreshing...' : 'Refresh Telemetry'}</span>
        </button>
      </div>

      {/* 2. Top 4 KPI Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {/* Total Users */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#EEF2FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6366F1',
              }}
            >
              <Users size={22} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginBottom: 2 }}>
                Total Users
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {kpi.totalUsers.toLocaleString()}
              </div>
              {renderGrowthBadge(kpi.totalUsersGrowth)}
            </div>
          </div>
          <MiniBarSparkline heights={kpi.totalUsersSparkline} color="#6366F1" />
        </div>

        {/* Active Subscribers */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
              }}
            >
              <Crown size={22} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginBottom: 2 }}>
                Active Subscribers
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {kpi.activeSubscribers.toLocaleString()}
              </div>
              {renderGrowthBadge(kpi.activeSubscribersGrowth)}
            </div>
          </div>
          <MiniBarSparkline heights={kpi.activeSubscribersSparkline} color="#10B981" />
        </div>

        {/* Total Revenue */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#FFF7ED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F97316',
              }}
            >
              <Wallet size={22} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginBottom: 2 }}>
                Total Revenue
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                ${Number(kpi.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })}
              </div>
              {renderGrowthBadge(kpi.totalRevenueGrowth)}
            </div>
          </div>
          <MiniBarSparkline heights={kpi.totalRevenueSparkline} color="#F97316" />
        </div>

        {/* AI Requests */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#F0F9FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284C7',
              }}
            >
              <Zap size={22} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginBottom: 2 }}>
                AI Requests
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {kpi.aiRequests.toLocaleString()}
              </div>
              {renderGrowthBadge(kpi.aiRequestsGrowth)}
            </div>
          </div>
          <MiniBarSparkline heights={kpi.aiRequestsSparkline} color="#0284C7" />
        </div>
      </div>

      {/* 3. Middle Section: Revenue Overview (Left) + Users by Plan (Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)',
          gap: 20,
          marginBottom: 24,
        }}
        className="mc-overview-two-col"
      >
        {/* Left: Revenue Overview Line Curve */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '22px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#0F172A' }}>
                Revenue Overview
              </h2>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                Total: ${Number(kpi.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })} USD
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <select
                value={revenuePeriod}
                onChange={(e) => setRevenuePeriod(e.target.value as any)}
                style={{
                  padding: '6px 28px 6px 12px',
                  borderRadius: 8,
                  border: '1px solid #E2E8F0',
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#475569',
                  background: '#F8FAFC',
                  appearance: 'none',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="This Year">This Year</option>
              </select>
              <ChevronDown
                size={14}
                color="#64748B"
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
            </div>
          </div>

          {/* SVG Area Chart with Dynamic Max Scaling */}
          <div style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <defs>
                <linearGradient id="revenueAreaGradTab" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Dynamic Horizontal Gridlines based on maxRevenueVal */}
              {gridSteps.map((val) => {
                const y = paddingTop + chartH - (val / maxRevenueVal) * chartH;
                return (
                  <g key={val}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={svgWidth - paddingRight}
                      y2={y}
                      stroke="#F1F5F9"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingLeft - 8}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="10"
                      fill="#94A3B8"
                      fontWeight="500"
                    >
                      {formatGridLabel(val)}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              {areaPath && <path d={areaPath} fill="url(#revenueAreaGradTab)" />}

              {/* Smooth line */}
              {curvePath && (
                <path
                  d={curvePath}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}

              {/* Data points & X Labels */}
              {points.map((pt, idx) => {
                const isHovered = idx === activeNodeIndex;
                return (
                  <g key={idx}>
                    <text
                      x={pt.x}
                      y={svgHeight - 10}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#64748B"
                      fontWeight={isHovered ? '600' : '500'}
                    >
                      {pt.label}
                    </text>

                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6 : 4}
                      fill="#FFFFFF"
                      stroke="#3B82F6"
                      strokeWidth={isHovered ? 3 : 2}
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={() => setHoveredNode(idx)}
                      onMouseLeave={() => setHoveredNode(null)}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Floating Pill Tooltip */}
            {activeNode && (
              <div
                style={{
                  position: 'absolute',
                  left: `${(activeNode.x / svgWidth) * 100}%`,
                  top: `${(activeNode.y / svgHeight) * 100}%`,
                  transform: 'translate(-50%, -125%)',
                  background: '#0F172A',
                  color: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  zIndex: 10,
                  textAlign: 'center',
                }}
              >
                <div style={{ color: '#94A3B8', fontSize: 10, fontWeight: 500, marginBottom: 1 }}>
                  {activeNode.date}
                </div>
                <div style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700 }}>
                  {activeNode.formatted}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: '4px solid #0F172A',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Users by Plan (Donut Chart & Legend) */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '22px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 16px 0', color: '#0F172A' }}>
            Users by Plan
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flex: 1,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div style={{ position: 'relative', width: 160, height: 160 }}>
              <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                {donutSegments.map((seg: any, idx: number) => (
                  <circle
                    key={idx}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth="14"
                    strokeDasharray={seg.strokeDasharray}
                    strokeDashoffset={seg.strokeDashoffset}
                  />
                ))}
              </svg>

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', lineHeight: 1.1 }}>
                  {(dashboardData?.usersByPlan?.totalUsers ?? kpi.totalUsers).toLocaleString()}
                </div>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>
                  Total Users
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 150 }}>
              {planList.map((item: any, idx: number) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color }} />
                    <span style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {item.count !== undefined && (
                      <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>
                        {item.count}
                      </span>
                    )}
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>
                      {item.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Recent Users (Left) + Recent Transactions (Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: 20,
        }}
        className="mc-overview-bottom-grid"
      >
        {/* Column 1: Recent Users Table */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#0F172A' }}>
              Recent Users
            </h2>
            <button
              onClick={() => onNavigateTab('users')}
              style={{
                background: 'none',
                border: 'none',
                color: '#6366F1',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 6px',
                borderRadius: 4,
              }}
            >
              <span>View All</span>
              <span>→</span>
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B' }}>
                  <th style={{ padding: '8px 6px', fontWeight: 600 }}>User</th>
                  <th style={{ padding: '8px 6px', fontWeight: 600 }}>Email</th>
                  <th style={{ padding: '8px 6px', fontWeight: 600 }}>Plan</th>
                  <th style={{ padding: '8px 6px', fontWeight: 600 }}>Joined At</th>
                  <th style={{ padding: '8px 6px', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.length > 0 ? (
                  recentUsers.map((u: any) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                      <td style={{ padding: '10px 6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {u.avatar ? (
                            <img
                              src={u.avatar}
                              alt=""
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                flexShrink: 0,
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                background: '#EEF2FF',
                                color: '#6366F1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 11,
                                fontWeight: 700,
                                flexShrink: 0,
                              }}
                            >
                              {u.initials || 'U'}
                            </div>
                          )}
                          <span style={{ fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap' }}>
                            {u.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '10px 6px', color: '#64748B', whiteSpace: 'nowrap' }}>
                        {u.email}
                      </td>
                      <td style={{ padding: '10px 6px' }}>
                        <span
                          style={{
                            background: u.planBg || '#F1F5F9',
                            color: u.planColor || '#64748B',
                            padding: '3px 8px',
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {u.plan || 'Free'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 6px', color: '#64748B', whiteSpace: 'nowrap' }}>
                        {u.joinedAt}
                      </td>
                      <td style={{ padding: '10px 6px' }}>
                        <span
                          style={{
                            background: u.status === 'Active' ? '#ECFDF5' : '#FEF2F2',
                            color: u.status === 'Active' ? '#059669' : '#DC2626',
                            padding: '3px 8px',
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {u.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ padding: '24px 6px', textAlign: 'center', color: '#94A3B8' }}>
                      {loading ? 'Loading users...' : 'No users found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Column 2: Recent Transactions Table */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#0F172A' }}>
              Recent Transactions
            </h2>
            <button
              onClick={() => onNavigateTab('subscription/history')}
              style={{
                background: 'none',
                border: 'none',
                color: '#6366F1',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 6px',
                borderRadius: 4,
              }}
            >
              <span>View All</span>
              <span>→</span>
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9', color: '#64748B' }}>
                  <th style={{ padding: '8px 6px', fontWeight: 600 }}>User</th>
                  <th style={{ padding: '8px 6px', fontWeight: 600 }}>Plan</th>
                  <th style={{ padding: '8px 6px', fontWeight: 600 }}>Amount</th>
                  <th style={{ padding: '8px 6px', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '8px 6px', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((tx: any) => (
                    <tr key={tx.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                      <td style={{ padding: '10px 6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {tx.avatar ? (
                            <img
                              src={tx.avatar}
                              alt=""
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                flexShrink: 0,
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                background: '#F1F5F9',
                                color: '#475569',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 11,
                                fontWeight: 700,
                                flexShrink: 0,
                              }}
                            >
                              {(tx.name?.[0] || tx.email?.[0] || 'U').toUpperCase()}
                            </div>
                          )}
                          <div style={{ minWidth: 0 }}>
                            {tx.name && (
                              <div style={{ fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', fontSize: 12 }}>
                                {tx.name}
                              </div>
                            )}
                            <div style={{ fontWeight: tx.name ? 400 : 500, color: tx.name ? '#64748B' : '#0F172A', whiteSpace: 'nowrap', fontSize: tx.name ? 11 : 12 }}>
                              {tx.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '10px 6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                          <Crown size={14} color="#D97706" />
                          <span style={{ color: '#334155', fontWeight: 600 }}>{tx.plan || tx.type}</span>
                        </div>
                      </td>
                      <td style={{ padding: '10px 6px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>
                        {tx.amount}
                      </td>
                      <td style={{ padding: '10px 6px', color: '#64748B', whiteSpace: 'nowrap' }}>
                        {tx.date}
                      </td>
                      <td style={{ padding: '10px 6px' }}>
                        <span
                          style={{
                            background:
                              tx.status?.toLowerCase() === 'active' || tx.status?.toLowerCase() === 'paid'
                                ? '#ECFDF5'
                                : tx.status?.toLowerCase() === 'expired'
                                ? '#F1F5F9'
                                : tx.status?.toLowerCase() === 'refunded'
                                ? '#FEF2F2'
                                : '#FFFBEB',
                            color:
                              tx.status?.toLowerCase() === 'active' || tx.status?.toLowerCase() === 'paid'
                                ? '#059669'
                                : tx.status?.toLowerCase() === 'expired'
                                ? '#64748B'
                                : tx.status?.toLowerCase() === 'refunded'
                                ? '#DC2626'
                                : '#D97706',
                            padding: '3px 8px',
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {tx.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ padding: '24px 6px', textAlign: 'center', color: '#94A3B8' }}>
                      {loading ? 'Loading transactions...' : 'No transactions found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

import type { CSSProperties } from 'react';

// ============================================================================
// BASE SHIMMER PRIMITIVE
// ============================================================================
export interface ShimmerProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: CSSProperties;
}

export const Shimmer = ({
  width = '100%',
  height = 16,
  borderRadius = 6,
  className = '',
  style = {},
}: ShimmerProps) => {
  return (
    <div
      className={`mc-shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};

// ============================================================================
// KPI METRIC CARDS SKELETON
// ============================================================================
export const ShimmerStatCard = () => {
  return (
    <div className="mc-stat-card">
      <div style={{ flex: 1, minWidth: 0 }}>
        <Shimmer width="55%" height={12} style={{ marginBottom: 10 }} />
        <Shimmer width="45%" height={26} style={{ marginBottom: 8 }} />
        <Shimmer width="70%" height={11} />
      </div>
      <Shimmer
        width={42}
        height={42}
        className="mc-shimmer-circle"
        style={{ flexShrink: 0, marginLeft: 12 }}
      />
    </div>
  );
};

export const ShimmerMetricGrid = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="mc-grid-metrics">
      {Array.from({ length: count }).map((_, i) => (
        <ShimmerStatCard key={i} />
      ))}
    </div>
  );
};

// ============================================================================
// TABLE ROWS SKELETON (DESKTOP)
// ============================================================================
export interface ColumnDef {
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  hasSubtitle?: boolean;
  isBadge?: boolean;
  isAvatar?: boolean;
}

export interface ShimmerTableRowsProps {
  rows?: number;
  columns?: (string | number | ColumnDef)[];
}

export const ShimmerTableRows = ({
  rows = 5,
  columns = [
    { width: 36, align: 'center' },
    { width: '220px', hasSubtitle: true },
    { width: '100px', isBadge: true },
    { width: '120px' },
    { width: '100px' },
    { width: '70px', align: 'right' },
  ],
}: ShimmerTableRowsProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={rIdx} className="mc-skeleton-tr">
          {columns.map((col, cIdx) => {
            const def: ColumnDef =
              typeof col === 'string' || typeof col === 'number'
                ? { width: col }
                : col;

            const alignStyle: CSSProperties = {
              textAlign: def.align || 'left',
            };

            return (
              <td key={cIdx} style={alignStyle}>
                {def.hasSubtitle ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <Shimmer width={def.width || '65%'} height={14} />
                    <Shimmer width="45%" height={11} />
                  </div>
                ) : def.isBadge ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: def.align === 'center' ? 'center' : 'flex-start',
                    }}
                  >
                    <Shimmer
                      width={def.width || 75}
                      height={20}
                      className="mc-shimmer-pill"
                    />
                  </div>
                ) : def.isAvatar ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Shimmer width={34} height={34} className="mc-shimmer-circle" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
                      <Shimmer width="70%" height={13} />
                      <Shimmer width="40%" height={10} />
                    </div>
                  </div>
                ) : (
                  <Shimmer
                    width={def.width || '80%'}
                    height={14}
                    style={{
                      display: def.align === 'center' ? 'inline-block' : undefined,
                    }}
                  />
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};

// ============================================================================
// MOBILE CARDS SKELETON (< 768px)
// ============================================================================
export interface ShimmerMobileCardProps {
  rowsCount?: number;
  hasTags?: boolean;
}

export const ShimmerMobileCard = ({
  rowsCount = 3,
  hasTags = true,
}: ShimmerMobileCardProps) => {
  return (
    <div className="mc-mobile-card">
      {/* Header */}
      <div className="mc-mobile-card-header">
        <div style={{ flex: 1, minWidth: 0 }}>
          <Shimmer width="60%" height={15} style={{ marginBottom: 6 }} />
          <Shimmer width="40%" height={12} />
        </div>
        <Shimmer width={64} height={20} className="mc-shimmer-pill" />
      </div>

      {/* Body Rows */}
      <div className="mc-mobile-card-body">
        {Array.from({ length: rowsCount }).map((_, i) => (
          <div key={i} className="mc-mobile-card-row">
            <Shimmer width="30%" height={11} />
            <Shimmer width="45%" height={12} />
          </div>
        ))}

        {hasTags && (
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <Shimmer width={50} height={18} className="mc-shimmer-pill" />
            <Shimmer width={60} height={18} className="mc-shimmer-pill" />
            <Shimmer width={40} height={18} className="mc-shimmer-pill" />
          </div>
        )}
      </div>
    </div>
  );
};

export const ShimmerMobileCardList = ({
  count = 4,
  rowsCount = 3,
  hasTags = true,
}: {
  count?: number;
  rowsCount?: number;
  hasTags?: boolean;
}) => {
  return (
    <div className="mc-mobile-card-list">
      {Array.from({ length: count }).map((_, i) => (
        <ShimmerMobileCard key={i} rowsCount={rowsCount} hasTags={hasTags} />
      ))}
    </div>
  );
};

// ============================================================================
// SUBSCRIPTION TIER PLAN CARDS SKELETON
// ============================================================================
export const ShimmerPlanCards = ({ count = 3 }: { count?: number }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
        gap: 16,
        marginBottom: 24,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="mc-shimmer-card"
          style={{
            padding: 24,
            minHeight: 280,
            justifyContent: 'space-between',
          }}
        >
          <div>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 16,
              }}
            >
              <div style={{ flex: 1 }}>
                <Shimmer width="50%" height={18} style={{ marginBottom: 6 }} />
                <Shimmer width="35%" height={12} />
              </div>
              <Shimmer width={65} height={20} className="mc-shimmer-pill" />
            </div>

            {/* Price */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <Shimmer width={80} height={32} />
                <Shimmer width={40} height={14} />
              </div>
              <Shimmer width="45%" height={11} style={{ marginTop: 6 }} />
            </div>

            {/* Features List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Shimmer width={14} height={14} className="mc-shimmer-circle" />
                <Shimmer width="80%" height={12} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Shimmer width={14} height={14} className="mc-shimmer-circle" />
                <Shimmer width="70%" height={12} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Shimmer width={14} height={14} className="mc-shimmer-circle" />
                <Shimmer width="85%" height={12} />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Shimmer width="100%" height={38} borderRadius={8} />
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// FULL DASHBOARD SCREEN SKELETON (INITIAL VERIFY / LOAD)
// ============================================================================
export const ShimmerDashboardScreen = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--mc-bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top skeleton bar */}
      <header
        style={{
          height: 60,
          background: '#FFFFFF',
          borderBottom: '1px solid var(--mc-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Shimmer width={110} height={26} borderRadius={6} />
          <Shimmer width={140} height={20} className="mc-shimmer-pill" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Shimmer width={130} height={28} borderRadius={6} />
          <Shimmer width={32} height={32} className="mc-shimmer-circle" />
        </div>
      </header>

      {/* Main Skeleton Content Area */}
      <main
        style={{
          padding: '24px',
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Banner shimmer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div>
            <Shimmer width={220} height={24} style={{ marginBottom: 8 }} />
            <Shimmer width={320} height={14} />
          </div>
          <Shimmer width={130} height={36} borderRadius={8} />
        </div>

        {/* 4 Metric Cards */}
        <ShimmerMetricGrid count={4} />

        {/* Main Table Skeleton Card */}
        <div
          className="mc-card-table"
          style={{
            marginTop: 24,
            background: '#FFFFFF',
            border: '1px solid var(--mc-border)',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--mc-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <Shimmer width={180} height={18} style={{ marginBottom: 6 }} />
              <Shimmer width={240} height={12} />
            </div>
            <Shimmer width={90} height={30} borderRadius={6} />
          </div>

          <div className="mc-table-wrap">
            <table className="mc-table">
              <thead>
                <tr>
                  <th style={{ width: 40 }}><Shimmer width={20} height={12} /></th>
                  <th><Shimmer width={100} height={12} /></th>
                  <th><Shimmer width={80} height={12} /></th>
                  <th><Shimmer width={110} height={12} /></th>
                  <th><Shimmer width={90} height={12} /></th>
                  <th style={{ textAlign: 'right' }}><Shimmer width={60} height={12} /></th>
                </tr>
              </thead>
              <tbody>
                <ShimmerTableRows rows={6} />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shimmer;

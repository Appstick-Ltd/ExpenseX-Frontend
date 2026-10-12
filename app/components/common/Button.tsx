'use client';
import React from 'react';
import { RefreshCw } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 12px', fontSize: 12, borderRadius: 6, gap: 5 },
  md: { padding: '8px 16px', fontSize: 13, borderRadius: 8, gap: 6 },
  lg: { padding: '10px 24px', fontSize: 14, borderRadius: 10, gap: 8 },
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'mc-btn-primary',
  secondary: 'mc-btn-secondary',
  danger: '',
};

const DANGER_STYLE: React.CSSProperties = {
  border: '1px solid #FECACA',
  background: '#FEF2F2',
  color: '#DC2626',
  cursor: 'pointer',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  fullWidth = false,
  children,
  disabled,
  className,
  style,
  ...rest
}: ButtonProps) {
  const sizeStyle = SIZE_STYLES[size];
  const variantClass = VARIANT_CLASS[variant];

  const mergedStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'auto',
    height: 'auto',
    ...sizeStyle,
    ...(variant === 'danger' ? DANGER_STYLE : {}),
    ...style,
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={[variantClass, className].filter(Boolean).join(' ')}
      style={mergedStyle}
      {...rest}
    >
      {loading ? <RefreshCw size={sizeStyle.fontSize} className="mc-spin" /> : icon}
      {children && <span>{children}</span>}
    </button>
  );
}

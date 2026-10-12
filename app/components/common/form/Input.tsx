'use client';
import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      leftIcon,
      rightIcon,
      error,
      helperText,
      containerClassName = '',
      containerStyle,
      showPasswordToggle = false,
      type = 'text',
      className = '',
      style,
      required,
      id,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = id || (typeof label === 'string' ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

    const isPasswordType = type === 'password' || showPasswordToggle;
    const computedType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className={`mc-input-group ${containerClassName}`} style={containerStyle}>
        {label && (
          <label htmlFor={generatedId} className="mc-label">
            {label}
            {required && <span style={{ color: '#EF4444', marginLeft: 4 }}>*</span>}
          </label>
        )}

        <div className="mc-input-wrapper" style={{ position: 'relative' }}>
          {leftIcon && <div className="mc-input-icon-left">{leftIcon}</div>}

          <input
            ref={ref}
            id={generatedId}
            type={computedType}
            required={required}
            className={`mc-input ${leftIcon ? 'with-left-icon' : ''} ${className}`}
            style={{
              borderColor: error ? '#EF4444' : undefined,
              paddingRight: isPasswordType || rightIcon ? 42 : undefined,
              ...style,
            }}
            {...rest}
          />

          {isPasswordType ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                zIndex: 5,
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          ) : rightIcon ? (
            <div
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                color: '#64748B',
                zIndex: 5,
              }}
            >
              {rightIcon}
            </div>
          ) : null}
        </div>

        {error && (
          <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#EF4444', fontWeight: 500 }}>
            {error}
          </p>
        )}

        {!error && helperText && (
          <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#64748B' }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;

'use client';
import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName = '',
      containerStyle,
      className = '',
      style,
      required,
      id,
      rows = 3,
      ...rest
    },
    ref
  ) => {
    const generatedId = id || (typeof label === 'string' ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

    return (
      <div className={`mc-input-group ${containerClassName}`} style={containerStyle}>
        {label && (
          <label htmlFor={generatedId} className="mc-label">
            {label}
            {required && <span style={{ color: '#EF4444', marginLeft: 4 }}>*</span>}
          </label>
        )}

        <div className="mc-input-wrapper">
          <textarea
            ref={ref}
            id={generatedId}
            rows={rows}
            required={required}
            className={`mc-input ${className}`}
            style={{
              height: 'auto',
              minHeight: 88,
              paddingTop: 10,
              paddingBottom: 10,
              borderColor: error ? '#EF4444' : undefined,
              ...style,
            }}
            {...rest}
          />
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

Textarea.displayName = 'Textarea';
export default Textarea;

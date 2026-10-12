'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  sublabel?: string;
  badge?: string;
  disabled?: boolean;
}

export type RawSelectOption = SelectOption | string | number;

export interface SelectProps {
  label?: React.ReactNode;
  options: RawSelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: any) => void;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  className?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  name?: string;
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select an option...',
  leftIcon,
  error,
  helperText,
  required,
  disabled = false,
  searchable,
  dropdownPosition = 'auto',
  className = '',
  containerClassName = '',
  containerStyle,
  name,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number>(
    value !== undefined ? value : defaultValue !== undefined ? defaultValue : ''
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [computedPlacement, setComputedPlacement] = useState<'top' | 'bottom'>('bottom');

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync internal value with controlled value
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Normalize options into uniform SelectOption shape
  const normalizedOptions: SelectOption[] = useMemo(() => {
    return (options || []).map((opt) => {
      if (typeof opt === 'object' && opt !== null && 'value' in opt) {
        return opt as SelectOption;
      }
      return {
        value: String(opt),
        label: String(opt),
      };
    });
  }, [options]);

  const selectedOption = useMemo(() => {
    return normalizedOptions.find((opt) => String(opt.value) === String(internalValue));
  }, [normalizedOptions, internalValue]);

  // Determine if search bar should show (searchable === true OR options count > 7)
  const isSearchEnabled = searchable ?? normalizedOptions.length > 7;

  // Filtered options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return normalizedOptions;
    const q = searchQuery.toLowerCase();
    return normalizedOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        (opt.sublabel && opt.sublabel.toLowerCase().includes(q)) ||
        String(opt.value).toLowerCase().includes(q)
    );
  }, [normalizedOptions, searchQuery]);

  // Dynamically calculate whether dropdown opens at 'top' or 'bottom'
  const calculatePosition = () => {
    if (dropdownPosition === 'top') {
      setComputedPlacement('top');
      return;
    }
    if (dropdownPosition === 'bottom') {
      setComputedPlacement('bottom');
      return;
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const itemCount = Math.max(1, normalizedOptions.length);
      const searchHeight = isSearchEnabled ? 45 : 0;
      const estimatedHeight = Math.min(280, itemCount * 42 + searchHeight + 16);
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Only open to TOP if there's genuinely not enough room below for the actual content height, and top has more room
      if (spaceBelow < estimatedHeight && spaceAbove > spaceBelow) {
        setComputedPlacement('top');
      } else {
        setComputedPlacement('bottom');
      }
    }
  };

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      calculatePosition();
      setIsOpen(true);
      setSearchQuery('');
    } else {
      setIsOpen(false);
    }
  };

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && isSearchEnabled) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, isSearchEnabled]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', calculatePosition, true);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen]);

  const handleSelectOption = (opt: SelectOption) => {
    if (opt.disabled) return;
    setInternalValue(opt.value);
    setIsOpen(false);
    if (onChange) {
      onChange(opt.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (!isOpen) {
        e.preventDefault();
        handleToggle();
      }
    }
  };

  const generatedId = id || (typeof label === 'string' ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

  return (
    <div
      ref={containerRef}
      className={`mc-input-group ${containerClassName}`}
      style={{ position: 'relative', ...containerStyle }}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden input for HTML form submission */}
      {name && <input type="hidden" name={name} value={internalValue} />}

      {label && (
        <label htmlFor={generatedId} className="mc-label">
          {label}
          {required && <span style={{ color: '#EF4444', marginLeft: 4 }}>*</span>}
        </label>
      )}

      {/* Select Trigger Box */}
      <div
        id={generatedId}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={handleToggle}
        className={`mc-input ${leftIcon ? 'with-left-icon' : ''} ${className}`}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: error ? '#EF4444' : isOpen ? '#6D3DF5' : '#CBD5E1',
          boxShadow: isOpen ? '0 0 0 3px rgba(109, 61, 245, 0.16)' : undefined,
          userSelect: 'none',
          paddingRight: 14,
          position: 'relative',
        }}
      >
        {leftIcon && (
          <div className="mc-input-icon-left" style={{ pointerEvents: 'none' }}>
            {leftIcon}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1,
            color: selectedOption ? '#0F172A' : '#94A3B8',
          }}
        >
          {selectedOption?.icon && (
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              {selectedOption.icon}
            </span>
          )}
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 14 }}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.badge && (
            <span
              style={{
                fontSize: 11,
                padding: '2px 6px',
                borderRadius: 4,
                background: '#F1F5F9',
                color: '#475569',
                fontWeight: 600,
              }}
            >
              {selectedOption.badge}
            </span>
          )}
        </div>

        <ChevronDown
          size={16}
          style={{
            color: isOpen ? '#6D3DF5' : '#64748B',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease, color 0.2s ease',
            flexShrink: 0,
            marginLeft: 8,
          }}
        />
      </div>

      {/* DYNAMIC OPTIONS DROPDOWN (Supports Dynamic TOP or BOTTOM placement) */}
      {isOpen && (
        <div
          ref={dropdownRef}
          role="listbox"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            ...(computedPlacement === 'top'
              ? { bottom: 'calc(100% + 6px)' }
              : { top: 'calc(100% + 6px)' }),
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            zIndex: 9999,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 280,
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          {/* Dynamic Search Bar (shown when list has many items or searchable=true) */}
          {isSearchEnabled && (
            <div
              style={{
                padding: '8px 10px',
                borderBottom: '1px solid #F1F5F9',
                background: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                position: 'sticky',
                top: 0,
                zIndex: 2,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Search size={14} color="#94A3B8" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: 13,
                  color: '#0F172A',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          )}

          {/* Options List */}
          <div
            style={{
              overflowY: 'auto',
              maxHeight: isSearchEnabled ? 230 : 280,
              padding: '4px',
            }}
          >
            {filteredOptions.length === 0 ? (
              <div
                style={{
                  padding: '14px 16px',
                  textAlign: 'center',
                  fontSize: 13,
                  color: '#94A3B8',
                }}
              >
                No options found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = String(opt.value) === String(internalValue);
                return (
                  <div
                    key={String(opt.value)}
                    role="option"
                    aria-selected={isSelected}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectOption(opt);
                    }}
                    style={{
                      padding: '9px 12px',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: opt.disabled ? 'not-allowed' : 'pointer',
                      opacity: opt.disabled ? 0.5 : 1,
                      background: isSelected ? 'rgba(109, 61, 245, 0.08)' : 'transparent',
                      color: isSelected ? '#6D3DF5' : '#1E293B',
                      fontSize: 13.5,
                      fontWeight: isSelected ? 600 : 400,
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected && !opt.disabled) {
                        e.currentTarget.style.background = '#F8FAFC';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected && !opt.disabled) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
                      {opt.icon && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', color: isSelected ? '#6D3DF5' : '#64748B' }}>
                          {opt.icon}
                        </span>
                      )}
                      <div>
                        <div>{opt.label}</div>
                        {opt.sublabel && (
                          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 400, marginTop: 1 }}>
                            {opt.sublabel}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                      {opt.badge && (
                        <span
                          style={{
                            fontSize: 10,
                            padding: '1px 5px',
                            borderRadius: 4,
                            background: isSelected ? '#6D3DF5' : '#F1F5F9',
                            color: isSelected ? '#FFFFFF' : '#475569',
                            fontWeight: 600,
                          }}
                        >
                          {opt.badge}
                        </span>
                      )}
                      {isSelected && <Check size={16} color="#6D3DF5" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

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
};

export default Select;

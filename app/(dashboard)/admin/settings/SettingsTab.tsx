'use client';
import React, { useEffect, useState } from 'react';
import GeneralSettings from './page';
import EmailSettings from './email-settings/page';
import PageSettings from './page-settings/page';
import FaqSettings from './faq/page';
import {
  Sliders,
  Mail,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { triggerHaptic } from '../../../helpers/haptics';

export type SettingsSubTab = 'general-settings' | 'email-settings' | 'page-settings' | 'faq';

export interface SettingsTabProps {
  subTab?: string;
  onSubTabChange?: (tab: string) => void;
}

const SUB_TABS: Array<{ id: SettingsSubTab; label: string; icon: React.ElementType }> = [
  { id: 'general-settings', label: 'General Settings', icon: Sliders },
  { id: 'email-settings', label: 'Email Settings', icon: Mail },
  { id: 'page-settings', label: 'Page Settings', icon: FileText },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

export const SettingsTab: React.FC<SettingsTabProps> = ({ subTab, onSubTabChange }) => {
  const normalizeSubTab = (val?: string): SettingsSubTab => {
    if (!val) return 'general-settings';
    const lower = val.toLowerCase().replace(/^\/+/, '');
    if (lower === 'email' || lower === 'email-settings') return 'email-settings';
    if (lower === 'page' || lower === 'pages' || lower === 'page-settings') return 'page-settings';
    if (lower === 'faq' || lower === 'faqs') return 'faq';
    return 'general-settings';
  };

  const [activeSubTab, setActiveSubTab] = useState<SettingsSubTab>(() => normalizeSubTab(subTab));

  useEffect(() => {
    if (subTab) {
      setActiveSubTab(normalizeSubTab(subTab));
    }
  }, [subTab]);

  const handleSelectSubTab = (id: SettingsSubTab) => {
    triggerHaptic('selection');
    setActiveSubTab(id);
    if (onSubTabChange) {
      onSubTabChange(id);
    } else if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/admin/settings/${id}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Navigation Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#FFFFFF',
          padding: 8,
          borderRadius: 12,
          border: '1px solid var(--mc-border)',
          overflowX: 'auto',
          boxShadow: 'var(--mc-shadow-sm)',
        }}
      >
        {SUB_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelectSubTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: isActive ? 'var(--mc-brand-purple)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'var(--mc-text-muted)',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active View */}
      {activeSubTab === 'general-settings' && <GeneralSettings />}
      {activeSubTab === 'email-settings' && <EmailSettings />}
      {activeSubTab === 'page-settings' && <PageSettings />}
      {activeSubTab === 'faq' && <FaqSettings />}
    </div>
  );
};

export default SettingsTab;

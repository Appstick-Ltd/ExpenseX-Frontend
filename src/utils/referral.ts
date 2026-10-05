/**
 * Referral Tracking Utility for ExpenseX AI
 * Detects referral codes in URL (e.g. ?referral_code=BU322681),
 * persists them across sessions in localStorage/sessionStorage,
 * and supplies them to the early access registration payload.
 */

const REFERRAL_STORAGE_KEY = 'expensex_referral_code';

/**
 * Capture referral code from URL query parameters (?referral_code=... or ?ref=...)
 * and persist to browser storage.
 */
export function captureReferralCodeFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    // 1. Standard search params
    let code: string | null = null;
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      code =
        params.get('referral_code') ||
        params.get('ref') ||
        params.get('referral');
    }

    // 2. Direct href regex fallback (handles URLs without slash like :5173?referral_code=...)
    if (!code && window.location.href) {
      const match = window.location.href.match(/[?&]referral_code=([^&#\s]+)/i);
      if (match && match[1]) {
        code = match[1];
      }
    }

    // 3. Hash query fallback (e.g. #/?referral_code=...)
    if (!code && window.location.hash) {
      const hashMatch = window.location.hash.match(/[?&]referral_code=([^&#\s]+)/i);
      if (hashMatch && hashMatch[1]) {
        code = hashMatch[1];
      }
    }

    if (code && code.trim().length > 0) {
      const cleanCode = decodeURIComponent(code.trim()).toUpperCase();
      try {
        localStorage.setItem(REFERRAL_STORAGE_KEY, cleanCode);
        sessionStorage.setItem(REFERRAL_STORAGE_KEY, cleanCode);
      } catch {
        // Handle private browsing storage exceptions gracefully
      }

      // Wipe referral query from search bar so only the clean main URL is displayed
      try {
        const cleanUrl = window.location.origin + (window.location.pathname === '/' ? '/' : window.location.pathname);
        window.history.replaceState(null, '', cleanUrl);
      } catch {
        // Fallback
      }

      return cleanCode;
    }
  } catch (err) {
    console.error('Failed to parse referral code from URL:', err);
  }

  return null;
}

/**
 * Get active referral code from storage or current URL.
 * Returns empty string if no referral code exists.
 */
export function getStoredReferralCode(): string {
  if (typeof window === 'undefined') return '';

  try {
    // 1. Check storage first
    const fromStorage =
      localStorage.getItem(REFERRAL_STORAGE_KEY) ||
      sessionStorage.getItem(REFERRAL_STORAGE_KEY);
    if (fromStorage && fromStorage.trim().length > 0) {
      return fromStorage.trim().toUpperCase();
    }

    // 2. Check current URL if not yet saved
    const fromUrl = captureReferralCodeFromUrl();
    if (fromUrl) return fromUrl;
  } catch {
    // Fallback
  }

  return '';
}

/**
 * Persist referral code manually
 */
export function setStoredReferralCode(code: string): void {
  if (typeof window === 'undefined') return;
  try {
    const clean = code.trim().toUpperCase();
    if (clean) {
      localStorage.setItem(REFERRAL_STORAGE_KEY, clean);
      sessionStorage.setItem(REFERRAL_STORAGE_KEY, clean);
    } else {
      localStorage.removeItem(REFERRAL_STORAGE_KEY);
      sessionStorage.removeItem(REFERRAL_STORAGE_KEY);
    }
  } catch {
    // Fallback
  }
}

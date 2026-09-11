/**
 * ExpenseX AI API Service
 * Handles all network requests to the ExpenseX backend.
 */

// Dynamically read the base URL from local storage, Vite environment, or fall back to local/production endpoint
export function getApiBaseUrl(): string {
  try {
    const saved = localStorage.getItem('expensex_api_base_url');
    if (saved && saved.trim()) return saved.trim().replace(/\/+$/, '');
  } catch {}
  const raw = import.meta.env.VITE_API_BASE_URL || 'https://api.xpenstick.appstick.com.bd/api/v1';
  return raw.replace(/\/+$/, '');
}

export function setApiBaseUrl(url: string): void {
  try {
    if (!url) {
      localStorage.removeItem('expensex_api_base_url');
    } else {
      localStorage.setItem('expensex_api_base_url', url.trim().replace(/\/+$/, ''));
    }
  } catch {}
}

export const API_BASE_URL = getApiBaseUrl();

export interface BetaUserPayload {
  name: string;
  email: string;
  referral_code?: string;
  target_platform: 'ios' | 'android' | 'both';
  address?: string;
  like_features: string[];
}

export interface BetaUserResponse {
  success?: boolean;
  message?: string;
  data?: any;
  ticketId?: string;
  [key: string]: any;
}

/**
 * Submit early-bird / beta user information to backend
 * POST /users/bata-user
 */
export async function submitBetaUser(payload: BetaUserPayload): Promise<BetaUserResponse> {
  const endpoint = `${getApiBaseUrl()}/users/bata-user`;

  try {
    const bodyData: Record<string, any> = {
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      target_platform: payload.target_platform,
      like_features: payload.like_features,
    };

    // Only include referral_code if provided
    const cleanReferral = payload.referral_code?.trim();
    if (cleanReferral) {
      bodyData.referral_code = cleanReferral;
    }

    // Only include address if provided
    const cleanAddress = payload.address?.trim();
    if (cleanAddress) {
      bodyData.address = cleanAddress;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    // Attempt to parse JSON response
    let responseData: any = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json().catch(() => null);
    } else {
      const text = await response.text().catch(() => '');
      responseData = text ? { message: text } : null;
    }

    if (!response.ok) {
      const errorMessage =
        responseData?.message ||
        responseData?.error ||
        `Server responded with status ${response.status} (${response.statusText || 'Error'})`;
      throw new Error(errorMessage);
    }

    return responseData || { success: true };
  } catch (err: any) {
    // If it's a TypeError (e.g. Failed to fetch / CORS / connection refused)
    if (err.name === 'TypeError' && err.message?.includes('fetch')) {
      throw new Error(
        `Unable to reach server at ${API_BASE_URL}. Please ensure the backend server is running and accessible.`
      );
    }
    throw err;
  }
}

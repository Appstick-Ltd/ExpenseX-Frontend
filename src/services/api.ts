/**
 * ExpenseX AI API Service
 * Handles all network requests to the ExpenseX backend.
 */

// Dynamically read the base URL from Vite environment or fall back to local dev
const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
export const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, '');

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
  const endpoint = `${API_BASE_URL}/users/bata-user`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim().toLowerCase(),
        referral_code: payload.referral_code?.trim() || '',
        target_platform: payload.target_platform,
        address: payload.address?.trim() || '',
        like_features: payload.like_features,
      }),
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
        `Unable to reach server at ${API_BASE_URL}. Please ensure your local backend is running at http://localhost:8080.`
      );
    }
    throw err;
  }
}

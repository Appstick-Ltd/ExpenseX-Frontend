/**
 * Superadmin Portal API Service
 * Interacts with ExpenseX Backend Swagger endpoints
 */

import { getApiBaseUrl, setApiBaseUrl } from '../../services/api';

export { getApiBaseUrl, setApiBaseUrl };

const TOKEN_KEY = 'expensex_superadmin_token';
const USER_KEY = 'expensex_superadmin_user';

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string, user?: any): void {
  try {
    const cleanToken = token.trim().replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '');
    localStorage.setItem(TOKEN_KEY, cleanToken);
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Failed to persist admin token', e);
  }
}

export function getAuthorizationHeader(): string | null {
  const token = getAdminToken();
  if (!token) return null;
  const cleanToken = token.trim().replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '');
  return `Bearer ${cleanToken}`;
}

export function getStoredAdminUser(): any | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAdminSession(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Failed to clear admin session', e);
  }
}

/**
 * Authorized HTTP request wrapper
 * Automatically injects `Authorization: Bearer <accessToken>` into every request header
 */
async function adminFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const rawToken = getAdminToken();
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Inject Bearer Authorization header if admin is authenticated
  if (rawToken) {
    const cleanToken = rawToken.trim().replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '');
    headers['Authorization'] = `Bearer ${cleanToken}`;
  }

  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err: any) {
    throw new Error(
      `Cannot reach server at ${baseUrl}. (Server returned 502 Bad Gateway / Connection Refused).`
    );
  }

  let data: any = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json().catch(() => null);
  } else {
    const text = await response.text().catch(() => '');
    data = text ? { message: text } : null;
  }

  if (!response.ok) {
    if (response.status === 401) {
      // Unauthorized or expired token
      clearAdminSession();
    }
    const errMsg =
      data?.errorMessage ||
      data?.message ||
      data?.error ||
      `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errMsg);
  }

  return data as T;
}

/* ==========================================================================
   AUTHENTICATION ENDPOINTS
   ========================================================================== */

export interface LoginResponse {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: {
    accessToken?: string;
    access_token?: string;
    token?: string;
    refreshToken?: string;
    user?: {
      _id?: string;
      id?: string;
      name?: string;
      email?: string;
      role?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

export async function adminLogin(identifier: string, password: string): Promise<LoginResponse> {
  const res = await adminFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      identifier: identifier.trim(),
      password,
    }),
  });

  // Extract access token from response variations according to Swagger documentation:
  // e.g. res?.data?.accessToken, res?.data?.token, res?.accessToken
  const token =
    res?.data?.accessToken ||
    res?.data?.access_token ||
    res?.data?.token ||
    res?.accessToken ||
    res?.access_token ||
    res?.token ||
    (res as any)?.data?.jwt ||
    (res as any)?.jwt;

  const user = res?.data?.user || res?.data || (res as any)?.user;

  if (token) {
    setAdminToken(token, user);
  }

  return res;
}

export async function adminLogout(): Promise<void> {
  try {
    await adminFetch('/auth/logout', { method: 'PATCH' });
  } catch (e) {
    console.warn('Logout notification to server failed:', e);
  } finally {
    clearAdminSession();
  }
}

export async function getAdminProfile(): Promise<any> {
  return adminFetch('/users/profile', { method: 'GET' });
}

/* ==========================================================================
   BETA USERS (EARLY BIRD REGISTRATIONS)
   ========================================================================== */

export interface BetaUser {
  _id: string;
  name: string;
  email: string;
  referral_code?: string;
  target_platform: 'ios' | 'android' | 'both';
  address?: string;
  like_features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BetaUsersListResponse {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: {
    data?: BetaUser[];
    meta?: {
      page?: number;
      limit?: number;
      total?: number;
      totalPage?: number;
    };
    [key: string]: any;
  } | BetaUser[];
  [key: string]: any;
}

export async function getBetaUsers(params: {
  search?: string;
  page?: number;
  limit?: number;
  _id?: string;
} = {}): Promise<BetaUsersListResponse> {
  const q = new URLSearchParams();
  if (params.search) q.set('search', params.search);
  if (params.page) q.set('page', params.page.toString());
  if (params.limit) q.set('limit', params.limit.toString());
  if (params._id) q.set('_id', params._id);

  const qs = q.toString();
  return adminFetch(`/users/bata-user${qs ? `?${qs}` : ''}`, { method: 'GET' });
}

export async function createBetaUser(payload: {
  name: string;
  email: string;
  target_platform: 'ios' | 'android' | 'both';
  referral_code?: string;
  address?: string;
  like_features?: string[];
}): Promise<any> {
  return adminFetch('/users/bata-user', {
    method: 'POST',
    body: JSON.stringify({
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      target_platform: payload.target_platform,
      referral_code: payload.referral_code?.trim() || undefined,
      address: payload.address?.trim() || undefined,
      like_features: payload.like_features || ['Expense tracking', 'Budgeting'],
    }),
  });
}

export async function updateBetaUser(
  id: string,
  payload: {
    name?: string;
    email?: string;
    target_platform?: 'ios' | 'android' | 'both';
    referral_code?: string;
    address?: string;
    like_features?: string[];
  }
): Promise<any> {
  try {
    return await adminFetch(`/users/bata-user/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  } catch (err: any) {
    if (err?.message?.includes('404') || err?.message?.includes('Cannot PATCH') || err?.message?.includes('405')) {
      return await adminFetch(`/users/bata-user/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    }
    throw err;
  }
}

export async function deleteBetaUser(id: string): Promise<any> {
  return adminFetch(`/users/bata-user/${id}`, { method: 'DELETE' });
}

/**
 * Universal safe response list extractor that handles varied backend JSON envelopes:
 * - { data: { result: [...], meta: {...} } }
 * - { data: { data: [...], meta: {...} } }
 * - { data: [...] }
 * - { result: [...] }
 * - [...]
 */
export function extractListFromResponse<T = any>(res: any): {
  items: T[];
  total: number;
  totalPages?: number;
  page?: number;
  limit?: number;
  meta?: any;
} {
  if (!res) return { items: [], total: 0 };
  if (Array.isArray(res)) return { items: res, total: res.length };

  const d = res.data !== undefined ? res.data : res;
  const meta = d?.meta || res.meta || {};

  // 1. Mongoose Paginate V2: { docs: [...], totalDocs: 11, totalPages: 2, page: 1, limit: 10 }
  if (Array.isArray(d?.docs)) {
    const total = d.totalDocs ?? d.total ?? d.docs.length;
    return {
      items: d.docs,
      total,
      totalPages: d.totalPages ?? Math.ceil(total / (d.limit || 10)),
      page: d.page ?? 1,
      limit: d.limit ?? 10,
      meta: d,
    };
  }

  // 2. Direct Array: { data: [...] }
  if (Array.isArray(d)) {
    return { items: d, total: meta?.total ?? d.length, meta };
  }

  // 3. Nested Result: { data: { result: [...] } }
  if (Array.isArray(d?.result)) {
    return { items: d.result, total: meta?.total ?? d.total ?? d.result.length, meta };
  }

  // 4. Nested Data: { data: { data: [...] } }
  if (Array.isArray(d?.data)) {
    return { items: d.data, total: meta?.total ?? d.total ?? d.data.length, meta };
  }

  // 5. Top-level docs / result: { docs: [...] } or { result: [...] }
  if (Array.isArray(res.docs)) {
    const total = res.totalDocs ?? res.total ?? res.docs.length;
    return { items: res.docs, total, totalPages: res.totalPages, page: res.page, limit: res.limit, meta: res };
  }
  if (Array.isArray(res.result)) {
    return { items: res.result, total: meta?.total ?? res.result.length, meta };
  }

  // 6. Generic check on any object array properties
  if (d && typeof d === 'object') {
    for (const key of ['docs', 'result', 'data', 'items', 'users', 'categories', 'plans', 'history', 'list', 'bataUsers', 'betaUsers']) {
      if (Array.isArray((d as any)[key])) {
        const arr = (d as any)[key];
        const total = d.totalDocs ?? d.total ?? meta?.total ?? arr.length;
        return { items: arr, total, totalPages: d.totalPages, page: d.page, limit: d.limit, meta: d };
      }
    }
  }

  return { items: [], total: 0 };
}

/* ==========================================================================
   USER MANAGEMENT
   ========================================================================== */

export interface UserItem {
  _id: string;
  name: string;
  email: string;
  role?: string;
  phoneNumber?: string;
  isActive?: boolean;
  createdAt?: string;
  [key: string]: any;
}

export async function getUsers(params: {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
} = {}): Promise<any> {
  const q = new URLSearchParams();
  if (params.search) q.set('search', params.search);
  if (params.role) q.set('role', params.role);
  if (params.page) q.set('page', params.page.toString());
  if (params.limit) q.set('limit', params.limit.toString());

  const qs = q.toString();
  return adminFetch(`/users${qs ? `?${qs}` : ''}`, { method: 'GET' });
}

export async function createUser(payload: {
  name: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  role?: string;
}): Promise<any> {
  try {
    return await adminFetch('/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (err: any) {
    if (err?.message?.includes('404') || err?.message?.includes('Cannot POST')) {
      return await adminFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }
    throw err;
  }
}

export async function updateUser(
  id: string,
  payload: Partial<UserItem>
): Promise<any> {
  try {
    return await adminFetch(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  } catch (err: any) {
    if (err?.message?.includes('404') || err?.message?.includes('Cannot PATCH') || err?.message?.includes('405')) {
      return await adminFetch(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    }
    throw err;
  }
}

export async function deleteUser(id: string): Promise<any> {
  return adminFetch(`/users/${id}`, { method: 'DELETE' });
}

/* ==========================================================================
   DASHBOARD ANALYTICS
   ========================================================================== */

export async function getDashboardData(month?: string): Promise<any> {
  const q = month ? `?month=${encodeURIComponent(month.toLowerCase())}` : '';
  return adminFetch(`/dashboards${q}`, { method: 'GET' });
}

/* ==========================================================================
   CATEGORIES
   ========================================================================== */

export interface CategoryItem {
  _id: string;
  name: {
    en: string;
    bn?: string;
    [lang: string]: string | undefined;
  };
  description?: {
    en?: string;
    bn?: string;
    [lang: string]: string | undefined;
  };
  image?: string;
  createdAt?: string;
}

export async function getCategories(): Promise<any> {
  return adminFetch('/categories', { method: 'GET' });
}

export async function createCategory(payload: Partial<CategoryItem>): Promise<any> {
  return adminFetch('/categories', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCategory(payload: {
  _id: string;
  name?: { en?: string; bn?: string; [lang: string]: string | undefined };
  description?: { en?: string; bn?: string; [lang: string]: string | undefined };
  image?: string;
}): Promise<any> {
  return adminFetch('/categories', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteCategory(id: string): Promise<any> {
  return adminFetch(`/categories/${id}`, { method: 'DELETE' });
}

/* ==========================================================================
   SUBSCRIPTIONS
   ========================================================================== */

export interface SubscriptionPlanItem {
  _id: string;
  name: {
    en: string;
    bn?: string;
    [key: string]: any;
  } | string;
  amount: number;
  dayValue: number;
  facilities?: (string | { en?: string; bn?: string })[];
  isPopular?: boolean;
  createdAt?: string;
  [key: string]: any;
}

export async function getSubscriptionPlans(): Promise<any> {
  return adminFetch('/subscriptions/plan', { method: 'GET' });
}

export async function createSubscriptionPlan(payload: {
  name: { en: string; bn?: string };
  amount: number;
  dayValue: number;
  facilities: string[];
}): Promise<any> {
  return adminFetch('/subscriptions/plan', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateSubscriptionPlan(
  id: string,
  payload: {
    name?: { en?: string; bn?: string };
    amount?: number;
    dayValue?: number;
    facilities?: string[];
  }
): Promise<any> {
  // Try PATCH /subscriptions/plan/:id first, fallback to PATCH /subscriptions/plan with _id
  try {
    return await adminFetch(`/subscriptions/plan/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  } catch (err: any) {
    if (err?.message?.includes('404') || err?.message?.includes('Cannot PATCH')) {
      return await adminFetch('/subscriptions/plan', {
        method: 'PATCH',
        body: JSON.stringify({ _id: id, ...payload }),
      });
    }
    throw err;
  }
}

export async function deleteSubscriptionPlan(id: string): Promise<any> {
  return adminFetch(`/subscriptions/plan/${id}`, { method: 'DELETE' });
}

export async function getSubscriptionHistory(): Promise<any> {
  return adminFetch('/subscriptions/history', { method: 'GET' });
}

/* ==========================================================================
   SETTINGS & CURRENCY
   ========================================================================== */

export async function getSettings(): Promise<any> {
  return adminFetch('/settings', { method: 'GET' });
}

export async function getCurrencyRates(): Promise<any> {
  return adminFetch('/settings/currency-rate', { method: 'GET' });
}

export async function getLanguages(): Promise<any> {
  return adminFetch('/settings/languages', { method: 'GET' });
}

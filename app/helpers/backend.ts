import {
  get,
  post,
  patch,
  del,
  postForm,
  getAdminToken,
  setAdminToken,
  clearAdminSession,
  getStoredAdminUser,
} from './api';

// Re-export session helpers for backward compatibility
export {
  getAdminToken,
  setAdminToken,
  clearAdminSession,
  getStoredAdminUser,
};

/* ==========================================================================
   1. Auth & Admin Session
   ========================================================================== */
export const postLogin = (data: any) => post('/auth/login', data);

export const adminLogin = async (identifierOrData: any, pass?: string) => {
  const body =
    typeof identifierOrData === 'string'
      ? { identifier: identifierOrData, password: pass }
      : identifierOrData;

  let res: any;
  try {
    res = await post('/auth/login', body);
  } catch (err: any) {
    const msg = (err?.message || '').toLowerCase();
    if (
      msg.includes('email is required') ||
      msg.includes("unrecognized key(s) in object: 'identifier'")
    ) {
      res = await post('/auth/login', {
        email: body.identifier || body.email,
        password: body.password,
      });
    } else {
      throw err;
    }
  }

  const token =
    res?.data?.accessToken ||
    res?.data?.access_token ||
    res?.data?.token ||
    res?.accessToken ||
    res?.token;
  const user = res?.data?.user || res?.data?.userData || res?.data;

  if (token) setAdminToken(token, user);
  return res;
};

export const socialLogin = (data: any) => post('/auth/social-login', data);
export const postRegistration = (data: any) => post('/auth/register', data);
export const register = (data: any) => post('/auth/register', data);
export const postSignup = (data: any) => post('/auth/register', data);
export const sendOtp = (data: any) => post('/auth/send-otp', data);
export const checkExistence = (data: any) => post('/auth/check-existence', data);
export const refreshToken = (data?: any) => post('/auth/refresh-token', data);
export const checkToken = (data?: any) => post('/auth/check-token', data);
export const verifyOtp = (data: any) => post('/auth/forget-password/verify-otp', data);
export const resetPassword = (data: any) => post('/auth/forget-password/submit', data);
export const updatePassword = (data: any) => patch('/auth/password-update', data);

export const adminLogout = (data?: any) => {
  try {
    return patch('/auth/logout', data);
  } finally {
    clearAdminSession();
  }
};
export const logout = adminLogout;

/* ==========================================================================
   2. Users & Beta Users
   ========================================================================== */
// Admin & User Profile
export const fetchUser = (data?: any) => get('/users/profile', data);
export const getAdminProfile = (data?: any) => get('/users/profile', data);
export const updateUserProfile = (data: any) => patch('/users/profile', data);
export const updateProfile = (data: any) => patch('/users/profile', data);
export const changeEmailPhone = (data: any) => post('/users/profile/change-email-phone', data);

// System Users Management
export const getUsers = (data?: any) => get('/users', data);
export const getAllUserList = (data?: any) => get('/users', data);
export const getUser = (id: string) => get(`/users/${id}`);
export const createUser = (data: any) => post('/users', data);
export const updateUser = (data: any) => patch('/users', data);
export const deleteUser = (idOrData: any) => {
  const id = typeof idOrData === 'string' ? idOrData : (idOrData?._id || idOrData?.id);
  return del(`/users/${id}`);
};

// Beta Users Management
export const getBetaUsers = (data?: any) => get('/users/bata-user', data);
export const getBetaUser = (id: string) => get(`/users/bata-user/${id}`);
export const submitBetaUser = (data: any) => post('/users/bata-user', data);
export const createBetaUser = (data: any) => post('/users/bata-user', data);
export const updateBetaUser = (idOrData: any, payload?: any) => {
  const id = typeof idOrData === 'string' ? idOrData : (idOrData?._id || idOrData?.id);
  const body = typeof idOrData === 'string' ? payload : idOrData;
  return patch(`/users/bata-user/${id}`, body);
};
export const deleteBetaUser = (idOrData: any) => {
  const id = typeof idOrData === 'string' ? idOrData : (idOrData?._id || idOrData?.id);
  return del(`/users/bata-user/${id}`);
};

// User Rewards Management
export const getUserRewards = (data?: any) => get('/users/rewards', data);

/* ==========================================================================
   3. Dashboard & Telemetry
   ========================================================================== */
export const getDashboard = (data?: any) => get('/dashboards', data);

/* ==========================================================================
   4. Transactions
   ========================================================================== */
export const getTransactions = (data?: any) => get('/transections', data);
export const getTransaction = (id: string) => get(`/transections/${id}`);
export const addTransaction = (data: any) => post('/transections', data);
export const updateTransaction = (id: string, data: any) => patch(`/transections/${id}`, data);
export const deleteTransaction = (id: string) => del(`/transections/${id}`);

/* ==========================================================================
   5. Category Management
   ========================================================================== */
export const getCategories = (params?: any) => get('/categories', params);
export const createCategory = (data: any) => post('/categories', data);
export const updateCategory = (data: any) => patch('/categories', data);
export const deleteCategory = (id: string) => del(`/categories/${id}`);

/* ==========================================================================
   6. Subscription Management
   ========================================================================== */
export const getSubscriptionPlans = (params?: any) => get('/subscriptions/plan', params);
export const createSubscriptionPlan = (data: any) => post('/subscriptions/plan', data);
export const updateSubscriptionPlan = (data: any) => patch('/subscriptions/plan', data);
export const deleteSubscriptionPlan = (id: string) => del(`/subscriptions/public/${id}`);
export const getSubscriptionHistory = (params?: any) => get('/google-play/subscription/history', params);

/* ==========================================================================
   7. System Settings
   ========================================================================== */
// General & Site Settings
export const getSettings = (data?: any) => get('/settings', data);
export const fetchSettings = (data?: any) => get('/settings', data);
export const postSettings = (data: any) => post('/settings', data);
export const updateSystemSettings = (data: any) => post('/settings', data);
export const fetchPublicSettings = (data?: any) => get('/settings/site', data);

// Language Settings
export const getLanguages = (data?: any) => get('/settings/languages', data);
export const fetchAdminLanguages = (data?: any) => get('/settings/languages', data);
export const createLanguage = (data: any) => post('/settings/languages', data);
export const postLanguage = createLanguage;
export const updateLanguage = (id: string, data: any) => patch(`/settings/languages/${id}`, data);
export const deleteLanguage = (id: string) => del(`/settings/languages/${id}`);
export const delLanguage = deleteLanguage;

// Page Settings (Legal, Policy, Content Pages)
export const getSettingsPages = (data?: any) => get('/settings/pages', data);
export const getPageContent = (data?: any) => get('/settings/pages', data);
export const updateSettingsPage = (payload: { _id: string; status?: boolean; content?: Record<string, any> }) => {
  const strictBody: Record<string, any> = { _id: payload._id };
  if (payload.status !== undefined) strictBody.status = Boolean(payload.status);
  if (payload.content !== undefined) strictBody.content = payload.content;
  return patch('/settings/pages', strictBody);
};
export const updatePageContent = (data: any) => updateSettingsPage(data);

// Currency Rate Settings
export const getCurrencyRates = (data?: any) => get('/settings/currency-rate', data);
export const fetchCurrency = getCurrencyRates;
export const createCurrencyRate = (data: any) => post('/settings/currency-rate', data);
export const postCurrency = createCurrencyRate;
export const updateCurrencyRate = (idOrData: any, payload?: any) => {
  if (typeof idOrData === 'string') {
    return patch(`/settings/currency-rate`, { _id: idOrData, ...payload });
  }
  return patch('/settings/currency-rate', idOrData);
};
export const updateCurrency = updateCurrencyRate;
export const deleteCurrencyRate = (data: any) => del('/settings/currency-rate', data);
export const delCurrency = deleteCurrencyRate;

// Payment Method Settings
export const fetchAdminPaymentMethod = (data?: any) => get('/settings', { fields: 'paymentMethods', ...data });
export const postPaymentMethod = (data: any) => post('/settings', data);
export const delPaymentMethod = (data?: any) => post('/settings', data);

// FAQ Management
export const getFaqs = (data?: any) => get('/faqs', data);
export const createFaq = (data: any) => post('/faqs', data);
export const updateFaq = (data: any) => patch('/faqs', data);
export const deleteFaq = (data: any) => del('/faqs', typeof data === 'string' ? { _id: data } : data);

// Notification Settings
export const getNotificationSettings = (data?: any) => get('/notifications/settings', data);
export const updateNotificationSettings = (data: any) => patch('/notifications/settings', data);

/* ==========================================================================
   8. AI Assistant
   ========================================================================== */
export const assistantChat = (data: any) => post('/assistant', data);
export const getCalibrationPendingSurveys = (data?: any) => get('/assistant/calibration/pending-surveys', data);
export const postCalibrationFeedback = (decisionId: string, data: any) => post(`/assistant/calibration/${decisionId}/feedback`, data);
export const getCalibrationProfile = (data?: any) => get('/assistant/calibration/profile', data);
export const getCalibrationDecisions = (data?: any) => get('/assistant/calibration/decisions', data);

/* ==========================================================================
   9. File Upload
   ========================================================================== */
export const postSingleImage = (data: any) => {
  if (data instanceof FormData) return postForm('/files/single-image-upload', data);
  if (data?.image instanceof File) {
    const fd = new FormData();
    fd.append('image', data.image);
    if (data.image_file_name) fd.append('image_file_name', data.image_file_name);
    return postForm('/files/single-image-upload', fd);
  }
  return postForm('/files/single-image-upload', data);
};

export const singlePDFUpload = (data: any) => postForm('/files/single-pdf-upload', data);

export const postMultipleImage = (data: any) => {
  if (data instanceof FormData) return postForm('/files/multiple-image-upload', data);
  if (Array.isArray(data?.images)) {
    const fd = new FormData();
    data.images.forEach((f: File) => fd.append('images', f));
    if (data.image_file_name) fd.append('image_file_name', data.image_file_name);
    return postForm('/files/multiple-image-upload', fd);
  }
  return postForm('/files/multiple-image-upload', data);
};

export const deleteImage = (fileUrl: string) => del('/files/file-remove', { file: fileUrl });

/* ==========================================================================
   10. Data Utilities
   ========================================================================== */
export function extractListFromResponse<T = any>(res: any): {
  items: T[];
  total: number;
  totalPages?: number;
} {
  if (!res) return { items: [], total: 0 };
  if (Array.isArray(res)) return { items: res, total: res.length };
  const payload = res?.data !== undefined ? res.data : res;
  if (Array.isArray(payload)) return { items: payload, total: payload.length };
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.data)) {
      return {
        items: payload.data,
        total: payload.meta?.total ?? payload.data.length,
        totalPages: payload.meta?.totalPage,
      };
    }
    if (Array.isArray(payload.items)) {
      return {
        items: payload.items,
        total: payload.total ?? payload.items.length,
        totalPages: payload.totalPages,
      };
    }
    if (Array.isArray(payload.docs)) {
      return {
        items: payload.docs,
        total: payload.totalDocs ?? payload.docs.length,
        totalPages: payload.totalPages,
      };
    }
  }
  return { items: [], total: 0 };
}

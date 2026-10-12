import axios from "axios";

// Read API URL from NEXT_PUBLIC_API_BASE_URL or VITE_API_BASE_URL in .env
const getBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL

  if (!url) throw new Error("API base URL is not defined. Set NEXT_PUBLIC_API_BASE_URL in your .env file.");

  return url.trim().replace(/\/+$/, "") + "/";
};

const API_URL = getBaseUrl();

const axiosApi = axios.create({
  baseURL: API_URL,
  validateStatus: function (status) {
    return status >= 200 && status < 600;
  },
});

// Automatically inject JWT Bearer Authorization header if logged in
axiosApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      localStorage.getItem("expensex_superadmin_token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("isLogged");
    if (token && token !== "true") {
      const clean = token.replace(/^Bearer\s+/i, "").replace(/^"+|"+$/g, "");
      config.headers = config.headers ?? ({} as any);
      config.headers.Authorization = `Bearer ${clean}`;
    }
  }
  return config;
});

axiosApi.interceptors.response.use(
  (response) => {
    if (response.status === 401 || response.status === 403) {
      const msg = response.data?.msg?.toLowerCase() || response.data?.message?.toLowerCase() || "";
      if (msg.includes("suspended") || msg.includes("unauthorized") || msg.includes("invalid token") || msg.includes("jwt expired")) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("isLogged");
          localStorage.removeItem("expensex_superadmin_token");
          localStorage.removeItem("expensex_superadmin_user");
          if (window.location.pathname !== "/signin" && window.location.pathname !== "/login" && window.location.pathname !== "/mc-portal/auth") {
            window.location.href = "/mc-portal";
          }
        }
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const updateRequest = (url: string, data?: any) => {
  axiosApi.defaults.headers.common["Content-Type"] = "application/json";
  let variables = url.match(/:[a-zA-Z_]+/g);
  if (variables?.length && data && typeof data === "object") {
    variables.forEach((variable) => {
      const key = variable.replace(":", "");
      if (data[key] !== undefined) {
        url = url.replace(variable, encodeURIComponent(String(data[key])));
        delete data[key];
      }
    });
  }
  return { url, data };
};

export async function get(url: string, data?: any, config: any = {}) {
  let { url: newUrl, data: newData } = updateRequest(url, data ? { ...data } : undefined);
  return await axiosApi
    .get(newUrl, { ...config, params: newData })
    .then((response) => response.data);
}

export async function post(url: string, data?: any, config: any = {}) {
  let { url: newUrl, data: newData } = updateRequest(url, data);
  return axiosApi
    .post(newUrl, newData, { ...config })
    .then((response) => response.data);
}

export async function postForm(url: string, data: any, config: any = {}) {
  let formData = data instanceof FormData ? data : convertObjectToFormData(data);
  return axiosApi
    .post(url, formData, {
      ...config,
      headers: { ...(config.headers || {}), "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);
}

export async function patch(url: string, data?: any, config: any = {}) {
  let { url: newUrl, data: newData } = updateRequest(url, data);
  return axiosApi
    .patch(newUrl, newData, { ...config })
    .then((response) => response.data);
}

export async function del(url: string, data?: any, config: any = {}) {
  let { url: newUrl, data: newData } = updateRequest(url, data ? { ...data } : undefined);
  return await axiosApi
    .delete(newUrl, { ...config, params: newData })
    .then((response) => response.data);
}

export const convertObjectToFormData = (object: any) => {
  let form_data = new FormData();
  for (let key in object) {
    if (object[key] !== null && object[key] !== undefined) {
      if (Array.isArray(object[key])) {
        object[key].forEach((item: any) => {
          form_data.append(key, item);
        });
      } else {
        form_data.append(key, object[key]);
      }
    }
  }
  return form_data;
};


export const getAdminToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("expensex_superadmin_token");
};

export const setAdminToken = (token: string, user?: any): void => {
  if (typeof window === "undefined") return;
  const clean = token.replace(/^Bearer\s+/i, "").replace(/^"+|"+$/g, "");
  localStorage.setItem("expensex_superadmin_token", clean);
  localStorage.setItem("isLogged", "true");
  if (user) {
    localStorage.setItem("expensex_superadmin_user", JSON.stringify(user));
  }
};

export const getStoredAdminUser = (): any | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("expensex_superadmin_user");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearAdminSession = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("expensex_superadmin_token");
  localStorage.removeItem("expensex_superadmin_user");
  localStorage.removeItem("isLogged");
};

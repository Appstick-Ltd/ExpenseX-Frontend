(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/context/PortalAuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PortalAuthProvider",
    ()=>PortalAuthProvider,
    "usePortalAuth",
    ()=>usePortalAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$backend$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/helpers/backend.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/helpers/api.ts [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const PortalAuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const PortalAuthProvider = ({ children })=>{
    _s();
    const [token, setTokenState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PortalAuthProvider.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAdminToken"])()
    }["PortalAuthProvider.useState"]);
    const [user, setUserState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PortalAuthProvider.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getStoredAdminUser"])()
    }["PortalAuthProvider.useState"]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PortalAuthProvider.useState": ()=>!!(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAdminToken"])()
    }["PortalAuthProvider.useState"]);
    const refreshProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PortalAuthProvider.useCallback[refreshProfile]": async ()=>{
            const currentToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAdminToken"])();
            if (!currentToken) {
                setUserState(null);
                setIsLoading(false);
                return;
            }
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$backend$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAdminProfile"])();
                const profile = res?.data?.user || res?.data || res?.user || res;
                if (profile && typeof profile === 'object' && Object.keys(profile).length > 0) {
                    setUserState(profile);
                }
            } catch (err) {
                console.warn('Admin token validation check:', err);
                const errMsg = (err?.message || '').toLowerCase();
                // Only clear the session if the backend explicitly rejected authentication (401 Unauthorized / Token Expired)
                if (errMsg.includes('401') || errMsg.includes('unauthorized') || errMsg.includes('jwt expired') || errMsg.includes('invalid token')) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["clearAdminSession"])();
                    setTokenState(null);
                    setUserState(null);
                } else {
                    // Retain cached admin user if server is unreachable or returned 404 for profile endpoint
                    const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getStoredAdminUser"])();
                    if (stored) {
                        setUserState(stored);
                    }
                }
            } finally{
                setIsLoading(false);
            }
        }
    }["PortalAuthProvider.useCallback[refreshProfile]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PortalAuthProvider.useEffect": ()=>{
            if (token) {
                refreshProfile();
            } else {
                setIsLoading(false);
            }
        }
    }["PortalAuthProvider.useEffect"], [
        refreshProfile,
        token
    ]);
    const login = async (identifier, pass)=>{
        setIsLoading(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$backend$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["adminLogin"])(identifier, pass);
            const retrievedToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAdminToken"])();
            setTokenState(retrievedToken);
            const retrievedUser = res?.data?.user || res?.data || (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getStoredAdminUser"])();
            setUserState(retrievedUser);
            return res;
        } finally{
            setIsLoading(false);
        }
    };
    const logout = async ()=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$backend$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["adminLogout"])();
        } finally{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["clearAdminSession"])();
            setTokenState(null);
            setUserState(null);
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PortalAuthContext.Provider, {
        value: {
            token,
            user,
            isAuthenticated: !!token,
            isLoading,
            login,
            logout,
            refreshProfile
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/PortalAuthContext.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PortalAuthProvider, "05Cgx7zGG9+mwze9zwM3ccua85s=");
_c = PortalAuthProvider;
function usePortalAuth() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PortalAuthContext);
    if (!ctx) {
        throw new Error('usePortalAuth must be used within a PortalAuthProvider');
    }
    return ctx;
}
_s1(usePortalAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "PortalAuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/helpers/api.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAdminSession",
    ()=>clearAdminSession,
    "convertObjectToFormData",
    ()=>convertObjectToFormData,
    "del",
    ()=>del,
    "deleted",
    ()=>deleted,
    "dels",
    ()=>dels,
    "get",
    ()=>get,
    "getAdminToken",
    ()=>getAdminToken,
    "getApiBaseUrl",
    ()=>getApiBaseUrl,
    "getStoredAdminUser",
    ()=>getStoredAdminUser,
    "newPost",
    ()=>newPost,
    "patch",
    ()=>patch,
    "patchForm",
    ()=>patchForm,
    "post",
    ()=>post,
    "postForm",
    ()=>postForm,
    "put",
    ()=>put,
    "setAdminToken",
    ()=>setAdminToken,
    "setApiBaseUrl",
    ()=>setApiBaseUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$backend$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/helpers/backend.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__import$2e$meta__ = {
    get url () {
        return __turbopack_context__.F("app/helpers/api.ts");
    },
    env: {
        DEV: true,
        PROD: false,
        MODE: "development",
        BASE_URL: "/",
        SSR: false
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
// Read API URL from environment variables or fallback to local port 8080 or live production endpoint
const getBaseUrl = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const saved = localStorage.getItem("expensex_api_base_url");
        if (saved && saved.trim()) return saved.trim().replace(/\/+$/, "") + "/";
    }
    const envUrl = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && (("TURBOPACK compile-time value", "http://localhost:8080/api/v1") || ("TURBOPACK compile-time value", "http://localhost:8080/") || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env?.VITE_API_BASE_URL) || ("TURBOPACK compile-time value", "object") !== "undefined" && __TURBOPACK__import$2e$meta__?.env?.VITE_API_BASE_URL;
    if (envUrl && envUrl.trim()) {
        const trimmed = envUrl.trim().replace(/\/+$/, "");
        return (trimmed.endsWith("/api/v1") ? trimmed : `${trimmed}/api/v1`).replace(/([^:]\/)\/+/g, "$1") + "/";
    }
    if ("TURBOPACK compile-time truthy", 1) {
        const host = window.location.hostname;
        if (host === "localhost" || host === "127.0.0.1") {
            return "http://localhost:8080/api/v1/";
        }
    }
    return "https://api.xpenstick.appstick.com.bd/api/v1/";
};
const API_URL = getBaseUrl();
const axiosApi = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_URL,
    withCredentials: true,
    validateStatus: function(status) {
        return status >= 200 && status < 600;
    }
});
// Automatically inject JWT Bearer Authorization header if logged in
axiosApi.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const token = localStorage.getItem("expensex_superadmin_token") || localStorage.getItem("token") || localStorage.getItem("isLogged");
        if (token && token !== "true") {
            const clean = token.replace(/^Bearer\s+/i, "").replace(/^"+|"+$/g, "");
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${clean}`;
        }
    }
    return config;
});
axiosApi.interceptors.response.use((response)=>{
    if (response.status === 401 || response.status === 403) {
        const msg = response.data?.msg?.toLowerCase() || response.data?.message?.toLowerCase() || "";
        if (msg.includes("suspended") || msg.includes("unauthorized") || msg.includes("invalid token") || msg.includes("jwt expired")) {
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem("isLogged");
                localStorage.removeItem("expensex_superadmin_token");
                localStorage.removeItem("expensex_superadmin_user");
                if (window.location.pathname !== "/signin" && window.location.pathname !== "/login" && window.location.pathname !== "/admin/auth") {
                    window.location.href = "/admin";
                }
            }
        }
    }
    return response;
}, (error)=>{
    return Promise.reject(error);
});
const updateRequest = (url, data)=>{
    axiosApi.defaults.headers.common["Content-Type"] = "application/json";
    let variables = url.match(/:[a-zA-Z_]+/g);
    if (variables?.length && data && typeof data === "object") {
        variables.forEach((variable)=>{
            const key = variable.replace(":", "");
            if (data[key] !== undefined) {
                url = url.replace(variable, encodeURIComponent(String(data[key])));
                delete data[key];
            }
        });
    }
    return {
        url,
        data
    };
};
async function get(url, data, config = {}) {
    let { url: newUrl, data: newData } = updateRequest(url, data ? {
        ...data
    } : undefined);
    return await axiosApi.get(newUrl, {
        ...config,
        params: newData
    }).then((response)=>response.data);
}
async function post(url, data, config = {}) {
    let { url: newUrl, data: newData } = updateRequest(url, data);
    return axiosApi.post(newUrl, newData, {
        ...config
    }).then((response)=>response.data);
}
async function postForm(url, data, config = {}) {
    let formData = data instanceof FormData ? data : convertObjectToFormData(data);
    return axiosApi.post(url, formData, {
        ...config,
        headers: {
            ...config.headers || {},
            "Content-Type": "multipart/form-data"
        }
    }).then((response)=>response.data);
}
async function patchForm(url, data, config = {}) {
    let formData = data instanceof FormData ? data : convertObjectToFormData(data);
    return axiosApi.patch(url, formData, {
        ...config,
        headers: {
            ...config.headers || {},
            "Content-Type": "multipart/form-data"
        }
    }).then((response)=>response.data);
}
async function put(url, data, config = {}) {
    let { url: newUrl, data: newData } = updateRequest(url, data);
    return axiosApi.put(newUrl, newData, {
        ...config
    }).then((response)=>response.data);
}
async function patch(url, data, config = {}) {
    let { url: newUrl, data: newData } = updateRequest(url, data);
    return axiosApi.patch(newUrl, newData, {
        ...config
    }).then((response)=>response.data);
}
async function del(url, data, config = {}) {
    let { url: newUrl, data: newData } = updateRequest(url, data ? {
        ...data
    } : undefined);
    return await axiosApi.delete(newUrl, {
        ...config,
        params: newData
    }).then((response)=>response.data);
}
async function dels(url, data, config = {}) {
    let { url: newUrl, data: newData } = updateRequest(url, data);
    return await axiosApi.delete(newUrl, {
        data: newData,
        ...config
    }).then((response)=>response.data);
}
async function newPost(url, data, config = {}) {
    let { url: newUrl, data: newData } = updateRequest(url, data);
    return await axiosApi.post(newUrl, {
        ...config,
        params: newData
    }).then((response)=>response.data);
}
async function deleted(url, data, config = {}) {
    let { url: newUrl, data: newData } = updateRequest(url, data);
    return await axiosApi.delete(newUrl, {
        ...config,
        data: newData
    }).then((response)=>response.data);
}
const convertObjectToFormData = (object)=>{
    let form_data = new FormData();
    for(let key in object){
        if (object[key] !== null && object[key] !== undefined) {
            if (Array.isArray(object[key])) {
                object[key].forEach((item)=>{
                    form_data.append(key, item);
                });
            } else {
                form_data.append(key, object[key]);
            }
        }
    }
    return form_data;
};
const getApiBaseUrl = ()=>getBaseUrl();
const setApiBaseUrl = (url)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        if (url) localStorage.setItem("expensex_api_base_url", url.trim().replace(/\/+$/, ""));
        else localStorage.removeItem("expensex_api_base_url");
    }
};
const getAdminToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("expensex_superadmin_token");
};
const setAdminToken = (token, user)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const clean = token.replace(/^Bearer\s+/i, "").replace(/^"+|"+$/g, "");
    localStorage.setItem("expensex_superadmin_token", clean);
    localStorage.setItem("isLogged", "true");
    if (user) {
        localStorage.setItem("expensex_superadmin_user", JSON.stringify(user));
    }
};
const getStoredAdminUser = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = localStorage.getItem("expensex_superadmin_user");
    try {
        return raw ? JSON.parse(raw) : null;
    } catch  {
        return null;
    }
};
const clearAdminSession = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem("expensex_superadmin_token");
    localStorage.removeItem("expensex_superadmin_user");
    localStorage.removeItem("isLogged");
};
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/helpers/backend.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addTransaction",
    ()=>addTransaction,
    "adminLogin",
    ()=>adminLogin,
    "adminLogout",
    ()=>adminLogout,
    "assistantChat",
    ()=>assistantChat,
    "changeEmailPhone",
    ()=>changeEmailPhone,
    "checkExistence",
    ()=>checkExistence,
    "checkToken",
    ()=>checkToken,
    "createBetaUser",
    ()=>createBetaUser,
    "createCategory",
    ()=>createCategory,
    "createCurrencyRate",
    ()=>createCurrencyRate,
    "createLanguage",
    ()=>createLanguage,
    "createSubscription",
    ()=>createSubscription,
    "createSubscriptionPlan",
    ()=>createSubscriptionPlan,
    "createUser",
    ()=>createUser,
    "delCategory",
    ()=>delCategory,
    "delCurrency",
    ()=>delCurrency,
    "delFaq",
    ()=>delFaq,
    "delLanguage",
    ()=>delLanguage,
    "delPaymentMethod",
    ()=>delPaymentMethod,
    "delSubscription",
    ()=>delSubscription,
    "deleteBetaUser",
    ()=>deleteBetaUser,
    "deleteCategory",
    ()=>deleteCategory,
    "deleteCurrencyRate",
    ()=>deleteCurrencyRate,
    "deleteImage",
    ()=>deleteImage,
    "deleteLanguage",
    ()=>deleteLanguage,
    "deleteSubscriptionPlan",
    ()=>deleteSubscriptionPlan,
    "deleteTransaction",
    ()=>deleteTransaction,
    "deleteUser",
    ()=>deleteUser,
    "extractListFromResponse",
    ()=>extractListFromResponse,
    "fetchAdminLanguages",
    ()=>fetchAdminLanguages,
    "fetchAdminPaymentMethod",
    ()=>fetchAdminPaymentMethod,
    "fetchAllSubscription",
    ()=>fetchAllSubscription,
    "fetchCurrency",
    ()=>fetchCurrency,
    "fetchEmailSettings",
    ()=>fetchEmailSettings,
    "fetchFaq",
    ()=>fetchFaq,
    "fetchPublicSettings",
    ()=>fetchPublicSettings,
    "fetchSettings",
    ()=>fetchSettings,
    "fetchUser",
    ()=>fetchUser,
    "getAdminProfile",
    ()=>getAdminProfile,
    "getAllUserList",
    ()=>getAllUserList,
    "getBetaUser",
    ()=>getBetaUser,
    "getBetaUsers",
    ()=>getBetaUsers,
    "getCalibrationDecisions",
    ()=>getCalibrationDecisions,
    "getCalibrationPendingSurveys",
    ()=>getCalibrationPendingSurveys,
    "getCalibrationProfile",
    ()=>getCalibrationProfile,
    "getCategories",
    ()=>getCategories,
    "getCurrencyRates",
    ()=>getCurrencyRates,
    "getDashboard",
    ()=>getDashboard,
    "getLanguages",
    ()=>getLanguages,
    "getNotificationSettings",
    ()=>getNotificationSettings,
    "getPageContent",
    ()=>getPageContent,
    "getSettings",
    ()=>getSettings,
    "getSettingsPages",
    ()=>getSettingsPages,
    "getSubscriptionHistory",
    ()=>getSubscriptionHistory,
    "getSubscriptionPlans",
    ()=>getSubscriptionPlans,
    "getTransaction",
    ()=>getTransaction,
    "getTransactions",
    ()=>getTransactions,
    "getUser",
    ()=>getUser,
    "getUserSubscriptionPlans",
    ()=>getUserSubscriptionPlans,
    "getUsers",
    ()=>getUsers,
    "logout",
    ()=>logout,
    "postCalibrationFeedback",
    ()=>postCalibrationFeedback,
    "postCategory",
    ()=>postCategory,
    "postCurrency",
    ()=>postCurrency,
    "postEmailSettings",
    ()=>postEmailSettings,
    "postFaq",
    ()=>postFaq,
    "postLanguage",
    ()=>postLanguage,
    "postLogin",
    ()=>postLogin,
    "postMultipleImage",
    ()=>postMultipleImage,
    "postPaymentMethod",
    ()=>postPaymentMethod,
    "postRegistration",
    ()=>postRegistration,
    "postSettings",
    ()=>postSettings,
    "postSignup",
    ()=>postSignup,
    "postSingleImage",
    ()=>postSingleImage,
    "postSubscription",
    ()=>postSubscription,
    "refreshToken",
    ()=>refreshToken,
    "register",
    ()=>register,
    "resetPassword",
    ()=>resetPassword,
    "sendOtp",
    ()=>sendOtp,
    "singlePDFUpload",
    ()=>singlePDFUpload,
    "socialLogin",
    ()=>socialLogin,
    "submitBetaUser",
    ()=>submitBetaUser,
    "updateBetaUser",
    ()=>updateBetaUser,
    "updateCategory",
    ()=>updateCategory,
    "updateCurrency",
    ()=>updateCurrency,
    "updateCurrencyRate",
    ()=>updateCurrencyRate,
    "updateLanguage",
    ()=>updateLanguage,
    "updateNotificationSettings",
    ()=>updateNotificationSettings,
    "updatePageContent",
    ()=>updatePageContent,
    "updatePassword",
    ()=>updatePassword,
    "updateProfile",
    ()=>updateProfile,
    "updateSettingsPage",
    ()=>updateSettingsPage,
    "updateSubscriptionPlan",
    ()=>updateSubscriptionPlan,
    "updateSystemSettings",
    ()=>updateSystemSettings,
    "updateTransaction",
    ()=>updateTransaction,
    "updateUser",
    ()=>updateUser,
    "updateUserProfile",
    ()=>updateUserProfile,
    "verifyOtp",
    ()=>verifyOtp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/helpers/api.ts [app-client] (ecmascript) <locals>");
;
;
;
const assistantChat = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/assistant', data);
const getCalibrationPendingSurveys = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/assistant/calibration/pending-surveys', data);
const postCalibrationFeedback = (decisionId, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])(`/assistant/calibration/${decisionId}/feedback`, data);
const getCalibrationProfile = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/assistant/calibration/profile', data);
const getCalibrationDecisions = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/assistant/calibration/decisions', data);
const postLogin = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/login', data);
const adminLogin = async (identifierOrData, pass)=>{
    const body = typeof identifierOrData === 'string' ? {
        identifier: identifierOrData,
        password: pass
    } : identifierOrData;
    let res;
    try {
        res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/login', body);
    } catch (err) {
        const msg = (err?.message || '').toLowerCase();
        if (msg.includes('email is required') || msg.includes("unrecognized key(s) in object: 'identifier'")) {
            res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/login', {
                email: body.identifier || body.email,
                password: body.password
            });
        } else {
            throw err;
        }
    }
    const token = res?.data?.accessToken || res?.data?.access_token || res?.data?.token || res?.accessToken || res?.token;
    const user = res?.data?.user || res?.data?.userData || res?.data;
    if (token) (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setAdminToken"])(token, user);
    return res;
};
const socialLogin = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/social-login', data);
const postRegistration = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/register', data);
const register = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/register', data);
const postSignup = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/register', data);
const sendOtp = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/send-otp', data);
const checkExistence = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/check-existence', data);
const refreshToken = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/refresh-token', data);
const checkToken = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/check-token', data);
const verifyOtp = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/forget-password/verify-otp', data);
const resetPassword = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/auth/forget-password/submit', data);
const updatePassword = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])('/auth/password-update', data);
const adminLogout = (data)=>{
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])('/auth/logout', data);
    } finally{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["clearAdminSession"])();
    }
};
const logout = adminLogout;
const getCategories = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/categories', data);
const createCategory = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/categories', data);
const postCategory = createCategory;
const updateCategory = (idOrData, payload)=>{
    if (typeof idOrData === 'string') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])('/categories', {
            _id: idOrData,
            ...payload
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])('/categories', idOrData);
};
const deleteCategory = (idOrData)=>{
    const id = typeof idOrData === 'object' ? idOrData?._id || idOrData?.id : idOrData;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(`/categories/${id}`);
};
const delCategory = deleteCategory;
const getDashboard = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/dashboards', data);
const postSingleImage = (data)=>{
    if (data instanceof FormData) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["postForm"])('/files/single-image-upload', data);
    if (data?.image instanceof File) {
        const fd = new FormData();
        fd.append('image', data.image);
        if (data.image_file_name) fd.append('image_file_name', data.image_file_name);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["postForm"])('/files/single-image-upload', fd);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["postForm"])('/files/single-image-upload', data);
};
const singlePDFUpload = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["postForm"])('/files/single-pdf-upload', data);
const postMultipleImage = (data)=>{
    if (data instanceof FormData) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["postForm"])('/files/multiple-image-upload', data);
    if (Array.isArray(data?.images)) {
        const fd = new FormData();
        data.images.forEach((f)=>fd.append('images', f));
        if (data.image_file_name) fd.append('image_file_name', data.image_file_name);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["postForm"])('/files/multiple-image-upload', fd);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["postForm"])('/files/multiple-image-upload', data);
};
const deleteImage = (fileUrl)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])('/files/file-remove', {
        file: fileUrl
    });
const getNotificationSettings = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/notifications/settings', data);
const updateNotificationSettings = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])('/notifications/settings', data);
const fetchSettings = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/settings', data);
const getSettings = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/settings', data);
const postSettings = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/settings', data);
const updateSystemSettings = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/settings', data);
const fetchPublicSettings = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/settings/site', data);
const getLanguages = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/settings/languages', data);
const fetchAdminLanguages = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/settings/languages', data);
const createLanguage = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/settings/languages', data);
const postLanguage = createLanguage;
const updateLanguage = (id, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])(`/settings/languages/${id}`, data);
const deleteLanguage = (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(`/settings/languages/${id}`);
const delLanguage = deleteLanguage;
const getSettingsPages = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/settings/pages', data);
const updateSettingsPage = (payload)=>{
    const strictBody = {
        _id: payload._id
    };
    if (payload.status !== undefined) strictBody.status = Boolean(payload.status);
    if (payload.content !== undefined) strictBody.content = payload.content;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])('/settings/pages', strictBody);
};
const getPageContent = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/settings/pages', data);
const updatePageContent = (data)=>updateSettingsPage(data);
const getCurrencyRates = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/settings/currency-rate', data);
const fetchCurrency = getCurrencyRates;
const createCurrencyRate = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/settings/currency-rate', data);
const postCurrency = createCurrencyRate;
const updateCurrencyRate = (idOrData, payload)=>{
    if (typeof idOrData === 'string') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])(`/settings/currency-rate`, {
            _id: idOrData,
            ...payload
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])('/settings/currency-rate', idOrData);
};
const updateCurrency = updateCurrencyRate;
const deleteCurrencyRate = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])('/settings/currency-rate', data);
const delCurrency = deleteCurrencyRate;
const fetchEmailSettings = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/settings', {
        fields: 'siteEmail,mailHost,mailPort,mailUser,mailPass,mailSecure',
        ...data
    });
const postEmailSettings = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/settings', data);
const fetchAdminPaymentMethod = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/settings', {
        fields: 'paymentMethods',
        ...data
    });
const postPaymentMethod = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/settings', data);
const delPaymentMethod = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/settings', data);
const fetchFaq = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/settings/pages', {
        slug: 'faq',
        ...data
    });
const postFaq = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/settings', data);
const delFaq = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/settings', data);
const getSubscriptionPlans = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/subscriptions/plan', data);
const fetchAllSubscription = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/subscriptions/plan', data);
const createSubscriptionPlan = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/subscriptions/plan', data);
const postSubscription = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/subscriptions/plan', data);
const updateSubscriptionPlan = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])('/subscriptions/plan', data);
const getUserSubscriptionPlans = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/subscriptions/plan/user', data);
const deleteSubscriptionPlan = (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(`/subscriptions/public/${id}`);
const delSubscription = (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(`/subscriptions/public/${id}`);
const createSubscription = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/subscriptions', data);
const getSubscriptionHistory = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/subscriptions/history', data);
const getTransactions = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/transections', data);
const addTransaction = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/transections', data);
const getTransaction = (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])(`/transections/${id}`);
const updateTransaction = (id, data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])(`/transections/${id}`, data);
const deleteTransaction = (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(`/transections/${id}`);
const fetchUser = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/users/profile', data);
const getAdminProfile = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/users/profile', data);
const updateUserProfile = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])('/users/profile', data);
const updateProfile = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])('/users/profile', data);
const changeEmailPhone = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/users/profile/change-email-phone', data);
const getUsers = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/users', data);
const getAllUserList = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/users', data);
const createUser = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/users', data);
const getUser = (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])(`/users/${id}`);
const updateUser = (idOrData, payload)=>{
    const id = typeof idOrData === 'string' ? idOrData : idOrData?._id || idOrData?.id;
    const body = typeof idOrData === 'string' ? payload : idOrData;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])(`/users/${id}`, body);
};
const deleteUser = (idOrData)=>{
    const id = typeof idOrData === 'string' ? idOrData : idOrData?._id || idOrData?.id;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(`/users/${id}`);
};
const getBetaUsers = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])('/users/bata-user', data);
const submitBetaUser = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/users/bata-user', data);
const createBetaUser = (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["post"])('/users/bata-user', data);
const getBetaUser = (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["get"])(`/users/bata-user/${id}`);
const updateBetaUser = (idOrData, payload)=>{
    const id = typeof idOrData === 'string' ? idOrData : idOrData?._id || idOrData?.id;
    const body = typeof idOrData === 'string' ? payload : idOrData;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["patch"])(`/users/bata-user/${id}`, body);
};
const deleteBetaUser = (idOrData)=>{
    const id = typeof idOrData === 'string' ? idOrData : idOrData?._id || idOrData?.id;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$helpers$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(`/users/bata-user/${id}`);
};
function extractListFromResponse(res) {
    if (!res) return {
        items: [],
        total: 0
    };
    if (Array.isArray(res)) return {
        items: res,
        total: res.length
    };
    const payload = res?.data !== undefined ? res.data : res;
    if (Array.isArray(payload)) return {
        items: payload,
        total: payload.length
    };
    if (payload && typeof payload === 'object') {
        if (Array.isArray(payload.data)) {
            return {
                items: payload.data,
                total: payload.meta?.total ?? payload.data.length,
                totalPages: payload.meta?.totalPage
            };
        }
        if (Array.isArray(payload.items)) {
            return {
                items: payload.items,
                total: payload.total ?? payload.items.length,
                totalPages: payload.totalPages
            };
        }
        if (Array.isArray(payload.docs)) {
            return {
                items: payload.docs,
                total: payload.totalDocs ?? payload.docs.length,
                totalPages: payload.totalPages
            };
        }
    }
    return {
        items: [],
        total: 0
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_0oug9cd._.js.map
(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/(admin-group)/admin-panel/login/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Login
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$2d$group$292f$admin$2d$panel$2f$slice$2f$AdminSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin-group)/admin-panel/slice/AdminSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Login() {
    _s();
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000";
    console.log("baseUrl login page", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    let loginData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "Login.useSelector[loginData]": (myAllState)=>{
            return myAllState.loginStore.adminDetails;
        }
    }["Login.useSelector[loginData]"]);
    // No need to create admin user in localStorage since we're using API now
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            console.log('🔄 Attempting admin login to:', "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], "/api/backend/adminAuth/login"));
            console.log('👤 Username:', username);
            console.log('🔑 Password:', password ? '[HIDDEN]' : '[EMPTY]');
            console.log('📤 Request payload:', {
                adminName: username,
                adminPassword: password
            });
            // API call for admin login
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], "/api/backend/adminAuth/login"), {
                adminName: username,
                adminPassword: password
            });
            console.log('✅ Admin login response:', response.data);
            console.log('📊 Response status:', response.status);
            console.log('📋 Response headers:', response.headers);
            // Check if login was successful
            if (response.data.success === false) {
                setError(response.data.message || "Login failed. Please check your credentials.");
                setLoading(false);
                return;
            }
            // Login successful
            const adminData = {
                _id: response.data.admin._id,
                adminName: response.data.admin.adminName,
                name: 'Admin User',
                email: 'admin@admin.com',
                role: "admin",
                status: 'approved'
            };
            console.log("Login - Admin data to store:", adminData);
            // Clear any existing admin cookie first
            document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$2d$group$292f$admin$2d$panel$2f$slice$2f$AdminSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveLoginDetails"])({
                admin: adminData
            }));
            console.log("Login - Redirecting to dashboard");
            router.push("/admin-panel/dashboard");
        } catch (error) {
            console.error('❌ Admin login error:', error);
            if (error.response) {
                let errorMessage;
                if (error.response.status === 401) {
                    errorMessage = "Invalid username or password. Please check your credentials.";
                } else if (error.response.status === 400) {
                    errorMessage = "Please provide both username and password.";
                } else {
                    var _error_response_data;
                    errorMessage = ((_error_response_data = error.response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || "Login failed. Please try again.";
                }
                setError(errorMessage);
                console.error('Server error:', error.response.data);
            } else if (error.request) {
                setError("Network error. Please check your connection and try again.");
                console.error('Network error:', error.request);
            } else {
                setError("Login failed. Please try again.");
                console.error('Other error:', error.message);
            }
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Login.useEffect": ()=>{
            setIsClient(true);
            // Clear any old admin data that doesn't have role
            const adminData = document.cookie.split('; ').find({
                "Login.useEffect.adminData": (row)=>row.startsWith('admin=')
            }["Login.useEffect.adminData"]);
            if (adminData) {
                try {
                    const admin = JSON.parse(decodeURIComponent(adminData.split('=')[1]));
                    if (!admin.role) {
                        console.log("Clearing old admin data without role");
                        document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    }
                } catch (error) {
                    console.log("Error parsing admin data, clearing cookie");
                    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }
            }
        }
    }["Login.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Login.useEffect": ()=>{
            if (isClient && loginData) {
            // router.push("/admin-panel/dashboard");
            }
        }
    }["Login.useEffect"], [
        isClient,
        loginData,
        router
    ]);
    // Don't render until client-side hydration is complete
    if (!isClient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-8 rounded-lg shadow-md w-full max-w-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 bg-gray-200 rounded mb-6"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 134,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4 bg-gray-200 rounded mb-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 135,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-10 bg-gray-200 rounded mb-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 136,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4 bg-gray-200 rounded mb-6"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 137,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-10 bg-gray-200 rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 138,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                    lineNumber: 133,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                lineNumber: 132,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
            lineNumber: 131,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "bg-white p-8 rounded-lg shadow-md w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold mb-6 text-center text-gray-800",
                    children: "Admin Panel Login"
                }, void 0, false, {
                    fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                    lineNumber: 151,
                    columnNumber: 17
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                    lineNumber: 154,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-gray-700 mb-2",
                            children: "Username"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 160,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: username,
                            onChange: (e)=>setUsername(e.target.value),
                            className: "w-full border rounded px-3 py-2",
                            required: true,
                            autoComplete: "username",
                            disabled: loading,
                            placeholder: "admin"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 161,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                    lineNumber: 159,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-gray-700 mb-2",
                            children: "Password"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 174,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                value: password,
                                onChange: (e)=>setPassword(e.target.value),
                                className: "w-full border rounded px-3 py-2",
                                required: true,
                                autoComplete: "current-password",
                                disabled: loading,
                                placeholder: "admin123"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                                lineNumber: 176,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 175,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                    lineNumber: 173,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    className: "w-full text-white py-2 rounded transition ".concat(loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'),
                    disabled: loading,
                    children: loading ? "Logging in..." : "Login"
                }, void 0, false, {
                    fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                    lineNumber: 189,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 text-center text-sm text-gray-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold mb-2",
                            children: "Admin Credentials:"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 201,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Username: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono bg-gray-100 px-2 py-1 rounded",
                                    children: "admin"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                                    lineNumber: 202,
                                    columnNumber: 34
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 202,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Password: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono bg-gray-100 px-2 py-1 rounded",
                                    children: "admin123"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                                    lineNumber: 203,
                                    columnNumber: 34
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 203,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-500 mt-2",
                            children: "✅ Auto-created in database"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                            lineNumber: 204,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                    lineNumber: 200,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/login",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full my-[5px] mx-auto text-white py-2 rounded transition ".concat(loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'),
                        disabled: loading,
                        children: loading ? "Logging in..." : "website login"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                        lineNumber: 209,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
                    lineNumber: 207,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
            lineNumber: 147,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(admin-group)/admin-panel/login/page.js",
        lineNumber: 146,
        columnNumber: 9
    }, this);
}
_s(Login, "C63Dtp402XiH965m4IJPkEXNtwE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = Login;
var _c;
__turbopack_context__.k.register(_c, "Login");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_%28admin-group%29_admin-panel_login_page_8dfc6d78.js.map
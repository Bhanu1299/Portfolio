"use strict";
(() => {
var exports = {};
exports.id = 300;
exports.ids = [300];
exports.modules = {

/***/ 4720:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdminLogin),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2113);
/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_auth_next__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _api_auth_nextauth___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2843);
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9383);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(381);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8039);
/* harmony import */ var _components_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5467);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_5__, _components_ui_card__WEBPACK_IMPORTED_MODULE_6__, _components_ui_button__WEBPACK_IMPORTED_MODULE_7__, _components_ui_input__WEBPACK_IMPORTED_MODULE_8__, _components_ui_label__WEBPACK_IMPORTED_MODULE_9__, _components_animations__WEBPACK_IMPORTED_MODULE_10__]);
([_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_5__, _components_ui_card__WEBPACK_IMPORTED_MODULE_6__, _components_ui_button__WEBPACK_IMPORTED_MODULE_7__, _components_ui_input__WEBPACK_IMPORTED_MODULE_8__, _components_ui_label__WEBPACK_IMPORTED_MODULE_9__, _components_animations__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











function AdminLogin() {
    const { 0: formData , 1: setFormData  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        email: "",
        password: ""
    });
    const { 0: isLoading , 1: setIsLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: error , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const handleChange = (e)=>{
        const { name , value  } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: value
            }));
        setError("") // Clear error when user types
        ;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const result = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.signIn)("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false
            });
            if (result?.error) {
                setError("Invalid email or password");
            } else {
                // Check if user is active and has admin role
                const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.getSession)();
                if (session?.user?.isActive && session?.user?.role === "admin") {
                    router.push("/admin/dashboard");
                } else {
                    setError("Access denied. Admin privileges required.");
                }
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "min-h-screen flex items-center justify-center bg-background px-4",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_animations__WEBPACK_IMPORTED_MODULE_10__/* .FadeIn */ .Uo, {
            delay: 0.2,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_6__/* .Card */ .Zb, {
                className: "w-full max-w-md",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_6__/* .CardHeader */ .Ol, {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_6__/* .CardTitle */ .ll, {
                                className: "text-2xl font-bold",
                                children: "Admin Login"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_6__/* .CardDescription */ .SZ, {
                                children: "Sign in to access the admin dashboard"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_6__/* .CardContent */ .aY, {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            onSubmit: handleSubmit,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_9__/* .Label */ ._, {
                                            htmlFor: "email",
                                            children: "Email"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_input__WEBPACK_IMPORTED_MODULE_8__/* .Input */ .I, {
                                            id: "email",
                                            name: "email",
                                            type: "email",
                                            value: formData.email,
                                            onChange: handleChange,
                                            required: true,
                                            disabled: isLoading,
                                            placeholder: "admin@example.com"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_9__/* .Label */ ._, {
                                            htmlFor: "password",
                                            children: "Password"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_input__WEBPACK_IMPORTED_MODULE_8__/* .Input */ .I, {
                                            id: "password",
                                            name: "password",
                                            type: "password",
                                            value: formData.password,
                                            onChange: handleChange,
                                            required: true,
                                            disabled: isLoading,
                                            placeholder: "Enter your password"
                                        })
                                    ]
                                }),
                                error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3",
                                    children: error
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .z, {
                                    type: "submit",
                                    className: "w-full",
                                    disabled: isLoading,
                                    children: isLoading ? "Signing in..." : "Sign In"
                                })
                            ]
                        })
                    })
                ]
            })
        })
    });
}
const getServerSideProps = async (context)=>{
    const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_4__.getServerSession)(context.req, context.res, _api_auth_nextauth___WEBPACK_IMPORTED_MODULE_5__/* .authOptions */ .L);
    // If user is already logged in and is an admin, redirect to dashboard
    if (session?.user?.isActive && session?.user?.role === "admin") {
        return {
            redirect: {
                destination: "/admin/dashboard",
                permanent: false
            }
        };
    }
    return {
        props: {}
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 3227:
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ 2113:
/***/ ((module) => {

module.exports = require("next-auth/next");

/***/ }),

/***/ 7449:
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 49:
/***/ ((module) => {

module.exports = import("@radix-ui/react-label");;

/***/ }),

/***/ 7618:
/***/ ((module) => {

module.exports = import("bcryptjs");;

/***/ }),

/***/ 6926:
/***/ ((module) => {

module.exports = import("class-variance-authority");;

/***/ }),

/***/ 6593:
/***/ ((module) => {

module.exports = import("clsx");;

/***/ }),

/***/ 6197:
/***/ ((module) => {

module.exports = import("framer-motion");;

/***/ }),

/***/ 8097:
/***/ ((module) => {

module.exports = import("tailwind-merge");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [425,843,568], () => (__webpack_exec__(4720)));
module.exports = __webpack_exports__;

})();
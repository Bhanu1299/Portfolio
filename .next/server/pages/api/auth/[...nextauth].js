"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 3227:
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ 7449:
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ 7618:
/***/ ((module) => {

module.exports = import("bcryptjs");;

/***/ }),

/***/ 5677:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authOptions": () => (/* binding */ authOptions),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3227);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7449);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7618);
/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6774);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4113);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([bcryptjs__WEBPACK_IMPORTED_MODULE_2__, _models_User__WEBPACK_IMPORTED_MODULE_4__]);
([bcryptjs__WEBPACK_IMPORTED_MODULE_2__, _models_User__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const authOptions = {
    // No adapter needed with JWT strategy + Credentials
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
                // Normalize email
                const email = credentials.email.trim().toLowerCase();
                // Find user
                const user = await _models_User__WEBPACK_IMPORTED_MODULE_4__/* ["default"].findOne */ .Z.findOne({
                    email
                });
                if (!user || !user.isActive) return null;
                // Compare hashed password
                const ok = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__["default"].compare(credentials.password, user.password);
                if (!ok) return null;
                // Update last login (non-blocking)
                _models_User__WEBPACK_IMPORTED_MODULE_4__/* ["default"].updateOne */ .Z.updateOne({
                    _id: user._id
                }, {
                    $set: {
                        lastLogin: new Date()
                    }
                }).catch(()=>{});
                // Minimal token payload
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    isActive: user.isActive
                };
            }
        })
    ],
    callbacks: {
        async jwt ({ token , user  }) {
            if (user) {
                token.role = user.role;
                token.isActive = user.isActive;
            }
            return token;
        },
        async session ({ session , token  }) {
            if (session.user) {
                session.user.id = token.sub;
                session.user.role = token.role;
                session.user.isActive = token.isActive;
            }
            return session;
        }
    },
    pages: {
        signIn: "/admin/login",
        error: "/admin/login"
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [241], () => (__webpack_exec__(5677)));
module.exports = __webpack_exports__;

})();
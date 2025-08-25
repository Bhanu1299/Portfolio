"use strict";
(() => {
var exports = {};
exports.id = 829;
exports.ids = [829];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 7618:
/***/ ((module) => {

module.exports = import("bcryptjs");;

/***/ }),

/***/ 1063:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6774);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_models__WEBPACK_IMPORTED_MODULE_1__]);
_models__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function handler(req, res) {
    await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    switch(req.method){
        case "GET":
            try {
                const { role , isActive  } = req.query;
                let query = {};
                if (role) {
                    query.role = role;
                }
                if (isActive !== undefined) {
                    query.isActive = isActive === "true";
                }
                // Exclude password from response
                const users = await _models__WEBPACK_IMPORTED_MODULE_1__/* .User.find */ .n5.find(query).select("-password").sort({
                    createdAt: -1
                }).lean();
                res.status(200).json({
                    success: true,
                    data: users
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: "Failed to fetch users"
                });
            }
            break;
        case "POST":
            try {
                const user = await _models__WEBPACK_IMPORTED_MODULE_1__/* .User.create */ .n5.create(req.body);
                // Remove password from response
                const userResponse = user.toObject();
                delete userResponse.password;
                res.status(201).json({
                    success: true,
                    data: userResponse
                });
            } catch (error1) {
                if (error1.code === 11000) {
                    res.status(400).json({
                        success: false,
                        error: "Email already exists"
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        error: "Failed to create user"
                    });
                }
            }
            break;
        default:
            res.setHeader("Allow", [
                "GET",
                "POST"
            ]);
            res.status(405).json({
                success: false,
                error: `Method ${req.method} not allowed`
            });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [241,903], () => (__webpack_exec__(1063)));
module.exports = __webpack_exports__;

})();
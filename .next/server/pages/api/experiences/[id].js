"use strict";
(() => {
var exports = {};
exports.id = 93;
exports.ids = [93];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 7618:
/***/ ((module) => {

module.exports = import("bcryptjs");;

/***/ }),

/***/ 5388:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6774);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5903);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_models__WEBPACK_IMPORTED_MODULE_1__]);
_models__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



async function handler(req, res) {
    const { id  } = req.query;
    // Validate MongoDB ObjectId
    if (!mongoose__WEBPACK_IMPORTED_MODULE_2___default().Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            error: "Invalid experience ID"
        });
    }
    await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    switch(req.method){
        case "GET":
            try {
                const experience = await _models__WEBPACK_IMPORTED_MODULE_1__/* .Experience.findById */ .a3.findById(id).lean();
                if (!experience) {
                    return res.status(404).json({
                        success: false,
                        error: "Experience not found"
                    });
                }
                res.status(200).json({
                    success: true,
                    data: experience
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: "Failed to fetch experience"
                });
            }
            break;
        case "PUT":
            try {
                const experience1 = await _models__WEBPACK_IMPORTED_MODULE_1__/* .Experience.findByIdAndUpdate */ .a3.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                }).lean();
                if (!experience1) {
                    return res.status(404).json({
                        success: false,
                        error: "Experience not found"
                    });
                }
                res.status(200).json({
                    success: true,
                    data: experience1
                });
            } catch (error1) {
                res.status(400).json({
                    success: false,
                    error: "Failed to update experience"
                });
            }
            break;
        case "DELETE":
            try {
                const experience2 = await _models__WEBPACK_IMPORTED_MODULE_1__/* .Experience.findByIdAndDelete */ .a3.findByIdAndDelete(id);
                if (!experience2) {
                    return res.status(404).json({
                        success: false,
                        error: "Experience not found"
                    });
                }
                res.status(200).json({
                    success: true,
                    message: "Experience deleted successfully"
                });
            } catch (error2) {
                res.status(500).json({
                    success: false,
                    error: "Failed to delete experience"
                });
            }
            break;
        default:
            res.setHeader("Allow", [
                "GET",
                "PUT",
                "DELETE"
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
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [241,903], () => (__webpack_exec__(5388)));
module.exports = __webpack_exports__;

})();
"use strict";
(() => {
var exports = {};
exports.id = 728;
exports.ids = [728];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 7618:
/***/ ((module) => {

module.exports = import("bcryptjs");;

/***/ }),

/***/ 8035:
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
            error: "Invalid project ID"
        });
    }
    await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    switch(req.method){
        case "GET":
            try {
                const project = await _models__WEBPACK_IMPORTED_MODULE_1__/* .Project.findById */ .IK.findById(id).lean();
                if (!project) {
                    return res.status(404).json({
                        success: false,
                        error: "Project not found"
                    });
                }
                res.status(200).json({
                    success: true,
                    data: project
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: "Failed to fetch project"
                });
            }
            break;
        case "PUT":
            try {
                const project1 = await _models__WEBPACK_IMPORTED_MODULE_1__/* .Project.findByIdAndUpdate */ .IK.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                }).lean();
                if (!project1) {
                    return res.status(404).json({
                        success: false,
                        error: "Project not found"
                    });
                }
                res.status(200).json({
                    success: true,
                    data: project1
                });
            } catch (error1) {
                res.status(400).json({
                    success: false,
                    error: "Failed to update project"
                });
            }
            break;
        case "DELETE":
            try {
                const project2 = await _models__WEBPACK_IMPORTED_MODULE_1__/* .Project.findByIdAndDelete */ .IK.findByIdAndDelete(id);
                if (!project2) {
                    return res.status(404).json({
                        success: false,
                        error: "Project not found"
                    });
                }
                res.status(200).json({
                    success: true,
                    message: "Project deleted successfully"
                });
            } catch (error2) {
                res.status(500).json({
                    success: false,
                    error: "Failed to delete project"
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
var __webpack_exports__ = __webpack_require__.X(0, [241,903], () => (__webpack_exec__(8035)));
module.exports = __webpack_exports__;

})();
"use strict";
(() => {
var exports = {};
exports.id = 103;
exports.ids = [103];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 7618:
/***/ ((module) => {

module.exports = import("bcryptjs");;

/***/ }),

/***/ 3476:
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
            error: "Invalid contact ID"
        });
    }
    await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    switch(req.method){
        case "GET":
            try {
                const contact = await _models__WEBPACK_IMPORTED_MODULE_1__/* .Contact.findById */ .r8.findById(id).lean();
                if (!contact) {
                    return res.status(404).json({
                        success: false,
                        error: "Contact not found"
                    });
                }
                res.status(200).json({
                    success: true,
                    data: contact
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: "Failed to fetch contact"
                });
            }
            break;
        case "PUT":
            try {
                // Only allow updating status and other admin fields
                const allowedFields = [
                    "status"
                ];
                const updateData = {};
                Object.keys(req.body).forEach((key)=>{
                    if (allowedFields.includes(key)) {
                        updateData[key] = req.body[key];
                    }
                });
                const contact1 = await _models__WEBPACK_IMPORTED_MODULE_1__/* .Contact.findByIdAndUpdate */ .r8.findByIdAndUpdate(id, updateData, {
                    new: true,
                    runValidators: true
                }).lean();
                if (!contact1) {
                    return res.status(404).json({
                        success: false,
                        error: "Contact not found"
                    });
                }
                res.status(200).json({
                    success: true,
                    data: contact1
                });
            } catch (error1) {
                res.status(400).json({
                    success: false,
                    error: "Failed to update contact"
                });
            }
            break;
        case "DELETE":
            try {
                const contact2 = await _models__WEBPACK_IMPORTED_MODULE_1__/* .Contact.findByIdAndDelete */ .r8.findByIdAndDelete(id);
                if (!contact2) {
                    return res.status(404).json({
                        success: false,
                        error: "Contact not found"
                    });
                }
                res.status(200).json({
                    success: true,
                    message: "Contact deleted successfully"
                });
            } catch (error2) {
                res.status(500).json({
                    success: false,
                    error: "Failed to delete contact"
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
var __webpack_exports__ = __webpack_require__.X(0, [241,903], () => (__webpack_exec__(3476)));
module.exports = __webpack_exports__;

})();
"use strict";
(() => {
var exports = {};
exports.id = 497;
exports.ids = [497];
exports.modules = {

/***/ 44:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ Textarea)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6269);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_utils__WEBPACK_IMPORTED_MODULE_2__]);
_lib_utils__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const Textarea = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className , ...props }, ref)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    });
});
Textarea.displayName = "Textarea";


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1458:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExperiencePage),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2113);
/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_next__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_auth_nextauth___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2843);
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9383);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(381);
/* harmony import */ var _components_ui_textarea__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(44);
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8039);
/* harmony import */ var _components_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5467);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_3__, _components_ui_card__WEBPACK_IMPORTED_MODULE_4__, _components_ui_button__WEBPACK_IMPORTED_MODULE_5__, _components_ui_input__WEBPACK_IMPORTED_MODULE_6__, _components_ui_textarea__WEBPACK_IMPORTED_MODULE_7__, _components_ui_label__WEBPACK_IMPORTED_MODULE_8__, _components_animations__WEBPACK_IMPORTED_MODULE_9__]);
([_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_3__, _components_ui_card__WEBPACK_IMPORTED_MODULE_4__, _components_ui_button__WEBPACK_IMPORTED_MODULE_5__, _components_ui_input__WEBPACK_IMPORTED_MODULE_6__, _components_ui_textarea__WEBPACK_IMPORTED_MODULE_7__, _components_ui_label__WEBPACK_IMPORTED_MODULE_8__, _components_animations__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function ExperiencePage({ initialExperience  }) {
    const { 0: experiences , 1: setExperiences  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Array.isArray(initialExperience) ? initialExperience : []);
    const { 0: isEditing , 1: setIsEditing  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: formData , 1: setFormData  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        company: "",
        position: "",
        duration: "",
        description: "",
        technologies: [],
        location: "",
        current: false
    });
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing ? `/api/experience/${isEditing}` : "/api/experience";
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    technologies: formData.technologies.filter((tech)=>tech.trim() !== "")
                })
            });
            if (response.ok) {
                const updatedExperience = await response.json();
                if (isEditing) {
                    setExperiences(experiences.map((exp)=>exp._id === isEditing ? updatedExperience : exp));
                } else {
                    setExperiences([
                        ...experiences,
                        updatedExperience
                    ]);
                }
                resetForm();
            }
        } catch (error) {
            console.error("Error saving experience:", error);
        }
    };
    const handleEdit = (experience)=>{
        setFormData(experience);
        setIsEditing(experience._id || null);
    };
    const handleDelete = async (id)=>{
        if (confirm("Are you sure you want to delete this experience?")) {
            try {
                const response = await fetch(`/api/experience/${id}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    setExperiences(experiences.filter((exp)=>exp._id !== id));
                }
            } catch (error) {
                console.error("Error deleting experience:", error);
            }
        }
    };
    const resetForm = ()=>{
        setFormData({
            company: "",
            position: "",
            duration: "",
            description: "",
            technologies: [],
            location: "",
            current: false
        });
        setIsEditing(null);
    };
    const handleTechnologiesChange = (value)=>{
        setFormData({
            ...formData,
            technologies: value.split(",").map((tech)=>tech.trim())
        });
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "min-h-screen bg-background p-6",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_animations__WEBPACK_IMPORTED_MODULE_9__/* .FadeIn */ .Uo, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex justify-between items-center mb-8",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: "text-3xl font-bold",
                                children: "Manage Experience"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                onClick: ()=>window.location.href = "/admin/dashboard",
                                children: "Back to Dashboard"
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_animations__WEBPACK_IMPORTED_MODULE_9__/* .FadeIn */ .Uo, {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zb, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .Ol, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ll, {
                                                children: isEditing ? "Edit Experience" : "Add New Experience"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardDescription */ .SZ, {
                                                children: isEditing ? "Update experience information" : "Add a new work experience"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .aY, {
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                            onSubmit: handleSubmit,
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_8__/* .Label */ ._, {
                                                            htmlFor: "company",
                                                            children: "Company"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .I, {
                                                            id: "company",
                                                            value: formData.company,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    company: e.target.value
                                                                }),
                                                            required: true
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_8__/* .Label */ ._, {
                                                            htmlFor: "position",
                                                            children: "Position"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .I, {
                                                            id: "position",
                                                            value: formData.position,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    position: e.target.value
                                                                }),
                                                            required: true
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_8__/* .Label */ ._, {
                                                            htmlFor: "duration",
                                                            children: "Duration"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .I, {
                                                            id: "duration",
                                                            value: formData.duration,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    duration: e.target.value
                                                                }),
                                                            placeholder: "Jan 2020 - Present",
                                                            required: true
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_8__/* .Label */ ._, {
                                                            htmlFor: "location",
                                                            children: "Location"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .I, {
                                                            id: "location",
                                                            value: formData.location,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    location: e.target.value
                                                                }),
                                                            placeholder: "San Francisco, CA"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_8__/* .Label */ ._, {
                                                            htmlFor: "description",
                                                            children: "Description"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_textarea__WEBPACK_IMPORTED_MODULE_7__/* .Textarea */ .g, {
                                                            id: "description",
                                                            value: formData.description,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    description: e.target.value
                                                                }),
                                                            rows: 4,
                                                            required: true
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_8__/* .Label */ ._, {
                                                            htmlFor: "technologies",
                                                            children: "Technologies (comma-separated)"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .I, {
                                                            id: "technologies",
                                                            value: formData.technologies.join(", "),
                                                            onChange: (e)=>handleTechnologiesChange(e.target.value),
                                                            placeholder: "React, TypeScript, Node.js"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            type: "checkbox",
                                                            id: "current",
                                                            checked: formData.current,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    current: e.target.checked
                                                                }),
                                                            className: "rounded"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_8__/* .Label */ ._, {
                                                            htmlFor: "current",
                                                            children: "Current Position"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                            type: "submit",
                                                            children: isEditing ? "Update Experience" : "Add Experience"
                                                        }),
                                                        isEditing && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                            type: "button",
                                                            variant: "outline",
                                                            onClick: resetForm,
                                                            children: "Cancel"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_animations__WEBPACK_IMPORTED_MODULE_9__/* .FadeIn */ .Uo, {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zb, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .Ol, {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ll, {
                                                children: "Current Experience"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardDescription */ .SZ, {
                                                children: "Manage your work experience"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .aY, {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "space-y-4 max-h-96 overflow-y-auto",
                                            children: experiences.map((experience)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "border rounded-lg p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex justify-between items-start mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                                            className: "font-semibold",
                                                                            children: experience.position
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                            className: "text-sm text-muted-foreground",
                                                                            children: experience.company
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex space-x-2",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                                            size: "sm",
                                                                            variant: "outline",
                                                                            onClick: ()=>handleEdit(experience),
                                                                            children: "Edit"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                                            size: "sm",
                                                                            variant: "destructive",
                                                                            onClick: ()=>handleDelete(experience._id),
                                                                            children: "Delete"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                            className: "text-sm text-muted-foreground mb-2",
                                                            children: [
                                                                experience.duration,
                                                                " • ",
                                                                experience.location
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                            className: "text-sm mb-2",
                                                            children: [
                                                                experience.description.substring(0, 100),
                                                                "..."
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "flex flex-wrap gap-1 mb-2",
                                                            children: experience.technologies.map((tech, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "px-2 py-1 bg-primary/10 text-primary text-xs rounded",
                                                                    children: tech
                                                                }, index))
                                                        }),
                                                        experience.current && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: "inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded",
                                                            children: "Current"
                                                        })
                                                    ]
                                                }, experience._id))
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            ]
        })
    });
}
const getServerSideProps = async (context)=>{
    try {
        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(context.req, context.res, _api_auth_nextauth___WEBPACK_IMPORTED_MODULE_3__/* .authOptions */ .L);
        if (!session || session.user.role !== "admin" || !session.user.isActive) {
            return {
                redirect: {
                    destination: "/admin/login",
                    permanent: false
                }
            };
        }
        try {
            const response = await fetch(`${process.env.NEXTAUTH_URL}/api/experience`);
            const experiences = response.ok ? await response.json() : [];
            return {
                props: {
                    initialExperience: Array.isArray(experiences) ? experiences : []
                }
            };
        } catch (error) {
            return {
                props: {
                    initialExperience: []
                }
            };
        }
    } catch (error1) {
        console.warn("Build-time authentication check failed:", error1);
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false
            }
        };
    }
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
var __webpack_exports__ = __webpack_require__.X(0, [425,843,568], () => (__webpack_exec__(1458)));
module.exports = __webpack_exports__;

})();
"use strict";
exports.id = 903;
exports.ids = [903];
exports.modules = {

/***/ 214:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const ContactSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email address"
        ]
    },
    subject: {
        type: String,
        trim: true,
        maxlength: 200
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    status: {
        type: String,
        enum: [
            "new",
            "read",
            "replied",
            "archived"
        ],
        default: "new"
    },
    ipAddress: {
        type: String,
        trim: true
    },
    userAgent: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});
// Create indexes for efficient querying
ContactSchema.index({
    status: 1,
    createdAt: -1
});
ContactSchema.index({
    email: 1
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Contact) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Contact", ContactSchema));


/***/ }),

/***/ 4927:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const ExperienceSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    technologies: [
        {
            type: String,
            required: true
        }
    ],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        trim: true
    },
    companyUrl: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
// Create index for ordering experiences
ExperienceSchema.index({
    order: 1,
    startDate: -1
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Experience) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Experience", ExperienceSchema));


/***/ }),

/***/ 2120:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const ProjectSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    longDescription: {
        type: String,
        trim: true
    },
    technologies: [
        {
            type: String,
            required: true
        }
    ],
    githubUrl: {
        type: String,
        trim: true
    },
    liveUrl: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
// Create index for featured projects
ProjectSchema.index({
    featured: -1,
    order: 1
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Project) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Project", ProjectSchema));


/***/ }),

/***/ 28:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const SkillSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "frontend",
            "backend",
            "database",
            "tools",
            "other"
        ]
    },
    proficiency: {
        type: String,
        required: true,
        enum: [
            "beginner",
            "intermediate",
            "advanced",
            "expert"
        ]
    },
    yearsOfExperience: {
        type: Number,
        min: 0
    },
    iconUrl: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    },
    visible: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
// Create indexes for efficient querying
SkillSchema.index({
    category: 1,
    order: 1
});
SkillSchema.index({
    visible: 1,
    category: 1
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Skill) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Skill", SkillSchema));


/***/ }),

/***/ 5903:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IK": () => (/* reexport safe */ _Project__WEBPACK_IMPORTED_MODULE_0__.Z),
/* harmony export */   "UH": () => (/* reexport safe */ _Skill__WEBPACK_IMPORTED_MODULE_2__.Z),
/* harmony export */   "a3": () => (/* reexport safe */ _Experience__WEBPACK_IMPORTED_MODULE_1__.Z),
/* harmony export */   "n5": () => (/* reexport safe */ _User__WEBPACK_IMPORTED_MODULE_4__.Z),
/* harmony export */   "r8": () => (/* reexport safe */ _Contact__WEBPACK_IMPORTED_MODULE_3__.Z)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2120);
/* harmony import */ var _Experience__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4927);
/* harmony import */ var _Skill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _Contact__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(214);
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4113);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_User__WEBPACK_IMPORTED_MODULE_4__]);
_User__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
"use strict";
(() => {
var exports = {};
exports.id = 635;
exports.ids = [635];
exports.modules = {

/***/ 4003:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UsersPage),
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
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8039);
/* harmony import */ var _components_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5467);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_3__, _components_ui_card__WEBPACK_IMPORTED_MODULE_4__, _components_ui_button__WEBPACK_IMPORTED_MODULE_5__, _components_ui_input__WEBPACK_IMPORTED_MODULE_6__, _components_ui_label__WEBPACK_IMPORTED_MODULE_7__, _components_animations__WEBPACK_IMPORTED_MODULE_8__]);
([_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_3__, _components_ui_card__WEBPACK_IMPORTED_MODULE_4__, _components_ui_button__WEBPACK_IMPORTED_MODULE_5__, _components_ui_input__WEBPACK_IMPORTED_MODULE_6__, _components_ui_label__WEBPACK_IMPORTED_MODULE_7__, _components_animations__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









function UsersPage({ initialUsers  }) {
    const { 0: users , 1: setUsers  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialUsers);
    const { 0: isLoading , 1: setIsLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: message , 1: setMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: showCreateForm , 1: setShowCreateForm  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: newUser , 1: setNewUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        email: "",
        name: "",
        role: "user",
        password: ""
    });
    const fetchUsers = async ()=>{
        try {
            const response = await fetch("/api/users");
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    const handleCreateUser = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
            if (response.ok) {
                setMessage("User created successfully!");
                setNewUser({
                    email: "",
                    name: "",
                    role: "user",
                    password: ""
                });
                setShowCreateForm(false);
                fetchUsers();
            } else {
                const error = await response.json();
                setMessage(error.message || "Failed to create user");
            }
        } catch (error1) {
            setMessage("Error creating user");
        } finally{
            setIsLoading(false);
        }
    };
    const handleToggleUserStatus = async (userId, isActive)=>{
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isActive: !isActive
                })
            });
            if (response.ok) {
                fetchUsers();
                setMessage(`User ${!isActive ? "activated" : "deactivated"} successfully!`);
            } else {
                setMessage("Failed to update user status");
            }
        } catch (error) {
            setMessage("Error updating user status");
        }
    };
    const handleDeleteUser = async (userId)=>{
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                fetchUsers();
                setMessage("User deleted successfully!");
            } else {
                setMessage("Failed to delete user");
            }
        } catch (error) {
            setMessage("Error deleting user");
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "min-h-screen bg-gray-50 py-8",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_animations__WEBPACK_IMPORTED_MODULE_8__/* .FadeIn */ .Uo, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mb-8 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                        className: "text-3xl font-bold text-gray-900",
                                        children: "User Management"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "mt-2 text-gray-600",
                                        children: "Manage user accounts and permissions"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                onClick: ()=>setShowCreateForm(!showCreateForm),
                                children: showCreateForm ? "Cancel" : "Add New User"
                            })
                        ]
                    })
                }),
                showCreateForm && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_animations__WEBPACK_IMPORTED_MODULE_8__/* .FadeIn */ .Uo, {
                    delay: 0.1,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zb, {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .Ol, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ll, {
                                        children: "Create New User"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardDescription */ .SZ, {
                                        children: "Add a new user to the system"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .aY, {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                    onSubmit: handleCreateUser,
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_7__/* .Label */ ._, {
                                                            htmlFor: "name",
                                                            children: "Name"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .I, {
                                                            id: "name",
                                                            value: newUser.name,
                                                            onChange: (e)=>setNewUser((prev)=>({
                                                                        ...prev,
                                                                        name: e.target.value
                                                                    })),
                                                            placeholder: "Full Name",
                                                            required: true
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_7__/* .Label */ ._, {
                                                            htmlFor: "email",
                                                            children: "Email"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .I, {
                                                            id: "email",
                                                            type: "email",
                                                            value: newUser.email,
                                                            onChange: (e)=>setNewUser((prev)=>({
                                                                        ...prev,
                                                                        email: e.target.value
                                                                    })),
                                                            placeholder: "user@example.com",
                                                            required: true
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_7__/* .Label */ ._, {
                                                            htmlFor: "password",
                                                            children: "Password"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .I, {
                                                            id: "password",
                                                            type: "password",
                                                            value: newUser.password,
                                                            onChange: (e)=>setNewUser((prev)=>({
                                                                        ...prev,
                                                                        password: e.target.value
                                                                    })),
                                                            placeholder: "Password",
                                                            required: true
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_label__WEBPACK_IMPORTED_MODULE_7__/* .Label */ ._, {
                                                            htmlFor: "role",
                                                            children: "Role"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                            id: "role",
                                                            value: newUser.role,
                                                            onChange: (e)=>setNewUser((prev)=>({
                                                                        ...prev,
                                                                        role: e.target.value
                                                                    })),
                                                            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                    value: "user",
                                                                    children: "User"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                    value: "admin",
                                                                    children: "Admin"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex justify-end space-x-2",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                    type: "button",
                                                    variant: "outline",
                                                    onClick: ()=>setShowCreateForm(false),
                                                    children: "Cancel"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                    type: "submit",
                                                    disabled: isLoading,
                                                    children: isLoading ? "Creating..." : "Create User"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_animations__WEBPACK_IMPORTED_MODULE_8__/* .FadeIn */ .Uo, {
                    delay: 0.2,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zb, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .Ol, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ll, {
                                        children: [
                                            "Users (",
                                            users.length,
                                            ")"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardDescription */ .SZ, {
                                        children: "Manage existing users"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .aY, {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "overflow-x-auto",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                                            className: "w-full table-auto",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("thead", {
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                        className: "border-b",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                className: "text-left py-2 px-4",
                                                                children: "Name"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                className: "text-left py-2 px-4",
                                                                children: "Email"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                className: "text-left py-2 px-4",
                                                                children: "Role"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                className: "text-left py-2 px-4",
                                                                children: "Status"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                className: "text-left py-2 px-4",
                                                                children: "Created"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                                className: "text-left py-2 px-4",
                                                                children: "Actions"
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tbody", {
                                                    children: users.map((user)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                            className: "border-b hover:bg-gray-50",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                    className: "py-3 px-4 font-medium",
                                                                    children: user.name
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                    className: "py-3 px-4",
                                                                    children: user.email
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                    className: "py-3 px-4",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: `px-2 py-1 rounded-full text-xs ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`,
                                                                        children: user.role
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                    className: "py-3 px-4",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                        className: `px-2 py-1 rounded-full text-xs ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`,
                                                                        children: user.isActive ? "Active" : "Inactive"
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                    className: "py-3 px-4 text-sm text-gray-600",
                                                                    children: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                                    className: "py-3 px-4",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                                                size: "sm",
                                                                                variant: "outline",
                                                                                onClick: ()=>handleToggleUserStatus(user._id, user.isActive),
                                                                                children: user.isActive ? "Deactivate" : "Activate"
                                                                            }),
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                                                size: "sm",
                                                                                variant: "destructive",
                                                                                onClick: ()=>handleDeleteUser(user._id),
                                                                                children: "Delete"
                                                                            })
                                                                        ]
                                                                    })
                                                                })
                                                            ]
                                                        }, user._id))
                                                })
                                            ]
                                        }),
                                        users.length === 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "text-center py-8 text-gray-500",
                                            children: "No users found. Create your first user above."
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                }),
                message && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_animations__WEBPACK_IMPORTED_MODULE_8__/* .FadeIn */ .Uo, {
                    delay: 0.3,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: `mt-4 p-4 rounded-md ${message.includes("successfully") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`,
                        children: message
                    })
                })
            ]
        })
    });
}
const getServerSideProps = async (context)=>{
    const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(context.req, context.res, _api_auth_nextauth___WEBPACK_IMPORTED_MODULE_3__/* .authOptions */ .L);
    if (!session) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false
            }
        };
    }
    // In a real app, you'd fetch users from your database
    // For now, we'll return an empty array
    const initialUsers = [];
    try {
    // You would typically fetch users here:
    // const users = await getUsersFromDatabase()
    // For now, we'll use mock data or empty array
    } catch (error) {
        console.error("Error fetching users:", error);
    }
    return {
        props: {
            initialUsers
        }
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
var __webpack_exports__ = __webpack_require__.X(0, [425,843,568], () => (__webpack_exec__(4003)));
module.exports = __webpack_exports__;

})();
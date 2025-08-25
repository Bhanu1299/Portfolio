"use strict";
(() => {
var exports = {};
exports.id = 186;
exports.ids = [186];
exports.modules = {

/***/ 8683:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContactsPage),
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
/* harmony import */ var _components_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5467);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_3__, _components_ui_card__WEBPACK_IMPORTED_MODULE_4__, _components_ui_button__WEBPACK_IMPORTED_MODULE_5__, _components_animations__WEBPACK_IMPORTED_MODULE_6__]);
([_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_3__, _components_ui_card__WEBPACK_IMPORTED_MODULE_4__, _components_ui_button__WEBPACK_IMPORTED_MODULE_5__, _components_animations__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function ContactsPage({ initialContacts  }) {
    const { 0: contacts , 1: setContacts  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialContacts);
    const { 0: selectedContact , 1: setSelectedContact  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: filter , 1: setFilter  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("all");
    const markAsRead = async (id)=>{
        try {
            const response = await fetch(`/api/contacts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    read: true
                })
            });
            if (response.ok) {
                setContacts(contacts.map((contact)=>contact._id === id ? {
                        ...contact,
                        read: true
                    } : contact));
                if (selectedContact && selectedContact._id === id) {
                    setSelectedContact({
                        ...selectedContact,
                        read: true
                    });
                }
            }
        } catch (error) {
            console.error("Error marking contact as read:", error);
        }
    };
    const deleteContact = async (id)=>{
        if (confirm("Are you sure you want to delete this contact message?")) {
            try {
                const response = await fetch(`/api/contacts/${id}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    setContacts(contacts.filter((contact)=>contact._id !== id));
                    if (selectedContact && selectedContact._id === id) {
                        setSelectedContact(null);
                    }
                }
            } catch (error) {
                console.error("Error deleting contact:", error);
            }
        }
    };
    const filteredContacts = contacts.filter((contact)=>{
        if (filter === "unread") return !contact.read;
        if (filter === "read") return contact.read;
        return true;
    });
    const unreadCount = contacts.filter((contact)=>!contact.read).length;
    const formatDate = (dateString)=>{
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "min-h-screen bg-background p-6",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_animations__WEBPACK_IMPORTED_MODULE_6__/* .FadeIn */ .Uo, {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex justify-between items-center mb-8",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                        className: "text-3xl font-bold",
                                        children: "Contact Messages"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-muted-foreground mt-1",
                                        children: [
                                            unreadCount,
                                            " unread message",
                                            unreadCount !== 1 ? "s" : ""
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                onClick: ()=>window.location.href = "/admin/dashboard",
                                children: "Back to Dashboard"
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "lg:col-span-1",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_animations__WEBPACK_IMPORTED_MODULE_6__/* .FadeIn */ .Uo, {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zb, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .Ol, {
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex justify-between items-center",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ll, {
                                                        children: "Messages"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                                size: "sm",
                                                                variant: filter === "all" ? "default" : "outline",
                                                                onClick: ()=>setFilter("all"),
                                                                children: "All"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                                size: "sm",
                                                                variant: filter === "unread" ? "default" : "outline",
                                                                onClick: ()=>setFilter("unread"),
                                                                children: [
                                                                    "Unread (",
                                                                    unreadCount,
                                                                    ")"
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                                size: "sm",
                                                                variant: filter === "read" ? "default" : "outline",
                                                                onClick: ()=>setFilter("read"),
                                                                children: "Read"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .aY, {
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "space-y-2 max-h-96 overflow-y-auto",
                                                children: [
                                                    filteredContacts.map((contact)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: `p-3 border rounded-lg cursor-pointer transition-colors ${selectedContact?._id === contact._id ? "bg-primary/10 border-primary" : "hover:bg-muted/50"} ${!contact.read ? "border-l-4 border-l-primary" : ""}`,
                                                            onClick: ()=>{
                                                                setSelectedContact(contact);
                                                                if (!contact.read) {
                                                                    markAsRead(contact._id);
                                                                }
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex justify-between items-start mb-1",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                                            className: `font-medium text-sm ${!contact.read ? "font-bold" : ""}`,
                                                                            children: contact.name
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: formatDate(contact.createdAt)
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                    className: "text-sm text-muted-foreground mb-1",
                                                                    children: contact.email
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                    className: `text-sm ${!contact.read ? "font-semibold" : ""}`,
                                                                    children: contact.subject
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                    className: "text-xs text-muted-foreground mt-1",
                                                                    children: [
                                                                        contact.message.substring(0, 50),
                                                                        "..."
                                                                    ]
                                                                })
                                                            ]
                                                        }, contact._id)),
                                                    filteredContacts.length === 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "text-center py-8 text-muted-foreground",
                                                        children: "No messages found"
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "lg:col-span-2",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_animations__WEBPACK_IMPORTED_MODULE_6__/* .FadeIn */ .Uo, {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zb, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .Ol, {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ll, {
                                                    children: selectedContact ? "Message Details" : "Select a Message"
                                                }),
                                                selectedContact && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                            size: "sm",
                                                            variant: "outline",
                                                            onClick: ()=>window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`),
                                                            children: "Reply via Email"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                                            size: "sm",
                                                            variant: "destructive",
                                                            onClick: ()=>deleteContact(selectedContact._id),
                                                            children: "Delete"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .aY, {
                                            children: selectedContact ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "grid grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                        className: "text-sm font-medium text-muted-foreground",
                                                                        children: "Name"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                        className: "font-medium",
                                                                        children: selectedContact.name
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                        className: "text-sm font-medium text-muted-foreground",
                                                                        children: "Email"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                        className: "font-medium",
                                                                        children: selectedContact.email
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                className: "text-sm font-medium text-muted-foreground",
                                                                children: "Subject"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                className: "font-medium",
                                                                children: selectedContact.subject
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                className: "text-sm font-medium text-muted-foreground",
                                                                children: "Received"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                className: "font-medium",
                                                                children: formatDate(selectedContact.createdAt)
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                className: "text-sm font-medium text-muted-foreground",
                                                                children: "Status"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                className: "font-medium",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: `inline-block px-2 py-1 text-xs rounded ${selectedContact.read ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`,
                                                                    children: selectedContact.read ? "Read" : "Unread"
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                className: "text-sm font-medium text-muted-foreground",
                                                                children: "Message"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "mt-2 p-4 bg-muted/50 rounded-lg",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                    className: "whitespace-pre-wrap",
                                                                    children: selectedContact.message
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "text-center py-12 text-muted-foreground",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    children: "Select a message from the list to view details"
                                                })
                                            })
                                        })
                                    ]
                                })
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
            const response = await fetch(`${process.env.NEXTAUTH_URL}/api/contacts`);
            const contacts = response.ok ? await response.json() : [];
            return {
                props: {
                    initialContacts: contacts
                }
            };
        } catch (error) {
            return {
                props: {
                    initialContacts: []
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

/***/ 7618:
/***/ ((module) => {

module.exports = import("bcryptjs");;

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
var __webpack_exports__ = __webpack_require__.X(0, [425,843], () => (__webpack_exec__(8683)));
module.exports = __webpack_exports__;

})();
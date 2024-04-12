"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = exports.info = exports.error = void 0;
const _1 = require(".");
function notify(str, arg1, arg2, arg3) {
    const type = typeof arg1 === "string" ? arg1 : "info";
    const data = typeof arg1 === "object" ? arg1 : typeof arg2 === "object" ? arg2 : undefined;
    const permanent = typeof arg1 === "boolean" ? arg1 : typeof arg2 === "boolean" ? arg2 : arg3 ?? false;
    ui.notifications.notify((0, _1.localize)(str, data), type, { permanent });
}
function warn(str, arg1, arg2) {
    notify(str, "warning", arg1, arg2);
}
exports.warn = warn;
function info(str, arg1, arg2) {
    notify(str, "info", arg1, arg2);
}
exports.info = info;
function error(str, arg1, arg2) {
    notify(str, "error", arg1, arg2);
}
exports.error = error;

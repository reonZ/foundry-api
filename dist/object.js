"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInstanceOf = exports.AsyncFunction = void 0;
const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
exports.AsyncFunction = AsyncFunction;
function isInstanceOf(obj, name) {
    if (typeof obj !== "object")
        return false;
    let cursor = Reflect.getPrototypeOf(obj);
    while (cursor) {
        if (cursor.constructor.name === name)
            return true;
        cursor = Reflect.getPrototypeOf(cursor);
    }
    return false;
}
exports.isInstanceOf = isInstanceOf;

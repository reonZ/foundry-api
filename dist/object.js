"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInMemory = exports.getInMemoryAndSetIfNot = exports.getInMemory = exports.isInstanceOf = exports.deleteInMemory = exports.AsyncFunction = void 0;
const module_1 = require("./module");
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
function getInMemory(obj, ...path) {
    return getProperty(obj, `modules.${module_1.MODULE.id}.${path.join(".")}`);
}
exports.getInMemory = getInMemory;
function setInMemory(obj, ...args) {
    const value = args.splice(-1)[0];
    return setProperty(obj, `modules.${module_1.MODULE.id}.${args.join(".")}`, value);
}
exports.setInMemory = setInMemory;
function getInMemoryAndSetIfNot(obj, ...args) {
    const value = args.splice(-1)[0];
    const current = getInMemory(obj, ...args);
    if (current != null)
        return current;
    // @ts-ignore
    const result = typeof value === "function" ? value() : value;
    setInMemory(obj, ...args, result);
    return result;
}
exports.getInMemoryAndSetIfNot = getInMemoryAndSetIfNot;
function deleteInMemory(obj, ...path) {
    const split = ["modules", module_1.MODULE.id, ...path.flatMap((x) => x.split("."))];
    const last = split.pop();
    let cursor = obj;
    for (const key of split) {
        if (typeof cursor !== "object" || !(key in cursor))
            return true;
        cursor = cursor[key];
    }
    return delete cursor[last];
}
exports.deleteInMemory = deleteInMemory;

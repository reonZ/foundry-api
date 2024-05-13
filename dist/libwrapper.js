"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregisterWrapper = exports.registerWrapper = exports.createWrapper = void 0;
const _1 = require(".");
function registerWrapper(path, fn, type) {
    const ids = [];
    const paths = Array.isArray(path) ? path : [path];
    for (const key of paths) {
        const id = libWrapper.register(_1.MODULE.id, key, fn, type);
        ids.push(id);
    }
    // @ts-ignore
    return ids.length === 1 ? ids[0] : ids;
}
exports.registerWrapper = registerWrapper;
function unregisterWrapper(id) {
    libWrapper.unregister(_1.MODULE.id, id);
}
exports.unregisterWrapper = unregisterWrapper;
function createWrapper(path, callback, type, options) {
    let wrapperId = null;
    return {
        activate() {
            if (wrapperId !== null)
                return;
            //  @ts-ignore
            wrapperId = registerWrapper(path, callback, type ?? "WRAPPER");
            options?.onActivate?.();
        },
        disable() {
            if (wrapperId === null)
                return;
            unregisterWrapper(wrapperId);
            wrapperId = null;
            options?.onDisable?.();
        },
        toggle(enabled) {
            if (enabled)
                this.activate();
            else
                this.disable();
        },
    };
}
exports.createWrapper = createWrapper;

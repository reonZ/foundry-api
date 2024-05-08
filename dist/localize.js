"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subLocalize = exports.templateLocalize = exports.localizePath = exports.hasLocalization = exports.localizeIfExist = exports.localize = exports.localeCompare = void 0;
const _1 = require(".");
function localize(...args) {
    args.unshift(_1.MODULE.id);
    const data = typeof args.at(-1) === "object" ? args.pop() : undefined;
    const path = (0, _1.joinStr)(".", args);
    if (typeof data === "object") {
        return game.i18n.format(path, data);
    }
    return game.i18n.localize(path);
}
exports.localize = localize;
function localizeIfExist(...args) {
    args.unshift(_1.MODULE.id);
    const data = typeof args.at(-1) === "object" ? args.pop() : undefined;
    const path = (0, _1.joinStr)(".", args);
    if (!game.i18n.has(path, false))
        return;
    if (typeof data === "object") {
        return game.i18n.format(path, data);
    }
    return game.i18n.localize(path);
}
exports.localizeIfExist = localizeIfExist;
function hasLocalization(...path) {
    return game.i18n.has(`${_1.MODULE.path(path)}`, false);
}
exports.hasLocalization = hasLocalization;
function localizePath(...path) {
    return _1.MODULE.path(path);
}
exports.localizePath = localizePath;
function templateLocalize(subKey) {
    const fn = (key, { hash }) => localize(subKey, key, hash);
    Object.defineProperties(fn, {
        path: {
            value: (key) => localizePath(subKey, key),
            enumerable: false,
            configurable: false,
        },
        sub: {
            value: (key) => {
                const joinedKey = subKey ? `${subKey}.${key}` : key;
                return subLocalize(joinedKey).i18n;
            },
            enumerable: false,
            configurable: false,
        },
    });
    return fn;
}
exports.templateLocalize = templateLocalize;
function subLocalize(subKey) {
    const fn = (...args) => localize(subKey, ...args);
    Object.defineProperties(fn, {
        ifExist: {
            value: (...args) => localizeIfExist(subKey, ...args),
            enumerable: false,
            configurable: false,
        },
        warn: {
            value: (str, arg1, arg2) => (0, _1.warn)(`${subKey}.${str}`, arg1, arg2),
            enumerable: false,
            configurable: false,
        },
        info: {
            value: (str, arg1, arg2) => (0, _1.info)(`${subKey}.${str}`, arg1, arg2),
            enumerable: false,
            configurable: false,
        },
        error: {
            value: (str, arg1, arg2) => (0, _1.error)(`${subKey}.${str}`, arg1, arg2),
            enumerable: false,
            configurable: false,
        },
        has: {
            value: (key) => hasLocalization(subKey, key),
            enumerable: false,
            configurable: false,
        },
        path: {
            value: (key) => localizePath(subKey, key),
            enumerable: false,
            configurable: false,
        },
        sub: {
            value: (key) => subLocalize(`${subKey}.${key}`),
            enumerable: false,
            configurable: false,
        },
        i18n: {
            get() {
                return templateLocalize(subKey);
            },
            enumerable: false,
            configurable: false,
        },
    });
    return fn;
}
exports.subLocalize = subLocalize;
function localeCompare(a, b) {
    return a.localeCompare(b, game.i18n.lang);
}
exports.localeCompare = localeCompare;

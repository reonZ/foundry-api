"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSourceFlag = exports.updateFlag = exports.unsetMofuleFlag = exports.unsetFlag = exports.setFlagProperty = exports.setFlag = exports.hasModuleFlag = exports.getFlagProperty = exports.getModuleFlag = exports.getFlag = exports.flagPath = void 0;
const R = __importStar(require("remeda"));
const _1 = require(".");
function getFlag(doc, ...path) {
    return doc.getFlag(_1.MODULE.id, path.join("."));
}
exports.getFlag = getFlag;
function setFlag(doc, ...args) {
    const value = args.pop();
    return doc.setFlag(_1.MODULE.id, args.join("."), value);
}
exports.setFlag = setFlag;
function unsetFlag(doc, ...path) {
    return doc.unsetFlag(_1.MODULE.id, path.join("."));
}
exports.unsetFlag = unsetFlag;
function flagPath(...path) {
    return `flags.${_1.MODULE.path(path)}`;
}
exports.flagPath = flagPath;
function updateFlag(doc, updates) {
    const pathed = R.mapKeys(updates, (key) => flagPath(key));
    return doc.update(pathed);
}
exports.updateFlag = updateFlag;
function updateSourceFlag(doc, ...args) {
    const value = args.pop();
    return doc.updateSource({
        [flagPath(...args)]: value,
    });
}
exports.updateSourceFlag = updateSourceFlag;
function getFlagProperty(obj, ...path) {
    return foundry.utils.getProperty(obj, flagPath(...path));
}
exports.getFlagProperty = getFlagProperty;
function setFlagProperty(obj, ...args) {
    const value = args.pop();
    foundry.utils.setProperty(obj, flagPath(...args), value);
    return obj;
}
exports.setFlagProperty = setFlagProperty;
function getModuleFlag(doc) {
    return foundry.utils.getProperty(doc, `flags.${_1.MODULE.id}`);
}
exports.getModuleFlag = getModuleFlag;
function hasModuleFlag(doc) {
    return getModuleFlag(doc) !== undefined;
}
exports.hasModuleFlag = hasModuleFlag;
function unsetMofuleFlag(doc) {
    return doc.update({
        [`flags.-=${_1.MODULE.id}`]: true,
    });
}
exports.unsetMofuleFlag = unsetMofuleFlag;

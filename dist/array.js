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
exports.getOnly = exports.compareArrays = exports.arrayIncludesOne = void 0;
const R = __importStar(require("remeda"));
function arrayIncludesOne(array, other) {
    return other.some((value) => array.includes(value));
}
exports.arrayIncludesOne = arrayIncludesOne;
function compareArrays(arr1, arr2, unique = false) {
    arr1 = unique ? R.compact(arr1) : arr1;
    arr2 = unique ? R.compact(arr2) : arr2.slice();
    if (arr1.length !== arr2.length)
        return false;
    for (const value1 of arr1) {
        const index = arr2.findIndex((value2) => value1 === value2);
        if (index === -1)
            return false;
        arr2.splice(index, 1);
    }
    return true;
}
exports.compareArrays = compareArrays;
function getOnly(collection, condition) {
    if (!collection)
        return;
    const isArray = Array.isArray(collection);
    if ((isArray && collection.length !== 1) || (!isArray && collection.size !== 1))
        return;
    const value = isArray ? collection[0] : collection.first();
    if (!value)
        return;
    return ((!condition || condition(value)) && value) || undefined;
}
exports.getOnly = getOnly;

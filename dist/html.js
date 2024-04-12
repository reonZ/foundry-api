"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentElement = exports.queryInParent = exports.queryInClosest = exports.querySelectorArray = exports.querySelector = exports.addListenerAll = exports.addListener = exports.beforeHTMLFromString = exports.appendHTMLFromString = exports.createHTMLFromString = exports.isCheckboxElement = exports.htmlElement = exports.elementData = exports.dataToDatasetString = exports.closest = void 0;
function htmlElement(el) {
    return el instanceof HTMLElement ? el : el[0];
}
exports.htmlElement = htmlElement;
function isCheckboxElement(el) {
    return el instanceof HTMLInputElement && el.type === "checkbox";
}
exports.isCheckboxElement = isCheckboxElement;
function createHTMLFromString(content) {
    const tmp = document.createElement("div");
    tmp.innerHTML = content;
    const children = tmp.children;
    return children.length > 1 ? tmp : children[0];
}
exports.createHTMLFromString = createHTMLFromString;
function applyHtmlMethod(fn, children, context) {
    const fnc = context ? fn.bind(context) : fn;
    if (children instanceof HTMLCollection) {
        for (const child of children) {
            fnc(child);
        }
    }
    else {
        fnc(children);
    }
}
function insertHTMLFromString(parent, content, prepend = false) {
    const children = createHTMLFromString(content);
    applyHtmlMethod(prepend ? parent.prepend : parent.append, children, parent);
    return children;
}
function appendHTMLFromString(parent, content) {
    return insertHTMLFromString(parent, content, false);
}
exports.appendHTMLFromString = appendHTMLFromString;
function beforeHTMLFromString(element, content) {
    const children = createHTMLFromString(content);
    applyHtmlMethod(element.before, children, element);
    return children;
}
exports.beforeHTMLFromString = beforeHTMLFromString;
function addListener(parent, selector, arg1, arg2) {
    const element = parent.querySelector(selector);
    if (!element)
        return;
    const event = typeof arg1 === "string" ? arg1 : "click";
    const listener = typeof arg1 === "function" ? arg1 : arg2;
    element.addEventListener(event, (e) => listener(e, element));
    return element;
}
exports.addListener = addListener;
function addListenerAll(parent, selector, arg1, arg2) {
    const elements = parent.querySelectorAll(selector);
    const event = typeof arg1 === "string" ? arg1 : "click";
    const listener = typeof arg1 === "function" ? arg1 : arg2;
    for (const element of elements) {
        element.addEventListener(event, (e) => listener(e, element));
    }
    return elements;
}
exports.addListenerAll = addListenerAll;
function querySelector(parent, selector) {
    return parent.querySelector(selector);
}
exports.querySelector = querySelector;
function querySelectorArray(parent, selector) {
    return Array.from(parent.querySelectorAll(selector));
}
exports.querySelectorArray = querySelectorArray;
function queryInClosest(el, parentSelector, childSelector) {
    const parent = closest(el, parentSelector);
    return querySelector(parent, childSelector);
}
exports.queryInClosest = queryInClosest;
function queryInParent(el, childSelector) {
    return querySelector(el.parentElement, childSelector);
}
exports.queryInParent = queryInParent;
function closest(el, selector) {
    return el.closest(selector);
}
exports.closest = closest;
function parentElement(el) {
    return el.parentElement;
}
exports.parentElement = parentElement;
function elementData(el) {
    return el.dataset;
}
exports.elementData = elementData;
function dataToDatasetString(data) {
    return Object.entries(data)
        .map(([key, value]) => {
        const stringified = typeof value === "object" ? JSON.stringify(value) : value;
        return `data-${key}='${stringified}'`;
    })
        .join(" ");
}
exports.dataToDatasetString = dataToDatasetString;

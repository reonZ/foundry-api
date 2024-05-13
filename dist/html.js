"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryInParent = exports.queryInClosest = exports.querySelectorArray = exports.querySelector = exports.prependHTMLFromString = exports.parentElement = exports.isCheckboxElement = exports.htmlElement = exports.elementData = exports.dataToDatasetString = exports.createHTMLFromString = exports.closest = exports.beforeHTMLFromString = exports.appendHTMLFromString = exports.afterHTMLFromString = exports.addListenerAll = exports.addListener = void 0;
function htmlElement(el) {
    return el instanceof HTMLElement ? el : el[0];
}
exports.htmlElement = htmlElement;
function isCheckboxElement(el) {
    return el instanceof HTMLInputElement && el.type === "checkbox";
}
exports.isCheckboxElement = isCheckboxElement;
function createHTMLFromString(content, wrap = true) {
    const tmp = document.createElement("div");
    tmp.innerHTML = content;
    const children = tmp.children;
    return (children.length === 1 ? children[0] : wrap ? tmp : children);
}
exports.createHTMLFromString = createHTMLFromString;
function applyHtmlMethod(fn, children, context) {
    const fnc = context ? fn.bind(context) : fn;
    if (children instanceof HTMLCollection) {
        fnc(...children);
    }
    else {
        fnc(children);
    }
}
function insertHTMLFromString(parent, content, prepend = false) {
    const html = createHTMLFromString(content, false);
    applyHtmlMethod(prepend ? parent.prepend : parent.append, html, parent);
    return html;
}
function appendHTMLFromString(parent, content) {
    return insertHTMLFromString(parent, content, false);
}
exports.appendHTMLFromString = appendHTMLFromString;
function prependHTMLFromString(parent, content) {
    return insertHTMLFromString(parent, content, true);
}
exports.prependHTMLFromString = prependHTMLFromString;
function beforeHTMLFromString(element, content) {
    const html = createHTMLFromString(content, false);
    applyHtmlMethod(element.before, html, element);
    return html;
}
exports.beforeHTMLFromString = beforeHTMLFromString;
function afterHTMLFromString(element, content) {
    const html = createHTMLFromString(content, false);
    applyHtmlMethod(element.after, html, element);
    return html;
}
exports.afterHTMLFromString = afterHTMLFromString;
function addListener(parent, selector, arg1, arg2, arg3) {
    const element = parent.querySelector(selector);
    if (!element)
        return;
    const event = typeof arg1 === "string" ? arg1 : "click";
    const listener = typeof arg1 === "function" ? arg1 : arg2;
    const useCapture = typeof arg2 === "boolean" ? arg2 : arg3;
    element.addEventListener(event, (e) => listener(e, element), useCapture);
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
    if (!parent)
        return null;
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
    if (!el)
        return null;
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.templatePath = void 0;
const _1 = require(".");
function templatePath(...path) {
    return `modules/${_1.MODULE.id}/templates/${(0, _1.joinStr)("/", path)}.hbs`;
}
exports.templatePath = templatePath;
function render(...args) {
    const data = typeof args.at(-1) === "object" ? args.pop() : {};
    const path = templatePath(...args);
    return renderTemplate(path, data);
}
exports.render = render;

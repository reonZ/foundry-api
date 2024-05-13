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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOfType = void 0;
__exportStar(require("./actor"), exports);
__exportStar(require("./application"), exports);
__exportStar(require("./array"), exports);
__exportStar(require("./canvas"), exports);
__exportStar(require("./chat"), exports);
__exportStar(require("./delay"), exports);
__exportStar(require("./dialog"), exports);
__exportStar(require("./document"), exports);
__exportStar(require("./event-manager"), exports);
__exportStar(require("./flags"), exports);
__exportStar(require("./handlebars"), exports);
__exportStar(require("./hooks"), exports);
__exportStar(require("./html"), exports);
__exportStar(require("./item"), exports);
__exportStar(require("./keybindings"), exports);
__exportStar(require("./libwrapper"), exports);
__exportStar(require("./localize"), exports);
__exportStar(require("./math"), exports);
__exportStar(require("./module"), exports);
__exportStar(require("./notifications"), exports);
__exportStar(require("./object"), exports);
__exportStar(require("./settings"), exports);
__exportStar(require("./socket"), exports);
__exportStar(require("./string"), exports);
__exportStar(require("./user"), exports);
function isOfType(variable, ...types) {
    const type = typeof variable;
    return types.includes(type);
}
exports.isOfType = isOfType;

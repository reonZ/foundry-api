"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerKeybind = void 0;
const localize_1 = require("./localize");
const module_1 = require("./module");
function registerKeybind(name, data) {
    game.keybindings.register(module_1.MODULE.id, name, {
        ...data,
        name: (0, localize_1.localizePath)("keybindings", name, "name"),
        hint: (0, localize_1.localizePath)("keybindings", name, "hint"),
    });
}
exports.registerKeybind = registerKeybind;

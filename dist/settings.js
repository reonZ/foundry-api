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
exports.settingPath = exports.setSetting = exports.registerSettingMenu = exports.registerSetting = exports.isClientSetting = exports.isWorldSetting = exports.isMenuSetting = exports.getSetting = void 0;
const R = __importStar(require("remeda"));
const _1 = require(".");
/**
 * scope = "world"
 *
 * config = true
 */
function registerSetting(options) {
    if ("choices" in options && Array.isArray(options.choices)) {
        options.choices = R.mapToObj(options.choices, (choice) => [
            choice,
            settingPath(options.key, "choices", choice),
        ]);
    }
    options.name ??= settingPath(options.key, "name");
    options.hint ??= settingPath(options.key, "hint");
    options.scope ??= "world";
    options.config ??= true;
    game.settings.register(_1.MODULE.id, options.key, options);
}
exports.registerSetting = registerSetting;
function registerSettingMenu(options) {
    options.name ??= settingPath("menus", options.key, "name");
    options.label ??= settingPath("menus", options.key, "label");
    options.hint ??= settingPath("menus", options.key, "hint");
    options.restricted ??= true;
    options.icon ??= "fas fa-cogs";
    game.settings.registerMenu(_1.MODULE.id, options.key, options);
}
exports.registerSettingMenu = registerSettingMenu;
function settingPath(...path) {
    return _1.MODULE.path("settings", ...path);
}
exports.settingPath = settingPath;
function getSetting(key) {
    return game.settings.get(_1.MODULE.id, key);
}
exports.getSetting = getSetting;
function setSetting(key, value) {
    return game.settings.set(_1.MODULE.id, key, value);
}
exports.setSetting = setSetting;
function isClientSetting(setting) {
    if ("restricted" in setting)
        return !setting.restricted;
    return "scope" in setting && setting.scope === "client";
}
exports.isClientSetting = isClientSetting;
function isWorldSetting(setting) {
    if ("restricted" in setting)
        return !!setting.restricted;
    return "scope" in setting && setting.scope === "world";
}
exports.isWorldSetting = isWorldSetting;
function isMenuSetting(setting) {
    return setting.type.prototype instanceof FormApplication;
}
exports.isMenuSetting = isMenuSetting;

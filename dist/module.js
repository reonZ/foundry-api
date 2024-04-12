"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODULE = void 0;
const _1 = require(".");
let MODULE_ID = "";
let MODULE_NAME = "";
const MODULE = {
    get id() {
        if (!MODULE_ID) {
            throw new Error("Module needs to be registered.");
        }
        return MODULE_ID;
    },
    get name() {
        if (!MODULE_ID) {
            throw new Error("Module needs to be registered.");
        }
        return MODULE_NAME;
    },
    get current() {
        return game.modules.get(this.id);
    },
    throwError(str) {
        throw new Error(`\n[${this.name}] ${str}`);
    },
    error(str, error) {
        console.error(`[${this.name}] ${str}`);
        if (error) {
            console.error(error);
        }
    },
    log(str) {
        console.log(`[${this.name}] ${str}`);
    },
    path(...path) {
        return `${this.id}.${(0, _1.joinStr)(".", ...path)}`;
    },
    register(id, name) {
        if (MODULE_ID) {
            throw new Error("Module was already registered.");
        }
        MODULE_ID = id;
        MODULE_NAME = name;
    },
};
exports.MODULE = MODULE;

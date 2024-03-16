import { joinStr } from ".";

let MODULE_ID = "";
let MODULE_NAME = "";

export const MODULE = {
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
    error(str: string) {
        throw new Error(`\n[${this.name}] ${str}`);
    },
    log(str: string) {
        console.log(`[${this.name}] ${str}`);
    },
    path(...path: (string | string[])[]): `${typeof this.id}.${string}` {
        return `${this.id}.${joinStr(".", ...path)}`;
    },
    register(id: string, name: string) {
        if (MODULE_ID) {
            this.error("Module was already registered.");
        }
        MODULE_ID = id;
        MODULE_NAME = name;
    },
};

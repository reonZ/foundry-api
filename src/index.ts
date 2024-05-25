export * from "./actor";
export * from "./application";
export * from "./array";
export * from "./canvas";
export * from "./chat";
export * from "./delay";
export * from "./dialog";
export * from "./document";
export * from "./event-manager";
export * from "./flags";
export * from "./handlebars";
export * from "./hooks";
export * from "./html";
export * from "./item";
export * from "./keybindings";
export * from "./keyboard";
export * from "./libwrapper";
export * from "./localize";
export * from "./math";
export * from "./module";
export * from "./notifications";
export * from "./object";
export * from "./settings";
export * from "./socket";
export * from "./string";
export * from "./user";

function isOfType<T extends TYPES>(variable: any, ...types: T[]): variable is T {
    const type = typeof variable as T;
    return types.includes(type);
}

export { isOfType };

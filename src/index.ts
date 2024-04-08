export * from "./application";
export * from "./array";
export * from "./chat";
export * from "./dialog";
export * from "./document";
export * from "./event-manager";
export * from "./flags";
export * from "./handlebars";
export * from "./item";
export * from "./html";
export * from "./libwrapper";
export * from "./localize";
export * from "./module";
export * from "./notifications";
export * from "./object";
export * from "./settings";
export * from "./string";

function isOfType<T extends TYPES>(variable: any, ...types: T[]): variable is T {
    const type = typeof variable as T;
    return types.includes(type);
}

export { isOfType };

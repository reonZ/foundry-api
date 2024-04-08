import * as R from "remeda";
import { MODULE } from ".";

function getFlag<T>(doc: FoundryDocument, ...path: string[]) {
    return doc.getFlag<T>(MODULE.id, path.join("."));
}

function setFlag<T>(doc: FoundryDocument, ...args: [...string[], T]) {
    const value = args.splice(-1)[0];
    return doc.setFlag(MODULE.id, args.join("."), value);
}

function unsetFlag(doc: FoundryDocument, ...path: string[]) {
    return doc.unsetFlag(MODULE.id, path.join("."));
}

function flagPath(...path: string[]): `flags.${typeof MODULE.id}.${string}` {
    return `flags.${MODULE.path(path)}`;
}

function updateFlag<T extends Record<string, unknown>>(
    doc: FoundryDocument,
    updates: Partial<Record<keyof T, T[keyof T]>> & { [k: string]: any }
) {
    const pathed = R.mapKeys(updates, (key) => flagPath(key as string));
    return doc.update(pathed);
}

function setFlagProperty(obj: object, ...args: [...string[], any]) {
    const value = args.splice(-1)[0];
    setProperty(obj, flagPath(...args), value);
    return obj;
}

function getModuleFlag<T extends Record<string, unknown>>(doc: FoundryDocument) {
    return getProperty<T>(doc, `flags.${MODULE.id}`);
}

function hasModuleFlag<T extends Record<string, unknown>>(doc: FoundryDocument) {
    return getModuleFlag<T>(doc) !== undefined;
}

function unsetMofuleFlag(doc: FoundryDocument) {
    return doc.update({
        [`flags.-=${MODULE.id}`]: true,
    });
}

export {
    flagPath,
    getFlag,
    getModuleFlag,
    hasModuleFlag,
    setFlag,
    setFlagProperty,
    unsetFlag,
    unsetMofuleFlag,
    updateFlag,
};

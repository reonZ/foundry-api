import * as R from "remeda";
import { MODULE } from ".";

function getFlag<T>(doc: FoundryDocument, ...path: string[]) {
    return doc.getFlag<T>(MODULE.id, path.join("."));
}

function setFlag(doc: FoundryDocument, ...args: [...string[], any]) {
    const value = args.pop();
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

function updateSourceFlag(doc: FoundryDocument, ...args: [...string[], any]) {
    const value = args.pop();
    return doc.updateSource({
        [flagPath(...args)]: value,
    });
}

function getFlagProperty<T>(obj: object, ...path: string[]) {
    return foundry.utils.getProperty<T>(obj, flagPath(...path));
}

function setFlagProperty(obj: object, ...args: [...string[], any]) {
    const value = args.pop();
    foundry.utils.setProperty(obj, flagPath(...args), value);
    return obj;
}

function getModuleFlag<T extends Record<string, unknown>>(doc: FoundryDocument) {
    return foundry.utils.getProperty<T>(doc, `flags.${MODULE.id}`);
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
    getFlagProperty,
    hasModuleFlag,
    setFlag,
    setFlagProperty,
    unsetFlag,
    unsetMofuleFlag,
    updateFlag,
    updateSourceFlag,
};

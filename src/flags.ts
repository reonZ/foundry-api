import * as R from "remeda";
import { MODULE } from ".";

export function getFlag<T>(doc: FoundryDocument, ...path: string[]) {
    return doc.getFlag<T>(MODULE.id, path.join("."));
}

export function setFlag<T>(doc: FoundryDocument, ...args: [...string[], T]) {
    const value = args.splice(-1)[0];
    return doc.setFlag(MODULE.id, args.join("."), value);
}

export function unsetFlag(doc: FoundryDocument, ...path: string[]) {
    return doc.unsetFlag(MODULE.id, path.join("."));
}

export function flagPath(...path: string[]): `flags.${typeof MODULE.id}.${string}` {
    return `flags.${MODULE.path(path)}`;
}

export function updateFlag<T extends Record<string, unknown> = Record<string, unknown>>(
    doc: FoundryDocument,
    updates: T
) {
    const pathed = R.mapKeys(updates, (key) => flagPath(key as string));
    return doc.update(pathed);
}

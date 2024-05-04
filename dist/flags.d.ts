import { MODULE } from ".";
declare function getFlag<T>(doc: FoundryDocument, ...path: string[]): T | undefined;
declare function setFlag(doc: FoundryDocument, ...args: [...string[], any]): Promise<FoundryDocument<any>>;
declare function unsetFlag(doc: FoundryDocument, ...path: string[]): Promise<FoundryDocument<any>>;
declare function flagPath(...path: string[]): `flags.${typeof MODULE.id}.${string}`;
declare function updateFlag<T extends Record<string, unknown>>(doc: FoundryDocument, updates: Partial<Record<keyof T, T[keyof T]>> & {
    [k: string]: any;
}): Promise<FoundryDocument<any> | undefined>;
declare function updateSourceFlag(doc: FoundryDocument, ...args: [...string[], any]): Partial<{
    [x: string]: any;
}>;
declare function getFlagProperty<T>(obj: object, ...path: string[]): T | undefined;
declare function setFlagProperty(obj: object, ...args: [...string[], any]): object;
declare function getModuleFlag<T extends Record<string, unknown>>(doc: FoundryDocument): T | undefined;
declare function hasModuleFlag<T extends Record<string, unknown>>(doc: FoundryDocument): boolean;
declare function unsetMofuleFlag(doc: FoundryDocument): Promise<FoundryDocument<any> | undefined>;
export { flagPath, getFlag, getModuleFlag, getFlagProperty, hasModuleFlag, setFlag, setFlagProperty, unsetFlag, unsetMofuleFlag, updateFlag, updateSourceFlag, };

import { error, info, warn } from ".";
declare type LocalizeArgs = [...string[], string | Record<string, any>];
declare function localize(...args: LocalizeArgs): string;
declare function localizeIfExist(...args: LocalizeArgs): string | undefined;
declare function hasLocalization(...path: string[]): boolean;
declare function localizePath(...path: string[]): `${string}.${string}`;
declare function templateLocalize(subKey: string): (key: string, { hash }: {
    hash: Record<string, string>;
}) => string;
declare function subLocalize(subKey: string): typeof localize & {
    ifExist: typeof localizeIfExist;
    has: typeof hasLocalization;
    path: typeof localizePath;
    warn: typeof warn;
    info: typeof info;
    error: typeof error;
    i18n: SublocalizeI18n;
    sub: typeof subLocalize;
};
declare function localeCompare(a: string, b: string): number;
type SublocalizeI18n = typeof templateLocalize & {
    path: typeof localizePath;
    sub: typeof subLocalize;
};
export type { SublocalizeI18n };
export { localeCompare, localize, localizeIfExist, hasLocalization, localizePath, templateLocalize, subLocalize, };

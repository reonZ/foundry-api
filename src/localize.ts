import { MODULE, error, info, joinStr, warn } from ".";

declare type LocalizeArgs = [...string[], string | Record<string, any>];

function localize(...args: LocalizeArgs) {
    args.unshift(MODULE.id);

    const data = typeof args.at(-1) === "object" ? args.splice(-1)[0] : undefined;
    const path = joinStr(".", args as string[]);

    if (typeof data === "object") {
        return game.i18n.format(path, data);
    }

    return game.i18n.localize(path);
}

function localizeIfExist(...args: LocalizeArgs) {
    args.unshift(MODULE.id);

    const data = typeof args.at(-1) === "object" ? args.splice(-1)[0] : undefined;
    const path = joinStr(".", args as string[]);

    if (!game.i18n.has(path, false)) return;

    if (typeof data === "object") {
        return game.i18n.format(path, data);
    }

    return game.i18n.localize(path);
}

function hasLocalization(...path: string[]) {
    return game.i18n.has(`${MODULE.path(path)}`, false);
}

function localizePath(...path: string[]) {
    return MODULE.path(path);
}

function templateLocalize(subKey: string) {
    const fn = (key: string, { hash }: { hash: Record<string, string> }) =>
        localize(subKey, key, hash);

    Object.defineProperties(fn, {
        path: {
            value: (key: string) => localizePath(subKey, key),
            enumerable: false,
            configurable: false,
        },
        sub: {
            value: (key: string) => {
                const joinedKey = subKey ? `${subKey}.${key}` : key;
                return subLocalize(joinedKey).i18n;
            },
            enumerable: false,
            configurable: false,
        },
    });

    return fn;
}

function subLocalize(subKey: string) {
    const fn = (...args: LocalizeArgs) => localize(subKey, ...args);

    Object.defineProperties(fn, {
        ifExist: {
            value: (...args: LocalizeArgs) => localizeIfExist(subKey, ...args),
            enumerable: false,
            configurable: false,
        },
        warn: {
            value: (str: string, arg1?: Record<string, string> | boolean, arg2?: boolean) =>
                warn(`${subKey}.${str}`, arg1, arg2),
            enumerable: false,
            configurable: false,
        },
        info: {
            value: (str: string, arg1?: Record<string, string> | boolean, arg2?: boolean) =>
                info(`${subKey}.${str}`, arg1, arg2),
            enumerable: false,
            configurable: false,
        },
        error: {
            value: (str: string, arg1?: Record<string, string> | boolean, arg2?: boolean) =>
                error(`${subKey}.${str}`, arg1, arg2),
            enumerable: false,
            configurable: false,
        },
        has: {
            value: (key: string) => hasLocalization(subKey, key),
            enumerable: false,
            configurable: false,
        },
        path: {
            value: (key: string) => localizePath(subKey, key),
            enumerable: false,
            configurable: false,
        },
        sub: {
            value: (key: string) => subLocalize(`${subKey}.${key}`),
            enumerable: false,
            configurable: false,
        },
        i18n: {
            get() {
                return templateLocalize(subKey);
            },
            enumerable: false,
            configurable: false,
        },
    });

    return fn as typeof localize & {
        ifExist: typeof localizeIfExist;
        has: typeof hasLocalization;
        path: typeof localizePath;
        warn: typeof warn;
        info: typeof info;
        error: typeof error;
        i18n: typeof templateLocalize & { path: typeof localizePath; sub: typeof subLocalize };
        sub: typeof subLocalize;
    };
}

export { localize, localizeIfExist, hasLocalization, localizePath, templateLocalize, subLocalize };
